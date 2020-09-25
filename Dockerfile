FROM node:alpine

WORKDIR /app

COPY package.json /app

RUN yarn install

COPY ./app /app

CMD ["yarn", "run", "start"]
