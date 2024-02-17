---
created: 2023-07-08T20:32
updated: 2024-02-13T22:41
tags:
  - 笔记
  - 笔记/实验
---

arch/arm/kernel/return_address.c:66:7: error: redefinition of ‘return_address’

在做qemu搭建armLinux实验的时候出现了以上的错误，从错误的提示上面看是重复定义了return_address函数，这里做个笔记！
解决方案
当前要编译的内核文件夹下面：gedit arch/arm/include/asm/ftrace.h(P.S:如果不是ubuntu可以用vim)
源代码：extern inline void *return_address(unsigned int level)
修改为：static inline void *return_address(unsigned int level)
{
return NULL;
}
当前要编译的内核文件夹下面：gedit arch/arm/kernel/return_address.c
源代码：void *return_address(unsigned int level)（这里是第二个return_address，里面只有return NULL一行代码）
{
return NULL;
}
修改为：全部注释掉，或者删除掉
各个版本的方法不一定完全一样，这里我仅仅是在linux3.16.1内核文件下测试，其他版本未测试-_-!
————————————————
版权声明：本文为CSDN博主「AnApplePie」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/u014525494/article/details/53608276