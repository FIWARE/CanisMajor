# build environment
FROM node:8

WORKDIR /app
COPY . /app

RUN npm install

RUN mv src/config/config.json.sample src/config/config.json

EXPOSE 3000

CMD [ "npm", "start" ]