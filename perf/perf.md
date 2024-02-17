---
created: 2023-07-08T20:32
updated: 2024-02-13T22:41
tags:
  - 笔记
  - 笔记/实验
---

# perf probe

## 树莓派perf安装 

针对5.15内核

使用apt直接下载的5.10版本不兼容，需要源码安装

源码下载地址：[https://mirror.bjtu.edu.cn/kernel/linux/kernel/tools/perf/v5.15.0/perf-5.15.0.tar.gz](https://mirror.bjtu.edu.cn/kernel/linux/kernel/tools/perf/v5.15.0/perf-5.15.0.tar.gz)

编译环境和依赖参考：[https://zhuanlan.zhihu.com/p/446319798](https://zhuanlan.zhihu.com/p/446319798)

```javascrip
tar xzvf linux-5.15.0.tar.gz
cd perf-5.15.0/tools/perf
make -j4 && make install 
cp ./perf /usr/bin
```
## perf probe
### 配置

开启以下内核选项
```javascrip
CONFIG_UPROBE_EVENTS=y
CONFIG_MODULES=y
CONFIG_KALLSYMS=y
CONFIG_HIGH_RES_TIMERS=y
CONFIG_TRACEPOINTS=y
```
开启后可在```/sys/kernel/debug/tracing```目录下找到
```uprobe_events```和```uprobe_profile```

### 使用
[https://man7.org/linux/man-pages/man1/perf-probe.1.html](https://man7.org/linux/man-pages/man1/perf-probe.1.html)

测试程序
```java
//test.c
#include <stdio.h>
void show(){
        printf("test function\n");
}

int main()
{

        printf("this is main\n");
        for(int i=0; i<10;i++){
                        show();
                        sleep(1);
                }
        return 0;
}
```

debug编译
```javascrip
gcc -g -o test test.c

#cmake 开启debug选项
#-DCMAKE_BUILD_TYPE=Debug
```

创建探针
```
#对test程序中的函数“show”创建探针，并定义一个名为show_entry的事件
sudo perf probe -x ./test show_entry=show
#对test.c源文件第五行创建探针，并定义一个名为show_5的事件
sudo perf probe -x ./test show_5=test.c:5
```
在```/sys/kernel/debug/tracing/events```目录下可找到perf工具自动添加的事件组```probe_test```（根据被添加探针的可执行程序命名）

在此事件组下可看到```show_entry```和```show_5```事件已添加

启用perf record追踪
```javascrip
# “-e” 选项选择需要追踪探针对应的，“事件组：事件名”
#perf record命令默认在运行目录下生成perf.data文件（指定文件名需要-o选项）
sudo perf record -e probe_test:show_entry -e probe_test:show_5 ./test
```


通过perf script获取可读文件
```javascrip
#默认识别运行目录下的perf.data文件（指定文件需要-i选项）
sudo perf script
```

结果
```
test 15423 [002] 12704.994176: probe_test:show_entry: (555b8f07b4)
test 15423 [002] 12704.994209:     probe_test:show_5: (555b8f07bc)
test 15423 [002] 12705.994374: probe_test:show_entry: (555b8f07b4)
test 15423 [002] 12705.994385:     probe_test:show_5: (555b8f07bc)
......
```

| name | pid | CPU | time/us | group:event | address |
| :----------: | :----------: | :----------: | :----------: | :----------: | :----------: |
| test |   15423   | [002] | 12704.994176 | probe_test:show_entry |(555b8f07b4) |

删除探针
```javascript
 sudo perf probe -d  probe_test:show_5
```

### 其他方式使用uprobe
[https://www.kernel.org/doc/html/latest/trace/uprobetracer.html](https://www.kernel.org/doc/html/latest/trace/uprobetracer.html)

perf record只有一个当前程序的追踪信息

对于同时运行的两个程序，分别创建完探针后

在```/sys/kernel/debug/tracing/```目录下，通过echo写入方式开启需要的事件（下面的例子为开启对应组内所有事件的追踪）
```javascript
echo 1 > events/probe_test/enable 
echo 1 > events/probe_testnew/enable
  ```
清空追踪区缓存后开启追踪并运行程序
```javascript
//关闭追踪
echo 0 > tracing_on 
//清空缓存
echo > trace
//开启追踪
echo 1 > tracing_on 
//运行程序
……
```
程序执行完毕后，关闭追踪和探针，输出结果
```javascript
//关闭追踪
echo 0 > tracing_on 
//关闭探针
echo 0 > events/probe_test/enable 
echo 0 > events/probe_testnew/enable
//获取结果
cat trace > /home/pi/testdata.txt
```