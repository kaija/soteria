FROM node:8.9.4-alpine

WORKDIR /usr/src/app

COPY package*.json ./


RUN apk add --update \
	python \
	python-dev \
	build-base \
	&& rm -rf /var/cache/apk/* \
	&& npm install \
	&& apk del python python-dev build-base

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
