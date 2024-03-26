---
created: 2023-10-26T15:42
updated: 2024-03-26T23:33
tags:
  - 笔记
  - 笔记/文献笔记
---

# Period Optimization for Hard Real-time Distributed Automotive Systems
# 强实时分布式汽车系统的周期优化

| Title                 | Period Optimization for Hard Real-time Distributed Automotive Systems                                  |
| --------------------- | ------------------------------------------------------------------------------------------------------ |
| Journal or Conference |                                                                                                        |
| Authors               | Abhijit Davare; Qi Zhu; Marco Di Natale; Claudio Pinello; Sri Kanajan; Alberto Sangiovanni-Vincentelli |
| Pub. date             | 2007                                                                                                   |
| DOI                   |                                                                                                        |
| Level                 |                                                                                                        |




**最坏响应时间（worst case response time）**
**任务**：激活（activation）到其完成的最大时间间隔，
**消息**：到达目的地的最大时间间隔。
响应时间包括其自身的时间要求以及等待访问资源所花费的时间。

![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202310261629695.png)

通过将最坏情况响应时间和路径中所有对象的周期相加，可以计算每条路径的最坏情况端到端延迟：
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202310261638753.png)
在最坏的情况下，如图2所示，外部事件在任务o1的第一个实例完成后立即到达。事件数据将由任务在其下一个实例上读取，并将在其最坏情况响应时间之后产生结果，即外部事件到达后的T1+R1时间单位。由于不同资源上的任务之间没有协调，因此对于路径中的每条链路，这种情况在最坏的情况下重复出现。为了获得更精确的结果，应该从先前公式中的周期ti中减去任何先前对象oi的最佳情况响应时间vi。然而，在大多数情况下，包括第4节中的案例研究，可以忽略vi ti和vi。

### 任务响应时间
在具有抢占和基于优先级的调度的系统中，任务Oi∈T的最坏情况响应时间ri取决于任务本身的计算时间要求Ci以及来自相同资源上的较高优先级任务的干扰。RI可以使用以下公式计算：
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202310261657860.png)
其中j∈hp(I)指的是同一资源上的较高优先级任务的集合。注意，术语dri tj e表示来自较高优先级任务j的最大抢占次数。


### 消息响应时间
最坏情况消息响应时间的计算方法类似于最坏情况任务响应时间。主要区别在于，CAN总线上的消息传输是不可抢占的。同样，消息本身在其自己的传输时间Ci期间不会受到来自较高优先级消息的抢占。响应时间关系为：
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202310261658362.png)






***

# 笔记

## 1 论文创新在于

## 2 解决了什么问题

## 3 方法

## 4 不足&可继续研究

## 5 可参考

## 6 思考

Referred in <a href="zotero://note/u/HWG3PU5P/?ignore=1&#x26;line=-1" rel="noopener noreferrer nofollow" zhref="zotero://note/u/HWG3PU5P/?ignore=1&#x26;line=-1" ztype="znotelink" class="internal-link">cause-effect chain</a>
