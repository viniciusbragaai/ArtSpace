import { PageLayout } from '@/components/layout/PageLayout';
import { ProductGrid } from '@/components/ProductGrid';

export default function Portfolio() {
  return (
    <PageLayout title="Portfólio" subtitle="Explore nossa coleção completa de obras de arte">
      <ProductGrid />
    </PageLayout>
  );
}
