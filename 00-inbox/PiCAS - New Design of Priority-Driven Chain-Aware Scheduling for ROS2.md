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
# PiCAS: New Design of Priority-Driven Chain-Aware Scheduling for ROS2
 



**TitleTranslation:**  PiCAS：ROS2 优先级驱动链感知调度的新设计
**Journal or Conference:**   2021 IEEE 27th Real-Time and Embedded Technology and Applications Symposium (RTAS)  
**Authors:**  HyunjongChoi, YechengXiang, HyoseungKim
**Pub.date:**  2021-05
**DOI:**  10.1109/RTAS52030.2021.00028
**tags:** #/ing, schedule
**zoterolink:**  [zotero](zotero://select/library/items/6BQDM4K6)

# 摘要

在ROS（机器人操作系统）中，时间和安全关键领域的大多数应用程序都是以具有数据依赖性的回调链的形式构建的。由于ROS在实时支持方面的缺陷，无法提供强有力的时序保证，可能会导致灾难性的结果。尽管ROS2声称增强了实时能力，但确保可预测的端到端链延迟仍然是一个具有挑战性的问题。在本文中，我们为 ROS2 框架提出了一种新的优先级驱动的链感知调度程序，并为所提出的调度程序提供了端到端延迟分析。使用我们的调度程序，根据相应链的给定时序要求对回调进行优先级排序，以便可以在可预测的范围内改善关键链的端到端延迟。所提出的调度设计包括考虑所有 ROS2 调度相关抽象（例如回调、节点和执行器）的优先级分配和资源分配。据我们所知，这是第一个通过提出新的调度器设计来解决 ROS2 在端到端延迟方面的固有局限性的工作。我们已经在 NVIDIA Xavier NX 上运行的 ROS2 中实现了调度程序。我们进行了案例研究和可调度性实验。结果表明，与默认的 ROS2 调度程序和现实场景中的最新工作相比，所提出的调度程序在端到端延迟方面有了显着的改善。







***

# 笔记

## 1 论文创新在于

## 2 解决了什么问题

## 3 方法

## 4 不足&可继续研究

## 5 可参考

## 6 思考
