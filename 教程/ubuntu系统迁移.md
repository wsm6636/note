---
created: 2023-07-18T22:55
updated: 2024-02-13T22:39
tags:
  - 笔记
  - 笔记/教程
---

# ubuntu22系统迁移

[Linux 系统迁移指北（2022版） - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/529864504)

[Ubuntu18.04系统备份迁移手册 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/126228018)

[记录Ubuntu 18系统迁移 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/441307061#:~:text=〇 总体流程 [1] 1 将旧的Ubuntu打包并存放到硬盘里，具体放在哪里不是特别重要，只要后面通过启动盘“Try Unbuntu”能找到就行； 2,接着在目标硬盘里建立Ubuntu的分区表； 3 把旧Ubuntu的压缩包解压到目标硬盘上相应的分区里； 4 用vim打开并修改目标盘中的%2Fetc%2Ffstab，使里面的uuid与目标盘的几个分区对应； 5 安装boot-repair重建引导。)

[Ubuntu20.04系统迁移（将系统迁移到新硬盘） - 简书 (jianshu.com)](https://www.jianshu.com/p/8b067b9bab2c)

## 1 准备

### 1.1 ubuntu启动盘

[使用第三方工具Rufus制作Windows系统启动U盘 - 知乎 (zhihu.com)](https://zhuanlan.zhihu.com/p/139503589#:~:text=1.1 下载制作工具Rufus 1.2 下载系统镜像 1.3 准备一个大小至少为8GB的U盘（请提前备份U盘上的资料，制作过程中会格式化U盘） 二.制作系统启动U盘 2.1,2.3 根据待安装系统的电脑的硬盘的分区类型选择相应的分区类型 2.4 点击 开始 >> 在弹框中点击 确定)

旧系统 ubuntu22

启动盘 ubuntu22

### 1.2 移动硬盘

50g以上

## 2 备份旧系统

### 2.1 在旧系统下，获取最高权限

```shell
sudo su
```

### 2.2 查看分区情况

通过ubuntu自带的磁盘工具查看分区情况

看有星号的是当前系统的分区（图上是迁移之后的，旧系统没存）

![image-20230719121643671](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307191216818.png)

记录下挂载点，分区，uuid，格式，大小

![image-20230719125909842](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307191259952.png)

需要备份的分区有/boot和/（没有把/home单独挂出去，有的话也需要）

efi和Windows在一起不需要动

### 2.3 挂载

在/mnt下新建目录，boot_old，root_old，data。分别用于挂载boot和根目录，存储备份的压缩包。

```shell
cd /mnt
mkdir boot_old root_old data
mount /dev/sda3 boot_old
mount /dev/sda5 root_old
tar -cvpzf data/ubuntu_boot_backup.tar.gz  boot_old/
tar -cvpzf data/ubuntu_root_backup.tar.gz --exclude=root_old/proc --exclude=root_old/tmp\
--exclude=root_old/lost+found --exclude=root_old/media\
--exclude=root_old/mnt --exclude=root_old/run root_old
umount /dev/sda3
umount /dev/sda5
```

> 去掉几个不需要的文件夹和单独打包的文件夹

### 2.4 拷贝到移动硬盘

把data里面的压缩包拷贝到移动硬盘

## 3 在新硬盘上分区

### 3.1 bios设置通过启动盘启动

### 3.2 进入try ubuntu

### 3.3 通过自带的gparted工具分区

将新硬盘分为/，/boot，交换分区。注意格式和大小（保证旧系统文件解压空间足够）

记录下新uuid和分区

![](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307191259150.png)

## 4 解压

### 4.1 挂载

在/mnt下新建目录，boot，root，data。

```shell
sudo su
cd /mnt
mkdir boot root data
```

将移动硬盘的压缩包拷贝到data

挂载新系统创建的分区

```shell
mount /dev/sdb3 boot
mount /dev/sdb4 root
```

解压

```shell
tar -xzvpf data/ubuntu_boot_backup.tar.gz -C boot/
tar -xzvpf data/ubuntu_root_backup.tar.gz -C root/
```

解压之后的目录可能是/mnt/boot/boot_old/boot

把boot和root文件mv到/mnt/boot和/mnt/root

## 5 修改uuid

安装vim

修改挂载解压过来的文件

```shell
vim /mnt/root/etc/fstab
```

对照旧系统uuid和分区，修改为新系统的

## 6 修复引导

下载boot-repair，更新grub

```shell
sudo add-apt-repository ppa:yannubuntu/boot-repair
sudo apt-get update
sudo apt-get install boot-repair
boot-repair
sudo update-grub
```

注意在高级选项中把boot分区选成新系统的

## 7 重启

拔掉启动盘，重启

如图，ubuntu为旧系统，kylin为新系统

![2522ca64dcc60f6370d4cb6c435370b](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307191321349.jpg)

如果没引导菜单，直接进入Windows或者ubuntu，通过启动盘的try ubuntu再次修复引导。

## 8 删除旧系统

确认新系统正常之后

重启进入Windows，将旧系统硬盘格式化

通过启动盘的try ubuntu再次修复引导

重启后grub只有三个选项：

- ubuntu（新系统的）
- advanced
- Windows