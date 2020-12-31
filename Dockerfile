#base image
#inlcudes java and node

FROM timbru31/java-node

#set working directory
WORKDIR /app

COPY node_modules /app/node_modules/

COPY build /app/build/
COPY server.js /app/server.js

ENV PORT 3000

EXPOSE $PORT

#start app
CMD ["node" , "server.js"]
