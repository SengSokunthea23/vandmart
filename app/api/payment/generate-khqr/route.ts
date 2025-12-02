import { type NextRequest, NextResponse } from "next/server";
import { BakongKHQR, IndividualInfo } from "bakong-khqr";
import { CurrencyEnum } from "@/types/currency";

export async function POST(request: NextRequest) {
  try {
    const { amount } = await request.json();

    if (!amount) {
      return new NextResponse(
        JSON.stringify({
          error: {
            code: 400,
            message: "Amount are required",
          },
        }),
        {
          status: 400,
        }
      );
    }

    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      return new NextResponse(
        JSON.stringify({
          error: {
            code: 400,
            message: "Amount must be a number and greater than 0",
          },
        }),
        {
          status: 400,
        }
      );
    }

    const optionalData = {
      amount: Number(amount),
      currencyCode: CurrencyEnum.USD.code,
      currency: CurrencyEnum.USD.number,
      mobileNumber: "85599965943",
      purposeOfTransaction: "payment",
      languagePreference: "en",
    };
    const individualInfo: IndividualInfo & { expirationTimestamp: number } = {
      bakongAccountID: "somon_soum1@aclb",
      acquiringBank: "ACLEDA",
      merchantName: "Vandmart",
      merchantCity: "Phnom Penh",
      merchantNameAlternateLanguage: "Vandmart",
      expirationTimestamp: Date.now() + 10 * 60 * 1000,
      ...optionalData,
    };

    const KHQR = new BakongKHQR();
    const individual = KHQR.generateIndividual(individualInfo);

    if (!individual.data) {
      const message = individual.status.message;
      return new NextResponse(
        JSON.stringify({
          error: {
            code: 400,
            message,
          },
        }),
        {
          status: 400,
        }
      );
    }

    return new NextResponse(
      JSON.stringify({
        data: individual.data,
        timestamp: Date.now(),
      }),
      {
        status: 201,
      }
    );
  } catch (err: any) {
    console.log(JSON.stringify(err));
    const error = {
      code: 500,
      message: err?.raw?.message ?? "Internal server error",
    };
    return new NextResponse(JSON.stringify(error), {
      status: 500,
    });
  }
}
