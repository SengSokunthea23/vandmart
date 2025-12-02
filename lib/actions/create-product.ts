"use server";

import { revalidatePath } from "next/cache";
import prisma from "../prisma";
import { z } from "zod";

const createProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  categoryId: z.number().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(1, "Price is required"),
  stock: z.number().min(1, "Stock is required"),
  image: z.string().min(1, "Image is required"),
});

type ProductInput = z.infer<typeof createProductSchema>;

export const createProduct = async (input: ProductInput) => {
  try {
    const existProduct = await prisma.product.findFirst({
      where: {
        name: input.name,
        categoryId: input.categoryId,
      },
    });

    if (existProduct) {
      return {
        success: false,
        message: "Product already exists",
        data: null,
      };
    }

    const product = await prisma.product.create({
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
      message: "Product created successfully",
      data: product,
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      data: null,
      message: e.message || "Failed to create product",
    };
  }
};
