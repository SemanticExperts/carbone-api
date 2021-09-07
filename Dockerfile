#Based on https://dev.to/steeve/use-carbonejs-into-docker-container-4326
FROM ideolys/carbone-env-docker
ENV DIR /app
WORKDIR ${DIR}

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ${DIR}
RUN npm install
COPY . ${DIR}

CMD [ "node", "server.js" ]
