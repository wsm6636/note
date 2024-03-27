---
created: 2023-07-08T20:32
updated: 2024-03-26T23:32
tags:
  - 笔记
  - 笔记/实验
---

# cpuset

## Kernel config

配置以下内核选项
```javascript
CONFIG_NO_HZ_FULL=y
CONFIG_CPUSETS=y
CONFIG_TRACING=y
```
## cmdline
配置引导参数
```javascript
//隔离cpu3 /boot/cmdline.txt 重启生效
nohz_full=3
```
## init cpuset
在超级用户权限下

```javascript
mkdir /sys/fs/cgroup/cpuset
mount -t cgroup -ocpuset cpuset /sys/fs/cgroup/cpuset
```
## 分配内核
CPU 0-2运行其他任务，CPU 3被隔离
```javascript
cd /sys/fs/cgroup/cpuset
mkdir housekeeping
mkdir isolated
echo 0-2 >  housekeeping/cpuset.cpus
echo 0 > housekeeping/cpuset.mems
echo 3 > isolated/cpuset.cpus
echo 0 > isolated/cpuset.mems
echo 0 > cpuset.sched_load_balance 
echo 0 > isolated/cpuset.sched_load_balance
while read P
do
  echo $P > housekeeping/cgroup.procs
done < cgroup.procs
```


## disable irq
```javascript
#disableirq.sh
# Migrate irqs to CPU 0-2 (exclude CPU 3)
for I in $(ls /proc/irq)
do
    if [[ -d "/proc/irq/$I" ]]
    then
        echo "Affining vector $I to CPUs 0-2"
        echo 0-2 > /proc/irq/$I/smp_affinity_list
    fi
done
```
## disable sched_rt_runtime_us
```javascript
echo -1 > /proc/sys/kernel/sched_rt_runtime_us #disable
echo 950000 > /proc/sys/kernel/sched_rt_runtime_us #enable default value
```
## example
如何使程序运行到被隔离的CPU
```javascript
#include <stdio.h>
#include <fcntl.h>
#include <unistd.h>
#include <errno.h>
int main(void)
{
    // Move the current task to the isolated cgroup (bind to CPU 3)
    
    int fd = open("/sys/fs/cgroup/cpuset/isolated/cgroup.procs", O_WRONLY);
    if (fd < 0) {
        perror("Can't open cpuset file...\n");
        return 0;
    }
    // 将写此文件的进程加入到isolated组内，即该进程被划分到CPU3执行
    write(fd, "0\n", 2);
    close(fd);
   
    // 其他操作
    while (1)
        ;
   
    return 0;
}
```
## trace
### trace on
```javascript
#traceon.sh
TRACING=/sys/kernel/debug/tracing/    #配置路径
echo 0 > $TRACING/tracing_on   #关闭追踪
echo > $TRACING/trace   #清空之前的数据
echo 1 > $TRACING/events/sched/sched_switch/enable   #记录来自其他任务的干扰
echo 1 > /sys/kernel/debug/tracing/events/irq/enable   #记录中断的干扰
echo 1 > $TRACING/tracing_on   #开启追踪
```
### trace off
```javascript
echo 0 > $TRACING/tracing_on   #关闭追踪
cat $TRACING/per_cpu/cpu3/trace > trace.3 #获取只有cpu3的trace结果
cat $TRACING/trace  > tracedata.txt #获取所有CPU的trace结果
```