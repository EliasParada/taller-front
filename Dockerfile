# ---------- BUILD STAGE ----------
FROM node:20-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# ---------- PRODUCTION STAGE ----------
FROM nginx:alpine

# Copia build
COPY --from=builder /app/dist /usr/share/nginx/html

# (opcional) limpiar permisos, pero no cambiar usuario
# puedes mantener la imagen tal como está

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
