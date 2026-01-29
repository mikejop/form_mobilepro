# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar todo o código
COPY . .

# Build da aplicação (detecta automaticamente Vite ou CRA)
RUN npm run build

# Production stage
FROM nginx:alpine

# Remover configuração padrão do nginx
RUN rm /etc/nginx/conf.d/default.conf

# Criar configuração customizada
RUN echo 'server { \
    listen 8080; \
    server_name _; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { \
        try_files $uri $uri/ /index.html; \
    } \
    location /api/ { \
        proxy_pass http://backend:8080/; \
    } \
}' > /etc/nginx/conf.d/default.conf

# Copiar build para nginx
COPY --from=build /app/dist /usr/share/nginx/html 2>/dev/null || \
     COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
EOF
