# build environment (still under development)
FROM node:12.13.0-alpine
WORKDIR /app
COPY . /app
RUN npm install
EXPOSE 3000
CMD [ "npm", "start" ]
HEALTHCHECK  --interval=30s --timeout=3s --start-period=60s \
  CMD ["npm", "healthcheck"]