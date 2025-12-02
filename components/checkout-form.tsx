"use client";

import type React from "react";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Truck } from "lucide-react";
import { PaymentSuccessMessage } from "./payment-success-message";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import Image from "next/image";
import { QRCodeSVG } from "qrcode.react";
import { createOrder } from "@/lib/actions";
import { PaymentMethod } from "@prisma/client";
import { useSession } from "@/lib/auth-client";
import { sendTelegramMessage } from "@/lib/actions/telegram-bot";

const checkoutSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(1, "Address is required"),
  phoneNumber: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9\-+$$$$ ]{7,}$/, "Invalid phone number"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "ZIP code is required"),
  paymentMethod: z.enum([PaymentMethod.COD, PaymentMethod.KHQR]),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

type CheckoutFormProps = {
  total: number;
  tax: number;
  shippingFee: number;
  showConfirmDialog: boolean;
  setShowConfirmDialog: (show: boolean) => void;
  products: { id: number; quantity: number }[];
};

export const CheckoutForm: React.FC<CheckoutFormProps> = ({
  total,
  tax,
  shippingFee,
  showConfirmDialog,
  products,
  setShowConfirmDialog,
}) => {
  // Payment QR
  const [currency, setCurrency] = useState("USD");
  const [qrUrl, setQrUrl] = useState<string | undefined>(undefined);
  const [md5Hash, setMd5Hash] = useState("");
  const [isTransactionSuccess, setIsTransactionSuccess] = useState(false);

  const [timestamp, setTimestamp] = useState<number>();
  const [pending, startTransition] = useTransition();
  const { data: session } = useSession();

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      city: "",
      state: "",
      zipCode: "",
      paymentMethod: PaymentMethod.KHQR,
    },
  });

  const { handleSubmit } = form;

  useEffect(() => {
    if (total && md5Hash && !isTransactionSuccess) {
      const interval = setInterval(() => {
        fetch("/api/payment/check-bakong-transaction", {
          method: "POST",
          body: JSON.stringify({ md5: md5Hash }),
        })
          .then((res) => res.json())
          .then(async (data) => {
            if (data?.data.responseCode === 0) {
              setIsTransactionSuccess(true);
              await sendTelegramMessage(
                `✅ Payment Status: ${data?.data.responseMessage}\n
                💰 Amount: ${data?.data?.data?.amount}\n 
                💱 Currency: ${data?.data?.data?.currency}\n`
              );
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }, 3000);

      return () => clearInterval(interval);
    }
    // eslint-disable-next-line
  }, [md5Hash, isTransactionSuccess, total]);

  if (!session?.user) {
    return null;
  }

  const onSubmit = (data: z.infer<typeof checkoutSchema>) => {
    startTransition(async () => {
      const response = await createOrder({
        phoneNumber: data.phoneNumber,
        tax,
        total: total,
        shippingFee,
        paymentMethod: data.paymentMethod,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        products,
        userId: Number(session.user.id),
      });

      if (response.success) {
        setShowConfirmDialog(true);
        await generateQRCode();
      }
    });
  };
  console.log({ isTransactionSuccess });

  const generateQRCode = async () => {
    try {
      const response = await fetch("/api/payment/generate-khqr", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });

      if (!response?.ok) {
        const text = await response.text();
        console.error("Payment check failed:", response.status, text);
        throw new Error("Payment check failed");
      }

      const result = await response.json();

      setQrUrl(result?.data?.qr);
      setMd5Hash(result?.data?.md5);
      setTimestamp(result?.timestamp);
      return result;
    } catch (error) {
      console.error("Error generating QR code:", error);
    }
  };

  const currencyIcon =
    currency === "USD" ? "/assets/ccy/usd.svg" : "/assets/ccy/khr.svg";

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="h-5 w-5 mr-2" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <Input placeholder="Sok" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <Input placeholder="Dara" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <Input
                        placeholder="street 21, Toul Kork, Phnom Penh, Cambodia"
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phnone Number</FormLabel>
                      <Input placeholder="099932312" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <Input placeholder="Phnom Penh" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>State</FormLabel>
                      <Input placeholder="Phnom Penh" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ZIP Code</FormLabel>
                      <Input placeholder="12000" {...field} />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="paymentMethod"
                render={({ field }) => (
                  <FormItem>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="KHQR" id="khqr" />
                        <FormLabel
                          htmlFor="khqr"
                          className="font-normal cursor-pointer"
                        >
                          KHQR
                        </FormLabel>
                      </div>
                    </RadioGroup>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" size="lg" disabled={pending}>
            {pending ? "Processing Order..." : "Complete Order"}
          </Button>
        </form>
      </Form>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle hidden={isTransactionSuccess}>
              Confirm Payment
            </AlertDialogTitle>
            <AlertDialogDescription hidden={isTransactionSuccess}>
              Please confirm your payment by scanning the QR code below.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="w-full flex justify-center">
            {!isTransactionSuccess && qrUrl && timestamp && (
              <div className="w-1/2 grid grid-cols-1 gap-y-4 justify-items-center">
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
                  <div className="flex items-center gap-x-2 font-bold text-lg">
                    {currency === "USD" ? Number(total).toFixed(2) : total}
                    <span className="text-xs font-normal">{currency}</span>
                  </div>
                </div>

                <div className="w-full flex justify-center py-4">
                  <div className="relative">
                    <QRCodeSVG value={qrUrl} size={224} level="H" />
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
              </div>
            )}
            {isTransactionSuccess && md5Hash && <PaymentSuccessMessage />}
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
