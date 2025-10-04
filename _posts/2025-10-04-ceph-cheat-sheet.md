---
layout: post
title: "Ceph Cheat Sheet for Linux Sysadmins"
date: 2025-10-04
categories: [Cheat Sheet, ceph]
tags: [ceph, storage, linux]
---

# Ceph Cheat Sheet

A quick reference guide for Linux sysadmins managing Ceph clusters.  

---

## 🔹 Ceph Basics

- **Cluster Status**:
  ```bash
  ceph status
  ceph -s              # Short form
  ```
- **Check Ceph Health**:
  ```bash
  ceph health detail
  ```
- **Cluster Configuration Dump**:
  ```bash
  ceph config dump
  ```

---

## 🔹 Monitor & Logs

- **View Monitor Map**:
  ```bash
  ceph mon dump
  ```
- **Monitor Logs**:
  ```bash
  journalctl -u ceph-mon@<host> -f
  ```

---

## 🔹 OSD Management

- **List OSDs**:
  ```bash
  ceph osd tree
  ceph osd ls
  ```
- **OSD Usage**:
  ```bash
  ceph osd df
  ceph osd utilization
  ```
- **Mark OSD Out / In**:
  ```bash
  ceph osd out <osd_id>
  ceph osd in <osd_id>
  ```
- **Stop / Start OSD Service**:
  ```bash
  systemctl stop ceph-osd@<id>
  systemctl start ceph-osd@<id>
  ```
- **Remove OSD**:
  ```bash
  ceph osd purge <osd_id> --yes-i-really-mean-it
  ```

---

## 🔹 Pool Management

- **List Pools**:
  ```bash
  ceph osd pool ls
  ```
- **Create a Pool**:
  ```bash
  ceph osd pool create mypool 128 128 replicated
  ```
- **Delete a Pool**:
  ```bash
  ceph osd pool delete mypool mypool --yes-i-really-really-mean-it
  ```
- **Get Pool Stats**:
  ```bash
  ceph df
  ceph osd pool stats mypool
  ```

---

## 🔹 PG (Placement Groups)

- **Check PGs**:
  ```bash
  ceph pg stat
  ceph pg dump | less
  ```
- **Repair PG**:
  ```bash
  ceph pg repair <pg_id>
  ```

---

## 🔹 CRUSH Map

- **View CRUSH Map**:
  ```bash
  ceph osd crush tree
  ceph osd crush dump | less
  ```
- **Edit CRUSH Map**:
  ```bash
  ceph osd getcrushmap -o map.bin
  crushtool -d map.bin -o map.txt
  # edit map.txt
  crushtool -c map.txt -o newmap.bin
  ceph osd setcrushmap -i newmap.bin
  ```

---

## 🔹 RADOS & RGW

- **Check RGW Users**:
  ```bash
  radosgw-admin user list
  ```
- **Create a User**:
  ```bash
  radosgw-admin user create --uid="testuser" --display-name="Test User"
  ```
- **Get User Key**:
  ```bash
  radosgw-admin key create --uid="testuser"
  ```
- **Check Bucket Stats**:
  ```bash
  radosgw-admin bucket stats --bucket=mybucket
  ```

---

## 🔹 MDS (CephFS)

- **List Filesystems**:
  ```bash
  ceph fs ls
  ```
- **Check MDS Status**:
  ```bash
  ceph mds stat
  ```
- **Create Filesystem**:
  ```bash
  ceph fs new cephfs cephfs_metadata cephfs_data
  ```

---

## 🔹 Debug & Troubleshooting

- **Cluster Health**:
  ```bash
  ceph health detail
  ```
- **Slow Requests**:
  ```bash
  ceph health | grep slow
  ```
- **Check for Scrubbing / Recovery**:
  ```bash
  ceph status | egrep "recovery|scrub"
  ```
- **Detailed Logs**:
  ```bash
  ceph -w       # Watch cluster events
  ```

---

## 🔹 Quick Recovery Scenarios

### 🟢 MON Down

- **Check quorum**:
  ```bash
  ceph quorum_status | jq '.quorum_names'
  ```
- **Restart MON service**:
  ```bash
  systemctl restart ceph-mon@<host>
  ```
- **If still failing, remove and re-add MON**:
  ```bash
  ceph mon remove <mon_id>
  ceph mon add <mon_id> <ip:port>
  ```

### 🟡 OSD Down / Lost

- **Restart OSD**:
  ```bash
  systemctl restart ceph-osd@<id>
  ```
- **Mark OSD in if safe**:
  ```bash
  ceph osd in <osd_id>
  ```
- **If permanently failed**:
  ```bash
  ceph osd purge <osd_id> --yes-i-really-mean-it
  ```

### 🟠 PGs Stuck in peering / degraded

- **Check PGs**:
  ```bash
  ceph pg dump | grep <pg_id>
  ```
- **Force PG repair**:
  ```bash
  ceph pg repair <pg_id>
  ```
- **Kick stuck OSD**:
  ```bash
  ceph osd out <osd_id>
  ```

### 🔴 Full Cluster / No Free Space

- **Check space**:
  ```bash
  ceph df
  ceph osd df
  ```
- **Add new OSD(s)**.
- **Set nearfull / full ratio to safe values**:
  ```bash
  ceph osd set-nearfull-ratio 0.85
  ceph osd set-full-ratio 0.95
  ```

### 🔧 Stuck Recovery / Backfill

- **Pause recovery temporarily**:
  ```bash
  ceph osd set norecover
  ```
- **Resume after troubleshooting**:
  ```bash
  ceph osd unset norecover
  ```

---

## 🔹 Tuning Flags Cheat Sheet

| Flag          | Command Example              | Use Case                                                                 |
|---------------|------------------------------|-------------------------------------------------------------------------|
| `noout`       | `ceph osd set noout`         | Prevents OSDs marked down from being automatically marked out.          |
| `nobackfill`  | `ceph osd set nobackfill`    | Prevents backfilling to avoid heavy IO load during upgrades or testing. |
| `norebalance` | `ceph osd set norebalance`   | Stops automatic data balancing.                                         |
| `norecover`   | `ceph osd set norecover`     | Disables recovery processes.                                            |
| `pause`       | `ceph osd set pause`         | Pauses client IO cluster-wide (use very carefully!).                    |
| `noscrub`     | `ceph osd set noscrub`       | Disables scrubbing temporarily.                                         |
| `nodeep-scrub`| `ceph osd set nodeep-scrub`  | Disables deep scrubbing temporarily.                                    |

**Always unset flags when done**, e.g.:
```bash
ceph osd unset noout
```

---

## 🔹 Legend (Ceph Terminology)

- **MON (Monitor)** – Maintains cluster maps, ensures quorum.
- **OSD (Object Storage Daemon)** – Stores data, handles replication, recovery, backfill, rebalancing. One OSD = one disk.
- **PG (Placement Group)** – Logical grouping of objects across OSDs. Helps map data to OSDs.
- **CRUSH Map** – Algorithm/map that decides data placement across OSDs.
- **MDS (Metadata Server)** – Manages metadata for CephFS (directories, file ownership, permissions).
- **RADOS** – Reliable Autonomic Distributed Object Store (core of Ceph).
- **RGW (RADOS Gateway)** – S3/Swift-compatible object storage gateway.
- **Scrubbing** – Consistency check between objects and replicas (light = metadata only, deep = full data).
- **Backfill** – Process of redistributing data to OSDs when new OSDs are added or after recovery.
- **Recovery** – Process of replicating data when an OSD fails or comes back online.

---

## 🔹 Best Practices

- **Monitor daily**:
  ```bash
  ceph status
  ceph health detail
  ```
- **Always check PG health after adding/removing OSDs.**
- **Use `ceph osd df` before expansion to balance data distribution.**
- **Regularly backup**:
  - `ceph.conf`
  - Keyrings
  - Monitor DB
- **Schedule scrubbing and monitor for stuck PGs.**
- **Avoid pools with <64 PGs in production.**