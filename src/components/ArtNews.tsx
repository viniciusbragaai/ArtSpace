import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NewsItem {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  location?: string;
  type: 'event' | 'news' | 'exhibition';
}

const newsItems: NewsItem[] = [
  {
    id: '1',
    title: 'Exposição Coletiva: Cores de Santos',
    description: 'Uma celebração da arte urbana santista com 12 artistas locais transformando o centro histórico.',
    image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=600&h=400&fit=crop',
    date: '15-30 Fev 2024',
    location: 'Centro Histórico',
    type: 'exhibition',
  },
  {
    id: '2',
    title: 'Workshop de Graffiti com Zephyr',
    description: 'Aprenda técnicas de spray e composição com um dos maiores nomes do graffiti brasileiro.',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=400&fit=crop',
    date: '22 Fev 2024',
    location: 'ArtSpace Studio',
    type: 'event',
  },
  {
    id: '3',
    title: 'Nova Coleção Digital de Nova',
    description: 'A artista lança sua primeira coleção de NFTs em parceria exclusiva com a galeria.',
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=600&h=400&fit=crop',
    date: '01 Mar 2024',
    type: 'news',
  },
  {
    id: '4',
    title: 'Mural Gigante na Orla',
    description: 'Projeto comunitário transformará 200m² de muro em obra de arte colaborativa.',
    image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=600&h=400&fit=crop',
    date: 'Em andamento',
    location: 'Orla de Santos',
    type: 'news',
  },
];

const typeLabels = {
  event: { label: 'Evento', color: 'bg-neon-cyan' },
  news: { label: 'Notícia', color: 'bg-neon-magenta' },
  exhibition: { label: 'Exposição', color: 'bg-neon-yellow' },
};

export function ArtNews() {
  return (
    <section className="py-12 md:py-20 bg-card/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-8"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Art <span className="text-gradient-neon">News</span>
            </h2>
            <p className="text-muted-foreground">
              Fique por dentro da cena artística de Santos
            </p>
          </div>
          <Button variant="ghost" className="hidden md:flex gap-2 text-artist-primary hover:text-artist-primary/80">
            Ver todas
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>

        {/* Horizontal Scrolling Cards */}
        <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide -mx-4 px-4">
          {newsItems.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex-shrink-0 w-[300px] md:w-[380px] snap-start"
            >
              <div className="group relative h-full rounded-xl overflow-hidden bg-card neon-border card-hover">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  
                  {/* Type Badge */}
                  <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-primary-foreground ${typeLabels[item.type].color}`}>
                    {typeLabels[item.type].label}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-artist-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.date}
                    </span>
                    {item.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        {item.location}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Mobile See All Button */}
        <div className="flex justify-center mt-6 md:hidden">
          <Button variant="outline" className="neon-border gap-2">
            Ver todas as notícias
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
