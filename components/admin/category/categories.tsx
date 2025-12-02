"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Trash2, Edit2, Plus } from "lucide-react";
import type { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteCategory } from "@/lib/actions";
import { toast } from "sonner";

type CategoriesProps = {
  categories: Category[] | null;
};
export const Categories: React.FC<CategoriesProps> = ({ categories }) => {
  const router = useRouter();

  const [pending, startTransition] = useTransition();

  const handleDelete = (id: number) => {
    startTransition(async () => {
      const { success, message } = await deleteCategory(id);
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
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">
            Organize your products into categories
          </p>
        </div>
        <Button
          onClick={() => router.push("/admin/categories/create")}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Create
        </Button>
      </div>

      {categories && categories.length > 0 ? (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-4 font-semibold">Name</th>
                <th className="text-left p-4 font-semibold">Description</th>
                <th className="text-center p-4 font-semibold">Products</th>
                <th className="text-right p-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr
                  key={category.id}
                  className="border-b hover:bg-muted/50 transition-colors"
                >
                  <td className="p-4 font-medium text-balance">
                    {category.name}
                  </td>
                  <td className="p-4 text-sm text-muted-foreground text-balance">
                    {category.description}
                  </td>
                  <td className="p-4 text-center text-sm">
                    <span className="font-semibold">{2}</span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          router.push(`/admin/categories/${category.id}/edit`)
                        }
                        className="gap-1"
                      >
                        <Edit2 className="h-4 w-4" />
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(category.id)}
                        className="gap-1"
                        disabled={pending}
                      >
                        <Trash2 className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-muted-foreground">
            No categories yet. Create one to get started!
          </p>
        </div>
      )}
    </div>
  );
};
