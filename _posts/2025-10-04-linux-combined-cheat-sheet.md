---
layout: post
title: "Linux Sysadmin Combined Cheat Sheet"
date: 2025-10-04
categories: [Cheat Sheet, Linux]
tags: [linux, sysadmin, advanced, security]
---

# Ultimate Linux Sysadmin Cheat Sheet

A complete reference for Linux sysadmins, combining **Basics, Advanced Tuning, and Security Hardening**.  

---

## 🔹 File Management

- **List Files**:
  ```bash
  ls -l
  ls -la           # show hidden files
  ```
- **Copy / Move / Remove Files**:
  ```bash
  cp source destination
  mv source destination
  rm file
  ```
- **Search Files & Content**:
  ```bash
  find /path -name "filename"
  grep "pattern" file
  ```

---

## 🔹 User & Group Management

- **Add / Delete Users**:
  ```bash
  sudo useradd username
  sudo userdel username
  sudo useradd -m username  # create home directory
  ```
- **Change Password & Force Expiry**:
  ```bash
  passwd username
  sudo chage -d 0 username
  ```
- **Manage Groups**:
  ```bash
  sudo usermod -aG groupname username
  groups username
  ```
- **Check Logged In Users**:
  ```bash
  who
  w
  last
  lastlog
  ```

---

## 🔹 Process & System Management

- **List & Monitor Processes**:
  ```bash
  ps aux
  pstree -p
  top
  htop
  ```
- **Kill Processes**:
  ```bash
  kill <pid>
  kill -9 <pid>
  ```
- **Resource Usage**:
  ```bash
  ps -eo pid,ppid,cmd,%mem,%cpu --sort=-%mem | head
  mpstat -P ALL 1
  free -h
  iostat -xz 1
  ```
- **Check Boot Performance & Systemd Services**:
  ```bash
  systemctl list-units --type=service
  systemctl start|stop|restart service
  systemctl enable service
  systemctl mask|unmask service
  systemctl status service
  systemctl --failed
  systemd-analyze
  systemd-analyze blame
  journalctl -b
  ```

---

## 🔹 Disk & Storage

- **Check Disk Usage**:
  ```bash
  df -hT
  df -i
  du -sh /path
  lsblk
  fdisk -l
  ```
- **Mount / Unmount Filesystems**:
  ```bash
  sudo mount /dev/sdX1 /mnt
  sudo umount /mnt
  ```
- **LVM Management**:
  ```bash
  pvcreate /dev/sdb
  vgcreate vg_data /dev/sdb
  lvcreate -L 10G -n lv_data vg_data
  mkfs.ext4 /dev/vg_data/lv_data
  lvextend -L +5G /dev/vg_data/lv_data
  resize2fs /dev/vg_data/lv_data
  ```
- **RAID / Filesystem Checks**:
  ```bash
  cat /proc/mdstat
  fsck -f /dev/sda1
  ```

---

## 🔹 Networking

- **IP & Routes**:
  ```bash
  ip addr show
  ip route show
  ip route add 10.0.0.0/24 via 192.168.1.1
  ```
- **Connectivity & Ports**:
  ```bash
  ping -c 4 example.com
  ss -tuln
  nc -zv host port
  curl -I http://example.com
  ```
- **Network Debugging**:
  ```bash
  traceroute example.com
  mtr example.com
  tcpdump -i eth0 port 80
  ```
- **Increase Network Performance**:
  ```bash
  sysctl -w net.core.rmem_max=16777216
  sysctl -w net.core.wmem_max=16777216
  sysctl -w net.ipv4.tcp_fin_timeout=15
  sysctl -w net.ipv4.tcp_tw_reuse=1
  ```

---

## 🔹 Package Management

### Debian / Ubuntu
- **Package Management Commands**:
  ```bash
  sudo apt update && sudo apt upgrade
  sudo apt install package
  sudo apt remove package
  ```

### RHEL / CentOS / Fedora
- **Package Management Commands**:
  ```bash
  sudo yum update
  sudo dnf upgrade
  sudo yum install package
  sudo dnf remove package
  ```

---

## 🔹 Permissions & Ownership

- **Change Ownership**:
  ```bash
  sudo chown user:group file
  ```
- **Modify Permissions**:
  ```bash
  chmod 755 file
  chmod u+x file   # user execute
  chmod g-w file   # remove group write
  chmod o-r file   # remove others read
  ```

---

## 🔹 Logs & Monitoring

- **View Logs**:
  ```bash
  journalctl -xe
  journalctl -u servicename
  tail -f /var/log/syslog
  tail -f /var/log/auth.log
  dmesg | less
  lsof | less
  ```
- **Monitor System Performance**:
  Tools: `htop`, `iotop`, `iftop`, `ncdu`, `glances`, `atop`

---

## 🔹 Security & Hardening

### SSH
- **Harden SSH Configuration**:
  ```bash
  PermitRootLogin no
  PasswordAuthentication no
  AllowUsers adminuser
  Port 2222
  sudo systemctl restart sshd
  ```

### Firewall
#### UFW:
- **Manage Firewall Rules**:
  ```bash
  sudo ufw enable
  sudo ufw allow 22/tcp
  sudo ufw status verbose
  ```

#### Firewalld:
- **Manage Firewall Rules**:
  ```bash
  sudo firewall-cmd --add-port=443/tcp --permanent
  sudo firewall-cmd --reload
  sudo firewall-cmd --list-all
  ```

### SELinux / AppArmor
- **SELinux Commands**:
  ```bash
  getenforce
  sestatus
  setenforce 1   # enforcing
  setenforce 0   # permissive
  ```
- **AppArmor Commands**:
  ```bash
  aa-status
  sudo aa-enforce /etc/apparmor.d/profile
  sudo aa-disable /etc/apparmor.d/profile
  ```

### Audit & Logging
- **Audit Commands**:
  ```bash
  auditctl -l
  ausearch -m avc
  ausearch -ts today
  aureport -f
  grep "Failed password" /var/log/auth.log
  lastlog
  ```

### Fail2Ban
- **Manage Fail2Ban**:
  ```bash
  sudo fail2ban-client status
  sudo fail2ban-client status sshd
  sudo systemctl restart fail2ban
  ```

### Malware & Integrity
- **Scan for Malware**:
  ```bash
  sudo rkhunter --check
  sudo chkrootkit
  ```
- **File Integrity Check**:
  ```bash
  sudo aide --check
  sudo aideinit
  mv /var/lib/aide/aide.db.new /var/lib/aide/aide.db
  ```

### Kernel Hardening
- **Harden Kernel Parameters**:
  ```bash
  sysctl -w net.ipv4.ip_forward=0
  sysctl -w net.ipv4.tcp_syncookies=1
  sysctl -w net.ipv4.icmp_echo_ignore_broadcasts=1
  sysctl -w net.ipv4.conf.all.accept_source_route=0
  sysctl -w net.ipv4.conf.all.rp_filter=1
  ```

---

## 🔹 Backup & Recovery

- **Backup Commands**:
  ```bash
  tar -czvf /backup/etc-backup.tar.gz /etc
  tar -xzvf /backup/etc-backup.tar.gz -C /tmp
  rsync -avz /etc backupserver:/backup/etc
  ```

---

## 🔹 Quick Troubleshooting

- **CPU, Memory, IO**:
  ```bash
  top
  htop
  mpstat -P ALL 1
  iostat -xz 1
  free -h
  ```
- **Disk Usage & Open Files**:
  ```bash
  df -h
  du -sh /path
  lsof | less
  ```
- **Network**:
  ```bash
  ss -tulnp
  ping -c 4 host
  nc -zv host port
  ```
- **System Logs**:
  ```bash
  journalctl -xe
  dmesg | less
  ```
- **Process Debugging**:
  ```bash
  strace -p <pid>
  ```

---

## 🔹 Legend (Linux Terms)

- **PID** – Process ID
- **UID / GID** – User / Group ID
- **Daemon** – Background process/service
- **Sysctl** – Kernel parameter interface
- **SELinux / AppArmor** – Security frameworks
- **Auditd** – Audit daemon
- **RAID / LVM** – Storage management
- **Fail2Ban / IPTables / UFW** – Intrusion prevention
- **AIDE** – File integrity checker
- **SYN Cookie** – Protect against TCP SYN flood
- **Immutable File** – Cannot be modified (`chattr +i`)

---

## 🔹 Best Practices

- Keep system updated regularly
- Use least privilege and avoid root login
- Use SSH keys and disable password authentication
- Enable firewall and only allow required ports
- Monitor logs and system performance continuously
- Harden kernel parameters with sysctl
- Backup `/etc`, `/home`, and critical configs
- Remove unnecessary packages and services
- Regularly scan for malware/rootkits
- Document all sysadmin changes and configs