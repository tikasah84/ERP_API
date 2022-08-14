
FROM node:18-alpine 

WORKDIR /src/stock
COPY package*.json /


RUN npm install -g nodemon && npm install
COPY . /


EXPOSE 4001