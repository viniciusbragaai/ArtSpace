import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Frame, Coffee, Paintbrush, ShoppingBag, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useArtistTheme } from '@/contexts/ArtistThemeContext';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface Product {
  id: string;
  title: string;
  artist: string;
  image: string;
  priceOriginal: number;
  pricePrint: number;
  height: string;
  hasCustomService: boolean;
}

const products: Product[] = [
  {
    id: '1',
    title: 'Cidade Neon',
    artist: 'Zephyr',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=800&fit=crop',
    priceOriginal: 4500,
    pricePrint: 89,
    height: '400px',
    hasCustomService: true,
  },
  {
    id: '2',
    title: 'Reflexos Urbanos',
    artist: 'Zephyr',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=500&fit=crop',
    priceOriginal: 3200,
    pricePrint: 69,
    height: '280px',
    hasCustomService: true,
  },
  {
    id: '3',
    title: 'Abstrato #42',
    artist: 'PRISM',
    image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&h=700&fit=crop',
    priceOriginal: 2800,
    pricePrint: 59,
    height: '350px',
    hasCustomService: false,
  },
  {
    id: '4',
    title: 'Geometria Infinita',
    artist: 'Kuro',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=600&fit=crop',
    priceOriginal: 5500,
    pricePrint: 99,
    height: '320px',
    hasCustomService: false,
  },
  {
    id: '5',
    title: 'Cores do Porto',
    artist: 'Marina Vale',
    image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&h=450&fit=crop',
    priceOriginal: 6200,
    pricePrint: 79,
    height: '250px',
    hasCustomService: true,
  },
  {
    id: '6',
    title: 'Digital Dreams',
    artist: 'Nova',
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=600&h=900&fit=crop',
    priceOriginal: 3800,
    pricePrint: 89,
    height: '450px',
    hasCustomService: true,
  },
];

type ProductVersion = 'original' | 'print' | 'custom';

export function ProductGrid() {
  const { currentArtist } = useArtistTheme();

  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Portfólio{' '}
            <span className="text-gradient-neon">
              {currentArtist?.name || 'Artistas'}
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore obras únicas e exclusivas. De quadros originais a prints acessíveis,
            ou até uma pintura personalizada no seu ambiente.
          </p>
        </motion.div>

        <div className="masonry-grid">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="masonry-item"
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [selectedVersion, setSelectedVersion] = useState<ProductVersion>('original');
  const [isHovered, setIsHovered] = useState(false);

  const versions: { key: ProductVersion; label: string; icon: React.ReactNode; price?: number }[] = [
    { key: 'original', label: 'Original', icon: <Frame className="w-4 h-4" />, price: product.priceOriginal },
    { key: 'print', label: 'Print', icon: <Coffee className="w-4 h-4" />, price: product.pricePrint },
    ...(product.hasCustomService
      ? [{ key: 'custom' as ProductVersion, label: 'Sob Medida', icon: <Paintbrush className="w-4 h-4" /> }]
      : []),
  ];

  const currentPrice = selectedVersion === 'original' ? product.priceOriginal : 
                       selectedVersion === 'print' ? product.pricePrint : null;

  return (
    <motion.div
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative rounded-xl overflow-hidden bg-card neon-border card-hover"
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: product.height }}>
        <motion.img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
        
        {/* Quick Add Button */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-4 left-4 right-4"
            >
              <Button className="w-full gradient-neon text-primary-foreground font-semibold gap-2">
                <ShoppingBag className="w-4 h-4" />
                Adicionar ao Carrinho
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-lg">{product.title}</h3>
            <p className="text-sm text-muted-foreground">{product.artist}</p>
          </div>
          {currentPrice && (
            <div className="text-right">
              <p className="text-artist-primary font-bold text-lg">
                R$ {currentPrice.toLocaleString('pt-BR')}
              </p>
              <p className="text-xs text-muted-foreground">
                {selectedVersion === 'original' ? 'Obra única' : 'Unidade'}
              </p>
            </div>
          )}
        </div>

        {/* Version Selector */}
        <div className="flex gap-2 flex-wrap">
          {versions.map((version) => (
            <button
              key={version.key}
              onClick={() => setSelectedVersion(version.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedVersion === version.key
                  ? 'bg-artist-primary text-primary-foreground neon-glow'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {version.icon}
              {version.label}
            </button>
          ))}
        </div>

        {/* Custom Service Form Trigger */}
        {selectedVersion === 'custom' && product.hasCustomService && (
          <CustomServiceDialog productTitle={product.title} artistName={product.artist} />
        )}
      </div>
    </motion.div>
  );
}

function CustomServiceDialog({ productTitle, artistName }: { productTitle: string; artistName: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4"
        >
          <Button variant="outline" className="w-full neon-border group">
            <Paintbrush className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
            Solicite em seu Muro/Ambiente
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="glass-strong border-artist-primary/20 max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl neon-text-subtle text-artist-primary">
            Pintura Personalizada
          </DialogTitle>
          <p className="text-muted-foreground">
            Solicite um orçamento para ter a obra "{productTitle}" de {artistName} em seu ambiente.
          </p>
        </DialogHeader>
        <form className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Nome</label>
              <Input placeholder="Seu nome" className="bg-muted/50" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Telefone</label>
              <Input placeholder="(13) 99999-9999" className="bg-muted/50" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Email</label>
            <Input type="email" placeholder="seu@email.com" className="bg-muted/50" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Largura (m)</label>
              <Input type="number" placeholder="3.5" className="bg-muted/50" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Altura (m)</label>
              <Input type="number" placeholder="2.5" className="bg-muted/50" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Descrição do Ambiente</label>
            <Textarea 
              placeholder="Descreva o local onde deseja a pintura (interno/externo, tipo de parede, etc.)" 
              className="bg-muted/50 min-h-[100px]"
            />
          </div>
          <Button type="submit" className="w-full gradient-neon text-primary-foreground font-semibold">
            <Zap className="w-4 h-4 mr-2" />
            Solicitar Orçamento
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
