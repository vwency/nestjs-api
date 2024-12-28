FROM node:alpine

WORKDIR /app

COPY package*.json ./

RUN yarn install 

COPY . .

RUN npx prisma generate

RUN yarn run build

ENTRYPOINT ["yarn", "run", "start:prod"]
