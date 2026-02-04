import { PageLayout } from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';
import { Lightbulb, Target, Palette, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ConsultoriaDeArte() {
  return (
    <PageLayout title="Consultoria de Arte" subtitle="Orientação especializada para sua coleção">
      <div className="py-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <p className="text-lg text-muted-foreground text-center">
            Nossos especialistas ajudam você a construir uma coleção de arte 
            que reflete seu gosto e possui valor artístico e de investimento.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: Lightbulb, title: 'Curadoria', desc: 'Seleção personalizada de obras' },
              { icon: Target, title: 'Estratégia', desc: 'Plano de aquisição inteligente' },
              { icon: Palette, title: 'Estética', desc: 'Harmonia com seu espaço' },
              { icon: Trophy, title: 'Valorização', desc: 'Foco em artistas em ascensão' },
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
              Agendar Consulta
            </Button>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
}
