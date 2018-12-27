FROM node:8-alpine
MAINTAINER Séra Bálint <balint.sera@e-vista.hu>

EXPOSE 8080
EXPOSE 3000
EXPOSE 3001

COPY . /opt/app

WORKDIR /opt/app

RUN npm install
CMD npm run prod

