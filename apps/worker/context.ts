import { type DeepMockProxy, mockDeep } from "jest-mock-extended";
import type { PrismaClient } from "./src/generated/prisma/client.ts";

export type Context = {
  prisma: PrismaClient;
};

export type MockContext = {
  prisma: DeepMockProxy<PrismaClient>;
};

export const createMockContext = () => {
  return {
    prisma: mockDeep<PrismaClient>(),
  };
};
