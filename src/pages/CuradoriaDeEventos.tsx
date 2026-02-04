import { PageLayout } from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';
import { Calendar, Palette, MapPin, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function CuradoriaDeEventos() {
  return (
    <PageLayout title="Curadoria de Eventos" subtitle="Eventos artísticos memoráveis">
      <div className="py-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <p className="text-lg text-muted-foreground text-center">
            Organizamos exposições, vernissages e eventos corporativos 
            com curadoria artística de alto nível.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Calendar, title: 'Planejamento', desc: 'Organização completa do evento' },
              { icon: Palette, title: 'Curadoria', desc: 'Seleção de artistas e obras' },
              { icon: MapPin, title: 'Locação', desc: 'Espaços parceiros exclusivos' },
              { icon: Sparkles, title: 'Experiência', desc: 'Momentos inesquecíveis' },
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
              Falar com Curador
            </Button>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
}
