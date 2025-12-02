import { Categories } from "@/components/admin/category";
import { getCategories } from "@/lib/actions";

export default async function CategoriesPage() {
  const categories = await getCategories();
  return (
    <>
      <Categories categories={categories.data} />
    </>
  );
}
