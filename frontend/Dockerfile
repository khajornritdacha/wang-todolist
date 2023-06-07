FROM node:18-alpine AS pnpm
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
RUN apk update

ENV PNPM_HOME="/root/.local/share/pnpm"
ENV PATH="${PATH}:${PNPM_HOME}"
RUN npm install -g pnpm

#----------------------------------------------------------------------

FROM pnpm AS builder

WORKDIR /app

COPY "./package*.json" ./

RUN pnpm install

COPY . .

RUN pnpm run build

#----------------------------------------------------------------------

FROM nginx:latest

WORKDIR /app

COPY --from=builder /app/dist /var/www
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
