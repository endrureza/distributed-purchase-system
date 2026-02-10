import {
  type Context,
  createMockContext,
  type MockContext,
} from "../../context.ts";
import { PurchaseProcessor } from "./purchase.worker.ts";

describe("PurchaseProcessor (worker unit)", () => {
  // biome-ignore lint/suspicious/noImplicitAnyLet: prisma is quite compl.
  let mockCtx: MockContext;
  let ctx: Context;

  beforeAll(async () => {
    await ctx.prisma.purchase.deleteMany();
  });

  afterAll(async () => {
    await ctx.prisma.$disconnect();
  });

  beforeEach(async () => {
    mockCtx = createMockContext();
    ctx = mockCtx as unknown as Context;
    // Reset between tests so they are repeatable
    await ctx.prisma.purchase.deleteMany();
  });

  it("confirms first purchase", async () => {
    const result = await PurchaseProcessor(ctx.prisma, "user-1");

    expect(result.status).toBe("CONFIRMED");

    const purchases = await ctx.prisma.purchase.findMany();
    expect(purchases.length).toBe(1);
    expect(purchases[0].userId).toBe("user-1");
  });

  it("rejects duplicate purchase from same user", async () => {
    await PurchaseProcessor(ctx.prisma, "user-1");

    const result = await PurchaseProcessor(ctx.prisma, "user-1");

    expect(result.status).toBe("ALREADY_PURCHASED");

    const purchases = await ctx.prisma.purchase.findMany();
    expect(purchases.length).toBe(1);
  });
});
