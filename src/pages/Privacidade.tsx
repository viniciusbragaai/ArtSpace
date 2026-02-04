import { PageLayout } from '@/components/layout/PageLayout';
import { motion } from 'framer-motion';

export default function Privacidade() {
  return (
    <PageLayout title="Política de Privacidade" subtitle="Última atualização: 01 de Janeiro de 2026">
      <div className="py-8 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-invert prose-sm max-w-none"
        >
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">1. Coleta de Dados</h2>
            <p className="text-muted-foreground">
              Coletamos informações que você nos fornece diretamente, como nome, 
              email e dados de pagamento ao realizar compras.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">2. Uso das Informações</h2>
            <p className="text-muted-foreground">
              Utilizamos suas informações para processar pedidos, melhorar nossos 
              serviços e enviar comunicações relevantes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">3. Segurança</h2>
            <p className="text-muted-foreground">
              Implementamos medidas de segurança para proteger suas informações 
              pessoais contra acesso não autorizado.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4">4. Cookies</h2>
            <p className="text-muted-foreground">
              Utilizamos cookies para melhorar sua experiência de navegação e 
              personalizar conteúdo.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">5. Seus Direitos</h2>
            <p className="text-muted-foreground">
              Você tem direito de acessar, corrigir ou excluir seus dados pessoais 
              a qualquer momento.
            </p>
          </section>
        </motion.div>
      </div>
    </PageLayout>
  );
}
