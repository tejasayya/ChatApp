# Stage 1

FROM node:20 as build
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

#stage 2: server react app

FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/ngnix/html
EXPOSE 80
CMD ["ngnix", "-g", "daemon off;"]


