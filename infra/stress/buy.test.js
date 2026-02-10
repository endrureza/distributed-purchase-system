import { check, sleep } from "k6";
import http from "k6/http";

/**
 * This test simulates a sum of users constantly purchasing stuff.
 *
 * Need to observe that stock not goes below 0 and total purchased user as defined.
 */

const API_URL = __ENV.API_URL || "http://localhost:3001/sale/buy";

export const options = {
  scenarios: {
    flash_sale: {
      executor: "constant-vus",
      vus: 500,
      duration: "10s",
    },
  },
};

export default function () {
  const userId = `user-${__VU}-${__ITER}`;

  const res = http.post(API_URL, JSON.stringify({ userId }), {
    headers: { "Content-Type": "application/json" },
  });

  check(res, {
    "status is 200": (r) => r.status === 200,
  });

  sleep(0.1);
}
