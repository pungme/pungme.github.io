FROM nginx:stable-alpine-slim

RUN rm -rf /usr/share/nginx/html/*
ADD . /usr/share/nginx/html
COPY .deploy/nginx.conf /etc/nginx/templates/default.conf.template
RUN rm -rf /usr/share/nginx/html/.deploy

EXPOSE 80
