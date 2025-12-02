"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma";

export const deleteProduct = async (id: number) => {
  try {
    const exists = await prisma.product.findFirst({
      where: {
        id,
      },
    });

    if (!exists) {
      return {
        success: false,
        message: "Product not found",
        data: null,
      };
    }

    await prisma.product.delete({
      where: {
        id,
      },
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Product deleted successfully",
      data: null,
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Failed to delete product",
      data: null,
    };
  }
};
