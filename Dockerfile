FROM node:14-alpine
LABEL Author Carmine DiMascio <cdimascio@gmail.com>

RUN mkdir -p /usr/src/app
RUN apk update && apk add bash
WORKDIR /usr/src/app


COPY . /usr/src/app
RUN npm install && npm run compile

EXPOSE 3000

# CMD [ "npm", "start" ]

CMD /wait-for-it.sh db:3306 -- npm start
