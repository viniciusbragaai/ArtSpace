import { PageLayout } from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';
import { Palette, MessageSquare, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function PinturaPersonalizada() {
  return (
    <PageLayout title="Pintura Personalizada" subtitle="Tenha uma obra única criada especialmente para você">
      <div className="py-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <p className="text-lg text-muted-foreground text-center">
            Conectamos você diretamente com nossos artistas para criar uma peça 
            exclusiva que reflete sua visão e estilo.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: MessageSquare, title: 'Consulta Inicial', desc: 'Discutimos suas ideias e preferências' },
              { icon: Palette, title: 'Criação', desc: 'O artista desenvolve sua obra' },
              { icon: Clock, title: 'Acompanhamento', desc: 'Receba atualizações do progresso' },
              { icon: CheckCircle, title: 'Entrega', desc: 'Receba sua obra em casa' },
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border"
              >
                <step.icon className="w-10 h-10 text-artist-primary mb-4" />
                <h3 className="font-bold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center pt-8">
            <Button size="lg" className="bg-artist-primary hover:bg-artist-primary/90">
              Solicitar Orçamento
            </Button>
          </div>
        </motion.div>
      </div>
    </PageLayout>
  );
}
