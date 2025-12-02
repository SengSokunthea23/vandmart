"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { LayoutGrid, List } from "lucide-react";
import { Prisma } from "@prisma/client";
import { ProductGrid } from "./product-grid";
import { ProductList } from "./product-list";

export const Products: React.FC<{
  products: Prisma.ProductGetPayload<{ include: { category: true } }>[] | null;
}> = ({ products }) => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Products</h1>
          <p className="mt-2 text-muted-foreground">
            Browse our collection of {products?.length} products
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="gap-2"
          >
            <LayoutGrid className="h-4 w-4" />
            Grid
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="gap-2"
          >
            <List className="h-4 w-4" />
            List
          </Button>
        </div>
      </div>

      {viewMode === "grid" ? (
        <ProductGrid products={products} />
      ) : (
        <ProductList products={products} />
      )}
    </div>
  );
};
