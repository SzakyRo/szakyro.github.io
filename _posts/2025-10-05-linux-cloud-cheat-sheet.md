---
layout: post
title: "Cloud & Virtualization Power Cheat Sheet for Sysadmins"
date: 2025-10-05
categories: [Cheat Sheet, Cloud, Virtualization]
tags: [pve, opennebula, kvm, aws, gcp, virtualization, cloud, devops]
---

# ☁️ Cloud & Virtualization Power Cheat Sheet for Sysadmins

Quick commands and notes for real-world hybrid environments (Proxmox, OpenNebula, KVM, AWS, GCP).

---

## 🔹 Proxmox VE (PVE)

### Cluster & Node Management
```bash
pvecm status                         # Check cluster status
pvecm nodes                          # List cluster nodes
pvecm add <node-ip>                  # Join new node to cluster
pvecm expected <number>              # Adjust quorum expectation
```

### VM & Container Management
```bash
qm list                              # List all virtual machines
pct list                             # List all LXC containers
qm start <vmid>                      # Start VM
qm stop <vmid>                       # Stop VM
qm shutdown <vmid> --timeout 30      # Graceful shutdown
```

### Live Migration & Snapshots
```bash
qm migrate <vmid> <target-node> --online  # Live migrate VM
qm snapshot <vmid> preupdate              # Create snapshot
qm rollback <vmid> preupdate              # Rollback snapshot
```

### Backup & Restore
```bash
vzdump <vmid> --storage local --mode snapshot --compress zstd --bwlimit 20000 --ionice 5
qmrestore /var/lib/vz/dump/vzdump-qemu-123.vma.zst <vmid> --unique true
```
**Flags Explained**:
- `--mode snapshot`: No downtime (uses QEMU guest agent)
- `--compress zstd`: Fast compression
- `--bwlimit`: Throttle bandwidth for stability
- `--ionice`: Prioritize I/O scheduling

### Cloud-Init Templates
```bash
qm create 9000 --name "ubuntu-template" --memory 2048 --cores 2 --net0 virtio,bridge=vmbr0
qm importdisk 9000 ubuntu-22.04.qcow2 local-lvm
qm set 9000 --scsihw virtio-scsi-pci --scsi0 local-lvm:vm-9000-disk-0
qm set 9000 --ide2 local-lvm:cloudinit
qm set 9000 --boot c --bootdisk scsi0
qm set 9000 --serial0 socket --vga serial0
qm template 9000
```
💡 **Tip**: Automate template cloning:
```bash
qm clone 9000 101 --name web01 && qm start 101
```

### Performance Tuning
- Enable NUMA and CPU pinning for DB workloads:
  ```bash
  qm set <vmid> --numa 1 --cpulimit 2 --cpu host
  ```
- Ballooning off for latency-sensitive workloads.
- Use VirtIO SCSI single for optimal disk I/O.

---

## 🔹 OpenNebula (CLI for oneadmin)

### Cluster Overview
```bash
onehost list                         # List hosts
onedatastore list                    # Show datastores
onevm list                           # List all VMs
```

### VM Lifecycle
```bash
onevm create template.yaml
onevm show <vmid>
onevm shutdown <vmid>
onevm terminate <vmid>
onevm migrate <vmid> <hostid> --live
```
*Use `--live` for live migration.*

### Templates & Datastores
```bash
onetemplate list
onetemplate instantiate <template_id> --name "web01"
onedatastore show <id>
```

### Image & Snapshot Management
```bash
oneimage create --name "ubuntu22" --path /var/lib/one/images/ubuntu.qcow2 --datastore default
onevm disk-snapshot-create <vmid> <diskid> "before-update"
```

### Hooks & Automation
```bash
cat /etc/one/hooks.d/backup_vm.yaml
# Trigger backups on terminate
```

**Tips**:
- Use persistent images for databases, non-persistent for stateless workloads.
- Integrate with Terraform/OpenNebula provider for IaC.
- Use `oneacct` for billing and resource usage reports.

---

## 🔹 KVM / QEMU / Libvirt

### VM Management
```bash
virsh list --all
virsh start <vmname>
virsh shutdown <vmname>
virsh destroy <vmname>               # Force stop
```

### Create VM
```bash
virt-install --name ubuntu24 --ram 4096 --vcpus 2 \
  --disk path=/var/lib/libvirt/images/ubuntu24.qcow2,size=20,bus=virtio \
  --network bridge=br0,model=virtio \
  --cdrom /iso/ubuntu24.iso
```

### Snapshots
```bash
virsh snapshot-create-as <vm> snap1 "Before patching"
virsh snapshot-list <vm>
virsh snapshot-revert <vm> snap1
```

### Storage & Network
```bash
virsh pool-list
virsh net-list
virsh net-start default
virsh net-destroy default
```

### Advanced Tuning
```bash
virsh edit <vmname>   # Edit XML directly
```
Add:
```xml
<cpu mode='host-passthrough'/>
<numatune>
  <memory mode='strict' nodeset='0'/>
</numatune>
```

💡 **Automation Tip**: Use `virt-sysprep` before distributing base images:
```bash
virt-sysprep -a /var/lib/libvirt/images/base.qcow2 --enable customize
```

---

## 🔹 AWS CLI Essentials

### Configure
```bash
aws configure
```

### EC2 Instance Inventory
```bash
aws ec2 describe-instances \
--query "Reservations[].Instances[].{Name:Tags[?Key=='Name']|[0].Value,PrivateIP:PrivateIpAddress,PublicIP:PublicIpAddress,State:State.Name}" \
--output table
```

### Volumes, Snapshots, and AMIs
```bash
aws ec2 describe-volumes --output table
aws ec2 create-snapshot --volume-id vol-123 --description "Backup before update"
aws ec2 describe-images --owners self
```

### Networking
```bash
aws ec2 describe-vpcs
aws ec2 describe-security-groups
```

### Cost & Usage
```bash
aws ce get-cost-and-usage --time-period Start=2025-10-01,End=2025-10-31 \
--granularity MONTHLY --metrics "UnblendedCost" --output table
```
💡 **Tip**: Use `jq` to extract just what you need:
```bash
aws ec2 describe-instances | jq -r '.Reservations[].Instances[] | [.InstanceId, .State.Name]'
```

---

## 🔹 GCP (gcloud CLI)

### Setup
```bash
gcloud config set project my-project
gcloud auth login
```

### Compute Engine Management
```bash
gcloud compute instances list
gcloud compute instances start web01 --zone=us-central1-a
gcloud compute instances stop web01 --zone=us-central1-a
```

### Networking & Storage
```bash
gcloud compute networks list
gcloud compute firewall-rules list
gcloud storage buckets list
gcloud storage cp file.txt gs://mybucket/
```

### Snapshots & Disks
```bash
gcloud compute disks snapshot mydisk --snapshot-names=snap-before-patch
gcloud compute snapshots list
```

### IAM & Billing
```bash
gcloud projects get-iam-policy my-project
gcloud billing accounts list
```
💡 **Pro Tip**: Simplify SSH access:
```bash
gcloud compute config-ssh
ssh my-vm
```

---

## 🔹 Hybrid Cloud Ops & Automation

### Unified Inventory (Ansible)
```bash
ansible-inventory -i inventory_aws_ec2.yml --graph
ansible-inventory -i inventory_proxmox.yml --list
```

### Terraform Multi-Provider Example
```hcl
provider "proxmox" {
  pm_api_url = "https://pve.local:8006/api2/json"
  pm_user    = "root@pam"
  pm_password = var.pm_password
}

provider "aws" {
  region = "eu-central-1"
}

resource "proxmox_vm_qemu" "web01" {
  name        = "web01"
  target_node = "pve01"
  cores       = 2
  memory      = 2048
  disk {
    size = "20G"
  }
}

resource "aws_instance" "web_backup" {
  ami           = "ami-0abcdef1234567890"
  instance_type = "t3.micro"
  tags = {
    Name = "web-backup"
  }
}
```
So when you run:

```bash
  terraform init
  terraform plan
  terraform apply
```

### Terraform creates:
- A VM called **web01** on **Proxmox**
- An **EC2 instance** called **web-backup** on **AWS**

---

### Monitoring Stack
- **Prometheus**: node_exporter, libvirt_exporter, aws_exporter
- **Grafana**: dashboards per environment
- **Alertmanager**: unified alerting

---

## 🔹 Tips & Best Practices

### Networking
- Use separate VLANs for management, storage, and guest.
- Implement bonded NICs for redundancy.

### Performance
- Enable CPU passthrough & NUMA for DB workloads.
- Always enable VirtIO drivers in guests.

### Security
- Use cloud-init with SSH keys only — no passwords.
- Rotate cloud credentials regularly.

### Automation
- Centralize IaC in Git + CI/CD.
- Schedule backups and test restores monthly.

### Cost Optimization
- **AWS**: Use spot instances where possible.
- **GCP**: Use committed use discounts.
- **PVE/OpenNebula**: Use thin-provisioned storage.