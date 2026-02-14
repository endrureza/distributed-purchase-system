import { Injectable } from "@nestjs/common";
import { PRODUCT } from "@repo/shared/constants";
import { QueueService } from "@/queue/queue.service";
import { RedisService } from "@/redis/redis.service";

@Injectable()
export class SaleService {
	constructor(
		private readonly redis: RedisService,
		private readonly queue: QueueService,
	) {}

	getStatus() {
		const now = new Date();

		if (now < PRODUCT.saleStart) {
			return "UPCOMING";
		}
		if (now >= PRODUCT.saleEnd) {
			return "ENDED";
		}
		return "ACTIVE";
	}

	async buy(userId: string) {
		const status = this.getStatus();

		if (status !== "ACTIVE") return status;

		const result = await this.redis.attemptPurchase(userId);

		if (result === -2) return { status: "PURCHASED" };
		if (result === -1) return { status: "SOLD_OUT" };

		await this.queue.enqueuePurchase(userId);

		return { status: "SUCCESS" };
	}

	async isStockAvailable() {
		const stock = await this.redis.getStock();

		return stock;
	}

	async getUserPurchaseStatus(userId: string) {
		const hasPurchased = await this.redis.hasPurchased(userId);

		return hasPurchased === 1;
	}
}
