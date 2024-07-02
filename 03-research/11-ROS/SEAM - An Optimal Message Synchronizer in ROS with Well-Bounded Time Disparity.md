---
created: 2024-05-03T12:48
updated: 2024-05-28T22:42
tags:
  - 笔记
  - 笔记/文献笔记
status:
  - done
---

# SEAM - An Optimal Message Synchronizer in ROS with Well-Bounded Time Disparity

**TitleTranslation:**  SEAM：ROS 中具有有界时间差的最佳消息同步器
**Journal or Conference:**   2023 IEEE Real-Time Systems Symposium (RTSS)  
**Authors:**  JinghaoSun, TianyiWang, YangLi, NanGuan, ZhishanGuo, GuozhenTan
**Pub.date:**  2023-12
**DOI:**  10.1109/RTSS59052.2023.00024
**tags:** 
**zoterolink:**  [zotero](zotero://select/library/items/MIYTDDHY)

# 摘要

自主机器通常受到实时限制。 ROS 2是一种广泛使用的机器人框架，将实时能力视为关键因素，并不断发展以应对这些挑战，例如端到端时序保证和实时数据融合等。本文研究了ROS消息同步器，这是多传感器数据融合的一个组成部分，并为ROS 2未来版本中同步器的演进提供了潜在的方向。为了有效的数据融合，来自不同传感器的输入数据必须在对齐的时间点进行采样在特定范围内。本文提出了一种新颖的消息同步策略来满足这一要求，称为 SEAM，一旦最早到达的消息落入指定范围内，它就会对其进行同步。与传统的 ROS 同步器不同，SEAM 不依赖预测信息进行复杂的优化。相反，它使用来自已到达消息的信息来构建可行的同步方案。我们通过证明 SEAM 总能找到可行的方案（如果确实存在）来证明 SEAM 的最优性。我们将 SEAM 集成到 ROS 2 中，并进行实验来评估其与传统 ROS 同步器相比的有效性。




# 1引言

自主机器的时代即将到来。从移动机器人和自动驾驶汽车到送货无人机，自主机器在我们的日常生活中变得越来越普遍，并有可能彻底改变我们的生活、工作和与世界互动的方式[1]。机器人操作系统 (ROS) [2] 是最流行的开源机器人框架，提供了一组库和工具来解决构建自主系统中的许多普遍问题。


为了提取一些共同特征，自主机器由许多相互作用的组件和传感器组成，它们可以感知周围环境并具有相应的决策和反应的智能。由于许多自主机器对安全至关重要，因此它们必须遵守时间限制，以确保机器及其环境的正确功能和安全。一般来说，自主机器的时序约束可以分为以下两个方面：

**端到端的时序保证。**
与其他计算系统不同，自主机器具有非常深的处理管道，不同组件之间以及各种本地和端到端时间限制之间具有很强的依赖性。图1显示了自动驾驶系统（ADS）的处理图的示例。从左侧开始，系统消耗来自毫米波雷达、LiDAR、摄像头和 GNSS/IMU 的原始传感数据。处理组件使用最新的输入数据执行计算并向下游组件产生输出。具有高实时性能的自主机器必须快速响应周围环境的变化。这意味着他们必须在有限的端到端时间范围内处理传感数据并做出决策，因为即使是微小的延迟也会对运营有效性甚至安全性产生重大影响。


**消息同步的时间差异**。
自主机器高度依赖融合多传感器数据来精确感知周围环境并做出智能决策。数据融合的主要难点是自主机器中的传感器以不同的频率采样数据并输出消息（如图1所示），并且融合算法可能会接收到具有不同采样的消息（从多个传感器发送的）时间（也称为时间戳）。我们将消息时间戳之间的差异称为时间差异（参见第三节中的正式定义）。用于融合的消息（来自不同的传感器，例如相机和激光雷达，如图 1 所示）的巨大时间差异可能会构建不准确的周围环境视图并扰乱未来的决策。
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202405031103614.png)


为了解决上述自主机器复杂的计时问题，ROS经过全面重构，演变成ROS 2。一方面，ROS 2将端到端的计时能力作为关键考虑因素，它利用了数据分发服务（Data Distribution Service）（ DDS）作为进程间通信中间件，以促进高效的实时数据交换。它还在实时操作系统之上集成了一个额外的调度程序抽象，称为“执行器”，为处理相互依赖的组件功能奠定了良好的基础，从而可以提供端到端的时序保证。另一方面，ROS采用消息同步器来减少数据输入到融合组件的时序差异，这一概念被ROS 2直接继承。与建立在远离 ROS 1 的改进基础上的其他 ROS 2 概念（例如执行器）不同，消息同步器组件从 ROS 1 C++ 版本“Diamondback”[4] 到当前的 ROS 2 C++ 版本“保持不变”谦虚”[5]。确实，ROS 2还有改进的空间。本文旨在探索和确定 ROS 2 中消息同步策略演变的潜在方向，这些策略能够更好地支持自主机器中多传感器的数据融合。

<span style="color:black;background:#fff88f !important;">数据融合算法通常要求要融合的消息之间的时间差在一定范围内。然而，现有的ROS消息同步器过分强调最小化时间差异，忽略了融合算法的基本要求，即消息的时间差异只需位于指定范围内</span>，这就是本文的动机。更具体地，ROS消息同步器具有如下两种同步策略。

<span style="color:black;background:#40a9ff !important;">ExactTime 策略选择具有完全相同时间戳的消息来创建输出消息，并丢弃那些找不到精确匹配的消息</span>。在ExactTime 策略下，任何输出消息的时间差几乎都是 0。尽管如此，ExactTime 策略在实践中很少使用，因为要求<span style="color:black;background:#40a9ff !important;">来自不同传感器的数据具有相同的时间戳过于严格</span>。

<span style="color:black;background:#40a9ff !important;">ApproximateTime 策略有助于将消息与不同的时间戳同步，并预测传入消息的到达时间，以识别那些具有最小可能时间差异的消息。</span> ApproximateTime 策略的局限性之一是它严重依赖于传入消息的准确预测，因此，<span style="color:black;background:#40a9ff !important;">如果这些预测不够精确，其性能可能会显着恶化。</span>此外，ApproximateTime 策略是短视的，因为它只专注于最小化消息组在当前时间点的时间差异，可能忽略了可能超出范围的未来同步。因此，它不能总是确定可行的同步策略。

综上所述，<span style="color:black;background:#fff88f !important;">如何同步消息以保证它们的时间差异始终落在一定范围内仍然是ROS 2社区中的一个悬而未决的问题。</span>

在本文中，我们提出了一种新颖的消息同步器，它利用一个简单的策略：<span style="color:black;background:#ff4d4f !important;">一旦最早到达的消息落入特定范围，就对其进行同步。</span>因此，我们将其命名为 SEAM，这是由保单中单词的第一个字母组成的首字母缩写词。与 ApproximateTime 同步器相比，SEAM 同步器的优点是<span style="color:black;background:#ff4d4f !important;">无需预测传入消息，因为它仅根据已到达消息的时间戳来确定应同步哪些消息。</span>最重要的是，我们证明SEAM同步策略是最优的，即对于任何消息序列，如果存在一种同步方案可以对消息进行分组，使得每组中的消息的时间差异落在指定的范围内，SEAM同步器总是能够找到该方案。我们将SEAM同步器合并到ROS 2（Dashing版本）的消息过滤器包中，并进行实验来评估使用SEAM同步器与传统ROS同步器相比成功同步消息序列的比例。实验结果表明，SEAM同步器显着提高了成功率，且计算时间仅为传统ROS消息同步器的五分之一。

本文的其余部分安排如下。我们首先在第 2 节中概述了多传感器数据融合和 ROS 的消息同步器。 II，然后我们在Sec.中介绍消息同步的问题模型。三．我们在第 2 节中提出了 SEAM 同步策略。四．在秒。 V，我们在 ROS 2 中实现了 SEAM 策略。实验结果在第 2 节中报告。六．相关工作在第 2 节中给出。七．结束语在第 2 节中作出。八．

# 二. ROS 2 中消息同步器概述



![image.png|775](https://gcore.jsdelivr.net/gh/wsm6636/pic/202405031337365.png)

在 ROS 2 中，消息同步器从多个传感器接收数据，有选择地处理输入，并将所选消息转发到融合组件进行进一步处理，如图 2 所示。<span style="color:black;background:#40a9ff !important;">理想情况下，融合算法假设来自不同传感器的输入数据是同时采样的。</span>然而，由于固有的硬件特性（例如，不同的传感器可能具有不同的采样频率和时钟漂移）和软件相关的延迟（例如，由传感器数据的预处理和传输引起）[6]，这种假设在现实中很少成立。 已经提出了各种技术来补偿输入数据的时间不一致性[7]。然而，如果时间不一致超出其可容忍范围，则这种补偿可能无法在运行时提供预期的质量。这就激发了本文考虑的问题：<span style="color:black;background:#fff88f !important;">如何确保用于融合的消息的时间戳之间的差异在给定阈值范围内？</span>在本节中，我们将概述 ROS 2 中的标准消息同步器，并分析它们是否有效地限制了输入数据的时间不一致。在详细介绍之前，我们首先介绍一些有用的符号，如下所示。

**消息同步器的输入**。
消息同步器由多个输入通道组成，通道总数限制为 9 [8]。每个通道都有一个缓冲队列，用于临时存储该特定通道的传入消息（通常由同一传感器定期生成）。每条消息都包含一个时间戳，表示对消息封装的传感器数据进行采样的时间。由于消息在到达消息同步器之前可能会经历一些延迟，因此消息的时间戳通常与其到达时间不同。我们假设同一队列中的消息按照与其时间戳相同的顺序到达。 ROS 2 结合了一些机制来处理消息未按预期顺序传递的情况。更具体地说，ROS 2 针对此类情况发出警告（作为参考，请参阅“checkInterMessageBound()”函数，第 30 行）[9]。我们的方法可以很容易地扩展到处理某些消息没有按时间顺序到达的情况：当收到上述警告时，我们可以暂时缓冲乱序消息，以确保发送到同步器的所有消息按时间顺序排列。

**消息同步器的输出**。
<span style="color:black;background:#40a9ff !important;">消息同步器从每个队列中选择单个消息以形成输出消息集，然后将其转发到融合组件</span>。<span style="color:black;background:#40a9ff !important;">在ROS消息过滤器的默认同步策略中，一条消息不能被多次使用</span>。因此，在本文中，我们假设所选消息在用于形成输出消息集后必须从队列中删除。我们坚持这个假设是为了与 ROS 中的默认同步策略保持一致。消息集合的时间差异是指集合内消息之间时间戳的最大差异。本文要解决的问题是设计一个消息同步器，使其每个输出消息集都具有有界的时间差异。

正如第 1 节中提到的。 ExactTime 和 ApproximateTime 是两种主要的 ROS 消息同步策略。
ExactTime策略很简单：只有具有相同时间戳的消息（来自不同输入通道的消息）才能被聚集到输出消息集中（如图3所示），否则，不完全匹配的消息将被丢弃。显然，在 ExactTime 策略下生成的每个输出消息集的时间差异等于 0。然而，要求来自不同传感器的数据具有相同的时间戳过于严格，因为实现传感器之间的时钟奇偶校验是一个具有挑战性且成本高昂的问题。因此，ExactTime策略在实际中很少使用。

ApproximateTime 策略允许具有不同时间戳的消息同步，并始终尝试以尽可能最小的时间差异构造输出消息集。
ApproximateTime策略的主要特点是利用来自传入消息的预测信息，即每个通道的队列不仅存储已经到达的消息，还在<span style="color:black;background:#40a9ff !important;">队列末尾存储人工预测的消息。这里预测的消息充当消息选择过程的补充信息，但除非它实际到达，否则不会被包含在输出消息集中</span>。 ApproximateTime 策略的具体内容概述如下。
**初始化**。假设同步从时间0开始，则最初将时间戳为0的预测消息放入每个队列中。
**迭代过程**。在每次迭代中，ApproximateTime 策略都会检查已到达的消息是否应与未来到达的消息组合在一起，以追求更小的时间差异。
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202405031523017.png)

图4展示了ApproximateTime策略下的消息同步过程。在t1时刻，消息同步器从各个通道接收到消息。这些到达的消息被组合成时间差为0的消息集，因为这些消息具有相同的时间戳。时间戳为 10 的消息在时间 t1 后全部从队列中删除。消息在时间 t2 进入第三通道。通过结合传入消息的预测信息（图 4 中标记为绿色）和已到达消息的数据（图 4 中标记为蓝色），ApproximateTime 策略决定等待未来的消息，以最小化消息的时间差异。输出消息集。当时间戳为 40 的消息到达时，ApproximateTime 策略将时间戳为 35 的消息与两条新到达的消息组合在一起形成输出消息集，同时，这些选定的消息都从其关联的队列中移除。

ApproximateTime 策略仍有改进的空间。首先，ApproximateTime 策略依赖于传入消息的预测信息。不断变化的环境可能会导致消息预测的不确定性，这可能会极大地降低其性能。其次，ApproximateTime策略的目标是最小化每次迭代时其输出消息集的时间差异，这是耗时的，最重要的是，专门追求当前迭代时输出消息集的最小时间差异可能会增加时间差异未来迭代中的输出消息集，可能导致其超出指定范围。下面的例子表明，ApproximateTime策略并不是最优的，即即使确实存在一个合适的同步策略（例如，每个输出消息集的时间差异都落在特定范围内），它也不能总是确定合适的同步策略。

![image.png|775](https://gcore.jsdelivr.net/gh/wsm6636/pic/202405031532984.png)
**示例1.** 我们考虑如图5所示的具有两个通道的消息同步器。它要求输出消息的时间差异必须落在长度为5的指定范围内。在时间t1，时间戳为14的消息进入第二通道。第一个通道中时间戳为10的已到达消息和时间戳为16的人工预测消息均被视为生成输出消息集的候选消息。为了最小化时间差异，ApproximateTime 策略决定在时间 t1 等待传入消息（时间戳为 16）。时间戳为 14 的消息（在第二个通道中）和时间戳为 16 的消息（在第一个通道中）在时间 t2 合并在一起，相关输出消息集的时间差为 16 − 14 = 2删除选中的消息（时间戳为14和16）后，时间戳为24的消息进入第一个通道，此时时间戳为18的已到达消息和时间戳为的人工预测消息。第二通道中的 31 个被考虑用于输出消息集生成。通过选择时间戳为18和24的消息来形成输出消息集来实现最小时间差异。

我们应该注意到，即使 ApproximateTime 策略尝试最小化每个输出消息集的时间差异，特定输出消息集的时间差异（例如 24 − 18 = 6）仍然可能超出所需的范围（长度5）。实际上，有一种消息同步方案可以成功生成时间差异落在指定范围内的输出消息集，如图5（b）所示。除时间戳为 24 的消息外，所有消息均用于生成输出消息集。三个输出消息集的时间差分别为4、2和3。

在给定的示例中，ApproximateTime 策略不是最佳消息同步策略，因为它无法一致地生成具有明确时间差异的输出消息集。然而，确实存在可以实现此目的的消息同步策略。三．问题模型主要原因是ApproximateTime策略过度最小化每个指定输出消息集的时间差，导致后续输出消息集的时间差超出期望范围。直观上，不追求每个输出消息集的最小时间差异可能更有利。相反，在用于形成当前输出消息集的消息之间留下一些“接缝”可能会减少后续输出消息集的时间差异。在本文中，我们将提出一种最优的消息同步策略，在接下来的部分中，我们首先介绍问题模型和一些有用的符号。

# 三．问题模型
在本节中，我们制定了本文要解决的问题模型。<span style="background:#d3f8b6">我们考虑一个消息同步器和 N 个传感器。消息同步器有N个输入通道，每个通道连接一个传感器。传感器定期采样数据，然后将数据封装到每条消息中，并通过连接的通道将消息发送到消息同步器。</span>

i 来表示第 i 个传感器生成的消息序列（对于每个 i = 1,...,N）。我们用 mik 表示第 i 个传感器生成的第 k 条消息，因此，消息序列 Mi 可以写为 Mi = (mi1, mi2, · · · )。对于Mi的每条消息mik，我们用t(mik)来表示它的时间戳（即mik中封装的数据的采样时间）。在本文的其余部分中，当上下文明确时，我们也使用 mi 来指代 Mi 的消息。

我们使用 M对于每个 i = 1, · · ·, N ，我们用 Qi 表示第 i 个通道的消息队列。 Mi的消息到达时存储在队列Qi中。对于Mi的每条消息mik，我们用aik来表示它的到达时间。正如第 2 节中提到的。 同一队列中时间戳较小的消息比时间戳较大的消息更早到达，即对于 Mi 的任意两条消息 mik 和 mil，如果 k <l，则 mik 早于 mil 到达（且 t(mik) < t(mil)）我们不仅可以向队列添加消息，还可以从队列中删除一些消息。在任何给定时间，消息队列 Qi 或者仅包含 Mi 中已到达但尚未从 Qi 中删除的消息的一部分，或者如果没有消息到达或所有到达的消息已被删除，则消息队列 Qi 为空集。

消息同步器的输出消息集S被定义为包含来自每个传感器的恰好一条消息的集合：S={m1,···mN}，其中mi是从第i个队列Qi（i=1···,N）中选择的消息。需要强调的是，<span style="color:black;background:#d3f8b6 !important;">一条消息只能使用一次；具体来说，当选择一条消息mi加入输出消息集S时，它必须从其关联的队列Qi中删除，并且不允许用于形成未来的输出消息集</span>
输出消息集S的时间差异表示为Δ(S)，它是S[10]中消息的最小和最大时间戳之间的最大差值，即
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202405061035656.png)
> 时间差

输出消息集合S的基础消息，记为ml，是S的所有消息中时间戳最大的消息，即
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202405061039238.png)
> 最大的消息

![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202405061041938.png)
例如，如图6所示，存在三个通道。通道 Q1 存储来自 M1 的消息 m11、m21 和 m31。通道Q2存储来自M2的消息m12、m22和m32。通道Q2存储来自M2的消息m12、m22和m32。类似地，通道Q3存储来自M3的消息m13。这些序列中的每条消息都根据其时间戳进行排序。如果我们选择m31、m32、m13组成输出消息集S=(m31,m32,m13)，则该消息集的时间差为24−22=2。该消息集的基础消息为m31。如果我们选择m21、m22、m13组成一个输出消息集S=(m21,m22,m13)，则该消息集的时间差为22−16=6。该消息集的基础消息为m13。

如果输出消息集S的时间差异小于或等于给定阈值C（用Δ(S)≤C表示），则称输出消息集S是有效的。在任何时候，消息同步器都不能生成无效的消息集。在下一节中，我们将开发一种新颖的消息同步器，确保对于任何给定的消息序列和特定阈值，如果存在能够一致输出有效消息集的同步方案，那么我们的同步器始终可以成功构造该方案。

# 四．SEAM算法

在本节中，我们提出了一种有效的消息同步算法。我们算法的主要思想是，仅当所选消息的时间戳差保持在指定阈值 C 内时，才选择用于构造输出消息集的消息。最重要的是，我们的算法始终同步最早到达的消息，即，它选择每个队列中最早到达时间的消息，同时确保仅选择时间戳差异在允许阈值内的消息。因此，我们将其命名为 SEAM，这是算法中关键字的第一个字母的缩写。 SEAM 算法的伪代码在 Alg 1 中描述。

![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202405061138123.png)
当有一些消息进入消息同步器时，SEAM 算法被调用，如第 1 行所示。我们首先将新到达的消息添加到相应的队列中，如第 2 行所示。然后我们检查每个队列是否至少包含一条消息。如果是这种情况（第 4 行），我们将启动消息同步过程。我们在第4行初始化消息集S，并选择（所有队列中）时间戳最大的到达消息作为基础消息，记为ml，如第5行所示。对于每个队列Qi，我们构造一个消息集Ω来存储距离基础消息ml不远的Qi的消息mik，<span style="color:black;background:#ffbbff !important;">即mik和ml之间的时间戳差值落在指定阈值内（第8至10行）</span>。如果 Qi 的所有消息都远离 ml，即 Ω = ∅，我们可以安全地从队列 Qi 中删除所有消息（第 11 和 12 行）。否则，我们在Ω的所有消息中选择<span style="color:black;background:#ffbbff !important;">时间戳最小的消息mi</span>，并将所选择的消息mi添加到消息集S中。<span style="color:black;background:#ffbbff !important;">mi之前的消息全部从队列Qi中删除</span>（第14至16行）。如果每个队列向消息集S贡献一条消息，我们将S视为输出消息集，并将其发送到融合组件（第17行和第18行）。在这种情况下，我们从相应的队列 Qi 中删除选择用于构造输出消息集 S 的消息 mi（第 19 行和第 20 行）。如果消息集合S不包含足够的消息，即|S| < N ，SEAM 算法保持不活动状态并等待新消息的到达。

图 7 中的示例说明了 SEAM 算法，其中 X 轴代表时间戳，指示传感器何时对消息进行采样。图中没有明确描述消息到达消息同步器的时间。在这种情况下，我们假设阈值C等于35，即每个输出消息集的时间差异需要以35为界。
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202405061152708.png)
原始队列如图7(a)所示。由于存在空队列（例如 Q3），SEAM 算法不会根据第 3 行输出任何消息集。在稍后的某个时刻，如图 7（b）所示，两条消息 m31 和 m13 被添加到队列中。分别是队列 Q1 和 Q3。调用SEAM算法来生成消息集。首先，选择所有到达消息中具有最新时间戳的消息m13作为基础消息，在图7(b)中标记为红色。然后，当所选消息与基础消息之间的时间戳差落在阈值35内时，选择来自其他队列的消息，例如图7(c)中标记为蓝色的m21和m12，以形成输出消息集S。输出消息集后，删除每个队列中被选择形成消息集的所有消息以及所选消息之前的消息，如图7(d)所示。
> 为什么不选Q1的m31，要选时间戳最小的mi
> 先选择时间戳最大的m13，将符合条件（时间差在区间内）的添加到消息集，从里面选每个队列里时间戳最小的mi，输出之后删掉输出的和之前的

随着执行过程的继续，多个消息到达队列，如图 7(e) 所示。当消息m13到达时，SEAM算法选择m13作为基础消息，并尝试将到达的消息形成有效的消息集。
然而，消息 m11 和 m12 不能与基础消息 m13 组合，因为它们之间的时间戳差超出了范围，即 t(m13) − t(m11) = 50 > 35 和 t(1m3) − t( 1m2) = 40 > 35。在这一轮中，SEAM算法不生成任何输出消息集，而且消息m11和m12被从其关联队列中删除，如图7(f)所示。当新消息到达时，SEAM 算法等待被调用，我们在图 7(f) 中不再进一步揭示这一点。
此外，对于示例1的情况，SEAM算法可以成功生成有效的输出消息集。如图5(b)所示，采用SEAM算法在时间t1、t2和t3生成输出消息集。在这些时间点，SEAM 算法分别生成时间差异为 4、2 和 3 的消息集。所有这些时间差异都在指定范围内（长度为 5）。<span style="color:black;background:#ff4d4f !important;">SEAM算法有两个主要好处，可以描述如下：</span>
**简单。** SEAM 算法很容易实现，特别是与复杂的 ApproximateTime 算法不同，我们的算法既不利用预测信息，也不尝试最小化输出消息集的时间差异。这简化了实现并在执行过程中节省了大量时间（之前用于计算最小时间差异）。
**最优性**。虽然SEAM算法避免了复杂的计算，但它确实是输出有界时间差消息集的最优同步算法，即对于任何消息序列，如果SEAM算法不能输出有效的消息集，其他算法也将无法生成有效的消息套。
## A. SEAM 算法的最优性
下面我们将分析SEAM算法的最优性。更正式地，消息同步问题的优化版本描述如下。

==给定消息序列 M1, · · ·, MN ，如果消息同步算法在任何时间间隔 [0, t] 内产生最大数量的有效消息集，则称该消息同步算法是最优的，∀t = 1, 2, · · · 。==

为了证明 SEAM 算法的最优性，我们只需要将 SEAM 算法和另一种同步算法 A 同时应用于相同的消息序列 M1,...,MN ，然后比较生成的有效输出消息集的数量这两种不同的算法。更具体地，<span style="color:black;background:#FFDBBB !important;">对于任何指定的时间间隔[0，t]，假设SEAM算法生成n个有效消息集，并且算法A生成m个有效消息集。如果 n ≥ m，则 SEAM 算法被认为是最佳的。</span>在详细介绍之前，我们首先提取 SEAM 算法的主要特征并介绍一些有用的符号，如下所示。

对于任意两个输出消息集S=(m1,···,mN)和S′=(m′1,···,m′N)，我们称S早于S′，记为S<S′，如果S 中的每条消息都是在比S′ 中相应消息更早的时间采样的，即 t(mi) < t(m′i)，对于每个 i = 1, · · · , N 。类似地，我们说 S 不晚于 S′，记为 t(S)≤  t(S′)，如果 t(mi) ≤ t(m′i)，对于每个 i = 1，··· , N 。

假设同步算法在时间间隔[0,t]内生成m个输出消息集，这些消息集的序列表示为(S1,····,Sm)。这里，我们根据输出消息集的基础消息的时间戳按升序排列输出消息集，即，Si 的基础消息的时间戳小于 Si+1 的基础消息的时间戳，对于每个 i = 1, · · · , m − 1.

**定义 1（常规输出）**。如果 Si < Si+1，对于每个 i = 1，···，m − 1，则输出消息集 (S1,····,Sm) 的序列是规则的。
假设规则序列(S1,····,Sm)是由同步算法A生成的，我们说算法A的输出是规则的。
> 按序输出

**引理1. SEAM 算法的输出是有规律的。**
证明。根据 Alg 的第 11、12 和 16 行。 1、在生成下一个消息集Si+1之前，必须将输出消息集Si中的消息从其对应的队列中移除。因此，选择形成Si+1的所有消息都具有比Si中的消息更大的时间戳，即Si<Si+1。

引理1显示SEAM算法自然地输出消息集的规则序列。下面，我们考虑输出不规则的同步算法A。令(S1,···,Sm)为算法A的非常规输出，我们开发了一种将其转换为常规输出的方法（参见算法2）。 Alg 的输入是不规则的消息集序列(S1，……，Sm)。对于每个 i = 1, · · · , m，第 i 条消息 Si 写作 (m1[i], · · · , mN [i])，其中 mk[i] 表示 Si 的第 k 条消息 (∀ k = 1,····,N)。<span style="color:black;background:#d3f8b6 !important;">不失一般性，对于任意两个整数 i 和 j（其中 i &lt j），我们假设第 i 个消息集 Si 不早于第 j 个消息集 Sj，即存在一个索引 k 使得mk[i] &gt  mk[j]。</span>在这种情况下，我们在两个集合 Si 和 Sj 之间交换第 k 个消息。更具体地说，<span style="color:black;background:#ffbbff !important;">我们将消息 mk[i] 从集合 Si 移动到集合 Sj，并将消息 mk[j] 从集合 Sj 移动到集合 Si，如第 5 行和第 6 行所示。</span>经过上述交换操作后，转换后的消息集Si 和 Sj 是有序的，即 Si<Sj。考虑到算法2以排序为主要结构，意味着所有消息集经过变换后都会有系统地排序，即S1<S2<····<Sm。
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202405061300118.png)
以下引理表明，转换后，有效消息集仍保持其有效性。
**引理 2. 尽管经过算法2的转换，消息集的有效性仍然存在。**
证明。我们考虑同步器生成的两个有效消息集 Si 和 Sj，Si 是在 Sj 之前生成的，即 i < j。不失一般性，我们假设Si和Sj的第k条消息需要交换，根据Alg2的第4行交换条件如下。
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202405061355342.png)
令Si'和Sj'为变换后的消息集合，其中Si'的第k条消息为mk[j]，Sj'的第k条消息为mk[i]。接下来，我们证明 Si' 和 Sj' 都是有效的，并且通过两步过程证明了有效性。

首先，我们证明消息集的基础消息在消息交换后保持不变。更具体地说，我们使用 ml[i] 和 mr[j] 分别表示 Si 和 Sj 的基本消息。我们将证明 Si' 和 Sj' 的基本消息分别是 ml[i] 和 mr[j]。由于消息集根据其基本消息的时间戳按升序排序，因此我们有
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202405061407473.png)
由于 t(mk[i]) ≤ t(ml[i]) （作为 Si 的基础消息 ml[i]），根据 (2)，我们有 t(mk[j]) ≤ t(ml[i]）。表明ml[i]是变换后Si'作为k任意选择的基础信息。此外，根据（3），由于 t(mk[i]) ≤ t(ml[i])，我们有 t(mk[i]) ≤ t(mr[j])，表明 mr[j] 是变换后的 Sj' 的基本消息。
> 3,为什么

其次，我们证明 Si' 和 Sj'的时间差异都受阈值 C 的限制。由于 Sj 有效，所以我们有 
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202405061443681.png)

由于 ml[i] 是 Si' 的基础消息，根据（3），我们有 t( ml[i]) − t(mk[j]) ≤ C。这表明基于 k 的任意选择，Si 的时间差不大于 C，即变换后的 Si' 是有效的。同理，我们可以证明Sj'的有效性。这样就完成了证明。

<span style="color:black;background:#d3f8b6 !important;">引理2表明Alg2的转化过程。 保留了原始消息集的基本属性。</span>以下引理表明 SEAM 算法总是尽早生成有效的消息集。

**引理3**.**对于任意给定时间点t，对于时间t之后采样的消息形成的任意两个有效消息集S和S'，如果S是时间t之后SEAM算法生成的第一个输出消息集，则S$\le$S' 。**

证明。更正式地，我们令 S = (m1, · · · , mN ) 且 S′ = (m′1, · · · , m’N )。 S和S'的基本消息分别表示为ml和m'r。通过证明对于每个 i = 1, · · · , N，t(mi) ≤ t(m′i) 就足以证明该引理。我们通过反证法证明这一点，即假设S和S'的第i条消息不遵循时间戳的升序，即
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202405061957692.png)
由于 S 和 S′ 有效，因此我们有
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202405061958266.png)
由于S是由Alg 1构造的。并根据 Alg1 的第 15 行。mi是Qi最早到达的消息，其与基础消息ml之间的时间戳差被限制在阈值C内。因此，根据(5)，对于早于mi到达的消息m′i，我们有
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202405062008947.png)
根据(6)和(8)，我们有
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202405062010467.png)
根据 Alg 1的第 4 行SEAM算法尽快构造基础消息，必须以m′r或早于m′r到达Qr的消息作为基础消息生成有效的输出消息集S*。根据(9)，S* 的基础消息早于S的基础消息到达，SEAM算法必须生成S* 且早于S。这与S是SEAM生成的第一个输出消息集的前提条件相矛盾时间t之后的算法。到现在为止，我们已经证明了对于每个 i = 1, · · · , N ，t(mi) ≤ t(m′i)，这意味着 S$\le$S′。
基于上述引理，我们可以证明SEAM算法的最优性，如下面的定理所示。

**定理1. SEAM 算法是最优的。**
证明。假设不是，我们用 A* 来表示最优算法。我们将 SEAM 算法和最优算法 A* 应用于给定的消息序列 M1,...,MN 。对于任意时间间隔[0,t]，SEAM算法输出m个有效消息集，记为(S1,···,Sm)，最优算法A* 输出n个有效消息集(S′1,···，S′n）。我们假设 m < n。根据引理1的说法SEAM算法的输出是有规律的，即S1<S2<····<Sm。不失一般性，我们假设算法A* 的输出也是正则形式，即S′1<S′2<···S′m。如果不是这种情况，我们总是可以使用 Alg2 将A* 的输出转换为正则形式。根据引理2的说法转换后的消息集全部有效。下面，我们通过归纳法证明，对于每个 i = 1,····,m 有 Si<Si′。

**基本情况**。由于S1是SEAM算法生成的第一个消息集，并且S1和S'1都是有效的并且是在时间0之后生成的，所以根据引理3我们有S1<S'1。
**归纳步骤**。假设Si$\le$Si'成立。现在我们需要证明 Si+1$\le$Si'+1 为真。由于 A* 的输出是（或转换为）正则形式，因此我们有 Si′$\le$Si′+1。此外，根据归纳假设，即 Si$\le$Si′，我们有 Si<Si′+1。因此，Si'+1就是Si生成后生成的消息集合。我们还知道Si+1是Si生成后SEAM算法生成的第一个消息集。根据引理3的说法我们有 Si+1$\le$Si'+1。

总之，我们建立了基本情况和归纳步骤，因此我们可以得出 Sm$\le$S′m 的结论。而且，由于S′m<S′m+1，所以我们有Sm<S′m+1，即在Sm生成之后至少存在一个有效消息集(例如S′m+1)。 SEAM算法至少可以选择S′m+1作为紧随Sm之后的输出消息集。这与 SEAM 算法在预定义的时间间隔内仅输出 m 个消息集的假设相矛盾。这样就完成了证明。

# 五. 将 SEAM 集成到 ROS 2 中
我们将SEAM同步器集成到ROS 2中的消息过滤器包中。消息过滤器包中有多种不同类型的过滤器，主要分为两类：<span style="color:black;background:#40a9ff !important;">一类是单输入/单输出过滤器，另一类是多输入/单输出过滤器。</span>单SEAM同步器的实现方式很简单，没有任何性能优化。在SEAM同步器中，我们使用容器Deque来实现与每个通道关联的队列。输入意味着过滤器只能接收来自一个传感器的消息，多输入意味着过滤器可以接收来自多个传感器的消息。所有过滤器的输出都是单输出，意味着消息通过过滤器进行过滤和融合，形成单通道消息。 Message Filter包的类图如图8所示。ROS中典型的单输入/单输出过滤器有Subscriber、PassThrough、TimeSequence、Cache和Chain，都是继承自Simplefilter类。此外，ROS中有两种多输入/单输出消息过滤算法：ExactTime和ApproximateTime，两者都继承自PolicyBase类。本<span style="color:black;background:#40a9ff !important;">文提出的SEAM同步器也属于多输入/单输出过滤器的范畴，它也是继承自PolicyBase类。</span>

![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202405062049062.png)


SEAM同步器的实现方式很简单，没有任何性能优化。在SEAM同步器中，我们使用容器Deque来实现与每个通道关联的队列。当新消息到达 SEAM 同步器时，我们的实现将更新其自己的队列，然后选择并发布输出消息集。更具体地说，我们<span style="color:black;background:#FFDBBB !important;">通过重写 add() 方法来开发 SEAM 算法</span>。除了对程序的鲁棒性进行一些基本检查之外，我们还使用两种方法来开发 SEAM 算法。<span style="color:black;background:#FFDBBB !important;">第一个方法 findEarliestMsg() 查找最早到达的消息</span>，使其与基础消息之间的时间戳差落在指定范围内。此外，findEarliestMsg()方法还会将最早到达的消息之前的消息从队列中删除，此时，待同步的消息位于队列的头部。<span style="color:black;background:#FFDBBB !important;">第二种方法 synCandidate() 收集每个队列的头部以形成输出消息集并将其发布到主题。</span>
根据匿名要求，SEAM 同步器的源代码目前无法在线获取。一旦本文被接受发表，我们将在 GitHub 上开源它们。

# 六．实验
在本节中，我们通过与内置的ROS 2 ApproximateTime算法进行比较来进行实验来评估SEAM算法的性能。我们实施 Alg 1（SEAM算法）在ROS 2（Dashing版本）的Message Filter包中，并让它与ROS 2中ApproximateTime算法的原始实现并行运行。我们在Intel Core i7 - 11800H CPU的计算机上运行实验，2.3GHz，16G RAM，在 Ubuntu 18.04 上安装 ROS 2 Dashing。

## A. 人工输入消息
我们使用具有不同设置的计时器在长度为 T 的时间间隔 [0, t] 内随机生成人工输入消息，如下所示。
**通道数 N** 。我们设置不同数量的输入通道（从 2 到 9，因为目前 ROS 消息过滤器最多支持 9 个输入通道）。
**时间戳分离 P** 。通道中两个连续消息的时间戳之间的差异（称为时间戳间隔）表示为 P 。每个通道的不同时间戳间隔P在10ms到100ms之间选择。
**间隔抖动比α**。允许时间戳间隔P在指定范围内变化。更具体地说，对于每个 i = 1, · · ·, N ，我们使用两个正整数 TiB 和 TiW 分别表示第 i 个通道的最小和最大时间戳间隔。抖动比表示为 α = TiB/TiW 。对于特殊情况 α = 1，即 TiB = TiW ，连接到第 i 个通道的传感器会生成具有恒定周期的消息。
**延迟**。消息在采样时间和到达通道时间之间可能会存在延迟。对于每个设置中的实验，消息所经历的延迟在 1 毫秒到 40 毫秒之间随机变化。
**阈值**。我们在实验中考虑两种类型的阈值。第一个阈值是第 3 节中提到的每个输出消息集的时间差异界限 C。第二个阈值表示为B。<span style="color:black;background:#d3f8b6 !important;">任意两个连续输出消息集的基础消息之间的时间戳差不得超过B</span>。B. 评价因素这个约束对于避免同步消息太少的情况是必要的。

## B. 评价因素
为了评估 SEAM 算法与 ROS 2 中的 ApproximateTime 算法相比的性能，我们在评估过程中主要考虑两个因素。这些因素提供了关于每个同步器基于各种标准的性能的关键见解

**成功率**。对于任何给定的输入消息序列（为了方便起见，我们也将其称为实例），如果消息同步器的输出消息集全部有效，即每个输出消息集的时间差异有界，则消息同步器成功生成输出消息集的阈值C，并且任意两个连续输出消息集的基础消息之间的时间戳差值以阈值B为界。<span style="color:black;background:#fbc2eb !important;">成功率是消息同步器成功同步的实例数与处理的实例总数的比值。</span>成功率越高，表明该算法有效地同步了更大比例的实例，从而提高了系统的性能和数据一致性。
**计算时间**。调用 SEAM 算法时，消息选择和输出消息集生成需要一些计算时间。我们评估 SEAM 算法单次调用的平均计算时间。

## C.评价结果
我们使用不同的参数组合进行实验，如图9至图14所示。配置的值写在图标题中。<span style="color:black;background:#fbc2eb !important;">对于每个数据点，都进行了 1000 次随机实验。</span>我们观察到SEAM算法大大提高了成功率，而其计算时间仅为ApproximateTime算法的五分之一。
![image.png|725](https://gcore.jsdelivr.net/gh/wsm6636/pic/202405062131298.png)
图 9 显示 SEAM 算法在成功率方面始终优于 ApproximateTime 算法。当阈值C在75ms到120ms范围内时，SEAM算法的成功率保持在95%以上，对阈值C的变化表现出最小的敏感性。相比之下，ApproximateTime算法的成功率在70%到100%之间变化。这些结果表明，与 ApproximateTime 算法相比，SEAM 算法在成功率方面表现出更高的稳定性。此外，SEAM算法的计算时间仅为ApproximateTime算法所需的五分之一到三分之二。

![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202405062133467.png)
一般来说，消息同步器的成功率随着阈值B的增加而增加（见图10）。 SEAM 算法始终优于 ApproximateTime 算法。原因可能是，对于固定的时间间隔，SEAM 算法比 ApproximateTime 算法输出更多的有效消息。因此，SEAM算法下连续输出消息集之间的时间戳差异较小，更好地遵守阈值B。

![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202405062134707.png)
从图 11 可以看出，SEAM 算法在任意通道数下的成功率均高于 ApproximateTime 算法，且稳定，即比 ApproximateTime 算法受通道数影响更小。图11所示的实验结果一致表明，随着消息通道数量的变化，SEAM算法的成功率保持在95%以上。这一性能超越了 ApproximateTime 算法，该算法的成功率在 70% 到 95% 之间波动。值得注意的是，SEAM 算法的成功率标准差低于 ApproximateTime 算法的成功率标准差。这一观察结果强调了 SEAM 算法在成功率方面具有更高的稳定性。
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202405062140605.png)
图12显示消息同步器的成功率随着时间戳间隔的增加而降低。造成这种情况的原因可能是在固定时间间隔内，当时间戳间隔较大时，消息较少。使用较少的消息使得构造有效消息集的可能性较小，因为用于对齐时间戳和创建所需同步的选项较少。
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202405062140721.png)
<span style="background:#d9d9d9">图13表明，随着抖动比α的增加，两个消息同步器的成功率均下降。这是因为<span style="color:black;background:#FFDBBB !important;">较大的抖动比意味着消息到达的时间晚于预期到达时间</span>。这种延迟导致固定时间间隔内可用的消息较少，从而导致生成有效消息集的成功率较低。</span>
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202405062142151.png)
从图14可以看出，当时间间隔变大时，消息同步器的成功率总体上呈现略有下降的趋势。这是因为延长的时间间隔可能会导致消息对齐和同步发生更大的变化，从而使一致地创建有效消息集变得更具挑战性。 SEAM算法在处理放大的时间间隔时表现出更好的容忍度，即不同设置下SEAM算法的成功率平均为95%，展示了其在保持高效数据融合方面的鲁棒性和适应性。

如图9至图14所示，在不同设置下，SEAM算法和ApproximateTime算法每次调用的平均计算时间分别为10ms和80ms。这一显着差异表明 SEAM 算法的平均执行速度要快得多。 <span style="color:black;background:#ff4d4f !important;">SEAM算法的效率可能归因于避免对传入消息的预测并且不过度追求最小时间差异。这种方法使算法能够专注于维护有界的时间差异，同时确保有效的消息集，从而大大缩短计算时间。</span>

# 七．相关工作
ROS作为最流行的开源机器人框架，经历了从ROS 1.0到2.0的过渡。值得注意的是，ROS 2 在实时性能方面有了实质性的改进。在ROS实时性能评估方面。Maruyama [11] 使用不同的 DDS 实现对 ROS 1 和 ROS 2 进行了基于测量的评估。他们的评估包括延迟、吞吐量、线程数量等指标。Gutie´rre [12] 重点关注 ROS 2 中实时应用程序的通信评估，考虑最坏情况的延迟。 Be ́dard [13] 提出了一种用于跟踪 ROS 应用程序的多用途低开销框架，以解决机器人软件开发中的性能分析挑战。

许多努力都集中在从系统架构的角度增强 ROS 的实时能力。Wei等人 [14]提出了一种实时ROS架构，该架构能够在具有多核处理器的集成操作系统环境中单独执行实时和非实时任务。李等人 [15]开发了一个实时ROS 2 GPU管理框架，允许添加任何管理策略作为插件，并在运行时在不同管理策略之间动态切换。Suzuki等人 [16]提出了一种考虑ROS调度限制和CPU/GPU协调机制的ROS离线调度框架。Saito [17]引入了基于优先级的消息传输机制来减少节点处理的最坏情况执行时间。他们还插入了一个同步节点来协调不同传感器数据的频率，旨在改善时间差异。<span style="color:black;background:#fbc2eb !important;">在 Saito 等人的另一部作品中 [18]提出了一种基于固定优先级的有向无环图（DAG）调度框架，它提供了端到端的延迟保证。他们还引入了同步机制来减轻时间差异。然而，他们的工作主要依赖于具体案例的测量，并没有提供正式的分析。</span>

在实时性能分析方面，针对ROS 2已经做了很多工作。Casini等人 [19]是第一个对ROS 2执行器进行形式化建模和分析的工作，为后续分析奠定了基础。唐等人的工作 [20]专注于增强响应时间分析技术，并引入优先级分配策略来优化其研究中的响应时间。另一方面，<span style="color:black;background:#fbc2eb !important;">崔等人 [21]对ROS 2执行器进行了重新设计，实现了固定优先级分配策略，以克服ROS 2默认调度策略的限制。他们进一步根据提出的调度策略对端到端延迟进行了分析。</span>布拉斯等人 [22] 为 ROS 2 应用程序引入了自动延迟管理器。他们利用现有的实时调度理论来控制关键回调链的延迟。所提出的方法自适应地估计和调整调度参数，而不需要用户干预。所提出的方法自适应地估计和调整调度参数，而不需要用户干预。在 Blass 等人的另一项研究中 [23]，他们在默认的 ROS 2 调度程序中考虑了饥饿自由度和执行时间方差。他们提出了对处理链进行更准确的响应时间分析，旨在增强系统的整体性能和可预测性。此外，伦道夫等人 [24]提出了两种基于线程调度模型和生产者-消费者模型的新执行器。他们开发了相应的响应时间分析技术，以提高 ROS 2 应用程序的执行时间分析和整体性能。上述工作都集中在ROS中的执行器组件上，而只有Li等人八．结论 [10]分析了消息同步器。他们在 ROS 中对 ApproximateTime 策略进行了建模，并正式分析了输出消息集的最坏情况时间差异。之后，他们对ROS中的消息同步策略进行了正式建模，并分析了其重要属性，包括唯一性、析取性、连续性、最优性和延迟相关性[25]。本文的主要重点是设计一种优于传统 ROS 同步器的高效消息同步器，而不是分析最坏情况下的时间差异。

# 八．结论
为了实现有效的数据融合，应在定义范围内的时间点对来自各种传感器的输入数据进行采样，确保正确的对齐和同步以实现准确的数据处理。现有ROS的当前消息同步器旨在最小化每个输出消息集的时间差异。然而，它忽略了融合算法的首要要求，即确保当前和未来输出消息集的时间差异在指定范围内。当仅专注于最小化当前消息集的时间差异时，同步器可能会无意中导致无法将未来输出消息集的时间差异保持在可接受的范围内。本文设计了一种新颖的消息同步器，称为 SEAM，它基于一个非常简单的策略：一旦最早到达的消息落入特定范围，就对其进行同步。 SEAM 旨在确保每个输出消息集的时间差异有很好的界限。 SEAM 背后的主要灵感是在当前消息集中留下一些“接缝”的概念，这使得将来构建有效的消息集变得更加容易。实验结果表明，SEAM算法在保证输出消息集的时间差落在指定范围内方面始终优于传统的ROS同步器。此外，SEAM 算法的计算时间要短得多，使其成为管理 ROS 系统中消息同步的更高效、更稳健的选择。



***

# 笔记

## 1 论文创新在于

## 2 解决了什么问题

## 3 方法

## 4 不足&可继续研究

## 5 可参考

## 6 思考