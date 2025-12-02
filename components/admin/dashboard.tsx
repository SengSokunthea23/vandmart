"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { dashboardInventory } from "@/lib/actions";
import { Category, Product } from "@prisma/client";

type DashboardInventory = Awaited<ReturnType<typeof dashboardInventory>>;
type DashboardProps = {
  dashboard: DashboardInventory;
  products: Product[] | null;
  categories: Category[] | null;
};
export const Dashboard: React.FC<DashboardProps> = ({
  categories,
  products,
  dashboard,
}) => {
  // Data for stock by category chart
  const stockByCategory = categories?.map((cat) => ({
    name: cat.name,
    stock: products
      ?.filter((p) => p.categoryId === cat.id)
      .reduce((sum, p) => sum + p.stock, 0),
  }));

  // Data for price distribution
  const priceRanges = [
    { name: "$0-10", count: products?.filter((p) => p.price < 10).length },
    {
      name: "$10-20",
      count: products?.filter((p) => p.price >= 10 && p.price < 20).length,
    },
    {
      name: "$20-50",
      count: products?.filter((p) => p.price >= 20 && p.price < 50).length,
    },
    { name: "$50+", count: products?.filter((p) => p.price >= 50).length },
  ];

  // Recent products
  const recentProducts = products?.slice(-5).reverse();

  const colors = [
    "hsl(var(--chart-1))",
    "hsl(var(--chart-2))",
    "hsl(var(--chart-3))",
    "hsl(var(--chart-4))",
    "hsl(var(--chart-5))",
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your ecommerce admin panel
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboard?.data?.totalProducts}
            </div>
            <p className="text-xs text-muted-foreground">In your inventory</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Total Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboard?.data?.totalCategories}
            </div>
            <p className="text-xs text-muted-foreground">Product categories</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {dashboard?.data?.totalStock}
            </div>
            <p className="text-xs text-muted-foreground">All units in stock</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Inventory Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${dashboard?.data?.inventoryValue.toFixed(0)}
            </div>
            <p className="text-xs text-muted-foreground">Total stock value</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
              {dashboard?.data?.lowStock}
            </div>
            <p className="text-xs text-muted-foreground">Below 10 units</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Stock by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Stock by Category</CardTitle>
            <CardDescription>Units available per category</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                stock: { label: "Stock", color: "hsl(var(--chart-1))" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stockByCategory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="stock" fill="hsl(var(--chart-1))" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Price Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Price Distribution</CardTitle>
            <CardDescription>Products by price range</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                count: { label: "Count", color: "hsl(var(--chart-2))" },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={priceRanges}
                    dataKey="count"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    label
                  >
                    {priceRanges.map((_, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                      />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Products */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Products</CardTitle>
          <CardDescription>Last 5 products added to inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Product</th>
                  <th className="text-left py-3 px-4 font-medium">Category</th>
                  <th className="text-left py-3 px-4 font-medium">Price</th>
                  <th className="text-left py-3 px-4 font-medium">Stock</th>
                </tr>
              </thead>
              <tbody>
                {recentProducts?.map((product) => {
                  const category = categories?.find(
                    (c) => c.id === product.categoryId
                  );
                  return (
                    <tr key={product.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4">{product.name}</td>
                      <td className="py-3 px-4">
                        {category?.name || "Uncategorized"}
                      </td>
                      <td className="py-3 px-4">${product.price.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <span
                          className={
                            product.stock < 10
                              ? "text-destructive font-semibold"
                              : ""
                          }
                        >
                          {product.stock}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {recentProducts?.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="py-6 text-center text-muted-foreground"
                    >
                      No products yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
