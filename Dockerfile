#base image
#inlcudes java and node

FROM timbru31/java-node

#set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

COPY . .

#install and cache all dependencies
COPY package.json /app/package.json
RUN npm i --unsafe-perm

#start app
CMD ["npm", "start"]
