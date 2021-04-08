FROM node:14-alpine

RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

COPY package.json .
RUN npm install

COPY . .

CMD ["npm", "start"]