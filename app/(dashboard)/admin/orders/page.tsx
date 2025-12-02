import { Orders } from "@/components/admin/order";
import { getOrders } from "@/lib/actions";

export default async function OrdersPage() {
  const { data, total, totalPages, limit, page } = await getOrders({
    page: 1,
    limit: 10,
  });
  return (
    <Orders
      orders={data}
      total={total ?? 0}
      totalPages={totalPages ?? 0}
      limit={limit}
      page={page}
    />
  );
}
