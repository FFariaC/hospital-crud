FROM node:12

WORKDIR /home/apibase

COPY package.json yarn.lock ./

COPY . .

RUN yarn install

CMD yarn start:dev