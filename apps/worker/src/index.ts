import "dotenv/config";
import { Worker } from "bullmq";
import { Redis } from "ioredis";
import db, { pool } from "./db/client.js";
import { PurchaseProcessor } from "./queue/purchase.worker.js";

const connection = new Redis({
  host: process.env.REDIS_HOST || "localhost",
  port: Number(process.env.REDIS_PORT || 6379),
  maxRetriesPerRequest: null,
});

async function checkConnections() {
  try {
    // Redis check
    await connection.ping();
    console.log("Redis connected");

    // Database check (Postgres)
    await pool.query("SELECT 1");
    console.log("Database connected");
  } catch (err) {
    console.error("Startup connection failed:", err);
    process.exit(1);
  }
}

async function startWorker() {
  await checkConnections();

  new Worker(
    "purchase",
    async (job) => {
      const { userId } = job.data;
      return PurchaseProcessor(db, userId);
    },
    {
      connection,
      concurrency: 5,
    },
  );

  console.log("Purchase worker is running...");
}

startWorker();
