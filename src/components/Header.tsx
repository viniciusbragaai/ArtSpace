import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, User, X, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ExchangeRateDisplay } from '@/components/ExchangeRateDisplay';
import { useLanguage } from '@/contexts/LanguageContext';
import artspaceLogo from '@/assets/artspace-logo.png';

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount] = useState(2);
  const { t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo with Neon Glow - Synced with Theme */}
          <motion.a
            href="/"
            className="relative z-10 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.img 
              src={artspaceLogo} 
              alt="ArtSpace" 
              className="h-8 sm:h-10 md:h-12 lg:h-14 w-auto transition-all duration-300"
              animate={{
                filter: [
                  'drop-shadow(0 0 8px hsl(var(--artist-primary))) drop-shadow(0 0 16px hsl(var(--artist-primary)/0.6)) drop-shadow(0 0 24px hsl(var(--artist-primary)/0.3))',
                  'drop-shadow(0 0 4px hsl(var(--artist-primary)/0.8)) drop-shadow(0 0 8px hsl(var(--artist-primary)/0.4)) drop-shadow(0 0 12px hsl(var(--artist-primary)/0.2))',
                  'drop-shadow(0 0 8px hsl(var(--artist-primary))) drop-shadow(0 0 16px hsl(var(--artist-primary)/0.6)) drop-shadow(0 0 24px hsl(var(--artist-primary)/0.3))',
                ]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.a>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <AnimatePresence mode="wait">
              {isSearchOpen ? (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: '100%', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full"
                >
                  <Input
                    type="search"
                    placeholder={t('header.search')}
                    className="w-full bg-muted/50 border-artist-primary/30 focus:border-artist-primary rounded-full pl-10 pr-10 h-10"
                    autoFocus
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    <X className="w-4 h-4 text-muted-foreground hover:text-foreground transition-colors" />
                  </button>
                </motion.div>
              ) : (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setIsSearchOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                >
                  <Search className="w-4 h-4" />
                  <span className="text-sm">{t('header.searchShort')}</span>
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Right Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-2">
            {/* Exchange Rate Display */}
            <ExchangeRateDisplay />
            
            {/* Language Selector */}
            <LanguageSelector />

            <div className="w-px h-6 bg-border mx-1" />

            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground hover:bg-muted">
              <User className="w-4 h-4 mr-2" />
              {t('header.login')}
            </Button>
            <Button variant="outline" size="sm" className="neon-border hover:bg-artist-primary/10 text-foreground">
              {t('header.register')}
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-artist-primary text-primary-foreground text-xs flex items-center justify-center font-medium"
                >
                  {cartCount}
                </motion.span>
              )}
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-1">
            {/* Exchange Rate - Compact for mobile */}
            <ExchangeRateDisplay />
            
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-artist-primary text-primary-foreground text-[10px] flex items-center justify-center font-medium">
                  {cartCount}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <AnimatePresence>
          {isSearchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden pb-4 overflow-hidden"
            >
              <div className="relative">
                <Input
                  type="search"
                  placeholder={t('header.searchShort')}
                  className="w-full bg-muted/50 border-artist-primary/30 rounded-full pl-10 h-10"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden pb-4 overflow-hidden"
            >
              <div className="flex flex-col gap-2">
                {/* Language Selector for Mobile */}
                <div className="flex items-center justify-between px-2 py-2">
                  <span className="text-sm text-muted-foreground">Idioma</span>
                  <LanguageSelector />
                </div>
                
                <Button variant="ghost" className="justify-start">
                  <User className="w-4 h-4 mr-2" />
                  {t('header.login')}
                </Button>
                <Button variant="outline" className="neon-border justify-start">
                  {t('header.register')}
                </Button>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
