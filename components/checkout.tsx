"use client";

import { useState, useTransition } from "react";
import { Header } from "@/components/header";
import { CheckoutForm } from "@/components/checkout-form";
import { OrderSummary } from "@/components/order-summary";
import { useCart } from "@/hooks/use-cart";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Prisma } from "@prisma/client";

export const Checkout: React.FC<{
  categories:
    | Prisma.CategoryGetPayload<{ include: { products: true } }>[]
    | null;
}> = ({ categories }) => {
  const { items } = useCart();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 10 ? 0 : 0.5;
  const tax = subtotal * 0.08;
  const total = (subtotal + shipping + tax).toFixed(2);
  const products = items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
  }));

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header categories={categories} />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h1>
            <p className="text-gray-600 mb-6">
              Add some items to your cart before checking out.
            </p>
            <Link href="/">
              <Button>Start Shopping</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header categories={categories} />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/cart">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cart
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <p className="text-gray-600 mt-2">Complete your order</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <CheckoutForm
              shippingFee={shipping}
              tax={tax}
              total={Number(total)}
              showConfirmDialog={showConfirmDialog}
              setShowConfirmDialog={setShowConfirmDialog}
              products={products}
            />
          </div>
          <div>
            <OrderSummary />
          </div>
        </div>
      </main>
    </div>
  );
};
