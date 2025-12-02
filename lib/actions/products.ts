"use server";

import prisma from "../prisma";

export const getProducts = async () => {
  try {
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
    });

    return {
      success: true,
      message: "Products fetched successfully",
      data: products,
    };
  } catch (error) {
    const e = error as Error;

    return {
      success: false,
      message: e.message || "Failed to fetch products",
      data: null,
    };
  }
};
