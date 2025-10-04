---
layout: post
title: "Linux Security Cheat Sheet for Sysadmins"
date: 2025-10-04
categories: [Cheat Sheet, Linux, Security]
tags: [linux, security, hardening, audit]
---

# Linux Security Cheat Sheet for Sysadmins

A focused reference for Linux security, hardening, auditing, and compliance best practices.  

---

## 🔹 User & Access Management

- **Check Logged In Users**:
  ```bash
  who
  w
  ```
- **Check Last Logins**:
  ```bash
  last
  ```
- **Check Sudo Access**:
  ```bash
  sudo -l
  ```
- **Lock a User Account**:
  ```bash
  sudo usermod -L username
  ```
- **Force Password Change on Next Login**:
  ```bash
  sudo chage -d 0 username
  ```
- **Check Password Expiry**:
  ```bash
  chage -l username
  ```

---

## 🔹 SSH Hardening

- **Disable root login**:
  ```bash
  # Edit /etc/ssh/sshd_config
  PermitRootLogin no
  ```
- **Disable password authentication**:
  ```bash
  # Edit /etc/ssh/sshd_config
  PasswordAuthentication no
  ```
- **Limit allowed users**:
  ```bash
  # Edit /etc/ssh/sshd_config
  AllowUsers adminuser
  ```
- **Change default SSH port (optional)**:
  ```bash
  # Edit /etc/ssh/sshd_config
  Port 2222
  ```
- **Restart SSH**:
  ```bash
  sudo systemctl restart sshd
  ```

---

## 🔹 Firewall Management

### UFW (Ubuntu/Debian)
- **Enable firewall**:
  ```bash
  sudo ufw enable
  ```
- **Allow SSH**:
  ```bash
  sudo ufw allow 22/tcp
  ```
- **Check status**:
  ```bash
  sudo ufw status verbose
  ```

### Firewalld (RHEL/CentOS/Fedora)
- **Add a port**:
  ```bash
  sudo firewall-cmd --add-port=443/tcp --permanent
  sudo firewall-cmd --reload
  ```
- **List allowed services**:
  ```bash
  sudo firewall-cmd --list-all
  ```

---

## 🔹 SELinux & AppArmor

- **Check SELinux status**:
  ```bash
  getenforce
  sestatus
  ```
- **Set SELinux mode temporarily**:
  ```bash
  setenforce 1   # Enforcing
  setenforce 0   # Permissive
  ```
- **View SELinux logs**:
  ```bash
  ausearch -m avc
  ```
- **AppArmor status**:
  ```bash
  aa-status
  ```
- **Enable/Disable AppArmor profile**:
  ```bash
  sudo aa-enforce /etc/apparmor.d/profile
  sudo aa-disable /etc/apparmor.d/profile
  ```

---

## 🔹 System Auditing

- **Check Audit Logs**:
  ```bash
  ausearch -m avc
  ausearch -ts today
  ```
- **List Active Audit Rules**:
  ```bash
  auditctl -l
  ```
- **Add a Rule to Monitor File Access**:
  ```bash
  auditctl -w /etc/passwd -p wa -k passwd_changes
  ```
- **Generate Report**:
  ```bash
  aureport -f
  ```

---

## 🔹 Log Monitoring & Analysis

- **System Logs**:
  ```bash
  journalctl -xe
  tail -f /var/log/syslog
  tail -f /var/log/auth.log
  ```
- **Failed Login Attempts**:
  ```bash
  grep "Failed password" /var/log/auth.log
  ```
- **Last Successful Logins**:
  ```bash
  lastlog
  ```

---

## 🔹 Malware & Integrity Checks

- **Scan for Rootkits**:
  ```bash
  sudo rkhunter --check
  sudo chkrootkit
  ```
- **File Integrity Check**:
  ```bash
  sudo aide --check
  ```
- **Install AIDE Database**:
  ```bash
  sudo aideinit
  mv /var/lib/aide/aide.db.new /var/lib/aide/aide.db
  ```

---

## 🔹 Kernel & Network Hardening

- **Disable IP Forwarding**:
  ```bash
  sysctl -w net.ipv4.ip_forward=0
  ```
- **Enable TCP SYN Cookies**:
  ```bash
  sysctl -w net.ipv4.tcp_syncookies=1
  ```
- **Ignore ICMP Broadcast Requests**:
  ```bash
  sysctl -w net.ipv4.icmp_echo_ignore_broadcasts=1
  ```
- **Disable Source Routed Packets**:
  ```bash
  sysctl -w net.ipv4.conf.all.accept_source_route=0
  sysctl -w net.ipv4.conf.default.accept_source_route=0
  ```
- **Enable Reverse Path Filtering**:
  ```bash
  sysctl -w net.ipv4.conf.all.rp_filter=1
  ```

---

## 🔹 Fail2Ban & Brute Force Protection

- **Check Status**:
  ```bash
  sudo fail2ban-client status
  ```
- **Check Jail Status**:
  ```bash
  sudo fail2ban-client status sshd
  ```
- **Restart Fail2Ban**:
  ```bash
  sudo systemctl restart fail2ban
  ```

---

## 🔹 Package & Updates Security

- **Update System Packages**:
  ```bash
  sudo apt update && sudo apt upgrade
  sudo yum update
  sudo dnf upgrade
  ```
- **Check for Vulnerabilities in Packages**:
  ```bash
  debsecan            # Debian/Ubuntu
  rpm -Va             # RHEL/CentOS
  ```
- **Remove Unused Services & Packages**:
  ```bash
  sudo systemctl disable service
  sudo apt purge package
  ```

---

## 🔹 Backup & Recovery

- **Backup Important Configs**:
  ```bash
  tar -czvf /backup/etc-backup.tar.gz /etc
  ```
- **Test Backup Restore**:
  ```bash
  tar -xzvf /backup/etc-backup.tar.gz -C /tmp
  ```
- **Use rsync for Remote Backup**:
  ```bash
  rsync -avz /etc backupserver:/backup/etc
  ```

---

## 🔹 Legend (Linux Security Terms)

- **SELinux/AppArmor** – Mandatory access control frameworks.
- **Auditd** – Linux auditing daemon for logging security events.
- **Rootkit** – Malicious software to gain admin control.
- **Fail2Ban** – Protects services from brute-force attacks.
- **TCP SYN Cookie** – Defense against SYN flood attacks.
- **AIDE** – Advanced Intrusion Detection Environment.
- **Jail** – Fail2Ban configuration protecting a service.
- **Sysctl** – Interface to kernel parameters.
- **Immutable File** – File cannot be modified or deleted (`chattr +i`).

---

## 🔹 Best Practices

- Always use least privilege and avoid logging in as root.
- Use SSH key authentication and disable passwords.
- Keep firewalls enabled and only allow necessary ports.
- Regularly review audit logs and failed login attempts.
- Scan for malware/rootkits periodically.
- Harden kernel parameters with sysctl.
- Backup `/etc`, `/home`, and critical configs frequently.
- Remove unnecessary packages and services.
- Enable automatic security updates where possible.