import { notFound } from 'next/navigation';
import { products } from '@/data/products';
import ProductClient from './ProductClient';

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    notFound();
  }

  return <ProductClient product={product} />;
}
