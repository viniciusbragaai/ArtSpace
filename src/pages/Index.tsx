import { motion } from 'framer-motion';
import { ArtistThemeProvider } from '@/contexts/ArtistThemeContext';
import { CurrencyProvider } from '@/contexts/CurrencyContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { HeroSlider } from '@/components/HeroSlider';
import { ArtistSlider } from '@/components/ArtistSlider';
import { ProductGrid } from '@/components/ProductGrid';
import { ArtNews } from '@/components/ArtNews';
import { PaymentMethodsBadge } from '@/components/PaymentIcons';
import { Footer } from '@/components/Footer';
import { BottomNavigation } from '@/components/BottomNavigation';

const Index = () => {
  return (
    <LanguageProvider>
      <CurrencyProvider>
        <ArtistThemeProvider>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-background transition-colors duration-700 page-transition overflow-y-auto"
            style={{ overflowY: 'auto', height: 'auto' }}
          >
            <Header />
            <main className="pb-20 md:pb-0">
              <div className="max-w-6xl mx-auto px-4">
                <ArtistSlider />
                <ProductGrid />
                <HeroSlider />
                <PaymentMethodsBadge />
                <ArtNews />
              </div>
            </main>
            <Footer />
            <BottomNavigation />
          </motion.div>
        </ArtistThemeProvider>
      </CurrencyProvider>
    </LanguageProvider>
  );
};

export default Index;
