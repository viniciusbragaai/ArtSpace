import { PageLayout } from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

const events = [
  {
    id: '1',
    title: 'Exposição Graffiti Urbano',
    date: '15 Mar 2026',
    time: '19:00 - 22:00',
    location: 'Galeria ArtSpace - Santos/SP',
    image: 'https://images.unsplash.com/photo-1561839561-b13bcfe95249?w=600',
  },
  {
    id: '2',
    title: 'Workshop Stencil Art com Ozi',
    date: '22 Mar 2026',
    time: '14:00 - 18:00',
    location: 'Estúdio Central - São Paulo/SP',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600',
  },
  {
    id: '3',
    title: 'Live Painting - A Fase',
    date: '05 Abr 2026',
    time: '16:00 - 20:00',
    location: 'Praça Mauá - Santos/SP',
    image: 'https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?w=600',
  },
];

export default function Eventos() {
  return (
    <PageLayout title="Eventos" subtitle="Fique por dentro dos próximos eventos da comunidade">
      <div className="grid gap-6 py-8">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex flex-col md:flex-row gap-6 p-6 rounded-2xl bg-card border border-border hover:border-artist-primary/50 transition-all"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full md:w-64 h-48 object-cover rounded-xl"
            />
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-3">{event.title}</h3>
              <div className="space-y-2 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-artist-primary" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-artist-primary" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-artist-primary" />
                  <span>{event.location}</span>
                </div>
              </div>
              <Button className="mt-4 bg-artist-primary hover:bg-artist-primary/90">
                Inscrever-se
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </PageLayout>
  );
}
