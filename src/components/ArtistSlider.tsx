import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Instagram } from 'lucide-react';
import { useArtistTheme, Artist } from '@/contexts/ArtistThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

export function ArtistSlider() {
  const { artists, currentArtist, setCurrentArtist } = useArtistTheme();
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollToArtist = (index: number) => {
    const newIndex = Math.max(0, Math.min(index, artists.length - 1));
    setActiveIndex(newIndex);
    setCurrentArtist(artists[newIndex]);
  };

  const handlePrev = () => {
    const newIndex = activeIndex === 0 ? artists.length - 1 : activeIndex - 1;
    scrollToArtist(newIndex);
  };

  const handleNext = () => {
    const newIndex = activeIndex === artists.length - 1 ? 0 : activeIndex + 1;
    scrollToArtist(newIndex);
  };

  useEffect(() => {
    if (artists.length > 0) {
      setCurrentArtist(artists[0]);
    }
  }, []);

  return (
    <section className="relative py-8 md:py-12 overflow-hidden">
      {/* Background Gradient */}
      <motion.div
        className="absolute inset-0 opacity-30"
        animate={{
          background: `radial-gradient(ellipse at center, hsl(var(--artist-primary) / 0.2) 0%, transparent 70%)`,
        }}
        transition={{ duration: 0.8 }}
      />

      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
            {t('artist.selectArtist')}
          </h2>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentArtist?.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-1"
            >
              <h3 className="text-3xl md:text-4xl font-bold neon-text-subtle text-artist-primary">
                {currentArtist?.name}
              </h3>
              {currentArtist && (
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-artist-primary/20 text-artist-primary border border-artist-primary/30">
                    {currentArtist.specialty}
                  </span>
                  <a
                    href={currentArtist.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-1.5 text-sm text-muted-foreground hover:text-artist-primary transition-colors"
                  >
                    <Instagram className="w-4 h-4 group-hover:drop-shadow-[0_0_8px_hsl(var(--artist-primary))] transition-all" />
                    <span className="hidden sm:inline">{currentArtist.handle}</span>
                  </a>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slider Container */}
        <div className="relative flex items-center justify-center">
          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrev}
            className="absolute left-0 z-10 neon-border bg-background/50 hover:bg-artist-primary/20 min-w-[44px] min-h-[44px] touch-manipulation"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          {/* Artists - Horizontal scroll on mobile */}
          <div
            ref={sliderRef}
            className="flex items-center justify-center gap-4 md:gap-8 px-12 overflow-x-auto scrollbar-hide snap-x snap-mandatory md:overflow-hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {artists.map((artist, index) => (
              <ArtistCard
                key={artist.id}
                artist={artist}
                isActive={index === activeIndex}
                onClick={() => scrollToArtist(index)}
                index={index}
                activeIndex={activeIndex}
              />
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleNext}
            className="absolute right-0 z-10 neon-border bg-background/50 hover:bg-artist-primary/20 min-w-[44px] min-h-[44px] touch-manipulation"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>

        {/* Artist Info */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentArtist?.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="text-center mt-8 max-w-lg mx-auto"
          >
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              {currentArtist?.bio}
            </p>
            {currentArtist && (
              <a
                href={currentArtist.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-full bg-muted/50 hover:bg-artist-primary/20 border border-border hover:border-artist-primary/50 transition-all group"
              >
                <Instagram className="w-5 h-5 text-muted-foreground group-hover:text-artist-primary group-hover:drop-shadow-[0_0_10px_hsl(var(--artist-primary))] transition-all" />
                <span className="text-sm font-medium text-muted-foreground group-hover:text-artist-primary transition-colors">
                  {t('artist.viewProfile')}
                </span>
              </a>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-1 mt-6 flex-wrap max-w-xs mx-auto">
          {artists.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToArtist(index)}
              className={`min-w-[32px] min-h-[32px] flex items-center justify-center touch-manipulation`}
            >
              <span className={`block transition-all duration-300 rounded-full ${
                index === activeIndex
                  ? 'w-5 h-2 bg-artist-primary neon-glow'
                  : 'w-2 h-2 bg-muted hover:bg-muted-foreground'
              }`} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

interface ArtistCardProps {
  artist: Artist;
  isActive: boolean;
  onClick: () => void;
  index: number;
  activeIndex: number;
}

function ArtistCard({ artist, isActive, onClick, index, activeIndex }: ArtistCardProps) {
  const offset = index - activeIndex;
  
  return (
    <motion.button
      onClick={onClick}
      animate={{
        scale: isActive ? 1.2 : 0.75,
        opacity: Math.abs(offset) > 3 ? 0 : isActive ? 1 : 0.5,
        x: offset * 15,
      }}
      whileHover={{ scale: isActive ? 1.25 : 0.8 }}
      whileTap={{ scale: isActive ? 1.15 : 0.7 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`relative flex-shrink-0 snap-center min-w-[44px] min-h-[44px] touch-manipulation ${isActive ? 'z-10' : 'z-0'}`}
    >
      {/* Perfect Circle Container */}
      <div
        className={`relative w-14 h-14 md:w-20 md:h-20 aspect-square rounded-full overflow-hidden transition-all duration-500 ${
          isActive ? 'neon-glow-strong ring-2 ring-artist-primary' : 'ring-1 ring-border'
        }`}
      >
        {/* Image with object-cover to fill the circle */}
        <img
          src={artist.photo}
          alt={artist.name}
          className="w-full h-full aspect-square rounded-full object-cover"
        />
        {isActive && (
          <motion.div
            layoutId="activeRing"
            className="absolute inset-0 rounded-full border-2 border-artist-primary"
            initial={false}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
      </div>
      
      {/* Name tooltip on active */}
      <motion.div
        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
        className="absolute -bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <p className="text-xs font-semibold whitespace-nowrap text-artist-primary">
          {artist.name}
        </p>
      </motion.div>
    </motion.button>
  );
}
