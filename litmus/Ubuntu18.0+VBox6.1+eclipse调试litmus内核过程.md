---
created: 2023-07-08T20:32
updated: 2024-02-13T22:41
tags:
  - 笔记
  - 笔记/实验
---

## Ubuntu18.0+VBox6.1+eclipse调试litmus内核过程
配置过程 [https://blog.csdn.net/qq_38349235/article/details/120240085](https://blog.csdn.net/qq_38349235/article/details/120240085).
**1、设置虚拟机的grub文件**
打开终端，切换到超级用户模式下，编辑/etc/default/grub文件
在文件中找到GRUB_CMDLINE_LINUX_DEFAULT="quiet splash"这一行
改为GRUB_CMDLINE_LINUX_DEFAULT="quiet splash kgdboc=ttyS0,115200 kgdbwait"保存退出
在终端中执行命令更新：update-grub。
重启之后将进入gdb调试
**2、打开虚拟串口**
打开终端执行命令
```javascript
sudo socat -d -d /tmp/vbox pty
```
并将所得到的路径添加到eclipse
Debug Configurations->debugger页签->connection子页签中的device处
apply->debug
![在这里插入图片描述](https://cdn.jsdelivr.net/gh/wsm6636/pic/202302201609332.png)
![在这里插入图片描述](https://cdn.jsdelivr.net/gh/wsm6636/pic/202302201609079.png)
**3、eclipse成功连接到虚拟机后**
在debugger console中，输入命令c，使虚拟机继续运行并开机
**4、虚拟机开机后**
在虚拟机打开终端，进入超级用户模式，执行命令
```javascript
echo g > /proc/sysrq-trigger
```
虚拟机中断，在eclipse中可查看中断信息
**5、输入gdb命令进行调试**
```javascript
b sched_gsn_edf.c:540
```
在sched_gsn_edf.c文件的540行处设置断点（该断点所处位置为task_new函数，将非实时任务转变为实时任务）
在eclipse控制台中输入命令c，使虚拟机继续运行
在虚拟机中切换调度插件为GSN-EDF，并运行实时任务
运行中，非实时任务转变为实时任务触发此断点，切换回eclipse查看相关信息，并进行单步调试等操作，结束后输入c命令使虚拟机继续运行。