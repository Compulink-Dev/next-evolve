import { paynowService } from "@/lib/paynow";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { pollUrl } = await request.json();
    
    if (!pollUrl) {
      return NextResponse.json(
        { error: "Poll URL is required" },
        { status: 400 }
      );
    }

    const status = await paynowService.checkPaymentStatus(pollUrl);

    return NextResponse.json(status);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}