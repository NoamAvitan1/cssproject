FROM node:18-alpine AS base

FROM base AS deps

RUN apk add --no-cache libc6-compat

RUN apk add chromium

WORKDIR /app

COPY package*.json ./

RUN npm ci

FROM base AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules

COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

FROM base AS runner

WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs

RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app ./

# Remove existing .next directory if it exists
RUN rm -rf .next

# Create a new .next directory
RUN mkdir .next

RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Set custom DNS servers
RUN echo "nameserver 10.0.0.2" > /etc/resolv.conf
RUN echo "nameserver 8.8.8.8" >> /etc/resolv.conf

USER nextjs

EXPOSE 3000

ENV PORT 3000

ENV HOSTNAME 0.0.0.0

CMD ["node", "server.js"]
