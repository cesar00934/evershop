
FROM node:18

WORKDIR /app

# 1️⃣ Copiar package.json PRIMERO
COPY package*.json ./

# 2️⃣ Instalar dependencias
RUN npm install

# 3️⃣ Copiar el resto del proyecto
COPY packages ./packages
COPY public ./public
COPY themes ./themes
COPY extensions ./extensions
COPY translations ./translations

# (NO copies media ni config si no existen)

# 4️⃣ Build
RUN npm run build

# 5️⃣ Puerto
EXPOSE 3000

# 6️⃣ Start
CMD ["node", "-r", "dotenv/config", "packages/evershop/dist/bin/start/index.js"]
