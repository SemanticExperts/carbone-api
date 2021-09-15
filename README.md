# carbone-api
Express API made to communicate easily with CarboneIO https://carbone.io

## In order to start the dock localy
docker build -t carbone-api .
docker run --rm  --network=jaguards-v6_default -p 8083:8083 --name carbone-api carbone-api

Then from Jaguards configure the EXTENDED_PDF_GENERATOR_SERVER_CONFIG like that:
{
  "serverUrl": "http://carbone-api:8083"
}


## In order to update the docker hub image use:
docker push semanticexperts/carbone-api
