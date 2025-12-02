"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "./product-card";
import { ProductFilters } from "./product-filters";
import { Prisma } from "@prisma/client";

export type ProductWithCategory = Prisma.ProductGetPayload<{
  include: { category: true };
}>;

export const ProductCatalog: React.FC<{
  products: ProductWithCategory[] | null;
}> = ({ products }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortBy, setSortBy] = useState<string>("name");

  const filteredProducts = useMemo(() => {
    let filtered = products?.filter((product) => {
      const categoryMatch =
        selectedCategory === "all" ||
        product?.category?.name === selectedCategory;
      const priceMatch =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      return categoryMatch && priceMatch;
    });

    // Sort products
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [selectedCategory, priceRange, sortBy]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <div className="lg:col-span-1">
        <ProductFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
          sortBy={sortBy}
          onSortChange={setSortBy}
          categories={products?.map((product) => {
            return {
              value: product?.category?.id ?? 1,
              label: product?.category?.name ?? "all",
            };
          })}
        />
      </div>

      <div className="lg:col-span-3">
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredProducts?.length} of {products?.length} products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredProducts?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {filteredProducts?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No products found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
