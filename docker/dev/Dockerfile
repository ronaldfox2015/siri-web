FROM node:20-alpine
RUN apk update && \
    apk upgrade && \
    apk add --no-cache git

RUN apk add --no-cache xdg-utils

ENV TZ=America/Lima
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN mkdir -p /app

ONBUILD ADD app /app

WORKDIR /app
RUN npm install -g @angular/cli

# Configurar la variable de entorno para usar el modo de sondeo
ENV CHOKIDAR_USEPOLLING=true
#
EXPOSE 80
EXPOSE 9229
