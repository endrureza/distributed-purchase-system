export const PURCHASE_LUA = `
-- KEYS[1] = stock
-- KEYS[2] = user key

if redis.call("EXISTS", KEYS[2]) == 1 then
  return -2
end

local stock = tonumber(redis.call("GET", KEYS[1]))
if stock <= 0 then
  return -1
end

redis.call("DECR", KEYS[1])
redis.call("SET", KEYS[2], 1)

return 1
`;
