import { Body, Controller, Get, Post } from "@nestjs/common";
import { PRODUCT } from "@repo/shared/constants";
import type { BuyDto } from "./sale.dto";
import { SaleService } from "./sale.service";

@Controller("sale")
export class SaleController {
	constructor(private readonly saleService: SaleService) {}

	@Get("status")
	async status() {
		return {
			status: this.saleService.getStatus(),
			startAt: PRODUCT.saleStart,
			endAt: PRODUCT.saleEnd,
			product: PRODUCT,
		};
	}

	@Post("buy")
	async buy(@Body() createDto: BuyDto) {
		const { userId } = createDto;

		const result = await this.saleService.buy(userId);

		return result;
	}

	@Get("stock")
	async getStockAvailability() {
		const result = await this.saleService.isStockAvailable();

		return {
			isAvailable: result > 0,
			stock: result,
		};
	}

	@Get("purchase/status")
	async getUserPurchaseStatus(@Body() query: BuyDto) {
		const { userId } = query;

		const hasPurchased = await this.saleService.getUserPurchaseStatus(userId);
		return { hasPurchased };
	}
}
