FROM node:14-alpine

COPY ./ /var/lib/app

WORKDIR /var/lib/app

RUN cd /var/lib/app && npm i

EXPOSE 8080

CMD ["npm", "run", "prod"]
