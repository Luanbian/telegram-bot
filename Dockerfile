FROM node:22-alpine

WORKDIR /app

COPY package*.json tsconfig.json ./

RUN npm install
COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "build/src/index.js"]
