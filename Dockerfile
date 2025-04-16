FROM node:bookworm-slim

WORKDIR /appjs

COPY package*.json ./
COPY app.ts .

RUN npm install

# Copie o restante dos arquivos do aplicativo para o contêiner
COPY . .

EXPOSE 3000

# Comando para iniciar a aplicação quando o contêiner for executado
CMD ["npm","run", "dev"]