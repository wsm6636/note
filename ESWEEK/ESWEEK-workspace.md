---
created: 2024-03-15T10:38
updated: 2024-03-16T14:50
tags:
  - 笔记
  - 笔记/paper
---
# title
基于TSN的分布式实时系统任务链的端到端时间分析
End-to-End Timing Analysis of Task Chains for TSN-based Distributed Real-time Systems

# 摘要

分布式实时系统应用复杂在物理上分散，通常由多个电子控制单元构成。这种系统不仅需要满足实时性约束，对端到端时序也需要限制以免对结果产生影响。我们考虑了两种主要的端到端时序语义，即最大反应时间和最大数据年龄。由于系统的复杂性，控制任务之间通长具有因果关系，即一个任务的输出导致了另一个任务的输入。这样的任务链也增加了端到端时序分析的复杂性。
现有的分布式实时系统任务链端到端时间分析通常采用CAN总线作为ECU之间的链接，但随着数据量增加时间敏感网络已成为一种新的解决方案。本文研究了基于IEEE 802.1 QCR标准分布式系统任务链端到端时序分析、建立了基于TSN网络传输任务链的模型、并对最大反应时间和最大数据年龄分析。结合试验表明，我们提出的方法提高了性能。

Distributed real-time systems are complex in nature due to their physical dispersion, typically composed of multiple electronic control units (ECUs). Such systems not only need to meet real-time constraints but also require restrictions on end-to-end timing to prevent adverse effects on the outcomes. We consider two main end-to-end timing semantics, i.e., maximum reaction time and maximum data age. The complexity of the system is compounded by the causal relationships often present between control tasks, where the output of one task leads to the input of another. The chains of such tasks also add to the complexity of end-to-end timing analysis.
The existing end-to-end timing analysis of task chains in distributed real-time systems typically employs the Controller Area Network (CAN) bus as the interconnect between ECUs. However, with the increasing volume of data, Time-Sensitive Networking (TSN) has emerged as a novel solution. In this paper, we investigate the end-to-end timing analysis of task chains in distributed systems based on the IEEE 802.1 QCR standard, constructs a model for task chain transmission over TSN networks, and analyzes the maximum reaction time and maximum data age. Combined with experiments, we show that our proposed method improves the performance.

## 关键词

End-to-End Timing Analysis, Distributed Real-time Systems, TSN

# introduction
分布式实时系统对于具有复杂性应用和分散性物理部署的领域友好，所以分布式实时系统应用广泛，尤其是自动驾驶领域。
