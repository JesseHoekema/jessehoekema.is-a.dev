FROM node:24-alpine AS builder

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package*.json ./
COPY pnpm-lock.yaml* ./

RUN pnpm install --frozen-lockfile || pnpm install

RUN pnpm add -D @sveltejs/adapter-node

COPY . .

ENV ADAPTER=node

RUN pnpm run build

RUN pnpm prune --production

FROM node:24-alpine

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 5173

ENV NODE_ENV=production
ENV PORT=5173

CMD ["node", "build"]