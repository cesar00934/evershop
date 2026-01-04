FROM node:18

WORKDIR /app

COPY . .

# 👇 INYECTAR DATABASE_URL EN BUILD
ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL

#ENV NODE_ENV=production

RUN npm install --workspaces --include-workspace-root
RUN npm run compile && npm run compile:db

EXPOSE 3000

CMD ["node", "packages/evershop/dist/bin/start/index.js"]
