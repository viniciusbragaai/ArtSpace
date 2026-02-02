import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Instagram } from 'lucide-react';
import { useArtistTheme, Artist } from '@/contexts/ArtistThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';

export function ArtistSlider() {
  const { artists, currentArtist, setCurrentArtist } = useArtistTheme();
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  return (
    <section className="relative py-4 md:py-6 overflow-hidden pt-16 md:pt-24">
      {/* Background Gradient */}
      <motion.div
        className="absolute inset-0 opacity-20 transition-all duration-500"
        animate={{
          background: `radial-gradient(ellipse at center, ${currentArtist?.neonColor}33 0%, transparent 70%)`,
        }}
        transition={{ duration: 0.8 }}
      />

      <div className="container mx-auto px-4">
        <div className="text-center mb-3">
          <h2 className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
            {t('artist.selectArtist')}
          </h2>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentArtist?.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center gap-1"
            >
              <h3 className="text-2xl md:text-3xl font-bold neon-text-subtle text-artist-primary transition-colors duration-500">
                {currentArtist?.name}
              </h3>
              {currentArtist && (
                <div className="flex items-center gap-2">
                  <span 
                    className="px-2 py-0.5 rounded-full text-[10px] font-semibold border transition-all duration-500"
                    style={{
                      backgroundColor: `${currentArtist.neonColor}20`,
                      borderColor: `${currentArtist.neonColor}50`,
                      color: currentArtist.neonColor,
                    }}
                  >
                    {currentArtist.specialty}
                  </span>
                  <a
                    href={currentArtist.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative z-50 flex items-center gap-1 text-xs text-muted-foreground hover:text-artist-primary transition-colors cursor-pointer"
                    style={{ pointerEvents: 'auto' }}
                  >
                    <Instagram 
                      className="w-3.5 h-3.5 transition-all duration-300"
                      style={{
                        filter: `drop-shadow(0 0 0px ${currentArtist.neonColor})`,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.filter = `drop-shadow(0 0 8px ${currentArtist.neonColor})`;
                        e.currentTarget.style.color = currentArtist.neonColor;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.filter = `drop-shadow(0 0 0px ${currentArtist.neonColor})`;
                        e.currentTarget.style.color = '';
                      }}
                    />
                    <span className="hidden sm:inline">{currentArtist.handle}</span>
                  </a>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slider Container - Show All Artists */}
        <div className="relative flex items-center justify-center">
          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrev}
            className="absolute left-0 z-10 neon-border bg-background/50 hover:bg-artist-primary/20 min-w-[36px] min-h-[36px] w-9 h-9 touch-manipulation transition-all duration-500"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          {/* Artists - All Visible with Horizontal Scroll */}
          <div
            ref={scrollContainerRef}
            className="flex items-center justify-center gap-2 md:gap-3 px-10 overflow-x-auto scrollbar-hide py-2"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {artists.map((artist, index) => (
              <ArtistCard
                key={artist.id}
                artist={artist}
                isActive={index === activeIndex}
                onClick={() => scrollToArtist(index)}
              />
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleNext}
            className="absolute right-0 z-10 neon-border bg-background/50 hover:bg-artist-primary/20 min-w-[36px] min-h-[36px] w-9 h-9 touch-manipulation transition-all duration-500"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Artist Bio - Compact */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentArtist?.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="text-center mt-3 max-w-md mx-auto"
          >
            <p className="text-muted-foreground text-xs md:text-sm leading-relaxed line-clamp-2">
              {currentArtist?.bio}
            </p>
            {currentArtist && (
              <a
                href={currentArtist.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-50 inline-flex items-center gap-1.5 mt-2 px-3 py-1.5 rounded-full bg-muted/50 border border-border transition-all duration-500 group cursor-pointer"
                style={{ pointerEvents: 'auto' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${currentArtist.neonColor}20`;
                  e.currentTarget.style.borderColor = `${currentArtist.neonColor}50`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '';
                  e.currentTarget.style.borderColor = '';
                }}
              >
                <Instagram
                  className="w-4 h-4 text-muted-foreground transition-all duration-300"
                  style={{
                    filter: `drop-shadow(0 0 0px ${currentArtist.neonColor})`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = `drop-shadow(0 0 10px ${currentArtist.neonColor})`;
                    e.currentTarget.style.color = currentArtist.neonColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = `drop-shadow(0 0 0px ${currentArtist.neonColor})`;
                    e.currentTarget.style.color = '';
                  }}
                />
                <span className="text-xs font-medium text-muted-foreground group-hover:text-artist-primary transition-colors">
                  {t('artist.viewProfile')}
                </span>
              </a>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Dots Indicator - Single Line */}
        <div className="flex justify-center gap-0.5 mt-3 flex-nowrap overflow-hidden">
          {artists.map((artist, index) => (
            <button
              key={index}
              onClick={() => scrollToArtist(index)}
              className="min-w-[24px] min-h-[24px] flex items-center justify-center touch-manipulation"
            >
              <span
                className="block transition-all duration-500 rounded-full"
                style={{
                  width: index === activeIndex ? '14px' : '6px',
                  height: '6px',
                  backgroundColor: index === activeIndex ? artist.neonColor : 'hsl(var(--muted))',
                  boxShadow: index === activeIndex ? `0 0 8px ${artist.neonColor}` : 'none',
                }}
              />
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
}

function ArtistCard({ artist, isActive, onClick }: ArtistCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        scale: isActive ? 1.15 : 0.9,
        opacity: isActive ? 1 : 0.7,
      }}
      whileHover={{ scale: isActive ? 1.2 : 0.95 }}
      whileTap={{ scale: isActive ? 1.1 : 0.85 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className={`relative flex-shrink-0 min-w-[44px] min-h-[44px] touch-manipulation ${
        isActive ? 'z-10' : 'z-0'
      }`}
    >
      {/* Studio Background Container with Vignette */}
      <div
        className="relative w-12 h-12 md:w-14 md:h-14 aspect-square rounded-full overflow-hidden transition-all duration-500"
        style={{
          backgroundColor: isActive || isHovered ? artist.neonColor : `${artist.neonColor}40`,
          boxShadow: isActive
            ? `inset 0 0 50px rgba(0,0,0,0.5), 0 0 15px ${artist.neonColor}60`
            : 'inset 0 0 50px rgba(0,0,0,0.5)',
          border: isActive ? `2px solid ${artist.neonColor}` : '1px solid hsl(var(--border))',
        }}
      >
        {/* Artist Photo with PNG transparency support */}
        <img
          src={artist.photo}
          alt={artist.name}
          className="w-full h-full aspect-square rounded-full object-cover relative z-10"
          style={{
            filter: isActive ? 'none' : 'grayscale(30%)',
          }}
          onError={(e) => {
            e.currentTarget.src = `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop`;
          }}
        />

        {/* Active Ring Indicator */}
        {isActive && (
          <motion.div
            layoutId="activeRing"
            className="absolute inset-0 rounded-full"
            style={{
              border: `2px solid ${artist.neonColor}`,
              boxShadow: `0 0 12px ${artist.neonColor}`,
            }}
            initial={false}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          />
        )}
      </div>

      {/* Name tooltip on active */}
      <motion.div
        animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 5 }}
        className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <p
          className="text-[10px] font-semibold whitespace-nowrap transition-all duration-500"
          style={{ color: artist.neonColor }}
        >
          {artist.name}
        </p>
      </motion.div>
    </motion.button>
  );
}
