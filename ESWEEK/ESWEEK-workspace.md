---
created: 2024-03-15T10:38
updated: 2024-03-20T00:30
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
Distributed real-time systems are particularly adept at handling applications with complexity and physical dispersion, making them extensively utilized across various domains, notably in the realm of autonomous driving. These systems are commonly deployed across a multitude of electronic control units (ECUs), executing a sequence of tasks to perform specific functions or react to external events. The tasks involved in executing these functions or processing events often need to be executed in an ordered manner, typically exhibiting causal relationships where the input of one task is derived from the output of another. In such distributed real-time systems, it is crucial not only to adhere to deadline constraints but also to consider end-to-end timing constraints to ensure the functionality's correctness and the system's safety. For instance, during automatic vehicle cruising, if the reaction time of the control unit exceeds 50 milliseconds, although it may still complete the deceleration control within the deadline, the delay in the control signal could result in a sudden deceleration and loss of vehicle stability. Moreover, the recency of data is essential for its timeliness, and in the context of autonomous driving systems, more up-to-date data can facilitate more precise decision-making.

端到端时序约束根据端到端时序语义，包括反应时间约束和数据年龄约束，并且由AUTOSAR[AUTOSAR]定义。如图所示，其中反应时间表示外部事件直到系统每个相关任务处理这个更新的最早时间间隔的长度，还有另一种表达按键到动作的延迟；数据年龄则表示对于外部事件开始处理后直到基于采样数据所产生激励之间的时间间隔长度，也称作最坏情况下的数据新鲜度。对于图中表示数据处理部分的任务，有的系统会采用第一个任务作为采样任务收集数据，也许不会并直接处理外部事件。在每两个相邻的数据处理任务之间多是通过缓冲区读写数据来进行通信的，一个任务从前面的缓冲区读取输入数据，自身运算产生结果后写入后面的缓冲区，在数据被读取或者新的数据写入前都会被一直保存着，如此一个或几个关键人物可以在多条任务链中起到承上启下的作用。
End-to-end timing constraints, as defined by AUTOSAR【】, are based on end-to-end timing semantics and include reaction time constraints and data age constraints. As shown in the figure, reaction time refers to the earliest time interval from an external event to the point when each relevant task within the system begins processing this update, also known as delay from button press to action. Data age, on the other hand, indicates the time interval from the start of processing an external event until the generation of an incentivized output based on sampled data, also referred to as the worst-case data freshness. For tasks represented in the figure that pertain to the data processing section, some systems may adopt the first task as a sampling task to collect data, which may not be processed directly in response to the external event. Communication between two adjacent data processing tasks is often facilitated through buffer read and write operations, where a task reads input data from the preceding buffer, processes it to produce results, and then writes into the subsequent buffer. The data is preserved until it is read or new data is written, allowing one or several key tasks to act as intermediaries across multiple task chains.

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

对于因果链的端到端分析有很多工作考虑时间触发的方式，即任务链上的每个任务都有自己的周期并按照固定的间隔触发执行。针对这种时间触发的任务链已有多种方法处理，例如D{\"u}rr等人在【durr2019end】中设定即时向前和向后作业链，通过计算作业链的长度求得偶发性任务链的最大反应时间与最大数据年龄的上界。Günzel等人在[gunzel2021timing]中针对即时向前（向后）作业链设定长度从原来的数据处理任务（包括采样任务）向前扩展到外部活动触发以及向后扩展到驱动事件。随后他们在【gunzel_et_al】中引入划分的作业链并证明最大反应时间和最大数据年龄的等价性。
For end-to-end timing analysis of cause-effect chains, much work has considered time-triggered approaches, where each task in the chain is periodically triggered to execute at fixed intervals. There are various methods to handle such time-triggered task chains. For instance, Dürr et al. in 【durr2019end】defined immediate forward and backward job chains, and by calculating the length of the job chain, they derived the upper bounds for the maximum reaction time and maximum data age of sporadic job chains. Günzel et al. in [gunzel2021timing] study extended the definition of immediate forward (backward) job chains in length, from the original data processing tasks (including sampling tasks) forward to external activity triggers and backward to driving events. Subsequently, they introduced partitioned job chains in their follow-up work and proved the equivalence of maximum reaction time and maximum data age.

另一种则是事件触 发的方式，即任务链上的每个任务需要其前一个任务执行结束生成数据，随后触发该任务读取数据进行下一步处理。【tangReactionTimeAnalysis2023】中采用资源服务曲线模型取得事件触发和数据刷新模式下的最大反应时间分析。【7461359】提出了静态优先抢占任务链的忙窗口分析。【recursiveapproach】提出用于推导应用程序的端到端延迟的方法并支持任意事件模式的时间触发和事件触发任务激活方案。本文的研究以事件触发的方式为基础。
The event-triggered mechanism for task chains, where each task requires the completion of its preceding task to generate data, which then triggers the task to read the data for further processing. In the paper [tangReactionTimeAnalysis2023], a resource service curve model is utilized to analyze the maximum reaction time under event-triggered and data refresh modes. The paper [7461359] proposes a busy window analysis for static priority preemptive task chains. The [recursiveapproach] presents a method for deriving the end-to-end delay of an application, supporting both time-triggered and event-triggered task activation schemes for arbitrary event patterns. This research is based on the time-triggered mechanism.

除此之外还有一些研究仅专注于一种端到端时序语义。Günzel等人在【Probabilistic】中进一步提出基于概率的反应时间分析方法，考虑反应时间的随机性与故障概率并对偶发性任务链分析。【 10.1145/3534879.3534893】考虑混合线性规划的优化以最小化数据年龄分析。【bi2022efficient】中则是提出以较低的计算代价实现较高的数据年龄分析精度的方法。
In addition to the aforementioned studies, some research focuses solely on one aspect of end-to-end timing semantics. Günzel et al. in their work 【Probabilistic】further propose a probability-based reaction time analysis method, considering the randomness of reaction times and failure probabilities for sporadic task chain analysis. The paper with the identifier 【 10.1145/3534879.3534893】 explores the optimization of data age analysis using mixed-integer linear programming to minimize data age. In the work 【bi2022efficient】a method is proposed that achieves high precision in data age analysis with lower computational overhead.

以上研究多是关于单个ECU上的端到端时延分析，而对于多ECU上的分析【gunzel2021timing】提出切割定理将联合任务链拆解为ECU上的任务链与通信任务链以求取端到端时延界限。而对于通信任务多数研究参考【davare2007period】所提出的分析，认为通信任务与ECU任务一样用任务的最差响应时间与周期求和得到上界。但他们仍然考虑以CAN总线作为通信任务标准，但已经不再适合嵌入式实时系统数据量增加的场景，所以研究者们开始考虑更高效的网络作为通信任务标准以代替CAN总线，例如TSN。
The majority of the aforementioned research focuses on the end-to-end latency analysis within a single ECU. However, for the analysis across multiple ECUs, the work 【gunzel2021timing】 proposes the slicing theorem, which decomposes the joint task chain into ECU task chains and communication task chains to derive the end-to-end latency bounds. For communication tasks, many studies refer to the analysis proposed by 【davare2007period】which considers communication tasks in the same way as ECU tasks, using the worst-case response time and period of the tasks to sum up and obtain an upper bound. However, they still consider the CAN bus as the standard for communication tasks, which is no longer suitable for the scenario where embedded real-time systems have increased data volumes. Therefore, researchers have started to consider more efficient networks as the standard for communication tasks to replace the CAN bus, such as TSN (Time-Sensitive Networking).

对于TSN网络的端到端延迟分析目前已有很多关于Time-Aware Shaper (TAS). 有Bahar等人参考【feiertagCompositionalFrameworkEndtoend】提出的端到端时延分析框架基于IEEE 802.1Qbv标准分析了ECU之间同步和非同步以及离线网络下的端到端时延分析【HOUTAN2023102911】。航电系统中也基于TSN网络提出混合调度框架以保证两种端到端语义【Hybrid】。【arestova2022itans】中Arestova等人采用增量启发式方法计算由多速率任务和网络流组成的因果链调度。【co-design】中针对不同需求的控制任务分析帧级的响应时间。
For the end-to-end latency analysis of TSN networks, there has been significant focus on Time-Aware Shaper (TAS). Bahar et al., referencing the framework proposed in [feiertagCompositionalFrameworkEndtoend], analyzed the end-to-end latency between ECUs under synchronous and asynchronous conditions, as well as in offline network scenarios, based on the IEEE 802.1Qbv standard [HOUTAN2023102911]. In avionics systems, a hybrid scheduling framework has been proposed based on TSN networks to ensure both end-to-end timing semantics [Hybrid]. Arestova et al. in [arestova2022itans] used incremental heuristic methods to calculate the scheduling of cause-effect chains composed of multi-rate tasks and network flows. Additionally, in [co-design], frame-level response times were analyzed for control tasks with varying requirements.


# system model

我们假设一组电子控制单元通过采用IEEE 802.1 QCR标准的TSN网络连接。每个任务被静态的分配给一个ECU，该任务释放的所有作业都在同一个ECU上以固定优先级非抢占模式执行，且在同一个ECU上不存在另一个并行执行的任务。每两个ECU之间通过网络连接，这样组成了一条简单的基于TSN网络的分布式实时系统任务链。
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
单个ECU上的调度任务采用事件触发（ET）的方式，即当前一个作业$J^{j-1}_i$执行完成（$f(J^{j-1}_i)$时刻）写入缓冲区后，后一个任务$J^{j}_i$在$r(J^{j}_i)$ 时刻触发。后一个作业的读取操作时刻不会早于前一个作业的写入操作时刻。
$B_i$ represents the fixed size (is $|B_i|$) input buffer of scheduling task $\tau_i$. Each scheduling task $\tau_i$ reads data generated by the predecessor job $\tau_{i-1}$ from its input buffer $B_i$, and writes its own generated data into the input buffer $B_{i+1}$ of the successor task $\tau_{i+1}$. On a single ECU, scheduling tasks are triggered by events (ET), which means that when the previous job $J^{j-1}_i$ completes execution (at time $f(J^{j-1}_i)$), the next job $J^{j}_i$ is triggered at time $r(J^{j}_i)$. The read operation of a subsequent task will not occur earlier than the write operation of the previous task.

## Network Module
**为了区别ECU上执行的任务，我们将TSN网络中的任务称为网络任务并用m={l，d}表示，而ECU上的任务我们仍然成为任务。我们使用数据帧作为端到端分析的一个基本单元。所以网络任务$m^{i}_j$代表携带任务链信息的数据帧，i代表了数据帧所在的流，并且它是数据流i中的第j个数据帧，在本文后续的内容中。$l(m^{i}_j)$代表了数据帧的长度。$d(m^{i}_j$)代表整个数据帧结束的时间，即数据帧通过ATS算法获得资格时间$et(m^{i}_j)$之后，通过传输算法根据优先级等选择，最后离开的时刻。在数据帧连续的传输过程中，能够确保从一个交换机流出之后才会经过网络传输并流入到下一个交换机中，这类似于ECU上任务对于读写顺序的约束。**
In order to distinguish the scheduling tasks performed on the ECU, we refer to the tasks in the TSN network as network tasks and represent them as m={l, d}, and the tasks on the ECU, we still refer to them as scheduling tasks. We use data frames as the basic unit for end-to-end analysis. Therefore, the network task $m^{i}_j$ represents a data frame carrying task chain information, where i indicates the stream the data frame belongs to, and it is the jth data frame in data stream i in the following content. $l(m^{i}_j)$ represents the length of the data frame. $d(m^{i}_j)$ represents the end time of the entire data frame, which is the moment the data frame leaves after obtaining eligibility time $et(m^{i}_j)$ through the ATS algorithm and selecting the transmission algorithm based on priority, among other things. During the continuous transmission process of data frames, it ensures that they will only be transmitted through the network and enter the next switch after flowing out from one switch. This is similar to the constraint on the read-write order of tasks on an ECU.

**ATS算法根据队列分配规则决定数据帧的流向，并通过承诺信息速率（committed information rate）以及承诺的突发大小（committed burst size）确定数据帧的资格时间。
其中，整形队列需要遵循队列分配的规则，以下情况的数据帧不能被分配到同一个整形队列：
P1，来自不同发射机
P2，来自相同发射机但是优先级不同
P3，在同一个发射机中具有相同优先级，但是接收器优先级不一样。**

The ATS algorithm determines the flow direction of data frames based on queue allocation rules, and determines the eligibility time of data frames through committed information rate and committed burst size. 
The shaping queues need to adhere to the rules of queue allocation. The frames in the following situations should not be allocated to the same shaping queue:
P1: Frames from different transmitters. 
P2: Frames from the same transmitter but with different priorities. 
P3: Frames within the same transmitter with the same priority, but different receiver priorities.


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

**定义（反应时间）：任务链的反应时间表示为R(c)**
R（c）= t'-t =  f(cn) - t(z)
Definition  (reaction time): the reaction time of a task chain is expressed as R(c)

定义（数据年龄）：任务链的数据年龄表示为D(c)
D（c）= t'-t =  f(cn) - r(c1)
Definition  (data age): the data age of a task chain is expressed as D(c)

**定义 （最大反应时间）：任务链的最大反应时间RT(c)是任务链c所有可能路径的最大值**
RT(c) = max{R(c)}
Definition  (Maximum reaction time): the maximum reaction time RT(c) of a task chain is the maximum of all possible paths of the task chain c

定义 （最大数据年龄）：任务链的最大数据年龄DA(c)是任务链c所有可能路径的最大值
DA(c) = max{D(c)}
Definition  (Maximum data age): the maximum data age DA(c) of a task chain is the maximum of all possible paths of the task chain c