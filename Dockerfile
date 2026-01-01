FROM node:current-alpine
ENV NODE_ENV=development
WORKDIR /app
COPY package.json ./

RUN npm ci
RUN npm i -g @nestjs/cli
EXPOSE 3000
CMD ["npm", "run", "start:dev"]