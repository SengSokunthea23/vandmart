import { type NextRequest, NextResponse } from "next/server";

const token = process.env.BAKONG_ACCESS_TOKEN;

export async function POST(request: NextRequest) {
  try {
    const { md5 } = await request.json();

    if (!md5 || !token) {
      const error = {
        code: 400,
        message: "Md5 and token are required",
      };
      return new NextResponse(JSON.stringify(error), {
        status: 400,
      });
    }

    const response = await fetch(
      `${process.env.BAKONG_53_CLOUD_API_BASE_URL}/check-md5-uat`,
      {
        method: "POST",
        body: JSON.stringify({ md5, token }),
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      throw new Error(`Bakong API error: ${response.statusText}`);
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to check payment status" },
      { status: 500 }
    );
  }
}
