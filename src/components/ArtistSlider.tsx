import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useArtistTheme, Artist } from '@/contexts/ArtistThemeContext';
import { Button } from '@/components/ui/button';

export function ArtistSlider() {
  const { artists, currentArtist, setCurrentArtist } = useArtistTheme();
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
            Selecione um Artista
          </h2>
          <AnimatePresence mode="wait">
            <motion.h3
              key={currentArtist?.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-3xl md:text-4xl font-bold neon-text-subtle text-artist-primary"
            >
              {currentArtist?.name}
            </motion.h3>
          </AnimatePresence>
        </div>

        {/* Slider Container */}
        <div className="relative flex items-center justify-center">
          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrev}
            className="absolute left-0 z-10 neon-border bg-background/50 hover:bg-artist-primary/20"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          {/* Artists */}
          <div
            ref={sliderRef}
            className="flex items-center justify-center gap-4 md:gap-8 px-12 overflow-hidden"
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
            className="absolute right-0 z-10 neon-border bg-background/50 hover:bg-artist-primary/20"
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
            className="text-center mt-6 max-w-md mx-auto"
          >
            <p className="text-artist-primary font-medium mb-1">
              {currentArtist?.specialty}
            </p>
            <p className="text-muted-foreground text-sm">
              {currentArtist?.bio}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {artists.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToArtist(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'w-6 bg-artist-primary neon-glow'
                  : 'bg-muted hover:bg-muted-foreground'
              }`}
            />
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
        scale: isActive ? 1.2 : 0.8,
        opacity: Math.abs(offset) > 2 ? 0 : isActive ? 1 : 0.5,
        x: offset * 20,
      }}
      whileHover={{ scale: isActive ? 1.25 : 0.85 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`relative flex-shrink-0 ${isActive ? 'z-10' : 'z-0'}`}
    >
      <div
        className={`relative w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden transition-all duration-500 ${
          isActive ? 'neon-glow-strong ring-2 ring-artist-primary' : 'ring-1 ring-border'
        }`}
      >
        <img
          src={artist.photo}
          alt={artist.name}
          className="w-full h-full object-cover"
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
      <motion.p
        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs font-medium whitespace-nowrap text-artist-primary"
      >
        {artist.name}
      </motion.p>
    </motion.button>
  );
}
