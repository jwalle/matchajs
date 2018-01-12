#!/usr/bin/env bash

if [ "$(uname)" == "Darwin" ]; then
	mkdir /goinfre/Virtualbox\ VMs
	mkdir /goinfre/.docker
	ln -s /goinfre/.docker ~/.docker
	ln -s /goinfre/Virtualbox\ VMs ~/Virtualbox\ VMs
	docker-machine create default --driver virtualbox
	docker-machine start
	docker-machine env
	eval $(docker-machine env)
	docker-compose build
	docker-compose up
elif ["$(expr substr $(uname -s) 1 5)" == "Linux" ]; then
	echo "Linux"
elif ["$(expr substr $(uname -s) 1 10)" == "MINGW32_NT" || "MINGW64_NT" ]; then
	echo "windows"
fi


# Arch : systemctl start docker.service
