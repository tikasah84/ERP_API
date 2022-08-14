
FROM node:18-alpine 

WORKDIR /src/user
COPY package*.json /


RUN npm install -g nodemon && npm install
COPY . /


EXPOSE 4000