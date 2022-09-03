FROM node:17-alpine

WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY ./src ./src
COPY ./firebase-credentials.json .
COPY .env .env
EXPOSE 4000
CMD [ "npm", "start"]
