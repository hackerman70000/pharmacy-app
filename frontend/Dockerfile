FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8081

ARG EXPO_PUBLIC_API_URL

ENV EXPO_PUBLIC_API_URL $EXPO_PUBLIC_API_URL

RUN npm install -g expo-cli

CMD ["npx", "expo", "start", "-c"]
