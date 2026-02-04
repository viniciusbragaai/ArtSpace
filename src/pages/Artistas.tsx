import { PageLayout } from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';
import { Instagram } from 'lucide-react';
import { useArtistTheme } from '@/contexts/ArtistThemeContext';

export default function Artistas() {
  const { artists } = useArtistTheme();

  return (
    <PageLayout title="Artistas" subtitle="Conheça os talentos que fazem parte da ArtSpace">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-8">
        {artists.map((artist, index) => (
          <motion.a
            key={artist.id}
            href={artist.instagram}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group relative p-4 rounded-2xl bg-card border border-border hover:border-artist-primary/50 transition-all duration-300"
          >
            <div
              className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4"
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
            <h3 className="font-bold text-center mb-1">{artist.name}</h3>
            <p
              className="text-xs text-center px-2 py-1 rounded-full mx-auto w-fit"
              style={{
                backgroundColor: `${artist.neonColor}20`,
                color: artist.neonColor,
              }}
            >
              {artist.specialty}
            </p>
            <p className="text-sm text-muted-foreground text-center mt-3 line-clamp-2">
              {artist.bio}
            </p>
            <div className="flex items-center justify-center gap-1 mt-3 text-sm text-muted-foreground group-hover:text-artist-primary transition-colors">
              <Instagram className="w-4 h-4" />
              <span>{artist.handle}</span>
            </div>
          </motion.a>
        ))}
      </div>
    </PageLayout>
  );
}
