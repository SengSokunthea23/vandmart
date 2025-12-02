"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createCategory, updateCategory } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Category } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const updateCategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().min(1, "Category description is required"),
  icon: z.string().min(1, "Category icon is required"),
  color: z.string().min(1, "Category color is required"),
});

type UpdateCategoryFormProps = {
  category: Category | null;
};

export const UpdateCategoryForm: React.FC<UpdateCategoryFormProps> = ({
  category,
}) => {
  const form = useForm<z.infer<typeof updateCategorySchema>>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: {
      name: category?.name ?? "",
      description: category?.description ?? "",
      icon: category?.icon ?? "",
      color: category?.color ?? "",
    },
  });
  const router = useRouter();

  const {
    formState: { errors },
    handleSubmit,
  } = form;
  const [pending, startTransition] = useTransition();
  const onSubmit = (data: z.infer<typeof updateCategorySchema>) => {
    startTransition(async () => {
      const { message, success } = await updateCategory(category?.id!, data);

      if (success) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    });
  };

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>Update Category</CardTitle>
          <CardDescription>Update product category</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Category Name"
                        {...field}
                        className={cn("h-12", {
                          "border-destructive": errors.name,
                        })}
                        disabled={pending}
                      />
                    </FormControl>
                    {errors.name && (
                      <p className="text-xs text-destructive">
                        {errors.name.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="icon"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Icon</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Category Icon"
                        {...field}
                        className={cn("h-12", {
                          "border-destructive": errors.icon,
                        })}
                        disabled={pending}
                      />
                    </FormControl>
                    {errors.icon && (
                      <p className="text-xs text-destructive">
                        {errors.icon.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Category Color"
                        {...field}
                        className={cn("h-12", {
                          "border-destructive": errors.color,
                        })}
                        disabled={pending}
                      />
                    </FormControl>
                    {errors.color && (
                      <p className="text-xs text-destructive">
                        {errors.color.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Category Description"
                        {...field}
                        className={cn("h-12", {
                          "border-destructive": errors.description,
                        })}
                        disabled={pending}
                      />
                    </FormControl>
                    {errors.description && (
                      <p className="text-xs text-destructive">
                        {errors.description.message}
                      </p>
                    )}
                  </FormItem>
                )}
              />

              <div className="flex gap-2 justify-end">
                <Button
                  type="button"
                  onClick={() => router.push("/admin/categories")}
                  variant="outline"
                  disabled={pending}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={pending}>
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
