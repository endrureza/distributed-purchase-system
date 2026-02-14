"use client";

import { useEffect, useState } from "react";

export function SaleCountdown({ target }: { target: string }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const id = setInterval(() => {
      const diff = new Date(target).getTime() - Date.now();

      if (diff <= 0) {
        setTime("00:00:00");
        clearInterval(id);
        return;
      }

      const s = Math.floor(diff / 1000);
      const h = String(Math.floor(s / 3600)).padStart(2, "0");
      const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
      const sec = String(s % 60).padStart(2, "0");

      setTime(`${h}:${m}:${sec}`);
    }, 1000);

    return () => clearInterval(id);
  }, [target]);

  return <p className="text-xs text-gray-500">{time}</p>;
}

export default SaleCountdown;
