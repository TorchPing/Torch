FROM node:9.11.1-alpine

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "node", "dist/bin/run.js" ]
