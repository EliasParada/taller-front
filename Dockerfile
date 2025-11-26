# ---------- BUILD STAGE ----------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# ---------- PRODUCTION STAGE ----------
FROM nginx:alpine

# Crear usuario y grupo no root
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copiar build
COPY --from=builder /app/dist /usr/share/nginx/html

# Cambiar propietario de los archivos
RUN chown -R appuser:appgroup /usr/share/nginx/html

# Configurar permisos si usas tmp u otros directorios (opcional)
RUN mkdir -p /var/cache/nginx /var/run /var/log/nginx \
    && chown -R appuser:appgroup /var/cache/nginx /var/run /var/log/nginx

# Cambiar a usuario no root
USER appuser

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
