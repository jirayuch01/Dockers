FROM node:8
RUN apt-get update
RUN apt-get install -y git nodejs nodejs-legacy npm 
COPY package.json src/
RUN cd src && npm install
COPY . src/
WORKDIR src/
CMD ["npm", "start"]