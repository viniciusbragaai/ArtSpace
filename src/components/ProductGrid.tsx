import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Frame, Coffee, Paintbrush, ShoppingBag, Zap, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { BottomSheet } from '@/components/ui/bottom-sheet';
import { useArtistTheme } from '@/contexts/ArtistThemeContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// Icons for new SKUs
const MugIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
  </svg>
);

const PenIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 19 7-7 3 3-7 7-3-3z" />
    <path d="m18 13-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
    <path d="m2 2 7.586 7.586" />
    <circle cx="11" cy="11" r="2" />
  </svg>
);

interface Product {
  id: string;
  title: string;
  artist: string;
  image: string;
  priceOriginalUSD: number;
  pricePrintUSD: number;
  priceMugUSD: number;
  pricePenUSD: number;
  height: string;
  hasCustomService: boolean;
}

const products: Product[] = [
  {
    id: '1',
    title: 'Cidade Neon',
    artist: 'Zephyr',
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=600&h=800&fit=crop',
    priceOriginalUSD: 900,
    pricePrintUSD: 18,
    priceMugUSD: 8,
    pricePenUSD: 5,
    height: '400px',
    hasCustomService: true,
  },
  {
    id: '2',
    title: 'Reflexos Urbanos',
    artist: 'Zephyr',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=500&fit=crop',
    priceOriginalUSD: 640,
    pricePrintUSD: 14,
    priceMugUSD: 8,
    pricePenUSD: 5,
    height: '280px',
    hasCustomService: true,
  },
  {
    id: '3',
    title: 'Abstrato #42',
    artist: 'PRISM',
    image: 'https://images.unsplash.com/photo-1549490349-8643362247b5?w=600&h=700&fit=crop',
    priceOriginalUSD: 560,
    pricePrintUSD: 12,
    priceMugUSD: 8,
    pricePenUSD: 5,
    height: '350px',
    hasCustomService: false,
  },
  {
    id: '4',
    title: 'Geometria Infinita',
    artist: 'Kuro',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=600&fit=crop',
    priceOriginalUSD: 1100,
    pricePrintUSD: 20,
    priceMugUSD: 8,
    pricePenUSD: 5,
    height: '320px',
    hasCustomService: false,
  },
  {
    id: '5',
    title: 'Cores do Porto',
    artist: 'Marina Vale',
    image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&h=450&fit=crop',
    priceOriginalUSD: 1240,
    pricePrintUSD: 16,
    priceMugUSD: 8,
    pricePenUSD: 5,
    height: '250px',
    hasCustomService: true,
  },
  {
    id: '6',
    title: 'Digital Dreams',
    artist: 'Nova',
    image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=600&h=900&fit=crop',
    priceOriginalUSD: 760,
    pricePrintUSD: 18,
    priceMugUSD: 8,
    pricePenUSD: 5,
    height: '450px',
    hasCustomService: true,
  },
];

type ProductVersion = 'original' | 'print' | 'custom' | 'mug' | 'pen';

export function ProductGrid() {
  const { currentArtist } = useArtistTheme();
  const { t } = useLanguage();

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
            {t('products.portfolio')}{' '}
            <span className="text-gradient-neon">
              {currentArtist?.name || t('products.artists')}
            </span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('products.explore')}
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

interface VersionOption {
  key: ProductVersion;
  label: string;
  icon: React.ReactNode;
  priceUSD?: number;
}

function ProductCard({ product }: { product: Product }) {
  const [selectedVersion, setSelectedVersion] = useState<ProductVersion>('original');
  const [isHovered, setIsHovered] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const { convertToBRL } = useCurrency();
  const { t } = useLanguage();
  const isMobile = useIsMobile();

  const versions: VersionOption[] = [
    { key: 'original', label: t('products.original'), icon: <Frame className="w-4 h-4" />, priceUSD: product.priceOriginalUSD },
    { key: 'print', label: t('products.print'), icon: <Coffee className="w-4 h-4" />, priceUSD: product.pricePrintUSD },
    { key: 'mug', label: t('products.mug'), icon: <MugIcon />, priceUSD: product.priceMugUSD },
    { key: 'pen', label: t('products.pen'), icon: <PenIcon />, priceUSD: product.pricePenUSD },
    ...(product.hasCustomService
      ? [{ key: 'custom' as ProductVersion, label: t('products.custom'), icon: <Paintbrush className="w-4 h-4" /> }]
      : []),
  ];

  const currentVersion = versions.find(v => v.key === selectedVersion);
  const currentPriceUSD = currentVersion?.priceUSD;
  const currentPriceBRL = currentPriceUSD ? convertToBRL(currentPriceUSD) : null;

  const handleVersionSelect = (key: ProductVersion) => {
    setSelectedVersion(key);
    if (isMobile) {
      setIsBottomSheetOpen(false);
    }
  };

  return (
    <>
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
                <Button className="w-full gradient-neon text-primary-foreground font-semibold gap-2 min-h-[44px] touch-manipulation">
                  <ShoppingBag className="w-4 h-4" />
                  {t('products.addToCart')}
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
            {currentPriceUSD && currentPriceBRL && (
              <div className="text-right">
                <p className="text-artist-primary font-bold text-lg font-mono tabular-nums">
                  R$ {currentPriceBRL.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-xs text-muted-foreground font-mono tabular-nums">
                  US$ {currentPriceUSD.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
                <p className="text-[10px] text-muted-foreground/60">
                  {selectedVersion === 'original' ? t('products.uniqueWork') : t('products.unit')}
                </p>
              </div>
            )}
          </div>

          {/* Version Selector - Desktop: inline buttons, Mobile: bottom sheet trigger */}
          {isMobile ? (
            <button
              onClick={() => setIsBottomSheetOpen(true)}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-muted/50 border border-border hover:bg-muted transition-colors min-h-[48px] touch-manipulation"
            >
              <div className="flex items-center gap-2">
                {currentVersion?.icon}
                <span className="font-medium">{currentVersion?.label}</span>
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            </button>
          ) : (
            <div className="flex gap-1.5 flex-wrap">
              {versions.map((version) => (
                <button
                  key={version.key}
                  onClick={() => setSelectedVersion(version.key)}
                  className={`flex items-center gap-1 px-3 py-2 rounded-full text-xs font-medium transition-all min-h-[36px] touch-manipulation ${
                    selectedVersion === version.key
                      ? 'bg-artist-primary text-primary-foreground neon-glow'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {version.icon}
                  <span>{version.label}</span>
                </button>
              ))}
            </div>
          )}

          {/* Custom Service Form Trigger - only show on desktop or after selecting custom */}
          {selectedVersion === 'custom' && product.hasCustomService && !isMobile && (
            <CustomServiceDialog productTitle={product.title} artistName={product.artist} />
          )}
        </div>
      </motion.div>

      {/* Mobile Bottom Sheet for Version Selection */}
      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        title={t('products.chooseFormat')}
      >
        <div className="p-4 space-y-2">
          {versions.map((version) => (
            <button
              key={version.key}
              onClick={() => handleVersionSelect(version.key)}
              className={`w-full flex items-center justify-between px-4 py-4 rounded-xl transition-all min-h-[56px] touch-manipulation ${
                selectedVersion === version.key
                  ? 'bg-artist-primary/20 border border-artist-primary text-artist-primary'
                  : 'bg-muted/50 border border-transparent hover:bg-muted'
              }`}
            >
              <div className="flex items-center gap-3">
                {version.icon}
                <span className="font-medium">{version.label}</span>
              </div>
              {version.priceUSD && (
                <div className="text-right">
                  <p className="font-mono font-semibold tabular-nums">
                    R$ {convertToBRL(version.priceUSD).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  <p className="text-xs text-muted-foreground font-mono tabular-nums">
                    US$ {version.priceUSD.toFixed(2)}
                  </p>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Add to Cart button in bottom sheet */}
        <div className="p-4 border-t border-border">
          <Button className="w-full gradient-neon text-primary-foreground font-semibold gap-2 min-h-[52px] touch-manipulation">
            <ShoppingBag className="w-5 h-5" />
            {t('products.addToCart')}
          </Button>
        </div>
      </BottomSheet>
    </>
  );
}

function CustomServiceDialog({ productTitle, artistName }: { productTitle: string; artistName: string }) {
  const { t } = useLanguage();
  
  return (
    <Dialog>
      <DialogTrigger asChild>
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4"
        >
          <Button variant="outline" className="w-full neon-border group min-h-[48px] touch-manipulation">
            <Paintbrush className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
            {t('products.requestQuote')}
          </Button>
        </motion.div>
      </DialogTrigger>
      <DialogContent className="glass-strong border-artist-primary/20 max-w-lg mx-4">
        <DialogHeader>
          <DialogTitle className="text-2xl neon-text-subtle text-artist-primary">
            {t('products.customPainting')}
          </DialogTitle>
          <p className="text-muted-foreground">
            {t('products.requestQuoteDescription')} "{productTitle}" de {artistName} {t('products.inYourEnvironment')}
          </p>
        </DialogHeader>
        <form className="space-y-4 mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">{t('products.name')}</label>
              <Input placeholder={t('products.name')} className="bg-muted/50 min-h-[48px]" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">{t('products.phone')}</label>
              <Input placeholder="(13) 99999-9999" className="bg-muted/50 min-h-[48px]" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">{t('products.email')}</label>
            <Input type="email" placeholder="seu@email.com" className="bg-muted/50 min-h-[48px]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">{t('products.width')}</label>
              <Input type="number" placeholder="3.5" className="bg-muted/50 min-h-[48px]" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">{t('products.height')}</label>
              <Input type="number" placeholder="2.5" className="bg-muted/50 min-h-[48px]" />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">{t('products.environmentDescription')}</label>
            <Textarea 
              placeholder={t('products.environmentPlaceholder')} 
              className="bg-muted/50 min-h-[100px]"
            />
          </div>
          <Button type="submit" className="w-full gradient-neon text-primary-foreground font-semibold min-h-[52px] touch-manipulation">
            <Zap className="w-4 h-4 mr-2" />
            {t('products.submitQuote')}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
