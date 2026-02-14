"use client";

import { PRODUCT } from "@repo/shared/constants";
import Image from "next/image";
import { useEffect, useState } from "react";
import BuyButton from "@/components/blocks/buy-button";
import ProductCard from "@/components/blocks/product-card";
import UserIdInput from "@/components/blocks/user-id-input";
import { checkSaleStatus, checkStock, purchase } from "@/services/sale";

export default function Home() {
  const [userId, setUserId] = useState("");
  const [data, setData] = useState<any>(null);
  const [isSoldOut, setIsSoldOut] = useState(false);
  const [purchaseState, setPurchaseState] = useState<
    "idle" | "processing" | "success" | "purchased" | "sold_out" | "error"
  >("idle");

  useEffect(() => {
    checkSaleStatus().then(setData).catch(console.error);
    checkStock()
      .then((res) => {
        if (!res.isAvailable) {
          setIsSoldOut(true);
          setPurchaseState("sold_out");
        }
      })
      .catch(console.error);
  }, []);

  const fetchStock = async () => {
    const result = await checkStock();

    if (!result.isAvailable) {
      setIsSoldOut(true);
      setPurchaseState("sold_out");
    }
  };

  const handleBuy = async () => {
    setPurchaseState("processing");
    try {
      const result = await purchase(userId);
      setPurchaseState(
        result.status === "SUCCESS" ? "success" : result.status.toLowerCase(),
      );
      await fetchStock();
      setTimeout(() => {
        setPurchaseState(isSoldOut ? "sold_out" : "idle");
        setUserId("");
      }, 2000);
    } catch {
      setPurchaseState("error");
    }
  };

  return (
    <>
      <div
        id="header"
        className="w-full flex flex-row bg-amber-100 justify-center items-center text-sm text-gray-800"
      >
        <h1>For Testing Purpose Only</h1>
      </div>
      <div id="content" className="grid grid-cols-[1fr_1fr] p-10 gap-x-4">
        <div id="product-image">
          <Image
            src="/steam-machine.avif"
            alt="Steam Machine"
            className="aspect-square object-cover"
            width={640}
            height={480}
          />
        </div>
        <div className="flex flex-col gap-y-2">
          <ProductCard
            product={PRODUCT}
            status={isSoldOut ? "SOLD_OUT" : data?.status || "UPCOMING"}
          />
          <UserIdInput userId={userId} setUserId={setUserId} />
          <BuyButton
            state={purchaseState}
            onClick={handleBuy}
            disabled={
              !userId || purchaseState !== "idle" || data?.status !== "ACTIVE"
            }
          />
        </div>
      </div>
    </>
  );
}
