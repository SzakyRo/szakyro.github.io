---
layout: post
title: "Zero-Downtime Nginx Load Balancing Between Web Servers"
date: 2025-10-26
categories: [linux, nginx, devops, sysadmin]
tags: [nginx, load-balancing, zero-downtime, linux, tutorial]
description: "Learn how to configure Nginx as a load balancer for multiple web servers with zero downtime updates using health checks and rolling restarts."
---

# Zero-Downtime Nginx Load Balancing Between Web Servers

In this tutorial, you’ll learn how to set up an **Nginx load balancer** that distributes traffic between two backend web servers — with **zero downtime** during updates or restarts.

This is a must-have setup for sysadmins, DevOps engineers, or anyone managing high-availability web infrastructure.

---

## Overview & Architecture

We’ll build a simple environment with:

- **nginx-lb** — the load balancer  
- **web1** and **web2** — backend servers  

Nginx will distribute incoming requests between the two web servers using the **round-robin** method.  
To achieve **zero downtime**, we’ll use Nginx’s built-in health checks and perform rolling restarts of backend servers.

### Architecture Diagram

```text
    +-------------+
    |   Client    |
    +------+------+ 
           |
           v
    +------Nginx------+
    |   Load Balancer |
    +-------+---------+
            |
    +-------+-------+
    |               |
+----v----+   +----v----+
|  web1   |   |  web2   |
+---------+   +---------+
```

---

## Environment Setup

You can follow along using **three Linux VMs**, or easily simulate it with **Docker Compose**.

### Prerequisites

- Nginx installed on all machines (`apt install nginx -y`)
- Basic understanding of Linux networking and systemd
- Optional: Docker + Docker Compose

### Example Docker Setup

```yaml
version: '3'
services:
  web1:
    image: nginx
    volumes:
      - ./web1:/usr/share/nginx/html

  web2:
    image: nginx
    volumes:
      - ./web2:/usr/share/nginx/html

  lb:
    image: nginx
    ports:
      - "8080:80"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
```

Create two simple HTML pages to identify each backend:

```bash
mkdir -p web1 web2
echo "Response from web1" > web1/index.html
echo "Response from web2" > web2/index.html
```

---

## Nginx Load Balancer Configuration

Create a file named `nginx.conf` in your project directory:

```nginx
events {}

http {
    upstream backend {
        server web1:80;
        server web2:80;
    }

    server {
        listen 80;

        location / {
            proxy_pass http://backend;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
        }
    }
}
```

### Configuration Explained

- `upstream backend` defines the list of backend servers.
- `proxy_pass` forwards incoming requests to that upstream group.
- `proxy_set_header` preserves client information for logging and debugging.

Run the environment:

```bash
docker compose up -d
```

Now visit:  
 **http://localhost:8080**

You should see alternating responses from `web1` and `web2`.

---

## Zero-Downtime Deployment Strategy

Let’s simulate a deployment with no user-visible downtime.

### Step 1 — Stop one server

```bash
docker stop nginx-lb-web1-1
```

### Step 2 — Update it

```bash
echo "New version from web1" > web1/index.html
docker start nginx-lb-web1-1
```

During this time, traffic continues flowing to `web2`.

### Step 3 — Repeat for the other server

Perform the same for `web2`.

---

## Add Health Checks

To make Nginx automatically skip unhealthy servers, modify your `upstream` block:

```nginx
upstream backend {
    server web1:80 max_fails=3 fail_timeout=30s;
    server web2:80 max_fails=3 fail_timeout=30s;
}
```

Now, if a backend becomes unreachable, Nginx will temporarily remove it from rotation.

---

## Bonus Features

### Sticky Sessions

Keep a user’s session tied to a specific backend:

```nginx
upstream backend {
    ip_hash;
    server web1:80;
    server web2:80;
}
```

### SSL Termination (Optional)

You can terminate HTTPS at the load balancer:

```nginx
server {
    listen 443 ssl;
    ssl_certificate /etc/ssl/certs/lb.crt;
    ssl_certificate_key /etc/ssl/private/lb.key;

    location / {
        proxy_pass http://backend;
    }
}
```

### Hot Reload Nginx Without Downtime

After editing configuration files:

```bash
nginx -t && nginx -s reload
```

This validates and reloads the configuration without interrupting live connections.

---

## 🧪 Testing

Test the load balancing in action:

```bash
watch -n1 curl -s http://localhost:8080
```

You should see alternating responses:

```text
Response from web1
Response from web2
Response from web1
...
```

Now stop one backend and confirm that requests continue to flow seamlessly to the remaining one.