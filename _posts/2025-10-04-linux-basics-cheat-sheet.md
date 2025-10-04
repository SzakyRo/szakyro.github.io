---
layout: post
title: "Linux Basics Cheat Sheet for Sysadmins"
date: 2025-10-04
categories: [Cheat Sheet, Linux]
tags: [linux, commands, basics]
---

# Linux Basics Cheat Sheet for Sysadmins

A handy reference for day-to-day Linux system administration.  

---

## 🔹 File Management

- **List Files**:
  ```bash
  ls -l  # Long listing format
  ```
- **List Hidden Files**:
  ```bash
  ls -la  # Includes hidden files (those starting with .)
  ```
- **Copy Files**:
  ```bash
  cp source destination  # Copies a file or directory
  ```
- **Move Files / Rename**:
  ```bash
  mv source destination  # Moves or renames a file or directory
  ```
- **Remove Files**:
  ```bash
  rm file  # Deletes a file
  ```
- **Search for Files**:
  ```bash
  find /path -name "filename"  # Searches for a file by name
  ```
- **Search Inside Files**:
  ```bash
  grep "pattern" file  # Searches for a pattern inside a file
  ```

---

## 🔹 User & Group Management

- **Add a User**:
  ```bash
  sudo useradd username  # Adds a new user
  ```
- **Delete a User**:
  ```bash
  sudo userdel username  # Deletes a user
  ```
- **Add a User with Home Directory**:
  ```bash
  sudo useradd -m username  # Creates a home directory for the user
  ```
- **Change Password**:
  ```bash
  passwd username  # Changes the password for a user
  ```
- **Add User to Group**:
  ```bash
  sudo usermod -aG groupname username  # Adds a user to a group
  ```
- **List Groups**:
  ```bash
  groups username  # Lists groups a user belongs to
  ```

---

## 🔹 Process Management

- **List Processes**:
  ```bash
  ps aux  # Displays all running processes
  ```
- **Tree View of Processes**:
  ```bash
  pstree -p  # Shows processes in a tree format
  ```
- **Kill a Process**:
  ```bash
  kill <pid>  # Sends a termination signal to a process
  kill -9 <pid>  # Forcefully kills a process
  ```
- **Monitor System Processes**:
  ```bash
  top  # Displays real-time system processes
  htop  # Interactive process viewer (if installed)
  ```
- **Check Resource Usage by Process**:
  ```bash
  ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%mem | head  # Sorts processes by memory usage
  ```

---

## 🔹 Service & Systemd Management

- **Start a Service**:
  ```bash
  sudo systemctl start service  # Starts a service
  ```
- **Stop a Service**:
  ```bash
  sudo systemctl stop service  # Stops a service
  ```
- **Restart a Service**:
  ```bash
  sudo systemctl restart service  # Restarts a service
  ```
- **Enable Service at Boot**:
  ```bash
  sudo systemctl enable service  # Enables a service to start at boot
  ```
- **Check Service Status**:
  ```bash
  sudo systemctl status service  # Displays the status of a service
  ```
- **List Failed Services**:
  ```bash
  systemctl --failed  # Lists all failed services
  ```

---

## 🔹 Disk & Storage Management

- **Check Disk Usage**:
  ```bash
  df -h  # Displays disk usage in human-readable format
  ```
- **Check Directory Size**:
  ```bash
  du -sh /path/to/directory  # Displays the size of a directory
  ```
- **List Block Devices**:
  ```bash
  lsblk  # Lists information about block devices
  ```
- **Check Disk Partitions**:
  ```bash
  fdisk -l  # Lists disk partitions
  ```
- **Mount a Filesystem**:
  ```bash
  sudo mount /dev/sdX1 /mnt  # Mounts a filesystem to /mnt
  ```
- **Unmount a Filesystem**:
  ```bash
  sudo umount /mnt  # Unmounts a filesystem
  ```
- **Check Inodes**:
  ```bash
  df -i  # Displays inode usage
  ```

---

## 🔹 Networking

- **Check IP Address**:
  ```bash
  ip addr show  # Displays network interfaces and IP addresses
  ```
- **Check Default Route**:
  ```bash
  ip route  # Displays the default gateway
  ```
- **Ping a Host**:
  ```bash
  ping -c 4 example.com  # Sends 4 ICMP echo requests to a host
  ```
- **Check Open Ports**:
  ```bash
  ss -tuln  # Displays listening ports
  ```
- **DNS Lookup**:
  ```bash
  dig example.com  # Performs a DNS lookup
  nslookup example.com  # Alternative DNS lookup tool
  ```
- **Check Connectivity**:
  ```bash
  curl -I http://example.com  # Fetches HTTP headers to check connectivity
  ```
- **Test Port Connectivity**:
  ```bash
  nc -zv host port  # Tests if a port is open on a host
  ```

---

## 🔹 Permissions & Ownership

- **Change Ownership**:
  ```bash
  sudo chown user:group file  # Changes ownership of a file
  ```
- **Change Permissions**:
  ```bash
  chmod 755 file  # Sets read, write, execute permissions for user, and read/execute for others
  ```
- **Symbolic Modes**:
  ```bash
  chmod u+x file   # Adds execute permission for the user
  chmod g-w file   # Removes write permission for the group
  chmod o-r file   # Removes read permission for others
  ```

---

## 🔹 Logs & Monitoring

- **View System Logs**:
  ```bash
  journalctl -xe  # Displays recent system logs with details
  ```
- **Logs for a Service**:
  ```bash
  journalctl -u servicename  # Displays logs for a specific service
  ```
- **Follow Logs in Real Time**:
  ```bash
  tail -f /var/log/syslog  # Follows the system log in real-time
  tail -f /var/log/messages  # Follows the messages log in real-time
  ```
- **Check Last Boot Messages**:
  ```bash
  dmesg | less  # Displays kernel messages from the last boot
  ```

---

## 🔹 Package Management

### **Debian/Ubuntu**

- **Update Packages**:
  ```bash
  sudo apt update && sudo apt upgrade  # Updates package lists and upgrades installed packages
  ```
- **Install a Package**:
  ```bash
  sudo apt install package  # Installs a package
  ```
- **Remove a Package**:
  ```bash
  sudo apt remove package  # Removes a package
  ```

### **RHEL/CentOS/Fedora**

- **Update Packages**:
  ```bash
  sudo yum update  # Updates all packages
  sudo dnf upgrade  # Updates all packages (dnf for newer systems)
  ```
- **Install a Package**:
  ```bash
  sudo yum install package  # Installs a package
  sudo dnf install package  # Installs a package (dnf for newer systems)
  ```
- **Remove a Package**:
  ```bash
  sudo yum remove package  # Removes a package
  ```

---

## 🔹 Security & Hardening

- **Check for Active Users**:
  ```bash
  who  # Displays logged-in users
  w  # Displays logged-in users with additional details
  ```
- **Check Last Logins**:
  ```bash
  last  # Displays login history
  ```
- **Check Sudo Access**:
  ```bash
  sudo -l  # Lists sudo privileges for the current user
  ```
- **Lock a User Account**:
  ```bash
  sudo usermod -L username  # Locks a user account
  ```
- **Check Listening Ports**:
  ```bash
  ss -tulnp  # Displays listening ports with process details
  ```
- **Enable Firewall (UFW example)**:
  ```bash
  sudo ufw enable  # Enables the firewall
  sudo ufw allow ssh  # Allows SSH traffic
  sudo ufw status  # Displays firewall status
  ```
- **Generate SSH Key Pair**:
  ```bash
  ssh-keygen -t ed25519  # Generates an SSH key pair using the ed25519 algorithm
  ```

---

## 🔹 Quick Recovery & Troubleshooting

- **Check System Load**:
  ```bash
  uptime  # Displays system uptime and load averages
  ```
- **Check Memory Usage**:
  ```bash
  free -h  # Displays memory usage in human-readable format
  ```
- **Check Disk IO**:
  ```bash
  iostat  # Displays disk I/O statistics
  ```
- **Check Open Files**:
  ```bash
  lsof | less  # Lists open files
  ```
- **Check Failed SSH Logins**:
  ```bash
  grep "Failed password" /var/log/auth.log  # Searches for failed SSH login attempts
  ```

---

## 🔹 Legend (Linux Terms)

- **PID** – Process ID.
- **UID** – User ID.
- **GID** – Group ID.
- **TTY** – Terminal session.
- **Daemon** – Background process/service.
- **Inode** – Index node storing file metadata.
- **Mount Point** – Directory where a filesystem is attached.
- **Systemd** – Init system and service manager in modern Linux.
- **SELinux/AppArmor** – Linux security frameworks.

---

## 🔹 Best Practices

- Keep your system updated regularly.
- Use `man <command>` or `--help` to learn command options.
- Use `tmux` or `screen` for persistent sessions over SSH.
- Always set up SSH key-based authentication instead of passwords.
- Monitor disk usage with alerts (`df -h`, `du -sh`).
- Never run daily tasks as root — use `sudo`.
- Automate repetitive tasks with shell scripts.
- Regularly review `/var/log` for errors and security issues.