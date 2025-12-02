"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma";

export const deleteCategory = async (id: number) => {
  try {
    const exists = await prisma.category.findFirst({
      where: {
        id,
      },
    });

    if (!exists) {
      return {
        success: false,
        message: "Category not found",
        data: null,
      };
    }

    await prisma.category.delete({
      where: {
        id,
      },
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Category deleted successfully",
      data: null,
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      data: null,
      message: e.message || "Failed to delete category",
    };
  }
};
