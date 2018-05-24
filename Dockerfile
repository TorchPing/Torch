FROM node:9.11.1-alpine

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install &&
    npm run build

COPY . .

CMD [ "node", "dist/bin/run.js" ]
