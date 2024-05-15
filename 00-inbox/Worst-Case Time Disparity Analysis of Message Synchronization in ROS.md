---
created: 2024-03-27T18:55
updated: 2024-05-15T11:06
tags:
  - 笔记
  - 笔记/文献笔记
  - 待归档
status:
  - todo
---
# Worst-Case Time Disparity Analysis of Message Synchronization in ROS
 



**TitleTranslation:**  ROS中消息同步最坏情况时间差异分析
**Journal or Conference:**   2022 IEEE Real-Time Systems Symposium (RTSS)  
**Authors:**  RuoxiangLi, NanGuan, XuJiang, ZhishanGuo, ZhengDong, MingsongLv
**Pub.date:**  2022-12
**DOI:**  10.1109/RTSS55097.2022.00014
**tags:** #/ing, schedule
**zoterolink:**  [zotero](zotero://select/library/items/3U3LGGY9)

# 摘要

多传感器数据融合对于自主系统中支持准确感知和智能决策至关重要。为了进行有意义的数据融合，来自不同传感器的输入数据必须在彼此接近的时间点进行采样，否则结果无法准确反映物理环境的状态。 ROS（机器人操作系统）是一种流行的自主系统软件框架，它提供消息同步机制来解决上述问题，通过缓冲携带来自不同传感器的数据的消息并对具有相似时间戳的消息进行分组。虽然消息同步广泛应用于基于ROS开发的应用中，但对其实际行为和性能知之甚少，因此很难保证数据融合的质量。在本文中，我们对 ROS 中的消息同步策略进行建模，并正式分析其最坏情况的时间差异（分组到同一输出集中的消息的时间戳之间的最大差异）。我们进行实验来评估所提出的时间差异上限相对于实际执行中最大观察到的时间差异的精度，并将其与 Apollo Cyber​​ RT（另一种流行的自动驾驶系统软件框架）中的同步策略进行比较。实验结果表明，我们的分析具有良好的精度，并且 ROS 在观察到的最坏情况时间差异和理论界限方面均优于 Apollo Cyber​​ RT。







***

# 笔记

## 1 论文创新在于

## 2 解决了什么问题

## 3 方法

## 4 不足&可继续研究

## 5 可参考

## 6 思考
