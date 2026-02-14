import { type NextRequest, NextResponse } from "next/server";
import { env } from "@/env";

const API_URL = env.API_URL || "http://localhost:3001";

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json(
      { error: "Missing userId in query parameters" },
      { status: 400 },
    );
  }

  const result = await fetch(
    `${API_URL}/sale/purchase/status?userId=${userId}`,
  );
  if (!result.ok) {
    return NextResponse.json(
      { error: "Failed to fetch purchase status" },
      { status: result.status },
    );
  }

  const data = await result.json();
  return NextResponse.json(data, { status: 200 });
}
