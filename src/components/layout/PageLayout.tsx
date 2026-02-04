import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BottomNavigation } from '@/components/BottomNavigation';

interface PageLayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function PageLayout({ children, title, subtitle }: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 md:pt-24 pb-20 md:pb-0">
        <div className="max-w-6xl mx-auto px-4">
          {title && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="py-8 md:py-12 text-center"
            >
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
              {subtitle && (
                <p className="text-muted-foreground">{subtitle}</p>
              )}
            </motion.div>
          )}
          {children}
        </div>
      </main>
      <Footer />
      <BottomNavigation />
    </div>
  );
}
