FROM node:22-alpine

WORKDIR /app

COPY package*.json .
COPY tsconfig.json .
RUN npm install
RUN mkdir book_storage
COPY ./src ./src
RUN npm run build
RUN cp -R ./dist/** .

CMD ["node", "index.js"]