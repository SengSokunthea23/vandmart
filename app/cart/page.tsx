import { Header } from "@/components/header";
import { Cart } from "@/components/cart";
import { getCategories } from "@/lib/actions";

export default async function CartPage() {
  const [{ data: categories }] = await Promise.all([getCategories()]);
  return (
    <div className="min-h-screen bg-gray-50">
      <Header categories={categories} />
      <Cart />
    </div>
  );
}
