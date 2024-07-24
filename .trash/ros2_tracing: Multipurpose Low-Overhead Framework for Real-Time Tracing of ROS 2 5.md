---
tags: /ing,schedule,笔记/文献笔记,待归档,笔记
status: ing
title: "ros2_tracing: Multipurpose Low-Overhead Framework for Real-Time Tracing of ROS 2"
TitleTranslation: ros2_tracing：用于 ROS 2 实时跟踪的多用途低开销框架
Pubname: IEEE Robotics and Automation Letters
FirstAuthor: Christophe Bédard
allAuthors:
  - Christophe Bédard
  - " Ingo Lütkebohle"
  - " Michel Dagenais"
Pubdate: 2022-07
DOI: https://doi.org/10.1109/LRA.2022.3174346
zoterolink: zotero://select/library/items/F6IIGQXX
$version: 38787
$libraryID: 1
$itemKey: DVM2A4PB
created: 2024-07-24T16:43
updated: 2024-07-24T16:44
---
# ros2\_tracing: Multipurpose Low-Overhead Framework for Real-Time Tracing of ROS 2

# 摘要

由于高系统复杂性和动态环境，测试和调试已成为机器人软件开发的主要障碍。标准的、基于中间件的数据记录不能提供有关内部计算和性能瓶颈的足够信息。其他现有方法也针对非常具体的问题，因此不能用于多用途分析。此外，它们不适合实时应用。在本文中，我们介绍了 ros2\_tracing，它是 ROS 2 的灵活跟踪工具和多用途仪器的集合。它允许使用低开销的 LTTng 跟踪器收集实时分布式系统上的运行时执行信息。工具还将跟踪集成到宝贵的 ROS 2 编排系统和其他可用性工具中。消息延迟实验表明，启用所有 ROS 2 工具时，端到端消息延迟开销平均为 0.0033 毫秒，我们认为这适合生产实时系统。使用 ros2\_tracing 获得的 ROS 2 执行信息可以与来自操作系统的跟踪数据相结合，从而实现更广泛的精确分析，有助于了解应用程序的执行情况，找到性能瓶颈和其他问题的原因。源代码位于：https\://github.com/ros2/ros2tracing。

# 1

# 2

# 笔记

\[color]ros2\_tracing: Multipurpose Low-Overhead Framework for Real-Time Tracing of ROS 2

> # \[color]ros2\_tracing: Multipurpose Low-Overhead Framework for Real-Time Tracing of ROS 2
>
> ## <span style="background-color: #ff666680">贡献/结果 Annotations</span>
>
> <span class="highlight" data-annotation="%7B%22attachmentURI%22%3A%22http%3A%2F%2Fzotero.org%2Fusers%2F8765952%2Fitems%2FU68SQLMG%22%2C%22annotationKey%22%3A%22R77P9GRA%22%2C%22color%22%3A%22%23ff6666%22%2C%22pageLabel%22%3A%221%22%2C%22position%22%3A%7B%22pageIndex%22%3A0%2C%22rects%22%3A%5B%5B332%2C143.193%2C563.033%2C151.831%5D%2C%5B332%2C131.238%2C563.033%2C139.876%5D%2C%5B332%2C119.283%2C361.938%2C127.921%5D%5D%7D%2C%22citationItem%22%3A%7B%22uris%22%3A%5B%22http%3A%2F%2Fzotero.org%2Fusers%2F8765952%2Fitems%2FF6IIGQXX%22%5D%2C%22locator%22%3A%221%22%7D%7D" ztype="zhighlight"><a href="zotero://open-pdf/library/items/U68SQLMG?page=1&#x26;annotation=R77P9GRA">“It offers extensible tracing instrumentation capable of providing execution information on multiple facets of ROS 2.”</a></span> <span class="citation" data-citation="%7B%22citationItems%22%3A%5B%7B%22uris%22%3A%5B%22http%3A%2F%2Fzotero.org%2Fusers%2F8765952%2Fitems%2FF6IIGQXX%22%5D%2C%22locator%22%3A%221%22%7D%5D%2C%22properties%22%3A%7B%7D%7D" ztype="zcitation">(<span class="citation-item"><a href="zotero://select/library/items/F6IIGQXX">Bédard 等, 2022, p. 1</a></span>)</span> 🔤它提供可扩展的跟踪工具，能够提供 ROS 2 多个方面的执行信息。🔤
>
> <span class="highlight" data-annotation="%7B%22attachmentURI%22%3A%22http%3A%2F%2Fzotero.org%2Fusers%2F8765952%2Fitems%2FU68SQLMG%22%2C%22annotationKey%22%3A%22BAASK8VJ%22%2C%22color%22%3A%22%23ff6666%22%2C%22pageLabel%22%3A%221%22%2C%22position%22%3A%7B%22pageIndex%22%3A0%2C%22rects%22%3A%5B%5B332%2C107.327%2C563.033%2C115.965%5D%2C%5B332%2C95.372%2C563.033%2C104.01%5D%2C%5B332%2C83.417%2C563.033%2C92.055%5D%2C%5B332%2C71.462%2C517.533%2C80.1%5D%5D%7D%2C%22citationItem%22%3A%7B%22uris%22%3A%5B%22http%3A%2F%2Fzotero.org%2Fusers%2F8765952%2Fitems%2FF6IIGQXX%22%5D%2C%22locator%22%3A%221%22%7D%7D" ztype="zhighlight"><a href="zotero://open-pdf/library/items/U68SQLMG?page=1&#x26;annotation=BAASK8VJ">“With a strategic two-phase instrumentation design and using a low-overhead tracer, it has a lower runtime overhead than current solutions, making it suitable for the real-time applications targeted by ROS 2.”</a></span> <span class="citation" data-citation="%7B%22citationItems%22%3A%5B%7B%22uris%22%3A%5B%22http%3A%2F%2Fzotero.org%2Fusers%2F8765952%2Fitems%2FF6IIGQXX%22%5D%2C%22locator%22%3A%221%22%7D%5D%2C%22properties%22%3A%7B%7D%7D" ztype="zcitation">(<span class="citation-item"><a href="zotero://select/library/items/F6IIGQXX">Bédard 等, 2022, p. 1</a></span>)</span> 🔤它采用战略性两阶段仪器设计并使用低开销跟踪器，其运行时开销比当前解决方案更低，使其适合 ROS 2 所针对的实时应用程序。🔤
>
> <span class="highlight" data-annotation="%7B%22attachmentURI%22%3A%22http%3A%2F%2Fzotero.org%2Fusers%2F8765952%2Fitems%2FU68SQLMG%22%2C%22annotationKey%22%3A%22UADJK2MD%22%2C%22color%22%3A%22%23ff6666%22%2C%22pageLabel%22%3A%222%22%2C%22position%22%3A%7B%22pageIndex%22%3A1%2C%22rects%22%3A%5B%5B68.986%2C725.41%2C249.588%2C734.048%5D%5D%7D%2C%22citationItem%22%3A%7B%22uris%22%3A%5B%22http%3A%2F%2Fzotero.org%2Fusers%2F8765952%2Fitems%2FF6IIGQXX%22%5D%2C%22locator%22%3A%222%22%7D%7D" ztype="zhighlight"><a href="zotero://open-pdf/library/items/U68SQLMG?page=2&#x26;annotation=UADJK2MD">“userspace and kernel space data as a whole.”</a></span> <span class="citation" data-citation="%7B%22citationItems%22%3A%5B%7B%22uris%22%3A%5B%22http%3A%2F%2Fzotero.org%2Fusers%2F8765952%2Fitems%2FF6IIGQXX%22%5D%2C%22locator%22%3A%222%22%7D%5D%2C%22properties%22%3A%7B%7D%7D" ztype="zcitation">(<span class="citation-item"><a href="zotero://select/library/items/F6IIGQXX">Bédard 等, 2022, p. 2</a></span>)</span> 用户空间和内核空间数据作为一个整体。\
> 🔤用户空间和内核空间数据作为一个整体。🔤
>
> ## <span style="background-color: #f1983780">方法/实验 Annotations</span>
>
> <span class="highlight" data-annotation="%7B%22attachmentURI%22%3A%22http%3A%2F%2Fzotero.org%2Fusers%2F8765952%2Fitems%2FU68SQLMG%22%2C%22annotationKey%22%3A%22H5P6Q64Y%22%2C%22color%22%3A%22%23f19837%22%2C%22pageLabel%22%3A%225%22%2C%22position%22%3A%7B%22pageIndex%22%3A4%2C%22rects%22%3A%5B%5B110.304%2C573.853%2C300.022%2C582.491%5D%2C%5B48.964%2C561.897%2C300.022%2C570.535%5D%2C%5B48.964%2C549.942%2C300.022%2C558.58%5D%2C%5B48.964%2C537.987%2C300.022%2C546.625%5D%2C%5B48.964%2C526.032%2C300.022%2C534.67%5D%2C%5B48.964%2C514.077%2C300.022%2C522.715%5D%2C%5B48.964%2C502.122%2C300.022%2C510.76%5D%2C%5B48.964%2C490.166%2C300.022%2C498.804%5D%2C%5B48.964%2C478.211%2C300.027%2C486.849%5D%2C%5B48.964%2C466.256%2C177.79%2C474.894%5D%5D%7D%2C%22citationItem%22%3A%7B%22uris%22%3A%5B%22http%3A%2F%2Fzotero.org%2Fusers%2F8765952%2Fitems%2FF6IIGQXX%22%5D%2C%22locator%22%3A%225%22%7D%7D" ztype="zhighlight"><a href="zotero://open-pdf/library/items/U68SQLMG?page=5&#x26;annotation=H5P6Q64Y">“For example, we traced a ROS 2 system that simulates a real-world autonomous driving scenario [27]. In this example, a node receives data from 6 different topics using subscriptions. When the subscriptions receive a new message, they cache it so that the node only keeps the latest message for each topic. The periodically-triggered callback uses the latest message from each topic to compute a result and publish it. To analyze the trace data, we wrote a simple script using tracetools_analysis [28], a Python library to read and analyze trace data.”</a></span> <span class="citation" data-citation="%7B%22citationItems%22%3A%5B%7B%22uris%22%3A%5B%22http%3A%2F%2Fzotero.org%2Fusers%2F8765952%2Fitems%2FF6IIGQXX%22%5D%2C%22locator%22%3A%225%22%7D%5D%2C%22properties%22%3A%7B%7D%7D" ztype="zcitation">(<span class="citation-item"><a href="zotero://select/library/items/F6IIGQXX">Bédard 等, 2022, p. 5</a></span>)</span> 🔤例如，我们追踪了一个模拟现实世界自动驾驶场景的 ROS 2 系统 \[27]。在此示例中，节点使用订阅从 6 个不同主题接收数据。当订阅收到新消息时，它们会将其缓存，以便节点仅保留每个主题的最新消息。定期触发的回调使用每个主题的最新消息来计算结果并将其发布。为了分析跟踪数据，我们使用tracetools\_analysis \[28]（一个用于读取和分析跟踪数据的Python 库）编写了一个简单的脚本。🔤

## 1 论文创新在于

## 2 解决了什么问题

## 3 方法

## 4 不足&可继续研究

## 5 可参考

## 6 思考
