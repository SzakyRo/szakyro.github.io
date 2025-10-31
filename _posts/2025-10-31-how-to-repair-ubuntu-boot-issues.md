---
layout: post
title: "How to Repair Ubuntu Boot Issues (Step-by-Step Guide)"
date: 2025-10-31
categories: [linux, ubuntu, sysadmin, troubleshooting]
tags: [grub, boot-repair, linux, system-recovery, ubuntu]
description: Learn how to fix Ubuntu boot issues step by step — including GRUB repair, filesystem checks, and common EFI/BIOS troubleshooting.
---
If your Ubuntu system refuses to boot — stuck at a black screen, a `grub rescue>` prompt, or an endless reboot loop — don’t panic. This guide walks you through how to repair Ubuntu boot issues step-by-step, using both built-in tools and the Boot-Repair utility.

---

## 🧩 Common Symptoms

Before fixing, identify what type of boot problem you have:

- **Black screen or blinking cursor** after BIOS/UEFI logo
- **`grub rescue>` or `grub>`** prompt appearing
- **“No bootable device”** error
- Boot loops back to BIOS repeatedly
- Kernel panic messages like `VFS: Unable to mount root fs`

These usually point to a bootloader (GRUB), partition, or filesystem issue.

---

## 🔧 Step 1 — Boot from a Live USB

1. Create an Ubuntu Live USB using Rufus, balenaEtcher, or `dd`:

```bash
# Example using dd (Linux/macOS)
sudo dd if=ubuntu-24.04-desktop-amd64.iso of=/dev/sdX bs=4M status=progress
sync
# Replace /dev/sdX with your USB device (NOT a partition like /dev/sdX1)
```

2. Boot the affected machine from the USB and choose **Try Ubuntu**.

3. Open a terminal (Ctrl+Alt+T) in the live session.

---

## 🧭 Step 2 — Identify your partitions

Find the Linux root partition and the EFI partition (if present):

```bash
sudo fdisk -l
```

Look for lines indicating a Linux filesystem (usually the root `/`) and an EFI System partition (FAT32, ~100–500MB). Example:

```text
/dev/sda1   *   EFI System
/dev/sda2       Boot partition
/dev/sda3       Linux filesystem
```

Note: On NVMe devices the names look like `/dev/nvme0n1p1`, `/dev/nvme0n1p2`.

---

## 🧱 Step 3 — Mount and chroot into your system

This lets you run commands as if you booted into the installed system.

```bash
sudo mount /dev/sda2 /mnt                     # mount root (replace with your root partition)
sudo mount /dev/sda1 /mnt/boot/efi            # mount EFI if using UEFI (skip for BIOS)
for i in /dev /dev/pts /proc /sys /run; do sudo mount --bind "$i" "/mnt$i"; done      #This is very usefull for quick mounting
sudo chroot /mnt
# You are now inside the installed system as root
```

If your root is on LVM or encrypted, adapt mounting steps (activate volume groups or unlock LUKS first).

---

## ⚙️ Step 4 — Reinstall / Repair GRUB

If the system boots with UEFI, reinstall GRUB for EFI:

```bash
grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=ubuntu
update-grub
```

For legacy BIOS (MBR):

```bash
grub-install /dev/sda   # install to the disk, not a partition
update-grub
```

You should see output showing detected kernels (e.g. `/boot/vmlinuz-...`).

---

## 🔧 Step 5 — Exit chroot and unmount cleanly

```bash
exit
for i in /run /sys /proc /dev/pts /dev; do sudo umount "/mnt$i" || true; done
sudo umount /mnt/boot/efi || true   # only if you mounted it earlier
sudo umount /mnt || true
sync
sudo reboot
```

If the system still doesn't boot, collect logs and try the alternative steps below.

---

## 🛠️ Additional recovery steps

- Check filesystem integrity (run from live session or chroot):

```bash
sudo fsck -fy /dev/sda2   # replace with your filesystem device
```

- Inspect `dmesg` and `/var/log/boot.log` (or `journalctl -xb`) for kernel/driver errors.

- If GRUB is present but cannot find kernels, verify `/boot` contents and that `update-grub` detected kernels.

---

## 🚑 Use Boot-Repair (GUI helper)

Boot-Repair is a graphical tool that automates many fixes (useful for less-experienced users):

1. From the live session, add Boot-Repair PPA and install:

```bash
sudo add-apt-repository ppa:yannubuntu/boot-repair -y
sudo apt update
sudo apt install -y boot-repair
boot-repair
```

2. Choose **Recommended repair** and follow prompts. Boot-Repair will attempt to reinstall GRUB and fix common issues.

Note: Review the Boot-Repair URL it prints — it contains a diagnostic summary you can share for help.

---

## 🧾 Troubleshooting tips & notes

- **Always double-check** device names (`/dev/sda`, `/dev/nvme0n1`) before running destructive commands.
- If you use full-disk encryption or LVM, unlock and activate volumes before mounting.
- For UEFI systems, ensure the firmware is set to boot the correct EFI entry (check `efibootmgr -v`).
- If GRUB is installed but system drops to `grub>` or `grub rescue>`, use GRUB commands to boot manually or reinstall from chroot.

---

## ✅ When to ask for help

If you're stuck, collect the following and share when requesting help on forums:

- Output of `sudo fdisk -l` or `lsblk -f`
- Contents of `/boot` and `/boot/efi` (if present)
- `sudo efibootmgr -v` (for UEFI systems)
- Any error text shown at boot (take photos if needed)

---