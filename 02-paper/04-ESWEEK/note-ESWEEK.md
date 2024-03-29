---
created: 2024-03-15T15:53
updated: 2024-03-27T12:15
tags:
  - 笔记
  - 笔记/idea
---

> 外部事件触发的时间tz
> 认为外部事件是任务链中第一个任务，编号为c0
> 第一个采样任务τ0为c1，fτ0也就是tc1
> 外部事件z的结束时间为tc0，也就是任务0的释放时间r0
> 其中t0就是r1
> 

最大反应时间衡量从外部活动到数据完全由系统处理的时刻的时间
最大数据年龄测量从数据采样到基于该采样的激励的时间


z是外部活动时刻
z'是驱动事件时刻

端到端时延都是z'-z
最大反应时间：z是外部活动触发的时间，z'是链的最后一个任务结束时间（处理完由于外部活动产生的数据，但并不包括将处理结果用于驱动其他任务）
最大数据年龄：z是链的第一个任务开始时间（不考虑外部活动触发，只考虑外部活动之后第一个开始处理数据的任务），z'是链的最后一个任务结束时间==（将数据写入缓冲区？）==

> 他们的最后一个任务的时间是否是一样的？
> 最大数据年龄需要多考虑一个任务的时间吗？？？？
> （切割考虑了，但是QBV没有）
> 如果考虑的话，通过事件触发和资源曲线怎么分析

> 数据年龄最后一个任务的时间一样：因为对于事件触发的任务链，最后一个任务处理完数据后，下一个任务才会激励
> 激励事件（最后一个任务的下一个任务），的释放时间（被触发的时间），和最后一个任务的结束时间相等

$$\begin{equation}
\begin{aligned}
R(C) & = t'-t\\
     & = f(c_n) - r(c_1)\\
     & = t(c_n) - t(c_0)\\
     & = \sum_{i=1}^{n}(t(c_i) - t(c_{i-1}))\\
\end{aligned}
\end{equation}$$


# bug
#### 任务链
**我们考虑由一系列事件c组成的任务链C={z, c0，c1，c2，...，cn}。所有事件c按序处理在t时刻外部事件z产生的初始数据，并在时刻t'由最后一个事件cn产生关于该数据的最终结果。**

我们考虑由一系列事件c组成的任务链==C={z, c1，c2，c3，...，cn}==。所有事件c按序处理在t时刻外部事件z产生的初始数据，并在时刻t'由最后一个事件cn产生关于该数据的最终结果。

**定义1（任务链）：任务链C={z, c0，c1，c2，...，cn}满足：
- **任务链C中的事件c0和cn只能是调度任务 $\tau_0$ and $\tau_n$,，即c0和cn只能存在于ECU上。**
- **c0是一个ECU上的周期性调度任务$\tau_0$，且周期为T，用来定期捕捉外部事件z**
- **对于外部事件z，当且仅当其发生在CPU空闲时才有效。**
- **对于任意事件ci （1<i<n-1），可以是调度任务也可以是网络任务。**
- **不存在两个连续的事件ci和ci-1（1<i<n-1）为分别在不同ECU上执行的调度任务情况。在任务链上，不同ECU上执行的两个调度任务中间至少有一个网络任务作为连接。例如，ci-1和 ci+1为不同ECU上的调度任务，则ci为一个网络任务。**

定义1（任务链）：任务链==C={z, c1，c2，c3，...，cn}==满足：
- 任务链C中的事件c1和cn只能是调度任务 $\tau_0$ and $\tau_n$,，即c1和cn只能存在于ECU上。
- c1是一个ECU上的周期性调度任务$\tau_0$，且周期为T，用来定期捕捉外部事件z
- ==对于外部事件z，可将其看做任务链的第0个事件，即外部事件z是c0==
- 对于任意事件ci （1<i<n-1），可以是调度任务也可以是网络任务。
- 不存在两个连续的事件ci和ci-1（1<i<n-1）为分别在不同ECU上执行的调度任务情况。在任务链上，不同ECU上执行的两个调度任务中间至少有一个网络任务作为连接。例如，ci-1和 ci+1为不同ECU上的调度任务，则ci为一个网络任务。

#### 结束时间
**定义4 （结束时间）：对于任务链$C = \{z, c_0, c_1, c_2, ... , c_n\}$中的每一个事件，$t(\cdot )$为事件的结束时间：
**- 对于外部事件z，$t(z)$为外部事件发生的时间。**
**- 对于ECU上的调度任务$\tau_i$来说$t(c_i)$为调度任务$\tau_i$的结束时间$f(c_i)$。**
**- 对于网络任务$m_i$来说$t(c_i)$为结束时间$d(c_i)$。


定义4 （结束时间）：对于==任务链$C = \{z, c_1, c_2, c_3, ... , c_n\}$中的每一个事件，==$t(\cdot )$为事件的结束时间：
- 对于外部事件z，$t(z)$为外部事件发生的时间，t(c0)为外部事件结束时间。根据定义1可知，外部事件z也是任务链的事件c0。外部事件的结束时间就是当外部事件触发后，下一个将要捕捉此外部事件z的周期性调度任务τ0对应的作业的释放时间。
- 对于ECU上的调度任务$\tau_i$来说$t(c_i)$为调度任务$\tau_i$的结束时间$f(c_i)$。
- 对于网络任务$m_i$来说$t(c_i)$为结束时间$d(c_i)$。


$$\begin{equation}
\begin{aligned}
R(C) & = t'-t\\
     & = t(c_n) - t(z)\\
     & = t(c_0) - t(z) + \sum_{i=1}^{n}(t(c_i) - t(c_{i-1}))\\
     & = t(c_0) - r(c_0) + r(c_0) - t(z) + \sum_{i=1}^{n}(t(c_i) - t(c_{i-1}))\\
     & = f(c_0) - t(z) + \sum_{i=1}^{n}(t(c_i) - t(c_{i-1}))\\
\end{aligned}
\end{equation}$$


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


**则最大反应时间根据公式（）为$\max\{f(c_0) - t(z) + \sum_{i=1}^{n}(t(c_i) - t(c_{i-1}))\}$

则最大反应时间根据公式（）为$\max\{t(c_0) - t(z) + \sum_{i=1}^{n}(t(c_i) - t(c_{i-1}))\}$

#### 第一部分上界
**Part one. $f(c_0)-t(z)$的上界**
Part one. $t(c_0)-t(z)$的上界


**引理1，The upper bound of $t(c_0)-t(z)$ is $t(c_0)-t(z) \le T$**
Lemma 1, $t(c_0)-t(z) \le T$.

**证明，根据定义（1），我们可以获得事件$c_0$的定义，即事件$c_0$必然是一个调度任务为$\tau_0$，所以根据定义（4）调度任务$\tau_0$的结束时间为$f(\tau_0)=f(c_0)$。继续使用定义（1），事件$c_0$（调度任务$\tau_0$）以T为周期捕捉外部事件z，所以当外部事件在t(z)开始触发之后最晚在一个周期T之内，它将被调度任务$\tau_0$捕捉。所以我们可以得到$f(c_0)-t(z)$的上界为T。


证明，根据定义（1），我们可以获得事件$c_1$的定义，即事件$c_1$必然是一个调度任务为$\tau_0$，所以根据定义（4）外部事件z的结束时间为$t(c_0)=r(c_1)=r(\tau_0)$。继续使用定义（1），事件$c_1$（调度任务$\tau_0$）以T为周期捕捉外部事件z，所以当外部事件在t(z)开始触发之后最晚在一个周期T之内，它将被调度任务$\tau_0$捕捉。所以我们可以得到$t(c_0)-t(z)$的上界为T。


# 背景
数据年龄，即数据从产生到当前时刻的时间跨度，对自动驾驶技术的影响是显著的。自动驾驶系统依赖于大量的数据来训练和优化其算法，以确保车辆能够安全、准确地行驶。以下是数据年龄对自动驾驶影响的几个方面：

1. **数据的时效性**：自动驾驶系统需要最新的数据来适应不断变化的道路条件、交通规则和环境特征。随着时间的推移，某些数据可能变得不再准确或不再适用，例如道路结构的变化、新的交通标志的添加等。因此，较老的数据可能无法反映当前的真实情况，影响自动驾驶系统的决策。

2. **数据的覆盖范围和多样性**：自动驾驶系统的有效性很大程度上取决于其训练数据的多样性和覆盖范围。如果数据集中包含的场景和情况较为有限，那么系统可能无法处理未见过的新情况。随着时间的推移，新的驾驶场景和挑战会出现，因此需要不断更新数据集以包含这些新情况。

3. **数据的标注准确性**：高质量的数据标注对于训练准确的自动驾驶模型至关重要。随着技术的进步和新算法的开发，数据标注的方法和标准可能会发生变化。较老的数据集可能使用过时的标注方法，这可能会影响模型的性能。

4. **数据的新鲜度**：自动驾驶系统需要处理实时数据来做出快速反应。信息年龄的概念在这里也适用，即数据从产生到被系统使用的时间差。数据越新鲜，系统做出的决策就越准确。

5. **技术进步**：随着自动驾驶技术的发展，新的传感器技术和数据处理方法不断涌现。较老的数据可能无法充分利用这些新技术的优势，从而限制了系统性能的提升。

6. **法律和伦理考量**：随着时间的推移，关于数据隐私和使用的法律和伦理标准可能会发生变化。这可能要求自动驾驶系统开发者更新他们的数据收集和处理流程，以符合新的法规要求。

综上所述，数据年龄对自动驾驶的影响是多方面的，涉及数据的时效性、覆盖范围、标注准确性、新鲜度以及与技术进步和法律伦理标准的一致性。为了保持自动驾驶系统的性能和安全性，需要定期更新和维护数据集，确保其反映最新的驾驶环境和条件。

# ATS
🔤LRQ和TBE都是为TSN中的异步整形而设计的，但在整形概念上有所不同。LRQ的原理是用稳定的传输/泄漏速率来整形业务流，无论进入流的模式如何，它都能够将突发流或任何模式的流转换为稳定、恒定和分布的输出流。另一方面，在TBE方法中，整形器以平均速率控制业务流，同时允许一定级别的突发，即，只要“桶”中存在足够数量的“令牌”，传输就可以立即开始。🔤

🔤在最近提出的ATS标准草案[5]中，包括了一种新的成形方法。基本上，该方法也来自漏桶算法，包括令牌桶的概念，用于限制流的输出速率，防止突发流沿路径传播。本地系统时钟函数确定每帧的可选择时间，这是帧排队并可用于传输选择的时间。所有达到其可选择时间的帧被选择用于以所分配的合格时间的升序传输。任何帧都可能在其到达时间和其可选择时间之间经历附加的非负处理延迟。🔤


系统的行为如下。每个流将数据包存放在队列中。队列以FIFO方式处理。每个令牌桶维护其令牌数量，应用流量整形令牌桶的规则。当一个帧到达队列的头部时，系统识别它属于哪个流。然后，它询问关联的令牌桶是否足够令牌。如果是，则应用规则TB 3转发该帧。如果没有，帧被延迟到补充添加设置足够令牌的时间点，如流量整形令牌桶。具体的一点是，队列的其余部分也被延迟（由于FIFO规则），即使下一帧在其自己的桶中有足够的令牌。请记住，如果总是最多有一个令牌桶处理队列头部，则在此期间，其他令牌桶将继续被补充。

# 相关工作
## 端到端
### 单ECU

> tangReactionTimeAnalysis2023

Reaction Time Analysis of Event-Triggered Processing Chains with Data Refreshing
许多实时系统通过一系列任务来处理和响应外部事件，并且对最大反应时间有限制，该时间描述了响应外部事件所需的时间。虽然处理链通常以周期性触发以采样传感器数据的采样任务开始，但链中的其他任务可以以两种不同的方式触发：本文提出了第三种触发链中处理任务的方法，即事件触发带数据刷新的方法，它结合了事件触发或时间触发方法的优点。作为主要的技术贡献，我们开发了技术，正式上限的最大反应时间，并分析比较它与现有的方法。最后，以合成工作负载为例进行了实验，以证明所提出的技术对系统性能的改善。

> Probabilistic

Probabilistic Reaction Time Analysis
在许多嵌入式系统中，例如，在汽车、航空电子或机器人领域，关键功能通过通信循环任务链来实现。为了确保这些系统的安全性和正确性，必须保证反应时间，也就是说，一个原因之间的延迟（例如，必须提供外部活动或传感器读数）和相应的效果。目前的方法集中在最大反应时间上，考虑到最坏情况下的系统行为。然而，在许多情况下，反应时间的概率保证是足够的。也就是说，提供反应以（至少）一定概率不超过一定阈值的保证就足够了。这项工作提供了这样的概率保证反应时间，考虑了两种类型的随机性：反应时间随机性和故障概率。据我们所知，这是第一个基于零星任务定义和分析因果链的概率反应时间的工作。

> durr2019end

End-to-End Timing Analysis of Sporadic Cause-Effect Chains in Distributed Systems
因果链用于定义依赖数据的任务的逻辑顺序，它独立于（周期性/零星性）任务的任务的执行顺序。分析与因果链相关的最坏情况下的端到端时序行为是嵌入式控制系统中的一个重要问题。例如，现代汽车系统的详细时序属性在AUTOSAR时序扩展中被指定。在本文中，我们提出了一个正式的端到端时序分析的分布式系统。我们考虑两个最重要的端到端时序语义，即，按钮操作延迟（称为最大反应时间）和最坏情况下的数据新鲜度（称为最大数据年龄）。我们的贡献是显着的，由于考虑到工作激活的零星行为，而在文献中的结果已大多限于周期性激活。证明策略显示了反应时间（分别为数据年龄）和立即向前（分别为向后）作业链之间的（以前未探索的）联系。我们的分析结果主导了分布式系统中的零星任务激活的最新技术状态，评估表明合成任务系统以及现实世界的汽车基准设置有明显的改善。

> bi2022efficient

Efficient Maximum Data Age Analysis for Cause-Effect Chains in Automotive Systems
汽车系统经常受到对某些因果链的最大数据年龄的严格要求。本文提出了一种形式化分析因果链最大值数据年龄的有效方法。特别地，我们将链的最大数据年龄的边界问题解耦为链中连续的倒数数据传播实例的释放间隔的边界问题。由于问题的解耦，可以在多项式时间内有效地获得相对较紧的数据年龄上界。实验表明，该方法能够以较低的计算代价实现较高的分析精度。

> 10.1145/3534879.3534893

Data-Age Analysis and Optimisation for Cause-Effect Chains in Automotive Control Systems
汽车控制系统通常对某些因果链有延迟要求。在实施和集成这些系统时，必须保证这些延迟要求，例如，通过应用最坏情况分析，考虑到所有不确定性和时间行为的有限可预测性。本文讨论了多速率分布式因果链的延迟分析，考虑了偏移同步周期任务的静态优先级抢先调度。我们特别关注数据年龄作为两个最常见的延迟语义的代表之一。我们的主要贡献是基于混合线性规划的优化，以选择设计参数（优先级，任务到处理器的映射，偏移），以最小化数据年龄。在我们的实验评估中，我们将我们的方法应用于两个真实世界的汽车用例。

> gunzel_et_al

On the Equivalence of Maximum Reaction Time and Maximum Data Age for Cause-Effect Chains
实时系统需要对时间约束的正式保证，不仅对于单个任务，对于数据传播也是如此。给定系统中数据传播路径的定时行为通常由其最大反应时间和最大数据寿命来描述。本文证明了它们是等价的。为了得到这一结论，引入了划分的作业链，它由一个直接向前和一个立即向后的作业链组成。这种划分的作业链被证明能够以通用的方式描述最大反应时间和最大数据年龄。这种通用的描述不仅显示了最大反应时间和最大数据年龄的等价性，而且还可以被利用来显著地加速这种计算。特别是，基于汽车基准的合成任务集的加速可达1600。由于只做了很少的非限制性假设，最大数据年龄和最大反应时间的等价性对于几乎任何调度机制都成立，甚至对于不符合典型的周期性或零星任务模型的任务也是如此。这一观察结果得到了ROS2导航系统模拟的支持。


> 7461359
> 18

在为时序分析的软件组件建模时，我们通常会遇到导致优先关系的任务的功能链。由于这些任务链代表功能依赖的操作序列，因此在实时系统中，通常需要它们的端到端延迟。当映射到软件组件时，功能链通常会导致通信线程。由于调度的是线程而不是任务，因此会出现可用于响应时间分析的特定任务链属性。作为核心贡献，本文提出了一种适用于静态优先抢占系统中这类任务链的忙窗口分析方法。我们使用合成测试用例和显示比当前方法严格得多的响应时间界限的实际汽车用例，在组合性能分析中评估了扩展忙窗口分析。

> recursiveapproach
> 19

本文提出了一种用于推导应用程序的端到端延迟的方法，涉及在异构多处理器系统中的多个组件的处理。该过程通过精确捕获资源时序和避免一次性付费突发问题，精确捕获应用程序路径上多个事件的流水线和并行处理。支持任意事件模式的时间触发和事件触发任务激活方案。与以前的工作相反，复杂的应用程序拓扑是允许的：该方法考虑了路径分叉和合并，以及功能循环和非功能循环依赖。所提出的方法的基础是一个迭代组合性能分析，它允许计算这样的系统中的事件模型。基于事件模型和局部性能抽象，我们提出了一种递归方法来推导最坏情况下的延迟。


### 多ECU

> feiertagCompositionalFrameworkEndtoend

A Compositional Framework for End-to-End Path Delay Calculation of Automotive Systems under Different Path Semantics
虽然在过去的四十年里，实时系统社区已经开发出了非常有价值的方法来处理器和总线的时序和调度分析，但另一个非常相关的问题只得到了有限的关注：端到端时序。大多数已知的工作对特定的任务激活和通信机制提出了限制，例如沿着事件触发路径的无边界FIFO队列。然而，在汽车系统中，寄存器缓冲器和周期性采样更为常见。在本文中，我们提出了一个正式的框架计算端到端延迟在多速率，寄存器为基础的系统。我们表明，在采样系统中，分析必须区分端到端定时的不同“意义”。例如，控制工程师最关心的是“数据的最大年龄”，即最新可能信号的最坏情况定时。在人体电子学中，“第一反应”是关键，即最早可能信号的最坏情况定时。由于两种情况的分析可能不同，因此必须明确区分。本文给出了示例，并介绍了这种端到端时序语义的概念，从而考虑了在汽车执行平台中通常发现的特定机制和影响，例如过采样和欠采样以及抖动。

> gunzel2021timing

Timing Analysis of Asynchronized Distributed Cause-Effect Chains
实时系统不仅需要对单个任务而且数据传播路径的时序约束进行正式保证。因果链描述了多个任务之间的数据流，例如，从传感器到执行器，与任务的优先顺序无关。在本文中，我们提供了一个端到端的时序分析，考虑了最大反应时间（数据处理持续时间）和最大数据年龄（最坏情况数据新鲜度）的分布式系统的因果链的周期性任务激活。在一个局部电子控制单元（ECU）上，当周期性任务的执行时间固定时，我们给出了如何计算精确的局部（最坏情况）端到端延迟。我们进一步扩展我们的分析，通过结合局部结果的全球化系统。在整个合成数据的基础上的汽车基准以及随机参数，我们表明，我们的分析结果提高了国家的最先进的周期性任务激活。

> Mechanisms

Timing Analysis of Cause-Effect Chains with Heterogeneous Communication Mechanisms
汽车系统中的软件应用程序由通信实时任务组成，由因果链描述。为保证功能正确性，必须验证因果链的端到端定时延迟。端到端延迟的分析在很大程度上取决于通信方法。隐式通信在AUTOSAR时序规范中进行了标准化，确保了数据的一致性。为了从任务的实际执行行为中抽象出通信，提出了逻辑执行时间(LET)。然而，LET提供的确定性是以端到端延迟增加为代价的。在工业级系统中，使用LET和隐式通信的周期性和零星任务共存。因此，端到端延迟分析应该涵盖这种不同的因果链。在这项工作中，我们提出了第一个用于因果链的端到端分析的形式分析框架，该框架允许不同类型的重复任务和不同的通信机制，即(I)零星任务和周期性任务的混合设置，(Ii)通过LET和隐含通信机制的混合设置进行通信。在这方面，我们揭示了同质分析所依据的原则，并讨论了如何将这些原则转移到异质案例中。特别是，我们将因果链分割成同质的部分，这导致了三种不同的分析：一种基线方法，一种直接使用同质结果的方法，以及一种减少对沟通方式变化的悲观情绪的方法。我们的评估表明，对于一些系统，两种更复杂的方法的性能明显优于基线，而对于其他系统，基线已经令人满意。

>characterization

End‑to‑end latency characterization of task communication models for automotive systems
在汽车领域中，历史上已经采用了不同的通信模型，以允许并发任务在共享存储系统上协调、交互和同步，以实现复杂功能，同时确保数据一致性和/或时间确定性。在这个意义上，大多数汽车操作系统提供基于存储器共享范例的任务间通信和同步机制，其中由一个任务修改的变量也可以被其他任务并发访问。当初始事件的影响通过写入/读取共享变量的任务序列传播到激励信号时，就产生了所谓的“效应链”。汽车应用的控制算法的响应性、性能和稳定性通常取决于所选效应链的传播延迟。根据所采用的通信模型，效应链的传播延迟可能会显著不同，由此产生的开销和内存占用也可能不同。本文探讨了工业汽车系统中广泛采用的三种通信模型，即显式、隐式和逻辑执行时间(LET)之间的权衡。对AUTOSAR模型中规定的混合抢占配置后调度的任务进行了时序和可调度性分析。然后提出了端到端延迟特性，推导出每个考虑模型下效应链的不同延迟度量。将结果与一个由汽车发动机控制系统组成的工业案例进行了比较。

> Matthias

End-to-end timing analysis of cause-eﬀect chains in automotive embedded systems
汽车嵌入式系统受到严格的时序要求，需要验证。这些系统中最复杂的时序要求之一是数据年龄约束。此约束是在因果链上指定的，并限制数据通过链传播的最长时间。因果链中的任务可能有不同的激活模式和不同的周期，这会引入过度和不足的采样效应，这额外加剧了链的端到端时序分析。此外，在不同的开发阶段（从软件架构的建模到软件实现）可用的时序信息的级别变化很大，完整的时序信息仅在实现阶段可用。这种不确定性和有限的时序信息会限制这些链的端到端时序分析。在本文中，我们提出了基于不同层次的系统信息计算端到端时延的方法。进一步考虑了不同通信语义的特性，从而使时序分析的整个开发过程的异构软件系统。通过大量的实验对所提出的方法进行了评价。作为概念的验证，一个工业案例研究证明了所提出的方法在实践开发过程中的适用性。
## TSN

> HOUTAN2023102911

Supporting end-to-end data propagation delay analysis for TSN-based distributed vehicular embedded systems
在本文中，我们发现，现有的分布式嵌入式系统端到端数据传播延迟分析可以计算出悲观（高估）分析结果时，节点同步。这尤其是时间敏感网络（TSN）中的调度业务（ST）类的情况，其根据IEEE 802.1Qbv标准离线调度并且根据IEEE 802.1AS标准同步节点。我们提出了一个综合的分布式嵌入式系统模型，该模型综合了上述各方面以及TSN中的所有业务类别。我们扩展了分析，以支持ECU之间的同步和非同步以及网络上的离线调度。扩展分析现在可以用于分析TSN中的所有业务类别，当节点同步时，不会引入任何悲观的分析结果。我们评估了所提出的模型和扩展分析的车辆工业用例。

> Hybrid

Hybrid Scheduling of Tasks and Messages for TSN-Based Avionics Systems
时间敏感网络（TSN）由于其具有确定性通信能力而被广泛认为是航空电子系统中最有前途的组网方案。在这种基于TSN的航空电子系统中，网络调度使得消息的及时传输成为可能。然而，这不足以满足函数的实时性要求，因为函数涉及多个任务的链式执行，其中消息仅用于任务间通信。为了提高基于TSN的航空电子系统的功能，调度应从网络级扩展到系统级，以协调消息传输和任务执行。因此，如何有效地实现任务和消息的混合调度成为一个重要的问题。本文针对基于Tn的航空电子系统，构建了一种新的混合调度框架，该框架由系统一致性约束、在环函数时延计算和两种混合调度算法组成。一致性约束限制了混合调度中消息和任务的意外交互，保证了系统级的确定性。函数时延是任务链的端到端时延，其计算为混合调度提供了反应时延和年龄时延两个度量指标的优化目标。调度算法通过消息动态排序和任务消息重调度的增量策略提高了求解效率和功能性能。实验结果表明，与已有的考虑消息对任务依赖性的调度算法相比，本文的算法即使在数百个函数的情况下，也能完成复杂的大型系统的调度，并能将函数的反应延迟和年龄延迟分别减少69%和37%。

> arestova2022itans

ITANS: Incremental Task and Network Scheduling for Time-Sensitive Networks
最近的趋势，如汽车领域的自动驾驶和工厂自动化的数字化，给实时系统的设计者带来了新的挑战。这些挑战是由于数据量的增加和功能的加强互连而产生的。对于分布式安全关键系统，这种进展的影响是：任务之间需要交换的数据越多，涉及的功能越多，以所谓的因果链组织的具有优先约束的任务调度的复杂性就会增加。特别是当数据必须通过基于以太网的通信网络传输时，必须确保在不同终端设备上运行的任务和网络流之间的协调，以满足严格的端到端截止日期。在这项工作中，我们提出了一种增量启发式方法，该方法计算时间敏感网络中由多速率任务和网络流组成的分布式和数据相关的因果链的调度。一方面，我们为任务和网络流提供了一个通用的任务模型。另一方面，我们引入了最早和最晚开始时间的概念，以加快解的发现过程，并在早期阶段丢弃不可行解。对于具有随机数据依赖关系的合成网络拓扑，在严格的端到端截止期下，我们的算法能够在平均几秒钟内解决大型问题。对于多速率因果链，我们已经获得了很高的成功率，对于齐次或调和链，我们的结果甚至更好。我们的方法也显示了同源因果链的低抖动。

> Linux

IEEE 802.1Qcr Asynchronous Trafﬁc Shaping with Linux Trafﬁc Control
由IEEE 802.1工作组引入的广泛的TSN标准提供了低延迟调度和整形以及有保证的分组传输。直到最近，它们还依赖于所有网络节点之间的同步时钟。然而，新引入的ATS标准取消了对具有实时要求的软件的依赖，并将TSN引入到更广泛的社区。本文描述了使用Linux TC工具实现ATS标准的需求，用于流量整形和调度。虽然目前不可能实现LRQ队列或Paternoster调度器与TC命令，将给出一个具有TBE队列的UBS算法模型。

> co-design

Fixed-Priority Scheduling and Controller Co-Design for Time-Sensitive Networks
时间敏感网络(TSN)是在IEEE 802.1工作组下开发的一组标准化通信协议。TSN旨在支持基于分布式配置的网络调度的确定性通信。它被广泛认为是未来高度自动化驾驶的车载网络解决方案，其中对定时保证的要求与高通信带宽的要求并存。在这项工作中，我们研究了周期控制包和非控制包的设置，分别具有隐式和任意截止期。针对802.1Qbv交换机中的FIFO(先进先出)队列在最坏的情况下会产生较长的时延，使得控制任务无法达到较短的采样周期，从而阻碍控制性能的优化，我们利用TSN的门控特性，提出了第一种固定优先级调度(FPS)方法。在这种情况下，我们开发了一种更细粒度的帧级响应时间分析，它提供了比传统的数据包级分析更严格的界限。在FPS和上述分析的基础上，我们建立了一个协同设计优化问题来确定实时控制器的采样周期和极点，目标是最小化调整时间，同时满足可调度性约束。

> jiangPropertiesLengthRate2021

Some Properties of Length Rate Quotient Shapers
长度速率商（LRQ）是第一个交织整形算法，这是一个新的概念，为流聚合提供每流整形而没有每流排队。时间敏感网络（TSN）和确定性网络（DetNet）都采用了这个概念。交织整形的一个吸引人的特性是，当交织整形器被附加到FIFO系统时，它不会增加系统的最坏情况延迟。基于这种"免费整形"属性，已经引入了一种方法来提供有限的端到端延迟。具体地，在节点的每个输出链路处，基于类的聚合调度与每个输入链路和每个类的交织整形器一起使用，并且交织整形器将每个流重新整形到其初始流量约束。在本文中，我们研究了交错LRQ整形器的其他特性，特别是作为独立元件。此外，在每流设置下，我们还研究了基于每流LRQ的流聚合，并推导了其性质。该分析直接关注网络中的操作的时序，如整形和调度。这种基于时间的方法可以在保证速率（GR）服务器模型中找到，更一般地在网络演算的最大加分支中找到。利用推导出的性质，我们不仅表明了一个改进的端到端延迟边界可以得到当前的方法，而且还证明了新的方法可以设计。推导并比较了这三种方法的端到端时延界。作为亮点，这两种新方法在分配（整形/调度）队列时不需要不同的节点架构，这意味着它们可以很容易地适应TSN和DetNet中的使用。这与LRQ的衍生属性一起，为提供TSN/DetNet服务质量提供了新的见解。

> da152c1e658441acb201ff161b89e8d4

Insight into the IEEE 802.1 Qcr Asynchronous Traﬃc Shaping in Time Sensitive Network
TSN是一种基于IEEE802体系结构的延迟关键帧传输的有吸引力的解决方案。TSN中的流量调度和整形旨在实现有限的低延迟和零拥塞损失。然而，最广泛的解决方案（即时间感知整形器）需要网络范围的精确时钟基准，并且仅针对循环流量。本文重点研究了将整形算法应用于任意流且不需要时钟参考的ATS的性能评估。提出了模拟评估和比较。收集端到端时延、缓冲器使用率和帧丢失率等参数来评估整形性能。结果表明，ATS在不使用同步机制的情况下实现了有效的流量整形和交换，而使用这些特定算法存在明显的折衷。

> 8681083

Performance Comparison of IEEE 802.1 TSN Time Aware Shaper (TAS) and Asynchronous Traffic Shaper (ATS)
IEEE 802.1时间敏感网络工作组最近标准化了时间感知整形器（TAS）。TAS提供了确定性的延迟保证，但要求所有网络交换机都有严格的时间同步。本文详细评估了典型工业控制环网随机（零星）和周期性业务的TAS的平均和最大分组延迟和分组丢失。我们提出并评估自适应带宽共享和自适应时隙窗口机制，使TAS自适应流量波动。本文进一步评估异步流量整形器（ATS），它已被提出提供低延迟的网络服务，而不需要在网络节点的时间同步。我们的评估表明，适当配置的TAS，例如，精确和精确的门控调度通常实现了对于零星和周期性业务的指定等待时间界限。相比之下，ATS对于零星流量的性能相对较好；但对于中等到高负载的周期性流量则会有困难。