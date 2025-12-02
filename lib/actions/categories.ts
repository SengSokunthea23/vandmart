"use server";

import prisma from "../prisma";

export const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      include: {
        products: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return {
      success: true,
      message: "Categories fetched successfully",
      data: categories,
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      data: null,
      message: e.message || "Failed to fetch categories",
    };
  }
};
