
FROM node:18

WORKDIR /app


# 2️⃣ Instalar dependencias
RUN npm install


# (NO copies media ni config si no existen)

# 4️⃣ Build
RUN npm run build

# 5️⃣ Puerto
EXPOSE 3000

# 6️⃣ Start
CMD ["node", "-r", "dotenv/config", "packages/evershop/dist/bin/start/index.js"]
