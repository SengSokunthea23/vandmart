"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const Unauthorized = () => {
  const router = useRouter();
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Image
        src="/401-ERROR.svg"
        alt="Unauthorized Access"
        width={200}
        height={200}
        priority
        className="mb-2"
      />
      <h1 className="text-2xl font-bold">401 - គ្មានការអនុញ្ញាត</h1>
      <p className="text-lg">អ្នកមិនមានសិទ្ធិចូលប្រើទំព័រនេះទេ</p>
      <Button
        className="mt-4 rounded px-4 py-2 text-white"
        onClick={() => router.push("/")}
      >
        ត្រឡប់ក្រោយ
      </Button>
    </div>
  );
};
