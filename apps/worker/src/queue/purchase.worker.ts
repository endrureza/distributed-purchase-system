import type { PrismaClient } from "../generated/prisma/client.js";

export async function PurchaseProcessor(prisma: PrismaClient, userId: string) {
	return prisma.$transaction(async (tx) => {
		const existing = await prisma.purchase.findUnique({
			where: { userId },
		});

		if (existing) {
			return { status: "ALREADY_PURCHASED" };
		}

		await tx.purchase.create({
			data: { userId },
		});

		return { status: "CONFIRMED" };
	});
}
