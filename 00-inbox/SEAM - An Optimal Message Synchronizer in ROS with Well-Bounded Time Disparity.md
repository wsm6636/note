---
created: 2024-05-03T18:55:00
updated: 2024-05-03T09:45
tags:
  - 笔记
  - 笔记/文献笔记
  - 待归档
status:
  - ing
---
 



**TitleTranslation:**  SEAM：ROS 中具有有界时间差的最佳消息同步器
**Journal or Conference:**   2023 IEEE Real-Time Systems Symposium (RTSS)  
**Authors:**  JinghaoSun, TianyiWang, YangLi, NanGuan, ZhishanGuo, GuozhenTan
**Pub.date:**  2023-12
**DOI:**  10.1109/RTSS59052.2023.00024
**tags:** #schedule, /ing
**zoterolink:**  [zotero](zotero://select/library/items/MIYTDDHY)

# 摘要

自主机器通常受到实时限制。 ROS 2是一种广泛使用的机器人框架，将实时能力视为关键因素，并不断发展以应对这些挑战，例如端到端时序保证和实时数据融合等。本文研究了ROS消息同步器，这是多传感器数据融合的一个组成部分，并为ROS 2未来版本中同步器的演进提供了潜在的方向。为了有效的数据融合，来自不同传感器的输入数据必须在对齐的时间点进行采样在特定范围内。本文提出了一种新颖的消息同步策略来满足这一要求，称为 SEAM，一旦最早到达的消息落入指定范围内，它就会对其进行同步。与传统的 ROS 同步器不同，SEAM 不依赖预测信息进行复杂的优化。相反，它使用来自已到达消息的信息来构建可行的同步方案。我们通过证明 SEAM 总能找到可行的方案（如果确实存在）来证明 SEAM 的最优性。我们将 SEAM 集成到 ROS 2 中，并进行实验来评估其与传统 ROS 同步器相比的有效性。







***

# 笔记

## 1 论文创新在于

## 2 解决了什么问题

## 3 方法

## 4 不足&可继续研究

## 5 可参考

## 6 思考
