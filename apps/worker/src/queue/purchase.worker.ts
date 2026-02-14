import "dotenv/config";
import { eq } from "drizzle-orm";
import { purchasesTable } from "../db/schema.js";

export async function PurchaseProcessor(db: any, userId: string) {
  return db.transaction(async (tx) => {
    const existing = await tx
      .select()
      .from(purchasesTable)
      .where(eq(purchasesTable.userId, userId))
      .limit(1);

    if (existing.length > 0) {
      return { status: "ALREADY_PURCHASED" };
    }

    await tx.insert(purchasesTable).values({ userId });

    return { status: "CONFIRMED" };
  });
}
