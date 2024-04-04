# => Build container
FROM node:20-alpine3.18 as builder
WORKDIR /app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .
RUN yarn build

# => Run container
FROM nginx:alpine3.18-slim

# Nginx config
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

# Static build
COPY --from=builder /app/build /usr/share/nginx/html/

# Default port exposure
EXPOSE 80

# Copy .env file and shell script to container
WORKDIR /usr/share/nginx/html


# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]