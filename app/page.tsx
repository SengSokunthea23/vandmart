import { ProductCatalog } from "@/components/product-catalog";
import { Header } from "@/components/header";
import { CategoryGrid } from "@/components/category-grid";
import { getCategories, getProducts } from "@/lib/actions";

export default async function HomePage() {
  const [{ data: categories }, { data: products }] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header categories={categories} />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            E-Commerce Store
          </h1>
          <p className="text-gray-600">
            Discover our amazing products with great prices
          </p>
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Shop by Category
          </h2>
          <CategoryGrid categories={categories} products={products} />
        </section>

        <ProductCatalog products={products} />
      </main>
    </div>
  );
}
