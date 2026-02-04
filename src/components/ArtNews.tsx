import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

interface NewsItem {
  id: string;
  titleKey: string;
  descriptionKey: string;
  image: string;
  dateKey: string;
  location?: string;
  type: 'event' | 'news' | 'exhibition';
}

const newsItems: NewsItem[] = [
  {
    id: '1',
    titleKey: 'news.item1.title',
    descriptionKey: 'news.item1.description',
    image: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=600&h=400&fit=crop',
    dateKey: '15-30 Fev 2024',
    location: 'Centro Histórico',
    type: 'exhibition',
  },
  {
    id: '2',
    titleKey: 'news.item2.title',
    descriptionKey: 'news.item2.description',
    image: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=600&h=400&fit=crop',
    dateKey: '22 Fev 2024',
    location: 'ArtSpace Studio',
    type: 'event',
  },
  {
    id: '3',
    titleKey: 'news.item3.title',
    descriptionKey: 'news.item3.description',
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=600&h=400&fit=crop',
    dateKey: '01 Mar 2024',
    type: 'news',
  },
  {
    id: '4',
    titleKey: 'news.item4.title',
    descriptionKey: 'news.item4.description',
    image: 'https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=600&h=400&fit=crop',
    dateKey: 'news.ongoing',
    location: 'Orla de Santos',
    type: 'news',
  },
];

export function ArtNews() {
  const { t } = useLanguage();

  const typeLabels = {
    event: { labelKey: 'news.event', color: 'bg-neon-cyan' },
    news: { labelKey: 'news.news', color: 'bg-neon-magenta' },
    exhibition: { labelKey: 'news.exhibition', color: 'bg-neon-yellow' },
  };

  const getDate = (dateKey: string) => {
    // Check if it's a translation key or a literal date
    if (dateKey.startsWith('news.')) {
      return t(dateKey);
    }
    return dateKey;
  };

  return (
    <section className="py-8 md:py-12 bg-card/50">
      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-8"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              {t('sections.artNews').split(' ')[0]} <span className="text-gradient-neon">{t('sections.artNews').split(' ')[1] || 'News'}</span>
            </h2>
            <p className="text-muted-foreground">
              {t('sections.artNewsSubtitle')}
            </p>
          </div>
          <Button variant="ghost" className="hidden md:flex gap-2 text-artist-primary hover:text-artist-primary/80">
            {t('sections.viewAll')}
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
                    alt={t(item.titleKey)}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  
                  {/* Type Badge */}
                  <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold text-primary-foreground ${typeLabels[item.type].color}`}>
                    {t(typeLabels[item.type].labelKey)}
                  </span>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-artist-primary transition-colors">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {t(item.descriptionKey)}
                  </p>
                  
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {getDate(item.dateKey)}
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
            {t('sections.viewAllNews')}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
