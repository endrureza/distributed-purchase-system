FROM oven/bun:1.3.8 AS base
WORKDIR /app

FROM base AS prepare
RUN bun add -g turbo
COPY . .

ARG API_URL
ARG NEXT_PUBLIC_API_URL

ENV API_URL=${API_URL}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

RUN turbo prune web --docker

FROM base AS builder
COPY --from=prepare /app/out/json .
RUN bun install
COPY --from=prepare /app/out/full .

ARG API_URL
ARG NEXT_PUBLIC_API_URL

ENV API_URL=${API_URL}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

RUN bun turbo build --filter=web

# -----------------------------
# Runtime
# -----------------------------
FROM base AS runner
WORKDIR /app

COPY --from=builder /app ./

WORKDIR /app/apps/web

ARG API_URL
ARG NEXT_PUBLIC_API_URL

ENV API_URL=${API_URL}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

CMD ["bun", "run", "start"]
