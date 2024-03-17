---
created: 2024-03-15T10:38
updated: 2024-03-17T00:14
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
分布式实时系统对于具有复杂性应用和分散性物理部署的领域友好，所以分布式实时系统应用广泛，尤其是自动驾驶领域。通常会将分布式实时系统部署在多个电子控制单元上，通过一些列任务完成一些功能或者对外部事件做出反应。这些完成功能或处理外部事件的任务经常需要按序执行，所以他们通常存在因果关系，即一个任务的输入由另一个任务的输出决定。所以在这样的分布式实时系统中不仅需要满足截止时间的约束，还需要考虑端到端时序的约束以满足功能的正确性和系统的安全性。例如在车辆自动巡航时，控制单元反应时间超过50ms，虽然仍然可能满足在截止期前完成减速控制，但可能会由于控制信号的延迟导致车辆急剧减速失去稳定。另外数据的新鲜度能保证数据的时效性，对于自动驾驶系统来说更新鲜的数据会帮助系统做出更准确的决策。

端到端时序约束根据端到端时序语义，包括反应时间约束和数据年龄约束，并且由AUTOSAR[AUTOSAR]定义。如图所示，其中反应时间表示外部事件直到系统每个相关任务处理这个更新的最早时间间隔的长度，还有另一种表达“按键到动作的延迟”；数据年龄则表示对于外部事件开始处理后直到基于采样数据所产生激励之间的时间间隔长度，也称作最坏情况下的数据新鲜度。对于图中表示数据处理部分的任务，有的系统会采用第一个任务作为采样任务收集数据，也许不会并直接处理外部事件。在每两个相邻的数据处理任务之间多是通过缓冲区读写数据来进行通信的，一个任务从前面的缓冲区读取输入数据，自身运算产生结果后写入后面的缓冲区，在数据被读取或者新的数据写入前都会被一直保存着，如此一个或几个关键人物可以在多条任务链中起到承上启下的作用。

> Hybrid Scheduling of Tasks and Messages for TSN-Based Avionics Systems
> Response Time Analysis and Priority Assignment of Processing Chains on ROS2 Executors
> 111End-to-end Timing Modeling and Analysis of TSN in Component-Based Vehicular Software
> Efficient maximum data age analysis for cause-effect chains in automotive systems

对于端到端时序的分析，在单个ECU上多年来已有多种方法，并且运用于多个领域，例如第二代机器人操作系统ros2[teper2022end]【ROS2】、航电系统【Hybrid】、车载系统【111】【Efficient】等。复杂的数据依赖关系使得端到端延迟分析变得难以处理，而且不仅仅针对单个ECU内部之间因果链的时延，多个ECU之间由于网络通信的存在也使得分布式因果链的端到端分析变得更加复杂[arestova2022itans]。

> [13] Robert Davis, Alan Burns, Reinder Bril, Johan Lukkien, Controller area network (CAN) schedulability analysis: Refuted, revisited and revised, Real-Time Syst. (2007). [14] S. Mubeen, J. Mäki-Turja, M. Sjödin, MPS-CAN analyzer: Integrated implementation of response-time analyses for controller area network, J. Syst. Archit. (2014).

以前关于多ECU联合的端到端时序分析通常考虑CAN总线为通信方式，例如【13-14】但目前嵌入式实时系统被接入更多的传感器已采集大量信息，同时也造成数据传输量激增，CAN总线不能更好的满足嵌入式实时系统某些高带宽低时延的要求。时间敏感网络被考虑为嵌入式实时系统以及控制领域的通信方式之一。

时间敏感网络是IEEE802.1Q协议的增强，旨在通过提供时间敏感性和低延迟的通信以支持实时控制与数据传输。
其中IEEE 802.1Qcr[IEEEStandardLocal2020]异步流量整形 (ATS) 标准旨在通过撤销同步并允许每个网络节点按自己的时间发送流量来绕过同步的复杂性。

在成为IEEE标准前，Specht等人提出了Urgency-Based Scheduler（UBS），并使用了Length-Rate Quotient (LRQ) and Token Bucket Emulation (TBE)两种算法。LRQ和TBE虽然都是适用于TSN的异步整形算法，但LRQ主要是通过传输/泄露速率整形，可以将突然流量整形为稳定的输出；TBE则通过平均速率控制数据流，桶中令牌数量满足即可传输。最后在IEEE 802.1 Qcr协议中使用基于令牌桶的ATS算法，如图所示，数据流通过TSN交换机整形时，数据流中的每一个数据帧会经由本地时钟确定一个资格时间，用来数据帧排队和确定数据帧传输的时间。在数据帧到达所在队列的头部时，判断其分配的资格时间经过优先级选择，最后和其他未经由ATS整形的数据流一起输出。

目前已有研究将TSN与任务链相结合，【houtanSupportingEndtoendData2023】通过实际汽车案例建模任务链并通过IEEE 802.1 Qbv协议作为网络传输的桥梁。虽然TAS在施加业务确定性方面表现良好，但严格的同步要求，则增加了复杂性并威胁到TSN网络域的可靠性。针对一般的嵌入式实时系统场景，异步系统仍然被广泛应用以减少复杂性例如使用CAN总线作为网络传输。所以在本文中我们选择异步的IEEE 802.1Qcr作为网络传输标准，ATS算法作为队列整形算法。


贡献： 
我们研究了分布式实时系统上基于TSN网络的任务链端到端时间分析，我们的贡献是：
- 在第二节中，我们给出了基于TSN网络的分布式实时系统任务链模型，包括单个ECU上的任务模型和多个ECU链接的网络任务模型。其中多ECU通过TSN相互连接，我们使用的TSN标准为IEEE 802.1Qcr。
- 在第三节中，我们对多ECU场景下最大反应时间和最大数据年龄进行分析，为采用IEEE 802.1Qcr标准的网络传输任务链分别提供了上界。
- 在第四节中，我们进行了评估并证明提出的方法提高了性能.

# related work
单个ECU上已有多种结论，【tangReactionTimeAnalysis2023】中采用资源服务曲线模型取得事件触发和数据刷新模式下的最大反应时间分析，在[durr2019end]中提出可以通过即时向前（向后）作业链长度计算最大响应时间与最大数据年龄上界。[gunzel2021timing]中对即时向前（向后）作业链长度从采样到数据处理扩展到外部活动触发到驱动事件。

数据年龄【10.1145/3534879.3534893】

现有的端到端数据传输延迟分析及其数据路径计算算法也支持TSN的前身，称为以太网音视桥接(AVB)，它包括了TSN的一些类别。这是因为AVB还支持事件触发流量，并且不考虑ECU的同步。在这种情况下，AVB[15]的响应时间分析被合并到端到端数据传播延迟分析[16]中。