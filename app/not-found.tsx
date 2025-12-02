"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Image
        src="/404-ERROR.svg"
        alt="404 Not Found"
        width={200}
        height={200}
        priority
        className="mb-2"
      />
      <h1 className="text-2xl font-bold">404 - ទំព័ររកមិនឃើញ</h1>
      <p className="text-lg">ទំព័រដែលអ្នកកំពុងរកមិនមានទេ</p>
      <Button
        className="mt-4 rounded px-4 py-2 text-white"
        onClick={() => router.back()}
      >
        ទៅទំព័រដើម
      </Button>
    </div>
  );
}
