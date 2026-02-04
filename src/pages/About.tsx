import { PageLayout } from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <PageLayout title="Sobre Nós" subtitle="Conheça a história da ArtSpace">
      <div className="py-8 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-invert mx-auto"
        >
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            A ArtSpace nasceu da paixão pela arte urbana brasileira. Somos uma plataforma 
            dedicada a conectar artistas talentosos com colecionadores e entusiastas de 
            arte de todo o mundo.
          </p>
          
          <h2 className="text-2xl font-bold mb-4">Nossa Missão</h2>
          <p className="text-muted-foreground mb-6">
            Democratizar o acesso à arte urbana de qualidade, oferecendo uma experiência 
            de compra segura e transparente, enquanto apoiamos e promovemos artistas 
            brasileiros.
          </p>
          
          <h2 className="text-2xl font-bold mb-4">O que oferecemos</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li>• Obras originais de artistas renomados</li>
            <li>• Prints de alta qualidade em edições limitadas</li>
            <li>• Produtos exclusivos licenciados</li>
            <li>• Consultoria de arte personalizada</li>
            <li>• Projetos de murais corporativos</li>
          </ul>
        </motion.div>
      </div>
    </PageLayout>
  );
}
