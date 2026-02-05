import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingCart, User, X, Menu } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LanguageSelector } from '@/components/LanguageSelector';
import { ExchangeRateDisplay } from '@/components/ExchangeRateDisplay';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { useArtistTheme } from '@/contexts/ArtistThemeContext';
import artspaceLogo from '@/assets/artspace-logo.png';

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { totalItems, setIsCartOpen } = useCart();
  const { isAuthenticated, setIsAuthModalOpen } = useAuth();
  const { artists, setCurrentArtist } = useArtistTheme();

  // Filter artists based on search query
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return artists.filter(artist => 
      artist.name.toLowerCase().includes(query) ||
      artist.handle.toLowerCase().includes(query) ||
      artist.specialty.toLowerCase().includes(query)
    );
  }, [searchQuery, artists]);

  const handleSearchSelect = (artist: typeof artists[0]) => {
    setCurrentArtist(artist);
    setSearchQuery('');
    setShowSearchResults(false);
    navigate('/');
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      handleSearchSelect(searchResults[0]);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-strong safe-area-top">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-14 md:h-20">
          {/* Logo with Neon Glow - Synced with Theme */}
          <motion.a
            href="/"
            className="relative z-10 group min-w-[44px] min-h-[44px] flex items-center touch-manipulation"
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

          {/* Search Bar - Desktop - Always Expanded with autocomplete */}
          <div className="hidden lg:flex flex-1 mx-8 relative">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <Input
                type="search"
                placeholder={t('header.search')}
                className="w-full bg-muted/50 border-artist-primary/30 focus:border-artist-primary rounded-full pl-10 pr-4 h-11"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSearchResults(true);
                }}
                onFocus={() => setShowSearchResults(true)}
                onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </form>
            
            {/* Search Results Dropdown */}
            <AnimatePresence>
              {showSearchResults && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50"
                >
                  {searchResults.map((artist) => (
                    <button
                      key={artist.id}
                      onClick={() => handleSearchSelect(artist)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/50 transition-colors text-left"
                    >
                      <div
                        className="w-10 h-10 rounded-full overflow-hidden"
                        style={{ backgroundColor: artist.neonColor }}
                      >
                        <img src={artist.photo} alt={artist.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="font-medium">{artist.name}</p>
                        <p className="text-xs text-muted-foreground">{artist.specialty}</p>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-3">
            {/* Exchange Rate Display */}
            <ExchangeRateDisplay />
            
            {/* Language Selector */}
            <LanguageSelector />

            <div className="w-px h-8 bg-border mx-1" />

            <Button 
              variant="ghost" 
              size="sm" 
              className="text-muted-foreground hover:text-foreground hover:bg-muted min-h-[44px] px-4"
              onClick={() => isAuthenticated ? window.location.href = '/perfil' : setIsAuthModalOpen(true)}
            >
              <User className="w-4 h-4 mr-2" />
              {isAuthenticated ? 'Perfil' : t('header.login')}
            </Button>
            {!isAuthenticated && (
              <Button 
                variant="outline" 
                size="sm" 
                className="neon-border hover:bg-artist-primary/10 text-foreground min-h-[44px] px-4"
                onClick={() => setIsAuthModalOpen(true)}
              >
                {t('header.register')}
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative min-w-[44px] min-h-[44px]"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-artist-primary text-primary-foreground text-xs flex items-center justify-center font-medium"
                >
                  {totalItems}
                </motion.span>
              )}
            </Button>
          </nav>

          {/* Mobile Actions - Simplified */}
          <div className="flex md:hidden items-center gap-1">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="min-w-[44px] min-h-[44px] touch-manipulation"
            >
              <Search className="w-5 h-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="min-w-[44px] min-h-[44px] touch-manipulation"
            >
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
                  className="w-full bg-muted/50 border-artist-primary/30 rounded-full pl-10 h-11"
                  autoFocus
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
              <div className="flex flex-col gap-3">
                {/* Exchange Rate and Language for Mobile */}
                <div className="flex items-center justify-between gap-2 px-2 py-2">
                  <ExchangeRateDisplay />
                  <LanguageSelector />
                </div>
                
                <Button variant="ghost" className="justify-start min-h-[48px] touch-manipulation">
                  <User className="w-5 h-5 mr-3" />
                  {t('header.login')}
                </Button>
                <Button variant="outline" className="neon-border justify-start min-h-[48px] touch-manipulation">
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
