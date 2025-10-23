FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production && npm ci --only=development

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production

COPY --from=0 /app/dist ./dist
COPY .env ./

EXPOSE 3000

CMD ["node", "dist/app.js"]
