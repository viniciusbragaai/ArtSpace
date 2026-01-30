import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Compass, ShoppingCart, User } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface NavItem {
  path: string;
  icon: React.ReactNode;
  labelKey: string;
  defaultLabel: string;
}

const navItems: NavItem[] = [
  { path: '/', icon: <Home className="w-5 h-5" />, labelKey: 'nav.home', defaultLabel: 'Home' },
  { path: '/explore', icon: <Compass className="w-5 h-5" />, labelKey: 'nav.explore', defaultLabel: 'Explorar' },
  { path: '/cart', icon: <ShoppingCart className="w-5 h-5" />, labelKey: 'nav.cart', defaultLabel: 'Carrinho' },
  { path: '/profile', icon: <User className="w-5 h-5" />, labelKey: 'nav.profile', defaultLabel: 'Perfil' },
];

export function BottomNavigation() {
  const location = useLocation();
  const { t } = useLanguage();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass-strong border-t border-border/50 safe-area-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const label = t(item.labelKey) || item.defaultLabel;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className="relative flex flex-col items-center justify-center min-w-[64px] min-h-[44px] px-3 py-2 touch-manipulation"
            >
              <motion.div
                className={`flex flex-col items-center gap-1 transition-colors ${
                  isActive ? 'text-artist-primary' : 'text-muted-foreground'
                }`}
                whileTap={{ scale: 0.9 }}
              >
                {item.icon}
                <span className="text-[10px] font-medium">{label}</span>
              </motion.div>
              
              {isActive && (
                <motion.div
                  layoutId="bottomNavIndicator"
                  className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-artist-primary"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
