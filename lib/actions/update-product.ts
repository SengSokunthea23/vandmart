"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma";
import { z } from "zod";

const updateProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  categoryId: z.number().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(1, "Price is required"),
  stock: z.number().min(1, "Stock is required"),
  image: z.string().min(1, "Image is required"),
});

export type ProductInput = z.infer<typeof updateProductSchema>;

export const updateProduct = async (id: number, input: ProductInput) => {
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

    const product = await prisma.product.update({
      where: {
        id,
      },
      data: {
        name: input.name,
        categoryId: input.categoryId,
        description: input.description,
        price: input.price,
        stock: input.stock,
        image: input.image,
      },
    });

    revalidatePath("/");

    return {
      success: true,
      message: "Product updated successfully",
      data: product,
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      message: e.message || "Failed to update product",
      data: null,
    };
  }
};
