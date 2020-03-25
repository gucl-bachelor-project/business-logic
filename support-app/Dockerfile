FROM node:13-alpine
ARG SERVER_NAME
ENV SERVER_NAME ${SERVER_NAME}

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm ci --only=production

COPY ./src ./src

EXPOSE 8080
CMD npm start ${SERVER_NAME}
