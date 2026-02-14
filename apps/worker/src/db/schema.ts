import { date, integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const purchasesTable = pgTable("purchases", {
	id: integer().primaryKey().generatedAlwaysAsIdentity(),
	userId: varchar().notNull().unique(),
	createdAt: date().notNull().defaultNow(),
});
