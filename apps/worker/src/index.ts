import "dotenv/config";
import { Worker } from "bullmq";
import { Redis } from "ioredis";
import { prisma } from "./db/prisma.js";
import { PurchaseProcessor } from "./queue/purchase.worker.js";

const connection = new Redis({
	host: process.env.REDIS_HOST || "localhost",
	port: Number(process.env.REDIS_PORT || 6379),
	maxRetriesPerRequest: null,
});

new Worker(
	"purchase",
	async (job) => {
		const { userId } = job.data;
		return PurchaseProcessor(prisma, userId);
	},
	{
		connection,
		concurrency: 5,
	},
);

console.log("Purchase worker is running...");
