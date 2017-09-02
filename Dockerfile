FROM node:latest

RUN npm install nodemon -g

WORKDIR /usr/src/app

COPY app/package.json app/nodemon.json ./

RUN npm install

COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]
