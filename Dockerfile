FROM node:9-slim
WORKDIR /app
COPY package.json /app
RUN npm install
RUN npm install express
RUN npm install mysql
COPY . /app
CMD ["npm","start"]
EXPOSE 3000