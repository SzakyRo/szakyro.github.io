---
layout: post
title: "Ultimate LVM Cheat Sheet for Linux Sysadmins"
date: 2025-10-05
categories: [Cheat Sheet, Linux, Storage]
tags: [linux, lvm, storage, sysadmin]
---

# Ultimate LVM Cheat Sheet for Linux Sysadmins

A complete reference for managing **LVM** on Linux systems. Covers **creation, management, snapshots, thin provisioning, monitoring, troubleshooting, and best practices**.

---

## 🔹 LVM Concepts

- **PV (Physical Volume)** – Physical disk or partition used by LVM.  
- **VG (Volume Group)** – Pool of storage made from PVs.  
- **LV (Logical Volume)** – Virtual disk created from VG.  
- **PE / LE (Physical / Logical Extents)** – Storage allocation unit.  
- **Snapshot** – Point-in-time copy of an LV.  
- **Thin LV** – Logical volume with on-demand storage allocation.  
- **Mirror / Stripe** – LV layouts for redundancy and performance.

---

## 🔹 Physical Volumes (PV)

- **Create PV**:
  ```bash
  sudo pvcreate /dev/sdb
  ```
- **Display PV info**:
  ```bash
  pvdisplay
  pvs
  ```
- **Remove PV**:
  ```bash
  sudo pvremove /dev/sdb
  ```
- **Move PV data**:
  ```bash
  pvmove /dev/sdb
  ```
- **Backup PV metadata**:
  ```bash
  pvcreate --restorefile /root/pvmetadata.bak /dev/sdb
  ```
- **Recover PV metadata**:
  ```bash
  vgcfgrestore vg_name
  ```

---

## 🔹 Volume Groups (VG)

- **Create VG**:
  ```bash
  sudo vgcreate vg_data /dev/sdb /dev/sdc
  ```
- **List VGs**:
  ```bash
  vgdisplay
  vgs
  ```
- **Extend VG (add PV)**:
  ```bash
  sudo vgextend vg_data /dev/sdd
  ```
- **Reduce VG (remove PV)**:
  ```bash
  sudo vgreduce vg_data /dev/sdd
  ```
- **Rename VG**:
  ```bash
  sudo vgrename old_name new_name
  ```
- **Remove VG**:
  ```bash
  sudo vgremove vg_data
  ```
- **Check VG free space**:
  ```bash
  vgdisplay vg_data
  vgs
  ```

---

## 🔹 Logical Volumes (LV)

- **Create LV**:
  ```bash
  sudo lvcreate -n lv_data -L 10G vg_data
  ```
- **Create LV using 100% free space**:
  ```bash
  sudo lvcreate -l 100%FREE -n lv_data vg_data
  ```
- **Display LVs**:
  ```bash
  lvdisplay
  lvs
  ```
- **Remove LV**:
  ```bash
  sudo lvremove /dev/vg_data/lv_data
  ```
- **Resize LV (grow)**:
  ```bash
  sudo lvextend -L +5G /dev/vg_data/lv_data
  resize2fs /dev/vg_data/lv_data   # ext4
  xfs_growfs /mount/point          # XFS
  ```
- **Resize LV (shrink – risky!)**:
  ```bash
  sudo lvreduce -L 5G /dev/vg_data/lv_data
  resize2fs /dev/vg_data/lv_data
  ```
- **Rename LV**:
  ```bash
  sudo lvrename vg_data lv_data lv_backup
  ```

---

## 🔹 LV Snapshots

- **Create snapshot**:
  ```bash
  sudo lvcreate -s -n lv_data_snap -L 1G /dev/vg_data/lv_data
  ```
- **List snapshots**:
  ```bash
  lvs -a
  ```
- **Remove snapshot**:
  ```bash
  sudo lvremove /dev/vg_data/lv_data_snap
  ```
- **Restore from snapshot**:
  ```bash
  lvconvert --merge /dev/vg_data/lv_data_snap
  ```

---

## 🔹 Thin Provisioning

- **Create thin pool**:
  ```bash
  lvcreate -L 50G -T vg_data/thinpool
  ```
- **Create thin LV**:
  ```bash
  lvcreate -V 10G -T vg_data/thinpool -n lv_thin
  ```
- **List thin LVs**:
  ```bash
  lvs -a -o+seg_monitor
  ```
- **Resize thin LV**:
  ```bash
  lvextend -L +5G /dev/vg_data/lv_thin
  ```

---

## 🔹 Advanced Layouts

- **Striped LV (performance)**:
  ```bash
  lvcreate -i2 -I64 -L 20G -n lv_striped vg_data /dev/sdb /dev/sdc
  ```
- **Mirrored LV (redundancy)**:
  ```bash
  lvcreate -m1 -L 10G -n lv_mirror vg_data
  ```
- **Convert to mirrored LV**:
  ```bash
  lvconvert -m1 /dev/vg_data/lv_data
  ```

---

## 🔹 Mounting & Filesystems

- **Format LV**:
  ```bash
  mkfs.ext4 /dev/vg_data/lv_data
  mkfs.xfs /dev/vg_data/lv_data
  ```
- **Mount LV**:
  ```bash
  sudo mount /dev/vg_data/lv_data /mnt/data
  ```
- **Add to /etc/fstab**:
  ```bash
  /dev/vg_data/lv_data  /mnt/data  ext4  defaults  0 2
  ```
- **Check LV usage**:
  ```bash
  df -h /mnt/data
  ```

---

## 🔹 Monitoring & Troubleshooting

- **Check free space in VG**:
  ```bash
  vgdisplay vg_data
  vgs
  ```
- **Check LV sizes**:
  ```bash
  lvs
  lvdisplay
  ```
- **Check PVs and extents**:
  ```bash
  pvdisplay
  pvs
  ```
- **Check filesystem on LV**:
  ```bash
  fsck /dev/vg_data/lv_data
  ```
- **Recover VG/LV metadata**:
  ```bash
  vgcfgrestore vg_data
  lvconvert --repair /dev/vg_data/lv_data
  ```
- **Activate / Deactivate LV**:
  ```bash
  lvchange -ay /dev/vg_data/lv_data
  lvchange -an /dev/vg_data/lv_data
  ```

---

## 🔹 Backup & Restore

- **Backup LVM metadata**:
  ```bash
  vgcfgbackup vg_data
  ```
- **Restore LVM metadata**:
  ```bash
  vgcfgrestore vg_data
  ```
- **Use snapshots for backups**:
  ```bash
  lvcreate -s -n lv_data_snap -L 1G /dev/vg_data/lv_data
  tar -czvf /backup/lv_data.tar.gz /mnt/data
  lvremove /dev/vg_data/lv_data_snap
  ```

---

## 🔹 LVM Legend

- **PV** – Physical Volume
- **VG** – Volume Group
- **LV** – Logical Volume
- **PE / LE** – Physical / Logical extents
- **Snapshot** – Point-in-time copy of an LV
- **Thin LV** – On-demand allocated LV
- **Mirror / Stripe** – LV layout for redundancy/performance
- **Thin Pool** – Storage pool for thin LVs
- **lvextend / lvreduce** – Resize LVs
- **vgextend / vgreduce** – Resize VGs
- **pvmove** – Move data between PVs

---

## 🔹 Best Practices

- Always backup data before resizing or removing LVs.
- Use snapshots before risky operations.
- Monitor VG free space regularly: `vgs` / `vgdisplay`.
- Keep LVs logically organized by purpose (`/var`, `/home`, `/data`).
- Avoid shrinking LVs unless filesystem contents are fully verified.
- Use RAID underneath LVM for redundancy and performance.
- Document LVM layout for disaster recovery.
- Use thin provisioning carefully, monitor usage to avoid overcommit.
- Periodically check filesystem integrity on LVs: `fsck` or `xfs_repair`.
- Use activation/deactivation of LVs to manage maintenance safely.