"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "./product-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Prisma, Product } from "@prisma/client";

interface CategoryProductGridProps {
  products: Prisma.ProductGetPayload<{ include: { category: true } }>[] | null;
}

export function CategoryProductGrid({ products }: CategoryProductGridProps) {
  const [sortBy, setSortBy] = useState<string>("name");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);

  const filteredAndSortedProducts = useMemo(() => {
    // Filter by price range
    let filtered = products?.filter(
      (product) =>
        product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    filtered?.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, priceRange, sortBy]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Filters Sidebar */}
      <div className="lg:col-span-1">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sort By</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="price-low">Price (Low to High)</SelectItem>
                  <SelectItem value="price-high">
                    Price (High to Low)
                  </SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Price Range</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Slider
                  value={priceRange}
                  onValueChange={(value) =>
                    setPriceRange(value as [number, number])
                  }
                  max={1000}
                  min={0}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Products Grid */}
      <div className="lg:col-span-3">
        <div className="mb-6 flex justify-between items-center">
          <p className="text-gray-600">
            Showing {filteredAndSortedProducts?.length} of {products?.length}{" "}
            products
          </p>
        </div>

        {filteredAndSortedProducts?.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No products found in this price range.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAndSortedProducts?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
