"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, Package, ShoppingCart, Tag } from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const links = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: BarChart3,
    },
    {
      href: "/admin/products",
      label: "Products",
      icon: Package,
    },
    {
      href: "/admin/categories",
      label: "Categories",
      icon: Tag,
    },
    {
      href: "/admin/orders",
      label: "Orders",
      icon: ShoppingCart,
    },
  ];

  return (
    <aside className="w-64 border-r border-border bg-sidebar text-sidebar-foreground">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-sidebar-primary">Admin Panel</h1>
        <p className="text-sm text-sidebar-foreground/60">Ecommerce Manager</p>
      </div>
      <nav className="space-y-2 px-4">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-2 transition-colors ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
