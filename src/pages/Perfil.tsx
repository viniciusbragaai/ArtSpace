import { motion } from 'framer-motion';
import { Lock, Unlock, Award, Users, Settings, LogOut, ShoppingBag, Heart } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/contexts/AuthContext';
import { useArtistTheme } from '@/contexts/ArtistThemeContext';
import { useNavigate } from 'react-router-dom';

export default function Perfil() {
  const { user, isAuthenticated, setIsAuthModalOpen, logout, togglePrivacy } = useAuth();
  const { artists } = useArtistTheme();
  const navigate = useNavigate();

  if (!isAuthenticated || !user) {
    return (
      <PageLayout title="Perfil" subtitle="Sua área exclusiva">
        <div className="py-16 text-center">
          <Lock className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
          <h2 className="text-xl font-bold mb-2">Faça login para ver seu perfil</h2>
          <p className="text-muted-foreground mb-6">
            Acesse sua conta para ver suas conquistas, conexões e configurações.
          </p>
          <Button
            onClick={() => setIsAuthModalOpen(true)}
            className="bg-artist-primary hover:bg-artist-primary/90"
          >
            Entrar ou Cadastrar
          </Button>
        </div>
      </PageLayout>
    );
  }

  // Simulated badges based on artist collection
  const collectorBadges = artists.slice(0, 3).map(artist => ({
    id: `collector-${artist.id}`,
    name: `Colecionador ${artist.name}`,
    description: `Adquiriu obra de ${artist.name}`,
    icon: 'gold' as const,
    artistId: artist.id,
    neonColor: artist.neonColor,
  }));

  const allBadges = [...user.badges, ...collectorBadges];

  return (
    <PageLayout>
      <div className="py-8 max-w-2xl mx-auto space-y-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-gradient-to-br from-artist-primary to-artist-secondary mb-4">
            {user.avatar ? (
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-primary-foreground">
                {user.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-muted-foreground">{user.email}</p>

          {/* Privacy Toggle */}
          <div className="flex items-center justify-center gap-3 mt-4 p-4 rounded-xl bg-muted/30">
            {user.isPrivate ? (
              <Lock className="w-5 h-5 text-artist-primary" />
            ) : (
              <Unlock className="w-5 h-5 text-muted-foreground" />
            )}
            <span className="text-sm">Perfil Privado</span>
            <Switch
              checked={user.isPrivate}
              onCheckedChange={togglePrivacy}
            />
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: ShoppingBag, label: 'Compras', value: '3' },
            { icon: Heart, label: 'Favoritos', value: '12' },
            { icon: Users, label: 'Conexões', value: user.friends.length.toString() },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl bg-card border border-border text-center"
            >
              <stat.icon className="w-6 h-6 mx-auto text-artist-primary mb-2" />
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Badges / Achievements */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-artist-primary" />
            <h2 className="text-xl font-bold">Conquistas</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {allBadges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="p-4 rounded-xl bg-card border border-border text-center"
                style={{
                  borderColor: 'neonColor' in badge ? `${badge.neonColor}50` : undefined,
                }}
              >
                <div
                  className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-2 ${
                    badge.icon === 'gold'
                      ? 'bg-yellow-500/20 text-yellow-500'
                      : badge.icon === 'silver'
                      ? 'bg-gray-400/20 text-gray-400'
                      : 'bg-amber-700/20 text-amber-700'
                  }`}
                  style={{
                    backgroundColor: 'neonColor' in badge ? `${badge.neonColor}20` : undefined,
                    color: 'neonColor' in badge ? badge.neonColor : undefined,
                  }}
                >
                  <Award className="w-6 h-6" />
                </div>
                <p className="font-semibold text-sm">{badge.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Friends / Connections */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-artist-primary" />
            <h2 className="text-xl font-bold">Conexões</h2>
          </div>
          {user.friends.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {user.friends.map((friend) => (
                <div
                  key={friend.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border"
                >
                  <img
                    src={friend.avatar}
                    alt={friend.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="font-medium">{friend.name}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-8">
              Você ainda não tem conexões. Comece a seguir outros colecionadores!
            </p>
          )}
        </motion.section>

        {/* Actions */}
        <div className="flex flex-col gap-3 pt-4">
          <Button variant="outline" className="justify-start gap-3">
            <Settings className="w-5 h-5" />
            Configurações
          </Button>
          <Button
            variant="outline"
            className="justify-start gap-3 text-destructive hover:text-destructive"
            onClick={() => {
              logout();
              navigate('/');
            }}
          >
            <LogOut className="w-5 h-5" />
            Sair da conta
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}
