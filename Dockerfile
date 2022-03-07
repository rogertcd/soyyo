FROM node:16-alpine
WORKDIR /home/rogert/app
COPY package*.json ./
RUN npm install
EXPOSE 5000
COPY . .
CMD [ "node", "app.js" ]