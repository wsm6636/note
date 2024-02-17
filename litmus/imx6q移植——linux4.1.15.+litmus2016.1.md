---
created: 2023-07-08T20:32
updated: 2024-02-13T22:41
tags:
  - 笔记
  - 笔记/实验
---

@[TOC](imx6q移植——linux4.1.15.+litmus2016.1)
开发板：OKMX6X-C
环境：Vmware16 Pro+Ubuntu18.0
# 编译环境搭建
下载OKMX6X-C的官方资料，根据用户手册操作
## 安装
将目录“OKMX6X-C_Linux4.1.15 用户资料\Linux\工具\交叉编译工具”下的安装脚本拷贝到虚拟机任意位置，并在该目录下执行
```javascript
wsm@ubuntu:~$ ./fsl-imx-x11-glibc-x86_64-meta-toolchain-qt5-cortexa9hf-neon-toolchain-4.1.15-2.1.0.sh
```
命令行会提示如下，连续按两次回车，脚本将自动安装
![在这里插入图片描述](https://cdn.jsdelivr.net/gh/wsm6636/pic/202302201611517.png)
## 设置环境变量
```javascript
wsm@ubuntu:~$ . /opt/fsl-imx-x11/4.1.15-2.1.0/environment-setup-cortexa9hf-neon-poky-linux-gnueabi
```
## 检查编译器是否安装成功
 arm-poky-linux-gnueabi-gcc -v
![在这里插入图片描述](https://img-blog.csdnimg.cn/30e640366c484e9fad044c8fb7e9acf1.png?x-oss-process=image/watermark,type_d3F5LXplbmhlaQ,shadow_50,text_Q1NETiBAcXFfMzgzNDkyMzU=,size_20,color_FFFFFF,t_70,g_se,x_16#pic_center)
# 编译 u-boot
拷贝开发板自带的uboot源码到虚拟机
解压->进入源码目录->加载环境变量（此处为默认路径）->编译 uboot 映像

```javascript
wsm@ubuntu:~$ tar jxvf u-boot-2016.03-r0.tar.bz2 
wsm@ubuntu:~$ cd u-boot-2016.03-r0
wsm@ubuntu:~/u-boot-2016.03-r0$ . /opt/fsl-imx-x11/4.1.15-2.1.0/environment-setup-cortexa9hf-neon-poky-linux-gnueab
wsm@ubuntu:~/u-boot-2016.03-r0$ ./build_6x_c.sh
```
# 编译内核
## linux4.1.15内核
将开发板自带的linux4.1.15源码拷贝到虚拟机
解压->进入源码目录->加载环境变量（此处为默认路径）
```javascript
wsm@ubuntu:~$ tar jxvf linux-4.1.15.tar.bz2 
wsm@ubuntu:~$ cd linux-4.1.15
wsm@ubuntu:~/linux-4.1.15$ . /opt/fsl-imx-x11/4.1.15-2.1.0/environment-setup-cortexa9hf-neon-poky-linux-gnueab
```
## litmus补丁
在linux4.1.15的基础上，加载litmus2016补丁
```javascript
wsm@ubuntu:~$ wget http://www.litmus-rt.org/releases/2016.1/litmus-rt-2016.1.patch
wsm@ubuntu:~$ mv linux-4.1.5 litmus-rt
wsm@ubuntu:~$ cd litmus-rt
wsm@ubuntu:~/litmus-rt$ patch -p1 < ../litmus-rt-2016.1.patch
```
## 配置内核
```javascript
wsm@ubuntu:~/litmus-rt$ make distclean
wsm@ubuntu:~/litmus-rt$ make imx_v7_defconfig
wsm@ubuntu:~/litmus-rt$ make menuconfig
```
根据litmus官网手册进行配置
ps.官网为linux4.9+litmus2017版本，配置选项的位置有一定差别
 [http://www.litmus-rt.org/installation.html#adjustingconfigurationoptionsforlitmusrt](http://www.litmus-rt.org/installation.html#adjustingconfigurationoptionsforlitmusrt).

 ### step1. 添加可识别版本
 General setup->Local version - append to kernel release.
![在这里插入图片描述](https://img-blog.csdnimg.cn/bef8078c12ec41248eea79b302c1e529.png#pic_center)
 ### step2. 启用内核抢占
 Kernel Features->Preemption model->Preemptible Kernel (Low-Latency Desktop).
![在这里插入图片描述](https://cdn.jsdelivr.net/gh/wsm6636/pic/202302201611308.png)
 ### step3. 禁用组调度
General setup->Automatic process group scheduling.
General setup-> Control group support->CPU controller，禁用Group scheduling for SCHED_OTHER
![在这里插入图片描述](https://cdn.jsdelivr.net/gh/wsm6636/pic/202302201611685.png)
![在这里插入图片描述](https://cdn.jsdelivr.net/gh/wsm6636/pic/202302201611757.png)
 ### step4. 禁用影响定时器频率的频率缩放和电源管理选项
 General setup-> Timers subsystem->Timer tick handling，将选项设置为constant rate, no dynticks.
![在这里插入图片描述](https://cdn.jsdelivr.net/gh/wsm6636/pic/202302201611109.png)
Power management options  禁用Suspend to RAM and standby, Hibernation 和 Opportunistic sleep
![在这里插入图片描述](https://cdn.jsdelivr.net/gh/wsm6636/pic/202302201611311.png)
   CPU Power Management-> CPU Frequency scaling 禁用CPU Frequency scaling
![在这里插入图片描述](https://cdn.jsdelivr.net/gh/wsm6636/pic/202302201611197.png)
 ### step5. 禁用Wireless LAN 
  Device Drivers-> Network device support->Wireless LAN 
否则内核编译报错
![在这里插入图片描述](https://cdn.jsdelivr.net/gh/wsm6636/pic/202302201612295.png)
![报错](https://cdn.jsdelivr.net/gh/wsm6636/pic/202302201612100.png)
 ### step6. 开启litmus trace
 LITMUS^RT->Tracing->TRACE() debugging
 ![在这里插入图片描述](https://cdn.jsdelivr.net/gh/wsm6636/pic/202302201612693.png)

 ### step7. 修改busfreq-imx.c
‘/litmus-rt/arch/arm/mach-imx/busfreq-imx.c’
注释掉以下两部分，否则编译报错
```javascript
int register_busfreq_notifier(struct notifier_block *nb)
...
147行到157行
...
EXPORT_SYMBOL(unregister_busfreq_notifier);
```
```javascript
void request_bus_freq(enum bus_freq_mode mode)
...
727行到855行
...
EXPORT_SYMBOL(get_bus_freq_mode);
```
## 编译内核

```javascript
wsm@ubuntu:~/litmus-rt$ make zImage -j8
wsm@ubuntu:~/litmus-rt$ make dtbs -j8
wsm@ubuntu:~/litmus-rt$ make modules -j8 
```
# 制作 rootfs
拷贝开发板自带的rootfs源码到虚拟机
解压->进入源码目录
```javascript
wsm@ubuntu:~$ tar jxvf rootfs.tar.bz2
wsm@ubuntu:~$ cd litmus-rt
wsm@ubuntu:~/litmus-rt$ make modules_install INSTALL_MOD_PATH=/home/wsm/rootfs/
(改为自己的rootfs路径)
wsm@ubuntu:~/litmus-rt$ cd ../rootfs/
wsm@ubuntu:~/rootfs$ ./build.sh 
```
# 移植到开发板
采用usb烧写（其他方法请参考用户手册）
**step1.** 拷贝编译好的镜像到烧写工具目录下

```bash
USB烧写工具\mfgtools\Profiles\Linux\OS Firmware\files\okmx6-c
```

**uboot目录下的**
-  u-boot-6dl.imx
-  u-boot-6q.imx
-  u-boot-6dl-2g.imx
-  u-boot-6q-2g.imx

**rootfs目录下的**
-  rootfs.tar.bz2

**litmus-rt目录下的**
-  zImage
-  imx6q-c-sabresd.dtb
- imx6dl-c-sabresd.dtb

**step2.** 连接开发板的OTG，串口及电源线
**step3.** 打开自带烧写工具（其一）
mfgtool2-mx6qdl-c-sabresd-emmc.vbs（用于 1G 内存的烧写）
mfgtool2-mx6qdl-2g-c-sabresd-emmc.vbs（用于 2G 内存的烧写）
**step4.** 拨码开关设置为 1ON，2 OFF，3、4 X。重新上电或者按下重启键，确认烧写工具识别 HID 设备（如果一直不显示识别，看一下是不是被虚拟机影响了）
![在这里插入图片描述](https://cdn.jsdelivr.net/gh/wsm6636/pic/202302201612212.png)
**step5.** 到烧写完成，看见 DONE 之后先点击 stop，再点击 exit 退出即可
（烧写时间太长，直接copy了手册的图）
![在这里插入图片描述](https://cdn.jsdelivr.net/gh/wsm6636/pic/202302201612171.png)
# 注意
为什么选用linux4.1.15+litmus2016
是由于即使只用nxp发布的linux4.9版本内核，烧写之后，也会在启动过程中卡死，更无法添加litmus2017补丁 
卡死时的日志：[https://ask.csdn.net/questions/7628299](https://ask.csdn.net/questions/7628299).
如果有大佬能有这个问题的解决办法，球球告诉我QAQ

litmus的用户库和trace工具移植
 [https://blog.csdn.net/qq_38349235/article/details/122628733](https://blog.csdn.net/qq_38349235/article/details/122628733).