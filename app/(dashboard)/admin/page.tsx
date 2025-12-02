import { Dashboard } from "@/components/admin/dashboard";
import { dashboardInventory, getCategories, getProducts } from "@/lib/actions";

export default async function AdminPage() {
  const [dashboard, { data: products }, { data: categories }] =
    await Promise.all([dashboardInventory(), getProducts(), getCategories()]);

  return (
    <Dashboard
      dashboard={dashboard}
      categories={categories}
      products={products}
    />
  );
}
