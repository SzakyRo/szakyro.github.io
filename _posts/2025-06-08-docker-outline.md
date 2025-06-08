---
layout: post
title: How to set up Outline using Docker
date: 2025-06-08 18:00:00 +0300
categories: [Docker,outline]
tags: [docker, outline] # TAG names
---


# Outline Wiki: Self-Hosted Knowledge Base with Slack Integration

![Wallpaper](/assets/img/Outline/wallpaper.png)

## What is Outline?

Outline is a modern team knowledge base and wiki that helps teams share knowledge, stay in sync, and collaborate effectively. It's an open-source alternative to platforms like Notion, focused purely on documentation and internal wikis.

---

### Features

- **Modern editing experience** with markdown and slash commands.
- **Integration-ready**: Slack, Figma, Loom, and others.
- **Internationalization**: 17 languages, RTL support.
- **Open Source**: Self-host and own your data.
- **Real-time Collaboration**: Seamless editing by multiple users.
- **Dark Mode** for comfortable viewing.
- **Fine-grained Access Control** for team management.

---
### Prerequisites
* Linux VM where you can host the application
* Docker and Dockge installed.
* Slack (used for authentification)

---

### Installing Docker

Follow the official Docker install guide for Ubuntu:
<https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository>

```bash
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo   "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu   $(. /etc/os-release && echo "$VERSION_CODENAME") stable" |   sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

### Install the docker packages:
```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```


### Installing Dockge

```bash
mkdir -p /opt/stacks /opt/dockge
cd /opt/dockge
curl https://raw.githubusercontent.com/louislam/dockge/master/compose.yaml --output compose.yaml
docker compose up -d
```

The default port in the YAML file is 5001 but you can change it if you want with any other port. (I'm using the default 5001 port)

![Dockge installed](/assets/img/Outline/dockgeinstalled.png)

Example Dockge compose.yaml:

```yaml
version: "3.8"
services:
  dockge:
    image: louislam/dockge:1
    restart: unless-stopped
    ports:
      - 5001:5001
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
      - ./data:/app/data
      - /opt/stacks:/opt/stacks
    environment:
      - DOCKGE_STACKS_DIR=/opt/stacks
```

---

### Setting up Slack App for Authentication

1. Go to <https://api.slack.com/apps> → Create App.
    - ![Slack app info](/assets/img/Outline/slackappinfo.png)
2. Configure **OAuth & Permissions**:
    - **Redirect URL**: `https://yourdomain.com/auth/slack.callback`
    - **Scopes**:
        - `identity.avatar`
        - `identity.basic`
        - `identity.email`
        - `identity.team`        
        ![Slack app permissions](/assets/img/Outline/slackoauthpermisions.png)
3. Add a **Slash Command**:
    - `/outline`
    - URL: `https://outline.yourdomain.com/api/hooks.slack`
    ![Slack app slash commands](/assets/img/Outline/slackslashcommands.png)
4. Enable **Interactivity**:
    - URL: `https://outline.yourdomain.com/api/hooks.interactive`
    - ![Slack app interactivity](/assets/img/Outline/slackinteractivity.png)
5. Install the app and note the `App ID` and `Verification Token`
    - Install app
    - ![Slack app install](/assets/img/Outline/slackinstallapp.png)
6. Visit the Basic Information page from the left sidebar and copy App ID and Verification Token values for the slack app integration. We will need them later.
    - ![Slack app basic info](/assets/img/Outline/slackappinfo.png)
---

### Compose File for Outline

```yaml
version: "3.8"
services:
  https-portal:
    image: steveltn/https-portal
    ports:
      - 80:80
      - 443:443
    links:
      - outline
    restart: always
    volumes:
      - https-portal-data:/var/lib/https-portal
    environment:
      DOMAINS: "outline.yourdomain.com -> http://outline:3000"
      STAGE: production
      WEBSOCKET: "true"
      CLIENT_MAX_BODY_SIZE: "0"

  outline:
    image: docker.getoutline.com/outlinewiki/outline:latest
    ports:
      - 3000:3000
    volumes:
      - ./storage-data:/var/lib/outline/data
    depends_on:
      - postgres
      - redis
    environment:
      PGSSLMODE: disable
      SECRET_KEY: ${SECRET_KEY}
      UTILS_SECRET: ${UTILS_SECRET}
      DATABASE_URL: postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${SERVER_IP}:5432/${POSTGRES_DB}
      REDIS_URL: redis://${SERVER_IP}:6379
      URL: ${URL}
      PORT: ${PORT}
      FILE_STORAGE: local
      FILE_STORAGE_LOCAL_ROOT_DIR: /var/lib/outline/data
      FILE_STORAGE_UPLOAD_MAX_SIZE: 26214400
      SLACK_CLIENT_ID: ${SLACK_CLIENT_ID}
      SLACK_CLIENT_SECRET: ${SLACK_CLIENT_SECRET}
    restart: unless-stopped

  redis:
    image: redis
    ports:
      - 6379:6379
    volumes:
      - ./redis.conf:/redis.conf
    command: ["redis-server", "/redis.conf"]
    restart: unless-stopped

  postgres:
    image: postgres
    ports:
      - 5432:5432
    volumes:
      - ./database-data:/var/lib/postgresql/data
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    restart: unless-stopped

volumes:
  https-portal-data:
```

---

### .env File Example

```env
SERVER_IP=your_hosting_server_ip
POSTGRES_USER=user
POSTGRES_PASSWORD=pass
POSTGRES_DB=outline
SECRET_KEY=$(openssl rand -hex 32)
UTILS_SECRET=$(openssl rand -hex 32)
URL=https://outline.yourdomain.com
PORT=3000
SLACK_CLIENT_ID=your_slack_client_id
SLACK_CLIENT_SECRET=your_slack_client_secret
```

In here you see you have:

* SERVER_IP which is the public IP of the server, I couldn’t make this work with the localhost you can try.
* Postgres users and passwords
* secrets for outline which are generated with: openssl rand -hex 32
* URL and Port - here you will use what you like for your application
* Slack Details - the Client ID and Client Secret generated earlier need to be added here.

![Dockge GUI](/assets/img/Outline/dockgegui.png)

> Replace values accordingly. Use actual IP/domain for SERVER_IP. Generate secrets using `openssl rand -hex 32`.

---

### DNS and Port Forwarding

- Forward ports 443 and 80 on your router.
- Set an A record in your domain’s DNS to your VM's IP address.

---

### Launch Stack

1. Use Dockge UI to deploy the stack.
2. Complete the `.env` file in the Dockge GUI.
3. Deploy the stack.
4. Check containers using:

```bash
sudo docker ps -a
```

If you want to add images you will need to use the following commands to give permisions to the nodejs user:

```bash
cd /opt/stacks/outline
chown 1001 ./storage-data
```

---
## Worth mentioning
1. You need to have port forwarding for the VM.
2. You need to have an A record pointing at your VM from your DNS.

And that’s about it, now you can use outline, test it and see how it works.

---

### Resources

- Outline Docs: <https://docs.getoutline.com/s/hosting/doc/docker-7pfeLP5a8t>
