FROM node:14-alpine

RUN mkdir app

WORKDIR /app

COPY ./src /app/src
COPY ./.env /app
COPY ./tsconfig.json /app
COPY ./package.json /app
COPY ./yarn.lock /app

RUN yarn

RUN yarn build
CMD yarn dev