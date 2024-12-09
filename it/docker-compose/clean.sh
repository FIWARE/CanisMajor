#Stop and remove all Docker containers:
docker stop $(sudo docker ps -aq)
docker rm $(sudo docker ps -aq)
docker container prune

#Remove all created volumes:
docker volume rm $(sudo docker volume ls -q)
docker volume prune

#Remove all Docker custom networks:
docker network prune -f

