import { Header } from "@/components/header";
import { CategoryProductGrid } from "@/components/category-product-grid";
import {
  getCategories,
  getCategory,
  getProductsByCategory,
} from "@/lib/actions";

type CategoryPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return [
    { slug: "all" },
    { slug: "electronics" },
    { slug: "clothing" },
    { slug: "books" },
    { slug: "home" },
    { slug: "sports" },
  ];
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { id } = await params;

  const [{ data: categories }, { data: category }, { data: products }] =
    await Promise.all([
      getCategories(),
      getCategory(Number(id)),
      getProductsByCategory(Number(id)),
    ]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header categories={categories} />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            {category?.name}
          </h1>
          <p className="text-gray-600">{category?.description}</p>
        </div>

        <CategoryProductGrid products={products} />
      </main>
    </div>
  );
}
