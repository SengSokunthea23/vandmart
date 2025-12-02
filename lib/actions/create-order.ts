"use server";

import { z } from "zod";
import { OrderStatus, PaymentMethod } from "@prisma/client";
import prisma from "../prisma";
import { sendTelegramMessage } from "./telegram-bot";
import { revalidatePath } from "next/cache";

const productSchema = z.object({
  id: z.number().min(1, "Product is required"),
  quantity: z.number().min(1, "Quantity is required"),
});

const createOrderSchema = z.object({
  userId: z.number().min(1, "User is required"),
  tax: z.number().min(0, "Tax is required"),
  total: z.number().min(0, "Total is required"),
  shippingFee: z.number().min(0, "Shipping fee is required"),
  paymentMethod: z
    .enum([PaymentMethod.COD, PaymentMethod.KHQR])
    .default(PaymentMethod.KHQR),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(1, "Address is required"),
  phoneNumber: z
    .string()
    .min(7, "Phone number is required")
    .regex(/^[0-9+\-\s]{7,}$/, "Invalid phone number"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
  products: z.array(productSchema),
});

export const createOrder = async (input: z.infer<typeof createOrderSchema>) => {
  try {
    const createdOrder = await prisma.$transaction(async (tx) => {
      const shippingAddress = await tx.shippingAddress.create({
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          address: input.address,
          phoneNumber: input.phoneNumber,
          city: input.city,
          state: input.state,
          zipCode: input.zipCode,
          country: "Cambodia",
        },
      });

      const order = await tx.order.create({
        data: {
          userId: input.userId,
          tax: input.tax.toString(),
          total: input.total.toString(),
          shippingFee: input.shippingFee.toString(),
          paymentMethod: input.paymentMethod,
          orderStatus: OrderStatus.PENDING,
          shippingAddressId: shippingAddress.id,
        },
        include: { shippingAddress: true },
      });

      await tx.orderItem.createMany({
        data: input.products.map((product) => ({
          orderId: order.id,
          productId: product.id,
          quantity: product.quantity,
        })),
      });

      for (const product of input.products) {
        await tx.product.update({
          where: { id: product.id },
          data: { stock: { decrement: product.quantity } },
        });
      }

      return order;
    });

    const products = await prisma.product.findMany({
      where: { id: { in: input.products.map((p) => p.id) } },
    });

    const productLines = input.products
      .map((p) => {
        const prod = products.find((pr) => pr.id === p.id);
        return `🛍️ ${prod?.name || "Product"} x${p.quantity} - $${prod?.price}`;
      })
      .join("\n");

    const message = `
                      ✅ *Order Created Successfully!*

                      📦 *Order ID:* ${createdOrder.id}
                      ${productLines}

                      💰 *Total:* $${input.total}
                      💸 *Shipping Fee:* $${input.shippingFee}
                      🧾 *Tax:* $${input.tax}
                      📌 *Status:* Pending
                      `;

    await sendTelegramMessage(message);
    revalidatePath("/");

    return {
      success: true,
      data: true,
      message: "Order created successfully",
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      message: (error as Error).message || "Failed to create order",
    };
  }
};
