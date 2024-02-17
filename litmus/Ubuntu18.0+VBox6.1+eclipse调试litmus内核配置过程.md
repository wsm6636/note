---
created: 2023-07-08T20:32
updated: 2024-02-13T22:41
tags:
  - 笔记
  - 笔记/实验
---

@[TOC](Ubuntu18.0+VBox6.1+eclipse调试litmus内核配置过程)
目标机：Vbox6.1，litmus（官网下载litmus-2016.1.qcow），Linux4.1.3
开发机：Ubuntu18.0，Linux4.18，eclipse2021-06R，socat（串口）
## 开发机配置
安装java环境
```javascript
sudo apt-get install default-jre
```
安装eclipse c/c++，
 [https://www.eclipse.org/downloads/packages/release/2021-06/r](https://www.eclipse.org/downloads/packages/release/2021-06/r).
安装socat
```javascript
sudo apt-get install socat
```
Ps.如果是minicom的创建虚拟串口，会导致gdb报错，gdb和minicom无法同时使用
## 目标机（虚拟机）配置
在开发机Ubuntu18.0下安装虚拟机
虚拟机下载地址：
[https://www.oracle.com/virtualization/technologies/vm/downloads/virtualbox-downloads.html](https://www.oracle.com/virtualization/technologies/vm/downloads/virtualbox-downloads.html)

虚拟机配置：
内存2G，4核，显存32M，桥接网络，串口：COM1主机管道（/tmp/vbox）

将/opt/litmus-rt/ 拷贝到开发机/home/wsm/1

如果ssh连接服务器的时候报错:Permission denied, please try again.
可参考 [https://cloud.tencent.com/developer/article/1454777](https://cloud.tencent.com/developer/article/1454777).
## 串口连接
目标机（虚拟机）：
```javascript
sudo stty ispeed 115200 ospeed 115200 -F /dev/ttyS0
```
将COM1端口的输入输出波特率都设为115200。
开发机：需要虚拟机是开启的状态
```javascript
sudo socat -d -d /tmp/vbox pty
```
![在这里插入图片描述](https://cdn.jsdelivr.net/gh/wsm6636/pic/202302201608749.png)

测试是否连通（root）
开发机：
```javascript
cat /dev/pts/2 
```
目标机：
```javascript
echo 1 > /dev/ttyS0
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/fb10b7a0bd8944d083531109169527b8.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAcXFfMzgzNDkyMzU=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
![在这里插入图片描述](https://img-blog.csdnimg.cn/dd0fff924dbc4ea09ea81c22c3d09b84.png#pic_center)

## 建立eclipse工程

window-->preferences-->General-->Workspace 去掉 Build Automatically
![在这里插入图片描述](https://cdn.jsdelivr.net/gh/wsm6636/pic/202302201608163.png)
window-->preferences-->C/C++-->indexer 去掉 Enable indexer
![在这里插入图片描述](https://img-blog.csdnimg.cn/8369077a0b004121b494cc13a9f4284c.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAcXFfMzgzNDkyMzU=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)

新建工程file-->new-->c project-->project name（自己命名）
去掉use default location
location输入框中选择你的litmus-rt路径
project type 选择 Makefile project-Empty project 
Toolschains选择Linux GCC
![在这里插入图片描述](https://cdn.jsdelivr.net/gh/wsm6636/pic/202302201608028.png)
next-->Advanced Setting-->C/C++ Build-->去掉勾选use default build command， 
build command输入框内写上 make CONFIG_DEBUG_SECTION_MISMATCH=y -j2，
build directory选择你的litmus-rt路径。
![在这里插入图片描述](https://cdn.jsdelivr.net/gh/wsm6636/pic/202302201608644.png)
![在这里插入图片描述](https://cdn.jsdelivr.net/gh/wsm6636/pic/202302201608969.png)

Behavior页签 Build(Increament build) 输入框中输入一个空格。然后完成工程创建。
![在这里插入图片描述](https://img-blog.csdnimg.cn/55e731fc0e93492c9187743079ed7bc6.png?x-oss-process=image/watermark,type_ZHJvaWRzYW5zZmFsbGJhY2s,shadow_50,text_Q1NETiBAcXFfMzgzNDkyMzU=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
![在这里插入图片描述](https://cdn.jsdelivr.net/gh/wsm6636/pic/202302201608608.png)
RunDebug--> Configurations-->C/C++ Remote Application(双击)-->proiect（刚刚创建的）
C/C++ Application选择litmus-rt路径下的vmlinux
选中 Disable auto build 
点击select other 选择 GDB(DSF)Manual Remote Debugging...
![在这里插入图片描述](https://cdn.jsdelivr.net/gh/wsm6636/pic/202302201608885.png)
![在这里插入图片描述](https://cdn.jsdelivr.net/gh/wsm6636/pic/202302201608983.png)
debugger页签-->connection，type选择Serial， speed选择115200，dev填socat创建的串口，完成配置。![在这里插入图片描述](https://cdn.jsdelivr.net/gh/wsm6636/pic/202302201608874.png)
![在这里插入图片描述](https://cdn.jsdelivr.net/gh/wsm6636/pic/202302201608423.png)

## 调试
先开虚拟机，在选择内核页面等待，在开发机终端开启虚拟串口，在虚拟机编辑内核启动项，开发机打开gdb或eclipse进行debug
![在这里插入图片描述](https://cdn.jsdelivr.net/gh/wsm6636/pic/202302201608688.png)

![在这里插入图片描述](https://cdn.jsdelivr.net/gh/wsm6636/pic/202302201608460.png)
如果有权限错误，修改串口权限 
```javascript
chmod 666 /dev/pts/2
```

![在这里插入图片描述](https://cdn.jsdelivr.net/gh/wsm6636/pic/202302201608545.png)
调试过程[https://blog.csdn.net/qq_38349235/article/details/120413804](https://blog.csdn.net/qq_38349235/article/details/120413804).
## 参考

[https://blog.csdn.net/nancygreen/article/details/12291097](https://blog.csdn.net/nancygreen/article/details/12291097)
[https://www.cnblogs.com/simoncook/p/9662060.html](https://www.cnblogs.com/simoncook/p/9662060.html)