#!/bin/bash

op inject -i "./.env.1p" -o "./.env" -f
printf "Environment variables injected into .env file.\n"
