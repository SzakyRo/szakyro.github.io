---
layout: post
title: "Docker Cheat Sheet for Linux Sysadmins"
date: 2025-10-04
categories: [Cheat Sheet, docker]
tags: [docker, containers, linux]
---

# Docker Cheat Sheet

A quick reference guide for Linux sysadmins managing Docker containers.  

---

## 🔹 Common Container Commands

- **Run a Container**:
  ```bash
  docker run -it ubuntu
  ```
- **Run a Container in Background**:
  ```bash
  docker run -d nginx
  ```
- **List Running Containers**:
  ```bash
  docker ps
  ```
- **List All Containers (including stopped)**:
  ```bash
  docker ps -a
  ```
- **Stop a Container**:
  ```bash
  docker stop <container_id>
  ```
- **Start a Container**:
  ```bash
  docker start <container_id>
  ```
- **Remove a Container**:
  ```bash
  docker rm <container_id>
  ```
- **Remove All Stopped Containers**:
  ```bash
  docker container prune  # Removes all stopped containers to free up space
  ```

---

## 🔹 Docker Images

- **List Images**:
  ```bash
  docker images
  ```
- **Pull an Image**:
  ```bash
  docker pull ubuntu
  ```
- **Build an Image (from Dockerfile)**:
  ```bash
  docker build -t myimage:latest .  # Builds an image from the Dockerfile in the current directory
  ```
- **Remove an Image**:
  ```bash
  docker rmi <image_id>  # Deletes an image by its ID
  ```
- **Remove Unused Images**:
  ```bash
  docker image prune  # Removes dangling images (untagged layers)
  ```

---

## 🔹 Docker Volumes

- **Create a Volume**:
  ```bash
  docker volume create my_volume  # Creates a named volume for persistent storage
  ```
- **List Volumes**:
  ```bash
  docker volume ls
  ```
- **Inspect a Volume**:
  ```bash
  docker volume inspect my_volume  # Shows detailed information about the volume
  ```
- **Remove a Volume**:
  ```bash
  docker volume rm my_volume  # Deletes a specific volume
  ```
- **Remove Unused Volumes**:
  ```bash
  docker volume prune  # Removes all unused volumes to free up space
  ```

---

## 🔹 Docker Networks

- **List Networks**:
  ```bash
  docker network ls
  ```
- **Create a Network**:
  ```bash
  docker network create my_network  # Creates a custom bridge network
  ```
- **Connect a Container to a Network**:
  ```bash
  docker network connect my_network <container_id>  # Adds a container to a specific network
  ```
- **Disconnect a Container from a Network**:
  ```bash
  docker network disconnect my_network <container_id>  # Removes a container from a specific network
  ```
- **Remove Unused Networks**:
  ```bash
  docker network prune  # Deletes all unused networks
  ```

---

## 🔹 Exec & Logs

- **Exec into a Running Container**:
  ```bash
  docker exec -it <container_id> /bin/bash  # Opens an interactive bash shell inside the container
  ```
- **Check Logs**:
  ```bash
  docker logs <container_id>  # Displays logs from the container
  docker logs -f <container_id>   # Streams logs in real-time
  ```
- **Check Resource Usage**:
  ```bash
  docker stats  # Shows real-time resource usage statistics for running containers
  ```

---

## 🔹 Docker Compose

- **Start Services**:
  ```bash
  docker-compose up -d  # Starts all services defined in the docker-compose.yml file in detached mode
  ```
- **Stop Services**:
  ```bash
  docker-compose down  # Stops and removes all services and networks defined in the Compose file
  ```
- **View Logs**:
  ```bash
  docker-compose logs -f  # Streams logs from all services in real-time
  ```
- **Rebuild and Restart**:
  ```bash
  docker-compose up -d --build  # Rebuilds images and restarts services
  ```

---

## 🔹 Docker Compose Options

Docker Compose uses a `docker-compose.yml` file to define and run multi-container Docker applications. Below are the key options with explanations and examples:

### **Version**
Specifies the Compose file format version.
```yaml
version: '3.8'
```

### **Services**
Defines the containers to be run.
```yaml
services:
  web:
    image: nginx
    ports:
      - "80:80"
```

### **Build**
Specifies build context and Dockerfile.
```yaml
build:
  context: ./app  # Path to the directory containing the Dockerfile
  dockerfile: Dockerfile  # Name of the Dockerfile (optional if named 'Dockerfile')
```

### **Ports**
Maps container ports to host ports. Format: `hostport:containerport`.
```yaml
ports:
  - "8080:80"  # Maps port 8080 on the host to port 80 in the container
```

### **Volumes**
Mounts host directories or volumes into containers. Format: `hostpath:containerpath`.
```yaml
volumes:
  - ./data:/data  # Mounts the ./data directory on the host to /data in the container
```

### **Environment**
Defines environment variables for the container.
```yaml
environment:
  - NODE_ENV=production  # Sets the NODE_ENV variable to 'production'
```

### **Networks**
Specifies custom networks for inter-container communication.
```yaml
networks:
  my_network:
    driver: bridge  # Creates a bridge network named 'my_network'
```

### **Depends_on**
Specifies service dependencies. Ensures a service starts only after its dependencies are started.
```yaml
depends_on:
  - db  # Ensures the 'db' service starts before this service
```

### **Restart**
Defines restart policies for containers.
```yaml
restart: always  # Always restart the container if it stops
```

### **Command**
Overrides the default command specified in the image.
```yaml
command: ["npm", "start"]  # Runs 'npm start' instead of the default command
```

### **Healthcheck**
Defines health checks for a service to monitor its status.
```yaml
healthcheck:
  test: ["CMD", "curl", "-f", "http://localhost"]  # Runs a curl command to check health
  interval: 1m30s  # Time between health checks
  timeout: 10s     # Time to wait for a health check to complete
  retries: 3       # Number of retries before marking as unhealthy
```

---

## 🔹 Quick Recovery & Troubleshooting

### 🟢 Container Won’t Start

- **Check logs**:
  ```bash
  docker logs <container_id>
  ```
- **Inspect container**:
  ```bash
  docker inspect <container_id>
  ```

### 🟡 Image Issues

- **Remove broken images**:
  ```bash
  docker rmi <image_id>
  ```
- **Clean everything unused**:
  ```bash
  docker system prune -a
  ```

### 🟠 Network Connectivity Issues

- **Inspect container network**:
  ```bash
  docker inspect <container_id> | grep IPAddress
  ```
- **Restart Docker service**:
  ```bash
  systemctl restart docker
  ```

### 🔴 Out of Disk Space

- **Check disk usage**:
  ```bash
  docker system df
  ```
- **Remove unused objects**:
  ```bash
  docker system prune -a --volumes
  ```

---

## 🔹 Docker Tuning & Cleanup Flags

| Command                     | Purpose                                                                 |
|-----------------------------|-------------------------------------------------------------------------|
| `docker system prune`       | Remove stopped containers, unused networks, dangling images.            |
| `docker system prune -a`    | Also removes unused images (not just dangling).                         |
| `docker builder prune`      | Clean up build cache.                                                   |
| `docker image prune -a`     | Remove unused and dangling images.                                      |
| `docker volume prune`       | Remove unused volumes.                                                  |
| `docker network prune`      | Remove unused networks.                                                 |

⚠️ **Tip**: Use these regularly on dev/test systems to free up space. On production, prune carefully!

---

## 🔹 Security & Hardening

- **Run as Non-Root User (inside Dockerfile)**:
  ```dockerfile
  RUN useradd -m appuser
  USER appuser
  ```
- **Limit Container Resources**:
  ```bash
  docker run -d --cpus="2" --memory="2g" nginx  # Restricts CPU and memory usage for the container
  ```
- **Drop Unnecessary Linux Capabilities**:
  ```bash
  docker run -d --cap-drop=ALL --cap-add=NET_BIND_SERVICE nginx  # Drops all capabilities except NET_BIND_SERVICE
  ```
- **Read-Only Filesystem**:
  ```bash
  docker run -d --read-only nginx  # Makes the container's filesystem read-only
  ```
- **Disable Privileged Mode** (avoid `--privileged` unless absolutely required).
- **Use Docker Bench Security**:
  ```bash
  docker run -it --net host --pid host --cap-add audit_control \
    -v /var/lib:/var/lib -v /var/run/docker.sock:/var/run/docker.sock \
    docker/docker-bench-security  # Runs Docker Bench Security to check for security best practices
  ```
- **Scan Images for Vulnerabilities**:
  ```bash
  docker scan <image>  # Scans the image for known vulnerabilities
  ```
- **Enable Content Trust (sign/verify images)**:
  ```bash
  export DOCKER_CONTENT_TRUST=1  # Enables Docker Content Trust for image signing and verification
  ```
- **Keep Docker Daemon Rootless (where supported)**:
  ```bash
  dockerd-rootless-setuptool.sh install  # Sets up the Docker daemon to run in rootless mode
  ```

---

## 🔹 Legend (Docker Terminology)

- **Image** – A template used to create containers. Think of it like a snapshot.
- **Container** – A running instance of an image. Isolated environment with its own process tree.
- **Volume** – Persistent storage for containers, survives restarts/deletions.
- **Network** – Virtual network to connect containers together.
- **Dockerfile** – Text file with instructions to build an image.
- **docker-compose.yml** – Defines and runs multi-container Docker applications.
- **Dangling Image** – An untagged image layer, usually from interrupted builds.
- **Bind Mount** – Mount a host directory into a container (`-v /host:/container`).
- **OverlayFS** – Default storage driver for Docker on most Linux distros.

---

## 🔹 Best Practices

- Use `docker-compose` for multi-container setups.
- Tag images with versions (`myapp:1.0`) instead of `latest` for reproducibility.
- Regularly prune unused containers, images, and volumes:
  ```bash
  docker system prune -a --volumes
  ```
- Store `Dockerfiles` and `docker-compose.yml` in Git for version control.
- Use healthchecks in Dockerfiles or Compose to monitor container health.
- Limit container resources in production:
  ```bash
  docker run -d --cpus="2" --memory="2g" nginx
  ```
- Avoid running privileged containers unless absolutely required.
- Automate vulnerability scans and patching pipelines.

