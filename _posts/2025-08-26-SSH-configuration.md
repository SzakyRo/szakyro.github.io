---
layout: post
title: "How to Create an SSH Key and Configure OpenSSH Server for Key Authentication"
date: 2025-08-26
categories: [Linux,Tutorial,Ssh]
tags: [linux, security, tutorial]
---

This tutorial aims to help everyone secure their servers by using SSH keys instead of passwords for SSH authentication.

## Generating an SSH Key Pair

To create a new SSH key pair on your client machine:

```sh
ssh-keygen -t ed25519 -C "your_email@example.com"
```

- `-t ed25519`: Specifies the key type as Ed25519, which is faster and more secure than RSA.
- `-C "your_email@example.com"`: Adds a comment to the key for identification purposes.

- Press Enter to accept the default file location.
- Set a passphrase for added security (optional).

Your public key will be saved in `~/.ssh/id_ed25519.pub`.

## Copying the Public Key to the Server

Use `ssh-copy-id` to transfer your public key to the server:

```sh
ssh-copy-id username@server_ip
```

This command ensures the proper permissions are set for the `~/.ssh` directory and the `authorized_keys` file.

Alternatively, manually append your public key to the server's `~/.ssh/authorized_keys` file:

1. Log in to the server.
2. Use the following command:

    ```sh
    echo "yourkey" >> ~/.ssh/authorized_keys
    ```

Replace `yourkey` with the actual content of your public key (found in `~/.ssh/id_ed25519.pub`). Ensure you append the key rather than overwriting the file.

## Configuring OpenSSH Server

1. **Edit the SSH server configuration file:**

    ```sh
    sudo nano /etc/ssh/sshd_config
    ```

2. **Ensure these settings are enabled:**

    ```
    PubkeyAuthentication yes
    AuthorizedKeysFile .ssh/authorized_keys
    PasswordAuthentication no
    ```

    - `PubkeyAuthentication yes`: Enables public key authentication.
    - `AuthorizedKeysFile .ssh/authorized_keys`: Specifies the file where public keys are stored.
    - `PasswordAuthentication no`: Disables password authentication for added security.

3. **Restart the SSH service:**

    ```sh
    sudo systemctl restart sshd
    ```

## Testing SSH Key Authentication

Connect to your server:

```sh
ssh username@server_ip
```

If configured correctly, you will be authenticated using your SSH key. For debugging, use:

```sh
ssh -v username@server_ip
```

The `-v` flag provides verbose output to help identify any issues.

---

## Troubleshooting

- **Permissions Issue:** Ensure the `~/.ssh` directory and `authorized_keys` file on the server have the correct permissions:

    ```sh
    chmod 700 ~/.ssh
    chmod 600 ~/.ssh/authorized_keys
    ```

- **SSH Service Not Restarted:** After modifying `sshd_config`, restart the SSH service:

    ```sh
    sudo systemctl restart sshd
    ```

- **Key Not Found:** Verify the public key was copied correctly to the server:

    ```sh
    cat ~/.ssh/authorized_keys
    ```

---

**Security Note:** Always use a strong passphrase for your private key. To avoid entering the passphrase repeatedly, use an SSH agent:

```sh
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

Disabling password authentication (`PasswordAuthentication no`) increases security, but ensure you have your SSH key configured correctly before making this change.