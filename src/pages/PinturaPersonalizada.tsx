import { useState, useMemo } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { motion, AnimatePresence } from 'framer-motion';
import { Palette, ShoppingBag, Calculator, Ruler, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useArtistTheme } from '@/contexts/ArtistThemeContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';

// Price per m² for each artist (in USD)
const artistPricePerM2: Record<string, number> = {
  '1': 850,   // A Fase
  '2': 720,   // Cadumen
  '3': 680,   // Zezão
  '4': 900,   // Val Lehmann
  '5': 780,   // Sérgio Free
  '6': 650,   // Paulo Medo
  '7': 550,   // Victor Gabriel
  '8': 950,   // Costa Villar
  '9': 600,   // Dicart
  '10': 800,  // Ozi Stencil
};

export default function PinturaPersonalizada() {
  const { artists } = useArtistTheme();
  const { convertToBRL } = useCurrency();
  const { addItem } = useCart();
  
  const [selectedArtistId, setSelectedArtistId] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  
  const selectedArtist = artists.find(a => a.id === selectedArtistId);
  
  // Calculate price based on dimensions
  const calculatedPrice = useMemo(() => {
    if (!selectedArtistId || !width || !height) return null;
    
    const widthM = parseFloat(width) / 100; // Convert cm to m
    const heightM = parseFloat(height) / 100;
    const areaM2 = widthM * heightM;
    const pricePerM2 = artistPricePerM2[selectedArtistId] || 700;
    const totalUSD = areaM2 * pricePerM2;
    
    return {
      areaM2,
      pricePerM2,
      totalUSD,
      totalBRL: convertToBRL(totalUSD),
    };
  }, [selectedArtistId, width, height, convertToBRL]);

  const handleAddToCart = () => {
    if (!calculatedPrice || !selectedArtist) {
      toast.error('Por favor, preencha todos os campos');
      return;
    }

    addItem({
      id: `custom-${selectedArtistId}-${Date.now()}`,
      title: `Pintura Sob Medida - ${width}cm x ${height}cm`,
      artist: selectedArtist.name,
      image: selectedArtist.photo,
      priceUSD: calculatedPrice.totalUSD,
      sku: 'CUSTOM',
    });

    toast.success('Pintura personalizada adicionada ao carrinho!', {
      description: `${selectedArtist.name} - ${width}cm x ${height}cm`,
    });
  };

  return (
    <PageLayout title="Pintura Sob Medida" subtitle="Calcule o valor e adicione ao carrinho instantaneamente">
      <div className="py-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Calculator Card */}
          <div className="p-6 md:p-8 rounded-2xl bg-card border border-border neon-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-artist-primary/20">
                <Calculator className="w-6 h-6 text-artist-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Calculadora de Preço</h2>
                <p className="text-sm text-muted-foreground">Preço calculado por m² de pintura</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Form */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Selecione o Artista</Label>
                  <Select value={selectedArtistId} onValueChange={setSelectedArtistId}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Escolha um artista" />
                    </SelectTrigger>
                    <SelectContent>
                      {artists.map((artist) => (
                        <SelectItem key={artist.id} value={artist.id}>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-6 h-6 rounded-full overflow-hidden"
                              style={{ backgroundColor: artist.neonColor }}
                            >
                              <img src={artist.photo} alt={artist.name} className="w-full h-full object-cover" />
                            </div>
                            <span>{artist.name}</span>
                            <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-500" />
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="width">Largura (cm)</Label>
                    <div className="relative">
                      <Input
                        id="width"
                        type="number"
                        placeholder="100"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        className="h-12 pr-10"
                        min="10"
                        max="1000"
                      />
                      <Ruler className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="height">Altura (cm)</Label>
                    <div className="relative">
                      <Input
                        id="height"
                        type="number"
                        placeholder="100"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        className="h-12 pr-10"
                        min="10"
                        max="1000"
                      />
                      <Ruler className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground rotate-90" />
                    </div>
                  </div>
                </div>

                {selectedArtist && (
                  <div className="p-3 rounded-xl bg-muted/50 border border-border">
                    <p className="text-xs text-muted-foreground">
                      Taxa do artista: <span className="font-semibold text-foreground">
                        US$ {artistPricePerM2[selectedArtistId] || 700}/m²
                      </span>
                    </p>
                  </div>
                )}
              </div>

              {/* Price Result */}
              <AnimatePresence mode="wait">
                {calculatedPrice ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col justify-center p-6 rounded-xl"
                    style={{
                      backgroundColor: selectedArtist ? `${selectedArtist.neonColor}10` : 'hsl(var(--muted))',
                      borderWidth: '1px',
                      borderColor: selectedArtist ? `${selectedArtist.neonColor}30` : 'hsl(var(--border))',
                    }}
                  >
                    <div className="text-center space-y-2">
                      <p className="text-sm text-muted-foreground">
                        Área: {calculatedPrice.areaM2.toFixed(2)} m²
                      </p>
                      <div>
                        <p 
                          className="text-4xl font-bold font-mono tabular-nums"
                          style={{ color: selectedArtist?.neonColor || 'hsl(var(--artist-primary))' }}
                        >
                          R$ {calculatedPrice.totalBRL.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                        <p className="text-sm text-muted-foreground font-mono">
                          US$ {calculatedPrice.totalUSD.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </p>
                      </div>
                      <Button
                        size="lg"
                        className="w-full mt-4 gap-2"
                        style={{
                          background: selectedArtist 
                            ? `linear-gradient(135deg, ${selectedArtist.neonColor} 0%, ${selectedArtist.neonColor}cc 100%)`
                            : undefined,
                          color: '#000',
                        }}
                        onClick={handleAddToCart}
                      >
                        <ShoppingBag className="w-5 h-5" />
                        Adicionar ao Carrinho
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center p-6 rounded-xl bg-muted/30 border border-dashed border-border"
                  >
                    <Palette className="w-12 h-12 text-muted-foreground/30 mb-3" />
                    <p className="text-sm text-muted-foreground text-center">
                      Preencha os campos para calcular o valor da sua pintura personalizada
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: Palette, title: 'Arte Única', desc: 'Criada exclusivamente para você' },
              { icon: Calculator, title: 'Preço Transparente', desc: 'Calculado por m² sem surpresas' },
              { icon: ShoppingBag, title: 'Compra Imediata', desc: 'Adicione ao carrinho instantaneamente' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-xl bg-card border border-border text-center"
              >
                <item.icon className="w-8 h-8 text-artist-primary mx-auto mb-2" />
                <h3 className="font-semibold text-sm">{item.title}</h3>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
}
