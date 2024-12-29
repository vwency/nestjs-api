FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN yarn install 

COPY . .

RUN npx prisma generate

RUN yarn run build

ENTRYPOINT ["sh", "-c", "npx prisma migrate deploy && yarn run start:prod"]
