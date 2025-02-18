FROM node:20-alpine

RUN mkdir -p /app/node_modules && chown -R node:node /app

WORKDIR /app

USER node


COPY package*.json ./

RUN yarn install

COPY --chown=node:node . .

RUN yarn global add typescript

EXPOSE 3091

CMD ["yarn", "dev"]