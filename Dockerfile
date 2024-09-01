FROM node:22-alpine

WORKDIR /app

ARG NODE_ENV=development
COPY package*.json .
COPY tsconfig.json .
RUN npm install
RUN mkdir book_storage
COPY ./src ./src
RUN npm run build
COPY ./dist .

CMD ["node", "index.js"]