---
created: 2023-11-17T19:14
updated: 2024-07-10T00:13
tags:
  - 笔记
  - 笔记/idea
  - 笔记/永久笔记
---

# 方法

  
---
## 1、 R+T
### Period Optimization for Hard Real-time Distributed Automotive Systems
2007 DAC
Abhijit Davare1, Qi Zhu1, Marco Di Natale

> [Period Optimization for Hard Real-time Distributed Automotive Systems](../../../03-research/02-因果链/Period%20Optimization%20for%20Hard%20Real-time%20Distributed%20Automotive%20Systems.md)

#端到端/任务类型/周期任务   #端到端/通信类型/CAN总线   #端到端/触发方式/TT

#### 最坏响应时间（worst case response time）
**任务**：激活（activation）到其完成的最大时间间隔，
**消息**：到达目的地的最大时间间隔。
响应时间包括其自身的时间要求以及等待访问资源所花费的时间。

#### 端到端延迟
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202310261629695.png)

通过将最坏情况响应时间和路径中所有对象的周期相加，可以计算每条路径的最坏情况端到端延迟：
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202310261638753.png)
> 在最坏的情况下，如图2所示，外部事件在任务1的第一个实例完成后立即到达。数据将由任务在其下一个实例上读取，并将在其最坏情况响应时间之后产生结果，即外部事件到达后的T1+R1时间单位。

^cc7877
#### 响应时间（单个任务）

^b643dd

**任务**：
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202310261657860.png)**消息**：
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202310261658362.png)

#### 存在问题

这种分析端到端延迟的方法是悲观的，因为允许任务在最坏的情况下释放两个连续的作业。然而，如果任务集中的任务是严格周期性的，并且它们的第一个任务的发布时间固定（也称为阶段或偏移），则这可能是不可能的。

---
## 2、max{R，R[P]+T}

### End-to-End Timing Analysis of Sporadic Cause-Effect Chains in Distributed Systems
2019 Transactions on Embedded Computing Systems
MARCO DÜRR, GEORG VON DER BRÜGGEN, KUAN-HSUN CHEN, and JIAN-JIA CHEN, TU Dortmund University

> [End-to-End Timing Analysis of Sporadic Cause-Effect Chains in Distributed Systems](../../../03-research/02-因果链/End-to-End%20Timing%20Analysis%20of%20Sporadic%20Cause-Effect%20Chains%20in%20Distributed%20Systems.md)

#端到端/任务类型/周期任务   #端到端/模型/向前向后作业链   #端到端/通信类型/CAN总线   #端到端/触发方式/TT  #端到端/通信方式/隐式

#### 端到端语义
**端到端语义**：最大反应时间，最大数据年龄
**反应时间**：假设外部活动在时间t更新寄存器。在t时刻开始的最大时间间隔长度是多少，**直到因果链中的每个任务都处理这个更新**?最大反应时间是人体电子学中分析<font color='green'>按键到动作延迟</font>的首选。
**数据年龄**：因果链中**第一个任务读取数据**的时刻与因果链中最**后一个任务完成**处理数据的时刻之间的时间间隔长度?在<font color='green'>控制工程中计算时延</font>需要用到最大数据年龄。
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202310262146027.png)

#### 任务模型
${\tau_i=(C_i,T^{min}_i,T^{max}_i)}$ ： WCET，最小/最大到达间隔
$a$：到达时间（arrival time）
$\delta$：开始时间（starting time）
$f$：结束时间（finishing time）
固定优先级，可以抢占也可以不抢占
隐式通信，开始读，结束写
> 隐式和LET对延迟的区别，
#### 响应时间（单个任务）
> 同上任务，[方法1](#^b643dd)
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202310262057956.png)

通过TDA，非抢占情况
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202310262057475.png)
我们通过采取以下假设来抽象该通信：1)零星地或周期性地释放τc并且传输所需的数据和可能的一些附加信息，例如，可以在一条消息中传输去往一组任务的多个值；2)当τ1的作业完成时，它将必需的值写入类似于一个核中的通信的缓冲器中，并且τc的每个作业在其被初始化时读取当前值；以及3)在τc的作业完成之后，τ2可以以类似于它将读取由同一处理器上的任务产生的值的方式来直接读取更新值。
#### 最坏向前/向后作业链
**向前**：
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202310262131641.png)
**向后**：
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202310262133626.png)

> 任务链中，最后一个任务的结束时间f   -   第一个任务的到达时间a

#### 最大反应时间
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202310262147939.png)

向前作业链最大长度+因果链第一个任务的最大到达时间间隔
> 其他最大反应时间分析中都考虑因果链第一个任务的最大到达间隔
> 参考[方法1](#^cc7877)

**单ECU**
对于WCFC考虑两种情况[5.1最长反应时间](../../../03-research/02-因果链/End-to-End%20Timing%20Analysis%20of%20Sporadic%20Cause-Effect%20Chains%20in%20Distributed%20Systems.md#5.1最长反应时间)
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202310262203668.png)
可能由于过采样或者欠采样

**多ECU**
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202310262215796.png)

> 对后续的每段时间求上界   =   后一个任务的到达时间  -  前一个任务的到达时间
> 如果前一个任务i，优先级高于，后一个任务i+1。r小于ai，否则r被抢占
> 前后两个任务在不同ECU执行，R1+T2

**反应时间上界分析拆分成：第一个任务最大到达间隔（和前一个任务间）   +   第一个任务的最差响应时间（f-a）  +  其他每两个任务求和累加**![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202310262238264.png)
>  最大反应时间，需要考虑第一个任务之前的情况
>  任务链长度的上界   =   第一个任务的最差响应时间（f-a）  +  其他每两个任务求和累加
>  ![](https://gcore.jsdelivr.net/gh/wsm6636/pic/202310262247902.png)

#### 最大数据年龄


![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202310262250629.png)


![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202310262258499.png)
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202310262259489.png)
> 最大数据年龄的上界，就是任务链长度上界
> i优先级大于i+1，r大于ai+1。否则i+1被抢占，所以上界为T
>

#### 值得注意的条件
1、任务WCRT不超过$T^{min}$
2、抢占，固定优先级（所以）
3、Ji是不早于f（Ji-1）的第一个作业，ai不大于fi-1.
4、$T^{max}$有界
#### 实验
有通信任务，设定和其他任务一样，采用一样的分析
间隔采用前一个任务的间隔
两条任务链中插入一个通讯任务

## 3、切割
### Timing Analysis of Asynchronized Distributed Cause-Effect Chains
2021 RTAS
Mario Günzel, Kuan-Hsun Chen, Niklas Ueter, Georg von der Brüggen,Marco Dürr and Jian-Jia Chen

> [Timing Analysis of Asynchronized Distributed Cause-Effect Chains](../../../03-research/02-因果链/Timing%20Analysis%20of%20Asynchronized%20Distributed%20Cause-Effect%20Chains.md)

#端到端/通信方式/隐式  #端到端/触发方式/TT  #端到端/通信类型/CAN总线     #端到端/模型/超周期

作业链和任务模型同上[2、max{R，R[P]+T}](#2、max{R，R[P]+T})
固定优先级，抢占

**超周期：不同周期的任务，他们周期的最小公倍数。在超周期内所有任务都能执行完**
### 模型扩展
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202310271055934.png)
添加外部活动和驱动事件
最大反应时间衡量从外部活动到数据完全由系统处理的时刻的时间
最大数据年龄测量从数据采样到基于该采样的激励的时间
> 
### 切割
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202310292147831.png)


![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202310292203741.png)

### 通信

![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202310292220753.png)
> 拆分多个ECU的因果链为：任务-通信-任务-通信-任务
>
> 通信任务
>
> 上界=任务因果链上界+通信任务因果链上界

![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202311181548101.png)


![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202312251516442.png)

最大反应时间衡量从外部活动到数据完全由系统处理的时刻的时间。
最大数据年龄测量从数据采样到基于该采样的激励的时间。在最坏的情况下，基于在特定时间处理的数据的激励直接发生在下一个处理的事件之前。



## 4、对比LET与隐式
### Timing Analysis of Cause-Effect Chains with Heterogeneous Communication Mechanisms
2023RTNS
Mario Günzel

> [Timing Analysis of Cause-Effect Chains with Heterogeneous Communication Mechanisms](../../../03-research/02-因果链/Timing%20Analysis%20of%20Cause-Effect%20Chains%20with%20Heterogeneous%20Communication%20Mechanisms.md)

**方法同2、3一样
当链中同时存在LET和隐式时，不同的拆分方式具有不同的上界**

## 5、资源$\beta$  
### Reaction Time Analysis of Event-Triggered Processing Chains with Data Refreshing
2023DAC
Yue Tang1, Nan Guan2, Xu Jiang1, Zheng Dong3, Wang Yi1,4

> [Reaction Time Analysis of Event-Triggered Processing Chains with Data Refreshing](../../../03-research/02-因果链/Reaction%20Time%20Analysis%20of%20Event-Triggered%20Processing%20Chains%20with%20Data%20Refreshing.md)

 ==ET事件触发机制  +  TT时间触发缓冲机制（固定大小缓冲区，新数据覆盖旧数据）==
 
#端到端/触发方式/TT   #端到端/假设条件/单核  

资源服务曲线：系统可以在某短时间内提供的处理资源（处理时间需要系统提供的资源比如CPU时间等）

![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202310292320046.png)


#### 最大反应时间
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202310292319175.png)


![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202310292318310.png)
> 同样拆分任务链，
> 第一个任务与外部事件
> 后续任务以结束时间计算，并使用资源服务曲线求上界时间

1. **第一部分**
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202310292321228.png)
2. **第二部分**
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202310292321644.png)
 $\bar{\beta^l_i}$ 是$\beta^l_i$的伪逆函数
> ![](https://gcore.jsdelivr.net/gh/wsm6636/pic/202310292324202.png)

**2.1 tci不被重写**
	DLY：非跳过作业 Ji 经历的最大延迟的上限
	
**2.2 tci重写**

**P1。 在$[t(c_i)，r(c_i))$期间不存在有未使用的可用资源但没有任务τi的未完成作业的时刻。**

**P2。在$[t(Ci)，f(Ci))$期间执行的τi的最大工作量是(|Bi|+1)·e(τi)的上界。**

(1)在t(Ci)处执行的作业所产生的工作负载。**e(τi)**
(2)在$[t(Ci)，f(Ci))$期间要执行的、由其对应的数据帧在t(Ci)+ε处的缓冲区Bi中的作业产生的最大工作量，其中t(Ci)+ε是紧接在t(Ci)之后的时刻，当由ci−1产生的数据被写入Bi时。**(Bi−1)·e(τi)**
(3)在(t(Ci)，r(Ci)]期间释放的工作产生的工作量。**e(τi)**

>$[t(Ci)，f(Ci))$期间内，系统能提供的处理时间（资源），就是$\beta^l_i([t(Ci)，f(Ci)))=(|Bi|+1)·e(τi)$
>通过P1可以知道，期间内所有的资源都被用于处理任务产生的工作量（工作负载）
>所以处理这么多工作负载用的时间就是$\bar{\beta^l_i}(|Bi|+1)·e(τi))$

## 6、 QBV







# 模型

## 1、QBV

![image-20230703220547385](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307211402870.png)



![image-20230704205025351](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307042050488.png)

系统S由一组表示为Γ的事务、一组表示为ε的终端站和一组表示为Ν的网络组成。该系统由以下元组正式表示。![image-20230704205803953](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307211401919.png)
事务(表示为Γ)表示由两个或多个任务组成的分布式任务链的模型。任务链可以在一个终端站内执行；或者不同终端站的任务可以通过网络中的一个或多个消息(Ν)彼此通信。

任务的属性由等式中的元组指定。(5)。

![image-20230704210216196](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307211402831.png)

其中，Cijk是任务的WCET，Tijk是任务的周期，Pijk是任务的优先级，Jijk是任务的释放抖动。此外，Oijk表示任务的偏移量。
任务τijk(表示为αijk(N))的第n个实例的激活时间（activation time）。(6)![image-20230704210401748](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307042104812.png)
定义消息属性的属性集。![image-20230704211253751](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307211402756.png)

传输模型
==事务的第一个任务读取的数据被视为事务的输入，链的最后一个任务写入的数据对应于事务的输出。==传输的周期由TJ表示。请注意，此模型将==消息数量限制为每个事务一条==。


![image-20230704211913295](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307211402713.png)

![image-20230704212115678](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307042121780.png)

发送方和接收方终端站是同步，收器任务轮询TSN网络以从消息中读取数据。
> ![image-20230704210401748](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307042104812.png)

非同步网络中，旦消息在网络上可用，接收者任务就获得读访问权限
> ![image-20230704224646155](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307211402179.png)



**ST**
每个ST消息在其从发送器(写入器)任务到接收器(读取器)任务的路由内的每条链路上具有确定性调度

根据可行的TSN调度，考虑沿着消息的路由的每条链路的偏移量来确定ST消息的实例对于读取器任务的实例的可达性。在这种情况下，**找到可达定时路径的现有约束要求跟踪ST消息的路由中的所有跳，并考虑每条链路的ST消息的激活时间。**
端到端分析之前，网络内的ST帧的激活和到达是已知的
![image-20230705220247315](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307211402335.png)
ST消息的整个路径建模为单独的任务 = 网络任务
> 因为ST是确定的

**非ST**
在非ST消息的情况下，消息在发送方和接收方任务之间的最后一条链路上的激活时间取决于发送方任务的响应时间和它自己在先前链路上的响应时间

![image-20230705225559818](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307211402207.png)

> 和向前/向后作业链一样，
>
> 反应时间=最后一个任务的释放+最后一个任务的WCRT-第一个任务之前一个任务的释放
>
> 数据年龄=最后一个任务的释放+最后一个任务的WCRT-第一个任务的释放

![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202312252221736.png)
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202312252221448.png)


![image-20230705231202917](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307211402118.png)
> 每条任务链上，有五个任务，源节点两个（计算+发送），网络任务，目的节点两个（接收+计算）

![image-20230705230203178](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307052302292.png)
![image-20230705230549888](https://gcore.jsdelivr.net/gh/wsm6636/pic/202307211402191.png)
> R的分析在31,33,34
## 2、ROS



## 3、控制



## 总结
端到端延迟一般都是，最后一个任务的结束时间 - 第一个任务的释放时间
有的论文会加上Z，外部事件action和激励驱动时间

延迟会拆成几部分分析，
1. 采样和链上第一个任务
2. 后续每两个任务之间
	1. 以达到（释放）时间区分
		1. [P]：分别讨论前后两个任务释放时间的顺序，以及在固定优先级可抢占的情况下优先级大小的影响
		2. 切割：
	2. 以结束时间区分
		1. 资源曲线
3. 

**设定 
后一个任务读数据时刻，一定在前一个任务写数据时刻之后
下一个实例不能在t + T min i时刻之前被释放**

# ATS

异步流量整形。传入流量的速率，数据包的传输资格时间。一旦到达资格时间，允许发送数据。
资格时间的确定：承诺信息速率（committed information rate），流量限制的平均传出数据速率。承诺的突发大小（committed burst size）允许临时将数据速率增加到限制以上。cir控制整形器允许通过的整体速率，cbs控制整形器能容忍的突发程度。

本质上就是在描述单速令牌桶的整形机制。不过，ATS的优点在于，通过在报文入队时运行算法，给报文分配一个允许调度时间（EligibilityTime）。这样，在传输选择机制进行判断的时候，不需要再重新执行令牌桶的计算。

![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202311082210972.png)
### arrival time
帧的到达时间，以秒为单位。整个帧的到达的时刻。
### AssignAndProceed(帧，合格时间)
将合格时间分配给帧，以便由传输选择(8.6.8.5)进行进一步处理。
assignedEligibilityTime = eligibilityTime + ClockOffsetMin + ProcessingDelayMax
### BucketEmptyTime
桶空闲时间，以秒为单位
BucketEmptyTime变量的初始化时间早于过去提交的突发大小/提交的信息速率。
初始化后，令牌桶中的令牌数相当于CommittedBurstSize参数。
### bucketFullTime
桶满时间。令牌桶中的令牌数等于CommittedBurstSize参数的时刻，以秒为单位。
### CommittedBurstSize
提交突发大小，令牌桶的最大令牌容量
ATS调度程序实例的承诺突发大小，单位为bit(8.6.5.6)。
帧从桶中移除的令牌数等于帧的长度
### CommittedInformationRate
提交信息率，令牌桶中重新填充令牌的速率。直到达到令牌桶的最大令牌容量。
ATS调度程序实例的承诺信息速率，以bit/秒(8.6.5.6)为单位。
### Discard(frame)
丢弃(帧)
此过程丢弃该帧并增加相关接收端口(8.6.5.6)的DiscardedFraMesCount计数器。该过程仅在异常情况下调用(例如，连接的上游系统行为不正常)。
### eligibilityTime
合格时间
帧的合格时间，而不考虑转发过程的实施特定设备内部计时属性。
### emptyToFullDuration
空到满持续时间
累积与CommittedBurstSize（承诺突发大小。令牌桶的最大令牌容量）参数相等的令牌数所需的持续时间（秒）。
### GroupEligibilityTime
组合格时间
一个状态变量，包含来自前一帧的合格时间的最近值，由同一ATS调度程序组中的任何ATS调度程序实例处理，以秒为单位。GroupEligibilityTime变量初始化为ATS调度器时钟所感知的当前时间之前或等于当前时间的时间。
组合格时间是指从同一类中的整形器处理的前一帧开始的最近合格时间。
### length(frame)
长度(帧)
帧的长度，包括所有与介质相关的开销(12.4.2.2)，单位为bit。
### lengthRecoveryDuration
长度恢复持续时间。
累积相当于长度(帧)的令牌数量所需的持续时间，以秒为单位。
### MaxResidenceTime
最大驻留时间
单位为纳秒(8.6.5.6)。该参数限制帧可以驻留在网桥中的持续时间。
帧仅在最大驻留时间内有效。
### schedulerEligibilityTime
调度资格时间
令牌桶中的令牌数至少等于到达值时间(帧)的时刻，以秒为单位。


![image.png](https://cdn.jsdelivr.net/gh/wsm6636/pic/202311171616781.png)



----

整形队列需要遵循队列分配规则，直接引用自[8]：
<span style="color:black;background:#d3f8b6 !important;">QAR1：不允许将来自不同发射机的帧存储在相同的整形队列中。</span>
<span style="color:black;background:#d3f8b6 !important;">QAR2：来自相同发送器但不属于发送器中相同优先级的帧，不允许被存储在相同的整形队列中。</span>
<span style="color:black;background:#d3f8b6 !important;">QAR3：来自相同发送器的帧在发送器中具有相同的优先级，但在接收器中不属于相同的优先级，不允许将其存储在相同的整形队列中。</span>

根据排队方案，整形队列的最小数目受设备中的端口数的限制。N端口节点需要至少n个−1强制队列来满足QAR1方案。
方案QAR2和QAR3基本上实现了基于优先级的流分离，使得具有较高优先级的帧可以绕过较低优先级的帧，从而确保高优先级流的传输时延不受干扰流的影响。队列的隔离有利于防止恶意流的传播，保证普通流不受影响，还可以根据管理要求灵活操作，如流阻塞或发送器阻塞。考虑到异步整形，由于帧队列的分类，整形器能够基于更大规模的队列内帧状态进行更细粒度的操作。因此，ATS可以减少对时间敏感的帧的排队时间，实现快速转发。
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202311081558754.png)

![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202311082105967.png)

## 整形队列算法分为LRQ和TBE
## LRQ 

LRQ通过将分组的<span style="color:black;background:#d3f8b6 !important;">合格时间计算为“先前传输的帧的大小与特定类别的预留链路速率之间的商”</span>来忽略具有稳定的传输/泄漏速率的传入流模式和形状。

间戳ti存储流fi的下一个分组的合格时间。在p的输出时间，时间戳ti等于商(L/rˆi)。在p之后的流fi的下一个分组至少被延迟，直到tnow到达ti。这强制了漏桶约束，其中将Fi的a(先验已知)最大分组长度Lˆi用作突发(bˆi=Lˆi)。
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202311072259321.png)





## TBE
TBE允许一定程度的突发流量传输，同时保持平均速率，它使用“桶”中“令牌”的累积时间来计算数据包的合格时间。与 LRQ 相比，它可以在较轻的负载下更好地利用给定带宽。

时间戳ti存储分组p的输出时间。同时更新存储桶级别bi。变量bi可以解释为bˆi的“剩余突发性”。如果当前HQ包p的长度为L的fi将超过bi，则包p被延迟，直到桶级别bi恢复到L时它变得合格。
![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202311072312405.png)



# note

方法：资源
模型：QBV（最后一个a - 第一个a）
协议：TBE，==为啥？== 因为标准用的这个
存在什么问题：套用QBV的

## 分析一跳的延迟
FH：来自发送优先级高于FI的伪队列QH的所有流
FL：来自发送优先级低于FI的伪队列QL的所有流
FC(i)：在发送伪队列QS中与FI竞争的所有流，不包括FI本身
Fi：来自QS的所有流共享FI的接收队列QI，包括FI

> H，优先级比fi高
> L，优先级比fi低
> ci，优先级和fi一样的干扰（不包括fi本身）
> i，接收队列的所有流

![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202312261001254.png)


![image.png](https://gcore.jsdelivr.net/gh/wsm6636/pic/202312252207793.png)
last to last 数据年龄
first to first 反应时间
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