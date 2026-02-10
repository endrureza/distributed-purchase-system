import { check, sleep } from "k6";
import http from "k6/http";
import { Counter } from "k6/metrics";

const API_URL = __ENV.API_URL ?? "http://api:3001/sale/buy";

/* Metrics */
const purchaseSuccess = new Counter("purchase_success");
const purchasedAlready = new Counter("purchased");
const soldOut = new Counter("sold_out");
const inactiveSale = new Counter("inactive_sale");
const serverError = new Counter("server_error");

export const options = {
  scenarios: {
    flash_sale: {
      executor: "ramping-arrival-rate",
      timeUnit: "1s",
      startRate: 20,

      preAllocatedVUs: 200,
      maxVUs: 2000,

      stages: [
        { target: 100, duration: "5s" },
        { target: 1500, duration: "10s" },
        { target: 800, duration: "15s" },
        { target: 200, duration: "10s" },
        { target: 0, duration: "5s" },
      ],
    },
  },

  thresholds: {
    http_req_failed: ["rate<0.05"],
    http_req_duration: ["p(95)<400"],
    checks: ["rate>0.95"],
    server_error: ["count<20"],
  },
};

export default function () {
  const userId = `user-${__VU}-${__ITER}`;

  const res = http.post(API_URL, JSON.stringify({ userId }), {
    headers: { "Content-Type": "application/json" },
  });

  if (res.status >= 500) {
    serverError.add(1);
  }

  let body;
  try {
    body = res.json();
  } catch {
    body = res.body;
  }

  const status = typeof body === "string" ? body : body?.status;

  const ok = check(
    { status },
    {
      "valid business response": (d) =>
        d.status === "SUCCESS" ||
        d.status === "SOLD_OUT" ||
        d.status === "PURCHASED" ||
        d.status === "UPCOMING" ||
        d.status === "ENDED",
    },
  );

  if (!ok) serverError.add(1);

  if (status === "SUCCESS") purchaseSuccess.add(1);
  if (status === "PURCHASED") purchasedAlready.add(1);
  if (status === "SOLD_OUT") soldOut.add(1);
  if (status === "UPCOMING" || status === "ENDED") inactiveSale.add(1);

  sleep(Math.random() * 0.2);
}
