FROM registry.access.redhat.com/ubi8/nodejs-14:1-53 as builder

ARG NODE_ENV_ARG=production

# Set node mode
ENV NODE_ENV=${NODE_ENV_ARG}

COPY . .

RUN mkdir node_modules

RUN npm ci --only=production
RUN npm run build

FROM registry.access.redhat.com/ubi8/nodejs-14:1-53

COPY --from=builder /opt/app-root/src /opt/app-root/src
COPY --from=builder /opt/app-root/src/LICENSE /licenses/LICENSE

ENV CM_PORT="4000"
ENV DB_HOST="localhost"
ENV DB_NAME="cm"
ENV DB_DILECT="mysql"
ENV TRANSCTION_TIMEOUT=1000


EXPOSE ${CM_PORT:-4000}

CMD ["npm", "start"]