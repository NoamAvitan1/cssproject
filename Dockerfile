FROM node:18-alpine

FROM base AS runner

WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs

RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

RUN mkdir .next

RUN chown nextjs:nodejs .next

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

ENV HOSTNAME "0.0.0.0"

COPY package*.json ./

RUN npm install

RUN apk add --no-cache libc6-compat

RUN apk add chromium

ENV NEXT_TELEMETRY_DISABLED 1

ENV DB_PW=TT1LRw3hINBbtBFp NEXT_PUBLIC_SUPABASE_URL=https://ielhefdzhfesqnlbxztn.supabase.co NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImllbGhlZmR6aGZlc3FubGJ4enRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQwMDU4NTEsImV4cCI6MjAwOTU4MTg1MX0.0-Mmeji_YHVSbUEIk0Sm2hyIVoyygu6VZuFtNfuAJY0 NEXT_BASE_BUCKET_URL=https://ielhefdzhfesqnlbxztn.supabase.co/storage/v1/object/public/profile%20pic/

CMD ["node", "server.js"]

RUN npm run build
