"use server";

import { z } from "zod";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";

const createCategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().min(1, "Category description is required"),
});

type CreateCategoryInput = z.infer<typeof createCategorySchema>;

export const createCategory = async (input: CreateCategoryInput) => {
  try {
    const categoryExists = await prisma.category.findFirst({
      where: {
        name: input.name,
      },
    });

    if (categoryExists) {
      return {
        success: false,
        message: "Category already exists",
        data: null,
      };
    }

    const category = await prisma.category.create({ data: input });
    revalidatePath("/");

    return {
      success: true,
      message: "Category created successfully",
      data: category,
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      data: null,
      message: e.message || "Failed to create category",
    };
  }
};
