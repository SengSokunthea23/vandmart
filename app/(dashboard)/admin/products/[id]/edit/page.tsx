import { UpdateProductForm } from "@/components/admin/product";
import { getCategories } from "@/lib/actions";
import { getProduct } from "@/lib/actions/product";

type Props = { params: Promise<{ id: string }> };

export default async function UpdateProductPage({ params }: Props) {
  const { id } = await params;
  const [{ data }, { data: categories }] = await Promise.all([
    getProduct(Number(id)),
    getCategories(),
  ]);

  return <UpdateProductForm product={data} categories={categories} />;
}
