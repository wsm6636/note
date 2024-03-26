---
created: 2024-03-15T10:38
updated: 2024-03-26T16:08
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

End-to-End Timing Analysis, Distributed Real-time Systems, TSN, ATS

# introduction
分布式实时系统对于具有复杂性应用和分散性物理部署的领域友好，所以分布式实时系统应用广泛，尤其是自动驾驶领域。通常会将分布式实时系统部署在多个电子控制单元上，通过一些列任务完成一些功能或者对外部事件做出反应。这些完成功能或处理外部事件的任务经常需要按序执行，所以他们通常存在因果关系，即一个任务的输入由另一个任务的输出决定。所以在这样的分布式实时系统中不仅需要满足截止时间的约束，还需要考虑端到端时序的约束以满足功能的正确性和系统的安全性。例如在车辆自动巡航时，控制单元反应时间超过50ms，虽然仍然可能满足在截止期前完成减速控制，但可能会由于控制信号的延迟导致车辆急剧减速失去稳定。另外数据的新鲜度能保证数据的时效性，对于自动驾驶系统来说更新鲜的数据会帮助系统做出更准确的决策。
Distributed real-time systems are particularly adept at handling applications with complexity and physical dispersion, making them extensively utilized across various domains, notably in the realm of autonomous driving. These systems are commonly deployed across a multitude of electronic control units (ECUs), executing a sequence of tasks to perform specific functions or react to external events. The tasks involved in executing these functions or processing events often need to be executed in an ordered manner, typically exhibiting causal relationships where the input of one task is derived from the output of another. In such distributed real-time systems, it is crucial not only to adhere to deadline constraints but also to consider end-to-end timing constraints to ensure the functionality's correctness and the system's safety. For instance, during automatic vehicle cruising, if the reaction time of the control unit exceeds 50 milliseconds, although it may still complete the deceleration control within the deadline, the delay in the control signal could result in a sudden deceleration and loss of vehicle stability. Moreover, the recency of data is essential for its timeliness, and in the context of autonomous driving systems, more up-to-date data can facilitate more precise decision-making.


端到端时序约束根据端到端时序语义，包括反应时间约束和数据年龄约束，并且由AUTOSAR[AUTOSAR]定义。如图所示，其中反应时间表示外部事件直到系统每个相关任务处理这个更新的最早时间间隔的长度，还有另一种表达按键到动作的延迟；数据年龄则表示对于外部事件开始处理后直到基于采样数据所产生激励之间的时间间隔长度，也称作最坏情况下的数据新鲜度。对于图中表示数据处理部分的任务，有的系统会采用第一个任务作为采样任务收集数据，也许不会并直接处理外部事件。在每两个相邻的数据处理任务之间多是通过缓冲区读写数据来进行通信的。如图所示，虚线的部分表示读写操作，而非任务链顺序。在任务链中一个任务从前面的缓冲区读取输入数据，自身运算产生结果后写入后面的缓冲区，在数据被读取或者新的数据写入前都会被一直保存着，如此一个或几个关键人物可以在多条任务链中起到承上启下的作用。包括图中所示的外部事件和激励事件同样如此，外部事件的数据会存在下一个处理它的任务的读数据缓冲区，而激励事件也可看做是处理数据的任务同样具有缓冲区，所以它会从自己的读数据缓冲区获得任务链的最总处理结果。
End-to-end timing constraints, as defined by AUTOSAR【】, are based on end-to-end timing semantics and include reaction time constraints and data age constraints. As shown in the figure, reaction time refers to the earliest time interval from an external event to the point when each relevant task within the system begins processing this update, also known as delay from button press to action. Data age, on the other hand, indicates the time interval from the start of processing an external event until the generation of an incentivized output based on sampled data, also referred to as the worst-case data freshness. For tasks represented in the figure that pertain to the data processing section, some systems may adopt the first task as a sampling task to collect data, which may not be processed directly in response to the external event. Communication between two adjacent data processing tasks is often facilitated through buffer read and write operations. As shown in the figure, the dashed parts represent read and write operations, not the order of the task chain. So in a task chain where a task reads input data from the preceding buffer, processes it to produce results, and then writes into the subsequent buffer. The data is preserved until it is read or new data is written, allowing one or several key tasks to act as intermediaries across multiple task chains. As depicted in the figure, the external events and incentive events are treated similarly; the data from external events will reside in the read data buffer of the next task that processes it. The incentive event can also be viewed as a data processing task that possesses its own buffer, hence it obtains the ultimate processing result of the task chain from its own read data buffer.

> Hybrid Scheduling of Tasks and Messages for TSN-Based Avionics Systems
> Response Time Analysis and Priority Assignment of Processing Chains on ROS2 Executors
> 111End-to-end Timing Modeling and Analysis of TSN in Component-Based Vehicular Software
> Efficient maximum data age analysis for cause-effect chains in automotive systems

对于端到端时序的分析，在单个ECU上多年来已有多种方法，并且运用于多个领域，例如第二代机器人操作系统ros2[teper2022end]【ROS2】、航电系统【Hybrid】、车载系统【111】【Efficient】等。复杂的数据依赖关系使得端到端延迟分析变得难以处理，而且不仅仅针对单个ECU内部之间因果链的时延，多个ECU之间由于网络通信的存在也使得分布式因果链的端到端分析变得更加复杂[arestova2022itans]。
Analysis of end-to-end timing has been carried out for many years on individual ECUs, and it has been applied across various domains, such as the second-generation Robot Operating System (ROS 2) [teper2022end], avionics systems [Hybrid], and vehicular systems 【10196870] 【bi2022efficient]. The complex data dependencies make the analysis of end-to-end latency challenging, not only for the latency within the cause-effect chains of a single ECU but also for multiple ECUs due to the presence of network communication, which complicates the end-to-end analysis of distributed causal chains [arestova2022itans].

> [13] Davis R I, Burns A, Bril R J, et al. Controller Area Network (CAN) schedulability analysis: Refuted, revisited and revised[J]. Real-Time Systems, 2007, 35: 239-272.
> [14] 
> Mubeen S, Mäki-Turja J, Sjödin M. MPS-CAN analyzer: Integrated implementation of response-time analyses for Controller Area Network[J]. Journal of Systems architecture, 2014, 60(10): 828-841.

以前关于多ECU联合的端到端时序分析通常考虑CAN总线为通信方式，例如【13-14】但目前嵌入式实时系统被接入更多的传感器已采集大量信息，同时也造成数据传输量激增，CAN总线不能更好的满足嵌入式实时系统某些高带宽低时延的要求。时间敏感网络被考虑为嵌入式实时系统以及控制领域的通信方式之一。
Previously, end-to-end timing analysis for multiple ECUs typically considered the Controller Area Network (CAN) bus as the communication method, as seen in references [Controller-MPS]. However, with the increasing integration of numerous sensors in embedded real-time systems to collect vast amounts of information, there has been a surge in data transmission volume. The CAN bus is no longer adequately meeting the high bandwidth and low latency requirements of certain embedded real-time systems. Time-Sensitive Networking (TSN) is being considered as one of the communication methods for embedded real-time systems and the control domain.

时间敏感网络是IEEE802.1Q协议的增强，旨在通过提供时间敏感性和低延迟的通信以支持实时控制与数据传输。
其中IEEE 802.1Qcr[IEEEStandardLocal2020]异步流量整形 (ATS) 标准旨在通过撤销同步并允许每个网络节点按自己的时间发送流量来绕过同步的复杂性。
Time-sensitive networking is an enhancement of the IEEE 802.1Q protocol aimed at providing time-sensitive and low-latency communication to support real-time control and data transfer. Among them, the IEEE 802.1Qcr [IEEEStandardLocal2020] standard for asynchronous traffic shaping (ATS) aims to bypass the complexity of synchronization by revoking synchronization and allowing each network node to send traffic at its own time.

在成为IEEE标准前，Specht等人提出了Urgency-Based Scheduler（UBS），并使用了Length-Rate Quotient (LRQ) and Token Bucket Emulation (TBE)两种算法。LRQ和TBE虽然都是适用于TSN的异步整形算法，但LRQ主要是通过传输/泄露速率整形，可以将突然流量整形为稳定的输出；TBE则通过平均速率控制数据流，桶中令牌数量满足即可传输。最后在IEEE 802.1 Qcr协议中使用基于令牌桶的ATS算法，如图所示，数据流通过TSN交换机整形时，数据流中的每一个数据帧会经由本地时钟确定一个资格时间，用来数据帧排队和确定数据帧传输的时间。在数据帧到达所在队列的头部时，判断其分配的资格时间经过优先级选择，最后和其他未经由ATS整形的数据流一起输出。
  
Before becoming an IEEE standard, Specht and others proposed the Urgency-Based Scheduler (UBS), which utilized two algorithms: Length-Rate Quotient (LRQ) and Token Bucket Emulation (TBE). Both LRQ and TBE are asynchronous shaping algorithms suitable for TSN, but LRQ primarily focuses on transforming sudden bursts of traffic into a stable output through transmission/leakage rate shaping, while TBE controls the data flow by average rate, allowing transmission once the number of tokens in the bucket is sufficient. Ultimately, in the IEEE 802.1 Qcr protocol, the Token Bucket-based ATS algorithm is employed. As illustrated, when a data stream is shaped by a TSN switch, each data frame in the stream is assigned a qualification time by the local clock for queuing and determining the transmission time of the data frame. When a data frame reaches the head of the queue, its allocated qualification time is checked against priority selection, and then it is outputted along with other data streams that have not been shaped by ATS.

目前已有研究将TSN与任务链相结合，【houtanSupportingEndtoendData2023】通过实际汽车案例建模任务链并通过IEEE 802.1 Qbv协议作为网络传输的桥梁。虽然TAS在施加业务确定性方面表现良好，但严格的同步要求，则增加了复杂性并威胁到TSN网络域的可靠性。针对一般的嵌入式实时系统场景，异步系统仍然被广泛应用以减少复杂性例如使用CAN总线作为网络传输。所以在本文中我们选择异步的IEEE 802.1Qcr作为网络传输标准，ATS算法作为队列整形算法。
Currently, there have been studies combining TSN with task chains. [houtanSupportingEndtoendData2023] Modeling task chains using real-world automotive cases and using the IEEE 802.1Qbv protocol as a bridge for network transmission. Although TAS performs well in enforcing business determinism, strict synchronization requirements increase complexity and pose a threat to the reliability of TSN network domains. For general embedded real-time system scenarios, asynchronous systems are still widely used to reduce complexity, for example, using the CAN bus as network transmission. Therefore, in this paper, we choose the asynchronous IEEE 802.1Qcr as the network task standard and the ATS algorithm as the queue shaping algorithm.


贡献： 
我们研究了分布式实时系统上基于TSN网络的任务链端到端时间分析，我们的贡献是：
- 在第二节中，我们给出了基于TSN网络的分布式实时系统任务链模型，包括单个ECU上的任务模型和多个ECU链接的网络任务模型。其中多ECU通过TSN相互连接，我们使用的TSN标准为IEEE 802.1Qcr。
- 在第三节中，我们对多ECU场景下最大反应时间和最大数据年龄进行分析，为采用IEEE 802.1Qcr标准的网络传输任务链分别提供了上界。
- 在第四节中，我们进行了评估并证明提出的方法提高了性能.

Contribution: We have studied the end-to-end timing analysis of task chains based on TSN networks in distributed real-time systems. Our contributions are:
In Section 2, we present the task chain models for distributed real-time systems based on TSN networks, including the task model for a single ECU and the network task model for multiple ECUs connected through TSN. The TSN standard we use is IEEE 802.1Qcr.
In Section 3, we analyze the maximum reaction time and maximum data age in a multi-ECU scenario, providing upper bounds on the maximum reaction time for network transmission task chains adopting the IEEE 802.1Qcr standard.
In Section 4,  we evaluate and demonstrate that the proposed method improves the performance.

# related work


对于因果链的端到端分析有很多工作考虑时间触发的方式，如图，即任务链上的每个任务都有自己的周期并按照固定的间隔触发执行。针对这种时间触发的任务链已有多种方法处理，例如D{\"u}rr等人在【durr2019end】中设定即时向前和向后作业链，通过计算作业链的长度求得偶发性任务链的最大反应时间与最大数据年龄的上界。Günzel等人在[gunzel2021timing]中针对即时向前（向后）作业链设定长度从原来的数据处理任务（包括采样任务）向前扩展到外部活动触发以及向后扩展到驱动事件。随后他们在【gunzel_et_al】中引入划分的作业链并证明最大反应时间和最大数据年龄的等价性。
For end-to-end timing analysis of cause-effect chains, much work has considered time-triggered approaches, as shown in the figure where each task in the chain is periodically triggered to execute at fixed intervals. There are various methods to handle such time-triggered task chains. For instance, Dürr et al. in 【durr2019end】defined immediate forward and backward job chains, and by calculating the length of the job chain, they derived the upper bounds for the maximum reaction time and maximum data age of sporadic job chains. Günzel et al. in [gunzel2021timing] study extended the definition of immediate forward (backward) job chains in length, from the original data processing tasks (including sampling tasks) forward to external activity triggers and backward to driving events. Subsequently, they introduced partitioned job chains in their follow-up work 【gunzel_et_al】and proved the equivalence of maximum reaction time and maximum data age.

另一种则是事件触 发的方式，如图，即任务链上的每个任务需要其前一个任务执行结束生成数据，随后触发该任务读取数据进行下一步处理。【tangReactionTimeAnalysis2023】中采用资源服务曲线模型取得事件触发和数据刷新模式下的最大反应时间分析。【7461359】提出了静态优先抢占任务链的忙窗口分析。【recursiveapproach】提出用于推导应用程序的端到端延迟的方法并支持任意事件模式的时间触发和事件触发任务激活方案。本文的研究以事件触发的方式为基础。
The event-triggered mechanism for task chains, as shown in the figure where each task requires the completion of its preceding task to generate data, which then triggers the task to read the data for further processing. In the paper [tangReactionTimeAnalysis2023], a resource service curve model is utilized to analyze the maximum reaction time under event-triggered and data refresh modes. The paper [7461359] proposes a busy window analysis for static priority preemptive task chains. The [recursiveapproach] presents a method for deriving the end-to-end delay of an application, supporting both time-triggered and event-triggered task activation schemes for arbitrary event patterns. This research is based on the time-triggered mechanism.

除此之外还有一些研究仅专注于一种端到端时序语义。Günzel等人在【Probabilistic】中进一步提出基于概率的反应时间分析方法，考虑反应时间的随机性与故障概率并对偶发性任务链分析。【 10.1145/3534879.3534893】考虑混合线性规划的优化以最小化数据年龄分析。【bi2022efficient】中则是提出以较低的计算代价实现较高的数据年龄分析精度的方法。
In addition to the aforementioned studies, some research focuses solely on one aspect of end-to-end timing semantics. Günzel et al. in their work 【Probabilistic】further propose a probability-based reaction time analysis method, considering the randomness of reaction times and failure probabilities for sporadic task chain analysis. The paper with the identifier 【 10.1145/3534879.3534893】 explores the optimization of data age analysis using mixed-integer linear programming to minimize data age. In the work 【bi2022efficient】a method is proposed that achieves high precision in data age analysis with lower computational overhead.

以上研究多是关于单个ECU上的端到端时延分析，而对于多ECU上的分析【gunzel2021timing】提出切割定理将联合任务链拆解为ECU上的任务链与通信任务链以求取端到端时延界限。而对于通信任务多数研究参考【davare2007period】所提出的分析，认为通信任务与ECU任务一样用任务的最差响应时间与周期求和得到上界。但他们仍然考虑以CAN总线作为通信任务标准，但已经不再适合嵌入式实时系统数据量增加的场景，所以研究者们开始考虑更高效的网络作为通信任务标准以代替CAN总线，例如TSN。
The majority of the aforementioned research focuses on the end-to-end latency analysis within a single ECU. However, for the analysis across multiple ECUs, the work 【gunzel2021timing】 proposes the slicing theorem, which decomposes the joint task chain into ECU task chains and communication task chains to derive the end-to-end latency bounds. For communication tasks, many studies refer to the analysis proposed by 【davare2007period】which considers communication tasks in the same way as ECU tasks, using the worst-case response time and period of the tasks to sum up and obtain an upper bound. However, they still consider the CAN bus as the standard for communication tasks, which is no longer suitable for the scenario where embedded real-time systems have increased data volumes. Therefore, researchers have started to consider more efficient networks as the standard for communication tasks to replace the CAN bus, such as TSN (Time-Sensitive Networking).

对于TSN网络的端到端延迟分析目前已有很多关于Time-Aware Shaper (TAS). 有Bahar等人参考【feiertagCompositionalFrameworkEndtoend】提出的端到端时延分析框架基于IEEE 802.1Qbv标准分析了ECU之间同步和非同步以及离线网络下的端到端时延分析【HOUTAN2023102911】。航电系统中也基于TSN网络提出混合调度框架以保证两种端到端语义【Hybrid】。【arestova2022itans】中Arestova等人采用增量启发式方法计算由多速率任务和网络流组成的因果链调度。【co-design】中针对不同需求的控制任务分析帧级的响应时间。
For the end-to-end latency analysis of TSN networks, there has been significant focus on Time-Aware Shaper (TAS). Bahar et al., referencing the framework proposed in [feiertagCompositionalFrameworkEndtoend], analyzed the end-to-end latency between ECUs under synchronous and asynchronous conditions, as well as in offline network scenarios, based on the IEEE 802.1Qbv standard [HOUTAN2023102911]. In avionics systems, a hybrid scheduling framework has been proposed based on TSN networks to ensure both end-to-end timing semantics [Hybrid]. Arestova et al. in [arestova2022itans] used incremental heuristic methods to calculate the scheduling of cause-effect chains composed of multi-rate tasks and network flows. Additionally, in [co-design], frame-level response times were analyzed for control tasks with varying requirements.

> 加一个章节，关于ATS算法的介绍
> 伪代码
> #修改 

# ATS background

为了满足低延时高带宽的需求，时间敏感网络标准被开发，并具有多种机制：
时间感知整形器（TAS）（IEEE 802.1Qbv[qbv]），帧抢占（IEEE Std 802.1Qbu[qbu]）。循环排队和转发(IEEE 802.1 QCH[qch])等。
To meet the requirements for low latency and high bandwidth, Time-Sensitive Networking (TSN) standards have been developed, incorporating various mechanisms such as:
- Time-Aware Shaper (TAS) (IEEE 802.1Qbv[qbv]),
- Frame Preemption (IEEE Std 802.1Qbu[qbu]),
- and Cyclic Queuing and Forwarding (IEEE 802.1 QCH[qch]).

虽然TSN在确定性传输上非常有效，但例如Qbv标准由于TAS存在所以对定时同步要求严格，若同步出错则增加了TSN网络的确定性以及分析的复杂性。而异步流量整形（ATS）（IEEE 802.1Qcr），旨在允许取消同步并允许每个节点按照本地始终定时发送流，以此降低同步的复杂性，这样的异步操作依旧可以满足低延迟高带宽和确定性需求，也同样适合应用在分布式系统中。
Although TSN is highly effective for deterministic transmission, standards such as Qbv, which incorporate TAS, have strict requirements for timing synchronization. If synchronization is off, it increases the complexity and determinism of the TSN network analysis. Asynchronous Traffic Shaping (ATS) (IEEE 802.1Qcr), on the other hand, is designed to allow the elimination of synchronization, permitting each node to send flow traffic according to its local clock timing. This reduction in synchronization complexity still meets the needs for low latency, high bandwidth, and determinism, and is also suitable for application in distributed systems.

ATS算法根据队列分配规则决定数据帧的流向，并通过承诺信息速率（committed information rate）（向令牌桶中加入令牌的速度，限制流量传出速率）以及承诺的突发大小（committed burst size）（令牌桶的最大容量，允许速率超过限制）确定数据帧的资格时间。
如算法1的伪代码显示了计算合格时间，将合格时间分配给帧，并更新ATS调度器状态机变量的过程。
The ATS algorithm determines the flow of data frames based on queue allocation rules and establishes the eligibility time for data frames through the committed information rate —the rate at which tokens are added to the token bucket, which limits the flow transmission rate—and the committed burst size —the maximum capacity of the token bucket, allowing the rate to exceed the limit.
As shown in the pseudocode of Algorithm 1, the process of calculating the eligible time, assigning the eligible time to frames, and updating the ATS scheduler state machine variables is depicted.

```latex
\begin{algorithm}
\caption{ATS algorithm}\label{alATS}
/*Initialization*/\\
$T_{Eligibility} = 0 $\\
$T_{BucketFull} = 0$\\
$T_{GroupEligibility} = 0$\\
/*Frame Process*/\\
\SetKwFunction{ProcessFrame}{ProcessFrame}%定义一个函数
\SetKwFunction{AssignAndProceed}{AssignAndProceed}%定义一个函数
\SetKwFunction{Discard}{Discard}%定义一个函数
\SetKwProg{Fn}{}{\\ \{}{\}}% %定义C语言样式的函数格式
\Fn{\ProcessFrame{$frame$}}{ %C语言的类型注释写法
    $D_{LengthRecovery}=length(frame)/ Rate_{CommittedInformation};$\\
    $D_{EmptyToFull}=Size_{CommittedBurst}/Rate_{CommittedInformation};$\\
    $T_{SchedulerEligibility}=T_{BucketEmpty}+D_{LengthRecovery};$\\
    
    $T_{BucketFull}=T_{BucketEmpty}+D_{EmptyToFull};$\\
    
    $T_{Eligibility}=\max\{T_{arrival}^{frame}, T_{GroupEligibility}, T_{SchedulerEligibility}\};$\\
    \eIf{$T_{Eligibility}\le (T_{arrival}^{frame}+T_{MaxResidence}/1.0e9)$}
    {
        $T_{GroupEligibility}=T_{Eligibility};$\\
        \eIf{$T_{Eligibility} < T_{BucketFull}$}
        {
        $T_{BucketEmpty}=T_{SchedulerEligibility};$\\
        }
        {
        $T_{BucketEmpty}=T_{SchedulerEligibility}+T_{Eligibility}-T_{BucketFull};$\\
        }
        \AssignAndProceed{$frame$, $T_{Eligibility}$}\;
    }
    {
        \Discard{$frame$}\;
    }
}

\end{algorithm}

```

算法1本质上描述的还是令牌桶机制，但区别在于数据帧被分配了一个资格时间$T_{Eligibility}$，降低了重复计算令牌桶的复杂性。除此之外还有$T_{BucketEmpty}$和$T_{BucketFull}$分别表示令牌桶空闲和桶满时间，其中桶满时间是令牌桶中令牌数量达到$Size_{CommittedBurst}$时刻。$D_{EmptyToFull}$表示以$Rate_{CommittedInformation}$将令牌桶从空闲填充到满所需的时长。$D_{LengthRecovery}$表示向桶中填充帧长度数量的令牌所需要的时长。当令牌桶令牌数量最少达到帧长度是即满足了调度资格时间$T_{SchedulerEligibility}$。$T_{MaxResidence}$表示帧能够在节点中停留最长的时间。$T_{GroupEligibility}$考虑到了一组同类整形器中最近的资格时间。
经过资格时间计算后，有效的帧将被分配资格时间并进一步处理（$AssignAndProceed(frame,T_{Eligibility})$），反之则会被丢弃$Discard(frame)$。

Algorithm 1 essentially describes the token bucket mechanism, but with the distinction that data frames are allocated an eligibility time $T_{Eligibility}$, which reduces the complexity of repeatedly calculating the token bucket. In addition, there are $T_{BucketEmpty}$ and $T_{BucketFull}$ representing the times when the token bucket is empty and full, respectively, with the bucket full time being the moment when the number of tokens in the token bucket reaches $Size_{CommittedBurst}$. $D_{EmptyToFull}$ indicates the duration required to fill the token bucket from empty to full at the rate of $Rate_{CommittedInformation}$. $D_{LengthRecovery}$ represents the duration needed to fill the bucket with tokens equivalent to the length of the frame. When the number of tokens in the token bucket is at least equal to the frame length, it satisfies the scheduler eligibility time $T_{SchedulerEligibility}$. $T_{MaxResidence}$ represents the maximum time a frame can reside in a node. $T_{GroupEligibility}$ takes into account the most recent eligibility time among a group of similar shapers.
After the eligibility time calculation, valid frames are assigned an eligibility time and further processed ($AssignAndProceed(frame, T_{Eligibility})$), while others are discarded ($Discard(frame)$).

对于整形队列需要遵循队列分配的规则，以下情况的数据帧不能被分配到同一个整形队列：
P1，来自不同发射机
P2，来自相同发射机但是优先级不同
P3，在同一个发射机中具有相同优先级，但是接收器优先级不一样。

For shaping queues, it is necessary to adhere to the rules of queue allocation. Data frames in the following situations should not be assigned to the same shaping queue:
P1: Frames from different transmitters. 
P2: Frames from the same transmitter but with different priorities. 
P3: Frames within the same transmitter with the same priority, but different receiver priorities.

# system model

我们假设一组电子控制单元通过采用IEEE 802.1 QCR标准的TSN网络连接。每个任务被静态的分配给一个ECU，该任务释放的所有作业都在同一个ECU上以固定优先级非抢占模式执行，且在同一个ECU上不存在另一个并行执行的任务。每两个ECU之间通过网络连接（每个ECU上可存在本地任务链），这样组成了一条简单的基于TSN网络的分布式实时系统任务链。
We assume a group of ECUs connected through the TSN network using the IEEE 802.1 Qcr standard. Each task is statically assigned to one ECU, and all the jobs released by this task are executed on the same ECU in a fixed priority non-preemptive mode. There are no other parallel executing tasks on the same ECU. Each pair of ECUs is connected through the network, forming a simple distributed real-time system task chain based on the TSN network.
## Task Module

不同的通信语义会产生不同的时间分析结果。在分布式实时系统中通常采用两种通信语义：
The use of different communication semantics produces varying results in timing analysis, with two communication semantics conventionally employed in vehicular distributed systems:

**隐式通信由AUTOSAR定义[AUTOSAR]为了保证数据一致性。隐式通信语义中在作业开始的时候读取数据，在作业完成的时候写入数据。**
Implicit communication is defined by AUTOSAR [AUTOSAR] to ensure data consistency. In the implicit communication semantics, data is read at the starting of the task and written at its completion. 
**逻辑执行时间是由GIOTTO框架引入的[biondi2018achieving]，目的是为了减少抖动带来的不确定性。LET语义中任务在到达时读取数据在下一周期到来前写入数据。**
Logical Execution Time (LET) was introduced by the GIOTTO framework [biondi2018achieving] with the aim of reducing the uncertainty caused by jitter. In LET semantics, tasks read data upon arrival and write data before the next cycle arrives.

【Mechanisms】和【characterization】都对显示、隐式和逻辑执行时间(LET)三种通信模型下任务链端到端时延的分析加以对比。其中前者更是提出针对隐式通信与LET混合的任务链场景提出新的分析方法，以减少传统分析方法中将任务链上所有任务转为单一通信语义（尤其是LET）所带来的不必要的延迟。
【Mechanisms】 and 【characterization】 both compare the end-to-end timing analysis of task chains under three communication models: explicit communication, implicit communication, and Logical Execution Time (LET). The former, in particular, proposes a new analysis method for task chains that mix implicit communication and LET scenarios, aiming to reduce the unnecessary delays brought about by traditional analysis methods that convert all tasks on the task chain to a single communication semantics (especially LET).

图1展现了通信语义对于端到端延迟分析的影响。其中“直接的”表示数据在执行的任意时刻被读或写，即显示通信。由此可见，LET模型会导致因果链的端到端时延分析结果出现更长的延迟。所以在本文中我们考虑任务链上所有任务都采用隐式通信语义，以减少不必要的延迟对基于TSN的任务链分析结果的影响。
Figure 1 demonstrates the impact of communication semantics on end-to-end timing analysis. The term "direct" indicates that data is read or written at any point during execution, which corresponds to explicit communication. It can be seen that the LET model leads to longer delays in the end-to-end timing analysis results of cause-effect chains. Therefore, in this paper, we consider all tasks on the task chain to adopt implicit communication semantics to reduce the impact of unnecessary delays on the analysis results of task chains based on TSN.

我们考虑单个ECU上的调度任务τ，Ei描述了调度任务τi的最差执行时间（WCET）。Ri描述了调度任务τi的最差响应时间，即所有调度任务实例从到达到完成的最大时间间隔。$J^{j}_i$是τi释放的第j个作业。对于所有τi释放的作业都与任务τi具有相同的属性。$r_i^j$表示释放时间以及$f^{j}_i$表示结束时间。
We consider the scheduling task τ on a single ECU. Ei describes the worst-case execution time (WCET) of the scheduling task τi. Ri describes the worst-case reaction time of the scheduling task τi, i.e., the maximum time interval from arrival to completion of all scheduling task instances. $J^{j}_i$ is the jth job released by τi. All jobs released by τi have the same attributes as the task τi.  $r(J^{j}_i)$  represents the release time and $f(J^{j}_i)$  represents the finish time.

Bi表示调度任务τi的固定大小（为|Bi|）的输入缓冲区。每个调度任务τi从它的输入缓冲区Bi中读取由前驱作业τi-1产生的数据，并将自己产生的数据写入其后继任务τi+1的输入缓冲区Bi+1。
单个ECU上的调度任务采用事件触发（ET）的方式，即当前一个作业$J^{j-1}_i$执行完成（$f(J^{j-1}_i)$时刻）写入缓冲区后，后一个任务$J^{j}_i$在$r(J^{j}_i)$ 时刻触发。后一个作业的读取操作时刻不会早于前一个作业的写入操作时刻。即$r(J^{j}_i) ≥ f(J^{j-1}_i)$
$B_i$ represents the fixed size (is $|B_i|$) input buffer of scheduling task $\tau_i$. Each scheduling task $\tau_i$ reads data generated by the predecessor job $\tau_{i-1}$ from its input buffer $B_i$, and writes its own generated data into the input buffer $B_{i+1}$ of the successor task $\tau_{i+1}$. On a single ECU, scheduling tasks are triggered by events (ET), which means that when the previous job $J^{j-1}_i$ completes execution (at time $f(J^{j-1}_i)$), the next job $J^{j}_i$ is triggered at time $r(J^{j}_i)$. The read operation of a subsequent task will not occur earlier than the write operation of the previous task.

## Network Module
**为了区别ECU上执行的任务，我们将TSN网络中的任务称为网络任务并用m={l，d}表示，而ECU上的任务我们仍然成为任务。我们使用数据帧作为端到端分析的一个基本单元。所以网络任务$m^{i}_j$代表携带任务链信息的数据帧，i代表了数据帧所在的流，并且它是数据流i中的第j个数据帧，在本文后续的内容中。$l(m^{i}_j)$代表了数据帧的长度。$d(m^{i}_j$)代表整个数据帧结束的时间，即数据帧通过ATS算法获得资格时间$et(m^{i}_j)$之后，通过传输算法根据优先级等选择，最后离开的时刻。在数据帧连续的传输过程中，能够确保从一个交换机流出之后才会经过网络传输并流入到下一个交换机中，这类似于ECU上任务对于读写顺序的约束。**
In order to distinguish the scheduling tasks performed on the ECU, we refer to the tasks in the TSN network as network tasks and represent them as m={l, d}, and the tasks on the ECU, we still refer to them as scheduling tasks. We use data frames as the basic unit for end-to-end analysis. Therefore, the network task $m^{i}_j$ represents a data frame carrying task chain information, where i indicates the stream the data frame belongs to, and it is the jth data frame in data stream i in the following content. $l(m^{i}_j)$ represents the length of the data frame. $d(m^{i}_j)$ represents the end time of the entire data frame, which is the moment the data frame leaves after obtaining eligibility time $et(m^{i}_j)$ through the ATS algorithm and selecting the transmission algorithm based on priority, among other things. During the continuous transmission process of data frames, it ensures that they will only be transmitted through the network and enter the next switch after flowing out from one switch. This is similar to the constraint on the read-write order of tasks on an ECU.


**在本文的系统中，我们考虑有N个ECU，最多产生N个流这些数据流通过N个令牌桶整形队列。每个队列Q都具有固定优先级并以先进先出的模式传输数据。$r_n$代表第n个令牌桶的速率，以及$b_n$代表第n个令牌桶的大小（即最大令牌数量）。
对于网络任务，当期被分配至一个令牌桶后，它也会获得的性质，即$r_i$代表了网络任务$m_i$所在队列的速率，同理$b_i$代表了网络任务$m_i$所在队列的令牌桶大小，并有$l_i\le b_i$。
当一个数据帧通过整形队列并获得资格时间后，传输选择算法将轮询队列头选择数据帧传输，在本文的研究中我们认为此时只根据队列的优先级选择最高优先级的数据帧进行下一步传输，而不考虑其他可能存在的干扰情况。**
In the system described in this article, we considered there are a total of $N$ ECU. At most, $N$ flows are generated, and these data flows pass through $N$ token bucket shaping queues. Each queue $Q$ has a fixed priority and transfers data in a first-in, first-out mode. Committed information rate $r_n$ represents the rate of the nth token bucket, and committed burst size $b_n$ represents the size of the nth token bucket (i.e., the maximum number of tokens) with $l_i\le b_i$. 
For network tasks, when assigned to a token bucket, they also acquire properties denoted by $r_i$, representing the rate of the network task $m_i$ in the queue, and similarly, $b_i$ represents the token bucket size of the network task $m_i$ in the queue.
When a data frame passes through the shaping queue and qualifies for transmission time, the transmission selection algorithm will poll the head of the queue to select the data frame for transmission. In our research, we consider that at this point, only the data frame with the highest priority in the queue is selected for the next transmission step, without considering other possible interference situations.

**同样类比于单个ECU上的任务，我们认为网络任务也具有类似的输入缓冲区，当数据需要从一个ECU传向另一个ECU时：
（1）前一个ECU中最后一个处理数据的任务，将其处理之后的数据写入到第一个网络任务的输入缓冲区，并触发数据帧的传输以及开始通过ATS算法计算资格时间等。
（2）由于ATS整形在不同链路上都具有不同的情况，例如优先级等，会导致数据帧分配到不同的令牌桶中。令牌桶也具有不同的容量和速率，所以在本文中我们认为每一跳都是一个新的网络任务。不仅仅只是一个数据帧的传输，而是类比成任务链中的多个前后联系的任务，只不过他们不具有计算并更新数据的功能，相当于通过计算之后仍然得到不变的结果。
（3）经过多个网络任务之后，在最后一跳数据帧将通过传输后写入后一个ECU的输入缓冲区，以完成数据在两个ECU之间的传输。**
Similar to tasks on a single ECU, we believe that network tasks also have similar input buffers when data needs to be transmitted from one ECU to another: 
(1) The last task that processes data in the previous ECU writes its processed data into the input buffer of the first network task, triggering the transmission of data frames and initiating the calculation of qualification time using ATS algorithm, and so on.
(2) Due to different situations, such as priority, in ATS shaping on different links, data frames may be allocated to different token buckets. Token buckets also have different capacities and rates. Therefore, in this paper, we consider each hop as a new network task. It is not just the transmission of a data frame, but rather analogous to multiple interconnected tasks in a task chain, except that they do not have the function of computing and updating data and instead produce unchanged results through computation. 
(3) After going through multiple network tasks, the data frame in the last hop will be written into the input buffer of the next ECU after transmission, completing the data transfer between the two ECUs.

## Task Chains
我们考虑由一系列事件c组成的任务链C={z, c1，c2，c3，...，cn}。所有事件c按序处理在t时刻外部事件z产生的初始数据，并在时刻t'由最后一个事件cn产生关于该数据的最终结果。

We consider a task chain C consisting of a series of events $C=\{z, c_1, c_2, c_3, ..., c_n\}$. All events in c process the initial data generated by external event $z$ at time $t$ sequentially and produce the final result regarding that data at time $t'$ by the last event $c_n$.

定义1（任务链）：任务链C={z, c1，c2，c3，...，cn}满足：
- 任务链C中的事件c0和cn只能是调度任务 $\tau_0$ and $\tau_n$,，即c0和cn只能存在于ECU上。
- c0是一个ECU上的周期性调度任务$\tau_0$，且周期为T，用来定期捕捉外部事件z
- 对于外部事件z，可将其看做任务链的第0个事件，即外部事件z是c0
- 对于任意事件ci （1<i<n-1），可以是调度任务也可以是网络任务。
- 不存在两个连续的事件ci和ci-1（1<i<n-1）为分别在不同ECU上执行的调度任务情况。在任务链上，不同ECU上执行的两个调度任务中间至少有一个网络任务作为连接。例如，ci-1和 ci+1为不同ECU上的调度任务，则ci为一个网络任务。
Definition 1 (Task Chain): a task chain C = {z, c1, c2, c3, ... , cn} are satisfied:
- The events c0 and cn in the task chain C can only be scheduling tasks $\tau_0$ and $\tau_n$, i.e., c0 and cn can only exist on the ECU.
-  c0 is a periodic scheduling task $\tau_0$ on an ECU with period T that is used to periodically capture external events z.
- For the external event z, it can be considered as the 0th event of the task chain, that is, the external event z is c0.
- For any event ci (1<i<n-1), it can be either a scheduling task or a network task.
- There is no case where two consecutive events ci and ci-1 (1<i<n-1) are scheduling tasks executed on separate ECUs. In the task chain, there is at least one network task as a connection between two scheduling tasks executed on different ECUs. For example, if ci-1 and ci+1 are scheduling tasks on different ECUs, then ci is a network task.


就如前文中提到过得一样，反应时间表示外部事件直到系统每个相关任务处理这个更新的最早时间间隔的长度，以及据年龄则表示对于外部事件开始处理后直到基于采样数据所产生激励之间的时间间隔长度。所以，我们根据反应时间和数据年龄的特性得到如下定义。
As mentioned earlier, response time refers to the earliest time interval from an external event to the point when each relevant task within the system begins processing this update, and data age indicates the time interval from the start of processing an external event until the generation of an incentivized output based on sampled data. Therefore, based on the characteristics of response time and data age, we arrive at the following definitions.


定义（反应时间）：对于任务链C的反应时间表示为R(c)
- 任务链C的头部事件（外部事件z）发生的时刻t(z)
- 任务链C的最后一个事件(cn)完成数据处理的时刻f(cn) 
R（c）= t'-t =  f(cn) - t(z)
Definition  (reaction time): the reaction time of a task chain C is expressed as R(c), which includes:
- The moment when the head event of task chain C (external event z) occurs, denoted as t(z).
- The moment when the last event of task chain C (cn) completes data processing, denoted as f(cn).

定义（数据年龄）：对于任务链C的数据年龄表示为D(c)
- 任务链C的头部事件（采样任务τ0）读取数据（隐式通信，即任务释放时刻）的时刻r(c1)
- 任务链C的最终数据处理完的激励时刻r(cn+1) 
D（c）= t'-t =  r(cn+1) - r(c1)
Definition  (data age): the data age of a task chain C is expressed as D(c)
- The head event of task chain C (sampling task τ0​) reads data (implicit communication, i.e., the moment of task release) at time r(c1​).
- The final data processing completion and incentive moment of task chain C is at time r(cn+1​).


根据定义。。。我们可以得到最大反应时间和最大数据年龄的定义如下。
According to the definition...
We can derive the definitions for maximum response time and maximum data age as follows.

定义 （最大反应时间）：任务链的最大反应时间RT(c)是任务链c所有可能路径的反应时间最大值
RT(c) = max{R(c)}
Definition  (Maximum reaction time): the maximum reaction time RT(c) of a task chain is the maximum value of reaction time across all possible paths of the task chain c

定义 （最大数据年龄）：任务链的最大数据年龄DA(c)是任务链c所有可能路径的数据年龄最大值
DA(c) = max{D(c)}
Definition  (Maximum data age): the maximum data age DA(c) of a task chain is the maximum value of data age across all possible paths of the task chain c


问题定义：本文研究的主要工作是针对需要大量数据传输的分布式实时系统仍旧采用低带宽网络（CAN总线）进行端到端时间分析现状，设计了一种基于TSN网络的任务链模型，以提高分布式实时系统高端到端分析能力。在本文研究中，我们将采用802作为TSN网络任务的协议，并将网络传输简单化为网络任务，将其与传统ECU任务链相结合为基于TSN的联合任务链。基于这样的任务链，我们通过将端到端时间分解为任务结束时间间隔分析，获得最大反应时间与最大数据年龄界限。
Problem Definition: The main focus of this paper is to address the current situation where distributed real-time systems requiring substantial data transmission still rely on low-bandwidth networks (such as CAN bus) for end-to-end timing analysis. To this end, a task chain model based on TSN network has been designed to enhance the end-to-end analysis capabilities of distributed real-time systems. In this paper, we adopt the IEEE 802.1 protocol as the standard for TSN network tasks and simplify network transmission into network tasks. These are then integrated with traditional ECU task chains to form a combined task chain based on TSN. With such a task chain, we decompose the end-to-end time into task completion time intervals for analysis, thereby obtaining the bounds for maximum reaction time and maximum data age.

## An Illustrative Example
在图中，任务链由外部事件z、三个调度任务和两个网络任务组成$C = \{z, \tau_0, \tau_1, m_1, m_2, \tau_2\}$。调度任务$\tau_0, \tau_1$和$\tau_2$被静态的分配给了不同的两个ECU，其中$\tau_0, \tau_1$和被分配给了ECU1而$\tau_2$分配给了ECU2，他们通过两个交换机搭建通信网络。其中任务$\tau_0$, $\tau_1$和$\tau_2$的最差执行时间分别为$E_0=3$、$E_1=3$、$E_2=3$。任务$\tau_0$的周期$T=6$。根据任务释放作业的情况我们可以进一步将任务链C表示为$C = \{z, J_0^2, J_1^1, m_1^2, m_2^2, J_2^3\}$。
In the figure, the task chain consists of external event z, three scheduling tasks, and two network tasks, denoted as $C = \{z, \tau_0, \tau_1, m_1, m_2, \tau_2\}$. The scheduling tasks $\tau_0, \tau_1$, and $\tau_2$ are statically allocated to two different ECUs,   where 
$\tau_0, \tau_1$ are assigned to ECU1, and $\tau_2$ is assigned to ECU2, and they are connected through two switches to establish a communication network. The worst-case execution times for tasks $\tau_0, \tau_1$, and $\tau_2$ are $E_0=3$, $E_1=3$, and $E_2=3$ respectively. The period of task $\tau_0$ is $T=6$. Based on the task release order, the task chain C can be further represented as $C = \{z, J_0^2, J_1^1, m_1^2, m_2^2, J_2^3\}$.


在$t=4$的时刻系统产生了外部事件并写入相关的初始数据到任务$J_0^2$的输入缓冲区$B_0$。在t=6时刻采样任务释放的作业$J_0^2$捕捉到了它的输入缓冲区$B_0$更新的外部事件数据。在$t=10$时刻ECU1上的调度任务$J_0^2$处理数据结束并将更新后的数据写入任务$J_1^1$的输入缓冲区$B_1$。当任务$J_1^1$结束后，产生的输出将开始通过网络传输到ECU2。该数据帧在$t=17$时刻入队，通过ATS整形算法，并在$t=21$时刻整个数据帧在交换机1结束处理。根据网络拓扑或路由选择算法等要求数据帧被要求传输至交换机2，与上一次网络传输一样，数据帧将继续通过ATS相关处理。类似的在$t=32$时刻，数据帧由交换机2传输到ECU2。最后在$t=36$时刻产生关于外部事件z的最终数据结果。如图所示，根据定义处理外部事件z的任务链的反应时间为$R(C)=36-4=32$。根据外部事件z而产生的激励动作发生在任务链最终结果产生之后的下一个数据处理任务，根据本文任务模型，激励动作发生时间即为任务链最后一个任务之后下一个任务的释放时刻，也为任务链最后一个任务的结束时刻，因为我们采用的是事件触发方法。所以根据定义，任务链的数据年龄为$D(C)=36-6=30$
At the system time $t=4$, an external event occurs and the relevant initial data is written into the input buffer $B_0$ of task $J_0^2$. At time $t=6$, the sampling task $J_0^2$ that was released captures the external event data updated in its input buffer $B_0$. At $t=10$, the scheduling task $J_0^2$ on ECU1 finishes processing the data and writes the updated data into the input buffer $B_1$ of task $J_1^1$. When task $J_1^1$ ends, the resulting output begins to be transmitted over the network to ECU2. The data frame is enqueued at time $t=17$, shaped by the ATS algorithm, and by time $t=21$, the entire data frame has finished processing at switch 1. As required by network topology or routing selection algorithms, the data frame is directed to switch 2, where it continues to undergo ATS-related processing. Similarly, at time $t=32$, the data frame is transmitted from switch 2 to ECU2. Finally, at time $t=36$, the final data result regarding the external event z is produced. As shown in the figure, according to the definition, the reaction time of the task chain processing external event z is $R(C) = 36 - 4 = 32$. The incentivized action resulting from external event z occurs after the final result of the task chain is produced, at the release time of the next data processing task following the last task in the chain. According to the task model of this paper, the time of the incentivized action is the release time of the next task after the last task in the task chain, which is also the end time of the last task in the chain, because we are using an event-triggered method. Therefore, by definition, the data age of the task chain is $D(C) = 36 - 6 = 30$.

# End-to-eng Timing Analysis

本节中我们进行了基于TSN网络多ECU场景下端到端时延分析以取代传统的CAN总线分析，分别给出了最大反应时间和最大数据年龄的结果。

In this section, we conducted an end-to-end timing analysis for a multi-ECU scenario based on the TSN network as a replacement for traditional CAN bus analysis, providing results for both maximum reaction time and maximum data age.
## Maximum Reaction Time Analysis

**在本节中我们将讨论最大反应时间的上界，参考【】我们假设调度任务的缓冲区是固定大小的，而且存在缓冲区满数据帧溢出的情况。但对于基于ATS算法网络任务现有的分析大部分基于LRQ或是TBE，并且只考虑TSN网络本身，并不适用于任务链的分析。所以我们将基于ATS算法网络任务部分分析与现有ECU调度任务链分析整合，扩展到通过TSN网络互联的多个ECU之间的任务链最大反应时间上界分析。**
In this section, we will discuss the upper bound of the maximum reaction time. Referring to [], we assume that the buffer for scheduling tasks is of a fixed size, and there is a possibility of buffer overflow. However, most of the existing analysis for network tasks based on the ATS algorithm is based on LRQ or TBE, and only considers the TSN network itself, which is not suitable for analyzing task chains. Therefore, we will integrate the partial analysis of network tasks based on the ATS algorithm with the existing analysis of ECU scheduling task chains, and extend it to analyze the upper bound of the maximum reaction time for task chains between multiple ECUs interconnected through the TSN network.

定义 （结束时间）：对于任务链$C = \{z, c_1, c_2, c_3, ... , c_n\}$中的每一个事件，$t(\cdot )$为事件的结束时间：
- 对于外部事件z，$t(z)$为外部事件发生的时间，t(c0)为外部事件结束时间。根据定义1可知，外部事件z也是任务链的事件c0。外部事件的结束时间就是当外部事件触发后，下一个将要捕捉此外部事件z的周期性调度任务τ0对应的作业的释放时间。
- 对于ECU上的调度任务$\tau_i$来说$t(c_i)$为调度任务$\tau_i$的结束时间$f(c_i)$。
- 对于网络任务$m_i$来说$t(c_i)$为结束时间$d(c_i)$。
Definition (End Time): For each event in a task chain $C = \{z, c_1, c_2, c_3, ..., c_n\}$, $t(\cdot)$ represents the end time of the event: 
-   For the external event z, $t(z)$ denotes the time at which the external event occurs, and $t(c_0​)$ is the end time of the external event. According to Definition 1, the external event z is also the event c0 of the task chain. The end time of the external event is the release time of the periodic scheduling task τ0 that is next poised to capture this external event z after it has been triggered.
- For a scheduling task $\tau_i$ on the ECU, $t(c_i)$ is the end time $f(c_i)$ of the scheduling task $\tau_i$. 
- For a network task $m_i$, $t(c_i)$ is the end time $d(c_i)$.


$$t(\cdot)=
\begin{array}{l} 
  \left\{\begin{matrix} 
  t(z)  & \text{if an external event}\\
t(c_i)=f(c_i) & \text{if a scheduling task}\quad\tau_i\\
d(c_i) & \text{if a network task}\quad m_i\\
\end{matrix}\right.    
\end{array} $$ **基于公式（），对于反应时间我们可以将其表示为：**
Based on formula (), For reaction time, we can express it as:
$$\begin{equation}
\begin{aligned}
R(C) & = t'-t\\
     & = t(c_n) - t(z)\\
     & = t(c_1) - t(z) + \sum_{i=1}^{n}(t(c_i) - t(c_{i-1}))\\
     & = t(c_1) - r(c_1) + r(c_1) - t(z) + \sum_{i=1}^{n}(t(c_i) - t(c_{i-1}))\\
     & = t(c_1) - t(c_0) + t(c_0) - t(z) + \sum_{i=1}^{n}(t(c_i) - t(c_{i-1}))\\
     & = t(c_0) - t(z) + \sum_{i=1}^{n}(t(c_i) - t(c_{i-1}))\\
\end{aligned}
\end{equation}$$

则最大反应时间根据公式（）为$\max\{t(c_0) - t(z) + \sum_{i=1}^{n}(t(c_i) - t(c_{i-1}))\}$
The maximum reaction time is determined according to formula () is $\max\{t(c_0) - t(z) + \sum_{i=1}^{n}(t(c_i) - t(c_{i-1}))\}$

**根据公式（4）我们可以对任务链C的的最大反应时间分段求取上界。我们将任务链C的最大反应时间分为两部分**
Based on formula (4), we can obtain upper bounds for the maximum reaction time of task chain C in segments. We divide the maximum reaction time of task chain C into two parts.

Part one. $t(c_0)-t(z)$的上界
Part \uppercase\expandafter{\romannumeral1}. The upper bound of $t(c_0)-t(z)$.

**引理1，The upper bound of $t(c_0)-t(z)$ is $t(c_0)-t(z) \le T$**
Lemma 1, $t(c_0)-t(z) \le T$.

证明，根据定义（1），我们可以获得事件$c_1$的定义，即事件$c_1$必然是一个调度任务为$\tau_0$，所以根据定义（4）外部事件z的结束时间为$t(c_0)=r(c_1)=r(\tau_0)$。继续使用定义（1），事件$c_1$（调度任务$\tau_0$）以T为周期捕捉外部事件z，所以当外部事件在t(z)开始触发之后最晚在一个周期T之内，它将被调度任务$\tau_0$释放的作业捕捉。所以我们可以得到$t(c_0)-t(z)$的上界为T。

Proof: According to Definition (1), we can obtain the definition of event $c_1$​, which must be a scheduling task for $τ_0$​. Therefore, based on Definition (4), the end time of the external event $z$ is $t(c_0​)=r(c_1​)=r(\tau_0​)$. Continuing to use Definition (1), event $c_1$​ (scheduling task $\tau_0$​) captures the external event $z$ with a period $T$. Thus, after the external event starts at $t(z)$, it will be captured by the job released by scheduling task $\tau_0$​ within at most one period $T$. Hence, we can derive that the upper bound of $t(c_0​)−t(z)$ is $T$.

**Part two. $t(c_i)-t(c_{i-1})$的上界**
Part two. The upper bound of $t(c_i)-t(c_{i-1})$.

定义5，事件状态。为了简化表达便于分析，我们使用$s(\cdot)$表示任务链$C = \{z, c_1, c_2, c_3, ... , c_n\}$中每个事件的状态，即对于任意一个事件$c_i$它代表的任务类型。
- 如果是调度任务，则$s(c_i)=\tau$,
- 如果是网络任务，则$s(c_i)=m$,
- 外部事件不需要状态符号，“z”只为了表达外部事件
 Definition 5, Event Status. In order to simplify the expression for ease of analysis, we use $s(\cdot)$ to represent the status of each event in the task chain $C = \{z, c_1, c_2, c_3, ..., c_n\}$, i.e., for any event $c_i$, it represents the type of task it stands for.
- If it is a scheduling task, then $s(c_i) = \tau$,
- If it is a network task, then $s(c_i) = m$.
- External events do not require state symbols; "z" is used merely to denote an external event.
- $$s(c_i)=
\begin{array}{l} 
  \left\{\begin{matrix} 
\tau  & \text{if a scheduling task}\\
m  & \text{if a network task}\\
\end{matrix}\right.    
\end{array} $$

**引理2，$t(c_i)-t(c_{i-1}) \le D$ 
其中，**
Lemma 2, $t(c_i)-t(c_{i-1}) \le D$,
where

$$D=\begin{array}{l} 
\left\{\begin{matrix} 
\alpha  & s(c_i)=\tau, s(c_{i-1})=\tau\\
\theta +t   & s(c_i)=m\\
\alpha  +t  & s(c_i)=\tau, s(c_{i-1})=m\\
\end{matrix}\right.    
\end{array}$$


**对于P2部分我们分为三种情况讨论他们的上界。**
For the P2 part, we divide it into three cases to discuss their upper bounds.

**case1：$s(c_i)=\tau, s(c_{i-1})=\tau$。即前后相邻的两个事件中，前一个事件$c_{i-1}$为调度任务$\tau_{i-1}$ ，后一个任务$c_i$也是调度任务$\tau_i$ 。**
Case 1: $s(c_i) = \tau, s(c_{i-1}) = \tau$. In other words, in the adjacent events, the previous event $c_{i-1}$ is a scheduling task $\tau_{i-1}$, and the subsequent task $c_i$ is also a scheduling task $\tau_i$.



**这种情况下，我们参考【tangReactionTimeAnalysis2023】中对于固定大小缓冲区事件触发链的时间上限。
令$\alpha=\max\{\overline{\beta_i^l}((|B_i| + 1)\cdot E_i), DLY_i(|B_i|)\}$**
In this case, we refer to the time upper bound for fixed-size buffer event-triggered chains discussed in [reference]. Let $\alpha=\max\{\overline{\beta_i^l}((|B_i| + 1)\cdot E_i), DLY_i(|B_i|)\}$

**其中$\overline{\beta(\cdot)}$为资源曲线函数$\beta(\Delta )$的伪逆函数，表示系统处理一定工作负载所需要的时间。**
In this equation, $\overline{\beta(\cdot)}$ represents the pseudo-inverse function of the resource curve function $\beta(\Delta)$, which indicates the time required for the system to process a certain workload.



资源服务曲线定义自[thiele2000real]，用$⟨β^l_i(∆), β^u_i(∆)⟩$来表示在任意$∆$时间段内任务可用的最小和最大负载。通过【tangReactionTimeAnalysis2023】证明在$[t(c_i)，t(c_{i-1}))$期间内，系统能提供的最大处理时间（工作负载）为$\beta^l_i([t(c_i)，t(c_{i-1})))=(|Bi|+1)\cdot E_i$，且在此期间内所有的资源都被用于处理任务。所以根据伪逆函数的定义[le2001network]，$f^{-1} \left ( x \right ) = \inf \left \{ \text{ t such that }  f(t)\ge x  \right \}$,可以进一步得到，系统如果需要处理$(|Bi|+1)\cdot E_i$的工作负载则需要的时间就是$\bar{\beta^l_i}(|Bi|+1)·E_i)$。
The definition of the resource service curve is from [thiele2000real], represented by $⟨β^l_i(∆), β^u_i(∆)⟩$ to indicate the minimum and maximum load available for a task in any time interval $∆$. According to [tangReactionTimeAnalysis2023], it is proven that during the period $[t(c_i), t(c_{i-1}))$, the maximum processing time (workload) that the system can provide is $\beta^l_i([t(c_i), t(c_{i-1})]) = (|Bi|+1) \cdot E_i$, and all resources are used for processing tasks during this period. Therefore, based on the definition of the pseudo-inverse function [le2001network], $f^{-1}(x) = \inf \{t \text{ such that } f(t) \ge x\}$, it can be further derived that the time needed by the system to process a workload of $(|Bi|+1) \cdot E_i$ is $\bar{\beta^l_i}((|Bi|+1) \cdot E_i)$.


**而$DLY_i(|B_i|)$是作业的最大延迟。**
 $DLY_i(|B_i|)$ represents the maximum delay of the job

$DLY_i(\left | B_i \right | ) = \min \left \{ H(\alpha_{i}^{l}, \left | B_i \right | +1),H(\hat{\alpha_{i}^{u}} ,\beta_{i}^{'l} )\right \}$

其中$\left \langle \alpha^l_i ,  \alpha^u_i  \right \rangle$ 是到达曲线，表示在任意$∆$时间段内数据到达最小和最大的数量。
相关参数计算如下[phan2010modeling]：
Where $\left \langle \alpha^l_i ,  \alpha^u_i  \right \rangle$ is the arrival curve, indicating the minimum and maximum amount of data arriving in any time interval $∆$.
The calculation of the relevant parameters is as follows [phan2010modeling ]:
$\hat{\alpha _{i}^{u}} = \min \left \{ \alpha _{i}^{u}, \beta _{i}^{'l}+\left | B_i \right | +1 \right \}$
$H(f,g)=\sup_{\lambda \ge 0}\left \{ \inf \left \{ \varepsilon \ge 0 : f(\lambda) \le g(\lambda + \varepsilon ) \right \}  \right \}$

对于每个调度任务有以下递归计算获得$\alpha$和$\beta$  
For each scheduled task, the following recursive computation is used to obtain $\alpha$ and $\beta$.
$\beta_{i}^{'l} = \left \lfloor \beta_{i}^{l} / E_i \right \rfloor$, $\beta_{i}^{'u} = \left \lceil \beta_{i}^{u} / E_i \right \rceil$
$\beta_{i}^{''l}=\beta_{i}^{'l}\otimes \alpha_{i}^{l}\otimes(\alpha_{i}^{l}\otimes\beta_{i}^{'l}+(B_i+1))^o$
$\alpha_{i+1}^{l}=\min ((\alpha_{i}^{l}\oslash\beta_{i}^{'u} ) \otimes\beta_{i}^{l},\beta_{i}^{'l})$
$\beta_{i}^{''u}=\beta_{i}^{'u}\otimes \alpha_{i}^{u}\otimes(\alpha_{i}^{u}\otimes\beta_{i}^{'u}+(B_i+1))^o$
$\alpha_{i+1}^{u}=\min ((\alpha_{i}^{u}\otimes\beta_{i}^{'u} ) \oslash\beta_{i}^{l},\beta_{i}^{'u})$
$f\otimes g(\bigtriangleup  )=\inf \{f(s)+g(\bigtriangleup-s)|0\le s \le \bigtriangleup\}$
$f\oslash g(\bigtriangleup )=\sup \{f(\bigtriangleup+u)-g(u)|u\ge0\}$

注意对于递归计算的起点（采样任务$\tau_0$,周期为T）有以下定义：
Please note that for the starting point of recursive computation (sampling task $\tau_0$ with a period of T), the following definition applies:
$\alpha_{0}^{l} = \left \lfloor \Delta / T \right \rfloor$, $\alpha_{0}^{u} = \left \lceil \Delta / T \right \rceil$


**所以我们可以得到当$s(c_i)=\tau, s(c_{i-1})=\tau$时，$D=\alpha= \max\{\overline{\beta_i^l}((|B_i| + 1)\cdot E_i), DLY_i(|B_i|)\}$**
Therefore, we can obtain that when $s(c_i)=\tau$ and $s(c_{i-1})=\tau$, $D=\alpha= \max\{\overline{\beta_i^l}((|B_i| + 1)\cdot E_i), DLY_i(|B_i|)\}$.

**case2：$s(c_i)=m$。即前后相邻的两个事件中，后一个任务$c_i$是调度任务$m_i$ ，而前一个事件不受限制 $c_{i-1}=\tau_{i-1}$ or $m_{i-1}$**
Case 2: $s(c_i)=m$. In other words, in the two consecutive events, the subsequent task $c_i$ is scheduled as a task $m_i$, while the preceding event is not restricted, $c_{i-1}=\tau_{i-1}$ or $m_{i-1}$.

**如图1所示，我们考虑数据（1）在一个ECU上传入网络；(2)网络中不同交换机之间传输；(3)网络中最后一跳传输到另一个ECU。这三种情况下，根据网络带宽以及数据大小，在一条任务链的分析中，数据传输具有相同的延迟为t（数据大小/带宽）。**
As shown in Figure 1, we consider the following scenarios in the analysis of a task chain: (1) Data input from an ECU into the network, (2) Transmission between different switches in the network, and (3) Final hop transmission to another ECU in the network. In these three scenarios, based on the network bandwidth and data size, data transmission has the same delay of t (data size/bandwidth) in the analysis of a task chain.


**对于网络任务，根据令牌桶算法我们知道数据帧的延迟会受到(1)高优先级队列的流；(2)低优先级队列的流；(3)同等优先级竞争的流；(4)数据流本身的性质；(5)当前令牌桶性质的影响。所以根据Specht等人在【】所求的上界，以及【GrigorjewMetzgerHossfeldetal】可得到
$(\frac{b_H+b_j-l_i+l_L}{r-r_H} + \frac{l_i}{r})$，其中$H$，$L$，$j$分别表示了高优先级、低优先级与竞争流的索引。并且取得高优先级流 committed burst size的集合$b_H$，竞争的合集$b_j$，以及低优先级中最大帧长度$l_L$，** 其中 $r>\sum_{k\in H\cup j\cup i }r_k$
> $(\frac{b_H+b_j+b_i-l_i+l_L}{r-r_H} + \frac{l_i}{r})$


For network tasks, according to the token bucket algorithm, we know that the delay of data frames is influenced by (1) flows in the high priority queue, (2) flows in the low priority queue, (3) flows competing with equal priority, (4) the nature of the data flow itself, and (5) the current nature of the token bucket.
Therefore, based on the upper bound obtained by Specht et al. in 【】and 【TimeSensitiveNetworking2021】, we can obtain $(\frac{b_H+b_j-l_i+l_L}{r-r_H}+ \frac{l_i}{r})$, where $H$, $L$, and $j$ respectively represent the indices of the high-priority, low-priority, and competing flows.  And obtain a collection of high priority flows with committed burst size $b_H$, a set of competing burst sizes $b_j$, and the maximum frame length $l_L$ in low priority.
Where $r>\sum_{k\in H\cup j\cup i }r_k$

所以我们可以得到当$s(c_i)=m$时，$D=\theta+t=(\frac{b_H+b_j-l_i+l_L}{r-r_H} + \frac{l_i}{r})+t$**
So we can obtain that when $s(c_i)=m$,$D=\theta+t=(\frac{b_H+b_j-l_i+l_L}{r-r_H} + \frac{l_i}{r})+t$.

**case3：$s(c_i)=\tau, s(c_{i-1})=m$。即前后相邻的两个事件中，前一个事件$c_{i-1}$为网络任务$m_{i-1}$ ，后一个任务$c_i$是调度任务$\tau_i$ 。**
Case 3: $s(c_i)=\tau, s(c_{i-1})=m$. That is, in the sequence of two consecutive events, the first event $c_{i-1}$ is a network task $m_{i-1}$, and the second task $c_i$ is a scheduling task $\tau_i$.

在这种情况下我们需要将网络传输到另一个ECU的情况考虑进去，就像case2一样。所以可以获得同样的传输时间t。并且在t时间段结束后数据被写入调度任务$\tau_i$的输入缓冲区，在$r_i$时刻我们可以类比为case1中前一个调度任务的结束时刻$f_{i-1}$，所以我们可以获得同样的时间结果为$\alpha$。
In this case, we need to consider the situation where the network transmission needs to be done to another ECU, similar to case 2. So, we can obtain the same transmission time, t. And after the t time period, the data is written into the input buffer of the scheduling task $\tau_i$. At time $r_i$, we can analogize it to the end time of the previous scheduling task, $f_{i-1}$, in case 1. Therefore, we can obtain the same time result is $\alpha$.

**所以我们可以得到当$s(c_i)=\tau, s(c_{i-1})=m$时，**$D=\alpha + t=\max\{\overline{\beta_i^l}((|B_i| + 1)\cdot E_i), DLY_i(|B_i|)\}+t$
So we can obtain that when $s(c_i)=\tau, s(c_{i-1})=m$, $D=\alpha + t=\max\{\overline{\beta_i^l}((|B_i| + 1)\cdot E_i), DLY_i(|B_i|)\}+t$.

**综合part 1和part 2我们可以得到以下定理。**
By combining part 1 and part 2, we can derive the following theorem.
定理1，任务链$C = \{z, c_1, c_2, c_3, ... , c_n\}$的最大反应时间上界为：
其中，$D$由引理2给出。
Theorem 1, the maximum reaction time upper bound of task chain $C = \{z, c_1, c_2, c_3, ... , c_n\}$ is:
$$\begin{equation}
\begin{aligned}
RT(C)
& =\max{R(C)}\\
& = t(c_0) - t(z) + \sum_{i=1}^{n}(t(c_i) - t(c_{i-1}))\\
& = T + D
\end{aligned}
\end{equation}$$
Where $D$ is given by Lemma 2.

## Maximum Data Age Analysis

在本节中我们将讨论最大数据年龄的上界，对于任务链的缓冲区要求我们需要与最大反应时间分析一致，所以在本节中我们将使用相同的术语描述最大数据年龄的分析问题。我们将任务链最大数据年龄分析的问题分解为每两个相邻任务之间“结束时间”间隔界限的问题。同样，TSN网络对于任务链的最大数据年龄分析的影响仅仅是考虑其作为一个网络任务对于整个联合任务链的影响，而不会详细讨论TSN网络本身的端到端延迟问题如何获得更精确上界。
In this section, we will discuss the upper bound of the maximum data age. For the buffer requirements of the task chain, we need to be consistent with the maximum reaction time analysis. Therefore, in this section, we will use the same terminology to describe the analysis problem of the maximum data age. We decompose the problem of the maximum data age analysis for the task chain into the problem of the "end time" interval boundaries between each pair of adjacent tasks. Similarly, the impact of the TSN network on the maximum data age analysis of the task chain is simply to consider its effect as a network task on the entire combined task chain, without detailed discussion on how to obtain a more precise upper bound for the end-to-end delay issue within the TSN network itself.

根据前一节最大反应时间分析中提到的结束时间的定义，以及公式，对于数据年龄我们可以将其表达为
Based on the definition of "end time" mentioned in the previous section's maximum reaction time analysis, as well as the formula provided, we can express data age as follows:


$$\begin{equation}
\begin{aligned}
D(C) & = t'-t\\
	 & = r(c_{n+1}) - r(c_1)\\
	 & = f(c_n) - r(c_1)\\
     & = t(c_n) - r(c_1)\\
     & = t(c_n) - t(c_0)\\
     & = \sum_{i=0}^{n}(t(c_i) - t(c_{i-1}))\\
\end{aligned}
\end{equation}$$

则最大数据年龄根据公式（）为$\max\{\sum_{i=0}^{n}(t(c_i) - t(c_{i-1}))\}$
The maximum data age is determined according to formula () is $\max\{\sum_{i=0}^{n}(t(c_i) - t(c_{i-1}))\}$

与最大反应时间的分段分析方式不同，根据公式，我们可以对任务链c的最大数据年龄分解为每两个相邻任务之间“结束时间”间隔界限的问题。首先这是由于数据年龄与反应时间的定义不同，数据年龄将不会关注引起任务链数据传输的外部事件，不需要考虑外部事件如何产生以及传输。数据年龄的开始点是数据开始处理的时刻，在本文的任务链模型中也就是能够第一个成功捕捉到外部事件产生的数据的采样任务的释放时间。而相对的，反应时间的分析中我们同样不需要考虑数据经过整条任务链之后，系统将最终更新的数据交给哪一个任务用于激励动作，但数据年龄需要考虑这个过程。

Unlike the segmented analysis method for maximum reaction time, according to the formula, we can decompose the maximum data age of task chain c into the problem of "end time" interval boundaries between each pair of adjacent tasks. This is primarily because data age, unlike reaction time, does not focus on the external events that trigger data transmission in the task chain. It does not consider how external events are generated or transmitted. The starting point of data age is the moment when data processing begins, which in the task chain model of this paper is the release time of the first sampling task that successfully captures the data generated by the external event. Conversely, in the analysis of reaction time, we do not need to consider which task the system ultimately hands over the final updated data to for the incentivized action after it has passed through the entire task chain. However, data age must take this process into account.


在其他的数据年龄分析工作中【bi2022efficient】或【 10.1145/3534879.3534893】等，对于数据年龄分析通常考虑“last-to-last”路径，确定数据最后激励所在的位置。而在本文的任务链模型中，由于采用了事件触发方式并考虑固定大小的缓冲区以及数据帧溢出情况，所以激励动作的时间是任务链最终数据传输的下一个任务的释放时刻，也就是任务链最后一个任务的结束时刻，如图所示，同理数据年龄公式中用$t(c_n)$表达激励动作时刻。
In other works on data age analysis such as [bi2022efficient] or [10.1145/3534879.3534893], the "last-to-last" path is typically considered for data age analysis to determine the location of the data's final incentivization. However, in the task chain model of this paper, since an event-triggered approach is used with consideration for fixed-size buffers and the possibility of data frame overflow, the time of the incentivized action is the release time of the next task in the data transmission of the task chain, which is also the end time of the last task in the task chain. Similarly, the moment of the incentivized action is expressed with $t(c_n​)$ in the data age formula.

对于$t(c_i)-t(c_{i-1})$的上界，我们同样需要考虑三种情况，根据定义5表达如下：
- $s(c_i)=\tau, s(c_{i-1})=\tau$。
- $s(c_i)=m$。
- $s(c_i)=\tau, s(c_{i-1})=m$。
具体的意思已由上一章节给出。
  
For the upper bound of $t(c_i​)−t(c_{i−1}​)$, we also need to consider three scenarios, which are expressed according to Definition 5 as follows:
- $s(c_i)=\tau, s(c_{i-1})=\tau$。
- $s(c_i)=m$。
- $s(c_i)=\tau, s(c_{i-1})=m$。

同理，根据引理2，我们可以轻松的获得每两个相邻任务之间“结束时间”间隔界限。
  
Likewise, according to Lemma 2, we can easily obtain the "end time" interval boundaries between each pair of adjacent tasks：
 $t(c_i)-t(c_{i-1}) \le D$,
where

$$D=\begin{array}{l} 
\left\{\begin{matrix} 
\alpha  & s(c_i)=\tau, s(c_{i-1})=\tau\\
\theta +t   & s(c_i)=m\\
\alpha  +t  & s(c_i)=\tau, s(c_{i-1})=m\\
\end{matrix}\right.    
\end{array}$$

综合上述内容，我们可以得到以下定理
Combining the above information, we can derive the following theorem:
定理2，任务链$C = \{z, c_1, c_2, c_3, ... , c_n\}$的最大数据年龄上界为：
其中，$D$由引理2给出。
Theorem 2, the maximum data age upper bound of task chain $C = \{z, c_1, c_2, c_3, ... , c_n\}$ is:
$$\begin{equation}
        \begin{aligned}
            DA(C)
        & =\max{D(C)}\\
        & = \sum_{i=0}^{n}(t(c_i) - t(c_{i-1}))\\
        & = \sum_{i=0}^{n}D
        \end{aligned}
    \end{equation}$$
Where $D$ is given by Lemma 2.

# Evaluation
在本章中，我们评估了基于TSN网络传输的任务链模型最大反应时间和最大数据年龄的上界。
我们设置每条任务链除了外部事件，其余部分由三个调度任务以及两个网络任务组成，类似于文献【houtanSupportingEndtoendData2023】中的车辆应用案例。这些任务链被设定为两个ECU之间传输的情况，前两个调度任务是由外部事件在第一个ECU上触发的部分，通过网络任务的传输，最终由最后一个调度任务在另一个ECU上完成外部事件的处理。对于所有调度任务，在[1,60]，之间选择其的WCET，并在[1,100]中随机选择$T$。按照时分多址模型得到：
$\beta (\bigtriangleup ) = (\left \lfloor \bigtriangleup'/x_i  \right \rfloor \cdot s_i+\min (\bigtriangleup'/x_i \mod{ x_i,s_i} ))\cdot b_i$
In this chapter, we evaluated the upper bound of the maximum reaction time and maximum data age for the task chain model based on TSN network transmission. We set up each task chain to consist of three scheduling tasks and two network tasks, except for external events, similar to the vehicle application case in the literature [HOUTAN2023102911]. These task chains were configured for transmission between two ECUs, where the first two scheduling tasks were triggered by external events on the first ECU. Through the transmission of network tasks, the final external event processing was completed by the last scheduling task on the other ECU. For all scheduling tasks, their WCET (worst-case execution time) was selected between [1,60], and $T$ was randomly chosen between [1,100]. According to the time-division multiple access model, we obtained:
$\beta (\bigtriangleup ) = (\left \lfloor \bigtriangleup'/x_i \right \rfloor \cdot s_i+\min (\bigtriangleup'\mod{ x_i,s_i} ))\cdot b_i$

其中$\bigtriangleup'=\max (\bigtriangleup-x_i+s_i,0)$。在我们的实验中，$x_i$是在[50，120]中随机选择的，$b_i=1$，$\delta =40$，$s_i=x_i−\delta$。对于网络任务，整个网络的带宽被设定为1Gbit/s。对于每条任务链上的网络任务，数据帧的长度在[84,1542]Byte 中随机分配。
我们同时生成了$N$个干扰任务（包括网络任务本身），N在[5,50]中随机选择，他们根据分配的队列获得了相应的优先级以及参数$r$和$b$。
每个泄漏率 $r$是随机选择的，且 $0 < r \le 1$，$b$与$l$范围相同。
Among them, $\bigtriangleup'=\max (\bigtriangleup-x_i+s_i,0)$. In our experiment, $x_i$ is randomly selected from [50, 120], $b_i=1$, $\delta =40$, and $s_i=x_i-\delta$. For network tasks, the total network bandwidth is set to 1Gbit/s. For each network task on the task chain, the length of the data frame is randomly allocated from [84, 1542] bytes. We also generate $N$ interference tasks (including the network task itself), randomly select N from [5, 50], which obtain corresponding priority and parameters $r$ and $b$ based on the assigned queue. Each leakage rate $r$ is randomly selected, and $0 < r \le 1$, $b$ is within the same range as $l$.

我们在实验平台进行了评估，with intel(R) Core(TM) i7-10700 CPU @ 2.90GHz and 32GB DDR4。
首先我们评估了数据帧长度对于最大反应时间的影响，如图1.1所示，我们选择网络任务中40%为高优先级，30为同等优先级，其余为低优先级的。为了更好的显示结果的变化，我们对过长的数据进行了归一化处理。当数据帧长度增加时，最大反应时间也随之增加，直到达到committed burst size。
We conducted an evaluation on the experimental platform with intel(R) Core(TM) i7-10700 CPU @ 2.90GHz and 32GB DDR4.
First, we evaluated the impact of data frame length on maximum reaction time, as shown in Figure 1.1. We chose a network task with 40% high priority, 30% equal priority, and the remaining as low priority. In order to better visualize the changes in the results, we applied normalization to the overly long data.
As the data frame length increases, the maximum reaction time also increases, until it reaches the committed burst size.

接着我们观察了高优先级网络任务和同等优先级任务对于最大反应时间的影响。如图1.2和1.3所示，我们限定N=40, T=50, E=0.5，并将高优先级与同等优先级任务的占比以10%的步长冲10%增加到90%。在图1.2中，我们可以得到当高优先级任务占比增加最大反应时间也随之增加，而在图1.3中同等优先级任务占比增加则最大反应时间随之减小。这是由于在公式【】中，高优先级任务与同等优先级任务对分子分母的影响不同。
Next, we observed the impact of high-priority network tasks and tasks with equal priority on the maximum reaction time. As shown in Figures 1.2 and 1.3, we set N=40, T=50, E=0.5 and increased the proportion of high-priority and equal-priority tasks in increments of 10% from 10% to 90%. In Figure 1.2, we can see that as the proportion of high-priority tasks increases, the maximum reaction time also increases. On the other hand, in Figure 1.3, as the proportion of equal-priority tasks increases, the maximum reaction time decreases. This is because the influence of high-priority tasks and equal-priority tasks on the numerator and denominator is different in the formula [].


通过同样的实验配置以及参数选择，我们继而得到了最大数据年龄的结果。如图a所示，我们可以看到和最大反应时间分析类似的结果，当增加数据帧长度时，最大数据年龄同样随之增加。同样的还有图b和图c，以10%的步长分别将高优先级任务和同等优先级任务占比从10%增加到90%，我们可以分别得到最大数据年龄随高优先级任务占比增加而增加，随同等优先级任务占比增加而减小的结果。这是由于定理1与定理2对于相邻任务的结束时间间隔上界相同，而定理1则更多受到关于采样任务周期T的影响。在图的任务中，我们同样使用了归一化的处理方法，所以这使得最大数据年龄的结果看起来和最大反应时间类似，但实际上他们具有差别较大的结果，但归一化使得他们在具有类似的趋势下获得类似的线条。
Using the same experimental setup and parameter selection, we then obtained the results for the maximum data age. As shown in Figure a, we can observe results similar to the maximum reaction time analysis; when the data frame length is increased, the maximum data age also increases accordingly. Similarly, in Figures b and c, by incrementing the proportion of high-priority tasks and equal-priority tasks by 10% steps from 10% to 90%, we can respectively obtain results showing that the maximum data age increases with the increase in the proportion of high-priority tasks and decreases with the increase in the proportion of equal-priority tasks. This is because Theorems 1 and 2 have the same upper bound for the end time interval between adjacent tasks, while Theorem 1 is more affected by the sampling task period T. In the tasks depicted in the figures, we also used a normalization process, which makes the results of the maximum data age appear similar to those of the maximum reaction time. However, in reality, they have quite different results, but normalization makes them follow similar trends and thus obtain similar curves.

根据Davare在【davare2007period】中提出的关于基于异步CAN网络的任务链时延分析，的最大反应时间和最大数据年龄都是任务链中所有对象的周期与最坏响应时间之和。即$RT'(C')=DA'(C')=\sum_{k\in C}{T_k'+R_k'}$。
According to the maximum reaction time analysis for task chains based on asynchronous CAN networks proposed by Davare in \cite{davare2007period}, the maximum reaction time **and maximum data age both are** the sum of the period and worst-case response time of all objects in the task chain. In other words, $RT'(C')=DA'(C')=\sum_{k\in C}{T_k'+R_k'}$.

为了便于比较我们设定$|B|=1$，且任务链$C$的任务被认为是偶发任务，
对于调度任务，$T'=D'=\alpha '=\bar{\beta^l_i}*(E_i)$
对于网络任务，$l_i=b_i$，$T'=D'=\theta ' +t=(\frac{b_H+b_j+l_L}{r-r_H} + \frac{b_i}{r})+t$

To facilitate comparison, we set $|B|=1$, and the tasks in task chain $C$ are considered sporadic tasks.
For scheduling tasks, $T'=D'=\alpha '=\bar{\beta^l_i}*(E_i)$.
For network tasks, $l_i=b_i$, $T'=D'=\theta ' +t=(\frac{b_H+b_j+l_L}{r-r_H} + \frac{b_i}{r})+t$.
So for a task chain $C = \{z, c_1, c_2, c_3, ... , c_n\}$, $RT'(C)=T+D'$  and $DA'(C)=D'$ where

$$D'=\begin{array}{l} 
\left\{\begin{matrix} 
\alpha '  & s(c_i)=\tau, s(c_{i-1})=\tau\\
\theta ' +t   & s(c_i)=m\\
\alpha '  +t  & s(c_i)=\tau, s(c_{i-1})=m\\
\end{matrix}\right.    
\end{array}$$
最坏情况下最坏响应时间与周期相等，$RT'(C')=DA'(C')=\sum_{k\in C}2{T_k}'$。但对于网络任务，只需考虑一次传输的时间所以$RT'(C')=DA'(C')=\sum_{k\in C}2{T_k}'-t[p]$
In the worst-case scenario, the worst-case response time is equal to the period, $RT'(C')=DA'(C')=\sum_{k\in C}2{T_k}'$. However, for network tasks, we only need to consider the time of one transmission, so $RT'(C')=DA'(C')=\sum_{k\in C}2{T_k}'-t[p]$.
where [p] is an iverson bracket with:
$$[p]=\begin{array}{l} 
\left\{\begin{matrix} 
0  & s(c_i)=\tau, s(c_{i-1})=\tau\\
1  & otherwise\\
\end{matrix}\right.    
\end{array}$$

我们在图4和图d中分别展示了我们的最大响应时间与最大数据年龄同【davare2007period】的比较。结果显示在与图1.2相同的配置下，通过逐步增加高优先级的占比，我们的最大反应时间和最大数据年龄都始终低于davare的方法。
We present a comparison of our maximum reaction time and maximum data age with those from [davare2007period] in Figures 4 and d, respectively. The results show that under the same configuration as in Figure 1.2, by gradually increasing the proportion of high-priority tasks, both our maximum reaction time and maximum data age are consistently lower than those of the Davare method.

# Conclusion

在本文中，我们研究了一种基于TSN网络传输的任务链模型，将IEEE 802.1 Qcr标准作为连接多个ECU的网络传输任务的标准，并将单个ECU上的事件触发任务链与之结合。我们对提出的任务链进行了端到端时间分析，并给出了最大反应时间和最大数据年龄的上界。通过实验表明，我们提出的方法提高了性能。我们计划进一步探索TSN网络中Qcr标准以及其他类型流量对于任务链最大反应时间和最大数据年龄的影响，并将考虑TSN网络中路由选择、网络拓扑结构对于任务链端到端时间分析的影响。
  
In this paper, we have investigated a task chain model based on TSN network transmission, adopting the IEEE 802.1 Qcr standard as the network transmission task standard for connecting multiple ECUs, and integrating event-triggered task chains on a single ECU with it. We conducted an end-to-end timing analysis of the proposed task chain and provided upper bounds for the maximum reaction time and maximum data age. Through experiments, we have demonstrated that the method we proposed improves performance. We plan to further explore the impact of the Qcr standard and other types of traffic in the TSN network on the maximum reaction time and maximum data age of the task chain, and will consider the effects of routing selection and network topology in the TSN network on the end-to-end timing analysis of the task chain.