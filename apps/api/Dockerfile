FROM oven/bun:1.3.8 AS base
WORKDIR /app

FROM base AS prepare
RUN bun add -g turbo
COPY . .
RUN turbo prune api --docker

FROM base AS builder
COPY --from=prepare /app/out/json .
RUN bun install --ignore-scripts
COPY --from=prepare /app/out/full .

RUN bun turbo build --filter=api

# -----------------------------
# Runtime
# -----------------------------
FROM base AS runner
WORKDIR /app

COPY --from=builder /app ./

WORKDIR /app/apps/api

CMD ["bun", "run", "start:prod"]
