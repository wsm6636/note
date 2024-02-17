---
created: 2023-07-08T20:32
updated: 2024-02-13T22:41
tags:
  - 笔记
  - 笔记/实验
---

**将qcow文件转换为vdi格式**
```javascript
VBoxManage clonehd litmus-2016.1.qcow/litmus-2016.1.qcow litmus-2016.1.vdi --format VDI --variant Standard
```

**改变vdi文件大小**
```javascript
VBoxManage modifyhd litmus-2016.1.vdi --resize 20480
```
**通过GParted扩展根目录**
安装GParted
```javascript
sudo apt-get install gparted
```
启动GParted
```javascript
sudo gparted
```
找到/dev/sda5，通过右键“Swapoff”来消除禁用编辑状态

删除/dev/sda2和/dev/sda5分区(右键“Delete”删除)

右键选中的/dev/sda1分区，单击“Resize/Move”，分配新的磁盘空间。（注意留出足够空间用于分配/dev/sda2和/dev/sda5分区）

设置完成之后，单击右下角的“Resize”完成分区扩容。

**重新添加/dev/sda2和/dev/sda5分区**
右键“unallocated”分区，单击弹出选框中的“New”进行分区设置。Create as设置为"Extended Partition"，Lable设置为/dev/sda2，最后单击“Add”，添加/dev/sda2分区。

在添加dev/sda2分区的基础上，同样通过右键“unallocated”分区来新增/dev/sda5分区。分别设置Create as为"Logical Partition"，File system为linux-swap，Lable为/dev/sda5。最后单击“Add”，添加/dev/sda5分区。
最后单击“对勾”保存分区结果并重启

ubuntu22+gparted1.3.1
需要sudo su
https://blog.csdn.net/weixin_44394801/article/details/115946478
参考
 [https://forums.virtualbox.org/viewtopic.php?t=50661](https://forums.virtualbox.org/viewtopic.php?t=50661).
  [https://blog.csdn.net/Allen101zhang/article/details/103726250](https://blog.csdn.net/Allen101zhang/article/details/103726250).