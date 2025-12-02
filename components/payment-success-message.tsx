"use client";

import type React from "react";

import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

export const PaymentSuccessMessage: React.FC = () => {
  const router = useRouter();
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full grid grid-cols-1 gap-y-4 justify-items-center">
        <div className="text-center pt-4">
          <div className="w-full flex justify-center mb-6">
            <Image
              src="/done.gif"
              alt="Success"
              width={60}
              height={60}
              className="object-contain"
            />
          </div>
          <h2 className="w-full text-[#28386a] text-2xl font-bold">
            Payment Successful
          </h2>
          <h2 className="w-full text-[#28386a] text-xl mt-2">Thank You</h2>
        </div>
        <Button className="w-full bg-blue-500" onClick={() => router.push("/")}>
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};
