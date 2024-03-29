---
created: 2023-07-21T13:49
updated: 2024-03-26T23:33
tags:
  - 笔记
  - 笔记/文献笔记
---

# Fixed-priority scheduling and controller co-design for time-sensitive networks

| Title                 | Fixed-priority scheduling and controller co-design for time-sensitive networks |
| --------------------- | ------------------------------------------------------------------------------ |
| Journal or Conference | ICCAD '20: IEEE/ACM International Conference on Computer-Aided Design          |
| Authors               | Xiaotian Dai; Shuai Zhao; Yu Jiang; Xun Jiao; Xiaobo Sharon Hu; Wanli Chang    |
| Pub. date             | 2020-11-02                                                                     |
| DOI                   | [10/gsfbtb](https://doi.org/10/gsfbtb)                                         |
| Level                 |                                                                                |

# Fixed-Priority Scheduling and Controller Co-Design for Time-Sensitive Networks

# 固定优先级调度和时间敏感网络的控制器共同设计

## ABSTRACT

时间敏感网络（TSN）是IEEE 802.1工作组开发的一组标准化通信协议。TSN旨在支持基于分布式配置的网络调度的确定性通信。它被广泛认为是高度自动化驾驶的未来车载网络解决方案，其中对时序保证的要求与对高通信带宽的要求并存。在这项工作中，我们研究了分别具有隐式和任意截止时间的周期控制和非控制分组的设置。==由于802.lQbv交换机中的FIFO（先进先出）队列在最坏情况下会产生长延迟，这会阻止控制任务实现短采样周期，从而阻碍控制性能优化==，因此我们通过利用其门控制特性，**提出了TSN的第一种固定优先级调度（FPS）方法**。在这种情况下，我们开发了较细的**帧级响应时间分析**，该分析比传统的数据包级分析提供了更严格的界限。在FPS和上述分析的基础上，我们制定了一个共同设计优化问题，以确定带有安装时间的真实时间控制器的采样周期和极点，以最小化，同时满足计划约束。

> 贡献：TSN的固定优先级调度，帧级响应时间分析

## 1 INTRODUCTION

近年来，作为数据链路层协议，以太网已从标准的计算机网络发展为工业自动化的应用（例如，PROFINET，ETHERNET/IP，ETHERCAT和SERCOS III [18]），航空航天（例如Afdx [3）[3]），能量和力量（例如，高于HSR/PRP的IEC 61850）以及车载通信（例如确定性实时以太网[19]）。在新兴的安全性系统（例如高度自动化的车辆）中，需要在相同的基础设施上传输大量具有混合类型的消息，这需要确定性和可预测的时机来确保安全。传统的实时网络使用非标准的以太网来实现高带宽确定性交流，这禁止不同供应商的不同协议和组件之间的连通性，并增加了时间和危害分析的不确定性和困难。因此，要求网络协议满足确定性端到端延迟和高流量负载的要求。

作为IEEE标准提出的时间敏感网络（TSN）提供了一种可互操作和灵活的基于确定性的以太网解决方案[12]。它被广泛认为是未来汽车的网络解决方案。IEEE 802.1 TSN标准包括广泛的子集，其中最重要的协议之一是802.LQBV [5，11，20]。IEEE 802.LQBV使用TDMA（时间划分多访问）计划的队列支持Timeaware Shaper（TAS），以访问由Gate Switching Logic控制的出口端口，该逻辑由同步的全局计时器和查找调度表驱动。

控制回路通常参与安全至关重要的系统，在该系统中，在通信和控制性能（通过结算时间衡量）中都需要保证。通常，简短的采样周期可以通过控制器与工厂之间的频繁相互作用来实现良好的控制性能。无法直接应用TSN的最新网络调度技术（例如[2，13，20]），因为他们既不考虑网络数据包上的硬实时约束也不是系统的控制性能。

**主要贡献：**为了满足上述需求，我们为TSN 802.lQbv提供了**网络调度和控制器联合设计的第一个集成解决方案**。周期性控制和非控制数据包都被认为是最能捕捉真实场景的。目标是实现时间可预测性并最大化控制性能。具体而言，由于802.lQbv交换机中的FIFO（先进先出）队列在最坏情况下会产生长延迟，这会阻止控制任务实现短采样周期，从而阻碍控制性能优化，因此我们提出了**TSN的第一种固定优先级调度（FPS）方法**。离线计算的进度表可以在交换机的门控列表中实现，并相应地执行。我们**对框架级别提出的调度方法进行了更细粒度的分析，该方法比传统的数据包级分析更紧密地界定网络数据包的最差响应时间**。目标是在满足可调度性约束的同时，最大化通过<font color='green'>稳定时间</font>测量的总体控制性能。

> 在控制理论中，稳定时间是指系统在**输入或设定点发生变化后达到稳定状态所需的时间**。具体而言，它被定义为**系统输出保持在其稳态值的一定百分比（通常为5%）内所需的时间**。
>
> 稳定时间是设计和分析控制系统时需要考虑的一个重要参数，因为它会**影响系统的稳定性和性能**。**较长的稳定时间可导致对输入变化的较慢响应**，这在某些应用中可能是不期望的，而较短的稳定时间可以导致更快速和准确的控制。
>
> 通常通过观察系统对输入或设定点阶跃变化的响应，然后分析数据以确定输出何时达到规定百分比范围内的稳态值。也可以使用系统的数学模型从理论上对其进行估计。

**论文组织**：第2节给出了TSN的简要背景，其中包括交换机的内部结构和必要的概念；第3节介绍了帧级FPS方法，以及相应的可调度性分析；第4节讨论了性能和网络约束下的实时控制器设计。最后，在第5节中报告了评估，然后在第6节中进行了一些评论，以结束本文。

## 2时间敏感网络背景

时间敏感网络是基于以太网的通信服务的推动者，这些服务最初不是为了支持硬实时保证而构建的，例如**OPC Unified Architecture（OPC-UA）1和分布式数据服务（DDS）2**。TSN的目标是减少关键业务的最坏情况端到端延迟。在这里，我们简要讨论IEEE 802.LQBV TSN（以下文本中称为QBV）。图1中描述了启用QBV开关的图形视图。从图中可以看出，QBV TSN开关由以下主要组件组成：

**预定的FIFO队列：**在启用QBV的TSN开关中，有八个独立的延时型FIFO队列，由传输门控制。输入流量由数据包过滤单元过滤，该单元将数据包发送到其指定队列。此信息在以太网框架中的优先级代码点（PCP）标头中编码为服务（cos）类（cos）。

**闸门控制列表（GCL）：**GCL可以通过闸门控制周期周期性地触发闸门打开和闸门关闭事件。根据具体实现，事件之间的时间粒度可以低至lns。该调度位于分布式配置到每个TSN节点的GCL查找表中。如果同时打开多个门，优先级选择单元中的策略将确定哪个队列首先转发到出口端口。

**时间同步：**为了允许通过网络分布的时分传输，计时器使用精确时间协议（PTP）与同一网络中的所有交换机进行全局同步，例如IEEE 802.lAS或IEEE 802.lAS-Rev。

Qbv TSN的机制提高了交通调度和控制方面的灵活性。它支持标准兼容工业设备之间的互操作性，从而允许开放数据交换。它还消除了关键和非关键通信网络物理分离的需要。然而在不同方面这些增加了设计复杂性，需要精心处理。



![image-20230304214712138](https://cdn.jsdelivr.net/gh/wsm6636/pic/202303042147226.png)

## 3控制系统中TSN的交通调度

在这项工作中，我们提出了一个集成解决方案，该解决方案解决了==控制器网络共同设计问题==。考虑了<font color='green'>单个TSN开关上</font>的安排，可以将其<font color='green'>扩展到整个网络</font>。当我们关注调度方面时，假设网络通信是理想的（i） 队列的深度足够，即没有流量溢出；（ii）通道无误，并且具有恒定的传输速率。这些简化了分析，有助于理解问题的本质。在实践中放松它们需要有限的修改，将在未来的工作中讨论。网络受到两种基本流量类型的影响：调度流量和非调度流量，这取决于是否需要某一级别的服务质量（QoS）。在这项工作中，我们专注于调度流量，并尽最大努力使用剩余带宽传输未调度流量。

> 调度流量通常是指按照预定的时间表和路线进行的网络数据传输服务，例如电子邮件、网页浏览和在线视频等。这些服务通常具有可预测性和稳定性，因为它们按照固定的时间表和路线进行传输，可以进行规划和优化，以提高效率和可靠性。
>
> 非调度流量则是指根据用户或应用程序的需求随时进行的网络数据传输服务，例如即时通讯、文件传输和流媒体等。这些服务通常具有更高的不确定性和不稳定性，因为它们的传输时间和带宽需求随时可能发生变化，需要更加灵活和自适应的网络架构和资源分配方式。
>
> 网络的设计和管理需要考虑到这两种类型的流量，以满足不同应用场景和需求的要求。调度流量需要更加稳定和可靠的网络服务，而非调度流量需要更加灵活和高效的网络服务。网络技术的不断发展和创新，旨在为这两种类型的流量提供更加高效和可靠的传输服务。

TSN提供了时间同步和时间分段传输，该传输可以通过GCLS [20]实现全局调度。尽管TSN的时间表可以手动设计，但随着网络变得复杂，网络中添加了更多的数据包，它很快变得不切实际。在本节中，我们在==考虑控制系统时指定了TSN采用的调度策略==。提议的时间表最大程度地减少了数据包的阻塞（包括由控制任务发送的数据包），以提高计划性能和控制性能。然后，我们引入了**细粒度响应时间分析，该分析限制了单个Qbv交换机中数据包的最坏延迟**。下面我们首先讨论系统模型。

**系统模型**：系统包含N个周期性数据包$\Gamma=\{\tau_1,\tau_2,...,\tau_N\}$包括应用程序任务发送的控制（$\Gamma_c$）和非控制数据包（$\Gamma_{nc}$）。每个包$\tau_i$被建模为一个七元组$\{ L_i,C_i,T_i,D_i,P_i,R_i,\Lambda_i \}$。包的最坏长度$L_i$，传输$C_i$，周期$T_i$，截止期$D_i$，优先级$P_i$，最差延迟$R_i$，每次释放中的帧集合$\Lambda_i$。**帧以非抢占方式传输**。全局分组传输速率$v$被应用于所有分组，因此$\tau_i$的$C_i=L_i/v$。每个**控制包被分配有隐式截止**时间，即$D_i=T_i$。为了为系统提供更通用的网络模型，**非控制包可以具有任意的截止日期**，而不施加任何约束。因此，在给定的时间瞬间，可能有几个非控制数据包的实例等待在交换机中传输。根据截止期单调算法（如果$D_i<D_j$，则$P_i>P_j$）分配所有分组的优先级，并且每个分组具有唯一的优先级。

> 该算法是基于固定优先级的抢占式调度算法，其中每个任务都有一个固定的截止时间，调度器按照任务的截止时间为其分配优先级，即具有较早截止时间的任务具有更高的优先级。
>
> **截止期d越小，优先级p越高**

此外，还考虑了最大传输单元(**MTU**) ，表示为 M，它定义了**单次传输中允许的最大数据大小**。为了易于表达，我们将M表示为发送一个MTU的数据的传输时间的大小。因此，每个分组可以被划分为一组连续的帧$\Lambda_i=\{\lambda_i^1, \lambda_i^2, ..,\lambda_i^m\}$其中==$m=\left \lceil L_i/M \right \rceil $。==对于给定的帧$\lambda_i^j$，它继承了$\tau_i$（即$T_i$和$D_i$,$P_i$）的分析财产，并有自己的数据长度$L_i^j,$和传输时间$C_i^j$。

> 为什么m等于这个公式

### 3.1在TSN中调度网络分组

在典型的QBV开关中，网络数据包由它们的到达时间（即FIFO排队）排队，并非抢占发送[11]。传统上，GCL调度的综合是使用满意度模型理论（SMT）[5，13]或整数线性编程（ILP）[2]进行的。然而，定义的端到端延迟带来零抖动，解决方案空间显著减少。具有服务质量（QoS）要求的TSN网络中的调度可以在队列级别[20]或分组级别[14]执行。通过队列级调度，Qbv交换机中的每个FIFO队列都被分配了一个优先级，优先级较高的队列中的数据包总是首先被传输。然而，由于每个队列中的数据包都严格按照FIFO顺序传输，因此，**队列级调度方法下的数据包可能会导致大量阻塞，在这种情况下，具有较短截止时间但位于队列末尾的数据包不受青睐。也就是说，在队列级调度中，相同FIFO队列中具有不同截止时间的数据包被同等对待，而不考虑单个时间要求**。==对于控制系统，这种调度是不合适的，因为传输控制数据包的延迟会对系统的控制性能产生重大影响==。因此，<font color='cornflowerblue'>采用分组级（更准确地说，帧级）调度来提供更细粒度的调度，其中每个分组（及其帧）严格按照其优先级进行调度。</font>

然而，即使采用分组级调度，由于**FIFO**排队，分组仍可能产生额外的延迟，因为实际传输在很大程度上取决于分组的到达时间。**在最坏的情况下，具有高优先级的延迟到达的分组可以被具有较低优先级的所有释放的分组阻塞**。为了最大限度地减少FIFO排队造成的延迟，另一种方法是离线（即，在执行之前）执行调度，完全了解系统中的所有数据包。**离线调度可以通过假设所有数据包同时到达，并根据其优先级获得数据包传输顺序来执行**。如果在运行时具有不同的到达时间，则可以采用延迟提前到达的低优先级帧的排队的简单机制，以保持从离线FPS-NP获得的排队顺序，而不会对分组传输施加额外的延迟（关于延迟排队，请参阅第3.2节）。通过在运行时保持离线分组传输顺序，传输期间每个分组的阻塞时间可以最小化到仅一帧，即，与经典的非抢占固定优先级调度（FPS-NP）相同[8]。

基于以上讨论，为了提供细粒度的调度并最小化由于排队问题引起的延迟，本工作中采用的调度在运行前对一个超周期中的每个分组的帧进行，调度决策编码到GCL中。一旦获得了调度，就可以根据调度将帧静态地分配给FIFO队列，同时可以将调度决策映射到GCL以控制所有队列的门以实现期望的执行顺序。为此，TSN上的调度可以成功地映射到传统的FPS-NP，其中每个分组严格按照其优先级进行调度，并且**在整个传输期间最多可以被阻塞一次**。

通过所描述的调度方法，我们避免了分组排队问题，并且可以在Qbv交换机的上下文中实现所有分组的最小延迟。这对于控制系统至关重要，因为所产生的控制性能可能会受到控制分组的传输延迟的影响。第5节中给出的实验结果为这一主张提供了证据，并证明了分组传输延迟对系统可调度性和控制性能的影响。据我们所知，这是针对控制系统的最早工作之一==在控制系统中，时间和性能对某些关键（即控制和非控制）分组的传输延迟敏感。对于非控制分组，满足其定时要求对于保证系统正确性至关重要，而最小化时间触发控制分组的传输延迟对于控制性能至关重要==。

对于不具有时间要求的未调度分组流，可以使用具有时间感知整形器[16，17]和队列划分的关键流量剩余的剩余带宽来调度流量。上述工作已经很好地描述了支持此类流，本文将不再赘述。针对此类系统，提出了一种完整的调度解决方案，该方案在TSN Qbv交换机的上下文中最小化所有分组的传输延迟。最后但并非最不重要的是，与[5]不同，我们的方法没有对传入分组的隔离和GCL的构造进行假设，例如，隔离特定分组类型的特定队列，以提供在控制系统中使用TSN的更一般的方法。

## 3.2延迟队列

如3.1节所述，对于到达时间不同的分组，需要一种机制来延迟较早到达的低优先级分组的排队，以保证最小的阻塞。为了实现这一点，在QBV交换机中引入了==具有优先级排序的延迟队列==，该QBV交换机被集成到数据包过滤单元(见图1)中，用于临时保存较早到达的数据包，直到它们可以以正确的顺序添加到调度队列中。

假设在系统开始时对所有分组同时释放，离线FPS-NP调度可以为在一个超周期中释放的所有分组实例产生计划良好的传输顺序，其中严格基于优先级来调度每个分组(一组连续帧)。对于该调度，每个分组的阻塞被最小化，因为在最坏的情况下，**具有最高优先级的就绪分组可以在低优先级分组的当前发送帧已经完成之后开始发送。**在运行期间，<u>该离线调度顺序被编码到优先级过滤单元中</u>，该优先过滤单元提供传入分组的预期顺序的参考。

对于每个传入的分组，优先级过滤器检查该分组是否按预期顺序到达，即，其具有更高优先级的所有先前分组是否已到达。如果是，则该分组立即被调度到调度队列，GCL将在调度队列中选择该分组进行传输。否则(即，某些先前的高优先级分组还没有到达)，该分组被优先级过滤器保持，直到(A)丢失的分组到达或者(B)调度的队列为空，并且该分组在所有延迟的分组中具有最高优先级。

> 确定最高优先级之前的分组是否到达，如果没有则等待（过滤器），直到当前分组为最高优先级

注意，条件(B)可能导致与预期的传输顺序不同的传输顺序，因为某些分组可以在较晚到达的较高优先级分组之前被传输。但是，这不会带来额外的延迟，并且有助于提高吞吐量。使用延迟排队，有可能所有调度的队列都是空的，而一些分组被存储在优先级过滤器中。在这种情况下，优先级过滤器选择队列头部的分组(即具有最高优先级的分组)，并将其帧逐个发送到调度队列中进行直接传输，直到更高优先级的分组到达。这保证**只要存在等待的分组**(在优先级过滤器或调度的队列中)，**传输就不会停止**。此外，对于延迟到达的高优先级分组，其阻塞仍然至多为$C_i^j$，其中它可以在当前正在发送的帧之后直接发送。

> 当可调度队列为空，将等待任务（过滤器中的）优先级最高的传输

### 3.3最坏情况响应时间分析

通过将TSN中的调度映射到传统的FPS-NP，可以获得在单个QBV交换机中传输分组的**最坏情况响应时间，该时间段限定了从分组进入交换机到分组被发送的持续时间**。由于控制和非控制分组的截止期约束不同(即分别是隐式和任意截止期)，因此对每种分组类型应用不同的分析技术。然而，由于控制和非控制分组都严格由FPS-NP调度，用于分析这两种类型的分组的基本原理与[8]中的类似，但进行了修改和改进，以反映QBV交换机的独特特征并支持在帧级别的分析。

对于控制和非控制分组，分组Ti的响应时间公式在以下公式中给出：

$R_i=\max _{\forall \lambda_i^j \in \Lambda_i} \begin{cases}R_i^j(0), & \text { if } \tau_i \in \Gamma_c \\ \max _{n=0 \ldots\left\lceil\frac{t_i+J_i}{T_i}\right]_{-1}}\left(R_i^j(n)\right), & \text { if } \tau_i \in \Gamma_{n c}\end{cases}$         （1）

在公式(1)中，$R_i^j(n)$表示在$t_i$忙周期$\tau_i$中传输帧$ \lambda_i^j$的第n个实例的响应时间，$J_i$表示**排队时间**，**即从$\tau_i$的第一帧到达Qbv交换机到最后一帧排队的时间窗口**。==$\left\lceil\frac{t_i+J_i}{T_i}\right \rceil$给出了非控制分组在其忙期内可以被发送的总次数[8]。==

> 在时间敏感网络（Time-Sensitive Networking，TSN）中，busy period是指在某个周期内**所有发送者和接收者都处于忙碌状态的最长时间段**。在这段时间内，所有数据帧都必须被发送或接收完成。**如果一个数据帧在busy period结束之前没有被发送或接收完成，那么它就会被视为发送或接收失败。**
>
> busy period是TSN网络中一个非常重要的概念，因为它是保证网络实时性的关键因素之一。**如果busy period太短，那么发送者和接收者可能无法在规定时间内完成数据的传输，从而导致数据丢失或延迟。如果busy period太长，那么网络的资源利用率会下降，从而降低了网络的吞吐量。**
>
> 为了确保网络的实时性，TSN网络需要通过调整周期长度、带宽分配、流量控制等方式来控制busy period的长度。网络设计者需要根据实际情况进行参数的优化，以满足实时性和吞吐量的要求。

控制分组的分析相对简单，因为在任何给定时间，系统中只能存在控制分组的一个实例，即隐含的最后期限。因此，**控制分组的最坏情况的响应时间可以通过计算其所有帧的最大响应时间**来安全地限定。然而，对于非控制分组，由于任意的截止日期，其每个帧的多个实例可以共存。因此，**帧(具有任意期限)的响应时间必须通过计算其所有实例在忙周期ti内的最大响应时间来获得**。

> 非控制=偶发性任务？

类似于[8]，非控制分组的忙碌周期由公式(2)计算，其中，$B_i$给出由于传输低优先级帧而$\tau_i$可能经历的最坏情况的阻塞，而$$hep(I)$$指的是具有等于或高于PI的优先级的分组的所有索引，包括i。**递归计算可以从$t_i=B_i+C_i$开始，并且保证收敛**[8]，假设hep(I)中分组的总利用率小于1，即$\sum_{\forall k \in h e p(i)}(C_i/T_j)\le 1$。我们随后在方程式(5)中分解了$B_i$。

$t_i=B_i+\sum_{\forall k \in h e p(i)}\left\lceil\frac{t_i+J_k}{T_k}\right\rceil C_k$                (2)

帧的响应时间有界于方程(3)，在J中。其中$J_i^j$表示将帧$ \lambda_i^j$入队的时间，$W_i^j$给出了在选择发送帧$ \lambda_i^j$之前在FIFO队列中可能引起的**最大排队延迟**，$C_i^j$表示它的传输时间。将$ \lambda_i^j$排队到FIFO队列的时间还包含$ \tau_i$在一次传输中在$ \lambda_i^j$之前的帧入队时间。此外，**对于非控制帧，减去n·Ti，因为这是相对于忙周期开始的第n个实例的到达时间。请注意，对于控制帧，n始终为0。**

![image-20230402102115897](https://cdn.jsdelivr.net/gh/wsm6636/pic/202304021021011.png)

> 最大阻塞时间=最大排队延迟，入队时间=到达时间？
>
> 响应时间=到达时间之和+最大阻塞时间+传输时间-相对于忙周期开始的第n个实例的到达时间

公式(4)给出帧$ \lambda_i^j$的排队延迟$W_i^j$，其中hp(I)返回一组具有严格高于PI的优先级的分组。该等式也适用于控制帧或非控制帧，对于所有控制帧，n=0。图2提供了说明分组Ti中的第二帧的第三(n=2)个实例(即，j=2)的最坏情况延迟的示例。如图所示，在最坏的情况下，帧(红色)必须等待五种其他类型的帧才能开始传输，这些帧映射到四种类型的延迟，如下所示。在最坏的情况下，当在FIFO队列中等待时，帧可能引起四个延迟源：(I)由当前正在发送的低优先级帧引起的阻塞，即$B_i$；(Ii)$ \lambda_i^j$可能存在多个实例之前的$\tau_i$帧的延迟；(Iii)$ \lambda_i^j$先前实例的延迟以及在帧$ \lambda_i^j$之前发送的每个Ti的实例中的$ \lambda_i^j$之后的帧；以及(Iv)来自具有比PI更高优先级的每个分组的帧的干扰。请注意，(Iii)解释了由$ \lambda_i^j$本身的先前实例和在先前实例中$ \lambda_i^j$之后的帧所引起的延迟。这些延迟分别被方程捕获。

![image-20230304214738425](https://cdn.jsdelivr.net/gh/wsm6636/pic/202303042147509.png)

图2 帧的最坏情况延迟，这是由低优先级帧(灰色)、高优先级分组(橙色)、$ \lambda_i^j$(蓝色)之前的Ti帧实例、$ \lambda_i^j$(绿色)的先前实例以及$ \lambda_i^j$(黄色)之后的Ti帧的先前实例引起的。

> 发送顺序包1.2.3（n），每个包按发送蓝绿黄三个帧
>
> 灰色：之前的低优先级作业
>
> 橙色：高优先级作业
>
> 蓝色：按帧的顺序，自己前一个需要发送的帧
>
> 绿色：自己的，之前的包中和自己一样的没发送的帧
>
> 黄色：按帧的顺序排在自己后面，但之前的数据包中对应的没发送的帧

$\begin{aligned} W_i^j(n)= & B_i+(n+1) \cdot \sum_{q \in[1, j-1]} C_i^q+n \cdot \sum_{q \in\left[j,\left|\Lambda_i\right|\right]} C_i^q \\ & +\sum_{\forall \lambda_k^q \in \Lambda_k, \forall k \in h p(i)}\left\lceil\frac{W_i^j(n)+J_k^q}{T_k}\right] C_k^q\end{aligned}$            （4）

最后，由公式(5)给出Bi，其中Lp(I)返回优先级低于Pi的分组。Ti(及其任何帧)可以引起的最大阻塞时间是所有较低优先级分组的帧中最长的传输时间。

$B_i=\max _{\forall \lambda_k^q \in \Lambda_k, \forall k \in l p(i)}\left(C_k^q\right)$                     （5）

公式(1-5)总结了用于时间关键型控制系统的QBV交换机中限制分组的最坏情况传输等待时间(即，响应时间)的响应时间分析。该分析同时考虑了不同分组类型的隐式和任意截止时间，并且是细粒度的，它提供了每一帧的最坏情况下的传输延迟。可以说，凭直觉，将每个帧视为独立任务的微不足道的修改可以应用于现有的数据包级分析(例如，[9]中的分析)，以支持帧级别的分析。然而，**仍然需要额外的技术来保证属于相同分组和实例的帧之间的正确传输顺序**，以便可以获得每个单独帧的传输时间。这是在我们通过公式(4)进行的分析中实现的，该公式仔细检查了不同类型的帧(包括τ中的帧)的传输顺序，并提供了与数据包级分析相比更严格的上限。

所提出的**单交换机分析和调度技术可以扩展到支持具有多个交换机和端节点的网络拓扑级**。对于所提出的方法，它可以在每台交换机上实现。对于给定的交换机，建议的调度采用将通过此交换机的所有数据包，然后生成静态调度。此外，延迟队列应用于每台交换机，以处理低优先级数据包比预期更早到达的情况。为了计算通过**多个交换机的分组Ti的端到端最坏情况传输时间**，应该给出每个交换机的输入分组，并且通过以上分析，可以通过将其==在每个交换机中引起的最坏情况延迟相加来有效地确定每个交换机中的最坏情况延迟的上限==。

然而，在只有一个交换机的情况下，通过考虑在系统开始时同步释放的所有输入分组，可以限制分组的最坏情况延迟。然而，这一假设在多个交换机的情况下可能不成立，在这种情况下，分组在给定交换机上的实际到达时间取决于它在先前交换机上引起的延迟。因此，上述分析方法将包含一定程度的悲观情绪，因为根据它们的到达时间，并不是交换机中的所有输入分组都会导致延迟。此外，作为一种离线调度技术，当交换机和节点的数量增加时，所提出的调度会引起可扩展性问题。这些都被确定为可取的研究方向，将在未来的工作中加以解决。

## 4控制器综合与周期分配

对于安全关键的自动驾驶系统，例如自动驾驶汽车，控制功能至关重要，应该始终是主要关注的问题。==除了保证控制包定时的调度和分析外，还需要一个设计良好的控制器，以满足控制性能要求，甚至**在网络的可调度性约束下最大化控制性能**。==

大多数以建立时间为目标的实时控制器(将在本节后面正式定义)可以以不同的频率运行[l，6，7]。==在TSN上下文中，该速率受(I)最大传输容量；(Ii)最低控制性能要求的限制。因此，存在一个优化的运行点，它将产生可接受的网络可调度性和最大化的控制性能==。

### 4.1控制模型

对于线性时不变(LTI)控制对象，其系统动态可用下列微分方程描述：

![image-20230304214802404](https://cdn.jsdelivr.net/gh/wsm6636/pic/202303042148494.png)

其中A、B和H是表示系统物理属性的系统矩阵；x(T)是系统状态；y(T)是系统输出和u(T)是控制输入。假设采样时间为t5，且传感器到执行器的延迟在一个采样周期内，则在离散时刻k处，系统动力学演化为以下方程：

![image-20230304214812648](https://cdn.jsdelivr.net/gh/wsm6636/pic/202303042148727.png)

其中u(-1)=0分叉=0和

![image-20230304214820584](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307211355241.png)

为了进一步简化方程，将增广变量z定义为：z(K)=[x(K)u(k-1)f，并用公式(7)中的z(K)替换x(K)，u(K)：

![image-20230304214829389](https://cdn.jsdelivr.net/gh/wsm6636/pic/202303042148462.png)

假设使用全状态反馈控制器，则控制输入u(K)的计算公式如下：

![image-20230304214840586](https://cdn.jsdelivr.net/gh/wsm6636/pic/202303042148665.png)

> 将系统的状态向量 z(k) 转化为控制输入 u(k)，使得系统的输出 y(k) 能够达到参考信号 r(k)
>
> 控制器通过对系统的状态变量进行测量和计算，以及对参考信号进行预测和补偿，来实现对系统的控制。在控制设计中，需要通过选择合适的反馈矩阵 k 和前馈矩阵 F，来实现对系统的稳定性、响应速度和鲁棒性等要求的优化

其中，K是反馈增益，f是前馈增益，r(K)是基准。通过组合公式(9)和(10)，系统方程因此变为：

![image-20230304214848029](https://cdn.jsdelivr.net/gh/wsm6636/pic/202303042148106.png)

为了满足控制稳定性，闭环系统动态矩阵的所有特征值，即方程(11)中的AC1，都必须在单位圆内。如公式(8)所示，**Aa和Ba的精确值取决于采样周期ts，采样周期ts等于控制分组的周期Ti**。这一控制模型将在本文的其余部分中使用。

### 4.2问题定义

我们使用**稳定时间($t_s$)作为质量控制(QoC)的指标，这是控制工程中广泛使用的强制性设计要求**[4]。建立时间被定义为**从控制系统受到干扰到进入稳态**，即==电流输出已经达到并保持在目标输出偏差5%以内的持续时间==。对建立时间有一个上限要求，例如，控制系统的建立时间不应超过0.5秒。

对于==(I)保证控制器本身的性能；以及(Ii)确保为非控制相关的分组提供足够的剩余时隙，==以便它们也能满足其最后期限，**找到最优周期是至关重要的**。基于上述目标和约束，周期分配问题可以作为一个优化问题来求解，其公式如下：

![image-20230304214859943](https://cdn.jsdelivr.net/gh/wsm6636/pic/202303042149051.png)

其中Wj (0，1]是相应控制任务的权重(即相对重要性)，Wj的和为1；tsj* [O，1]是第j个控制器的归一化建立时间；D表示能够确保控制稳定的所有极点的解空间；tsj是第j个控制器的建立时间，tsj+是允许的最大建立时间；Uj(K)在离散实例k输入，以Umax为最大输入阈值；最后一个约束定义了可行周期的时间粒度。**为了受益于调和周期并减小GCL表的大小，**每个Ti必须是tgcd的整数倍，tgcd是所有分组周期的最大公约数。这是符合惯例的。

### <strong style="color:#42B983;"> 4.3解决网络和控制的联合设计问题</strong>

在典型的控制应用中，尽管非控制相关分组的周期是不灵活的，但**控制相关分组通常具有可调整的周期**。这种额外的灵活性允许对控制器周期进行微调，以实现最佳的整体性能(如公式(12)所定义)。为了解决所定义的问题，必须确定控制器的周期及其在该周期下的相应参数。这两个步骤是相互依赖的，但可以分解为两个子问题，即优化过程需要**(I)找到满足可调度性约束的可行周期；(Ii)找到满足控制稳定性和最小性能要求的可行周期下的控制器参数，并尽可能地使控制性能最大化。**

对于第一个问题，由于存在调和周期，并且控制任务的数量往往很少，因此搜索空间是可管理的，因此可以通过穷举搜索来解决。对于规模较大的问题，可以使用启发式方法来寻找可行的周期配置。

对于第二个问题，由于输入约束下最小稳定时间的极点配置是一个非凸、非线性问题，很难搜索到解空间。我们使用粒子群优化算法(PSO)在给定控制性能和输入饱和度的约束条件下，在一定的采样周期内寻找最优控制器参数(通过极点配置[4])，以最小化调整时间。PSO是一种基于种群的优化方法，用于迭代改进给定的非线性非凸目标函数和质量度量的候选解[15]。

算法1给出了优化过程，首先在第4行建立解空间，然后测试可调度性(第6行)以获得潜在的周期配置，并在每个周期配置下通过==PSO==(第8行)找到每个控制任务的最优极点。为了加速这一过程，可以提前获得可行周期范围内的最优极点。在最小控制性能和输入约束都满足的情况下，识别的配置被附加到可行解中(第10-13行)。最后，从所有可行方案(第16-20行)中选出最小为3的最佳候选方案。如果*=0，则找不到可行解，在这种情况下，算法找不到满足所有约束的解

> PSO是指“粒子群优化”（Particle Swarm Optimization）的缩写，是一种基于群体智能的优化算法。PSO算法模拟了自然界中鸟群、鱼群等生物群体的行为，通过不断地调整每个个体的状态和位置，最终找到全局最优解。
>
> 在PSO算法中，将问题看作是一个n维空间中的搜索问题，将每个个体看作是一个“粒子”，每个粒子都有自己的状态和位置，并且可以通过学习和协作来不断调整自己的状态和位置，以达到全局最优解。
>
> 在PSO算法的迭代过程中，每个粒子会记录自己的最佳位置和最佳适应度值，同时还会记忆整个群体中的最佳位置和最佳适应度值。通过不断地更新粒子的速度和位置，PSO算法可以快速地搜索到全局最优解，同时具有较强的鲁棒性和收敛性。
>
> PSO算法具有计算复杂度低、易于实现、全局搜索能力强等优点，广泛应用于优化问题的解决中，例如在工程、经济、金融等领域的决策和优化问题中。

![image-20230304214927700](https://cdn.jsdelivr.net/gh/wsm6636/pic/202303042149826.png)

## 5评估

为了对所提出的协同设计方法进行评估，在MatLab(R2019b)上进行了实验，并在台式PC上运行。实验脚本和数据可以公开访问6·为了证明该方法的可行性，我们使用UUnifast[10]对我们的方法进行了评估。网络传输速度为100 Mbps。

周期的最大公约数Tgcd为100MTU s，所有控制分组的传输时间Ci为120MTU s(可以容纳在一个μ中)。将入队时间Ji设置为Ci/100。当Di=h时，控制分组具有隐式截止期，而对于非控制分组，截止期在[0.5，1]中随机分配，乘以其周期。非控制分组的传输速率范围从0.5ms到200ms，即5-2000赫兹。为了控制GCL表的大小，我们将非控制分组的周期限制在预定义的一组谐波周期(以毫秒为单位)内：{0.5，1，2，5，10，20，50,100,200}。受控系统由多个直流电机组成，这些电机通常用于自主和机器人系统，如运动控制、机械手和关节。采用时间域状态空间模型将直流电机的动态特性建模为二阶被控对象。在我们的设置中，我们有三个电机系统需要控制，它们的参数略有不同，如表1所示。控制器采用极点配置设计，系统完全可观测和可控。

### 5.1网络调度性能评估

表2给出了用该方法调度的数据包集的具体例子。数据包按照它们的截止日期排序，计算的延迟在最后一列。可以看出，分组集可调度为Vi：Ri小于等于Di。为了进一步评估调度模型的有效性，将所提出的调度方法(P-DM)与队列级调度进行了比较。具体而言，我们考虑以下两项政策：

表2给出了用该方法调度的数据包集的具体例子。数据包按照它们的截止日期排序，计算的延迟在最后一列。可以看出，分组集可调度为Vi：Ri：，；Di。为了进一步评估调度模型的有效性，将所提出的调度方法(P-DM)与队列级调度进行了比较。具体地说，我们考虑以下两个策略：截止日期和计算的延迟在最后一列。可以看出，分组集可调度为Vi：Ri：，；Di。为了进一步评估调度模型的有效性，将所提出的调度方法(P-DM)与队列级调度进行了比较。具体来说，我们考虑了以下两种策略：

Q-RND：每个队列都有自己的优先级。分组优先级随机分配，即每个分组被分配到一个随机队列；·

q-DM：每个队列都有自己的优先级。每个分组根据其截止日期(截止日期单调)被分配到一个队列；

对于每个策略，我们有三种网络方案：(I)L-网络轻负载，总使用率LU=0.5；(Ii)M-网络中等负载(LU=0.7)；以及(Iii)H-网络重负载(LU=0.9)。在每个场景下，我们还有两个总数的包：10和20。

对于每种情况，我们根据本节开头介绍的属性独立生成10,000组数据包。为了量化可调度性，我们使用**可调度比率，其定义为可调度数据包数除以数据包总数**：

使用随机生成的分组集，可调度分组的结果如表3所示。从结果可以看出，随机优先级策略Q-RND几乎找不到任何解，除了在L-10中找到了几个调度。与Q-DM相比，在网络负载较轻的情况下，两种方法具有相当的性能。对于中等和大负荷的情况，P-DM明显更好。比较H-10和H-20的P-DM，可以观察到后者产生了更高的可调度性。由于总利用率受到限制，这可能是因为在我们的方法中，(UMIH-20)中较高优先级分组的较短干扰持续时间优先于较长的情况。

### 5.2控制性能最大化

对于控制系统来说，具有非控制计时关键业务的情况很常见，这些业务与控制分组一起传递相当数量的数据。在这个评估中，我们考虑了一个现实场景，其中**非控制分组是预先定义的**，并且具有灵活传输速率的控制分组需要在稍后阶段被适应到调度中。该调度不应违反非控制业务的可调度性，同时实现尽可能高的控制性能

具体地说，我们研究了网络负载较重的情况，其中非控制分组的总利用率从0.70到0.95。对于每次利用，产生2,000个随机生成的非控制分组集合。非控制分组的数量固定为10。所有控制器的输入约束为UMAX=24。其他参数遵循开头介绍的配置。

结果如图3和图4所示。对于这两个图，x轴是非控制业务的总利用率，即LUNC·图3表示同时满足可调度性和控制要求的可行解决方案的百分比。从图中可以看出，随着网络负载的增加，可行解的百分比呈二次曲线下降，但仍处于可接受的水平。例如，当UNC=0.9时，可行百分比在60%以上。即使在UNC为0.95的极端情况下，该方法仍能找到25%以上的可行解。图4显示了所有可行解决方案的最小/平均/最大成本。在图中，最小/平均/最大开销都随着网络负载的增加而增加。然而，平均控制费用和最小控制费用的增长速度远低于最大值，这表明该方法是有效的，因为该方法仍然能够找到相对较好的控制器周期和极点。

## 6结论

时间敏感网络为增强实时通信提供了一种潜在的解决方案，它同时满足了实时和高带宽的要求。然而，TSN的机制需要精心设计才能使其充分受益。本文提出了一种基于IEEE 802.1 QBV时敏网络的集成网络与控制协同设计方法。这项工作可用于通信中的时序决定论在安全保证和验证过程中起主要作用的汽车和自主系统。具体地，我们引入了一种基于非抢占式固定优先级调度的网络调度模型(FPS-NP)，并将该调度映射到TSN门控列表中。利用非抢占式响应时间分析方法讨论了网络的可调度性，并考虑了多帧和无约束的截止期。提出了一种优化方法，能够在网络可调度性约束下，找到具有最大总体控制质量的可行解。我们通过大量的实验证明了我们的方法。进一步改进该方法的工作包括：**(I)探索可靠性，例如，使用有向无环图(DAG)对具有依赖关系的流进行调度；(Ii)将调度模型和分析扩展到具有大量交换机和端节点的网络拓扑级。**



***

# 笔记

## 1 论文创新在于

## 2 解决了什么问题

## 3 方法

## 4 不足&可继续研究

## 5 可参考

## 6 思考

Referred in <a href="zotero://note/u/HWG3PU5P/?ignore=1&#x26;line=-1" rel="noopener noreferrer nofollow" zhref="zotero://note/u/HWG3PU5P/?ignore=1&#x26;line=-1" ztype="znotelink" class="internal-link">cause-effect chain</a>
