# carbone-api
Express API made to communicate easily with CarboneIO https://carbone.io

## In order to start the dock localy
docker build -t carbone-api .
docker run --rm  -d -p 8083:8083 --name carbone-api carbone-api

## In order to update the docker hub image use:
docker push semanticexperts/carbone-api:latest
