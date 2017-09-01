FROM node:latest

RUN npm install nodemon -g

WORKDIR /usr/src/app

copy app/package.json .

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]
