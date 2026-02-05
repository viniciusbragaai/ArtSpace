import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface HeroSlide {
  id: number;
  titleKey: string;
  highlightKey: string;
  subtitleKey: string;
  accentKey: string;
  descriptionKey: string;
  primaryBtnKey: string;
  secondaryBtnKey: string;
  gradientClass: string;
}

const heroSlides: HeroSlide[] = [
  {
    id: 1,
    titleKey: 'hero.slide1.title',
    highlightKey: 'hero.slide1.highlight',
    subtitleKey: 'hero.slide1.subtitle',
    accentKey: 'hero.slide1.accent',
    descriptionKey: 'hero.slide1.description',
    primaryBtnKey: 'hero.slide1.primaryBtn',
    secondaryBtnKey: 'hero.slide1.secondaryBtn',
    gradientClass: 'from-artist-primary/20 via-transparent to-artist-secondary/20',
  },
  {
    id: 2,
    titleKey: 'hero.slide2.title',
    highlightKey: 'hero.slide2.highlight',
    subtitleKey: 'hero.slide2.subtitle',
    accentKey: 'hero.slide2.accent',
    descriptionKey: 'hero.slide2.description',
    primaryBtnKey: 'hero.slide2.primaryBtn',
    secondaryBtnKey: 'hero.slide2.secondaryBtn',
    gradientClass: 'from-purple-500/20 via-transparent to-pink-500/20',
  },
  {
    id: 3,
    titleKey: 'hero.slide3.title',
    highlightKey: 'hero.slide3.highlight',
    subtitleKey: 'hero.slide3.subtitle',
    accentKey: 'hero.slide3.accent',
    descriptionKey: 'hero.slide3.description',
    primaryBtnKey: 'hero.slide3.primaryBtn',
    secondaryBtnKey: 'hero.slide3.secondaryBtn',
    gradientClass: 'from-cyan-500/20 via-transparent to-blue-500/20',
  },
  {
    id: 4,
    titleKey: 'hero.slide4.title',
    highlightKey: 'hero.slide4.highlight',
    subtitleKey: 'hero.slide4.subtitle',
    accentKey: 'hero.slide4.accent',
    descriptionKey: 'hero.slide4.description',
    primaryBtnKey: 'hero.slide4.primaryBtn',
    secondaryBtnKey: 'hero.slide4.secondaryBtn',
    gradientClass: 'from-orange-500/20 via-transparent to-red-500/20',
  },
  {
    id: 5,
    titleKey: 'hero.slide5.title',
    highlightKey: 'hero.slide5.highlight',
    subtitleKey: 'hero.slide5.subtitle',
    accentKey: 'hero.slide5.accent',
    descriptionKey: 'hero.slide5.description',
    primaryBtnKey: 'hero.slide5.primaryBtn',
    secondaryBtnKey: 'hero.slide5.secondaryBtn',
    gradientClass: 'from-green-500/20 via-transparent to-teal-500/20',
  },
];

export function HeroSlider() {
  const { t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 30 },
    [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section
      className="relative min-h-[35vh] md:min-h-[40vh] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Carousel Container */}
      <div className="absolute inset-0" ref={emblaRef}>
        <div className="flex h-full">
          {heroSlides.map((slide, index) => (
            <div key={slide.id} className="flex-[0_0_100%] min-w-0 relative">
              {/* Animated Background */}
              <div className="absolute inset-0 gradient-artist" />
              <div className={cn('absolute inset-0 bg-gradient-to-br opacity-50', slide.gradientClass)} />
              <div className="absolute inset-0 opacity-20">
                <div
                  className="absolute top-1/4 left-1/4 w-64 h-64 bg-artist-primary/20 rounded-full blur-3xl animate-float"
                  style={{ animationDelay: `${index * 0.5}s` }}
                />
                <div
                  className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-artist-secondary/20 rounded-full blur-3xl animate-float"
                  style={{ animationDelay: `${index * 0.5 + 1.5}s` }}
                />
              </div>

              {/* Slide Content - Minimalist */}
              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="container mx-auto px-4">
                  <AnimatePresence mode="wait">
                    {selectedIndex === index && (
                      <motion.div
                        key={slide.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="text-center max-w-2xl mx-auto"
                      >
                        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 leading-tight">
                          {t(slide.titleKey)}{' '}
                          <span className="text-gradient-neon">{t(slide.highlightKey)}</span>
                        </h2>

                        <p className="text-sm md:text-base text-muted-foreground mb-4 max-w-lg mx-auto line-clamp-2">
                          {t(slide.descriptionKey)}
                        </p>

                        <div className="flex items-center justify-center gap-3">
                          <Button
                            size="sm"
                            className="gradient-neon text-primary-foreground font-semibold px-6 h-9"
                          >
                            {t(slide.primaryBtnKey)}
                          </Button>
                          <Button size="sm" variant="outline" className="neon-border h-9 px-6">
                            {t(slide.secondaryBtnKey)}
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows - Only visible on hover */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
        transition={{ duration: 0.2 }}
        onClick={scrollPrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-background/20 backdrop-blur-sm border border-white/10 hover:bg-background/40 hover:border-artist-primary/50 transition-all group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-foreground/70 group-hover:text-artist-primary transition-colors" />
      </motion.button>

      <motion.button
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
        transition={{ duration: 0.2 }}
        onClick={scrollNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-2 md:p-3 rounded-full bg-background/20 backdrop-blur-sm border border-white/10 hover:bg-background/40 hover:border-artist-primary/50 transition-all group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-foreground/70 group-hover:text-artist-primary transition-colors" />
      </motion.button>

      {/* Pagination Dots - with better spacing from buttons */}
      <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 mt-4">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className="min-w-[32px] min-h-[32px] flex items-center justify-center touch-manipulation"
            aria-label={`Go to slide ${index + 1}`}
          >
            <span
              className={cn(
                'block transition-all duration-300 rounded-full',
                selectedIndex === index
                  ? 'w-8 h-2 bg-artist-primary neon-glow'
                  : 'w-2 h-2 bg-foreground/30 hover:bg-foreground/50'
              )}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
