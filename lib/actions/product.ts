"use server";

import prisma from "../prisma";

export const getProduct = async (id: number) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
      },
    });

    if (!product) {
      return {
        success: false,
        message: "Product not found",
        data: null,
      };
    }
    return {
      success: true,
      message: "Product fetched successfully",
      data: product,
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Failed to fetch product",
      data: null,
    };
  }
};
