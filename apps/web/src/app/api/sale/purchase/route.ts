import { NextResponse } from "next/server";
import { env } from "@/env";

const API_URL = env.API_URL || "http://localhost:3001";

export async function POST(request: Request) {
	try {
		const body = await request.json();

		if (!body?.userId) {
			return NextResponse.json(
				{ error: "Missing userId in request body" },
				{ status: 400 },
			);
		}

		const res = await fetch(`${API_URL}/sale/buy`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				userId: body.userId,
			}),
		});

		if (!res.ok) {
			return NextResponse.json(
				{ error: "Purchase failed!" },
				{ status: res.status },
			);
		}

		const data = await res.json();

		return NextResponse.json(data, { status: 200 });
	} catch {
		return NextResponse.json({ error: "Backend Unavailable" }, { status: 500 });
	}
}
