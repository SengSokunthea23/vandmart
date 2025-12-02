"use server";

import { Prisma } from "@prisma/client";
import prisma from "../prisma";
import { z } from "zod";

const ordersSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).default(10),
});

type Orders = Prisma.OrderGetPayload<{
  include: {
    orderItems: true;
    shippingAddress: true;
    user: true;
  };
}>[];

type OrdersData = Array<
  Omit<Orders[0], "shippingFee" | "tax" | "total"> & {
    shippingFee: number;
    tax: number;
    total: number;
  }
>;

type OrdersActionResponse = {
  success: boolean;
  message: string;
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: OrdersData | null;
};

export const getOrders = async ({
  page = 1,
  limit = 10,
}: z.infer<typeof ordersSchema>): Promise<OrdersActionResponse> => {
  try {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.order.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        include: {
          orderItems: true,
          shippingAddress: true,
          user: true,
        },
      }),
      prisma.order.count(),
    ]);

    return {
      success: true,
      message: "Orders fetched successfully",
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
      data: data.map((order) => {
        return {
          ...order,
          shippingFee: Number(order.shippingFee),
          tax: Number(order.tax),
          total: Number(order.total),
        };
      }),
    };
  } catch (error) {
    const e = error as Error;

    return {
      success: false,
      message: e.message || "Failed to fetch orders",
      data: null,
      page,
      limit,
      total: 0,
      totalPages: 0,
    };
  }
};
