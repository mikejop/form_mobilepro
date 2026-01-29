# Estágio de Build
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar arquivos de dependência
COPY package*.json ./

# Instalar todas as dependências (incluindo devDependencies para o build)
RUN npm install

# Copiar o restante do código fonte
COPY . .

# Construir a aplicação React (gera a pasta dist)
RUN npm run build

# Estágio de Produção
FROM node:20-alpine

WORKDIR /app

# Copiar apenas os arquivos necessários para produção
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/server.js ./
COPY --from=builder /app/dist ./dist

# Instalar apenas dependências de produção
RUN npm install --only=production

# Configurar variável de ambiente para porta (Google Cloud Run usa 8080 por padrão)
ENV PORT=8080

# Expor a porta
EXPOSE 8080

# Comando para iniciar o servidor
CMD ["npm", "start"]
