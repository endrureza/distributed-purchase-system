"use client";

import type { FlashStatus } from "@repo/shared/types";
import { Badge } from "@/components/ui/badge";

const SaleStatus = ({ status }: { status: FlashStatus }) => {
	if (status === "ENDED") {
		return <Badge variant="destructive">Sale Ended</Badge>;
	}

	return (
		<div className="flex flex-row gap-x-1">
			<Badge variant="secondary">Flash Sale</Badge>

			{status === "ACTIVE" && <Badge variant="default">Ready Stock</Badge>}
			{status === "UPCOMING" && <Badge variant="outline">Coming Soon</Badge>}
			{status === "SOLD_OUT" && <Badge variant="destructive">Sold Out</Badge>}
		</div>
	);
};

export default SaleStatus;
