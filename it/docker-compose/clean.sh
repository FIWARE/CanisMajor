#!/bin/bash

# Function to delete Docker Compose resources (containers, volumes, and networks)
clean_the_docker_compose() {
    echo "Cleaning up Docker Compose resources..."
    sudo docker compose -f docker-compose-env.yaml -f docker-compose-java.yaml down -v
    echo "Docker Compose resources cleaned up."
}

# Function to delete all Docker resources
delete_all() {
    echo "Removing all docker resources from the machine..."
    sudo docker stop $(docker ps -aq) # Stop all running containers
    sudo docker rm $(docker ps -aq) # Remove all containers
    sudo docker volume rm $(docker volume ls -q) # Remove all volumes
    sudo docker network prune -f # Remove all networks
    echo "All Docker resources deleted."
}

# Prompt the user for their choice
echo "Select an option:"
echo "1) Clean the docker compose"
echo "2) Remove all docker resources from the machine"
read -p "Enter your choice (1 or 2): " choice

# Execute the corresponding function based on user input
case $choice in
    1)
        clean_the_docker_compose
        ;;
    2)
        delete_all
        ;;
    *)
        echo "Invalid choice. Please enter 1 or 2."
        ;;
esac

