import { useState } from 'react';
import { PageLayout } from '@/components/layout/PageLayout';
import { ProductGrid } from '@/components/ProductGrid';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Filter, User, Frame, Coffee, Palette } from 'lucide-react';

type FilterCategory = 'all' | 'artistas' | 'original' | 'prints' | 'canecas' | 'canetas';

const filterOptions: { key: FilterCategory; label: string; icon: React.ReactNode }[] = [
  { key: 'all', label: 'Todos', icon: <Filter className="w-4 h-4" /> },
  { key: 'artistas', label: 'Artistas', icon: <User className="w-4 h-4" /> },
  { key: 'original', label: 'Originais', icon: <Frame className="w-4 h-4" /> },
  { key: 'prints', label: 'Prints', icon: <Coffee className="w-4 h-4" /> },
  { key: 'canecas', label: 'Canecas', icon: <Palette className="w-4 h-4" /> },
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  return (
    <PageLayout title="Portfólio" subtitle="Explore nossa coleção completa de obras de arte">
      {/* Filters */}
      <div className="py-4 border-b border-border mb-4 overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-2 min-w-max px-2">
          {filterOptions.map((filter) => (
            <Button
              key={filter.key}
              variant={activeFilter === filter.key ? "default" : "outline"}
              size="sm"
              className={`gap-2 rounded-full ${
                activeFilter === filter.key 
                  ? 'bg-artist-primary text-primary-foreground' 
                  : 'hover:bg-muted'
              }`}
              onClick={() => setActiveFilter(filter.key)}
            >
              {filter.icon}
              {filter.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Active Filter Indicator */}
      {activeFilter !== 'all' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-sm text-muted-foreground py-2"
        >
          Filtrando por: <span className="font-semibold text-foreground">{filterOptions.find(f => f.key === activeFilter)?.label}</span>
        </motion.div>
      )}

      <ProductGrid filterCategory={activeFilter} />
    </PageLayout>
  );
}
