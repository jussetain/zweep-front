FROM oven/bun:latest as build

WORKDIR /app
COPY package*.json ./
RUN bun install

COPY . .

RUN bun run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/default.conf /etc/nginx/conf.d
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
