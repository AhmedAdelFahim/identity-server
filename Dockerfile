FROM node:14-alpine
WORKDIR /app
COPY . /app
RUN ls -alh
RUN pwd
RUN npm ci --production

EXPOSE 9000

CMD [ "node", "./src/index.js" ]