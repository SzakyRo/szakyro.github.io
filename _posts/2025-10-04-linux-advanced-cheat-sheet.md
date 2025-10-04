---
layout: post
title: "Linux Advanced Cheat Sheet for Sysadmins"
date: 2025-10-04
categories: [Cheat Sheet, Linux]
tags: [linux, sysadmin, advanced, tuning, security]
---

# Linux Advanced Cheat Sheet for Sysadmins

This cheat sheet is for Linux sysadmins who want **advanced commands, tuning, and hardening** techniques for production-grade systems.  

---

## 🔹 System Performance & Kernel Tuning

- **View Current Sysctl Parameters**:
  ```bash
  sysctl -a  # Displays all current kernel parameters
  ```
- **Set Kernel Parameter Temporarily**:
  ```bash
  sysctl -w net.ipv4.ip_forward=1  # Enables IP forwarding temporarily
  ```
- **Set Kernel Parameter Persistently**:
  ```bash
  echo "net.ipv4.ip_forward = 1" >> /etc/sysctl.conf
  sysctl -p  # Applies changes from /etc/sysctl.conf
  ```

### **Common Sysctl Tunings**

- **Increase max open files**:
  ```bash
  fs.file-max = 2097152
  ```
- **Increase TCP backlog**:
  ```bash
  net.core.somaxconn = 1024
  ```
- **Reuse TIME_WAIT sockets faster**:
  ```bash
  net.ipv4.tcp_tw_reuse = 1
  net.ipv4.tcp_fin_timeout = 15
  ```
- **Increase network buffers**:
  ```bash
  net.core.rmem_max = 16777216
  net.core.wmem_max = 16777216
  ```

---

## 🔹 Advanced Storage & Filesystems

- **Check Filesystem Usage**:
  ```bash
  df -hT  # Displays disk usage with filesystem types
  ```
- **Check Inode Usage**:
  ```bash
  df -i  # Displays inode usage
  ```
- **Create LVM Partition**:
  ```bash
  pvcreate /dev/sdb  # Initializes a physical volume
  vgcreate vg_data /dev/sdb  # Creates a volume group
  lvcreate -L 10G -n lv_data vg_data  # Creates a logical volume
  mkfs.ext4 /dev/vg_data/lv_data  # Formats the logical volume with ext4
  ```
- **Resize LVM**:
  ```bash
  lvextend -L +5G /dev/vg_data/lv_data  # Extends the logical volume by 5GB
  resize2fs /dev/vg_data/lv_data  # Resizes the filesystem to use the new space
  ```
- **Check RAID Status**:
  ```bash
  cat /proc/mdstat  # Displays RAID status
  ```
- **Check Filesystem Errors**:
  ```bash
  fsck -f /dev/sda1  # Checks and fixes filesystem errors
  ```

---

## 🔹 Networking Advanced

- **Check Routing Table**:
  ```bash
  ip route show  # Displays the routing table
  ```
- **Add Static Route**:
  ```bash
  ip route add 10.0.0.0/24 via 192.168.1.1  # Adds a static route
  ```
- **Check Connections (like netstat)**:
  ```bash
  ss -tulnp  # Displays listening ports and connections
  ```
- **Traceroute**:
  ```bash
  traceroute google.com  # Traces the route to a host
  ```
- **Check Packet Loss**:
  ```bash
  mtr example.com  # Combines ping and traceroute for packet loss analysis
  ```
- **Capture Packets**:
  ```bash
  tcpdump -i eth0 port 80  # Captures packets on port 80
  ```

---

## 🔹 Systemd Deep Dive

- **List All Services**:
  ```bash
  systemctl list-units --type=service  # Lists all active services
  ```
- **Mask a Service (prevent from starting ever)**:
  ```bash
  sudo systemctl mask service  # Prevents a service from starting
  ```
- **Unmask a Service**:
  ```bash
  sudo systemctl unmask service  # Removes the mask from a service
  ```
- **Check Boot Performance**:
  ```bash
  systemd-analyze  # Analyzes boot performance
  systemd-analyze blame  # Shows time taken by each service during boot
  ```
- **View Logs Since Last Boot**:
  ```bash
  journalctl -b  # Displays logs since the last boot
  ```

---

## 🔹 Security & Hardening

### **SELinux / AppArmor**

- **Check SELinux Mode**:
  ```bash
  getenforce  # Displays the current SELinux mode
  ```
- **Change SELinux Mode**:
  ```bash
  setenforce 1   # Enforcing mode
  setenforce 0   # Permissive mode
  ```
- **AppArmor Status**:
  ```bash
  aa-status  # Displays AppArmor status
  ```

### **Firewall (UFW / firewalld)**

- **Allow Port (UFW)**:
  ```bash
  sudo ufw allow 22/tcp  # Allows SSH traffic
  ```
- **Firewalld Add Port**:
  ```bash
  sudo firewall-cmd --add-port=443/tcp --permanent  # Opens port 443
  sudo firewall-cmd --reload  # Reloads firewall rules
  ```

### **Audit & Intrusion Detection**

- **Auditd Logs**:
  ```bash
  ausearch -m avc  # Searches audit logs for access vector cache messages
  ```
- **Fail2Ban Setup**:
  ```bash
  sudo fail2ban-client status  # Displays Fail2Ban status
  ```

### **SSH Hardening**

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

---

## 🔹 Debugging & Troubleshooting

- **Check Last System Reboots**:
  ```bash
  last reboot  # Displays reboot history
  ```
- **Check Crashes (kernel logs)**:
  ```bash
  journalctl -k -p err  # Displays kernel error logs
  ```
- **Check CPU Usage per Core**:
  ```bash
  mpstat -P ALL 1  # Displays CPU usage per core every second
  ```
- **Check IO Wait & Disk Load**:
  ```bash
  iostat -xz 1  # Displays disk I/O statistics
  ```
- **Check Open Network Connections**:
  ```bash
  lsof -i -P -n  # Lists open network connections
  ```
- **Strace Process (syscalls)**:
  ```bash
  strace -p <pid>  # Traces system calls made by a process
  ```

---

## 🔹 Useful Tools

- **htop** → Interactive process viewer
- **iftop** → Network traffic monitor
- **iotop** → Disk I/O usage by process
- **ncdu** → Disk usage analyzer (better than `du`)
- **atop** → Advanced system resource monitor
- **glances** → Cross-platform system monitoring tool

---

## 🔹 Legend (Advanced Sysadmin Terms)

- **Sysctl** – Interface to modify kernel parameters.
- **OOM Killer** – Kernel process that kills apps when out of memory.
- **LVM** – Logical Volume Manager, flexible disk management.
- **RAID** – Redundant Array of Inexpensive Disks.
- **SELinux/AppArmor** – Mandatory access control security systems.
- **auditd** – Linux auditing system for security logs.
- **systemd-analyze** – Tool for boot performance profiling.
- **tcpdump** – Low-level packet capture tool.
- **strace** – Debugging tool to trace system calls.

---

## 🔹 Best Practices

- Keep `/var`, `/home`, and `/tmp` on separate partitions.
- Use `sysctl` for kernel/network tuning (but document changes!).
- Monitor system performance with `sar`, `iostat`, `vmstat`.
- Always enforce SSH key authentication, disable password login.
- Apply least privilege → don’t give users full sudo unless required.
- Automate regular security scans with `lynis`, `clamav`, or `openvas`.
- Backup configs in `/etc` and regularly test restores.
- Use monitoring systems (Prometheus, Zabbix, Nagios).