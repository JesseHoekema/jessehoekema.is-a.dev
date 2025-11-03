# ---------- BUILD STAGE ----------
FROM node:20-alpine AS builder

# Werkdirectory
WORKDIR /app

# PNPM setup
RUN corepack enable && corepack prepare pnpm@latest --activate

# Package files
COPY package.json pnpm-lock.yaml* ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy rest of the project
COPY . .

# Build SvelteKit (Node adapter)
RUN pnpm run build

# ---------- PRODUCTION STAGE ----------
FROM node:20-alpine

WORKDIR /app

# PNPM setup
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy build output and node_modules from builder
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose port
EXPOSE 5173

# Environment variables
ENV NODE_ENV=production
ENV PORT=5173
ENV PROTOCOL_HEADER=x-forwarded-proto
ENV HOST_HEADER=x-forwarded-host

# Start Node adapter
CMD ["node", "build/index.js"]
