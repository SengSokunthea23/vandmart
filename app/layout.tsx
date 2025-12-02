import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/hooks/use-cart";
import { Toaster } from "sonner";
import Provider from "./provider";
import { SessionProvider } from "@/components/session-provider";
import { NuqsAdapter } from "nuqs/adapters/next/app";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Vandmart - E-Commerce Store",
  description: "Your one-stop shop for electronics, clothing, books, and more!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NuqsAdapter>
          <SessionProvider>
            <Provider>
              <CartProvider>
                {children}
                <Toaster richColors position="top-right" />
              </CartProvider>
            </Provider>
          </SessionProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
