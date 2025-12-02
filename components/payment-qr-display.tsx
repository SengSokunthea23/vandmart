"use client";

import type React from "react";
import { QRCodeSVG } from "qrcode.react";
import Image from "next/image";

type PaymentQRDisplayProps = {
  qrText: string;
  minutes: number;
  seconds: number;
  isLoading: boolean;
  onReload: () => void;
  currency: string;
  amount: string;
};

export const PaymentQRDisplay: React.FC<PaymentQRDisplayProps> = ({
  qrText,
  minutes,
  seconds,
  isLoading,
  currency,
  amount,
  onReload,
}) => {
  const currencyIcon =
    currency === "USD" ? "/assets/ccy/usd.svg" : "/assets/ccy/khr.svg";

  return (
    <div className="w-full flex justify-center items-center">
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 gap-y-4 justify-items-center">
          <div className="w-full flex justify-center items-center p-3 bg-[#e21a1a] rounded-t-2xl text-white">
            <Image
              fetchPriority="high"
              src="/khqr-icon.svg"
              alt="KHQR"
              width={36}
              height={30}
            />
          </div>

          <div className="flex flex-col justify-center items-center">
            <span className="text-sm">Scan to Pay</span>
            <div className="flex items-center gap-x-2 font-bold text-lg">
              {currency === "USD" ? Number(amount).toFixed(2) : amount}
              <span className="text-xs font-normal">{currency}</span>
            </div>
          </div>

          <div className="w-full flex justify-center py-4">
            <div className="relative">
              <QRCodeSVG value={qrText} size={224} level="H" />
              {currency === "USD" ? (
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-black rounded-full flex items-center justify-center">
                  <span className="text-white text-lg font-bold">$</span>
                </div>
              ) : (
                <Image
                  fetchPriority="high"
                  src={currencyIcon || "/placeholder.svg"}
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  alt="currency-icon"
                  width={40}
                  height={40}
                />
              )}
            </div>
          </div>

          <div className="text-center">
            <h3 className="uppercase font-bold text-[#28386a] text-xs mb-2">
              Time Remaining
            </h3>
            <div className="text-3xl font-bold text-red-600">
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </div>
          </div>

          <div className="flex justify-center pt-2">
            <Image
              src="/KHQR-53Pay.png"
              alt="KHQR Support"
              className="rounded-lg h-12 object-contain"
              aria-label="KHQR Support"
              width={400}
              height={48}
            />
          </div>
        </div>
      )}
    </div>
  );
};
