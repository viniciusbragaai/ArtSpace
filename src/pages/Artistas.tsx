import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';
import { Instagram, BadgeCheck, ExternalLink, Palette } from 'lucide-react';
import { useArtistTheme, Artist } from '@/contexts/ArtistThemeContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Link } from 'react-router-dom';

export default function Artistas() {
  const { artists, setCurrentArtist } = useArtistTheme();
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);

  const handleViewPortfolio = (artist: Artist) => {
    setCurrentArtist(artist);
    setSelectedArtist(null);
  };

  return (
    <PageLayout title="Artistas" subtitle="Conheça os talentos que fazem parte da ArtSpace">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 py-8">
        {artists.map((artist, index) => (
          <motion.button
            key={artist.id}
            onClick={() => setSelectedArtist(artist)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -5 }}
            className="group relative p-4 rounded-2xl bg-card border border-border hover:border-artist-primary/50 transition-all duration-300 text-left"
          >
            <div
              className="w-20 h-20 md:w-24 md:h-24 mx-auto rounded-full overflow-hidden mb-4 transition-all duration-500"
              style={{
                backgroundColor: artist.neonColor,
                boxShadow: `inset 0 0 30px rgba(0,0,0,0.5)`,
              }}
            >
              <img
                src={artist.photo}
                alt={artist.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex items-center justify-center gap-1.5 mb-1">
              <h3 className="font-bold text-center text-sm md:text-base">{artist.name}</h3>
              <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-500 flex-shrink-0" />
            </div>
            <p
              className="text-[10px] md:text-xs text-center px-2 py-0.5 rounded-full mx-auto w-fit"
              style={{
                backgroundColor: `${artist.neonColor}20`,
                color: artist.neonColor,
              }}
            >
              {artist.specialty}
            </p>
            <p className="text-xs md:text-sm text-muted-foreground text-center mt-3 line-clamp-2">
              {artist.bio}
            </p>
          </motion.button>
        ))}
      </div>

      {/* Artist Detail Modal */}
      <Dialog open={!!selectedArtist} onOpenChange={() => setSelectedArtist(null)}>
        <DialogContent className="max-w-lg glass-strong border-artist-primary/30">
          {selectedArtist && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <div
                    className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0"
                    style={{
                      backgroundColor: selectedArtist.neonColor,
                      boxShadow: `0 0 20px ${selectedArtist.neonColor}40, inset 0 0 30px rgba(0,0,0,0.5)`,
                    }}
                  >
                    <img
                      src={selectedArtist.photo}
                      alt={selectedArtist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <DialogTitle className="text-2xl">{selectedArtist.name}</DialogTitle>
                      <BadgeCheck className="w-5 h-5 text-blue-500 fill-blue-500" />
                    </div>
                    <p
                      className="text-xs px-2 py-0.5 rounded-full w-fit mt-1"
                      style={{
                        backgroundColor: `${selectedArtist.neonColor}20`,
                        color: selectedArtist.neonColor,
                      }}
                    >
                      {selectedArtist.specialty}
                    </p>
                    <a
                      href={selectedArtist.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-sm text-muted-foreground hover:text-artist-primary transition-colors mt-1"
                    >
                      <Instagram className="w-4 h-4" />
                      {selectedArtist.handle}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-4 pt-4">
                <div>
                  <h4 className="text-sm font-semibold text-muted-foreground mb-2">Biografia</h4>
                  <p className="text-sm leading-relaxed">{selectedArtist.bio}</p>
                </div>

                <div className="flex gap-3">
                  <Button
                    className="flex-1 gap-2"
                    style={{
                      background: `linear-gradient(135deg, ${selectedArtist.neonColor} 0%, ${selectedArtist.neonColor}cc 100%)`,
                      color: '#000',
                    }}
                    onClick={() => handleViewPortfolio(selectedArtist)}
                    asChild
                  >
                    <Link to="/">
                      <Palette className="w-4 h-4" />
                      Ver Obras
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 gap-2 neon-border"
                    asChild
                  >
                    <a href={selectedArtist.instagram} target="_blank" rel="noopener noreferrer">
                      <Instagram className="w-4 h-4" />
                      Instagram
                    </a>
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}
