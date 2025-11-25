# syntax=docker/dockerfile:1.7

# ---------- Build stage ----------
FROM --platform=$BUILDPLATFORM node:20-alpine AS builder
ENV NODE_ENV=production
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---------- Runtime stage ----------
FROM --platform=$TARGETPLATFORM node:20-alpine AS runner
ENV NODE_ENV=production
WORKDIR /app

COPY --from=builder /app/package*.json ./
RUN npm ci --omit=dev

# For a standard Next.js app:
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.* ./ 2>/dev/null || true

EXPOSE 3000
CMD ["npm", "run", "start"]
