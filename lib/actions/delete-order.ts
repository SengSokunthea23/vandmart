"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma";

export const deleteOrder = async (orderId: number) => {
  try {
    await prisma.$transaction(async (tx) => {
      await tx.orderItem.deleteMany({
        where: { orderId },
      });

      await tx.shippingAddress.deleteMany({
        where: { orders: { some: { id: orderId } } },
      });

      await tx.order.delete({
        where: { id: orderId },
      });
    });

    revalidatePath("/");

    return {
      success: true,
      data: true,
      message: "Order deleted successfully",
    };
  } catch (error) {
    console.error("Delete order error:", error);
    return {
      success: false,
      data: false,
      message: "Failed to delete order",
    };
  }
};
