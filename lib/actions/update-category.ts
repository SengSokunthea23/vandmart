"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma";
import { z } from "zod";

const updateCategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().min(1, "Category description is required"),
});

type UpdateCategoryInput = z.infer<typeof updateCategorySchema>;

export const updateCategory = async (
  id: number,
  input: UpdateCategoryInput
) => {
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

    const category = await prisma.category.update({
      where: {
        id,
      },
      data: input,
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Category updated successfully",
      data: category,
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      data: null,
      message: e.message || "Failed to update category",
    };
  }
};
