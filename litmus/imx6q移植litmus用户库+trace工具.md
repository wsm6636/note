---
created: 2023-07-08T20:32
updated: 2024-02-13T22:41
tags:
  - 笔记
  - 笔记/实验
---

@[TOC](imx6q移植litmus用户库+trace工具)
 [litmus内核移植](https://blog.csdn.net/qq_38349235/article/details/122578766?spm=1001.2014.3001.5502).
# liblitmus
1、下载并解压liblitmus（确保liblitmus与litmus内核在同一路径下）
```
wget http://www.litmus-rt.org/releases/2016.1/liblitmus-2016.1.tgz
tar xzf liblitmus-2016.1.tgz
```
2、导入liblitmus-config
```
cd liblitmus 
wget http://www.litmus-rt.org/releases/2016.1/liblitmus-config
mv liblitmus-config .config
```
3、加载环境变量
```
. /opt/fsl-imx-x11/4.1.15-2.1.0/environment-setup-cortexa9hf-neon-poky-linux-gnueab
```
4、修改Makefile
```
#CC  := ${CROSS_COMPILE}${CC}
#LD  := ${CROSS_COMPILE}${LD}
#AR  := ${CROSS_COMPILE}${AR}
注释掉上面三行，改为下面的
CC  := ${CC}
LD  := ${LD}
AR  := ${AR}
```
否则make报错

`/bin/sh: 2: arm-poky-linux-gnueabi-arm-poky-linux-gnueabi-gcc: not found`

5、编译并移植
```
make
```
将setsched、showsched、rtspin……等有需要的可执行文件拷贝到rootfs/bin目录下

# Feather-Trace Tools
1、下载并解压Feather-Trace Tools（确保Feather-Trace Tools与litmus内核在同一路径下）
```
wget http://www.litmus-rt.org/releases/2016.1/ft_tools-2016.1.tgz
tar xzf ft_tools-2016.1.tgz
```
2、导入ft_tools-config
```
cd ft_tools 
wget http://www.litmus-rt.org/releases/2016.1/ft_tools-config
mv ft_tools-config .config
```
3、加载环境变量
```
. /opt/fsl-imx-x11/4.1.15-2.1.0/environment-setup-cortexa9hf-neon-poky-linux-gnueab
```
4、修改Makefile
打开liblitmus/inc/config.makefile
```
CC  = /opt/fsl-imx-x11/4.1.15-2.1.0/sysroots/x86_64-pokysdk-linux/usr/bin/arm-poky-linux-gnueabi/arm-poky-linux-gnueabi-gcc \
在后面加上下面两个（sysroot由交叉编译链安装位置决定）
--sysroot=/opt/fsl-imx-x11/4.1.15-2.1.0/sysroots/cortexa9hf-neon-poky-linux-gnueabi -mfloat-abi=hard
```
否则出现缺少文件等错误
`error: no include path in which to search for limits.h`
`error: stdio.h: No such file or directory `
`error: unknown machine mode '__TC__'`
`crt1.o: No such file or directory`
`cannot find -lgcc_s`
`/real-ld: cannot find`
5、编译并移植
```
make
```
将ft-trace-overheads、st-trace-schedule……等有需要的可执行文件拷贝到rootfs/bin目录下
# 更新rootfs
在rootfs目录下，执行
```
./build.sh
```
之后拷贝到烧写工具对应目录下，重新烧写（参考litmus内核烧写或官方手册）

参考链接: [https://community.nxp.com/t5/i-MX-Processors/cannot-find-crt1-o/m-p/494926#M79562](https://community.nxp.com/t5/i-MX-Processors/cannot-find-crt1-o/m-p/494926#M79562).