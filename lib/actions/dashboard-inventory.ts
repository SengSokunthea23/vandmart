"use server";

import prisma from "../prisma";

export const dashboardInventory = async () => {
  try {
    const [totalProducts, totalCategories, stockStats, lowStock] =
      await Promise.all([
        // Total products
        prisma.product.count(),

        // Total categories
        prisma.category.count(),

        // Total stock + inventory value
        prisma.product.aggregate({
          _sum: {
            stock: true,
            price: true, // price isn't enough, so we compute inventory value separately
          },
        }),

        // Low stock products (<10 units)
        prisma.product.count({
          where: {
            stock: {
              lt: 10,
            },
          },
        }),
      ]);

    // Compute inventory value: sum(price * stock)
    const inventoryValueResult = await prisma.product.findMany({
      select: {
        price: true,
        stock: true,
      },
    });

    const inventoryValue = inventoryValueResult.reduce((sum, item) => {
      return sum + item.price * item.stock;
    }, 0);

    return {
      success: true,
      message: "Dashboard data fetched successfully",
      data: {
        totalProducts,
        totalCategories,
        totalStock: stockStats._sum.stock ?? 0,
        inventoryValue,
        lowStock,
      },
    };
  } catch (error) {
    const e = error as Error;
    return {
      success: false,
      data: null,
      message: e.message || "Failed to fetch dashboard data",
    };
  }
};
