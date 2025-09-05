FROM nginx:alpine
RUN rm -rf /usr/share/nginx/html/*
COPY dashboard.html /usr/share/nginx/html/index.html
COPY admin.html /usr/share/nginx/html/admin.html
COPY css /usr/share/nginx/html/css
COPY js /usr/share/nginx/html/js
COPY images /usr/share/nginx/html/images
COPY favicon.svg /usr/share/nginx/html/favicon.svg
EXPOSE 80
