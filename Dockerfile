FROM node:16.15.0-alpine
RUN apk add tzdata

WORKDIR /app
COPY . .

RUN npm install
RUN npm run build 

ENV NODE_ENV=production
ENV SERVER_HOST=0.0.0.0
ENV SERVER_PORT=8090

EXPOSE 8090
CMD [ "npm", "start" ]