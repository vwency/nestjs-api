FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN yarn install 

COPY . .

RUN npx prisma generate

RUN yarn run build

ENTRYPOINT ["sh", "-c", "npx prisma migrate deploy && npx prisma generate && yarn run start:prod"]
