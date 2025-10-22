FROM node:22.17-alpine

EXPOSE 3000

WORKDIR /home/app

COPY package*.json .

#ci --omit=dev
RUN npm  i 

COPY . .

RUN npm run build

CMD [ "npm" ,  "start" ]
