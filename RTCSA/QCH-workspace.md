---
created: 2023-07-08T20:33
updated: 2024-02-13T22:42
tags:
  - 笔记
  - 笔记/paper
---

## TITLE

基于TSN的分布式因果链端到端时序分析

End-To-End Timing Analysis of TSN-Based Distributed Cause-Effect Chains

- [ ] 解决当前的问题
- [ ] 把另一篇论文的方法放到QCH里，是不是会过于悲观，过多计算。

## 什么是问题

分布式系统中TSN网络传输因果链的端到端分析，最大反应时间分析

## 为什么是问题

自动驾驶中由于应用的复杂性和物理上分布性采用分布式系统，由多个ECU构成。可以通过CAN总线或者TSN等其他传输方式连接。自动驾驶对于“按钮到动作”的延时非常关注，反应时间的增加对控制质量有影响，需要及早限制。

由于系统复杂的行为，使得任务间具有因果关联的关系，一个任务的输入取决于之前任务的输出，这中因果链形式的任务使得端到端延时更难以预测。

TSN的确定性传输提高了实时性，但TSN网络传输因果链的端到端分析，网络部分还没有被广泛研究。

## 什么是方法

向前作业链

> 需要先前延伸到上一个任务吗？

## 为什么是方法

> 为什么通过向前作业链可以分析最大反应时间
>

因为向前作业链可以描述在执行整个过程中最紧急的任务序列。最大响应时间是描述在外部事务更新寄存器的时间点t开始，直到该更新由流程中的每个任务处理所需的最长时间间隔长度。在分析最大响应时间时，我们需要考虑最长的向前作业链长度，并将其扩展到最高优先级任务的最大到达时间。因此，通过分析向前作业链，可以有效地评估整个过程中的最大响应时间。

## 和别人的区别/优势

*Timing Analysis of Asynchronized Distributed Cause-Effect Chains*，中对于任务链与网络传输结合的分析，过于悲观。在他们的分析中，将任务与网络结合的因果链建模为（任务-网络-任务），并将其拆分为任务链与网络链，分别分析上界。在网络链的分析中，考虑最坏情况，将所有任务的最大到达间隔（Tmax）与最差响应时间求和。这种分析方法没有被证明，并且没有考虑到实际网络传输情况，例如TSN Qch。

> 其他论文的假设：任务通信是通过在缓冲区读写数据，隐式通信（任务开始的时候读结束的时候写）

> 参考他们的思路，并不是所有任务都需要考虑最大间隔和最差响应时间。分析在Qch中，什么情况下需要考虑，什么情况不需要考虑。以及其他网络传输特性，例如Qch中注入时间，延迟。

## 贡献

研究了基于TSN的分布式因果链时序分析

建立了具有网络传输任务链的模型

对最大反应时间分析

## 结构



## 摘要

自动驾驶系统应用复杂并且在物理上分散，所以通常由多个电子控制单元构成分布式系统。ECU之间通过TSN等传输方式连接。

Autonomous driving systems are complex in their application and physically dispersed. As such, they typically comprise of a distributed system made up of multiple electronic control units(ECUs). These ECUs are interconnected using methods such as Time-Sensitive Networks (TSN).

自动驾驶不仅需要满足实时系统的时序约束，对于端到端也非常关注，这种反应时间的增加需要及早限制以免对控制效果产生影响。

Automated driving systems not only need to comply with the timing constraints of real-time systems, but also pay close attention to the end-to-end delay. It is necessary to limit the increase in reaction time early on to avoid affecting the control effectiveness.

但由于系统的复杂性，控制任务之间具有因果关系，即一个任务的输出导致了另一个任务的输入，这样的因果链增加了端到端时延分析的复杂性。

However, the complexity of the system leads to a cause-and-effect relationship between control tasks; the output of one task becomes the input of another, increasing the complexity of end-to-end latency analysis.

TSN增强了IEEE802.1Q协议，并给自动驾驶系统带来了确定性网络传输的改变。

TSN has enhanced the IEEE 802.1Q protocol and brought changes to the deterministic network transmission of autonomous driving systems.

但现有因果链端到端时延分析大多不考虑TSN网络情况或分析过于悲观。

However, most existing end-to-end cause-and-effect chain latency analyses do not consider the TSN network or are overly pessimistic in their analysis.

本文研究了基于TSN的分布式因果链端到端时序分析、建立了具有TSN网络传输因果链的模型、并对最大反应时间与最大数据年龄分析。

This paper investigates end-to-end timing analysis of distributed cause-effect chains based on TSN, establishes a model with a TSN network transmission causal chains, and analyzes the maximum reaction time and maximum data age.

==实验结果表示...==

Experimental results verify that,

> 大多数TSN调度机制要求网络中的所有设备必须具有与调度门和时间同步相关的TSN功能。然而，这通常是一个不切实际的假设，因为许多分布式应用程序使用具有未调度和/或非同步的遗留或现成终端系统的异类TSN网络。

### 关键词

Real-time System, Cause-effect Chains, TSN, End-to-end Timing Analysis

##  Introduction

> 背景，关于自动驾驶ECU，需要满足时序要求，端到端
>
> 因果链介绍，因果链对端到端的影响
>
> TSN介绍，QCH适合偶发任务，问题
>
> 方法介绍，向前作业链
>
> 其他人不足在哪，过于悲观
>
> 所以，本文的工作有什么意义
>
> 贡献
>
> 论文结构

在现代自动驾驶汽车中，通常通过多个电子控制单元完成一些功能，例如自动巡航控制、电子稳定程序等。以自动巡航控制为例，控制执行单元负责将决策控制单元的指令转换为具体工作，例如对汽车进行精准的油门、刹车、转向等控制。这些功能必须要保证实时性约束，以保证功能的正确性以及系统的安全性。这种实时性约束不仅仅需要保证满足截止时间约束，还需要考虑端到端延时约束。例如车辆自动巡航时，控制执行单元延迟超过50ms，虽然仍可能满足在截止期前完成减速控制，但可能会由于控制信号延迟导致车辆急剧减速失去稳定。不仅会影响真个自动驾驶系统的效率甚至可能造成交通事故。所以最大程度减小端到端延迟，是自动驾驶系统必须要考虑的问题之一。

同时，这种需要在相同的基础设施上传输大量具有混合类型的消息，这需要确定性和可预测的时机来确保安全。时间敏感网络是IEEE802.1Q协议的增强，旨在通过提供时间敏感性和低延迟的通信以支持实时控制与数据传输，如工业自动化[6]。其中IEEE 802.1Qch[8]定义了循环队列与转发模型，通过循环交替的乒乓队列提供确定性传输相比于其他方式（例如，时间感知整形器）更适应==偶发性任务==[7]。

> 如果是周期的最后要改

In modern autonomous vehicles, various electronic control units are used to perform functions such as cruise control and electronic stability programs. For example, in cruise control, the control execution unit converts instructions from the decision control unit into precision control of the vehicle's throttle, brake, and steering. To maintain the accuracy and safety of these functions, real-time constraints must be guaranteed. In addition to ensuring that deadline constraints are met, end-to-end delay constraints must also be considered. If the control execution unit experiences delays of more than 50ms during a vehicle's automatic cruise control, the vehicle may rapidly decelerate and compromise its stability due to control signal delays, even if it meets the deceleration control deadline. This can impact the efficiency of the entire autonomous driving system and may result in traffic accidents. Therefore, minimizing end-to-end delays is one of the critical issues that must be considered in autonomous driving systems.

Meanwhile, this requires a deterministic and predictable timing to ensure safety when transmitting large quantities of messages with mixed types on the same infrastructure. Time-Sensitive Networking is an enhancement of the IEEE 802.1Q protocol designed to provide time-sensitive and low-latency communication, supporting real-time control and data transmission in applications such as industrial automation [6].Among TSN, IEEE 802.1Qch[8] defines a cyclic queue and a forwarding model. It provides deterministic transmission through a cycle of alternating ping-pong queues and is more suitable for sporadic tasks compared to other methods, such as time-aware shapers [7].

> 找个参考文献，关于自动巡航延迟的影响
>
> [7]Efficient Flow Scheduling for Industrial Time-Sensitive Networking: A Divisibility Theory Based Method
>
> [8]IEEE Standard for Local and metropolitan area networks–Bridges and Bridged Networks–Amendment 29: Cyclic Queuing and Forwarding

由于系统复杂性的增加，完成某些特定功能的一系列任务之间通常具有因果关系，通常采用因果链描述[3]。一个简化的例子，第一个任务通过传感器对车辆周围环境进行采样，第二个任务处理采样结果并发出减速控制信号，第三个任务执行具体减速工作。确定从采样到执行的时间间隔以确定满足延迟约束就是所谓的端到端时序分析。通常端到端时序分析采用两种语义：*反应时间*和 *数据年龄*。

*最大反应时间*和*最大数据年龄*也被称作*按键到动作的延迟*和*最坏情况下数据新鲜度*，前者表示外部采样更新数据直到系统每个相关任务处理这个更新的最早时间间隔长度，后者表示数据从第一次读取采样值到最后一次处理采样值之间的最大时间间隔长度。

同时对反应时间和数据年龄的延迟约束已经被加入AUTOSAR[1]。

Due to increased system complexity, there is usually a cause-and-effect relationship between a series of tasks aimed at achieving specific functionality. This relationship is usually illustrated through a cause-effect chain. In this example, the first task samples the environment around the vehicle using a sensor, the second task processes the sampled results and sends a deceleration control signal, and the third task performs the deceleration process. The process of determining the time interval from sampling to execution in order to meet delay constraints is known as end-to-end timing analysis. Usually, two types of semantics are used in end-to-end timing analysis: reaction  time and data age. 

The "maximum reaction time" and "maximum data age" are also referred to as button-to-action delay and worst-case data freshness. The maximum reaction time represents the interval length from the time when external sampled data is updated until it is processed by all relevant tasks in the system. The maximum data age represents the maximum elapsed time between the first reading of a sampled value and the final processing of that value.

Delay constraints for both reaction  time and data age have been added to AUTOSAR [1].

> [1] AUTOSAR. 2017. Specification of Timing Extensions, Release 4.3.1. (Aug. 2017).
>
> [2]End-to-End Timing Analysis of Sporadic Cause-Effect Chains in Distributed Systems
>
> [3]Mechaniser-a timing analysis and synthesis tool for multi-rate effect chains with job-level dependencies

复杂的数据依赖关系使得端到端延迟分析变得难以处理，而且不仅仅针对单个ECU内部之间因果链的时延，多个ECU之间由于网络通信的存在也使得分布式因果链的端到端分析变得更加复杂[4]。

The complex data dependencies make it difficult to handle end-to-end delay analysis, not only for the cause-effect chains of intra-ECU delays, but also for the network communication between multiple ECUs, making the end-to-end analysis of distributed cause-effect chains even more complex.

> 这里描述我们的问题，是为了提高TSN任务因果链的端到端延迟

MARCO DÜRR等人在[2]提出可以通过即时向前（向后）作业链长度计算最大响应时间与最大数据年龄上界。Mario Günzel等人在[5]中对即时向前（向后）作业链长度从采样到数据处理扩展到外部活动触发到驱动事件。同时他们将作业链分解成多个片段并对每个片段分析端到端延迟，将单个ECU上的情况扩展到多个ECU的分布式系统中。

MARCO DÜRR et al. [2] proposed that the maximum reaction  time and maximum data age upper bound can be calculated by instantaneously calculating the forward (backward) job chain length. Mario Günzel et al. [5] extended the calculation of the forward (backward) job chain length from sampling to data processing to external activity triggering to drive events. At the same time, they decomposed the job chain into multiple segments and analyzed the end-to-end delay for each segment, extending the analysis from single ECU to distributed systems with multiple ECUs.

但在他们的工作中，将所有任务都类似于周期性任务。并且多ECU通信任务链被建模为单个ECU上的作业链与通信任务交替，每两个ECU之间的网络通信情况被简化为单个通信任务，将所有通信任务建模为通信任务作业链分析网络传输的端到端延迟情况。这种分析考虑最坏情况，将所有任务的最大到达间隔与最差响应时间求和。这种分析方法没有被证明，并且没有考虑到实际网络传输情况，例如TSN Qch。

In their work, all tasks are treated as periodic and the task chains involving multiple ECUs are modeled as a single job chain on a single ECU where communication tasks alternate with other tasks. The network communication between any two ECUs is simplified to a single communication task, and all communication tasks are modeled as a task chain, which analyzes the end-to-end delay of network transmission. This analysis considers the worst-case scenario by adding up the maximum arrival interval of all tasks and the worst-case response time. However, this analysis approach lacks empirical evidence and does not take into consideration actual network transmission situations, such as Qch.

> immediate forward (backward, respectively) job chain
>
> [4]ITANS: Incremental Task and Network Scheduling for Time-Sensitive Networks
>
> [5]Timing Analysis of Asynchronized Distributed Cause-Effect Chains
>
> [6]Improving Latency Analysis for Flexible Window-Based GCL Scheduling in TSN Networks by Integration of Consecutive Nodes Offsets

**贡献**：我们研究了分布式系统上基于TSN网络的因果链端到端时延，我们的贡献是：

- 在第三节中，我们给出了基于TSN网络的分布式因果链模型，包括单个ECU和多个ECU场景。其中多ECU通过TSN相互连接，我们使用的TSN标准为IEEE 802.1Qch。
- 在第五节中，我们对多ECU场景下端到端时延进行分析，为采用IEEE 802.1Qch标准的网络传输任务链提供了准确的最大反应时间和最大数据年龄上界。
- 在第六节中，我们进行了评估......

**Contribution:** We investigate end-to-end latency of cause-effect chains based on TSN in distributed systems. Our contributions are as follows:

In Section Ⅲ, we present a distributed cause-effect chains model based on TSN network, including a single ECU and multiple ECUs scenarios. In the multiple ECUs scenario, TSN is used to interconnect them, and we use the TSN standard IEEE 802.1Qch.
In Section Ⅴ, we analyze the end-to-end latency in the multiple ECU scenario, and provide maximum reaction time and maximum data age upper bound for network transmission task chains using the IEEE 802.1Qch standard.
In Section Ⅵ, we conduct evaluations...

这篇论文的组织方式如下。在第二节中，我们回顾了相关工作。我们在第三节介绍了系统模型，并在第四节提出了问题定义。第五节介绍了端到端时延分析。第六节对提出的分析进行了评估和反思。最后，我们讨论和总结了我们的方法，并在第八节中对未来的活动进行了展望。

This paper is organized as follows. In Section 2, we review related work. The system model is introduced in Section 3, and the problem definition is presented in Section 4. The end-to-end latency analysis is presented in Section 5. The proposed analysis is evaluated and discussed in Section 6. Finally, we discuss and summarize our approach, and provide future directions in Section 8.

## Background⭐️⭐️⭐️⭐️⭐️

> 将单个ECU上的分析放在背景里面
>
> 将background和related work合并？
>
> et al. (e.g., [7]) 

## Related Work

对于因果链的端到端时序分析一直是自动驾驶领域与学术界关注的重点，【17】。由【2】提出了形式化端到端分析方法，并在【5】的工作中对这种分析方法进行扩展研究，对于Davare【15】等人提出的最大反应时间与最大数据年龄分析方法都有提升。这种分析方法也同样被应用于其他领域例如ros2[8]

The end-to-end temporal analysis of cause-effect chains has consistently been a focal point in the realm of autonomous driving and academia(e.g., [17]). Dürr et al. (e.g., [2])introduced a formal end-to-end analysis technique which was expanded further by Gunzel et al. in [5], leading to significant advancements in the analysis methods proposed by Davare et al. (e.g., [15]) regarding maximum reaction time and maximum data age analyses. This method of analysis has also found applications in other fields, such as ROS2 (e.g., [8]).

以前关于多ECU联合的端到端时序分析通常考虑CAN总线为通信方式，例如25，但目前自动驾驶系统被接入更多的传感器已采集大量信息，同时也造成数据传输量激增，CAN总线不能更好的满足自动驾驶某些高带宽低时延的要求。TSN被考虑为自动驾驶系统以及控制领域的通信方式之一，目前已有研究将TSN与控制器相结合【15】、【18】提出了基于TSN的综合航电系统的混合调度框架，以及TT与ST混合调度求解方案。

End-to-end timing analysis of multi-ECU systems commonly considers the CAN bus as the main communication mode. However, with the increasing intake of sensors in autonomous driving systems, a significant amount of data is being collected resulting in a growth of data transmission. Unfortunately, the CAN bus cannot cope with the high-bandwidth and low-latency demands of autonomous driving technologies. Therefore, Time-Sensitive Networking (TSN) is being considered as one of the communication modes for autonomous driving systems and the control field. Previous studies proposed combining TSN with controllers  (e.g., [15]). Furthermore, Zhou et al. (e.g., [18]) suggested a comprehensive avionics system based on TSN, composed of a mixed scheduling framework and mixed TT (Time-Triggered) and ST (Scheduled Traffic) scheduling solution.

但目前对于基于TSN的联合因果链端到端分析还较少，【16】提出了通过启发式方法ITANS通过时间感知整形器(TAS)来增量地调度时间敏感网络中的多速率CEC，从而能够更快地找到可行和无效的解决方案。但他们的工作侧重于找寻大量路径中的可行的，而不是具体的端到端语义分析，比如最大数据年龄或最大反应时间。

Currently, there is a scarcity of end-to-end joint causal chain analyses based on TSN. Arestova et al. (e.g., [16]) proposed a heuristic approach, ITANS, which utilized Time-Aware Shaper (TAS) to incrementally schedule multi-rate CEC in time-sensitive networks, facilitating the faster discovery of feasible and ineffective solutions. However, the focus of their work was on discovering administrable solutions from an abundance of pathways, rather than on specific end-to-end semantic analysis, such as maximum data age or maximum reaction time.

> [8]End-to-end timing analysis in ros2
>
> 【15】Fixed-Priority Scheduling and Controller Co-Design for Time-Sensitive Networks
>
> 【16】ITANS: Incremental Task and Network Scheduling for Time-Sensitive Networks
>
> 【17】Efficient Maximum Data Age Analysis for Cause-Effect Chains in Automotive Systems
>
> 【18】Hybrid Scheduling of Tasks and Messages for TSN-Based Avionics Systems

## System Model

本节介绍了本工作的系统模型，包括任务模型、通信任务模型、因果链以及作业链的定义和符号的意义。

This section introduces the system model of this work, including the task model, communication task model, causal chain, definitions and meanings of symbols in job chains.

### Task Module

我们假设一组电子控制单元通过TSN网络连接，每个ECU被分配一个任务，属于任务的所有作业都在同一个ECU上执行，并且在一个ECU上不存在与它并行执行的其他任务，即每个ECU都是单核调度。

In this paper, we consider a set of electronic control units (ECUs) connected using TSN network. Each ECU is assigned a specific task, and all the jobs related to the task are completed on the same ECU. Furthermore, there is no parallel task execution in any ECU, ensuring single-core scheduling for each ECU.

在本文中我们将在单个ECU上执行的任务表示为一个集合T={τ1...τn}，τi是在这个ECU上执行的周期性任务，Jik是τi释放的第k个作业。对于所有τi释放的作业Ji都与任务τi具有相同的属性。

The tasks performed on a single ECU in this article are represented as a set T={τ1...τn}. Here, τi refers to periodic tasks executed on this ECU, while Jik refers to the kth job released by τi. For every job J1 released by τi, it shares the same characteristics as task τi.

调度S表示一组作业在ECUs上运行行为。对于一个任务τi由元组（Ci，Ti）描述，其中最差执行时间Ci>0，周期T>0。在每个ECU上执行的任务的优先级是确定的，如果i<j，那么τi具有比τj更高的优先级。Ri描述了任务τi的最差响应时间，即所有任务实例从到达到完成的最大时间间隔。Bi是任务τi在固定优先级调度下被阻塞的最长时间。任务利用率与最差执行时间和周期相关，例如，任务τi的利用率Ui=Ci/Ti。对于单个ECU上所有任务集合T的利用率之和不超过1，即UT＝∑τ∈TUi≤1

Scheduler S represents the behavior of a group of job executions on ECUs. For a given task τi is described as a tuple (Ci, Ti) where Ci>0 represents the maximum execution time (WCET) and T>0 represents the period. The priority of tasks executed on each ECU is determined such that τi has higher priority compared to τj if i<j. Ri represents the worst-case response time of task τi, referring to the maximum time interval for all task instances from arrival to completion. Bi represents the maximum time for which task τi is blocked under fixed priority scheduling. Task utilization is related to the worst-case execution time and period. For example, the utilization of task τi is Ui=Ci/Ti. The utilization of all task  on a single ECU, expressed as UT=∑τ∈TUi, must not exceed 1.

### Communication Module

不同的通信语义会产生不同的端到端延时分析结果。在汽车系统中通常采用两种通信语义：

The use of different communication semantics produces varying results in end-to-end latency analysis, with two communication semantics conventionally employed in automotive systems:

隐式通信由AUTOSAR定义[1]为了保证数据一致性。隐式通信语义中在作业开始的时候读取数据，在作业完成的时候写入数据。注意，这里提到的读和写都是基于本地副本，也就是存在一个内存空间，数据被写入到共享内存随后被其他任务读取。

Implicit communication is defined by AUTOSAR [1] to ensure data consistency. In the implicit communication semantics, data is read at the starting of the task and written at its completion. It is important to note that the read and write operations mentioned here are based on a local copy, meaning there is a global memory space where data is written to the shared memory and then read by other tasks.

逻辑执行时间是由GIOTTO框架引入的[10]，目的是为了减少抖动带来的不确定性。LET语义中任务在到达时读取数据在下一周期到来前写入数据，与隐式通信一样需要基于本地副本。

Logical execution time （LET）was introduced by the GIOTTO framework [10] to reduce the uncertainty introduced by jitter. In the LET semantics, tasks read data upon arrival and write it before the next cycle arrives. Like implicit communication, a local copy of the data is required for this process.

图1展现了通信语义对于端到端延迟分析的影响。“直接的”表示数据在执行的任意时刻被读或写。LET模型会导致因果链出现更长的端到端延迟。在本文中我们考虑隐式通信，更关注读写操作也任务执行的关联。

Figure 1 illustrates the impact of communication semantics on end-to-end latency analysis. "Direct" means that the data is read or written at any point during execution. The LET model results in longer end-to-end latencies due to longer cause-effect chains. In this paper, we examine implicit communication and focus more on the relationship between reading or writing operations and task execution.

隐式通信，数据

![image-20230417232913910](https://cdn.jsdelivr.net/gh/wsm6636/pic/202304172329984.png)

![image-20230417232735378](https://cdn.jsdelivr.net/gh/wsm6636/pic/202304172327454.png)

![image-20230417232746464](C:/Users/wsf/AppData/Roaming/Typora/typora-user-images/image-20230417232746464.png)

> [9]Communication Centric Design in Complex Automotive Embedded Systems
>
> [10]Achieving Predictable Multicore Execution of Automotive Applications Using the LET Paradigm

在本文中我们使用TSN网络中的IEEE802.1QCH连接不同ECU。两个ECU之间的网络通信过程被描述为任务τn，无论数据流经过多少交换机，我们只考虑数据从一个终端（ECU）到另一个终端的整体过程。==具体的，τn={o，h，l，p，d}，描述了数据流注入的偏移量o、跳数h、时隙长度l以及两个相邻网络任务的间隔P和截止期d。==类似的，所有通信任务的集合被表示为Tn={τn1...τnm}。数据流注入网络标记为in，流出网络标记为ou。例如inτn1表示通信任务τn1数据流注入网络的时刻。

In this paper, we utilize IEEE802.1QCH in the TSN network to connect different ECUs. The network communication process between two ECUs is expressed as task τn, and we focus solely on the overall process of data transmission from one end system (ECU) to another, regardless of how many switches the data passes through. Specifically, τn={o, h, l, p, d} describes the injection offset o of the data stream, the number of hops h, the time slot length l, the interval P between two adjacent network tasks and the deadline d. Similarly, the set of all communication tasks is represented as Tn={τn1...τnm}. Data streams injected into the network are labeled as "in," and those leaving the network are labeled as "ou." For instance, inτn1 denotes the moment when the data stream of communication task τn1 is injected into the network.

### Cause-Effect Chains

因果链模型来自于AUTOSAR定时扩展的事件链[1]，以及G̈unzel等人对因果链的定义[5]。一个因果链E=(1→k)描述了一系列有限个任务按序处理数据的路径。τ1的数据流向了τ2则E=(τ1→τ2)。e表示因果链最大任务数量，函数E()返回因果链E的第m个任务1≤m≤e。例如，设E=(τ2→τ3→τ1)，则e=3，E(1)=τ2，E(2)=τ3，E(3)=τ1。

The cause-effect chain model is derived from the event chain of the AUTOSAR timing extension [1] and the definition of the causal chain by Gunzel et al. [5]. A cause-effect chain E = (τ1 → τk) describes a sequence of finite tasks that process data in a sequential manner. If the data flows from τ1 to τ2, then E = (τ1 → τ2). "e" denotes the maximum number of tasks in the causal chain, and the function E() returns the m-th task in the causal chain "E," where 1 ≤ m ≤ e. For example, if E = (τ2 → τ3 → τ1), then e = 3, E(1) = τ2, E(2) = τ3, and E(3) = τ1.

我们利用[5]提出的具有读写事件的模型，每个ECU上具有本地作业链Ej={J1...Je}，对所有的作业Ji，i∈{1,...e}，Ji+1的数据读取事件在Ji的数据写入事件之后。

We utilized the read-write event model proposed in [5], where each ECU has a local job chain Ej = {J1...Je}. In this chain, the data read event of Ji+1 occurs after the data write event of Ji for all  i ∈ {1,...e}.

同时[5]认为链接多个ECU的所有通讯任务τn可以被建模为一条通信任务链。所以类似的，我们考虑通信任务链的定义，具体如下：

Meanwhile, [5] proposes that all communication tasks τn connecting multiple ECUs can be modeled as a communication task chain. Therefore, similarly, we provide the definition of a communication task chain as follows:

definition Communication Task Chain

调度S中的一个通信任务链被描述为Ec={τn1...τne}，并具有以下属性：

- 对于条目τni是链Ec（i）的一个通信任务
- 数据流在τni+1注入网络事件在τni数据流流出网络事件之后, i.e.,inτni+1≥ ouτni

A communication task chain  is defined as Ec = {τn1...τne} for schedule S, and it possesses the following attributes:

1. The entry τni  is a communication task of Ec(i) for all i ∈ {1,...e}.
2. The data flow is injected into the network after the data stream flows out of τni but before the next communication task τni+1 ==,i.e., inτni+1≥ ouτni f==or all i ∈ {1,...e}.

同一个物理链路上传输由同一个终端在不同时间发出的数据的两个通信任务，虽然经过的物理链路和发出的设备甚至到达的目的终端相同，但具有不同的属性例如不同的注入网络时间，所以在我们的分析中不将这样的两个考虑成为由一个任务释放的两个实例。所以我们考虑了用任务链描述通信任务间的关系而不是作业链。

Even if two communication tasks transmit data sent by the same end system at different times and share the same physical link, device, and destination end system , they may possess different attributes such as distinct injection network times. Therefore, we do not consider these tasks as two instances released by a single task in our analysis. As a result, we propose using a task chain to describe the relationships between communication tasks instead of a job chain.



## Problem Definition

本文分析了分布式系统上多个ECU互联的因果链的端到端延迟，即从因果链第一个终端上外部活动产生直到最后一个终端完成激励或控制操作，其中包括了具体的网络通信过程。我们假设所有电子控制单元内部以及之间的任务关联情况是已知的，ECU之间的通信方式采用时间敏感网络IEEE820.1Qch协议。

输入：多个ECU互联的因果链IE

输出：IE的最大反应时间和最大数据寿命的上限。

关于单个ECU上因果链的最大反应时间和最大数据年龄上届已由[5]提出，在本文的工作中不再考虑单个ECU内的情况而是分析多个ECU之间网络传输带来的端到端延迟。

In this paper we analyze the end-to-end delay of a cause-effect chain connecting multiple Electronic Control Units (ECUs) in a distributed system. This delay refers to the time from the generation of external activities at the first end system of the cause-effect chain until the last end system completes the stimulation or control operation, and encompasses the specific network communication processes. we hypothesizes that the task association between ECUs and within each ECU is known and that the communication between the ECUs employs the IEEE 820.1Qch protocol for time-sensitive networks.

Input: Cause-effect chain **UE** connecting multiple ECUs

Output: Upper limit of maximum reaction time and  maximum data age for UE

Regarding the maximum reaction time and maximum data age for a single ECU within a cause-effect chain, [5] previously introduced the upper limit of these measures. Nonetheless, this paper focuses on the end-to-end delay caused by network transmission among multiple ECUs and does not consider the situation within a single ECU.

## Analysis of End-To-End Latencies

本节中我们解释了最大反应时间和最大数据年龄的定义，并给予基于TSN网络多ECU场景下端到端时延分析，具体表现为Qch任务组成的联合因果链的最大反应时间与最大数据年龄分析。在下文中我们提供了对于单个ECU上因果链、最大反应时间与最大数据年龄的精确定义。

In this section, we provide the definitions for the maximum reaction time and maximum data age. Additionally, we performed an analysis of end-to-end latency based on the TSN network in the context of multiple ECU scenarios. This analysis utilized the maximum reaction time and maximum data age analysis of a ==unified cause-effect chain== composed of Qch tasks. Further on, we provide precise definitions for the causality chain, maximum reaction time, and maximum data age on a single ECU.

### Definition of  Cause-Effect Chains on Single ECU

在【2】【5】的工作中，分别提出了向前（向后）作业链以及扩展的向前（向后）作业链来描述单个ECU上的任务顺序。由于在本文的工作中是为了分析多个ECU之间网络传输不同情况下的端到端延迟，所以对于单个ECU上的因果链端到端延迟分析采用【5】中对于扩展的向前（向后）作业链。

In previous studies by [2] and [5], immediate forward (backward) job chains as well as immediate forward （backward）augmented job chains were proposed to describe the job sequences on a single ECU. As this work aims to analyze end-to-end delays of causal chains on a single ECU for multiple ECUs with various network transmission scenarios, we adopt the immediate forward （backward）augmented job chains discussed in [5] to conduct this analysis.

向前作业链定义

调度S中的一个直接向前作业链→JES={J1...Je}，描述了数据被从第一个读取它的任务以及第一个产生响应输出的任务序列，并具有以下属性：

- 对于条目Ji是直接向前作业链→JES的一个作业，for all i ∈ {1,...e}.
- 作业Ji+1的读数据操作是作业Ji写数据操作之后第一个

Definition Immediate Forward Job Chain

In schedule S, there exists a immediate forward job chain, designated as JES, which describes a sequential process of tasks that involve the reading of data from the first task that accesses it, followed by the first task that produces a responsive output. The JES chain comprises the following key attributes:

1. The entry Ji  is a job of →JES for all i ∈ {1,...e}.
2. The read data operation of job Ji+1 is the first operation after the write data operation of job Ji. for all i ∈ {1,...e}.

向后作业链定义

调度S中的一个直接向后作业链←JES={J1...Je}，描述了数据被从第一个读取它的任务以及最后一个基于该数据操作的任务序列，并具有以下属性：

- 对于条目Ji是直接向后作业链←JES的一个作业，for all i ∈ {1,...e}.
- 作业Ji-1的写数据操作是作业Ji读数据操作之前第一个

Definition Immediate Backward Job Chain  

In schedule S, a immediate backward job chain JES describes the sequence of tasks involved in reading data initially by the first task in the chain and the last task in the sequence based on that data operation. This chain also possesses the following properties:

1. The entry Ji  is a job of ←JES for all i ∈ {1,...e}.
2. The write data operation of job Ji-1 is the first operation before the read data operation of job Ji. for all i ∈ {1,...e}.

![image-20230330195742153](https://cdn.jsdelivr.net/gh/wsm6636/pic/202304222245200.png)

上述直接向前（向后）作业链描述了数据被读取之后到产生激励之前的不同过程。【5】提出了通过添加外部活动和激励的扩展向前（向后）作业链用来描述整个数据流情况。举个例子，自动驾驶系统控制车辆减速的过程中的直接（向后）作业链是系统内处理数据的过程，比如判断是否需要减速、减速的比例；而对应的扩展向前（向后）作业链是感知道路状况（例如摄像头、激光传感器）到车辆减速指令控制发动机与制动系统等。

The immediate forward (backward) job chains described above illustrate different stages between reading data and producing stimulation. [5] In order to describe the entire data flow, immediate forward （backward）augmented job chains have been suggested by incorporating external activities and stimulations. For instance, in the process of controlling the vehicle's deceleration for an autonomous driving system, the immediate forward (backward) job chains involves the vehicle's internal data processing that entails determining the required deceleration and its corresponding degree. Conversely, the corresponding immediate forward （backward）augmented job chains involve perceiving the condition of the road (using cameras, laser sensors, etc.), as well as controlling the engine and brake systems to slow down the vehicle.

在本文的工作中，为了方便计算与对比我们使用这种扩展的向前（向后）作业链来对单个ECU上的端到端延迟定义与分析。

In this work, we use this immediate forward （backward）augmented job chains to define and analyze end-to-end latency on a single ECU for ease of calculation and comparison.

扩展向前作业链定义

调度S中的一个扩展向前作业链→JAES={z，J1...Je，z`}，描述了数据被从外部事件触发产生到第一个相关输出产生的任务序列，并具有以下属性：

- 对于{J1...Je}是直接向前作业链→JES，for all i ∈ {1,...e}.
- z为外部事件，发生在作业J1的第m次读取之前，z=RE J1（m-1）
- z`为作业Je处理数据时间，  `z`=WE Je

Definition  Immediate Forward Augmented Job Chain

In scheduler S, there exists an immediate forward augmented job chain, JAES, that describes a task sequence from the generation of data through an external event trigger to the production of the first related output. JAES possesses the following attributes:

1. The {J1...Je}  is a immediate forward job chain for all i ∈ {1,...e}.
2. z is an external event that occurs before the m-th reading of job J1, i.e. z = RE J1 (m-1).
3. z' denotes the time that job Je processes data, i.e. z' = WE Je.

扩展向后作业链定义

调度S中的一个扩展向后作业链←JAES={z，J1...Je，z`}，描述了数据从被第一次读入到产生激励控制的任务序列，并具有以下属性：

- 对于{J1...Je}是直接向后作业链→JES，for all i ∈ {1,...e}.
- z为数据采样，z=RE J1
- z`为激励控制，作业Je第m次处理数据之后，  `z`=WE Je（m+1）

Definition  Immediate Backward Augmented Job Chain

In scheduler S, there is an immediate backward augmented job chain, JAES, that describes the task sequence from the first input to the generation of excitation control. JAES has the following attributes:

1. The {J1...Je}  is a immediate backward job chain for all i ∈ {1,...e}.
2. z represents data sampling, where z = RE J1.
3. z' represents excitation control, after the Je job has processed data m times, i.e., z' = WE Je(m+1).

![image-20230425100301462](https://cdn.jsdelivr.net/gh/wsm6636/pic/202304251003619.png)

如图所示展现了直接向前作业链J1=（J12，J24），扩展直接向前作业链AJ1=（1，J12，J24，7），直接向后作业链J1=（J11，J22），扩展直接向后作业链AJ1=（1，J11，J22，5）

The figure illustrates the examples of immediate forward job chain J1=（J12，J24）、immediate forward augmented job chain AJ1=（1，J12，J24，7），immediate backward job chainJ1=（J11，J22），immediate backward augmented job chain AJ1=（1，J11，J22，5）

通过【2】【5】的工作我们可以了解到通常采用向前向后作业链的长度分别计算反应时间和数据年龄的上限，针对本文工作中直接扩充的作业链的两种端到端延迟语义有以下定义

The work in [2] and [5] indicate that the upper limits of reaction time and data age are generally calculated using the lengths of immediate forward and backward job chains. Based on the immediate augmented job chain in our work, we define the following two end-to-end delay semantics：

最大反应时间和最大数据年龄的定义

 Definition Maximum Reaction Time and Maximum Data Age

在调度S考虑所有可能得扩展向前作业链集合N

In schedule S, consider all possible sets N of  immediate forward （backward）augmented job chains.

![image-20230423220744266](https://cdn.jsdelivr.net/gh/wsm6636/pic/202304232207374.png)



> 画图ecu 举例
>

### Definition for Unified Cause-Effect Chains

在 【5】中通过定理12 *切割定理* 证明了在调度S中的一条因果链E =(τ1 →···→τe)，且i ∈ {1,...e-1}，那么因果链E可被切割成为两条因果链E1 = (τ1 →···→τi) 和 E2 = (τi+1 →···→τe)，并且以下关系：

In [5] demonstrates the utilization of the cutting theorem (Theorem 12) in identifying a causal chain denoted as E=(τ1 →···→τe) i ∈ {1,...e-1} in the schedule S. E can be divided into two causal chains, i.e., E1=(τ1 →···→τi) and E2=(τi+1 →···→τe), with the following relationship :

![image-20230423215018897](https://cdn.jsdelivr.net/gh/wsm6636/pic/202304232150990.png)

由此我们设计一条联合因果链UE包含多个ECU以及通信任务，其中每个ECU上具有一条本地因果链LE（扩展的向前或向后作业链），两个ECU之间也就是两条本地因果链之间通过一个通信任务连接，所以有：

Hence, we designed a unified cause-effect chain UE that includes multiple Electronic Control Units (ECUs) and communication tasks. Each ECU is equipped with a local cause-effect chain LE (immediate forward  or backward augmented job chain).  A communication task sequentially connects two ECUs also means two local cause-effect chains .Therefore, the following relationship holds:

![image-20230423220803573](https://cdn.jsdelivr.net/gh/wsm6636/pic/202304232208659.png)

for all i ∈ {1,...e} in schedule S.

根据 *切割定理*可得一条联合因果链UE可被切割为本地因果链LE=（LE1……LEe），以及通信任务链Ec={τn1...τne-1}由3.3节定义。

The unified cause-effect chain UE can be cut into a local cause-effect chain LE = (LE1...LEe) and a communication task chain Ec={τn1...τne-1} as defined in Section 3.3, according to the cutting theorem.

> 画图ECUs，举例子，多个ECU

![image-20230425100436977](https://cdn.jsdelivr.net/gh/wsm6636/pic/202304251004092.png)

如图所示为联合因果链示例，E1 E2 E3表示三个具有本地因果链的ECU，在这里每个本地因果链被简单的显示为一个任务，例如在E1上LE1=τ11。每两个ECU之间由一个通信任务构成，由于在TSN网络传输中数据流可能经过多个交换机，在这里一个通信任务被扩展的显示为它所包含的多个链路以及在不同链路上的位置即m，例如E1与E2之间，通信任务τn1=m12+m22。对于图中蓝色的部分显示了一条完整的由E1到E3的联合因果链UE1=（LE1，τn1，LE2，τn2，LE3）=（τ11，m12+m22，τ24，m34，τ34）

The figure illustrates an example of the unified cause-effect chain, where E1, E2, and E3 represent three ECUs with local cause-effect chains. Each local cause-effect chain is presented as a simple task, e.g., on E1, LE1=τ11. Communication tasks exist between every pair of ECUs. Since data flow in TSN network transmission may pass through various switches, a communication task displays multiple links and their positions denoted as "m" in the figure. Therefore, between E1 and E2, the communication task τn1 is m12 + m22. Additionally, the blue section in the figure shows the complete unified cause-effect chain UE1 from E1 to E3, calculated as UE1 = (LE1, τn1, LE2, τn2, LE3) = (τ11, m12+m22, τ24, m34, τ34).

### Response Time Analysis

在传统的单处理器最差响应时间分析中，通常对于固定优先级的非抢占式调度使用Lehoczky等人在{11}中提出的Time Demand Analysis（TDA）计算。对于一个任务τi有以下最差响应时间：

In traditional analysis of worst-case response time in single-processor systems, Time Demand Analysis (TDA) proposed by Lehoczky et al. in {11} is commonly utilized for fixed-priority non-preemptive scheduling. The worst-case response time for a given task τi is computed as follows:

$R_i=C_i+B_i+\sum_{\tau_k \in h p(i)}\left\lceil\frac{R_i}{T_k^{\min }}\right\rceil C_k$

其中Bi是最大阻塞时间，优先级高于τi的任务在集合hp ( i )中以及任务τi的最差执行时间这与我们使用的定义一样。

The variable Bi denotes the maximum blocking time. As well, the set hp ( i ) encompasses tasks with priority above that of task τi, and task τi has the same definition of worst-case execution time utilized here.

> 【11】The rate monotonic scheduling algorithm: Exact characterization and average case behavior
>
> 【12qch】IEEE Standard for Local and metropolitan area networks–Bridges and Bridged Networks–Amendment 29: Cyclic Queuing and Forwarding
>
> 【13qbv】IEEE Standard for Local and metropolitan area networks – Bridges and Bridged Networks - Amendment 25: Enhancements for Scheduled Traffic
>
> 【14qbu】IEEE Standard for Local and metropolitan area networks – Bridges and Bridged Networks – Amendment 26: Frame Preemption

时间敏感网络具有多种机制保证网络的确定性，例如循环排队和转发(IEEE 802.1 QCH[12])、帧抢占(IEEE 802.1 QBU[14])和Time-Aware Shaper(IEEE 802.1 Qbv[13])等。为了简化TSN交换机设计一般采用IEEE 802.1 QCH[5]标准的QCH模型。这种模型将网络换分为连续等长的时隙比如i，i+1…，i+N，并通过两个乒乓队列交替来控制流量。如图所示，在时隙i队列Q0可以接收任务但不能传输，相对的Q1可以传输任务但任务不能入队。在时隙i+1的队列控制与时隙i相反。

Time-sensitive networks (TSN) incorporate various mechanisms to ensure network determinism, such as IEEE 802.1QCH [12] ( Cyclic Queuing and Forwarding ,CQF), IEEE 802.1QBU [14] (Frame Preemption,FP), and IEEE 802.1Qbv [13] (Time-Aware Shaper ,TAS). To simplify TSN switch design, the CQF model of IEEE 802.1QCH [5] standard is typically employed. This model transforms the network into a sequence of continuous, equal-length time slots, such as (*i*, *i+1*,…,*i+N*), and controls traffic alternately through two ping-pong queues, as shown in the figure. During time slot *i*, queue Q0 can receive tasks but cannot transmit them, while Q1 can transmit tasks but cannot accept any new tasks. Conversely, during time slot *i+1*, the queue control is the opposite of that in time slot *i*.

> 画图，qch

CQF模型具有一种特性，如果数据在时隙i被接收则一定会在时隙i+1传出。那么相应的最大延迟则为（h+1）l，最小延迟为（h-1）l。其中h为数据帧经过的跳数，l则为时隙长度。

The CQF model exhibits a characteristic whereby any data received in slot i must be transmitted in slot i+1. As a result, the corresponding maximum delay is (h+1)l, while the minimum delay is (h-1)l. Here, h represents the number of hops the data frame undergoes, and l represents the duration of the time slot.

所以对于采用QCH标准的TSN网络中的任务来说，在任意时刻到达都可以在cqf当前的时隙选择乒乓队列中的一个入队，并且会在下一个时隙传输。所以对这类任务来说最差响应时间取决于时隙长度以及跳数。

For tasks in a TSN network that employs the QCH standard, they can arrive at any moment and be added to the ping-pong queue of the current cqf time slot; they will subsequently be transmitted in the succeeding time slot. Therefore, the worst-case response time of such tasks is dependent on the time slot length and number of hops.



![image-20230423225840417](https://cdn.jsdelivr.net/gh/wsm6636/pic/202304232258545.png)

![image-20230423225935562](https://cdn.jsdelivr.net/gh/wsm6636/pic/202304232259645.png)

所以在联合因果链中由于采用IEEE 802.1 QCH标准作为TSN网络传输方式，那么对于通信任务τni∈Tn的最差响应时间为(h+1)l

Therefore, in the joint causal chain, the use of the IEEE 802.1 QCH standard as the transmission mode for TSN networks implies that the worst-case response time for communication tasks τni∈Tn is (h + 1)l.

### Unified Cause-Effect Chains Analysis

> 【15】Period optimization for hard real-time distributed automotive systems
>
> 【16】Injection Time Planning: Making CQF Practical in Time-Sensitive Networking

我们采用【15】中Davare等人提出的关于反应时间和数据年龄的上界来进行通信任务链的端到端延迟分析。

We use the upper bounds on reaction time and data age proposed by Davare et al. in [15] for end-to-end delay analysis of communication task chains.

我们注意到【5】中Dürr等人同样采用了相同的方式估计通信任务τi的反应时间与数据年龄，即T_(Max)τ_i+R_(τ)_i。但在他们的分析中仅仅考虑多个ECU之间通过CAN总线通信，并不考虑具体的传输情况，我们认为这种分析无法被证明且过于悲观。同时对于自动驾驶越来越多的数据传输CAN总线也无法更好的满足高带宽低时延的要求。所以我们进一步提出了基于时间敏感网QCH标准的通信网络任务的具体分析。

Dürr et al. (ref. [5]) also implemented the same method to estimate the reaction time and data age of communication tasks τi as we did, i.e., T_(Max)τ_i+R_(τ)_i. However, their analysis was limited to communication between ECU nodes solely over the CAN bus, without sufficient consideration of specific transmission circumstances. Consequently, we regard such a theoretical approach as insufficiently evident and overly pessimistic. Additionally, given the escalating volume of data transmission in autonomous driving, the CAN bus is unable to provide satisfactory high-speed, low-latency delivery service. Therefore, we have further advanced our study by proposing a specific analysis of communication network tasks based on the QCH standard of time-sensitive networks.

> 在前面背景加上QCH可以减少抖动的好处，以及TSN比CAN总线好

结合5.3节对连接多ECU的通信任务响应时间的定义，对于调度s中的通信任务链Tn={τn1...τnm}的最大反应时间与最大数据年龄由以下定义

Based on the definition of response time for communication tasks with multiple ECUs in section 5.3, the maximum response time and maximum data age of the communication task chain Tn={τn1...τnm} in schedule s are determined as follows:

Reaction（τn）= ∑（Tmax+R）=∑1m（Pimax+（Hi+1）Li）

DataAge（τn）= ∑（Tmax+R）=∑1m（Pimax+（Hi+1）Li）

同时我们还考虑到QCH标准对数据流的约束。对于TSN网络中的数据流来说注入网络的时机与时隙长度都十分重要，如何设置注入时间和时隙长度是提高TSN性能的关键。在本文的工作中针对网络任务τn={o，h，l，p, d}，注入偏移量以时隙长度为最小单位，标识了数据流在哪个时隙被注入网络并不考虑是在具体什么时刻。同时基于注入时间本文考虑两种约束分别关于截止期与周期。

We have taken into consideration the constraints imposed by the QCH standard on data streams. For data streams in TSN networks, the timing of inject into the network and length of slot are critical to performance improvement, and determining the optimal injection timing and slot length is key. In this work, we consider the network task τn={o, h, l, p, d}, and the injection offset is based on a slot length as the minimum unit. The injection offset identifies the slot in which the data stream is injected into the network without regard to specific timing. Furthermore, two types of constraints based on the deadline and period are considered in this paper, using injection timing as the reference point.

定义截止期约束

数据流被限制在指定时间之前到达

对于任意τn属于Tn，i属于0到m

（oi+hi）li≤di

Definition Deadline Constraint

The data stream is restricted to arrive before the specified time.

注入时间偏移量

防止多周期产生的数据流同时占用资源

对于任意τn属于Tn，i属于0到m

oi*li≤pi

Definition Period Constraint

Prevent data streams generated by multiple cycles from occupying resources simultaneously.

通过公式34与（5）可得，调度S中在满足截止期约束和周期约束的条件下，联合因果链UE的最大反应时间和最大数据年龄如下：

By using formulas 34 and (5) in schedule S and satisfying the deadline constraint and period constraint , the maximum reaction time and maximum data age of the unified cause-effect chain UE can be computed as follows:

Reaction（UE）S≤ ∑1e Reaction（LEi）+ ∑1e-1 Reaction（τni）

DataAge（UE）S≤ ∑1e DataAge（LEi）+ ∑1e-1 DataAge（τni）

## Evaluation

所提出的端到端延迟分析的相关工业用例是汽车领域中因果链的时序验证。为了评估我们建议的分析在这一领域的实际好处，我们使用符合汽车基准[19]中描述的细节的合成任务集和因果链来评估分析。此外，我们使用使用UUnifast算法[20]生成的任务集来评估一般任务参数的性能。我们考虑了周期性任务集和隐式工作沟通来应用我们分析结果。

The proposed industry use case for end-to-end latency analysis is the cause-effect chain temporal verification in automotive domain. To assess the practical benefits of our proposed analysis in this domain, we used synthetic task sets and a cause-effect chain that conform to the automotive benchmark description [19]. Additionally, we evaluated the analysis performance for general task parameters using task sets generated by the UUnifast algorithm [20]. Periodic task sets and implicit job communication were also considered to apply our analysis results.

ECU内部设置：每个因果链中的所有任务都映射到一个ECU，并使用本地同步的时钟。

ECU间设置：因果链中的任务映射到不同步的不同ECU。互连结构用于跨不同ECU的数据通信。

Internal ECU settings: All tasks in each cause-effect chain are mapped to one ECU and use a locally synchronized clock.

ECU-to-ECU settings: Tasks in the cause-effect chain are mapped to unsynchronized ECUs. An interconnect structure is used for data communication across different ECUs.

在下文中，我们使用Davare等人的方法[15]标准化所有其他端到端边界，因为此方法产生最悲观的结果。我们定义分析方法m相对于评估界B(·)的潜伏期减少G(M)，例如，最大反应时间

In the following, we use the method by Davare et al. [9] to normalize all other end-to-end bounds, since this method yields the most pessimistic result. We define the latency reduction G(m) of an analysis method m with respect to an evaluated bound B(), e.g., maximum reaction time, by



### Task and Task Set Generation

对于单个ECU情况，我们为U=50%、60%、70%、80%和90%的每个累积任务集利用率生成1000个汽车任务集。每个任务集50个任务。每个任务的周期按照对数均匀分布从区间[1,2000]中提取，并舍入到集合{1，2，5，10，20，50,100,200,500,1000}中的下一个最小周期。给定周期和使用率，最坏情况下的执行时间被设置为Ui·ti

For the single ECU case, we generate 1000 automotive task sets for each cumulative task set utilization of U = 50%, 60%, 70%, 80% and 90%. Since the tasks’ utilizations are determined by the worst-case execution-time and the automotive specific semi-harmonic periods, we used a fully-polynomial approximation scheme to solve the subset-sum problem to select a subset of tasks within a candidate task set such that the cumulative utilization satisfies the above requirements. We initially generate T a set of 1000 to 1500 tasks and then select a subset T ′ of tasks using the subset-sum approximation algorithm to reach the targeted utilization within 1 percentage point error bounds, i.e., |(∑ T ′ Ui) − U |≤0.01. On average, the generated task sets consist of 50 tasks.

### Communication Tasks

我们随机绘制每个消息的对数均匀的周期，范围从10到10000ms，并将结果截断到下一个最小的整数，以对通信频率进行建模。

we draw the period of each message log-uniform at random from the range 10 to 10 000 ms and truncate the result to the next smallest integer to model the communication frequency.

此外我们定义TSN中网络参数。在我们的评估中， 带宽为100Mbps，根据QCH标准中的例子设定时隙长度125us [8]，跳数为在[1,6]的随机数，这是由于超过7跳将影响TSN中时间同步的效果。【21】

> **而且为了以TSN的角度评估，我们将之前的标准与本文匹配。让A方法使用1M带宽的CAN总线传输1M的数据，且包括头尾的长度约为66bit。同时我们将所有任务的最差执行时间固定位0.5ms，以突出通信过程中延迟的情况，而不会被ECU内部任务的执行情况所干扰。**

In addition, we define the network parameters in TSN. In our evaluation, the bandwidth is set at 100Mbps, the slot length is set to 125us according to the example in the QCH standard [8], and the number of hops is a random number between 1 and 6. This is because having more than 7 hops will affect the effectiveness of time synchronization in TSN.[21]

> In addition, to evaluate from the perspective of TSN, we aligned the previous method with the present paper. As part of this evaluation, we implemented method in【5 to transmit data of 1M over a CAN bus with a bandwidth of 1Mbps, with the total length including the header and tail approximately 66 bits. Furthermore, to highlight the delay in the communication process without interference from the execution of internal tasks within the ECU, we fixed the worst-case execution time for all tasks at 0.5 ms.

> 【21】A Survey on In-vehicle Time Sensitive Networking

### Cause-Effect Chain Generation

ECU内部因果链生成:根据[19]第IV-E节中的描述生成因果链集合

Intra-ECU cause-effect chain generation: the set of cause-effect chains is generated according to the description in Section IV-E in [19].

ECU间因果链生成：在均匀分布下，选取<span style="background:#FF9999;">5条具有相同利用率和优先级的不同任务集的因果链，生成10000条互连的因果链</span>。对于每个选择，我们创建20个通信任务，如第VII-B节所述(每个ECU对一个)。我们选择其中的4个来连接这5个通信任务。

Inter-ECU cause-effect chain generation: We generate 10 000 interconnected cause-effect chains by selecting 5 causeeffect chains of different task sets with the same utilization and priority order under a uniform distribution. For each selection, we create 20 communication tasks as described in Section VII-B (one for each ECU pair). We choose 4 among them to connect the 5 communication tasks.

### Evaluation Results

> 【19】Real world automotive benchmarks for free
>
> 【20】Measuring the performance of schedulability tests

## Conclusion

本文分析了最大反应时间和最大数据年龄并给出了关于联合因果链的精确定义和分析。我们计划进一步探索TSN网络中其他类型流量对因果链端到端延迟分析的影响。3

In this paper, we analyze the maximum reaction time and maximum data age., and provides a precise definition and analysis of joint causal chains. We plan to further explore the impact of other types of traffic in TSN networks on end-to-end delay analysis of cause-effect chains.

## 参考文献
