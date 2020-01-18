#base image
FROM node:12.2.0-alpine
MAINTAINER Kimame Davis "daviskimame87@gmail.com"

#set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

#install and cache all dependencies
COPY package.json /app/package.json
RUN npm install --silent
#start app
CMD ["npm", "start"]
