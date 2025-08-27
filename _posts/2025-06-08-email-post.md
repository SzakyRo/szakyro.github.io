---
layout: post
title: How to set up your email server using Postfix
date: 2025-06-08 16:00:00 +0300
categories: [Email,Postfix]
tags: [email, postfix] # TAG names
---


# Postfix Installation Guide on Ubuntu

## 🛠️ Things To Do Before Installing Postfix

### 1. Set a Correct Hostname

Postfix uses your server’s hostname to identify itself when communicating with other MTAs.

- Recommended format: Fully Qualified Domain Name (FQDN)  
  Example: `mail.yourdomain.com`

To check current FQDN:

```bash
hostname -f
```

To set an FQDN:

```bash
sudo hostnamectl set-hostname mail.yourdomain.com
```

Then reboot your server.

---

### 2. Set Up DNS Records

Set these in your DNS hosting provider's dashboard (e.g., NameCheap, GoDaddy, AWS Route53).

#### MX Record

Tells MTAs where to send email for your domain:

```
Host: @  
Type: MX  
Value: mail.yourdomain.com  
Priority: 0
```

![Add new MX record](/assets/img/postfix/addrecord.png)

#### A Record

Maps FQDN to your server’s IP:

```
mail.yourdomain.com    →    your_server_public_ipv4_address
```

![Add new A record](/assets/img/postfix/addarecord.png)

#### PTR Record (Reverse DNS)

Links your IP to FQDN:

```bash
dig -x <your_ip> +short
# or
host <your_ip>
```

You must set this in your hosting provider's dashboard. The PTR should match `mail.yourdomain.com`.

📌 **Note**: Gmail will check that the PTR's hostname resolves back to the IP.

---

## 📦 Installing Postfix

```bash
sudo apt-get update
sudo apt-get install postfix -y
```

### Configuration Options

Select **Internet Site**.

![Select Postfix configuration](/assets/img/postfix/postfixconfig.png)

Set **System Mail Name** to your domain (e.g., `yourdomain.com`).

> ⚠️ Don’t use `mail.yourdomain.com` unless you want email addresses like `user@mail.yourdomain.com`.

Postfix creates `/etc/postfix/main.cf` and starts automatically.

Check version:

```bash
postconf mail_version
```

Example output:

```
mail_version = 3.6.4
```

Verify Postfix is listening:

```bash
sudo ss -lnpt | grep master
```

List installed Postfix binaries:

```bash
dpkg -L postfix | grep /usr/sbin/
```

---

## 🔓 Open TCP Port 25 in Firewall

If UFW is enabled:

```bash
sudo ufw allow 25/tcp
```

Scan open ports externally to verify.

![Scan open ports externally](/assets/img/postfix/portscan.png)

---

## 🌐 Check If TCP Port 25 (Outbound) Is Blocked

Install telnet:

```bash
sudo apt install telnet
```

Test connection:

```bash
telnet gmail-smtp-in.l.google.com 25
```

If blocked, contact your hosting provider or use an SMTP relay/VPS.

> 🔄 **Can I change the port?** No. SMTP servers expect port 25.

---

## ✉️ Sending Test Email

```bash
echo "test email" | sendmail your-account@gmail.com
```

Check inbox (or spam). From address is auto-generated using system mail name.

To find user inbox:

```bash
postconf mail_spool_directory
```

Mail log:

```bash
/var/log/mail.log
```

---

## 🪛 Troubleshooting Email Delivery

If you can't send mail despite port 25 being open:

```bash
sudo nano /var/log/mail.log
```

You might see errors like:

```
550-5.7.1 ... does not meet IPv6 sending guidelines ...
```

➡️ Set AAAA and PTR records for your IPv6, or disable IPv6.

---

## 📬 Using the `mail` Program

Install:

```bash
sudo apt-get install mailutils
```

Send:

```bash
mail -a FROM:your-account@yourdomain.com recipient@gmail.com
```

- Press Ctrl+D to send
- To read email:

```bash
mail
```

### Mail Program Commands

| Command       | Description                         |
|---------------|-------------------------------------|
| `1`           | Read first email                    |
| `h`           | Show headers                        |
| `n`           | Next message                        |
| `d 1`         | Delete message 1                    |
| `d 1 2 3`     | Delete multiple                     |
| `reply 1`     | Reply to message 1                  |
| `q`           | Quit (moves mail to mbox)           |
| `x`           | Exit without modifying mail         |

---

## 📎 Increase Attachment Size Limit

Check current size:

```bash
postconf | grep message_size_limit
```

Increase to 50MB:

```bash
sudo postconf -e message_size_limit=52428800
```

Check mailbox limit:

```bash
postconf | grep mailbox_size_limit
```

If it's `0`, there is no mailbox limit.

Restart Postfix:

```bash
sudo systemctl restart postfix
```

---

## 🏷️ Set Postfix Hostname

Edit config:

```bash
sudo nano /etc/postfix/main.cf
```

Set:

```conf
myhostname = mail.yourdomain.com
```

Restart:

```bash
sudo systemctl restart postfix
```

---

## 📬 Creating Email Alias

Edit:

```bash
sudo nano /etc/aliases
```

Add:

```conf
postmaster: root
root: yourusername
```

Rebuild aliases:

```bash
sudo newaliases
```

---

## 🌐 Disable IPv6 in Postfix (Optional)

```bash
postconf inet_protocols
# Output: inet_protocols = all

sudo postconf -e "inet_protocols = ipv4"
sudo systemctl restart postfix
```

---

## ⬆️ Upgrading Postfix

If prompted during upgrade, select **No configuration** to keep your settings.

![Select Postfix upgrade](/assets/img/postfix/postfixupgrade.png)

---

## ✅ Summary

You now have a working Postfix mail server capable of:

- Sending/receiving plain text emails
- Managing emails via command-line tools

---

## 🔜 Next Step

In the next part of this tutorial series, we will learn how to install **Dovecot IMAP** server and enable **TLS encryption**, which will allow us to use a desktop mail client like Mozilla Thunderbird to send and receive emails.