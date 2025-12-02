import { UpdateCategoryForm } from "@/components/admin/category";
import { getCategory } from "@/lib/actions";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function CreateCategoryPage({ params }: Props) {
  const { id } = await params;
  const { data } = await getCategory(Number(id));

  return <UpdateCategoryForm category={data} />;
}
