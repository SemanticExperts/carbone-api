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
just commit to dev branch and check action on https://github.com/SemanticExperts/carbone-api/actions


## In order to install it on dev server:
docker stop carbone-api
docker pull semanticexperts/carbone-api
sudo docker run --rm  --network host --name carbone-api semanticexperts/carbone-api
