import { NextResponse } from "next/server";
import { env } from "@/env";

const API_URL = env.API_URL || "http://localhost:3001";

export async function GET() {
	try {
		const res = await fetch(`${API_URL}/sale/status`, {
			cache: "no-store",
		});

		if (!res.ok) {
			return NextResponse.json(
				{ error: "Failed to fetch sale status" },
				{ status: res.status },
			);
		}

		const data = await res.json();

		return NextResponse.json(data, { status: 200 });
	} catch {
		return NextResponse.json({ error: "Backend Unavailable" }, { status: 500 });
	}
}
