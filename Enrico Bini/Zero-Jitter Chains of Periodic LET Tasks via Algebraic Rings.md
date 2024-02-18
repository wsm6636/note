---
created: 2023-07-21T14:06
updated: 2024-02-18T18:12
tags:
  - 笔记
  - 笔记/文献笔记
---


# Zero-Jitter Chains of Periodic LET Tasks via Algebraic Rings

| Title                 | Zero-Jitter Chains of Periodic LET Tasks via Algebraic Rings |
| --------------------- | :----------------------------------------------------------- |
| Journal or Conference | IEEE Transactions on Computers                               |
| Authors               | Enrico Bini; Paolo Pazzaglia; Martina Maggio                 |
| Pub. date             | 2023                                                         |
| DOI                   | [10/gsfbns](https://doi.org/10/gsfbns)                       |
| Level                 |                                                              |

# Zero-Jitter Chains of Periodic LET Tasks via Algebraic Rings——基于代数环的周期 LET 任务的零抖动链



## 摘要

在包括汽车工业在内的嵌入式计算领域，复杂的功能分散在形成任务链的多个任务中。这些任务在功能上是独立的，并基于逻辑执行时间(LET)范例通过共享内存槽传递部分计算。本文介绍了一个模型，该模型捕获了链中生产者-消费者任务对的行为，表征了读取和写入事件的时间。使用环代数，可以将组合行为建模为单个周期任务。文中还提出了一种轻量级的机制来消除任意大小的整个链中的抖动，从而产生一个零抖动的单个周期性 LET 任务。所有提供的方法都可以在公共存储库中找到。



## 1 引言

现代商业实时应用，特别是在汽车领域，依赖于顺序工作的多个任务来实现复杂的功能，例如驾驶辅助系统和高级安全功能。这些系统需要集成更多的传感器和执行器，以及复杂的软件来处理数据。例如，视觉控制管道 [20]、[29] 使用多个传感器来收集数据。数据被处理并传递给提取环境特征的视觉算法。根据该输出，控制算法确定安全自动驾驶的适当动作。

在程序员方面，这种复杂性表现在集成大量交换数据的任务的挑战上。这些任务通常定期运行。很可能，它们是由不同的团队或供应商设计的，速度不匹配 [18]，并通过共享的内存进行交流。为了改进决定论，诸如逻辑执行时间(LET)[15] 之类的通信机制目前是一种常见的选择。在数据流水线的驱动下，LET 任务之间的功能依赖创建了所谓的功能任务链 [14]。**当链中每个任务的激活仅由其周期驱动时，这些链通常被称为时间触发链。**

这个应用领域的高度相关性给研究界带来了巨大的压力，他们需要开发现成的分析工具，如 pyCPA [27]，这些工具允许获得感兴趣的指标的安全估计，例如链的输入-输出延迟。这种分析在计算上不是很复杂，而且实现起来相当简单。因此，致力于更深入地分析写入和读取操作的时序细节的工作一直局限于链行为的模拟，以及对链内的数据传播提供最坏保证的安全边界的提取。经典方法 [5] 依赖于每个任务的索引列表的知识，以确定链中严格需要进行数据通信的那些作业，以便实现正确的行为。**在现实中，时间触发链的行为遵循重复模式，这可以通过分析超时期内的所有作业来列举。** 然而，这种方法存在可伸缩性问题。然后，为所述模式提供分析表达式将使得能够分析真实世界的工作负载，而不会引入近似和昂贵的清单。

在本文中，我们提供了这样的分析，并提供了以下贡献： 

第 4 节介绍了一种模块化方法，该方法将 <span style="background:#FF9999 !important;"> 一对通信 LET 任务的行为组合到单个任务中 </span>，为组合多个任务的迭代机制提供了基础。

第五节使用 <span style="background:#FFDBBB !important;"> 环代数 </span> 来分析任务链中一对通信 LET 任务的时间特征，给出了一个闭合形式的解，该解回答了任务链中的读或写阶段模式以及具有最长和最短输入输出延迟的作业等问题。

最后，第六节提出了一种 <span style="background:#FF9999 !important;"> 基于任务对的结果来消除任意长度任务链的读/写抖动的方法 </span>。得到的链表现为周期性的 LET 任务，为任务链的更具确定性的设计铺平了道路。

这些方法是用 PYTHON 实现的，可在资料档案库(https://github.com/ebni/periodic-LET).)中使用


这些结果对于设计和分析分布式应用程序具有重要意义。通过确保具有不同周期和阶段的任务链表现为纯粹的周期性系统，设计人员可以抽象出底层链的复杂性。此外，这种方法 <span style="background:#FF9999 !important;"> 可用于将周期性任务拆分为多个分布式链式任务，同时保持相同的功能行为。</span>

## 2 相关工作

文献中通常根据其组件的触发机制对任务链进行分类，最常见的类型是事件触发链和时间触发链 [26]。在航空电子设备 [11] 和机器人技术 [6] 中常见的事件触发链中，每个任务都由其前一个任务的终止激活。相比之下，时间触发链根据其周期来激活，并且经常用于汽车系统 [1]，遵循 AUTOSAR 标准。在这些链中，任务通过共享变量来通信数据。

Gerber 等人首先提到了时间触发的任务链。 [10] 提出了一种分配周期的方法，以便保留功能链接。最近，[9] 中引入的对不同端到端延迟的分析确定了四种不同的延迟语义，包括流行的反应延迟（first-to-first）和数据年龄（last-to-last）。已经提出了许多其他分析 [2]、[3]、[8]、[17]、[19]、[21]，针对最坏情况的端到端输入输出延迟或最大数据寿命的测量，因为这是许多应用领域中的关键参数。关于任务链的其他研究工作解决了优化任务参数以满足端到端时序约束的问题 [7]、[28]、[31]。最近的论文针对更复杂的场景：可以与其他链共享一个或多个任务的链 [16]，以及全局异步本地同步分布式链 [13]。

在本文中，我们考虑 <span style="background:#BBFFBB !important;"> 任务在固定时间点进行通信的链 </span>，以确保确定性和可预测性。实现这些目标的一种流行方法是实施遵循所谓的逻辑执行时间（LET）范式的通信方案 [15]。这可以通过引入用于共享数据的多个内存插槽在实时嵌入式平台中有效地实现，例如具有指针切换的双 [4] 或三重缓冲 [22]，或者使用中间全局标签和执行副本并以最高优先级运行的专用更新任务 [5]。 LET 副本也可以使用 DMA 引擎 [23]、[24] 来执行。

最近的工作开始解决与 LET 范式通信的时间触发任务链，将其时序属性与其他通信机制进行比较，例如，在 [2]、[21]、[22]、[30] 中。尽管有利于时间决定论，<span style="background:#FFFFBB !important;"> 但使用基于 LET 的通信会在链中引入更高（但恒定）的端到端延迟 </span> [2]、[12]。此外，在 [25] 中研究了此类系统中错过最后期限的影响。

在 LET 范式下，给出了一个典型的时间触发任务链的完整解析解。本文首先研究了一对功能相关的任务，并通过代数环描述了读/写阶段的序列，从而产生了解析描述的可重复模式。这种模式是通向任务组成分析的第一步，并导致提出一种新的设计，该设计以最小的干预消除了时间触发链的抖动。值得注意的是，这是第一个增强任务链以符合遵循逻辑执行时间范例的单个任务的模型的工作。

## 3 系统模型和背景

在本节中，我们将通过共享内存对任务之间的通信进行建模，并将其应用于单个周期性任务(第 3.1 节)。我们还介绍了理解技术内容所需的背景(第 3.2 节)。

### 3.1 任务和通信模型

我们用τ i 表示一个任务。每个任务τ i 释放一个无限的作业序列。Ji 表示任务τ i 的所有作业的索引，我们假设 Ji 是一个离散的、无限的、全序的集合，如符号整数 Z 的集合。对于任何 j ∈ Ji，我们用 Next（j）∈ Ji 表示τ i 的下一个作业的索引，并用 Prev（j）表示前一个作业的索引。当 Ji = Z 时，我们有 next（j）= j+1 和 Prev（j）= j ́-1。但是，我们保留了 next（j）和 Prev（j）的更一般的符号，以使它们对本文介绍的其他工作集有意义。此外，由于 <span style="background:#BBFFBB !important;"> Z 允许负指数 </span>，我们没有任务释放的“第一个”作业的概念。然而，如果需要，这样的第一个作业可以被标识为由 j = 0 索引的作业。

每个作业执行 <span style="background:#D8AC94 !important;"> 无状态计算，即，它不使用其内部状态，而只使用输入数据来计算其输出。</span> 例如，图像处理就是这种情况。具体地说，τ i 的每个作业 j ∈ Ji 按如下顺序执行以下操作：

1)它在读取时刻 rdi(j)从共享存储器位置读取其输入数据；

2)它执行其所有操作；以及

3)它在写入时刻 wri(j)将其输出数据写入共享存储器位置，使其对其他人可用。

在本文中，我们专门针对一大类周期性任务，其一般表示如下。

**定义 1(定期任务)。** 周期任务τ i 的特征是下列量：

Ti 确定释放的作业的周期；

θ ri（j）是τ i 的作业 j 的读时刻的阶段化；

θ wi（j）是τ i 的作业 j 的写时刻的阶段化

以便释放的作业的读写瞬间是。

![image-20230714214002373](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307211406073.png)

θ ri（j）和θ wi（j）同时有上界和下界.

> rdi(j)和 wri(j)是读写的时刻
>
> θ ri（j）和θ wi（j）是读写阶段经过的时间

阶段θ ri（j）和θ wi（j）可以编码不同的信息，例如任务与其截止日期之间的相对发布偏移量。（异步周期性任务）。在下面，我们从任务的实际执行时间中抽象出来，我们重点关注两个时刻 rdi(j)和 wri(j)，它们分别发生在作业开始执行之前和作业执行完成之后。

![image-20230714214228716](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307142142789.png)

此外，我们定义了两个连续读取时刻之间的间隔和两个连续写入时刻之间的间隔，如下所示

![image-20230714214257735](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307142142798.png)

最后，我们证明了上面介绍的值可以很容易地映射到常用的 <span style="background:#BBFFBB !important;"> 输入输出延迟 </span> 的概念，该概念可以通过以下公式为τ i 的作业 j ∈ Ji 定义

![image-20230714214334670](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307142143735.png)

在分析的情况下，我们认为让通信在链中的周期性任务之间强制进行。

**定义 2(定期 LET 任务)。** 周期性 LET 任务τ i 是 <span style="background:#BBFFBB !important;"> 具有恒定相位θ ri（j）和θ wi（j）的周期性任务 </span>

对于这些任务，我们可以去掉作业索引 j，并使用更紧凑的符号θ ri、θ wi 和 Li = θ wi-θ ri 来分别表示阶段和输入-输出延迟。

> 周期LET任务，输入输出偏移量相同
> 所以可以计算延迟
> 
### 3.2 数学背景

我们引入了两个数学运算符来将方程写成紧凑的形式，将模运算符和最大公约数运算符推广到实数上。

定义 3(实数上的模算子)。给定 x ∈ R 和 m ∈ R，其中 m > 0，我们定义

![image-20230714215157129|500](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307211406088.png)

根据，的定义，以下属性如下：

![image-20230714215251807](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307142152882.png)

下一个属性用于将上限与模运算符相关联。事实上，我们有

![image-20230714220048780](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307211406777.png)

而下一个属性表明，在模运算符内部，我们可以将该运算符重新应用于补数(如果有的话)。事实上，从

![image-20230714222333283](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307142223367.png)

![image-20230714222350712](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307211406877.png)

用类似的步骤，我们可以证明

![image-20230714222408620](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307142224687.png)

最后，Next 属性用于将模数转换为另一个模数。如果对任意 k 和 d 有 x = kd，则

![image-20230714222647136](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307211406130.png)



我们指出，如果 x ∈ Z 和 m ∈ N，则任意⌊ x ⌋~m~都属于 <span style="background:#BBFFBB !important;"> 交换环 </span> Z/MZ，它由一个具有加法和乘法的集合组成，然后享受这种代数结构的所有性质.在这种情况下，⌊ x ⌋等价于模 m 同余，即，

![image-20230714230549972](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307142305060.png)

> 什么是交换环
>
> 抽象代数中的一种基本代数结构。它是一个集合，具有两个二元运算，加法和乘法，并满足特定的性质。
>
> 对于整数除法 a ÷ b，其中 a 和 b 是整数，模运算的余数可以表示为 a mod b，通常用符号 % 表示。
>
> Z 整数，N 非零证书，R 实数

此外，我们还可以在 Z/MZ 上缩紧(4)

![image-20230714230619705](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307211406180.png)

我们提醒读者环 Z/MZ.如果 gcd(p, m)= 1，则 p 在 Z/MZ 上有乘法逆。例如，超过 Z/5Z

![image-20230714230721654](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307211406988.png)

> 在一个环中，一个非零元素 a 的乘法逆元，也称为倒数，是另一个元素 b，使得它们的乘积等于环的乘法单位元。

**定义 4(实数上的最大公约数)**。给定 x，y ∈ R，x，y > 0，

如果存在 G ∈ R 和 P1，P2 ∈ N 使得 x = P1G，y = P2G 和 gcd(p1, p2)= 1，我们写为 gcd(x, y)= G，

如果不存在 G 如上，则我们写 gcd(x, y)= 0。

请注意，G 是唯一的。实际上，假设 G'是另一个值，比如 x = p1'G1，y = p2'G'，和 gcd(p1', p2')= 1，那么，pi = pi'G'，其中 1 = gcd(p1, p2)= gcd(p1', p2')G'/G 意味着 G = G'。

例如，gcd(3/4,5/6)= 1/12, gcd(5 $\sqrt{3}$，2 $\sqrt{3}$)= $\sqrt{3}$，gcd(1, π)= 0。我们指出，在整数上，这样的定义与最大公约数的标准 gcd 定义是一致的。

## 4 预设

本文的第一个目标是推导出一个新的模型，该模型能够统一地处理 <span style="background:#BBFFBB !important;"> 时间触发任务链中的单个周期 LET 任务和多个周期 LET 任务的组合 </span>。在这里，我们引入一种方便的表示法，以便τ i 可以互换地称为“任务”和“链”。

### 4.1 周期链

我们将使用聚合索引 $i \blacktriangleright \ell$ 来表示链 $\tau_{i \blacktriangleright \ell}$，其中 $\tau_{\ell}$ 读取由τ i 写入的输出。遵循同样的精神，我们使用 $\mathbb{J} _{i \blacktriangleright \ell}$ 的符号来表示链 $\tau_{i \blacktriangleright \ell}$ 的作业集。合并两个任务使我们可以根据需要构建链。例如，链 $\tau_{1 \blacktriangleright 2\blacktriangleright 3}$ 是两个“链”τ 1 和 $\tau_{2\blacktriangleright 3}$ 的组合，而这两个“链”又是τ 2 和τ 3 的组合。或者，$\tau_{1 \blacktriangleright 2\blacktriangleright 3}$ 可以被视为 $\tau_{1 \blacktriangleright 2}$ 和τ 3 的组合。

由于任务的特点是将处理输入的作业释放为输出，因此可以为链引入类似的定义。我们现在的目标是定义链 $\tau_{i \blacktriangleright \ell}$ 的作业集合 $\mathbb{J} _{i \blacktriangleright \ell}$。直观地，链 $\tau_{i \blacktriangleright \ell}$ 的作业(ji，jl)属于 $\mathbb{J} _{i \blacktriangleright \ell}$ 当且仅当作业 jl 是第一个读取由作业 Ji 写入的数据的作业时。图 1 说明了这个概念。使用这种表示法，链可以以类似于定义 1 的任务模型的方式来表征。

![image-20230715194041017](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307211406089.png)

定义 5(周期链)。周期链 $\tau_{i \blacktriangleright \ell}$ 的特征在于下列量，

T 确定链的周期，

θ rij 是作业(ji, jl)的读取时刻的相位，

θ wij 是同一作业的写入时阶段

注 1.<span style="background:#BBFFBB !important;"> 周期任务可以建模为只有一个任务的周期链 </span>。此外，**包含多个周期性任务的周期链可以抽象为单个周期性任务。**

定义链 $\tau_{i \blacktriangleright \ell}$ 的作业 $(j_i,j_\ell)$ 的过程需要付出更多努力，下面将给出。首先，我们在子集 ![image-20230715195250284](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307211406573.png) 的家族中划分 Ji 的作业。每个 Ji(jl)只包含 Ji 中写入时刻在 rdl(prev(j))和 rd(j)之间的作业，形式上是：

<img src="https://gcore.jsdelivr.net/gh/wsm6636/pic/202307151953557.png" alt="image-20230715195343479"  />

类似地，我们还可以定义τ作业的索引的集合 Jl(ji)，其读取时间在 wri(ji)和 wri(next(ji))之间

![image-20230715195712587](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307211406785.png)

如图 1 所示。我们注意到 Ji(jl)和 Jl(ji)

- 对于某些 jl 或某些 ji 可以为空(例如，图 1 的 j1(6)或 j2(8)的情况)，以及
- 如果不为空，则它们具有有限数量的元素，因为这两个集合分别由 rdl(jl)和 wri(next(ji))限定。

从等式(12)的集合中，我们现在可以定义链 $\tau_{i \blacktriangleright \ell}$ 的作业的集合 $\mathbb{J'} _{i \blacktriangleright \ell}$ 如下

![image-20230715200940133](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307211406450.png)

>  包含了任务 τi​ 和 τℓ​ 中的作业对 (ji​,jℓ​)
>  ji​ 是在 τi​ 中最早写入数据的作业，这些数据随后被 τℓ​ 中的作业读取。
>  任务 τi​ 中存在至少一个作业 ji​，其写瞬间发生在任务 τℓ​ 中作业​ 的读瞬间之前

以及公式(13)中的“对偶”定义为

![image-20230715200955777](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307211406050.png)

> 同样包含了任务τi​ 和 τℓ​ 中的作业对 
任务 τℓ​ 中存在至少一个作业 jℓ，其读瞬间 发生在任务 τi​ 中作业 ji​ 的写瞬间wri​​ 之后。
-集合中的最小元素，即 jℓ​ 是在 τℓ​ 中最晚读取 τi​ 中作业 ji​ 写入的数据的作业。


接下来，我们证明了 和 是等价的，这使得能够很好地定义τ i 的作业的集合。

引理 1.两组作业 <img src="https://gcore.jsdelivr.net/gh/wsm6636/pic/202307152011816.png" alt="image-20230715201131727" style="zoom: 67%;" /> 是等价的。<img src="https://gcore.jsdelivr.net/gh/wsm6636/pic/202307152012523.png" alt="image-20230715201218427" style="zoom:67%;" /> <img src="https://gcore.jsdelivr.net/gh/wsm6636/pic/202307152012569.png" alt="image-20230715201243474" style="zoom:67%;" />

![image-20230715201203186](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307211406550.png)

![image-20230715201304407](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307211406714.png)

否则，<img src="https://gcore.jsdelivr.net/gh/wsm6636/pic/202307211406265.png" alt="image-20230715201836707" style="zoom:67%;" />，不可能是这种情况，因为 <img src="https://gcore.jsdelivr.net/gh/wsm6636/pic/202307152018361.png" alt="image-20230715201849264" style="zoom:67%;" />

![image-20230715201632844](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307211406653.png)

这意味着 <img src="https://gcore.jsdelivr.net/gh/wsm6636/pic/202307152022405.png" alt="image-20230715202249325" style="zoom:67%;" />。此外，根据 <img src="https://gcore.jsdelivr.net/gh/wsm6636/pic/202307152024778.png" alt="image-20230715202455699" style="zoom:67%;" /> 的假设，我们有

![image-20230715202159906](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307211406834.png)

这意味着 Prev(jl')和之前的所有作业都不属于 Jl(ji')。这意味着 <img src="https://gcore.jsdelivr.net/gh/wsm6636/pic/202307152044895.png" alt="image-20230715204416812" style="zoom:67%;" />, <img src="https://gcore.jsdelivr.net/gh/wsm6636/pic/202307211406459.png" alt="image-20230715204441620" style="zoom:67%;" /> 双重证明：<img src="https://gcore.jsdelivr.net/gh/wsm6636/pic/202307152045482.png" alt="image-20230715204538410" style="zoom:67%;" /> <img src="https://gcore.jsdelivr.net/gh/wsm6636/pic/202307152048387.png" alt="image-20230715204830767" style="zoom:67%;" /> 可以以类似的方式进行，为简洁起见在此省略。
> 证明作业对可以在另一个集合中找到

**定义 6**.我们通过(14)的 $\mathbb{J'} _{i \blacktriangleright \ell}$ 或等价地通过(15)的 $\mathbb{J''} _{i \blacktriangleright \ell}$ 定义链 $\tau_{i \blacktriangleright \ell}$ 的作业的集合 $\mathbb{J} _{i \blacktriangleright \ell}$。
> 它提供了一种统一的方式来描述周期性链中的作业集合，无论我们选择使用公式14还是公式15来定义这个集合。这种统一的描述使得分析和讨论任务链的行为变得更加简洁和一致。

集合 $\mathbb{J} _{i \blacktriangleright \ell}$ 是离散的、无限的和全序的，因为它继承了 Jl 的这些性质。$next(j_i,j_\ell)$ 是 $(j_i,j_\ell)$ 的下一个任务在 $\mathbb{J} _{i \blacktriangleright \ell}$ 中。例如，在图 1 的读和写瞬间的场景中 next(9,5)=(11,7)

对于每一个 $(j_i,j_\ell)$ 不出所料，读取和写入瞬间是由

![image-20230715205558553](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307211406949.png)

在第 6 节中将会感兴趣的一种特殊情况是，当周期链具有恒定的读和写相位时，其行为实际上与逻辑执行时间相一致。
> 周期性链中的作业 (ji​,jℓ​) 的读瞬间就是任务 τi​ 中作业 ji​ 的读瞬间，而写瞬间则是任务 τℓ​ 中作业 j​ℓ 的写瞬间。这种定义方式确保了任务链中的作业在执行时能够正确地读取和写入数据。

**定义 7(定期 LET 链)。** 周期 Let 链 $\tau_{i \blacktriangleright \ell}$ 是具有常数相位θ rij 和θ wij 的周期链。
> 在周期性LET链中，这些相位对于链中的所有作业都是恒定的，这意味着每个作业在每个周期内都会在相同的时间点进行读写操作。

注 2.周期性 LET 任务可以被建模为只由一个任务组成的周期性 LET 链。此外，可以将由多个 LET 任务形成的周期性 LET 链抽象为单个周期性 LET 任务

### 4.2 无效和多余的工作

我们现在正在用实地公认的定义和概念在我们的符号和术语之间建立联系。集合 Ji(jl)和 Jl(ji)的定义严格与可达性的经典概念 [9] 有关，特别是与直接向前和向后作业链的定义 [8] 有关。

以迭代的方式，从链中第一个任务的任一作业开始，选择具有在该作业的写入时刻之后发生的读取时刻的连续任务的第一个作业，构建立即向前作业链。在我们的符号中，作业(j1，j2，.。。，jn)是任务链 $\tau_{i \blacktriangleright ...n}$ 的直接前向作业链

![image-20230715211052876](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307152110985.png)

类似地，以向后迭代的方式，从链的最后任务的任何作业开始，并包括不晚于该作业的读取时刻的前一任务的最后作业，构建立即向后作业链。在我们的符号中，作业(j1，j2，.。。，jn)是直接向后的作业链，当

![image-20230715211139363](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307211406430.png)

在文献中，直接前向作业链被用来测量第一个任务感知的事件到达链的末端所需的时间。立即转发作业链中最长的输入输出延迟对应于链的最大反应时间 [9]。另一方面，直接后向作业链代表链中最后一个任务使用的数据的新鲜值，并且立即后向作业链中最长的输入输出延迟对应于最大数据年龄。

一般而言，无论如何，这些最先进的定义都是抽象的，避免了由于任务之间的过采样/欠采样而可能覆盖的标签。实际上，直接向前作业链可以包括其输出在被下一个任务消耗之前被覆盖的作业，而立即向后作业链可以包括重新计算相同任务的先前作业的相同输出的作业。为了更好地突出这一方面，我们引入了无效和冗余作业的定义 [1]、[25]。

τ i 的一项作业 ji 是 **无效的** W.r.t.τ如果它不传播数据，即 <span style="background:#BBFFBB !important;"> ji 的输出在被τ的任何作业读取之前被作业 next(ji)覆盖。</span>

<span style="background:#BBFFBB !important;"> 定义 8(作废作业)</span>。给定一个链，一个作业 ji 是无效的 W.r.t。τ i <img src="https://gcore.jsdelivr.net/gh/wsm6636/pic/202307211406911.png" alt="image-20230715211610985" style="zoom:67%;" />

例如，在图 1 中，作业 j1 = 8 是无效的 w.r.t.τ 2，因为其数据被τ 1 的作业 9 覆盖。事实上 <img src="https://gcore.jsdelivr.net/gh/wsm6636/pic/202307152117911.png" alt="image-20230715211751837" style="zoom:67%;" />

相反，τ的作业 j 是 **多余的** w.r.t。τ i 如果它重复相同的数据处理，即，<span style="background:#BBFFBB !important;"> 作业 jl 读取由作业 prev(jl)读取的相同输入，并且因此产生相同的输出。</span>

<span style="background:#BBFFBB !important;"> 定义 9(冗余工作)。</span> 给定链，作业 jl 是多余的 w.r.t。τ i <img src="https://gcore.jsdelivr.net/gh/wsm6636/pic/202307152121219.png" alt="image-20230715212126094" style="zoom:67%;" />

再看图 1，作业 j2 = 6 是多余的 w.r.t.τ 1，因为它读取与前一个相同的输入，因此执行关于 <img src="https://gcore.jsdelivr.net/gh/wsm6636/pic/202307211406451.png" alt="image-20230715212158718" style="zoom:67%;" /> 的冗余计算。

## 5 一对周期性 LET 任务

本节分析由一对具有恒定读写阶段的周期性 LET 任务组成的任务链。该链表示为 $\tau_{1 \blacktriangleright 2}$，其中任务τ 2 读取由任务τ 1 写入的数据。目的是证明 $\tau_{1 \blacktriangleright 2}$ 是周期性的，周期为 Max{T1，T2}，并提供读取和写入阶段的封闭公式，从而能够识别任何给定相位值的作业索引。这一公式也比经典方法更灵活，例如在 [5] 中，后者需要迭代检查以确定必要通信的逐个任务的工作索引列表(没有关于这些工作指数在链中如何关联的容易获得的信息)，并且仅为同步发布的任务制定。在第 5.1.1 节和第 5.2.1 节中介绍了两个例子来说明所提出的方法。

作业集合 $\mathbb{J} _{1 \blacktriangleright 2}$ 和每个作业阶段θ r 和θ w 的定义需要深入分析链的任何作业的定义。这种分析分为 T1 ≥ T2 和 T2 ≥ T1 两种情况。此外，还可以方便地定义

![image-20230715213447298](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307211406671.png)

其物理解释是**τ 1 的作业 0 的写入时刻和τ 2 的作业 0 的读取时刻之间的距离**。

> J, 大写的，作业的集合
>
> j，小写，作业的索引
>
> J1（3） ={5,6,7} 
>
> J1-2 的任务对集合里面，包含一条任务链τ 1-2
>
> J2 的第三个作业 j3，读取，J1 的第 7 作业输出的数据，
>
> J2 的第二个作业在 J1 第五个作业之前，所以 j2 到 j3 有 567

### 5.1 T1 ≥ T2

当 t1 ≥ t2 时，形式上，在τ 1 的任何一对连续写入时刻之间总是存在读取时刻 rd2(j)

![image-20230715222807684](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307152228779.png)

使用前面由公式定义的 J2(j1)。(13)。然后，就可以很方便地从公式中定义链 $\mathbb{J} _{1 \blacktriangleright 2}$ 的作业集合 $\tau_{1\blacktriangleright 2}$。(15)，即

![image-20230715222920665](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307211406951.png)

从方程(13)由于 J2(j1)从不为空，因此上面的索引 j2 为

![image-20230715224306709](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307152243818.png)

通过使用公式(17)中的Θ的定义。因此，链的作业集合

![image-20230715224517410](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307152245485.png)

为了强调这样一个事实，由于 j2 是 j1 到(18)的函数，链的作业索引(j1, j2)仅依赖于 j1，我们将用（j1,\*）来表示链的作业。

我们现在的目标是将链刻画为周期链，如公式(1)中所示，具有适当的周期 T 和阶段θ r 和θ w 可找到。从方程的定义出发，给出了方程的定义 16，任何作业（j1,\*）的读取时刻为

![image-20230715225142199](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307211406722.png)

这已经表明：

1)链的周期是必然的 <img src="https://gcore.jsdelivr.net/gh/wsm6636/pic/202307152252729.png" alt="image-20230715225224642" style="zoom:67%;" />

2)并且链的任何作业（j1,\*）的读取相位是恒定的 <img src="https://gcore.jsdelivr.net/gh/wsm6636/pic/202307211406021.png" alt="image-20230715225307488" style="zoom:67%;" />

写入阶段化θ w 需要付出更多努力。根据公式的定义，作业（j1,\*）的写入时刻为公式(16)，等于τ 2 的作业的写入时刻，满足以下条件

![image-20230715225413141](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307211406038.png)

其中我们写 wr(j1,\*)假设它有一个周期为 T1，每个作业的写阶段θ w(j1,\*)。

通过利用定义 3 的模的概念，写入阶段的表达式可以在常数值加上变化但有界的项之间拆分，如下所示

![image-20230715225637450](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307211406798.png)
Eq(4).的标准性质的模T2产生以下θw12（j 1，\*）的上下界
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202402171923752.png)

如果gcd(T1，T2)=0，这必然意味着两个周期中的任何一个都是无理的，那么(21)的界限不能进一步收紧。相反，如果T1和T2具有非零gcd(T1、T2)，则
θw12(j1，\*)的上界和下界可以是紧的，并且
写入相移值θw12(j1，\*)的表达式可以反转，也就是说，对于任何可能的相移值θ，我们可以准确地确定所有j1，使得θw12(j1，\*)=θ，如果它们存在的话。

这两个结果都是由下一个定理实现的，该定理处理等式(20)的每个工作变化部分![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202402171928896.png)![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202402181449216.png)

**定理1**.设G=gcd(T1，T2).如果G>0，则
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202402171929221.png)
有p1，p2，使得T1=p1G，T2=p2G，和φ1下式除以G的整商
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202402171930495.png)

证据。当j1跨过Z时，(22)的量![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202402171928896.png)沿图2所示的“环”跳跃，其中表示T2-模代数环。
现在让我们正式开始吧。首先，我们当然可以写![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202402171932165.png)因为(8)的性质。分析第一个附录，我们发现
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202402171933842.png)
通过应用方程式(10)的性质。然后从(23)的φ1的定义
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202402171933816.png)
下一步和最后一步是进一步简化上述方程的右侧。毫无疑问，![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202402171933583.png)
因为$0 <= \left \lfloor  -j1p1\right \rfloor_{p2} <= p2-1$ 它也是0<=φ1<=p2-1从它的定义(23)和T2=p2G。我们考虑两个案例。![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202402171949708.png)然后，我们可以通过应用等式（六）的性质来去除$$\left \lfloor  \right \rfloor_{T2} $$算子。
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202402171951036.png)

![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202402171951150.png)
然后，通过首先应用属性(5)来减去-T2，然后应用属性(6)来移除外部T2取模，我们发现
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202402171956624.png)
最后一个等式成立，因为在第二种分析情况下，![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202402171957667.png)这两种情况的表达式与待证明的等式（22）的表达式一致。证明到此结束。
总之，通过将(20)中的(22)替换为θw12(j1,\*)，即，其中我们强调：![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202402172224423.png)![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202402172225446.png)方程的这种新的表达方式。(24)使我们能够收紧(21)的界限。.
**推论1**.设G=gcd(T1，T2).如果G>0，则![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202402172226397.png)证据。根据(11)的界限，表达式 $\left \lfloor  -j1p1\right \rfloor_{p2}$ 的界限为$0 <= \left \lfloor  -j1p1\right \rfloor_{p2} <= p2-1$。这意味着，通过定理1，![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202402172244185.png)现在将上面的界限代入(24)的θw12(j1,\*)的表达式，我们顺利地找到了(25)，然后得出了证明。
推论1给出了θw12(j1,\*)的界。因此，自然的问题是这些上界和下界是否紧。下一个定理给出了一个肯定的答案，并且还给出了所有J1的写阶段的显式表达式。
**定理2**.设G=gcd(T1，T2).如果G>0，则对任意k=0，.。。，p2-1![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202402172252278.png)其中φ1如(23)所示，$p^{-1}_1$表示p1在Z/p2Z上的乘法逆。
证据。我们首先观察到，从G=gcd(T1，T2)的定义，我们有gcd(p1，p2)=1与T1=p1G和T2=p2G。因此，p1在环Z/p2Z上有乘法逆。现在，从j1=(φ1-k)p1-1我们发现
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202402181430401.png)
并应用等式。(22)和θw12(j1,\*)的表达式(20)，我们立即发现(26)结束了证明。
证明的定理提供了写入阶段化θw12(j1,\*)的显式表达式，并且更重要的是，它告诉写入阶段化采用任何给定值的索J1 ∈ J1=Z是什么。例如，在以下情况下分别采用最小和最大相位![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202402181444254.png)此外，它们分别等于(25)的下界和上界，因此(25)的界是紧的。
在图2的示例中，我们有p2=5和p1=8，然后是p-11=2因为[8x2]5=[16]5=1。由于φ1=1，因此当![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202402181446854.png)而最大值出现在![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202402181446268.png)虽然τ12的两个连续作业的读取时刻之间的间隔始终等于T1，但写入时刻之间的间隔具有更复杂的表达式。![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202402181448295.png)**引理2**
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202402181450493.png)
证据。首先，从(24)的θw12(j1,\*)的表达式中，我们发现![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202402181503505.png)∆Wr12(j1,\*)中唯一依赖于J1的术语可以重写为![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202402181503882.png)现在我们更深入地研究量(\*)，也如图3所示。如果k≥t[p 1]p 2那么![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202402181510238.png)其中我们应用了第一个等式的性质(8)和(9)，以及性质(6)，因为k-t[p 1]p 2≥0对于第二个等式是适用的。如果改为k≤t[p 1]p 2-1，则![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202402181511602.png)通过替换这两个表达式，我们精确地找到了公式。(27)，这就结束了证明。
从(27)的∆Wr12(j1,\*)，的表达式中不能立即看出，对于所有j1，∆Wr12(j1,\*)是T2的倍数，正如人们所预期的那样。下一个推论证实了这种直觉是正确的。
**引理2**
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202402181512620.png)
证据。通过利用公式(27)中的[]m的定义，可以很容易地证明这一推论，公式可以改写如下：![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202402181514615.png)对T1≥T2情况的分析表明，在调和情况下，所有这些结果都符合通常的直觉。如果T1是T2的整数倍，则G=gcd(T1，T2)=T2。依次为p2=1，意味着写入阶段化恒定等于θw12(j1，\*)=θ2w - Θ+[Θ]T2，并且两个连续写入之间的间隔也是恒定的并且等于T1。
#### 5.1.1示例
现在让我们通过一个例子来说明所得到的结果。我们考虑一对带参数的任务τ1和τ2
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202402181516535.png)
这两个周期之间的最大公约数是G=gcd (16，10)=2，因此p1=8和p2=5分别为T1=p1G和T2=p2G。根据公式(17)和(23)，我们获得Θ=θ2r-θ1w=-17，φ1=1。图4中绘制了读取和写入时刻。这些相同的参数值可以在我们位于https://github.com/ebni/periodic-LET.的存储库中找到
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202402181518649.png)
从T1≥T2开始，链T12的周期等于T1。此外，表1针对τ1的每个作业J1报告，
- $\left \lfloor \phi_1 - j_1p_1  \right \rfloor _{p2} \in  Z/p2Z$的值，它是确定写入阶段化的每个作业的可变性的表达式，如(24)所示。我们提醒，这样的表达式可以被可视化为图2中所示的环上的位置，
- 写入阶段化θw12(j1，\*)的作业(j1，\*)链τ12起源于τ1的作业J1，从其表达式(24)中找到，
- 绝对写入时刻wr12(j1，\*)=j1T12+θw12(j1，\*)和
- 分离∆wr12(j1，\*)到下一个写入时刻。
如定理2中所述，当$\left \lfloor \phi_1 - j_1p_1  \right \rfloor _{p2} =0$时写入阶段化是最小的，当且仅当![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202402181525754.png)由于p-11在Z/p2Z=Z/5Z上的逆p-11是2。因此，具有最小θw12(j1，\*)的作业指标是J1=。，-8，-3,2,7，12，17，.。。在相同的变元下，当$\left \lfloor \phi_1 - j_1p_1  \right \rfloor _{p2} =p2-1$时，j1=-6,-1,4,9，写入相位́θw12(j1，\*)是最大的。
最后，引理2允许我们解析地确定任意给定作业的两个连续写入的间隔∆wr12(j1，\*)。当$\left \lfloor \phi_1 - j_1p_1  \right \rfloor _{p2} \in \left \{ \left \lfloor p_1  \right \rfloor _{p2},...,p2-1 \right \}$ 等于{3，4}在我们的例子中，则̊∆wr12(j1，\*)等于它的较小值$\left \lfloor T1/T2  \right \rfloor T2$否则等于$\left \lceil T1/T2 \right \rceil T2$。在我们的示例中
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202402181752824.png)

### 5.2 T2 ≥ T1
我们现在假设T2 ≥ T1。本节模仿5.1中的相同步骤。因此，当一些细节不能增加讨论的价值时，我们可以省略它们。
当T2 ≥ T1时，在τ2的任何一对连续读取时刻之间总是存在写入时刻wr1(j)。借用第4节的定义，这一事实正式地表示为![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202402181754962.png)它允许我们将J12通过等式(14)定义为![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202402181756424.png)其中Θ如前面（17）中所定义。此外，为了记住作业(j1，j2) ∈J12仅由j2标识，我们将它们写为(\*,j2)。
现在旨在将链τ12描述为周期链，任意作业(\*,j2)∈J2的写入时刻的表达式![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202402181812621.png)











***

# 笔记

## 1 论文创新在于

## 2 解决了什么问题

## 3 方法

## 4 不足&可继续研究

## 5 可参考

## 6 思考

Referred in <a href="zotero://note/u/SNRSRWGX/?ignore=1&#x26;line=-1" rel="noopener noreferrer nofollow" zhref="zotero://note/u/SNRSRWGX/?ignore=1&#x26;line=-1" ztype="znotelink" class="internal-link"> bini </a>
