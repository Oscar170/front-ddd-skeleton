FROM node:gallium-alpine

WORKDIR /app
EXPOSE 3000

COPY package.json ./
COPY package-lock.json ./

RUN npm ci
RUN npm i @swc/core-linux-musl

COPY . ./

RUN npm run build