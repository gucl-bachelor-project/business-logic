FROM node:13-alpine

WORKDIR /usr/src/app

# Client
WORKDIR /usr/src/app/client/build
COPY ./client/build/ ./

# Server
WORKDIR /usr/src/app/server
COPY ./server/package*.json ./

RUN npm install

COPY ./server .

EXPOSE 8080
