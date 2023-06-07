FROM node:lts-alpine3.18

WORKDIR /app

COPY . .

RUN npm install && npm run build

CMD ["npm", "start"]


