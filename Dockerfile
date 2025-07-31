FROM node:22-alpine AS development

WORKDIR /code

# Instalar dependencias SSL para Alpine 3.21+
RUN apk add --no-cache openssl libc6-compat

COPY package*.json ./
COPY prisma ./prisma

RUN npm install

COPY . .

RUN npx prisma generate
RUN npm run build

FROM node:22-alpine AS prod
WORKDIR /code

# Instalar dependencias SSL para Alpine 3.21+
RUN apk add --no-cache openssl libc6-compat

COPY package*.json ./
COPY prisma ./prisma

RUN npm install --only=production

COPY --from=development /code/dist ./dist
COPY --from=development /code/prisma ./prisma

RUN npx prisma generate

ENV TZ=America/La_Paz
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

CMD npx prisma migrate deploy && node dist/index.js