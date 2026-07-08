FROM node:24-alpine3.22 AS dependencies

WORKDIR /app

COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./

RUN npm install

FROM node:24-alpine3.22 AS builder

WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules

COPY . .

RUN npm run build

FROM node:24-alpine3.22 AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S -D -u 1001 -G nodejs nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3002

ENV PORT=3002

CMD ["npm", "run", "start"]