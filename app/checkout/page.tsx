import { getCategories } from "@/lib/actions";
import { Checkout } from "@/components/checkout";

export default async function CheckoutPage() {
  const { data: categories } = await getCategories();
  return <Checkout categories={categories} />;
}
