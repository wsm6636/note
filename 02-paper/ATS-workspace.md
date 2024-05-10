---
created: 2023-11-17-21:00:00
updated: 2024-05-07T22:28
tags:
  - 笔记
  - 笔记/paper
  - 笔记/永久笔记
---

# 问题
**要研究的问题**
自动驾驶中由于应用的复杂性和物理上分布性采用分布式系统，由多个ECU构成。可以通过CAN总线或者TSN等其他传输方式连接。自动驾驶对于“按钮到动作”的延时非常关注，反应时间的增加对控制质量有影响，需要及早限制。

由于系统复杂的行为，使得任务间具有因果关联的关系，一个任务的输入取决于之前任务的输出，这中因果链形式的任务使得端到端延时更难以预测。

TSN能够满足CAN总线无法满足的大量数据的场景。但TSN网络传输因果链的端到端分析，网络部分还没有被广泛研究。


**反应时间的分析和端到端延迟的分析的区别** 
实时系统通常处理外部事件并对其做出反应。在许多复杂的实时系统中，外部事件的处理由由多个任务组成的处理链来执行，所述多个任务可以在同一处理器上同时执行或者分布到多个处理单元。这类系统的关键实时性能指标是最大反应时间，它描述了从事件发生到产生与该外部事件对应的最终输出所需的时间。具有最大反应时间约束的加工链在汽车电子、工业控制和机器人等领域有着广泛的应用。

嵌入式实时系统通常用任务链和消息链来建模。为了验证这些链的计时行为，不仅需要计算它们的端到端响应时间并与相应的截止日期进行比较，还需要计算端到端的数据传播延迟(数据年龄和反应时间)并与相应的数据年龄和反应时间约束进行比较。
处理链的目标是处理携带外部事件信息的数据帧并对其做出反应。当在时间t发生外部事件时，在时间t或之后释放的采样任务τ0的作业将产生携带该外部事件的信息的输出数据帧。该数据帧将由其后续任务τ1的某个作业读取和处理，其产生也携带该外部事件的信息的其输出数据帧，并且这在整个处理链中重复，直到最后一个处理任务τn的某个作业在某个时间点t‘产生关于该外部事件的最终输出数据帧，则t’-t是关于该外部事件的处理链的反应时间。


<span style="color:black;background:#40a9ff !important;">对于ET处理链，分析反应时间本质上等同于分析链中每个任务执行一次、相继触发的端到端延迟，对此已有成熟的技术[1]、[2]</span>
**CAN的问题**
分布式系统中TSN网络传输因果链的端到端分析，最大反应时间分析

自动驾驶中由于应用的复杂性和物理上分布性采用分布式系统，由多个ECU构成。可以通过CAN总线或者TSN等其他传输方式连接。自动驾驶对于“按钮到动作”的延时非常关注，反应时间的增加对控制质量有影响，需要及早限制。

由于系统复杂的行为，使得任务间具有因果关联的关系，一个任务的输入取决于之前任务的输出，这中因果链形式的任务使得端到端延时更难以预测。

TSN的确定性传输提高了实时性，但TSN网络传输因果链的端到端分析，网络部分还没有被广泛研究。

**QBV的问题**
虽然TAS在施加业务确定性方面表现良好，但严格的定时要求，尤其是跨TSN域的定时同步的高所需精度水平，如果发生任何定时未对准，则增加了复杂性并威胁到TSN网络域的可靠性。此外，几个同步挑战，例如定时信号帧中的偏差或漂移、时钟不准确和丢失的定时帧，可能导致TSN域中的同步主时钟下游的不准确。随着网络规模的增大，同步的复杂度也随之增加。

**将ATS看成链分析**
需要读取缓冲区数据，才能触发传输和令牌桶算法的计算。
由于ATS整形在不同链路上都具有不同的情况，优先级等，会导致分配到不同的令牌桶中
令牌桶中也具有不同的容量和速率，所以认为每一跳都是一个新的任务，不仅仅只是一个数据帧的传输。而是类比成任务链中的多个前后联系的任务，只不过他们不具有更新计算的功能，相当于通过计算之后仍然得到不变的结果。


# 方法
资源模型

# 模型

## 假设
1. 隐式通信。任务开始时读，结束时写
2. 任务之间存在缓冲区。前一个任务写入缓冲区后$w_{i-1}$，后一个任务才能读取$r_i$
3. ET
4. 周期性任务采样
5. ATS任务，不考虑突发
6. 非抢占
7. 两个任务之间有缓冲区，
8. 两个交换机之间假设传输存在类似的缓冲区进行读写，将传输时间纳入到达时间，使得网络任务和任务一样。
9. 本文研究的汽车系统由N个独立的周期性实时任务组成，由Γ={τ1，...，τN}标识，它们在具有m个电子控制单元(ECU)的全局异步局部同步(GALS)分布式体系结构上执行。每个任务被静态地分配给一个专用的ECU，每个ECU上的任务按照固定优先级的抢占调度策略进行调度。每个∈τiΓ由一个元组τi=(Ci，Ti，Di)来表征，其中

我们通过以下假设对这种通信进行了抽象：1 ) τ c被偶发地或周期性地释放，并传输所需的数据和可能的一些附加信息，例如，一个消息中可能传输多个值给一组任务；==2 )当τ 1的一个作业完成后，它将所需的值写入一个类似于一个核心中通信的缓冲区中，并且每个τ c的作业在初始化时读取当前值；==3 )当τ c的一个作业完成后，τ 2可以直接读取更新后的值，就像读取一个任务在同一处理器上产生的值一样。

## 任务
**终端任务**：
$\tau$ 

i：第i个任务
j：第i个任务的第j个作业
k：第k个终端站

$a^{ik}_j$：到达时间
$f^{ik}_j$：结束时间
$R^{ik}_j$：最差执行时间
$T^{ik}_j$：周期




**ATS任务**：
$m$

k：第k个终端
i：来自哪个流
j：第i个流中的第j个帧

$l^{ik}_j$：帧的长度，size
$p^{ik}_j$：优先级（继承队列的）
$a^{ik}_j$：到达时间
$d^{ik}_j$：整个帧结束的时间（转发出去的时刻）。帧获得资格时间之后，再经过传输算法根据优先级选择，最后传出的时间。（et+B）
$et^{ik}_j$：帧获得的资格时间（通过ATS算法计算）。


$MRT^{ik}_j$：最大驻留时间。纳秒。帧仅在最大驻留时间内有效。
$B^{ik}_j$：阻塞时间，在到达资格时间之后被更高优先级数据帧阻塞


## 系统
N：N个流，N个令牌桶，N个终端站
队列Q，具有固定优先级，FIFO
$r_n$：第n个令牌桶的速率
$b_n$：第n个令牌桶的大小（最大令牌数量）

> 传输选择算法（轮询每个队列的队头），轮询的是，整形队列的header，选择一个优先级最高的帧传输



## 任务链
两个终端站，
1. （采样+）计算任务 + 传输任务（发送数据帧）
2. 网络任务ATS：==最多几跳？==
3. 接收任务（接收数据帧）+ 计算任务（+激励）
4. 消息数量限制为每个事务一条
5. 在每个事务中，我们假设一个任务的优先级高于其在同一终端站内的后续任务的优先级。
6. 网速设置为1 Gbps
7. 每个任务的最坏情况执行时间**(WCET)被认为是0.5ms
8. 根据消息的大小和网络速度计算消息的传输时间(秒)((𝑆𝑖𝑧𝑒𝑗𝑘 + 𝑂𝐻) ∗ 8)∕(𝑠).Oh是TSN帧的开销，以字节为单位。
9. 传输时间(0.0126毫秒)
10. 根据TSN[31，33，34]的最坏情况响应时间分析，消息的响应时间(接收端站接收消息的时间)为1.025毫秒。

![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202311082247587.png)


### 反应时间
最后一个任务$\tau$ 的$a^{last-k}_j$  +  它的最差相应时间$R^{last-k}_j$   -  第一个任务的$a^{first-k}_j$
**两个任务之间的差**
ATS任务，以到资格时间计算
==要考虑优先级和资格时间的问题嘛==



### 最大反应时间

![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202311112042385.png)



## 算法
ATS，标准中的令牌桶
由于该标准只考虑令牌桶
l：帧的长度（length frame）。单位bit。从桶中移除的令牌数量。
r：承诺信息速率（committed information rate）。bit/秒。向桶中填充令牌的速度。
b：承诺突发大小（committed burst size）。单位bit。令牌桶最大的令牌量。
a：达到时间（arrival time）
d：结束时间，整个帧接收
bet：桶空时间（Bucket Empty Time）
bft：桶满时间（bucket Full Time）。桶中令牌数量 = b。
et：资格时间（eligibility Time）。

etd：从空到满的时间（empty To Full Duration）。以r速率向桶中填令牌直到b
get：组资格时间（Group Eligibility Time）。同一类整形器处理前一个数据帧的最近的资格时间。
> 上一个帧的资格时间

lrd：长度恢复持续时间（lengthRecoveryDuration）。以r累积到帧长度的令牌数量l，所需要的时间。l/r。
mrt：最大驻留时间（MaxResidenceTime）。纳秒。帧仅在最大驻留时间内有效。
set：调度时间(schedulerEligibilityTime)。令牌数量满足帧长度l的时间。

![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202311090911895.png)



# title


基于TSN的分布式实时系统任务链的反应时间分析
Reaction Time Analysis of Task Chains for TSN-based Distributed Real-time Systems
# 摘要

**分布式实时系统通常由多个电子控制单元构成，控制任务之间通常具有因果关系。这种系统不仅需要满足时序约束，对最大反应时间也需要限制以免对结果产生影响。现有的分布式实时系统任务链最大反应时间分析通常采用CAN总线作为ECU之间的链接，但随着数据量增加时间敏感网络已成为一种新的解决方案。本文研究了基于IEEE 802.1 QCR标准车载分布式系统任务链端到端时序分析、建立了基于TSN网络传输任务链的模型、并对最大反应时间分析。结合试验表明，我们提出的方法提高了性能。**
Distributed real-time systems usually consist of multiple electronic control units (ECUs), often with causal relationships between control tasks. Such systems not only need to satisfy timing constraints, but also need to limit the maximum reaction time so as not to affect the results. Existing distributed real-time system task chain maximum reaction time analysis usually uses CAN bus as the link between ECUs, but with the increase of data volume Time-sensitive Networking  (TSN) have become a new solution. In this paper, we investigate the end-to-end timing analysis of task chain of distributed system based on IEEE 802.1 QCR standard for vehicle, model the transmission of task chain based on TSN network, and analyse the maximum reaction time. Combined with experiments, we show that our proposed method improves the performance.


#  Introduction
> 异步

**在现代嵌入式实时系统中，通常在多个电子控制单元上，通过一系列任务完成一些功能或对外部事件做出反应，这些任务具有因果关系，即一个任务的输出决定了另一个任务的输入。这样的任务链不仅需要满足截止时间约束，还需要考虑最大反应时间约束以满足功能的正确性以及系统的安全性。例如车辆自动巡航时，控制执行单元延迟超过50ms，虽然仍可能满足在截止期前完成减速控制，但可能会由于控制信号延迟导致车辆急剧减速失去稳定。反应时间约束由AUTOSAR[AUTOSAR]定义，表示外部采样更新数据直到系统每个相关任务处理这个更新的最早时间间隔长度。**
In modern embedded real-time systems, it is common for multiple electronic control units to perform various functionalities or respond to external events through a series of tasks. These tasks have causal relationships, meaning that the output of one task determines the input of another task. Such task chains not only need to satisfy deadline constraints but also consider maximum reaction time constraints to ensure functional correctness and system safety. For example, when a vehicle is in automatic cruise control, if the execution unit of the control system has a delay of more than 50ms, even though it might still meet the deadline for deceleration control, the vehicle may experience abrupt deceleration and lose stability due to the delay in control signals. The reaction time constraint is defined by AUTOSAR [AUTOSAR], representing the length of the earliest time interval at which each relevant task in the system processes an externally sampled/updated data.

**对于反应时间的分析，单个ECU上已有多种结论，【tangReactionTimeAnalysis2023】中采用资源服务曲线模型取得事件触发和数据刷新模式下的最大反应时间分析，在[durr2019end]中提出可以通过即时向前（向后）作业链长度计算最大响应时间与最大数据年龄上界。[gunzel2021timing]中对即时向前（向后）作业链长度从采样到数据处理扩展到外部活动触发到驱动事件。这种分析方法也同样被应用于其他领域例如ros2[teper2022end]。**
Regarding the analysis of reaction time, there have been various conclusions for individual ECUs. In [tangReactionTimeAnalysis2023], a resource service curve model is used to achieve maximum reaction time analysis for event-triggered and data-refresh patterns. In [durr2019end], it is proposed that the maximum reaction time and maximum data age upper bound can be calculated by considering the length of the immediate forward (backward) job chain. [gunzel2021timing] extends the analysis of immediate forward (backward) job chain length from sampling to data processing to external activity triggering to drive events. This analysis method has also been applied in other domains, such as ros2 [teper2022end].

**复杂的数据依赖关系使得端到端延迟分析变得难以处理，而且不仅仅针对单个ECU内部之间因果链的时延，多个ECU之间由于网络通信的存在也使得分布式因果链的端到端分析变得更加复杂[arestova2022itans]。**
The complex data dependency relationships make it difficult to handle end-to-end latency analysis, not only for the causality delays between individual ECUs internally, but also for the distributed end-to-end analysis of causality chains between multiple ECUs due to the existence of network communication [arestova2022itans].

**以前关于多ECU联合的端到端时序分析通常考虑CAN总线为通信方式，例如[gunzel2021timing]，但目前嵌入式实时系统被接入更多的传感器已采集大量信息，同时也造成数据传输量激增，CAN总线不能更好的满足嵌入式实时系统某些高带宽低时延的要求。时间敏感网络被考虑为嵌入式实时系统以及控制领域的通信方式之一。**
Previously, end-to-end timing analysis for multi-ECU collaboration typically considered the CAN bus as the communication method, for example [gunzel2021timing]. However, with the increasing integration of more sensors in embedded real-time systems, a large amount of information is being collected, leading to a surge in data transfer volume. The CAN bus is unable to meet the requirements of certain high-bandwidth, low-latency demands in embedded real-time systems. Time-sensitive networking is considered as one of the communication methods for embedded real-time systems and control domains.

**时间敏感网络是IEEE802.1Q协议的增强，旨在通过提供时间敏感性和低延迟的通信以支持实时控制与数据传输。
其中IEEE 802.1Qcr[IEEEStandardLocal2020]异步流量整形 (ATS) 标准旨在通过撤销同步并允许每个网络节点按自己的时间发送流量来绕过同步的复杂性。**
Time-sensitive networking is an enhancement of the IEEE 802.1Q protocol aimed at providing time-sensitive and low-latency communication to support real-time control and data transfer. Among them, the IEEE 802.1Qcr [IEEEStandardLocal2020] standard for asynchronous traffic shaping (ATS) aims to bypass the complexity of synchronization by revoking synchronization and allowing each network node to send traffic at its own time.

**在成为IEEE标准前，Specht等人提出了Urgency-Based Scheduler（UBS），并使用了Length-Rate Quotient (LRQ) and Token Bucket Emulation (TBE)两种算法。最后在IEEE 802.1 Qcr协议中使用基于令牌桶的ATS算法，如图所示，在TSN交换机中数据流将通过令牌桶的方式整形队列分配给数据帧资格时间，到达队列头的数据帧通过判断资格时间以及经过优先级选择，最终和其他未整形数据流一起输出。**
Before becoming an IEEE standard, Specht et al. proposed the Urgency-Based Scheduler (UBS) and used two algorithms, Length-Rate Quotient (LRQ) and Token Bucket Emulation (TBE). Finally, the Token Bucket-based ATS algorithm was used in the IEEE 802.1 Qcr protocol as shown in the diagram. In TSN switches, data flows are shaped and queues are allocated to data frames based on token bucket. Data frames reaching the head of the queue are output together with other non-shaped data flows after evaluating their eligibility time and priority selection.


**TSN交换机的ATS输出端口**
Output ports of TSN switches with ATS


**目前已有研究将TSN与任务链相结合，【houtanSupportingEndtoendData2023】通过实际汽车案例建模任务链并通过IEEE 802.1 Qbv协议作为网络传输的桥梁。虽然TAS在施加业务确定性方面表现良好，但严格的同步要求，则增加了复杂性并威胁到TSN网络域的可靠性。针对一般的嵌入式实时系统场景，异步系统仍然被广泛应用以减少复杂性例如使用CAN总线作为网络传输。所以在本文中我们选择异步的IEEE 802.1Qcr作为网络任务标准，ATS算法作为队列整形算法。**
Currently, there have been studies combining TSN with task chains. [houtanSupportingEndtoendData2023] Modeling task chains using real-world automotive cases and using the IEEE 802.1Qbv protocol as a bridge for network transmission. Although TAS performs well in enforcing business determinism, strict synchronization requirements increase complexity and pose a threat to the reliability of TSN network domains. For general embedded real-time system scenarios, asynchronous systems are still widely used to reduce complexity, for example, using the CAN bus as network transmission. Therefore, in this paper, we choose the asynchronous IEEE 802.1Qcr as the network task standard and the ATS algorithm as the queue shaping algorithm.


**贡献：我们研究了分布式实时系统上基于TSN网络的任务链最大反应时间，我们的贡献是：**

**- 在第二节中，我们给出了基于TSN网络的分布式实时系统任务链模型，包括单个ECU上的任务模型和多个ECU链接的网络任务模型。其中多ECU通过TSN相互连接，我们使用的TSN标准为IEEE 802.1Qcr。**
**- 在第三节中，我们对多ECU场景下最大反应时间进行分析，为采用IEEE 802.1Qcr标准的网络传输任务链提供了最大反应时间上界。**
- **在第四节中，我们进行了评估并证明提出的方法提高了性能.****
Contribution: We have studied the maximum reaction time of task chains based on TSN networks in distributed real-time systems. Our contributions are:
In Section 2, we present the task chain models for distributed real-time systems based on TSN networks, including the task model for a single ECU and the network task model for multiple ECUs connected through TSN. The TSN standard we use is IEEE 802.1Qcr.
In Section 3, we analyze the maximum reaction time in a multi-ECU scenario, providing upper bounds on the maximum reaction time for network transmission task chains adopting the IEEE 802.1Qcr standard.
In Section 4,  we evaluate and demonstrate that the proposed method improves the performance.

# System Model
**我们假设一组电子控制单元通过采用IEEE 802.1 QCR标准的TSN网络连接。每个任务被静态的分配给一个ECU，该任务释放的所有作业都在同一个ECU上以固定优先级非抢占模式执行，且在同一个ECU上不存在另一个并行执行的任务。每两个ECU之间通过网络连接，这样组成了一条简单的基于TSN网络的车载分布式系统任务链。**
We assume a group of ECUs connected through TSN network using the IEEE 802.1 QCR standard. Each task is statically assigned to one ECU, and all the jobs released by this task are executed on the same ECU in a fixed priority non-preemptive mode. There are no other parallel executing tasks on the same ECU. Each pair of ECUs is connected through the network, forming a simple vehicle distributed system task chain based on TSN network.
## Task Module

**不同的通信语义会产生不同的时间分析结果。在车载分布式系统中通常采用两种通信语义：**
The use of different communication semantics produces varying results in timing analysis, with two communication semantics conventionally employed in vehicular distributed systems:

**隐式通信由AUTOSAR定义[1]为了保证数据一致性。隐式通信语义中在作业开始的时候读取数据，在作业完成的时候写入数据。**
Implicit communication is defined by AUTOSAR [AUTOSAR] to ensure data consistency. In the implicit communication semantics, data is read at the starting of the task and written at its completion. 


**逻辑执行时间是由GIOTTO框架引入的[biondi2018achieving]，目的是为了减少抖动带来的不确定性。LET语义中任务在到达时读取数据在下一周期到来前写入数据。**
Logical Execution Time (LET) was introduced by the GIOTTO framework [biondi2018achieving] with the aim of reducing the uncertainty caused by jitter. In LET semantics, tasks read data upon arrival and write data before the next cycle arrives.


**图1展现了通信语义对于端到端延迟分析的影响。“直接的”表示数据在执行的任意时刻被读或写。LET模型会导致因果链出现更长的端到端延迟。所以在本文中我们考虑隐式通信。**
Figure 1 illustrates the impact of communication semantics on end-to-end delay analysis. "Direct" means that data is read or written at any point during execution. The LET model results in longer end-to-end delays due to the causal chain. Therefore, in this paper, we consider implicit communication.

**我们考虑单个ECU上的调度任务τ，Ei描述了调度任务τi的最差执行时间（WCET）。Ri描述了调度任务τi的最差响应时间，即所有调度任务实例从到达到完成的最大时间间隔。$J^{j}_i$是τi释放的第j个作业。对于所有τi释放的作业都与任务τi具有相同的属性。$a^{j}_i$表示作业的到达时间以及$f^{j}_i$表示结束时间。**
We consider the scheduling task τ on a single ECU. Ei describes the worst-case execution time (WCET) of the scheduling task τi. Ri describes the worst-case reaction time of the scheduling task τi, i.e., the maximum time interval from arrival to completion of all scheduling task instances. $J^{j}_i$ is the jth job released by τi. All jobs released by τi have the same attributes as the task τi. $a(J^{j}_i)$ represents the arrival time of the job, and $f(J^{j}_i)$  represents the finish time.


**Bi表示调度任务τi的固定大小（为|Bi|）的输入缓冲区。每个调度任务τi从它的输入缓冲区Bi中读取由前驱作业τi-1产生的数据，并将自己产生的数据写入其后继任务τi+1的输入缓冲区Bi+1。
单个ECU上的调度任务采用事件触发（ET）的方式，即当前一个作业$J^{j-1}_i$执行完成（$f(J^{j-1}_i)$时刻）写入缓冲区后，后一个任务$J^{j}_i$在$a(J^{j}_i)$ 时刻触发。后一个作业的读取操作时刻不会早于前一个作业的写入操作时刻。**
$B_i$ represents the fixed size (is $|B_i|$) input buffer of scheduling task $\tau_i$. Each scheduling task $\tau_i$ reads data generated by the predecessor job $\tau_{i-1}$ from its input buffer $B_i$, and writes its own generated data into the input buffer $B_{i+1}$ of the successor task $\tau_{i+1}$. On a single ECU, scheduling tasks are triggered by events (ET), which means that when the previous job $J^{j-1}_i$ completes execution (at time $f(J^{j-1}_i)$), the next job $J^{j}_i$ is triggered at time $a(J^{j}_i)$. The read operation of a subsequent task will not occur earlier than the write operation of the previous task.

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
**我们考虑由一系列事件c组成的任务链C={z, c0，c1，c2，...，cn}。所有事件c按序处理在t时刻外部事件z产生的初始数据，并在时刻t'由最后一个事件cn产生关于该数据的最终结果。**

We consider a task chain C consisting of a series of events $C=\{z, c_0, c_1, c_2, ..., c_n\}$. All events in c process the initial data generated by external event $z$ at time $t$ sequentially and produce the final result regarding that data at time $t'$ by the last event $c_n$.

**定义1（任务链）：任务链C={z, c0，c1，c2，...，cn}满足：
- 任务链C中的事件c0和cn只能是调度任务 $\tau_0$ and $\tau_n$,，即c0和cn只能存在于ECU上。
- c0是一个ECU上的周期性调度任务$\tau_0$，且周期为T，用来定期捕捉外部事件z
- 对于外部事件z，当且仅当其发生在CPU空闲时才有效。
- 对于任意事件ci （1<i<n-1），可以是调度任务也可以是网络任务。
- 不存在两个连续的事件ci和ci-1（1<i<n-1）为分别在不同ECU上执行的调度任务情况。在任务链上，不同ECU上执行的两个调度任务中间至少有一个网络任务作为连接。例如，ci-1和 ci+1为不同ECU上的调度任务，则ci为一个网络任务。**
Definition 1 (Task Chain): a task chain C = {z, c0, c1, c2, ... , cn} are satisfied:
- The events c0 and cn in the task chain C can only be scheduling tasks $\tau_0$ and $\tau_n$, i.e., c0 and cn can only exist on the ECU.
-  c0 is a periodic scheduling task $\tau_0$ on an ECU with period T that is used to periodically capture external events z.
- For external event z, it is valid when and only when it occurs when the CPU is idle.
- For any event ci (1<i<n-1), it can be either a scheduling task or a network task.
- There is no case where two consecutive events ci and ci-1 (1<i<n-1) are scheduling tasks executed on separate ECUs. In the task chain, there is at least one network task as a connection between two scheduling tasks executed on different ECUs. For example, if ci-1 and ci+1 are scheduling tasks on different ECUs, then ci is a network task.
> 应在这里补一句假设，外部事件z在采样任务，释放的作业结束后，触发才有效


**定义2（反应时间）：任务链的反应时间表示为R(c)**
R（c）= t'-t =  f(cn) - t(z)
Definition 2 (reaction time): the reaction time of a task chain is expressed as R(c)

**定义3 （最大反应时间）：任务链的最大反应时间RT(c)是任务链c所有可能路径的最大值**
RT(c) = max{R(c)}
Definition 3 (Maximum reaction time): the maximum reaction time RT(c) of a task chain is the maximum of all possible paths of the task chain c
## An Illustrative Example

**在图中，任务链由外部事件z、三个调度任务和两个网络任务组成$C = \{z, \tau_0, \tau_1, m_1, m_2, \tau_2\}$。调度任务$\tau_0, \tau_1$和$\tau_2$被静态的分配给了不同的两个ECU，他们通过两个交换机搭建通信网络。其中任务$\tau_0$, $\tau_1$和$\tau_2$的最差执行时间分别为$E_0=3$、$E_1=3$、$E_2=3$。任务$\tau_0$的周期$T=6$。根据任务释放作业的情况我们可以进一步将任务链C表示为$C = \{z, J_0^2, J_1^1, m_1^2, m_2^2, J_2^3\}$。**
In the figure, the task chain consists of external event z, three scheduling tasks, and two network tasks, denoted as $C = \{z, \tau_0, \tau_1, m_1, m_2, \tau_2\}$. The scheduling tasks $\tau_0, \tau_1$, and $\tau_2$ are statically allocated to two different ECUs, and they are connected through two switches to establish a communication network. The worst-case execution times for tasks $\tau_0, \tau_1$, and $\tau_2$ are $E_0=3$, $E_1=3$, and $E_2=3$ respectively. The period of task $\tau_0$ is $T=6$. Based on the task release order, the task chain C can be further represented as $C = \{z, J_0^2, J_1^1, m_1^2, m_2^2, J_2^3\}$.

**在$t=4$的时刻系统产生了外部事件并写入相关的初始数据到任务$J_0^2$的输入缓冲区$B_0$。此时CPU空闲，外部事件z有效。在$t=10$时刻ECU1上的调度任务$J_0^2$结束并将更新后的数据写入任务$J_1^1$的输入缓冲区$B_1$。当任务$J_1^1$结束后，产生的输出将开始通过网络传输到ECU2，并在$t=17$时刻入队，通过ATS整形算法，并在$t=21$时刻整个数据帧在交换机1结束。类似的在$t=32$时刻，数据帧由交换机2传输到ECU2。最后在$t=36$时刻产生关于外部事件z的最终数据结果。如图所示，处理外部事件z的任务链的反应时间为$R(C)=36-4=32$**
At time $t=4$, an external event occurs and relevant initial data is written into the input buffer $B_0$ of task $J_0^2$. At this time the CPU is idle and the external event z is valid. At time $t=10$, scheduling task $J_0^2$ on ECU1 finishes and updates the data, which is then written into the input buffer $B_1$ of task $J_1^1$. After task $J_1^1$ completes, the generated output starts to be transmitted through the network to ECU2. At time $t=17$, the output is enqueued and goes through the ATS shaping algorithm, and the entire data frame is finished at switch 1 at $t=21$. Similarly, at time $t=32$, the data frame is transmitted from switch 2 to ECU2. Finally, at time $t=36$, the final data result regarding external event z is produced. As shown in the figure, the reaction time of the task chain handling external event z is $R(C) = 36-4 = 32$.
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202312252207793.png)
# maximum reaction time analysis
> 资源服务曲线
考虑任务被跳过（缓冲区满溢出）

**在本节中我们将讨论最大反应时间的上界，参考【】我们假设调度任务的缓冲区是固定大小的，而且存在缓冲区满数据帧溢出的情况。但对于基于ATS算法网络任务现有的分析大部分基于LRQ或是TBE，并且只考虑TSN网络本身，并不适用于任务链的分析。所以我们将基于ATS算法网络任务部分分析与现有ECU调度任务链分析整合，扩展到通过TSN网络互联的多个ECU之间的任务链最大反应时间上界分析。**
In this section, we will discuss the upper bound of the maximum reaction time. Referring to [], we assume that the buffer for scheduling tasks is of a fixed size, and there is a possibility of buffer overflow. However, most of the existing analysis for network tasks based on the ATS algorithm is based on LRQ or TBE, and only considers the TSN network itself, which is not suitable for analyzing task chains. Therefore, we will integrate the partial analysis of network tasks based on the ATS algorithm with the existing analysis of ECU scheduling task chains, and extend it to analyze the upper bound of the maximum reaction time for task chains between multiple ECUs interconnected through the TSN network.

**定义4 （结束时间）：对于任务链$C = \{z, c_0, c_1, c_2, ... , c_n\}$中的每一个事件，$t(\cdot )$为事件的结束时间：
**- 对于外部事件z，$t(z)$为外部事件发生的时间。**
**- 对于ECU上的调度任务$\tau_i$来说$t(c_i)$为调度任务$\tau_i$的结束时间$f(c_i)$。**
**- 对于网络任务$m_i$来说$t(c_i)$为结束时间$d(c_i)$。****
Definition 4 (End Time): For each event in a task chain $C = \{z, c_0, c_1, c_2, ..., c_n\}$, $t(\cdot)$ represents the end time of the event: 
- For an external event z, $t(z)$ is the time at which the external event occurs. 
- For a scheduling task $\tau_i$ on the ECU, $t(c_i)$ is the end time $f(c_i)$ of the scheduling task $\tau_i$. 
- For a network task $m_i$, $t(c_i)$ is the end time $d(c_i)$.

$$t(\cdot)=
\begin{array}{l} 
  \left\{\begin{matrix} 
  t(z)  & \text{if an external event}\\
t(c_i)=f(c_i) & \text{if a scheduling task}\quad\tau_i\\
d(c_i) & \text{if a network task}\quad m_i\\
\end{matrix}\right.    
\end{array} $$ 

**基于公式（），对于反应时间我们可以将其表示为：**
Based on formula (), For reaction time, we can express it as:
$$\begin{equation}
\begin{aligned}
R(C) & = t'-t\\
     & = t(c_n) - t(z)\\
     & = t(c_0) - t(z) + \sum_{i=1}^{n}(t(c_i) - t(c_{i-1}))\\
     & = t(c_0) - r(c_0) + r(c_0) - t(z) + \sum_{i=1}^{n}(t(c_i) - t(c_{i-1}))\\
     & = f(c_0) - t(z) + \sum_{i=1}^{n}(t(c_i) - t(c_{i-1}))\\
\end{aligned}
\end{equation}$$

**则最大反应时间根据公式（）为max{f(c_0) - t(z) + \sum_{i=1}^{n}(t(c_i) - t(c_{i-1}))}**
The maximum reaction time is determined according to formula () is $\max\{f(c_0) - t(z) + \sum_{i=1}^{n}(t(c_i) - t(c_{i-1}))\}$

**根据公式（4）我们可以对任务链C的的最大反应时间分段求取上界。我们将任务链C的最大反应时间分为两部分**
Based on formula (4), we can obtain upper bounds for the maximum reaction time of task chain C in segments. We divide the maximum reaction time of task chain C into two parts.

**Part one. $f(c_0)-t(z)$的上界**
Part \uppercase\expandafter{\romannumeral1}. The upper bound of $f(c_0)-t(z)$.


**引理1，The upper bound of $f(c_0)-t(z)$ is $f(c_0)-t(z) \le T$**
Lemma 1, $f(c_0)-t(z) \le T$.


**证明，根据定义（1），我们可以获得事件$c_0$的定义，即事件$c_0$必然是一个调度任务为$\tau_0$，所以根据定义（4）调度任务$\tau_0$的结束时间为$f(\tau_0)=f(c_0)$。继续使用定义（1），事件$c_0$（调度任务$\tau_0$）以T为周期捕捉外部事件z，所以当外部事件在t(z)开始触发之后最晚在一个周期T之内，它将被调度任务$\tau_0$捕捉。所以我们可以得到$f(c_0)-t(z)$的上界为T。**
Proof: According to definition (1), we can obtain the definition of event $c_0$, which states that event $c_0$ must necessarily be scheduled as task $\tau_0$. Thus, based on definition (4), the completion time of task $\tau_0$ is $f(\tau_0)=f(c_0)$.Continuing with definition (1), event $c_0$ (task $\tau_0$) captures external event $z$ with a period of $T$. Therefore, when the external event is triggered at $t(z)$ or later, it will be captured by task $\tau_0$ within a maximum period of $T$. Hence, we can conclude that the upper bound of $f(c_0)-t(z)$ is $T$.

> 假设外部事件z，只在采样任务τ0释放的作业，完成之后才能有效触发
> 也就是说 f(J01) < t(z) < r(J02)
> 因为如果外部事件z在作业J01结束前触发，那么它将由作业0捕捉，但不一定能处理完成传递数据，所以假设完成之后才能有效的触发
> 采样任务具有相同的WCET
> 那么，相邻两个作业的结束时间之差，上界为T
>所以 f(c0)-t(z)上界为T

**Part two. $t(c_i)-t(c_{i-1})$的上界**
Part two. The upper bound of $t(c_i)-t(c_{i-1})$.

**定义5，事件状态。为了简化表达便于分析，我们使用$s(\cdot)$表示任务链$C = \{z, c_0, c_1, c_2, ... , c_n\}$中每个事件的状态，即对于任意一个事件$c_i$它代表的任务类型。
**- 如果是调度任务，则$s(c_i)=\tau$,**
**- 如果是网络任务，则$s(c_i)=m$,****
 Definition 5, Event Status. In order to simplify the expression for ease of analysis, we use $s(\cdot)$ to represent the status of each event in the task chain $C = \{z, c_0, c_1, c_2, ..., c_n\}$, i.e., for any event $c_i$, it represents the type of task it stands for.
- If it is a scheduling task, then $s(c_i) = \tau$,
- If it is a network task, then $s(c_i) = m$.
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

**这种情况下，我们参考【】中对于固定大小缓冲区事件触发链的时间上限。
令$\alpha=\max\{\overline{\beta_i^l}((|B_i| + 1)\cdot E_i), DLY_i(|B_i|)\}$**
In this case, we refer to the time upper bound for fixed-size buffer event-triggered chains discussed in [reference]. Let $\alpha=\max\{\overline{\beta_i^l}((|B_i| + 1)\cdot E_i), DLY_i(|B_i|)\}$

**其中$\overline{\beta(\cdot)}$为资源曲线函数$\beta(\Delta )$的伪逆函数，表示系统处理一定工作负载所需要的时间。而$DLY_i(|B_i|)$是作业的最大延迟。**
In this equation, $\overline{\beta(\cdot)}$ represents the pseudo-inverse function of the resource curve function $\beta(\Delta)$, which indicates the time required for the system to process a certain workload. $DLY_i(|B_i|)$ represents the maximum delay of the job

**所以我们可以得到当$s(c_i)=\tau, s(c_{i-1})=\tau$时，$D=\alpha= \max\{\overline{\beta_i^l}((|B_i| + 1)\cdot E_i), DLY_i(|B_i|)\}$**
Therefore, we can obtain that when $s(c_i)=\tau$ and $s(c_{i-1})=\tau$, $D=\alpha= \max\{\overline{\beta_i^l}((|B_i| + 1)\cdot E_i), DLY_i(|B_i|)\}$.


**case2：$s(c_i)=m$。即前后相邻的两个事件中，后一个任务$c_i$是调度任务$m_i$ ，而前一个事件不受限制 $c_{i-1}=\tau_{i-1}$ or $m_{i-1}$**
Case 2: $s(c_i)=m$. In other words, in the two consecutive events, the subsequent task $c_i$ is scheduled as a task $m_i$, while the preceding event is not restricted, $c_{i-1}=\tau_{i-1}$ or $m_{i-1}$.

**如图1所示，我们考虑数据（1）在一个ECU上传入网络；(2)网络中不同交换机之间传输；(3)网络中最后一跳传输到另一个ECU。这三种情况下，根据网络带宽以及数据大小，在一条任务链的分析中，数据传输具有相同的延迟为t（数据大小/带宽）。**
As shown in Figure 1, we consider the following scenarios in the analysis of a task chain: (1) Data input from an ECU into the network, (2) Transmission between different switches in the network, and (3) Final hop transmission to another ECU in the network. In these three scenarios, based on the network bandwidth and data size, data transmission has the same delay of t (data size/bandwidth) in the analysis of a task chain.

**对于网络任务，根据令牌桶算法我们知道数据帧的延迟会受到(1)高优先级队列的流；(2)低优先级队列的流；(3)同等优先级竞争的流；(4)数据流本身的性质；(5)当前令牌桶性质的影响。所以根据Specht等人在【】所求的上界，以及【TimeSensitiveNetworking2021】可得到
$(\frac{b_H+b_j+l_L}{r-r_H} + \frac{l_i}{r})$，其中$H$，$L$，$j$分别表示了高优先级、低优先级与竞争流的索引。并且取得高优先级流 committed burst size的集合$b_H$，竞争的合集$b_j$，以及低优先级中最大帧长度$l_L$，** 其中 $r>\sum_{k\in H\cup j\cup i }r_k$
> $(\frac{b_H+b_j+b_i-l_i+l_L}{r-r_H} + \frac{l_i}{r})$


For network tasks, according to the token bucket algorithm, we know that the delay of data frames is influenced by (1) flows in the high priority queue, (2) flows in the low priority queue, (3) flows competing with equal priority, (4) the nature of the data flow itself, and (5) the current nature of the token bucket.
Therefore, based on the upper bound obtained by Specht et al. in 【】and 【TimeSensitiveNetworking2021】, we can obtain $(\frac{b_H+b_j+l_L}{r-r_H} + \frac{l_i}{r})$, where $H$, $L$, and $j$ respectively represent the indices of the high-priority, low-priority, and competing flows.  And obtain a collection of high priority flows with committed burst size $b_H$, a set of competing burst sizes $b_j$, and the maximum frame length $l_L$ in low priority.
Where $r>\sum_{k\in H\cup j\cup i }r_k$
![image.png](https://cdn.jsdelivr.net/gh/wsm6636/pic/202311171713154.png)


**所以对于$r_H + r_j + r_i \le r$我们可以得到当$s(c_i)=m$时，$D=\theta+t=(\frac{b_H+b_j+l_L}{r-r_H} + \frac{l_i}{r})+t$**
So we can obtain , for $r_H + r_j + r_i \le r$, that when $s(c_i)=m$,$D=\theta+t=(\frac{b_H+b_j+l_L}{r-r_H} + \frac{l_i}{r})+t$.


**case3：$s(c_i)=\tau, s(c_{i-1})=m$。即前后相邻的两个事件中，前一个事件$c_{i-1}$为网络任务$m_{i-1}$ ，后一个任务$c_i$是调度任务$\tau_i$ 。**
Case 3: $s(c_i)=\tau, s(c_{i-1})=m$. That is, in the sequence of two consecutive events, the first event $c_{i-1}$ is a network task $m_{i-1}$, and the second task $c_i$ is a scheduling task $\tau_i$.

**在这种情况下我们需要将网络传输到另一个ECU的情况考虑进去，就像case2一样。所以可以获得同样的传输时间t。并且在t时间段结束后数据被写入调度任务$\tau_i$的输入缓冲区，在$a_i$时刻我们可以类比为case1中前一个调度任务的结束时刻$f_{i-1}$，所以我们可以获得同样的时间结果为$\alpha$。**
In this case, we need to consider the situation where the network transmission needs to be done to another ECU, similar to case 2. So, we can obtain the same transmission time, t. And after the t time period, the data is written into the input buffer of the scheduling task $\tau_i$. At time $a_i$, we can analogize it to the end time of the previous scheduling task, $f_{i-1}$, in case 1. Therefore, we can obtain the same time result is $\alpha$.

**所以我们可以得到当$s(c_i)=\tau, s(c_{i-1})=m$时，**$D=\alpha + t=\max\{\overline{\beta_i^l}((|B_i| + 1)\cdot E_i), DLY_i(|B_i|)\}+t$
So we can obtain that when $s(c_i)=\tau, s(c_{i-1})=m$, $D=\alpha + t=\max\{\overline{\beta_i^l}((|B_i| + 1)\cdot E_i), DLY_i(|B_i|)\}+t$.

**综合part 1和part 2我们可以得到以下定理。**
By combining part 1 and part 2, we can derive the following theorem.
定理1，任务链$C = \{z, c_0, c_1, c_2, ... , c_n\}$的最大反应时间上界为：
其中，$D$由引理2给出。
Theorem 1, the maximum reaction time upper bound of task chain $C = \{z, c_0, c_1, c_2, ... , c_n\}$ is:
$$\begin{equation}
\begin{aligned}
RT(C)
& =\max{R(C)}\\
& = f(c_0) - t(z) + \sum_{i=1}^{n}(t(c_i) - t(c_{i-1}))\\
& = T + D
\end{aligned}
\end{equation}$$
Where $D$ is given by Lemma 2.

# Evaluation
在本章中，我们评估了基于TSN网络传输的任务链模型最大反应时间的上界。
我们设置每条任务链除了外部事件，其余部分由三个调度任务以及两个网络任务组成，类似于文献【houtanSupportingEndtoendData2023】中的车辆应用案例。这些任务链被设定为两个ECU之间传输的情况，前两个调度任务是由外部事件在第一个ECU上触发的部分，通过网络任务的传输，最终由最后一个调度任务在另一个ECU上完成外部事件的处理。对于所有调度任务，在[1,60]，之间选择其的WCET，并在[1,100]中随机选择$T$。按照时分多址模型得到：
$\beta (\bigtriangleup ) = (\left \lfloor \bigtriangleup'/x_i  \right \rfloor \cdot s_i+\min (\bigtriangleup'/x_i \mod{ x_i,s_i} ))\cdot b_i$
In this chapter, we evaluated the upper bound of the maximum reaction time for the task chain model based on TSN network transmission. We set up each task chain to consist of three scheduling tasks and two network tasks, except for external events, similar to the vehicle application case in the literature [HOUTAN2023102911]. These task chains were configured for transmission between two ECUs, where the first two scheduling tasks were triggered by external events on the first ECU. Through the transmission of network tasks, the final external event processing was completed by the last scheduling task on the other ECU. For all scheduling tasks, their WCET (worst-case execution time) was selected between [1,60], and $T$ was randomly chosen between [1,100]. According to the time-division multiple access model, we obtained:
$\beta (\bigtriangleup ) = (\left \lfloor \bigtriangleup'/x_i \right \rfloor \cdot s_i+\min (\bigtriangleup'\mod{ x_i,s_i} ))\cdot b_i$



其中$\bigtriangleup'=\max (\bigtriangleup-x_i+s_i,0)$。在我们的实验中，$x_i$是在[50，120]中随机选择的，$b_i=1$，$\delta =40$，$s_i=x_i−\delta$。对于网络任务，整个网络的带宽被设定为1Gbit/s。对于每条任务链上的网络任务，数据帧的长度在[84,1542]Byte 中随机分配。
我们同时生成了$N$个干扰任务（包括网络任务本身），N在[5,50]中随机选择，他们根据分配的队列获得了相应的优先级以及参数$r$和$b$。
每个泄漏率 $r$是随机选择的，且 $0 < r \le 1$，$b$与$l$范围相同。
Among them, $\bigtriangleup'=\max (\bigtriangleup-x_i+s_i,0)$. In our experiment, $x_i$ is randomly selected from [50, 120], $b_i=1$, $\delta =40$, and $s_i=x_i-\delta$. For network tasks, the total network bandwidth is set to 1Gbit/s. For each network task on the task chain, the length of the data frame is randomly allocated from [84, 1542] bytes. We also generate $N$ interference tasks (including the network task itself), randomly select N from [5, 50], which obtain corresponding priority and parameters $r$ and $b$ based on the assigned queue. Each leakage rate $r$ is randomly selected, and $0 < r \le 1$, $b$ is within the same range as $l$.

> intel(R) Core(TM) i7-10700 CPU @ 2.90GHz 

我们在实验平台进行了评估，with intel(R) Core(TM) i7-10700 CPU @ 2.90GHz and 32GB DDR4。
首先我们评估了数据帧长度对于最大反应时间的影响，如图1.1所示，我们选择网络任务中40%为高优先级，30为同等优先级，其余为低优先级的。为了更好的显示结果的变化，我们对过长的数据进行了归一化处理。当数据帧长度增加时，最大反应时间也随之增加，直到达到committed burst size。
We conducted an evaluation on the experimental platform with intel(R) Core(TM) i7-10700 CPU @ 2.90GHz and 32GB DDR4.
First, we evaluated the impact of data frame length on maximum reaction time, as shown in Figure 1.1. We chose a network task with 40% high priority, 30% equal priority, and the remaining as low priority. In order to better visualize the changes in the results, we applied normalization to the overly long data.
As the data frame length increases, the maximum reaction time also increases, until it reaches the committed burst size.

接着我们观察了高优先级网络任务和同等优先级任务对于最大反应时间的影响。如图1.2和1.3所示，我们限定N=40, T=50, E=0.5，并将高优先级与同等优先级任务的占比以10%的步长冲10%增加到90%。在图1.2中，我们可以得到当高优先级任务占比增加最大反应时间也随之增加，而在图1.3中同等优先级任务占比增加则最大反应时间随之减小。这是由于在公式【】中，高优先级任务与同等优先级任务对分子分母的影响不同。
Next, we observed the impact of high-priority network tasks and tasks with equal priority on the maximum reaction time. As shown in Figures 1.2 and 1.3, we set N=40, T=50, E=0.5 and increased the proportion of high-priority and equal-priority tasks in increments of 10% from 10% to 90%. In Figure 1.2, we can see that as the proportion of high-priority tasks increases, the maximum reaction time also increases. On the other hand, in Figure 1.3, as the proportion of equal-priority tasks increases, the maximum reaction time decreases. This is because the influence of high-priority tasks and equal-priority tasks on the numerator and denominator is different in the formula [].


根据Davare在【davare2007period】中提出的关于基于异步CAN网络的任务链时延分析，的最大反应时间是任务链中所有对象的周期与最坏响应时间之和。即$RT'(C')=\sum_{k\in C}{T_k'+R_k'}$。
According to the maximum reaction time analysis for task chains based on asynchronous CAN networks proposed by Davare in \cite{davare2007period}, the maximum reaction time is the sum of the period and worst-case response time of all objects in the task chain. In other words, $RT'(C')=\sum_{k\in C}{T_k'+R_k'}$.

为了便于比较我们设定$|B|=1$，且任务链$C$的任务被认为是偶发任务，
对于调度任务，$T'=D'=\alpha '=\bar{\beta^l_i}*(E_i)$
对于网络任务，$l_i=b_i$，$T'=D'=\theta ' +t=(\frac{b_H+b_j+l_L}{r-r_H} + \frac{b_i}{r})+t$

To facilitate comparison, we set $|B|=1$, and the tasks in task chain $C$ are considered sporadic tasks.
For scheduling tasks, $T'=D'=\alpha '=\bar{\beta^l_i}*(E_i)$.
For network tasks, $l_i=b_i$, $T'=D'=\theta ' +t=(\frac{b_H+b_j+l_L}{r-r_H} + \frac{b_i}{r})+t$.
So for a task chain $C = \{z, c_0, c_1, c_2, ... , c_n\}$, $RT'(C)=T+D'$ where

$$D'=\begin{array}{l} 
\left\{\begin{matrix} 
\alpha '  & s(c_i)=\tau, s(c_{i-1})=\tau\\
\theta ' +t   & s(c_i)=m\\
\alpha '  +t  & s(c_i)=\tau, s(c_{i-1})=m\\
\end{matrix}\right.    
\end{array}$$
最坏情况下最坏响应时间与周期相等，$RT'(C')=\sum_{k\in C}2{T_k}'$。但对于网络任务，只需考虑一次传输的时间所以$RT'(C')=\sum_{k\in C}2{T_k}'-t[p]$
In the worst-case scenario, the worst-case response time is equal to the period, $RT'(C')=\sum_{k\in C}2{T_k}'$. However, for network tasks, we only need to consider the time of one transmission, so $RT'(C')=\sum_{k\in C}2{T_k}'-t[p]$.
where [p] is an iverson bracket with:
$$[p]=\begin{array}{l} 
\left\{\begin{matrix} 
0  & s(c_i)=\tau, s(c_{i-1})=\tau\\
1  & otherwise\\
\end{matrix}\right.    
\end{array}$$
我们在图1.4中展示了与【davare2007period】的比较，结果显示在与图1.2相同的配置下，通过逐步增加高优先级的占比，我们的最大反应时间始终低于davare的方法。
In Figure 1.4, we demonstrate a comparison with [davare2007period]. The results show that, under the same configuration as in Figure 1.2, by gradually increasing the proportion of high-priority tasks, our maximum reaction time is consistently lower than that of davare's method.

# Conclusion

在本文中，我们研究了一种基于TSN网络传输的任务链模型，将IEEE 802.1 Qcr标准作为连接多个ECU的网络传输任务的标准，并将单个ECU上的事件触发任务链与之结合。我们对提出的任务链进行了最大反应时间上界的分析。通过实验表明，我们提出的方法提高了性能。我们计划进一步探索TSN网络中Qcr标准以及其他类型流量对于任务链最大反应时间的影响，并将其扩展至最大数据年龄的分析。
In this paper, we investigate a task chain model based on TSN network transmission, using the IEEE 802.1 Qcr standard as the standard for connecting multiple ECUs for network transmission tasks, and combining event-triggered task chains on individual ECUs. We analyze the maximum reaction time upper bound of the proposed task chains. Experimental results show that our method improves performance. We plan to further explore the impact of the Qcr standard in TSN networks and other types of traffic on the maximum reaction time of task chains, and extend it to the analysis of maximum data age.

# APPENDIX



----


假设
研究的问题

ATS调度

在什么条件下研究什么