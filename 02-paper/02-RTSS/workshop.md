---
created: 2023-09-12T09:56
updated: 2024-05-07T22:28
tags:
  - 笔记
  - 笔记/paper
  - 笔记/永久笔记
---

# RTSS workshop

然而，Linux 并不是为控制应用而设计的，本身就缺乏对实时控制的支持。虽然 PREEMPT\_RT 补丁使 Linux 能够支持实时任务的实时调度，有效缩短了对突发事件的响应时间，但对于控制系统来说，这还远远不够。

> 然而，Linux 并不是为控制应用而设计的，本身就缺乏对实时控制的支持。虽然 PREEMPT\_RT 补丁使 Linux 支持实时任务的实时调度，有效缩短了对突发事件的响应时间，但我们还可以进一步提高系统的确定性。

However, Linux is not designed for control applications and inherently lacks support for real-time control. While the PREEMPT\_RT patch has enabled Linux to support real-time scheduling for real-time tasks, effectively reducing the response time to unexpected events, but we can further improve the precision of the system.





为了解决PLC智能过程控制中的挑战，我们引入了RT-Bubbles，这是一个包含实时操作系统模块和其他必要工具的执行框架。RT-Bubbles基于Linux，并使用了preempt_rt补丁，它集成了两个核心策略：时间隔离和空间隔离。时间隔离方法将任务分为采样、计算和执行三个阶段。它利用高精度定时器的硬中断来分别处理采样和执行，有效地减少了调度延迟。另一方面，空间隔离策略利用cgroup技术将实时控制任务的CPU和内存资源与其他任务隔离开来，最大限度地减少了外部任务的干扰。这些策略共同增强了系统的实时和确定性能力，并为高精度生产线上PLC的稳定高效运行提供了强大的技术支持。

To address the challenges in intelligent process control of PLCs, we introduced RT-Bubbles, an execution framework that encompasses a real-time operating system module and other essential tools. Built on Linux with the preempt\_rt patch, RT-Bubbles integrates two core strategies: temporal isolation and spatial isolation. The temporal isolation approach subdivides tasks into three phases: sampling, computation, and actuation. It utilizes hard interrupts of high-precision timers to handle sampling and actuation separately, effectively reducing scheduling delays. The spatial isolation strategy, on the other hand, employs the cgroup technology to isolate the CPU and memory resources of real-time control tasks from other tasks, minimizing interference from external tasks. Together, these strategies not only bolster the system's real-time and deterministic capabilities but also offer robust technical support for the stable and efficient operation of PLCs in high-precision production lines.

> To address challenges in intelligent process control of PLCs, we introduced RT-Bubbles, an execution framework comprising a real-time operating system module and essential tools. RT-Bubbles is built on Linux with the preempt_rt patch and incorporates two core strategies: temporal isolation and spatial isolation. Temporal isolation divides tasks into sampling, computation, and actuation phases, utilizing high-precision timers and hard interrupts to handle sampling and actuation separately, reducing scheduling delays. Spatial isolation employs cgroup technology to isolate CPU and memory resources of real-time control tasks from other tasks, minimizing interference. These strategies enhance real-time and deterministic capabilities, providing robust technical support for stable and efficient PLC operation in high-precision production lines.



在实时系统中，任务调度的精确性对系统的稳定性和最佳性能至关重要。调度延迟的不确定性是导致周期性抖动的主要因素。当这种抖动变得过大时，它对系统的控制精度构成威胁，可能导致整个系统性能的恶化。这引出了一个紧迫的研究问题：如何有效地减小调度延迟的波动，以最小化周期性抖动的影响，并从而保障实时系统固有的高性能和稳定性？

In real-time systems, the precision of task scheduling is crucial for system stability and optimal performance. The uncertainty in scheduling delay emerges as the primary factor inducing periodic jitter. When this jitter becomes excessive, it poses a threat to the system's control precision, potentially leading to a deterioration in overall system performance. This brings forth a pressing research inquiry: How can one effectively curtail the fluctuations in scheduling delay, aiming to minimize the impact of periodic jitter, and thereby safeguard the high performance and stability intrinsic to real-time systems?

> In real-time systems, precise task scheduling is crucial for system stability and optimal performance. The primary factor causing periodic jitter is the uncertainty in scheduling delay. When this jitter becomes excessive, it poses a threat to the system's control precision, potentially leading to a deterioration in overall system performance. This brings forth a pressing research inquiry: How can one effectively curtail the fluctuations in scheduling delay, aiming to minimize the impact of periodic jitter, and thereby safeguard the high performance and stability intrinsic to real-time systems?



我们设计了一个高确定性实时运行框架，主要是通过一个名为 RT-bubbles 的工具来减轻调度延迟的影响。RT-bubbles 整合了两种策略：时间隔离和空间隔离。调度延迟的不确定性主要来自两个方面：一是操作系统调度过程固有的不可预测性，如上下文切换和执行调度算法所消耗的时间；二是操作系统内其他任务的干扰，如内核线程和外部中断。如图ref{fig:rtbubbles}所示，高确定性实时操作框架的设计主要基于RT-bubbles，它不仅包含时空隔离策略，还包括其他相关软件包。下面，我们将详细介绍这些组件及其功能。

We have designed a high-determinism real-time operating framework, primarily through a tool named RT-bubbles, to mitigate the impact of scheduling delays. RT-bubbles integrates two strategies: temporal isolation and spatial isolation. The uncertainty in scheduling delay primarily stems from two sources: firstly, the inherent unpredictability of the operating system's scheduling process, such as the time consumed in context switching and the execution of scheduling algorithms; secondly, interference from other tasks within the operating system, such as kernel threads and external interrupts. As illustrated in Figure \ref{fig:rtbubbles}, the design of the high-determinism real-time operating framework is primarily based on RT-bubbles, which not only encompasses strategies of temporal and spatial isolation but also includes other related software packages. In what follows, we will provide a detailed overview of these components and their functionalities.

> 调度延迟的不确定性主要来自两个方面：一是操作系统调度过程固有的不可预测性，如上下文切换和执行调度算法所消耗的时间；二是操作系统内其他任务的干扰，如内核线程和外部中断。我们设计了一个高确定性实时运行框架，主要是通过一个名为 RT-bubbles 的工具来减轻调度延迟的影响。如图ref{fig:rtbubbles}所示，它不仅包含时间隔离和空间隔离策略，还包括其他相关软件包。下面，我们将详细介绍这些组件及其功能。
>
> The uncertainty in scheduling delay primarily stems from two sources: firstly, the inherent unpredictability of the operating system's scheduling process, such as the time consumed in context switching and the execution of scheduling algorithms; secondly, interference from other tasks within the operating system, such as kernel threads and external interrupts. We have designed a high-determinism real-time operating framework, primarily through a tool named RT-bubbles, to mitigate the impact of scheduling delays. As show in Figure \ref{fig:rtbubbles}, the design of framework is primarily based on RT-bubbles, which not only encompasses strategies of temporal and spatial isolation but also includes other related software packages. In what follows, we will provide a detailed overview of these components and their functionalities.

> The uncertainty in scheduling delays is influenced by two main factors: the unpredictable nature of the operating system's scheduling process,such as context switching and scheduling algorithm execution time, and interference from other tasks such as kernel threads and external interrupts. To address these uncertainties, we developed a high-determinism real-time operating framework primarily through a tool named RT-bubbles. Figure \ref{fig:rtbubbles} illustrates the framework primarily based on RT-bubbles, which incorporates temporal and spatial isolation strategies, along with other software packages. In what follows, we will provide a detailed overview of these components and their functionalities.

![image-20230912160147467](https://gcore.jsdelivr.net/gh/wsm6636/pic/202309121601603.png)

## 时间隔离time isolation

在 RT-bubbles 中，时间隔离策略由内核驱动模块实现，该模块还提供性能监控、日志记录和配置等功能。为了消除操作系统调度过程中的不确定性，我们采用了一种类似于逻辑执行时间（LET）范式的方法。
Execution Time (LET) paradigm\cite{8430086}. 具体来说，如图所示，我们将任务分解为三个阶段： 
\开始{列举｝
    \输入阶段，负责数据采样或读取外部输入；
    \计算阶段}，负责逻辑计算，如控制算法；
    \emph{Output stage}，负责发出执行命令或从外部写入数据。
\end{enumerate｝

Within RT-bubbles, the temporal isolation strategy is implemented by a kernel driver module, which also offers functionalities such as performance monitoring, logging, and configuration. To eliminate the uncertainties in the operating system's scheduling process, we adopted an approach reminiscent of the Logical Execution Time (LET) paradigm\cite{8430086}. Specifically, as show in the Fig. \ref{fig:task}, we decompose tasks into three stages: 

> The temporal isolation strategy in RT-bubbles is implemented by a kernel driver module, providing functionalities like performance monitoring, logging, and configuration. To eliminate uncertainties in the operating system's scheduling process, we adopted an approach reminiscent of the Logical Execution Time (LET) paradigm\cite{8430086}. Tasks are decomposed into three stages, as shown in Fig. \ref{fig:task}.

\begin{enumerate}
    \item \emph{Input stage}, responsible for data sampling or reading external inputs;
    \item \emph{Computation stage}, responsible for logical calculations, such as control algorithms;
    \item \emph{Output stage}, responsible for issuing execution commands or writing data externally.
\end{enumerate}

我们利用高精度定时器 HRTimer 的硬中断回调函数，结合用于数据输入和输出的 waitqueue 和 ioctl 机制。这种设计确保了任务的输入和输出阶段由硬中断回调函数执行，而计算阶段则由用户空间线程处理。这样的安排有效地隔离了硬中断中对时间敏感的采样和执行，大大减少了调度延迟。值得注意的是，中断回调函数不适合长时间执行。因此，在有大量数据交互的情况下，输入和输出阶段只是传递数据地址，而计算阶段则管理实际的数据处理。

对于有多个关键任务的情况，我们采用轮询策略进行调度，具体步骤如下：
\开始{列举｝
    \项 \emph{注册}：为任务分配参数，定义任务唤醒条件；
    \emph{Waiting}：任务加入等待队列，等待唤醒条件满足，将内核空间的数据传递到用户空间；
    \唤醒}：在每个高精度定时器回调时，轮询所有计划任务，对于满足唤醒条件（任务等待时间已达到任务周期）的任务，执行任务操作，更新任务参数，并唤醒等待中的任务。
\结束{枚举｝

We utilize the hard interrupt callback function of the high-precision timer, HRTimer, in conjunction with the waitqueue and ioctl mechanisms for data input and output. This design ensures that the input and output stages of the task are executed by the hard interrupt callback function, while the computation stage is handled by user-space threads. Such an arrangement effectively isolates time-sensitive sampling and execution within the hard interrupt, significantly reducing scheduling delay. It's noteworthy that interrupt callback functions are not suitable for prolonged execution. Therefore, in scenarios with extensive data interactions, the input and output stages merely convey data addresses, with the computation stage managing the actual data processing.

> 我们利用高精度定时器 HRTimer 的硬中断回调函数，结合用于数据输入和输出的 waitqueue 和 ioctl 机制。这种设计确保了任务的输入和输出阶段由硬中断回调函数执行，而计算阶段则由用户空间线程处理。这样的安排有效地隔离了硬中断中对时间敏感的采样和执行，大大减少了调度延迟。值得注意的是，中断回调函数不适合长时间执行。因此，在有大量数据交互的情况下，输入和输出阶段只是传递数据地址，而计算阶段则管理实际的数据处理。
>
> We use the hard interrupt callback function of the high-precision timer, HRTimer, with the waitqueue and ioctl mechanisms for data I/O. This design ensures that the input and output stages are handled by the hard interrupt callback function, while the computation stage is managed by user-space threads. This arrangement isolates time-sensitive sampling and execution within the hard interrupt, reducing scheduling delay. It's noteworthy that interrupt callback functions are not suitable for extended execution. Therefore, in scenarios with extensive data interactions, the input and output stages merely convey data addresses, with the computation stage managing the actual data processing.

For situations with multiple critical tasks, we adopt a polling strategy for scheduling, with the specific steps as follows:
\begin{enumerate}
    \item \emph{Registration}: assign parameters to tasks, define task wake-up conditions;
    \item \emph{Waiting}: tasks join the waiting queue and wait for the wake-up conditions to be met, passing kernel space data to user space;
    \item \emph{Wake-up}: on each high-precision timer callback, poll all scheduled tasks, and for those that meet the wake-up conditions (task waiting time has reached the task period), perform the task operations, update task parameters, and wake up the waiting tasks.
\end{enumerate}

> 

## 空间隔离

为了减轻其他任务干扰所带来的不确定性，我们引入了一种空间隔离策略。通过利用cgroup技术，我们将系统的CPU和内存资源进行隔离和分区，确保关键的实时控制任务在与其他常规任务分离的CPU和内存控制组中运行，有效地最小化干扰。此外，我们还实现了禁用实时任务组的负载和限流等功能，进一步减少系统中其他任务的干扰。

To mitigate the uncertainties caused by interference from other tasks, we introduced a spatial isolation strategy. By leveraging the cgroup technology, we isolated and partitioned the system's CPU and memory resources, ensuring that critical real-time control tasks run in separate CPU and memory control groups from other regular tasks, effectively minimizing interference. Additionally, we implemented functionalities such as disabling the load of real-time task groups and throttling to further reduce interference from other tasks in the system.

> To mitigate the uncertainties caused by interference from other tasks, we implemented a spatial isolation strategy using cgroup technology. This strategy isolates and partitions CPU and memory resources, ensuring that critical real-time control tasks run separately from regular tasks, effectively minimizing interference. Additionally, we implemented functionalities such as disabling real-time task group loads and throttling to reduce interference from other tasks in the system.

如图\ref{fig:rtbubbles}所示，关键的实时任务通过Cgroups在指定的CPU上进行隔离，而其余的CPU则分配给非关键的常规任务。在用户空间中，对于对延迟和抖动敏感的实时任务，内存管理至关重要。为此，我们设计并实现了一个内存管理模块，不仅限制了任务可用内存的上限，还锁定了任务的内存页面，防止其被交换出去。这确保了实时任务在执行过程中能够快速访问所需的内存页面，避免了页面交换带来的额外延迟，从而保证了任务的实时性能和系统的响应速度。此外，我们采用了诸如mmap的技术来建立内存映射区域，有助于避免不必要的数据复制和系统调用开销，从而实现更高效的文件访问。对于需要实时数据的用户空间任务，我们利用字符设备文件进行数据传输。而对于性能数据，我们使用proc文件系统实现实时检索。

As illustrated in Fig. \ref{fig:rtbubbles}, critical real-time tasks are isolated on designated CPUs through Cgroups, while the remaining CPUs are allocated for non-critical regular tasks. In user space, for real-time tasks sensitive to latency and jitter, memory management is paramount. To this end, we designed and implemented a memory management module that not only restricts the upper limit of available memory for tasks but also locks the memory pages of tasks to prevent them from being swapped out. ==This ensures that real-time tasks can swiftly access the memory pages they require during execution, avoiding the additional delays caused by page swapping, thereby ensuring the task's real-time performance and the system's response speed.== Moreover, we employed techniques like mmap to establish memory-mapped regions, aiding in avoiding unnecessary data duplication and system call overheads, resulting in more efficient file access. For tasks in user space that require real-time data, we utilize character-driven device files for data transmission. For performance data, real-time retrieval is achieved using the proc file system.

> As shown in Fig. \ref{fig:rtbubbles}, critical real-time tasks are isolated on designated CPUs through Cgroups, while the remaining CPUs are allocated for non-critical regular tasks. In user space, for real-time tasks sensitive to latency and jitter, memory management is paramount. We implemented a memory management module that restricts the upper limit of available memory for tasks and locks memory pages to prevent swapping, enabling swift access to required memory pages during execution. This enhances real-time task performance and system response speed by avoiding delays caused by page swapping. Additionally, we employed techniques like mmap for efficient file access by establishing memory-mapped regions, reducing data duplication and system call overhead. Real-time data transmission in user space utilizes character-driven device files, while performance data retrieval utilizes the proc file system.

## related work

Jacob Mellado等人设计了一种为工业4.0定制的容器化设备IOT-PLC，将各功能封装在单独的容器中，透明地交互以及满足无需重启控制器的实时迁移。

Jacob Mellado et al. designed a containerized device, IOT-PLC, customized for Industry 4.0, encapsulating functions in separate containers, transparently interacting as well as catering to real-time migrations without the need to reboot the controller.

> MELLADO2022100250

Thomas Goldschmidt等人同样采用容器的概念提出多用途工业控制器的架构，满足将传统控制应用迁移到所提出的容器架构，提高在非实时任务干扰下实时应用程序的稳定性。

Thomas Goldschmidt et al. also proposed a multi-purpose industrial controller architecture using the container concept to cater for the migration of legacy control applications to the proposed containerized architecture and to improve the stability of real-time applications in the presence of non-realtime task interruptions.

> GOLDSCHMIDT201828

Chung-Fan Yang等人提出的复合实时操作系统CRTOS，通过分区管理同时满足实时性要求以及丰富的Linux内容。

Chung-Fan Yang et al. proposed a composite real-time operating system, CRTOS, that simultaneously satisfies real-time requirements and rich Linux content through partition management.

> 10.1145/3381052.3381323

Alessandro Biondi等人在汽车系统的实际多核平台上实现LET模型并以少量的运行时开销为代价带来改善时间确定性。

Alessandro Biondi et al. implement the LET model on a real multicore platform for automotive systems and bring improved temporal determinism at the cost of a small runtime overhead.

> 8430086

Gemlau等人通过系统级LET将这种提高时间确定性的方法扩展到虚拟和分布式平台

Gemlau et al. extend this approach to improving time determinism to virtual and distributed platforms through system-level LET.

> 9474257
>

## 参考文献

### 容器

“Container-based architecture for flexible industrial control applications”

“Design of an IoT-PLC: A containerized programmable logical controller for the industry 4.0”，

“Obtaining hard real-time performance and rich Linux features in a compounded real-time operating system by a partitioning hypervisor”，系统使用分区管理程序创建了两个领域：普通的Linux领域和快速实时操作系统(SRTOS)的硬实时领域。

### 延迟

“Demystifying the Real-Time Linux Scheduling Latency”，Linux延迟的原因





### LET

“Achieving Predictable Multicore Execution of Automotive Applications Using the LET Paradigm”，展示了在汽车系统的实际多核平台上实现LET模型如何以少量的运行时开销为代价带来改善时间确定性的潜力。

“Efficient Run-Time Environments for System-Level LET Programming”，系统级别的LET

### 内核

“The Real-Time Linux Kernel: A Survey on PREEMPT_RT”



“Towards understanding application performance and system behavior with the full dynticks feature”
