"use server";

import prisma from "../prisma";

export const getCategory = async (id: number) => {
  try {
    const category = await prisma.category.findUnique({
      where: { id },
      include: { products: true },
    });

    if (!category) {
      return {
        success: false,
        message: "Category not found",
        data: null,
      };
    }

    return {
      success: true,
      message: "Category fetched successfully",
      data: category,
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Failed to fetch category",
      data: null,
    };
  }
};
