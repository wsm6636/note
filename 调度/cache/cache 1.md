---
created: 2023-07-08T20:33
updated: 2024-02-13T22:38
tags:
  - 笔记
  - 笔记/文献笔记
---

## cache partition

### TCPS: a task and cache-aware partitioned scheduler for hard real-time multi-core systems

[TCPS: a task and cache-aware partitioned scheduler for hard real-time multi-core systems | Proceedings of the 23rd ACM SIGPLAN/SIGBED International Conference on Languages, Compilers, and Tools for Embedded Systems](https://dl.acm.org/doi/abs/10.1145/3519941.3535067)
在本文中，我们提出了一个启发式的分区调度器，称为TCPS，用于实时非抢占式多核系统的分区缓存。系统的分区缓存。为了实现高度的可调度性，TCPS结合了分区调度和缓存分区的优点。将其与各种全局和分区调度进行比较。TCPS在调度性方面优于所有这些调度技术，并且产生一个更有效的缓存使用和更稳定的负载平衡。

### Cache Interference-aware Task Partitioning for Non-preemptive Real-time Multi-core Systems

[Cache Interference-aware Task Partitioning for Non-preemptive Real-time Multi-core Systems | ACM Transactions on Embedded Computing Systems](https://dl.acm.org/doi/abs/10.1145/3487581)

在存在共享高速缓存干扰的情况下进行分区调度。CITTA，一种缓存干扰感知的任务分区算法。分析了集合关联指令和数据缓存的两个程序之间的共享缓存干扰。构建了一个整数编程公式来计算一个任务所表现出来的缓存干扰的上限。CITTA在认为可调度的任务集方面优于全局EDF调度和贪婪分区方法。

与上述基于高速缓存分区技术的方法不同，我们解决的是我们解决的是在存在共享缓存干扰的情况下的任务划分问题。我们的方法既不需要为页面着色而修改操作系统，也不需要为高速缓存锁定而修改硬件功能、大多数现有的嵌入式处理器都不支持这些功能。



### Holistic Resource Allocation Under Federated Scheduling for Parallel Real-time Tasks

[Holistic Resource Allocation Under Federated Scheduling for Parallel Real-time Tasks | ACM Transactions on Embedded Computing Systems](https://dl.acm.org/doi/abs/10.1145/3489467)

并行实时任务联合调度，为每个并行任务分配一组专用内核，通过确保处理资源的独占使用来减少干扰。但核心仍然共享最后一级缓存和内存带宽资源。为联合调度下的并行实时任务提出了一个整体的资源分配框架。除了专用的内核外，每个并行任务还被分配了专用的缓存和内存带宽资源。提出了一个整体的资源分配算法。通过用英特尔的高速缓存分配技术和MemGuard扩展联合调度系统。

## LAG

LAG-based Analysis Techniques for Scheduling Multiprocessor Hard Real-Time Sporadic DAGs

Analysis Techniques for Supporting Hard Real-Time Sporadic Gang Task Systems

Tardiness Bounds under Global EDF Scheduling on a Multiprocessor



  const colors = ["#FF9999","#FFDBBB", "#FFFFBB", "#BBFFBB", "#bbffff", "#fbc2eb","#e0c3fc","#d9d9d9","#b15928"];
  const colorNames = ["贡献","对照", "问题", "模型", "背景", "参考","算法","不足","学习"];

