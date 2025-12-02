import { CreateProductForm } from "@/components/admin/product";
import { getCategories } from "@/lib/actions";

export default async function CreateCategoryPage() {
  const { data } = await getCategories();
  return <CreateProductForm categories={data} />;
}
