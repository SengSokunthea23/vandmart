import { Prisma } from "@prisma/client";
import { ProductCard } from "./product-card";

interface ProductGridProps {
  products: Prisma.ProductGetPayload<{ include: { category: true } }>[] | null;
}

export const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
