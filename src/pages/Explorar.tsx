import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Bookmark, BadgeCheck, UserPlus, UserCheck } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { useArtistTheme } from '@/contexts/ArtistThemeContext';
import { toast } from 'sonner';

// Mock feed data with categories
const feedItems = [
  {
    id: '1',
    artistId: '1',
    image: 'https://images.unsplash.com/photo-1561839561-b13bcfe95249?w=800',
    likes: 342,
    comments: 28,
    caption: 'Nova série "Cores da Cidade" disponível na galeria! 🎨',
    category: 'art',
  },
  {
    id: '2',
    artistId: '3',
    image: 'https://images.unsplash.com/photo-1569172122301-bc5008bc09c5?w=800',
    likes: 567,
    comments: 45,
    caption: 'Processo criativo do novo mural em São Paulo 🖌️',
    category: 'art',
  },
  {
    id: '3',
    artistId: '5',
    image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800',
    likes: 892,
    comments: 73,
    caption: 'Arte que transforma espaços e mentes ✨',
    category: 'art',
  },
  {
    id: '4',
    artistId: '2',
    image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=800',
    likes: 234,
    comments: 19,
    caption: 'Detalhes do último trabalho em canvas 🖼️',
    category: 'art',
  },
  {
    id: '5',
    artistId: '10',
    image: 'https://images.unsplash.com/photo-1573096108468-702f6014ef28?w=800',
    likes: 456,
    comments: 32,
    caption: 'Stencil é resistência. Arte urbana desde 1985 🔥',
    category: 'art',
  },
  {
    id: '6',
    artistId: '9',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800',
    likes: 678,
    comments: 54,
    caption: 'Explorando novas paletas digitais 💜',
    category: 'art',
  },
];

export default function Explorar() {
  const { artists } = useArtistTheme();
  const [likedPosts, setLikedPosts] = useState<string[]>([]);
  const [savedPosts, setSavedPosts] = useState<string[]>([]);
  const [followedArtists, setFollowedArtists] = useState<string[]>([]);

  const toggleLike = (id: string) => {
    setLikedPosts(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const toggleSave = (id: string) => {
    setSavedPosts(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
    if (!savedPosts.includes(id)) {
      toast.success('Post salvo!');
    }
  };

  const toggleFollow = (artistId: string, artistName: string) => {
    setFollowedArtists(prev => {
      const isFollowing = prev.includes(artistId);
      if (isFollowing) {
        toast.info(`Você deixou de seguir ${artistName}`);
        return prev.filter(a => a !== artistId);
      } else {
        toast.success(`Você agora segue ${artistName}!`);
        return [...prev, artistId];
      }
    });
  };

  return (
    <PageLayout title="Explorar" subtitle="Descubra o que está acontecendo na comunidade">
      {/* Following Filter */}
      {followedArtists.length > 0 && (
        <div className="py-4 border-b border-border mb-4">
          <p className="text-sm text-muted-foreground text-center">
            Seguindo <span className="font-semibold text-foreground">{followedArtists.length}</span> artistas
          </p>
        </div>
      )}

      <div className="py-4 max-w-lg mx-auto space-y-6">
        {feedItems.map((item, index) => {
          const artist = artists.find(a => a.id === item.artistId);
          const isLiked = likedPosts.includes(item.id);
          const isSaved = savedPosts.includes(item.id);
          const isFollowing = followedArtists.includes(item.artistId);

          if (!artist) return null;

          return (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="rounded-2xl bg-card border border-border overflow-hidden"
            >
              {/* Header with Follow Button */}
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full overflow-hidden ring-2 ring-offset-2 ring-offset-background ${isFollowing ? 'ring-artist-primary' : 'ring-transparent'}`}
                    style={{
                      backgroundColor: artist.neonColor,
                      boxShadow: `inset 0 0 20px rgba(0,0,0,0.5)`,
                    }}
                  >
                    <img
                      src={artist.photo}
                      alt={artist.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <p className="font-semibold text-sm">{artist.name}</p>
                      <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-500" />
                    </div>
                    <p className="text-xs text-muted-foreground">{artist.handle}</p>
                  </div>
                </div>
                <Button
                  variant={isFollowing ? "outline" : "default"}
                  size="sm"
                  className="gap-1.5 h-8"
                  style={!isFollowing ? {
                    background: `linear-gradient(135deg, ${artist.neonColor} 0%, ${artist.neonColor}cc 100%)`,
                    color: '#000',
                  } : undefined}
                  onClick={() => toggleFollow(artist.id, artist.name)}
                >
                  {isFollowing ? (
                    <>
                      <UserCheck className="w-3.5 h-3.5" />
                      Seguindo
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5" />
                      Seguir
                    </>
                  )}
                </Button>
              </div>

              {/* Image */}
              <div className="aspect-square">
                <img
                  src={item.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Actions */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleLike(item.id)}
                      className={isLiked ? 'text-red-500' : ''}
                    >
                      <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MessageCircle className="w-6 h-6" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Share2 className="w-6 h-6" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleSave(item.id)}
                    className={isSaved ? 'text-artist-primary' : ''}
                  >
                    <Bookmark className={`w-6 h-6 ${isSaved ? 'fill-current' : ''}`} />
                  </Button>
                </div>

                <p className="font-semibold text-sm mb-1">
                  {item.likes + (isLiked ? 1 : 0)} curtidas
                </p>
                <p className="text-sm">
                  <span className="font-semibold">{artist.name}</span>{' '}
                  <span className="text-muted-foreground">{item.caption}</span>
                </p>
                <button className="text-sm text-muted-foreground mt-1">
                  Ver todos os {item.comments} comentários
                </button>
              </div>
            </motion.article>
          );
        })}
      </div>
    </PageLayout>
  );
}
