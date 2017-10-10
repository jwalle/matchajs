FROM node:latest

WORKDIR /usr/src/app

RUN npm install bower -g

RUN npm install

RUN bower install --allow-root

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
