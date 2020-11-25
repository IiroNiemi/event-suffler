FROM node:12.16.2

# RUN apk add --update curl \
#     && rm -rf /var/cache/apk/*

ADD package.json package.json

RUN npm install --production

ADD . .

EXPOSE 3000

ENTRYPOINT ["npm", "start"]
