FROM node:latest

# Create app directory
WORKDIR /app


COPY ["package.json", "package-lock.json", "tsconfig.json", "./"]

RUN npm install

COPY . ./

EXPOSE 2000 

CMD [ "node", "./compiledfiles/server.js" ]