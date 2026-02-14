FROM oven/bun:1.3.8 AS base
WORKDIR /app

# -----------------------------
# Install dependencies (cached)
# -----------------------------
FROM base AS install

# Copy workspace metadata
COPY package.json bun.lock ./
COPY apps ./apps
COPY packages ./packages
COPY turbo.json ./

RUN bun install --frozen-lockfile

# -----------------------------
# Build
# -----------------------------
FROM base AS prerelease
WORKDIR /app

COPY --from=install /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
RUN bun run build --filter=web

# -----------------------------
# Runtime
# -----------------------------
FROM base AS release
WORKDIR /app

COPY --from=prerelease /app ./

CMD ["sh", "-c", "bun run --cwd apps/web start"]
