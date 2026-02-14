"use client";

import type { ProductProps } from "@repo/shared/constants";
import SaleStatus from "./sale-status";

type ProductCardProps = {
  product: ProductProps;
  status: "UPCOMING" | "ACTIVE" | "ENDED" | "SOLD_OUT";
};

const ProductCard = ({ product, status }: ProductCardProps) => {
  const { name, price, originalPrice, description, saleEnd } = product;

  return (
    <div id="product-details" className="flex flex-col gap-y-2">
      <h2 className="text-2xl font-bold">{name}</h2>
      <SaleStatus status={status} />
      <div className="flex flex-row items-center gap-x-1">
        <span className="text-xl font-bold">${price}</span>
        <span className="line-through text-sm font-semibold text-gray-600">
          ${originalPrice}
        </span>
      </div>
      <div className="flex flex-row items-center gap-x-1">
        <span className="text-sm font-bold text-orange-500">
          Save ${Number(originalPrice) - Number(price)}
        </span>
        <span className="text-sm font-semibold text-gray-600">
          Till {new Date(saleEnd).toLocaleDateString()}
        </span>
      </div>
      <p className="prose my-4">{description}</p>
    </div>
  );
};

export default ProductCard;
