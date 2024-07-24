---
created: 2024-03-27T12:30
updated: 2024-07-24T12:26
tags:
  - 笔记/文献笔记
  - 待归档
  - 笔记
  - schedule
  - /ing
status:
  - todo
title: Optimizing End-to-End Latency of Sporadic Cause-Effect Chains Using Priority Inheritance
TitleTranslation: " 使用优先级继承优化偶发因果链的端到端延迟"
Pubname: " 2023 IEEE Real-Time Systems Symposium (RTSS)  "
FirstAuthor: YueTang
allAuthors: YueTang, XuJiang, NanGuan, SongranLiu, XiantongLuo, WangYi
Pubdate: 2023-12
DOI: 10.1109/RTSS59052.2023.00042
zoterolink: zotero://select/library/items/9ZHS4W7X
---


# Optimizing End-to-End Latency of Sporadic Cause-Effect Chains Using Priority Inheritance
---

# 摘要

因果链端到端延迟的分析和优化是实时系统中的一个重要问题。在任务级固定优先级调度下，端到端延迟很大程度上依赖于链中任务的相对优先级，因此之前的工作尝试通过优先级分配来改善延迟。然而，由于各个任务的可调度性和链的端到端延迟之间的冲突，静态优先级分配的改进受到限制，即导致良好的端到端延迟的优先级分配可能会使任务集不可调度。这项工作提出了一种名为动态优先级继承协议（DPI）的新方法来优化零星因果链的端到端延迟。在 DPI 下，两个通信作业之间的传播延迟与任务相对优先级无关。因此优化可以适用于任何优先级分配，并且不再与任务可调度性发生冲突。此外，我们针对还需要满足确定性要求的因果链提出了 DPI-B，即 DPI 和缓冲区操作协议的组合。我们使用汽车基准测试和随机生成的工作负载进行实验。结果表明，与最先进的方法相比，我们的方法是有效的。







***

# 笔记

## 1 论文创新在于

## 2 解决了什么问题

## 3 方法

## 4 不足&可继续研究

## 5 可参考

## 6 思考
