import { motion } from 'framer-motion';
import { ArtistThemeProvider } from '@/contexts/ArtistThemeContext';
import { CurrencyProvider } from '@/contexts/CurrencyContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { ArtistSlider } from '@/components/ArtistSlider';
import { ProductGrid } from '@/components/ProductGrid';
import { ArtNews } from '@/components/ArtNews';
import { PaymentMethodsBadge } from '@/components/PaymentIcons';
import { Footer } from '@/components/Footer';

const Index = () => {
  return (
    <LanguageProvider>
      <CurrencyProvider>
        <ArtistThemeProvider>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen bg-background transition-colors duration-700"
          >
            <Header />
            <main>
              <HeroSection />
              <ArtistSlider />
              <ProductGrid />
              <PaymentMethodsBadge />
              <ArtNews />
            </main>
            <Footer />
          </motion.div>
        </ArtistThemeProvider>
      </CurrencyProvider>
    </LanguageProvider>
  );
};

export default Index;
