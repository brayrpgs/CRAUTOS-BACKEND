FROM node:22.17

EXPOSE 3000

RUN mkdir -p /home/app

WORKDIR /home/app

COPY . .

RUN npm i

RUN npm run build

CMD [ "npm" ,  "start" ]
