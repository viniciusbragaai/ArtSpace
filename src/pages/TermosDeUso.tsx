import { PageLayout } from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';

export default function TermosDeUso() {
  return (
    <PageLayout title="Termos de Uso" subtitle="Última atualização: 01 de Janeiro de 2026">
      <div className="py-8 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-invert prose-sm max-w-none"
        >
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">1. Aceitação dos Termos</h2>
            <p className="text-muted-foreground">
              Ao acessar e usar a plataforma ArtSpace, você concorda em cumprir estes 
              Termos de Uso e todas as leis e regulamentos aplicáveis.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">2. Uso da Plataforma</h2>
            <p className="text-muted-foreground">
              A ArtSpace é uma plataforma de comercialização de obras de arte. 
              Os usuários podem navegar, comprar e interagir com conteúdo artístico.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">3. Propriedade Intelectual</h2>
            <p className="text-muted-foreground">
              Todo o conteúdo exibido na plataforma, incluindo imagens, textos e 
              designs, é protegido por direitos autorais.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">4. Compras e Pagamentos</h2>
            <p className="text-muted-foreground">
              Todas as transações são processadas de forma segura. Os preços 
              podem ser exibidos em diferentes moedas conforme a cotação do dia.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">5. Contato</h2>
            <p className="text-muted-foreground">
              Para dúvidas sobre estes termos, entre em contato através de 
              contato@artspace.com.br
            </p>
          </section>
        </motion.div>
      </div>
    </PageLayout>
  );
}
