import { Products } from "@/components/admin/product";
import { getProducts } from "@/lib/actions";

export default async function ProductsPage() {
  const { data } = await getProducts();
  return <Products products={data} />;
}
