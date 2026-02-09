FROM node:lts-alpine AS build
ARG VITE_APP_ENV=production
ENV VITE_APP_ENV=$VITE_APP_ENV
ENV NPM_CONFIG_UPDATE_NOTIFIER=false
ENV NPM_CONFIG_FUND=false
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . ./
RUN npm run build

FROM caddy:alpine
WORKDIR /app
COPY Caddyfile ./
RUN caddy fmt Caddyfile --overwrite
COPY --from=build /app/dist ./dist
CMD ["caddy", "run", "--config", "Caddyfile", "--adapter", "caddyfile"]
