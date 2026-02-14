"use client";

import { ShoppingCartIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

type BuyButtonProps = {
  state: "idle" | "processing" | "success" | "purchased" | "sold_out" | "error";
  disabled?: boolean;
  onClick: () => Promise<void>;
};

const BuyButton = ({ state, disabled, onClick }: BuyButtonProps) => {
  return (
    <Button
      variant="default"
      className="bg-orange-400 w-fit hover:bg-orange-300 cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      size="lg"
      onClick={async () => {
        if (
          state === "processing" ||
          state === "success" ||
          state === "purchased" ||
          state === "sold_out" ||
          state === "error"
        )
          return;

        await onClick();
      }}
      disabled={
        disabled ||
        state === "processing" ||
        state === "success" ||
        state === "purchased" ||
        state === "sold_out" ||
        state === "error"
      }
    >
      {state === "idle" && (
        <>
          <ShoppingCartIcon />
          Buy Now
        </>
      )}
      {state === "processing" && (
        <>
          <Spinner />
          Processing...
        </>
      )}
      {state === "purchased" && <>Already Purchased!</>}
      {state === "sold_out" && <>Sold Out!</>}
      {state === "success" && <>Purchase Successful!</>}
      {state === "error" && <>Purchase Failed!</>}
    </Button>
  );
};

export default BuyButton;
