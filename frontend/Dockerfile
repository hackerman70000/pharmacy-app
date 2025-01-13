FROM node:18-alpine

WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

RUN mkdir -p /app/node_modules && \
    mkdir -p /home/appuser/.cache && \
    mkdir -p /home/appuser/.npm && \
    chown -R appuser:appgroup /app && \
    chown -R appuser:appgroup /home/appuser

COPY package*.json ./

RUN npm install -g expo-cli

USER appuser

RUN npm ci

COPY --chown=appuser:appgroup . .

EXPOSE 8081

ARG EXPO_PUBLIC_API_URL
ENV EXPO_PUBLIC_API_URL $EXPO_PUBLIC_API_URL

CMD ["npx", "expo", "start", "-c"]