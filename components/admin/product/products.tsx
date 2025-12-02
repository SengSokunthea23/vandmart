"use client";

import type React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Edit2, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Product } from "@prisma/client";
import { toast } from "sonner";
import { useTransition } from "react";
import { deleteProduct } from "@/lib/actions";

type ProductsProps = {
  products: Product[] | null;
};

export const Products: React.FC<ProductsProps> = ({ products }) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const handleDelete = (id: number) => {
    startTransition(async () => {
      const { success, message } = await deleteProduct(id);
      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage your product inventory</p>
        </div>
        <Button
          onClick={() => router.push("/admin/products/create")}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Create
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product List</CardTitle>
          <CardDescription>Total products: {products?.length}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Name</th>
                  <th className="text-left py-3 px-4 font-medium">Category</th>
                  <th className="text-left py-3 px-4 font-medium">Price</th>
                  <th className="text-left py-3 px-4 font-medium">Stock</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product) => {
                  const isLowStock = product.stock < 10;
                  return (
                    <tr key={product.id} className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 font-medium">{product.name}</td>
                      <td className="py-3 px-4">{product.description}</td>
                      <td className="py-3 px-4">${product.price.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <span
                          className={
                            isLowStock ? "text-destructive font-semibold" : ""
                          }
                        >
                          {product.stock} {isLowStock && "(Low)"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="gap-1"
                            disabled={pending}
                            onClick={() =>
                              router.push(`/admin/products/${product.id}/edit`)
                            }
                          >
                            <Edit2 className="h-4 w-4" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="gap-1"
                            onClick={() => handleDelete(product.id)}
                            disabled={pending}
                          >
                            <Trash2 className="h-4 w-4" />
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {products?.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-6 text-center text-muted-foreground"
                    >
                      No products yet. Create one to get started!
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
