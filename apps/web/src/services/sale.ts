export const purchase = async (userId: string) => {
	try {
		const response = await fetch("/api/sale/purchase", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ userId }),
		});

		if (!response.ok) {
			throw new Error("Purchase request failed");
		}

		const data = await response.json();

		return data;
	} catch (error) {
		throw new Error(error as any);
	}
};

export const checkSaleStatus = async () => {
	try {
		const response = await fetch("/api/sale/status", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			throw new Error("Status request failed");
		}

		const data = await response.json();

		return data;
	} catch (error) {
		throw new Error(error as any);
	}
};

export const checkUserPurchaseStatus = async (userId: string) => {
	try {
		const response = await fetch(`/api/sale/purchase/status?userId=${userId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			throw new Error("Purchase status request failed");
		}
		const data = await response.json();

		return data;
	} catch (error) {
		throw new Error(error as any);
	}
};

export const checkStock = async () => {
	try {
		const response = await fetch("/api/sale/stock", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			throw new Error("Stock request failed");
		}

		const data = await response.json();

		return data;
	} catch (error) {
		throw new Error(error as any);
	}
};
