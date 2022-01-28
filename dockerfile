FROM node:17.3.0-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3033
CMD [ "node","app.js"]