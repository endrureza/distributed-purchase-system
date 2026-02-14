import { NextResponse } from "next/server";
import { env } from "@/env";

const API_URL = env.API_URL || "http://localhost:3001";

export async function GET() {
	try {
		const response = await fetch(`${API_URL}/sale/stock`);

		if (!response.ok) {
			return NextResponse.json(
				{ error: "Stock request failed" },
				{ status: response.status },
			);
		}

		const stock = await response.json();
		return NextResponse.json(stock, { status: 200 });
	} catch {
		return NextResponse.json({ error: "Backend Unavailable" }, { status: 500 });
	}
}
