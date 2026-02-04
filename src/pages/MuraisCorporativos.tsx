import { PageLayout } from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';
import { Building, Brush, Users, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MuraisCorporativos() {
  return (
    <PageLayout title="Murais Corporativos" subtitle="Transforme seu espaço corporativo com arte">
      <div className="py-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <p className="text-lg text-muted-foreground text-center">
            Criamos murais impactantes que refletem a identidade da sua marca 
            e inspiram colaboradores e visitantes.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Building, title: 'Escritórios', desc: 'Ambiente criativo e inspirador' },
              { icon: Brush, title: 'Design Exclusivo', desc: 'Arte alinhada com sua marca' },
              { icon: Users, title: 'Artistas Top', desc: 'Talentos reconhecidos no mercado' },
              { icon: Star, title: 'Qualidade', desc: 'Materiais e técnicas premium' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border"
              >
                <item.icon className="w-10 h-10 text-artist-primary mb-4" />
                <h3 className="font-bold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center pt-8">
            <Button size="lg" className="bg-artist-primary hover:bg-artist-primary/90">
              Solicitar Proposta
            </Button>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
}
