CREATE TABLE "purchases" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "purchases_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"userId" varchar NOT NULL,
	"createdAt" date DEFAULT now() NOT NULL,
	CONSTRAINT "purchases_userId_unique" UNIQUE("userId")
);
