FROM node:18-alpine
WORKDIR /app
RUN npm install -g npm@9

RUN npm install
RUN npm run build

EXPOSE 80
CMD ["npm", "run", "start"]
