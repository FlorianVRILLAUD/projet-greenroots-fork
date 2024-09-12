FROM node:20

WORKDIR /usr/src/app

COPY ./package.json ./package-lock.json ./

RUN npm i

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]