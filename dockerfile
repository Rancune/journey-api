FROM node:20-alpine

WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --omit=dev
COPY ./src ./src
# Secrets (.env, Firebase credentials) are NOT baked into the image:
# they are injected at runtime via env_file / volume (see docker-compose.yml).
USER node
EXPOSE 4000
CMD [ "npm", "start"]
