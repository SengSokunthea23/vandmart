import { Star, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Prisma } from "@prisma/client";

interface ProductListProps {
  products: Prisma.ProductGetPayload<{ include: { category: true } }>[] | null;
}

export const ProductList = ({ products }: ProductListProps) => {
  return (
    <div className="space-y-4">
      {products?.map((product) => (
        <div
          key={product.id}
          className="flex gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:shadow-md"
        >
          {/* Image */}
          <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-md bg-muted">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {product.description}
                  </p>
                </div>
                <Badge className="flex-shrink-0 bg-blue-600 text-white hover:bg-blue-700">
                  {product?.category?.name}
                </Badge>
              </div>

              {/* Rating */}
              <div className="mt-2 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-3 w-3 text-muted-foreground"
                    fill={i < product.rating ? "currentColor" : "none"}
                  />
                ))}
              </div>
            </div>

            {/* Price and Action */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-blue-600">
                  ${product.price.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Stock: {product.stock}
                </p>
              </div>
              <Button className="gap-2">
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
