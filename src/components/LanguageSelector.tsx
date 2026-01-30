import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { useLanguage, LANGUAGES, Language } from '@/contexts/LanguageContext';

// Circular flag components
const FlagBR = () => (
  <div className="w-5 h-5 rounded-full overflow-hidden ring-1 ring-white/20 flex-shrink-0">
    <svg viewBox="0 0 36 36" className="w-full h-full">
      <path fill="#009B3A" d="M36 27a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4h28a4 4 0 0 1 4 4v18z"/>
      <path fill="#FEDF01" d="M32.728 18L18 29.124 3.272 18 18 6.876z"/>
      <circle fill="#002776" cx="18" cy="18" r="6.5"/>
      <path fill="#CBE9D4" d="M12.277 14.887a6.5 6.5 0 0 0-.672 2.023c3.995-.29 9.417 1.891 11.744 4.595.402-.604.7-1.28.883-2.004-2.872-2.808-7.917-4.63-11.955-4.614z"/>
    </svg>
  </div>
);

const FlagUS = () => (
  <div className="w-5 h-5 rounded-full overflow-hidden ring-1 ring-white/20 flex-shrink-0">
    <svg viewBox="0 0 36 36" className="w-full h-full">
      <path fill="#B22234" d="M35.445 7C34.752 5.809 33.477 5 32 5H18v2h17.445zM0 25h36v2H0zm18-8h18v2H18zm0-4h18v2H18zM0 21h36v2H0zm4 10h28c1.477 0 2.752-.809 3.445-2H.555c.693 1.191 1.968 2 3.445 2zM18 9h18v2H18z"/>
      <path fill="#EEE" d="M.068 27.679c.017.093.036.186.059.277h35.746c.023-.091.042-.184.059-.277.026-.139.043-.281.068-.421H0c.025.14.042.282.068.421zM0 23h36v2H0zm0-4v2h36v-2H18zm18-4v2h18v-2zm0-4h18v2H18zM0 9h.555c-.023.091-.042.184-.059.277-.026.139-.043.281-.068.421H0V9zm.555-2c.693-1.191 1.968-2 3.445-2h28c1.477 0 2.752.809 3.445 2H.555z"/>
      <path fill="#3C3B6E" d="M18 5H4a4 4 0 0 0-4 4v10h18V5z"/>
      <path fill="#FFF" d="m1.235 8.297.366 1.127h1.185l-.959.697.367 1.127-.959-.697-.959.697.367-1.127-.959-.697h1.185zm0 4l.366 1.127h1.185l-.959.697.367 1.127-.959-.697-.959.697.367-1.127-.959-.697h1.185zm0 4l.366 1.127h1.185l-.959.697.367 1.127-.959-.697-.959.697.367-1.127-.959-.697h1.185zm3-6l.366 1.127h1.185l-.959.697.367 1.127-.959-.697-.959.697.367-1.127-.959-.697h1.185zm0 4l.366 1.127h1.185l-.959.697.367 1.127-.959-.697-.959.697.367-1.127-.959-.697h1.185zm3-6l.366 1.127h1.185l-.959.697.367 1.127-.959-.697-.959.697.367-1.127-.959-.697h1.185zm0 4l.366 1.127h1.185l-.959.697.367 1.127-.959-.697-.959.697.367-1.127-.959-.697h1.185zm0 4l.366 1.127h1.185l-.959.697.367 1.127-.959-.697-.959.697.367-1.127-.959-.697h1.185zm3-6l.366 1.127h1.185l-.959.697.367 1.127-.959-.697-.959.697.367-1.127-.959-.697h1.185zm0 4l.366 1.127h1.185l-.959.697.367 1.127-.959-.697-.959.697.367-1.127-.959-.697h1.185zm3-6l.366 1.127h1.185l-.959.697.367 1.127-.959-.697-.959.697.367-1.127-.959-.697h1.185zm0 4l.366 1.127h1.185l-.959.697.367 1.127-.959-.697-.959.697.367-1.127-.959-.697h1.185zm0 4l.366 1.127h1.185l-.959.697.367 1.127-.959-.697-.959.697.367-1.127-.959-.697h1.185zm3-6l.366 1.127h1.185l-.959.697.367 1.127-.959-.697-.959.697.367-1.127-.959-.697h1.185zm0 4l.366 1.127h1.185l-.959.697.367 1.127-.959-.697-.959.697.367-1.127-.959-.697h1.185z"/>
    </svg>
  </div>
);

const FlagES = () => (
  <div className="w-5 h-5 rounded-full overflow-hidden ring-1 ring-white/20 flex-shrink-0">
    <svg viewBox="0 0 36 36" className="w-full h-full">
      <path fill="#C60A1D" d="M36 27a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4v-4h36v4zm0-18a4 4 0 0 0-4-4H4a4 4 0 0 0-4 4v4h36V9z"/>
      <path fill="#FFC400" d="M0 13h36v10H0z"/>
    </svg>
  </div>
);

const flagComponents: Record<Language, React.ReactNode> = {
  'pt-BR': <FlagBR />,
  'en-US': <FlagUS />,
  'es-ES': <FlagES />,
};

export function LanguageSelector() {
  const { language, setLanguage, currentLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg glass hover:bg-muted/50 transition-all min-w-[44px] min-h-[44px] touch-manipulation"
      >
        {flagComponents[language]}
        <span className="hidden sm:inline text-sm font-medium text-foreground">{currentLanguage.shortLabel}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 z-50 min-w-[160px] rounded-xl border bg-popover p-1.5 shadow-xl glass-strong"
          >
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all min-h-[44px] touch-manipulation ${
                  language === lang.code
                    ? 'bg-artist-primary/20 text-artist-primary'
                    : 'hover:bg-muted text-foreground'
                }`}
              >
                {flagComponents[lang.code]}
                <span className="font-medium">{lang.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
