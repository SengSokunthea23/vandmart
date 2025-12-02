"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Prisma, Product } from "@prisma/client";
import { IconMap } from "./icon-map";
import { cn } from "@/lib/utils";

type ProductWithCategory = Prisma.CategoryGetPayload<{
  include: { products: true };
}>;

export const CategoryGrid: React.FC<{
  categories: ProductWithCategory[] | null;
  products: Product[] | null;
}> = ({ categories, products }) => {
  const getCategoryCount = (categoryId: number) => {
    return products?.filter((product) => product?.categoryId === categoryId)
      .length;
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {categories?.map((category) => {
        const Icon = IconMap[category.icon ?? "Grid3X3"];

        return (
          <Link key={category.id} href={`/category/${category.id}`}>
            <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer h-full">
              <CardContent className="p-6 text-center">
                <div
                  className={cn(
                    "bg-blue-500",
                    "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200"
                  )}
                >
                  <Icon className="h-8 w-8 text-white" />
                </div>

                <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {category.name}
                </h3>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {category.description}
                </p>

                <Badge variant="secondary" className="text-xs">
                  {getCategoryCount(category?.id)}
                </Badge>
              </CardContent>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};
