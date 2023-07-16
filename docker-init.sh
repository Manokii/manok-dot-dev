#!/bin/bash

export APP_ENV=$1
op inject -i "./docker-compose.yml.tpl" -o "./docker-compose.yml" -f && \
printf "Successfully created $APP_ENV docker-compose.yml file.\n" && \
sudo docker-compose up -d
