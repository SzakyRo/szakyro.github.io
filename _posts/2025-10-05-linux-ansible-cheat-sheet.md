---
layout: post
title: "Ansible Cheat Sheet for Sysadmins"
date: 2025-10-05
categories: [Cheat Sheet, Ansible]
tags: [ansible, automation, sysadmin, devops]
---

# Ansible Cheat Sheet for Sysadmins

A complete reference for **Ansible automation**, including **commands, playbooks, modules, inventory management, vaults, and expert tips**.

---

## 🔹 Ansible Basics

- **Check Ansible Version**:
  ```bash
  ansible --version
  ```
- **Test Connectivity (Ping Module)**:
  ```bash
  ansible all -m ping -i inventory
  ```
  * Replace `inventory` with the path to your inventory file.*
- **Run a Simple Command on Hosts**:
  ```bash
  ansible webservers -a "uptime" -i inventory
  ```
  * Replace `webservers` with the group name defined in your inventory.*
- **Ad-hoc Command with Become**:
  ```bash
  ansible dbservers -m shell -a "systemctl restart mysql" -b -i inventory
  ```
  * Use `-b` to execute commands with elevated privileges.*

---

## 🔹 Inventory

- **Static Inventory Example (hosts.ini)**:
  ```ini
  [webservers]
  web01.example.com
  web02.example.com

  [dbservers]
  db01.example.com

  [all:vars]
  ansible_user=admin
  ansible_ssh_private_key_file=~/.ssh/id_rsa
  ```
- **Dynamic Inventory**:
  Use AWS, GCP, OpenStack via scripts or `--inventory-plugin`.
- **Check which hosts are reachable**:
  ```bash
  ansible all -m ping
  ```

---

## 🔹 Modules (Most Used)

- **Package Management**:
  ```bash
  # Debian/Ubuntu
  ansible web -m apt -a "name=nginx state=latest" -b
  # RHEL/CentOS
  ansible db -m yum -a "name=mariadb-server state=present" -b
  ```
- **Service Management**:
  ```bash
  ansible web -m service -a "name=nginx state=restarted" -b
  ```
- **File & Directory**:
  ```bash
  ansible all -m file -a "path=/tmp/testfile state=touch mode=0644" -b
  ```
- **Copy / Template**:
  ```bash
  ansible all -m copy -a "src=nginx.conf dest=/etc/nginx/nginx.conf" -b
  ansible all -m template -a "src=app.j2 dest=/etc/app/config.conf" -b
  ```
  * Use `template` for Jinja2 templating and dynamic configurations.*
- **Command & Shell**:
  ```bash
  ansible all -m command -a "uptime"
  ansible all -m shell -a "echo $HOSTNAME > /tmp/hostname.txt" -b
  ```
  * Prefer `command` over `shell` for idempotency.*

---

## 🔹 Playbooks

- **Basic Playbook Structure**:
  ```yaml
  ---
  - name: Install and configure webserver
    hosts: webservers
    become: true
    vars:
      http_port: 80
    tasks:
      - name: Install Nginx
        apt:
          name: nginx
          state: latest
      - name: Copy nginx config
        template:
          src: nginx.conf.j2
          dest: /etc/nginx/nginx.conf
      - name: Ensure nginx is running
        service:
          name: nginx
          state: started
          enabled: true
  ```
- **Run Playbook**:
  ```bash
  ansible-playbook -i hosts.ini site.yml
  ```

---

## 🔹 Roles

- **Directory Structure**:
  ```
  roles/
    common/
      tasks/
      handlers/
      templates/
      files/
      vars/
      defaults/
      meta/
  ```
- **Include a Role in Playbook**:
  ```yaml
  roles:
    - common
    - webserver
  ```

---

## 🔹 Variables & Facts

- **Declare Variables**:
  ```yaml
  vars:
    app_port: 8080
    db_name: prod_db
  ```
- **Host-specific Variables**:
  `host_vars/hostname.yml`
- **Group-specific Variables**:
  `group_vars/webservers.yml`
- **Gather Facts**:
  ```yaml
  tasks:
    - debug:
        var: ansible_distribution
  ```
- **Use Variables**:
  ```yaml
  - name: Create folder
    file:
      path: "/opt/{{ app_name }}"
      state: directory
  ```

---

## 🔹 Handlers

- **Notify a Handler**:
  ```yaml
  tasks:
    - name: Copy nginx config
      template:
        src: nginx.conf.j2
        dest: /etc/nginx/nginx.conf
      notify: Restart nginx

  handlers:
    - name: Restart nginx
      service:
        name: nginx
        state: restarted
  ```

---

## 🔹 Vault (Secrets Management)

- **Create Encrypted File**:
  ```bash
  ansible-vault create secrets.yml
  ```
- **Edit Encrypted File**:
  ```bash
  ansible-vault edit secrets.yml
  ```
- **Run Playbook with Vault**:
  ```bash
  ansible-playbook site.yml --ask-vault-pass
  ```

---

## 🔹 Tips & Tricks

- **Preview Changes Before Applying**:
  ```bash
  ansible-playbook site.yml --check --diff
  ```
- **Use Tags to Limit Tasks**:
  ```bash
  ansible-playbook site.yml --tags "nginx,config"
  ```
- **Lint Your Playbooks**:
  ```bash
  ansible-lint site.yml
  ```
- **Debugging**:
  ```yaml
  - debug:
      msg: "Current app_port is {{ app_port }}"
  ```
- **Run Long Tasks Asynchronously**:
  ```yaml
  - name: Run long task asynchronously
    shell: /usr/local/bin/backup.sh
    async: 1800
    poll: 0
  ```

---

## 🔹 Common Commands

- **List All Hosts**:
  ```bash
  ansible all --list-hosts -i hosts.ini
  ```
- **Ping All Hosts**:
  ```bash
  ansible all -m ping
  ```
- **Show Variables**:
  ```bash
  ansible all -m setup | grep ansible_distribution
  ```
- **Limit Playbook to Certain Hosts**:
  ```bash
  ansible-playbook site.yml -l web01
  ```

---

## 🔹 Best Practices

- Always use modules over raw shell commands.
- Maintain idempotent playbooks for reliable automation.
- Use separate environments: dev, staging, production inventories.
- Keep sensitive data encrypted with Vault.
- Test playbooks with `--check` and `--diff` before applying.
- Use roles for modular, reusable code.
- Version control everything.
- Document dependencies, required variables, and vault secrets.