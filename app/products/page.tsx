import { Header } from "@/components/header";
import { Products } from "@/components/products";
import { getCategories, getProducts } from "@/lib/actions";

export default async function ProductsPage() {
  const [{ data: categories }, { data: products }] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);
  return (
    <div className="min-h-screen bg-gray-50">
      <Header categories={categories} />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Products products={products} />
        </div>
      </main>
    </div>
  );
}
