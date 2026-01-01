FROM node:18

WORKDIR /app

# copiar package.json y package-lock.json (si existe) ANTES de instalar
COPY package*.json ./

# instalar dependencias
RUN npm install

# copiar el resto del proyecto
COPY . .

# construir (si tu proyecto tiene script build/compile)
RUN npm run compile && npm run compile:db

EXPOSE 3000

CMD ["node", "-r", "dotenv/config", "packages/evershop/dist/bin/start/index.js"]
