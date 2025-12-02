import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { accountId } = await request.json();
    const token = process.env.BAKONG_ACCESS_TOKEN;

    const bakongResponse = await fetch(
      `${process.env.BAKONG_API_BASE_URL}/v1/check_bakong_account`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify({ accountId }),
        cache: "no-store",
      }
    );

    const data = await bakongResponse.json();

    if (!data.data) {
      return new NextResponse(
        JSON.stringify({
          error: {
            code: 404,
            message: data.responseMessage,
          },
        }),
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(data, { status: bakongResponse.status });
  } catch (err: any) {
    const error = {
      code: 500,
      message: err?.raw?.message ?? "Internal server error",
    };
    return new NextResponse(JSON.stringify(error), {
      status: 500,
    });
  }
}
