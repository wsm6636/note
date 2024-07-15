---
url: https://link.springer.com/article/10.1007/s11241-024-09425-5
title: Mcti: mixed-criticality task-based isolation | Real-Time Systems
date: 2024-07-15 21:54:15
tag: 
summary: The ever-increasing demand for high performance in the time-critical, low-power embedded domain drive......
---
## 1简介

时间关键型嵌入式系统处于转型范式转变的中心。传统的嵌入式系统以简单的微架构和明确定义且可预测的应用程序工作负载为特征，正在加速被淘汰。复杂且对架构要求高的应用程序正在取而代之，并由具有先进微架构、异构内存子系统以及通用和专用加速器的复杂多处理器片上系统 (MPSoC) 提供支持。MPSoC 突破水平扩展的界限以支持高性能嵌入式应用程序的著名示例包括 NVIDIA Drive AGX Orin (Anandtech [2019](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR4 "Anandtech (2019) NVIDIA Drive AGX Orin。https://www.anandtech.com/show/15245/nvidia-details-drive-agx-orin-a-herculean-arm-automotive-soc-for-2022，访问时间：2021-10-13") ) 和 Xilinx Versal (Xilinx [2023](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR48 "Xilinx (2023) Xilinx Versal。https://www.xilinx.com/products/silicon-devices/acap/versal.html，访问时间：2021-10-13") )。它们在单个低功耗芯片上集成了多达 12 个高性能 ARM 内核、GPU、加速器和一个大型 FPGA。

在这些平台上，确保时序保证、高利用率以及应用程序具有不同保证级别的安全关键型工作负载之间不受干扰极具挑战性。事实上，为了优化此类平台上的大小和功耗，内存子系统（DRAM、内存控制器和互连）在内核和加速器之间共享，并且在访问内存时，高关键性应用程序会受到在不同内核上执行的低关键性应用程序的不可预测的干扰。

**在混合关键性系统中对虚拟机管理程序进行分区。**在混合关键性系统的背景下，需要在单个 MPSoC 上集成实时工作负载（例如具有严格实时要求的机器人应用程序）以及尽力而为的应用程序（例如基于 Linux 的日志记录或通信系统），这促使人们采用虚拟机管理程序。虚拟机管理程序已成功用于工业安全关键环境中，以隔离具有不同关键性的独立工作负载（例如 SYSGO [2023](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR43 "SYSGO G (2023) PikeOS 虚拟机管理程序。https://www.sysgo.com")），并在研究界中得到广泛应用，因为它们能够实现异构服务质量 (QoS) 并在其客户操作系统之间无缝实施通用实时策略（例如 Martins 等人[2020](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR31 "Martins J、Tavares A、Solieri M 等人 (2020) Bao：适用于现代多核嵌入式系统的轻量级静态分区虚拟机管理程序。在：下一代实时嵌入式系统研讨会 (NG-RES 2020)，OpenAccess 信息学系列 (OASIcs)，第 77 卷。Schloss Dagstuhl–Leibniz-Zentrum fuer Informatik，Dagstuhl，德国，第 3:1–3:1 页 https://doi.org/10.4230/OASIcs.NG-RES.2020.3 ，https://drops.dagstuhl.de/opus/volltexte/2020/11779
                  
                ")）。

**通过性能计数器进行内存调节。**这些策略包括基于性能计数器的内存调节技术 (PMC 调节)，这种技术在过去十年中已被提出，用于控制（或至少减轻）核心间干扰的程度，并将高关键性应用程序 (任务) 与不太关键的应用程序 (任务) 隔离开来。PMC 调节实现_核心级_调节，以毫秒级粒度和微秒级限制 CPU 可以请求的最大带宽 (Zuepke 等人，[2023 年](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR54 "Zuepke A、Bastoni A、Chen W 等人 (2023) Mempol：从内核外部监管内核内存带宽。见：2023 IEEE 第 29 届实时和嵌入式技术与应用研讨会 (RTAS)，第 235-24 页 https://doi.org/10.1109/RTAS58335.2023.00026
                  
                "))。Yun等人 ( [2016 年) 提出的](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR51 "Yun H, Yao G, Pellizzoni R et al (2016) Memory Bandwidth Management for Efficient Performance Isolation in Multi-Core Platforms. IEEE Transactions on Computers 65(2):562–576")_Memguard_引起了广泛关注，因为它可以完全在软件中实现，并且仅依赖于广泛可用的标准性能计数器 (PMC)（例如，Sohal 等人，[2020 年](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR42 "Sohal P, Tabish R, Drepper U, et al (2020) E-WarP: A System-wide Framework for Memory Bandwidth Profiling and Management. In: 2020 IEEE Real-Time Systems Symposium (RTSS)")；Yun 等人，[2017 年](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR52 "Yun H, Ali W, Gondi S et al (2017) BWLOCK: a dynamic memory access control framework for soft real-time applications on multicore platforms. IEEE Trans Comput 66(7):1247–1252")；Modica 等人，[2018 年](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR34 "Modica P, Biondi A, Buttazzo G, et al (2018) Supporting temporal and spatial isolation in a hypervisor for arm multicore platforms. In: 2018 IEEE International Conference on Industrial Technology (ICIT), pp 1651–165
                  https://doi.org/10.1109/ICIT.2018.8352429
                  
                ")；Schwaericke 等人，[2021 年](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR39 "Schwaericke G, Tabish R, Pellizzoni R, et al (2021) A Real-Time virtio-based Framework for Predictable Inter-VM Communication. In: 2021 IEEE International Real-Time Systems Symposium (RTSS)")；Zuepke 等人，[2023 年](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR54 "Zuepke A, Bastoni A, Chen W, et al (2023) Mempol: Policing core memory bandwidth from outside of the cores. In: 2023 IEEE 29th Real-Time and Embedded Technology and Applications Symposium (RTAS), pp 235–24
                  https://doi.org/10.1109/RTAS58335.2023.00026
                  
                ")）。基于虚拟机管理程序的 PMC 调节已在研究和工业层面实施（Modica 等人[2018 年](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR34 "Modica P, Biondi A, Buttazzo G, et al (2018) Supporting temporal and spatial isolation in a hypervisor for arm multicore platforms. In: 2018 IEEE International Conference on Industrial Technology (ICIT), pp 1651–165
                  https://doi.org/10.1109/ICIT.2018.8352429
                  
                ")；Dagieu 等人[2016 年](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR13 "Dagieu N, Spyridakis A, Raho D (2016) Memguard: A memory bandwith management in mixed criticality virtualized systems memguard kvm scheduling. In: 10th Int. Conf. on Mobile Ubiquitous Comput., Syst., Services and Technologies (UBICOMM)")；Green Hills Software [2023 年](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR16 "Green Hills Software (2023) GHS Integrity. https://www.ghs.com/products/rtos/integrity_virtualization.html")），以将虚拟机管理程序的隔离功能扩展到 MPSoC 的内存子系统。在虚拟机管理程序级别实施 PMC 调节是一个合乎逻辑的选择，因为它使 PMC 调节对操作系统级别透明，允许使用可能不同的操作系统（例如通用和实时），同时确保对内存带宽进行适当的控制。[](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR51 "Yun H, Yao G, Pellizzoni R 等人 (2016) 内存带宽管理，实现多核平台中的高效性能隔离。IEEE 计算机学报 65(2):562–576")[](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR42 "Sohal P、Tabish R、Drepper U 等人 (2020) E-WarP：用于内存带宽分析和管理的系统范围框架。发表于：2020 年 IEEE 实时系统研讨会 (RTSS)")[](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR52 "Yun H, Ali W, Gondi S 等 (2017) BWLOCK：用于多核平台上软实时应用的动态内存访问控制框架。IEEE Trans Comput 66(7):1247–1252")[](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR34 "Modica P、Biondi A、Buttazzo G 等人 (2018) 在适用于 Arm 多核平台的虚拟机管理程序中支持时间和空间隔离。在：2018 年 IEEE 国际工业技术会议 (ICIT)，第 1651-165 页 https://doi.org/10.1109/ICIT.2018.8352429
                  
                ")[](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR39 "Schwaericke G、Tabish R、Pellizzoni R 等人 (2021) 基于 virtio 的实时可预测虚拟机间通信框架。发表于：2021 年 IEEE 国际实时系统研讨会 (RTSS)")[](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR54 "Zuepke A、Bastoni A、Chen W 等人 (2023) Mempol：从内核外部监管内核内存带宽。见：2023 IEEE 第 29 届实时和嵌入式技术与应用研讨会 (RTAS)，第 235-24 页 https://doi.org/10.1109/RTAS58335.2023.00026
                  
                ")[](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR34 "Modica P、Biondi A、Buttazzo G 等人 (2018) 在适用于 Arm 多核平台的虚拟机管理程序中支持时间和空间隔离。在：2018 年 IEEE 国际工业技术会议 (ICIT)，第 1651-165 页 https://doi.org/10.1109/ICIT.2018.8352429
                  
                ")[](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR13 "Dagieu N、Spyridakis A、Raho D (2016) Memguard：混合临界虚拟化系统中的内存带宽管理 memguard kvm 调度。在：第 10 届移动普适计算、系统、服务和技术国际会议 (UBICOMM)")[](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR16 "Green Hills Software (2023) GHS Integrity。https://www.ghs.com/products/rtos/integrity_virtualization.html")

**基于带宽的 CPU 配置。**同时，当将具有混合关键性要求的复杂应用程序整合到具有轻量级实时操作系统 (RTOS) 和丰富操作系统 (OS)（如 Linux）的高性能 MPSoC 上时，CPU 配置仍然是一个基本方面。在这里，服务器抽象（例如恒定带宽服务器，简称 CBS）（Abeni 和 Buttazzo [1998](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR1 "Abeni L、Buttazzo G (1998) 在硬实时系统中集成多媒体应用。在：第 19 届 IEEE 实时系统研讨会论文集 (Cat. No.98CB36279)，第 4-13 页，https://doi.org/10.1109/REAL.1998.739726
                  
                ")）是众所周知且广泛使用的，其中SCHED_DEADLINE （Lelli 等人[2016](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR27 "Lelli J、Scordino C、Abeni L 等人 (2016) Linux 内核中的截止期限调度。软件实用实验 46(6):821–839")）策略是研究人员中最受欢迎的示例。请注意，即使这项工作仅考虑 CBS，由于虚拟机管理程序的存在，我们的架构将允许不同的操作系统使用不同类型的 CPU 服务器调节。

**联合 CPU 和内存预算的挑战。**将 OS 透明的内存调节与基于 CBS 的任务隔离相结合是可取的。因此，我们设想了一个混合关键性实时系统，其中基于服务器的配置在 OS 级别实施，而 PMC 调节则用于在 Hypervisor 级别缓解多个 CPU 之间的主内存争用。然而，基于服务器的 CPU 调度策略和 PMC 调节之间的相互作用很少受到关注。正如我们所发现的，这两种机制之间缺乏协调导致_内存过载_情况的处理不佳。这些情况对应于所有场景，尽管高关键性任务有资格在 OS 级别进行调度，但它们被 Hypervisor 中实施的内存带宽调节阻止。

本文详细探讨了这个问题，并提出了一种原型架构，称为“基于混合关键性任务的隔离”（MCTI），旨在解决与内存过载条件相关的研究空白。该架构的开发是为了利用现有技术，专门设计用于确保在混合关键性软实时系统中隔离高关键性任务。总之，我们的主要贡献是：

*   操作系统级 CPU 调节和虚拟机管理程序级 PMC 调节之间相互作用的特征。
    
*   识别有问题的内存过载情况，这些情况可能会阻止执行关键任务，尽管有足够的 CPU 预算。
    
*   MCTI 协议的提出是为了克服这种情况，并设计了一个实用的架构来评估该协议的行为。
    
*   MCTI架构在商业平台上的实现。
    
*   对所提出的架构进行了广泛的评估，并详细分析了其优缺点。值得注意的是，评估表明，原型平均提供的响应时间与任务单独运行时相同。
    
*   详细讨论了充分配置原型的难度。利用社区现有的工具，我们概述了其当前的局限性。
    

在本文的其余部分，第 [2](https://link.springer.com/article/10.1007/s11241-024-09425-5#Sec2)节和第 [3](https://link.springer.com/article/10.1007/s11241-024-09425-5#Sec3)节介绍了必要的背景并提出了一个激励性示例。第 [4](https://link.springer.com/article/10.1007/s11241-024-09425-5#Sec4)节介绍了系统模型。第 [5 节](https://link.springer.com/article/10.1007/s11241-024-09425-5#Sec5)介绍了 MCTI 架构并讨论了分析的挑战。第 [6 节](https://link.springer.com/article/10.1007/s11241-024-09425-5#Sec11)描述了 MCTI 架构的具体实现，第 [7 节](https://link.springer.com/article/10.1007/s11241-024-09425-5#Sec18)和第 [8](https://link.springer.com/article/10.1007/s11241-024-09425-5#Sec25)节评估了实现并讨论了优点和权衡。第 [9](https://link.springer.com/article/10.1007/s11241-024-09425-5#Sec26)节介绍了相关工作，第 [10](https://link.springer.com/article/10.1007/s11241-024-09425-5#Sec27)节总结了本文。

## 2背景

MCTI 架构利用集成的硬件/软件设计，其主要概念如下所述。

**Server-based reservation.** Servers abstractions are well-studied reservation mechanisms to ensure isolation among tasks with different criticalities in the time domain. In this paper, we focus on the Constant Bandwidth Server (CBS) as formulated by Abeni and Buttazzo ([1998](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR1 "Abeni L、Buttazzo G (1998) 在硬实时系统中集成多媒体应用。在：第 19 届 IEEE 实时系统研讨会论文集 (Cat. No.98CB36279)，第 4-13 页，https://doi.org/10.1109/REAL.1998.739726
                  
                ")) and use its Linux Kernel implementation by Lelli et al. ([2016](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR27 "Lelli J、Scordino C、Abeni L 等人 (2016) Linux 内核中的截止期限调度。软件实用实验 46(6):821–839")) (SCHED_DEADLINE policy). This policy guarantees that the contribution of each server to the total utilization of the system is constrained by the fraction of CPU time assigned to each server, even under the presence of (time) overloads.

**PMC-regulation** Likewise, PMC-regulation ensures isolation among CPU cores[Footnote 1](#Fn1) in the memory domain. We focus on software-based techniques originating from Yun et al. ([2016](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR51 "Yun H, Yao G, Pellizzoni R 等人 (2016) 内存带宽管理，实现多核平台中的高效性能隔离。IEEE 计算机学报 65(2):562–576")) that have been successfully evaluated in previous studies by Yun et al. ([2017](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR52 "Yun H, Ali W, Gondi S 等 (2017) BWLOCK：用于多核平台上软实时应用的动态内存访问控制框架。IEEE Trans Comput 66(7):1247–1252")) and Kim and Rajkumar ([2016](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR24 "Kim H, Rajkumar RR (2016) 多核虚拟化的实时缓存管理。刊于：第 13 届嵌入式软件国际会议论文集。计算机协会，纽约，美国，EMSOFT '16")). These techniques rely on broadly available performance counters to regulate the bandwidth generated by each CPU. MCTI leverages CPU-level PMC-based isolation realized at the hypervisor level and implemented within Jailhouse. Specifically, MCTI relies on a publicly available prototype implementation of Jailhouse[Footnote 2](#Fn2) that integrates a Memguard-based regulation Yun et al. ([2016](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR51 "Yun H, Yao G, Pellizzoni R 等人 (2016) 内存带宽管理，实现多核平台中的高效性能隔离。IEEE 计算机学报 65(2):562–576")), and that has been adopted in several previous works from Schwaericke et al. ([2021](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR39 "Schwaericke G、Tabish R、Pellizzoni R 等人 (2021) 基于 virtio 的实时可预测虚拟机间通信框架。发表于：2021 年 IEEE 国际实时系统研讨会 (RTSS)")), Sohal et al. ([2020](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR42 "Sohal P、Tabish R、Drepper U 等人 (2020) E-WarP：用于内存带宽分析和管理的系统范围框架。发表于：2020 年 IEEE 实时系统研讨会 (RTSS)")), and Tabish et al. ([2021](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR44 "Tabish R、Wen J、Pellizzoni R 等人 (2021) 一种可分析的高性能多核嵌入式系统核间通信框架。系统架构杂志 p 10217 https://doi.org/10.1016/j.sysarc.2021.102178 ，https://www.sciencedirect.com/science/article/pii/S1383762121001284
                  
                ")).

**Cache-Partitioning.** Isolation of workloads deployed on CPUs sharing a last-level cache (LLC) can be achieved using cache-partitioning techniques. The objective is to ensure that addresses of independent tasks (or CPUs) are assigned to different cache sets and cannot interfere by evicting one another’s cache lines. _Cache-coloring_ is a well-studied software-based methodology that realizes cache-partitioning at the operating system (OS) or hypervisor level via manipulation of the virtual to physical address translation (e.g., Mancuso et al. [2013](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR29 "Mancuso R、Dudko R、Betti E 等 (2013) 面向多核架构的实时缓存管理框架。2013 IEEE 第 19 届实时和嵌入式技术与应用研讨会 (RTAS)，第 45-54 页"); Kim and Rajkumar [2016](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR24 "Kim H, Rajkumar RR (2016) 多核虚拟化的实时缓存管理。刊于：第 13 届嵌入式软件国际会议论文集。计算机协会，纽约，美国，EMSOFT '16"); Kloda et al. [2019](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR25 "Kloda T, Solieri M, Mancuso R, et al (2019) Deterministic Memory Hierarchy and Virtualization for Modern Multi-Core Embedded Systems. In: 2019 IEEE Real-Time and Embedded Technology and Applications Symposium (RTAS), p 1–14")). MCTI leverages the cache-coloring implementation available in the prototype implementation of Jailhouse used for PMC-regulation.

**PS/PL Architectures.** The increasing commercial availability of heterogeneous MPSoCs (such as Xilinx’s UltraScale+ [2022](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR47 "Xilinx (2022) ZCU 102 MPSoC TRM. 
                  https://docs.xilinx.com/r/en-US/ug1085-zynq-ultrascale-trm/Zynq-UltraScale-Device-Technical-Reference-Manual
                  
                , accessed: 2022-11-08"); Intel’s Stratix [2016](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR21 "Intel, Corp. (2016) Intel’s Stratix 10 FPGA: Supporting the smart and connected revolution. 
                  https://newsroom.intel.com/editorials/intels-stratix-10-fpga-supporting-smart-connected-revolution/
                  
                , accessed on 2022-01-19"); Microsemi’s PolarFire [2020](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR32 "Microsemi — Microchip Technology Inc. (2020) PolarFire SoC - Lowest Power, Multi-Core RISC-V SoC FPGA. 
                  https://www.microsemi.com/product-directory/soc-fpgas/5498-polarfire-soc-fpga
                  
                , accessed on 09.01.2020")) that tightly integrate traditional Processing Systems (PS) with a Programmable FPGA-based Logic (PL) has led to novel paradigms in the management of the interconnect between CPUs and main memory. In the Programmable Logic in the Middle (PLIM) introduced by Roozkhosh and Mancuso ([2020](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR36 "Roozkhosh S, Mancuso R (2020) The potential of programmable logic in the middle: Cache bleaching. In: 2020 IEEE Real-Time and Embedded Technology and Applications Symposium (RTAS), pp 296–30
                  https://doi.org/10.1109/RTAS48715.2020.00006
                  
                ")), the PL-side is not simply used as a recipient for hardware accelerators but as an intermediate step on the data path linking the CPUs and DRAM, enabling fine-grained inspection and control on every single memory transactions. Scheduler In the Middle (SchIM) by Hoornaert et al. ([2021](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR19 "Hoornaert D, Roozkhosh S, Mancuso R (2021) A Memory Scheduling Infrastructure for Multi-Core Systems with Re-Programmable Logic. In: Brandenburg BB (ed) 33rd Euromicro Conference on Real-Time Systems (ECRTS 2021), Leibniz International Proceedings in Informatics (LIPIcs), vol 196. Schloss Dagstuhl – Leibniz-Zentrum für Informatik, Dagstuhl, Germany, pp 2:1–2:2
                  https://doi.org/10.4230/LIPIcs.ECRTS.2021.2
                  
                , 
                  https://drops.dagstuhl.de/opus/volltexte/2021/13933
                  
                ")) follows a similar approach to re-order CPU-originated transactions and enforce a given memory-transaction scheduling policy. As discussed in Sect. [5](https://link.springer.com/article/10.1007/s11241-024-09425-5#Sec5), MCTI extends SchIM by enabling a criticality-triggered dynamic control of the memory-transaction scheduling policies.

## 3 Interplay of CBS and PMC-regulation

Under PMC-regulation, each CPU is regulated by a server-like mechanism and is assigned a maximum memory _budget_ that is periodically replenished. If the budget is exhausted, the CPU remains idle until the memory budget is recharged. The budget value is determined using PMCs that monitor (directly or indirectly) the memory transactions performed by the CPU. For example, the number of last-level cache refills performed by the CPU is often used as a proxy for the extracted main memory bandwidth.

Unfortunately, the desirable isolation properties of PMC-regulation cannot be extended to applications with different criticalities running on the _same_ CPU since only _one single_ bandwidth threshold can be defined for each CPU. For PMC-regulation, this limitation is unavoidable and directly rooted in the capability of current performance counters (PMCs). Worse, this limitation adds to the technical difficulties of precisely characterizing the memory behavior of complex (preemptive) tasks executing on RTOSs.

To date, to cope with this limitation, architects of safety-critical systems have adopted designs that statically isolate criticalities across CPUs. Although beneficial from an analysis and certification point of view, these designs cannot leverage the full potential of MPSoC platforms as they must strictly separate high-critical and low-critical tasks. This makes partitioning and priority assignment more difficult and amplifies memory bottleneck problems for low-critical tasks forced to share the same CPUs.

Combining CBS-based CPU scheduling and PMC-regulation to achieve isolation in _both_ time and memory domains is a logical choice. Enacting the former at the OS level and the latter at the hypervisor level aims to reap the benefits of a multi-layered architecture[Footnote 3](#Fn3). However, this approach results in a lack of coordination between the two mechanisms. This leaves the system incapable of handling _memory overload conditions_ where the early depletion of CPU-bound memory budget prevents a (critical) task from completing its execution despite still having CBS-computation budget (see Sect. [4](https://link.springer.com/article/10.1007/s11241-024-09425-5#Sec4)).

**Fig. 1**

[

![](https://media.springernature.com/lw685/springer-static/image/art%3A10.1007%2Fs11241-024-09425-5/MediaObjects/11241_2024_9425_Fig1_HTML.png)

](https://link.springer.com/article/10.1007/s11241-024-09425-5/figures/1)

Example scenario of a PMC-regulated CPU, where an increased memory consumption causes \(\tau {}_{1}\) to miss its deadline

To better understand the key issues that MCTI addresses, consider the conditions depicted in Fig. [1](https://link.springer.com/article/10.1007/s11241-024-09425-5#Fig1). Task \(\tau {}_{0}\) is a low-criticality task, while \(\tau {}_{1}\) is a high-criticality one. In the time domain, both tasks are scheduled using CBS regulation that absorbs variations of the execution time of \(\tau {}_{0}\) without impacting \(\tau {}_{1}\) (Abeni and Buttazzo [1998](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR1 "Abeni L, Buttazzo G (1998) Integrating multimedia applications in hard real-time systems. In: Proceedings 19th IEEE Real-Time Systems Symposium (Cat. No.98CB36279), pp 4–13, 
                  https://doi.org/10.1109/REAL.1998.739726
                  
                ")). In the memory domain, the bandwidth is regulated with PMC-regulation. Being a scarcer resource than CPU time, memory budgets are assigned based on the standard memory behavior (e.g., obtained via profiling) of the tasks executing on a CPU to avoid under-utilizing memory. Deviations from the normal behavior are accounted for using fixed _safety margins_, which is a common practice in industrial applications.

Under normal conditions (Fig. [1](https://link.springer.com/article/10.1007/s11241-024-09425-5#Fig1)a), \(\tau {}_{0}\) completes its execution at \(t_1\), and \(\tau {}_{1}\) receives sufficient memory budget in the interval \([t_1, t_2]\) to meet its deadline at \(t_3\). Instead, in Fig. [1](https://link.springer.com/article/10.1007/s11241-024-09425-5#Fig1)b, in response to a change in the input type, \(\tau {}_{0}\) consumes more memory budget.[Footnote 4](#Fn4) Note that the deadline of \(\tau {}_{0}\) is earlier than the one of \(\tau {}_{1}\), and \(\tau {}_{1}\) starts executing at \(t'_1\). Although the time interval \([t'_1, t'_3]\) would be sufficient for \(\tau {}_{1}\) to complete on time, at \(t'_2\) the memory budget of the CPU is depleted, and \(\tau {}_{1}\) must wait until \(t'_4\) to resume execution, thus missing its deadline.

The key idea behind MCTI is to prevent \(\tau {}_{1}\) from being suspended if it still has sufficient time budget to complete its execution, even if the memory budget of the CPU has already been depleted. Indeed, this condition corresponds to a _memory overload_. As depicted in Fig. [1](https://link.springer.com/article/10.1007/s11241-024-09425-5#Fig1)c, at time \(t''_2\), MCTI detects that a high-criticality task is running and switches (at hardware level) the fairness-based default memory policy of the interconnect to prioritize memory traffic coming from the CPU where \(\tau {}_{1}\) is running. Thus, \(\tau {}_{1}\) can complete its execution in \([t''_2, t''_3]\) and meet its deadline at \(t''_4\).

Although Fig. [1](https://link.springer.com/article/10.1007/s11241-024-09425-5#Fig1) represents a pathological case, due to the difficulties in precisely estimating the time and memory behavior of applications, these conditions can occur in practice for seemingly well-understood workloads. For example, this is the case for vision-based algorithms (Venkata et al. [2009](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR46 "Venkata SK, Ahn I, Jeon D, et al (2009) Sd-vbs: The san diego vision benchmark suite. In: IISWC. IEEE Computer Society, pp 55–64, 
                  http://dblp.uni-trier.de/db/conf/iiswc/iiswc2009.html#VenkataAJGLGBT09
                  
                ")) operating on input vectors with identical sizes but different content semantics. As shown in Fig. [8](https://link.springer.com/article/10.1007/s11241-024-09425-5#Fig8) and discussed in Sect. [7](https://link.springer.com/article/10.1007/s11241-024-09425-5#Sec18), selecting a single and safe regulation bound is impossible without severely under-utilizing the system.

Interestingly, when considered alone, the individual regulation mechanisms employed by MCTI are not sufficient to achieve the same degree of isolation and flexibility. (1) Perhaps the most straightforward solution would be to over-provision the per-CPU memory bandwidth. (2) On the other hand, statically prioritizing CPUs when they access main memory (e.g., Hoornaert et al. [2021](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR19 "Hoornaert D, Roozkhosh S, Mancuso R (2021) A Memory Scheduling Infrastructure for Multi-Core Systems with Re-Programmable Logic. In: Brandenburg BB (ed) 33rd Euromicro Conference on Real-Time Systems (ECRTS 2021), Leibniz International Proceedings in Informatics (LIPIcs), vol 196. Schloss Dagstuhl – Leibniz-Zentrum für Informatik, Dagstuhl, Germany, pp 2:1–2:2
                  https://doi.org/10.4230/LIPIcs.ECRTS.2021.2
                  
                , 
                  https://drops.dagstuhl.de/opus/volltexte/2021/13933
                  
                ")) might lead to starvation for the low-priority CPUs and prevent them from running non-critical, memory intensive tasks entirely. (3) Dynamically switching the bus priority depending on the criticality level of the running tasks defeats the isolation properties of PMC-regulation and might prevent low-critical tasks from running when the system is not subject to memory overload.

## 4 System model and regulation policy

**Overall System.** The system comprises \(m\) general-purpose CPUs. Each \(CPU{}_{k}\) (\(k \in \{1, \ldots , m \}\)) has a private L1 instruction and data cache and shares a unified L2 cache (last-level cache—LLC) with all other CPUs. Cacheable memory is managed by the LLC using a write-back, write-allocate policy, and a pseudo-random replacement policy. The main memory features a single DRAM controller with an interleaved multi-bank configuration. Any access to the LLC resulting in a miss creates a read transaction toward the DRAM controller and the attached DRAM (Table [1](https://link.springer.com/article/10.1007/s11241-024-09425-5#Tab1)).

**Tasks, Task set, and Partitions.** We consider a set \(\Gamma \) of sporadic mixed-criticality real-time tasks. Each task \(\tau {}_{i}\) \(\in \Gamma , i \in \{1, \ldots , n \}\) is defined by a tuple \(\langle C{}_{i}, D{}_{i}, T{}_{i}, l{}_{i} \rangle \), where \(C{}_{i}\) is the worst-case execution time, \(T{}_{i}\) is the minimum inter-arrival time, \(D{}_{i}\) is the (arbitrary) deadline, and \(l{}_{i}\) is the criticality level. \(l{}_{i}\) conveys how critical a task is in terms of, for example, certification-related assurance level (RTCA Inc. [2011](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR37 "RTCA Inc. (2011) RTCA/DO-178C Software Consideration in Airborne Systems and Equipment Certification")). We assume \(l{}_{i} \in \{0, \ldots , l_{max} \} \), where \(l_{max}\) is the highest criticality level and 0 means the task is not critical. At any instant \(t\), the deadline of the task running on \(CPU{}_{k}\) is given by the function \(D_{k}(t)\) (\(D_{k}: \mathbb R_{0}^{+} \rightarrow \mathbb R_{0}^{+} \)), while the criticality of the task running on \(CPU{}_{k}\) at time \(t\) is given by the function \(L_{k}(t)\) \((\mathbb R_{0}^{+} \rightarrow \{0, \ldots , l_{max} \})\). At time \(t\), a _critical task_ \(\tau {}_{i}\) has \(L_{k}(t) > 0\). The tasks (\(\Gamma \)) are _partitioned_ among CPUs in task sets noted \(\Gamma _{k}\), and their execution on each CPU is controlled by a CBS server. Each task \(\tau {}_{i}\) is associated with a server \(S{}_{i}\). Each server \(S{}_{i}, i \in \{1, \ldots , n \}\) is characterized by a tuple \(\langle Qc{}_{i}, P{}_{i} \rangle \), where \(Qc{}_{i}\) is the computation budget and \(P{}_{i}\) the period. The CBS policy ensures that each server’s utilization (time bandwidth) \(U{}_{i} = Qc{}_{i}/ P{}_{i} \) remains constant over time. The function \(G_{k}(t)\) \((\mathbb R_{0}^{+} \rightarrow \{true, false\})\) indicates whether a CBS server on \(CPU{}_{k}\) is eligible for execution at time \(t\).

**PMC-regulation.** The system features a PMC-based regulator to monitor and limit the memory bandwidth that a \(CPU{}_{k}\) can consume. PMC-regulation assigns each \(CPU{}_{k}\) a memory bandwidth \(B{}_{k}\), which is enforced by allowing at most \({Qm}{}_{k}\) read transactions within a period \(M\). The memory budget depletes while \(CPU{}_{k}\) performs memory transactions. The function \(A_{k}(t)\) \((\mathbb R_{0}^{+} \rightarrow \mathbb N_{0})\) associates a \(CPU{}_{k}\) with its instantaneous memory budget at time \(t\). In this paper, we assume that all CPUs have the same replenishment period \(M\). In other words, the CPUs’ replenishment periods are assumed (1) to have the same duration and (2) to be synchronously aligned (as presented in the original Memguard article by Yun et al. ([2013](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR49 "Yun H, Yao G, Pellizzoni R, et al (2013) Memguard: Memory bandwidth reservation system for efficient performance isolation in multi-core platforms. In: 2013 IEEE 19th Real-Time and Embedded Technology and Applications Symposium (RTAS), pp 55–6
                  https://doi.org/10.1109/RTAS.2013.6531079
                  
                "))). PMC regulators divide the system life-cycle in two categories: _regulated_ and _stalled_. When regulated, a \(CPU{}_{k}\) runs and consumes its memory budget (\(A_{k}(t) > 0\)). When \(A_{k}(t) = 0\), \(CPU{}_{k}\) is stalled. Regardless of the CPUs’ phase, at the start of each regulation period \(M\) all memory budgets are restored (\(\forall p \in \mathbb N_{0}: A_{k}(p M) = {Qm}{}_{k} \)) and stalled CPUs become again regulated.

**Programmable interconnect.** The CPUs are connected to main memory via a _run-time configurable_ interconnect. The interconnect can discriminate and arbitrate CPU’s memory transactions using a policy \(\pi \), which can be either _Fair_ or _Fixed Priority_ (\(FP\)). The \(Fair\) policy aims to balance each CPU’s bandwidth, while the \(FP\) policy assigns each \(CPU{}_{k}\) a unique bus priority \(R{}_{k}\) (\(k \in \{0, \ldots , m \} \)) and schedules memory transactions accordingly. The function \(MaxR(t)\) (\(MaxR(t): \mathbb R_{0}^{+} \rightarrow \{0, \ldots , m \} \)) indicates the CPU with the highest bus priority at instant \(t\), while \(MinR(t)\) (\(MinR(t): \mathbb R_{0}^{+} \rightarrow \{0, \ldots , m \} \)) indicates the CPU with the lowest bus priority at instant \(t\).

**Memory overload.** A _memory overload_ identifies those situations where, due to the depletion of the CPU memory budget, critical tasks are stalled despite being still eligible for execution. We note that, although a CBS server is used in this paper, the definition of a _memory overload_ does not depend on a specific choice of server regulation. Specifically:

### Definition 1

For a critical \(\tau {}_{i}\) (\(l{}_{i} > 0\)), a _memory overload_ occurs at \(t ^{overload}\) if \(A_{k}(t ^{overload}) = 0\) and \(G_{k}(t ^{overload}) = true\).

**MCTI protocol.** To enforce the regulation of the system, MCTI ’s protocol relies on the following rules:

1.  1.
    
    The system’s life cycle is divided into a succession of memory regulation periods \(M\).
    
2.  2.
    
    At the start of each \(M\):
    
    *   each \(CPU{}_{k}\) in the system has its memory budget replenished (\(\forall k \in \{0, \ldots , m \}, \forall p \in \mathbb N_{0}: A_{k}(pM) = {Qm}{}_{k} \)) and
        
    *   the interconnect policy is set to \(Fair\) (\(\pi = Fair \)).
        
3.  3.
    
    While \(G_{k}(t) ~\wedge ~ A_{k}(t) > 0\), \(CPU{}_{k}\) runs regulated and consumes its memory budget.
    
4.  4.
    
    If \(G_{k}(t) ~\wedge ~ A_{k}(t) = 0 ~\wedge ~ L_{k}(t) = 0\), \(CPU{}_{k}\) is stalled until the start of the next memory regulation period.
    
5.  5.
    
    (Memory Overload) If \(G_{k}(t ^{overload}) ~\wedge ~ A_{k}(t ^{overload}) = 0 ~\wedge ~ L_{k}(t ^{overload} ) > 0\), the interconnect policy is set to fixed-priority (\(\pi = FP \)), \(R{}_{k}\) is set according to the following property (Prop. [1](https://link.springer.com/article/10.1007/s11241-024-09425-5#FPar2)), and \(CPU{}_{k}\) can continue to execute the task scheduled at time \(t\) with CBS regulation.
    
6.  6.
    
    If \(\lnot G_{k}(t) \), \(CPU{}_{k}\) is idle.
    

### Property 1

(**Bus priority assignment**) When any \(CPU{}_{k}\) is in a memory overload, bus priorities are assigned according to the criticality and deadline of the critical tasks.

$$\begin{aligned} \begin{aligned} \forall t \in \{\mathbb R_{0}^{+}&~|~ G_{k}(t) \wedge A_{k}(t) = 0 \wedge L_{k}(t) > 0\}, \forall k \in \{0, \ldots , m \}, \forall z \in \{0, ..., m ~|~\\ {}&(L_{z}(t)> L_{k}(t)) \vee ((L_{z}(t) = L_{k}(t)) \wedge (D_z(t) < D_k(t)))\} : R{}_{z} > R{}_{k} \end{aligned} \end{aligned}$$

(1)

Note that rules 1 to 4 describe the budget accounting of a typical PMC regulator such as Memguard. It is the introduction of rule 5 that enables the handling of _memory overload_ situations. Whenever \(A_{k}(t) > 0\) (e.g., every \(M\)) or \(L_{k}(t) = 0\), \(CPU{}_{k}\) is not in a _memory overload_ situation anymore, and it falls back to the usual PMC regulation mechanism (rules 1 to 4).

In the example illustrated by Fig. [1](https://link.springer.com/article/10.1007/s11241-024-09425-5#Fig1)c, rules 1 to 4 are being used to regulate the system’s memory bandwidth from \(t _{0}''\) to \(t _{2}''\). Because of \(\tau {}_{0}\) ’s increased memory consumption, a memory overload occurs at \(t _{2}''\). Henceforth, rule 5 is applied until the start of the subsequent memory regulation period at \(t _{6}''\) (rule 2).

## 5 Architecture

As depicted in Fig. [2](https://link.springer.com/article/10.1007/s11241-024-09425-5#Fig2), MCTI adopts a layered architecture with five layers ranging from application software level to hardware control of the main memory. The CPU regulation is completely implemented in software at the OS level, while memory regulation implementation is distributed across the hypervisor level and the hardware-based control of the data link to the main memory. Furthermore, lightweight communication between layers is required to propagate, for example, information on the criticality of the currently executing tasks.

### 5.1 CPU regulation

Real-time tasks execute at the application level on top of an OS with real-time capabilities. The OS supports a server-based scheduling policy (e.g., Buttazzo [2011](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR11 "Buttazzo GC (2011) Hard Real-time Computing Systems: Predictable Scheduling Algorithms And Applications (Real-Time Systems Series). Springer-Verlag")) that provides isolation among the tasks. We use Linux as OS to prototype our architecture as it has been successfully employed in many soft real-time contexts (e.g., Cinque et al. [2022](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR12 "Cinque M, De Tommasi G, Dubbioso S, et al (2022) Rpuguard: Real-time processing unit virtualization for mixed-criticality applications. In: 2022 18th European Dependable Computing Conference (EDCC), pp 97–10
                  https://doi.org/10.1109/EDCC57035.2022.00025
                  
                ")) and constitutes a solid prototyping platform due to its widespread adoption. In Linux, the SCHED_DEADLINE scheduling policy realizes a CBS regulation that fulfills the requirements of our architecture. We associate each task \(\tau {}_{i}\) to a server \(S{}_{i}\) and define its maximum utilization \(U{}_{i}\). Each \(S{}_{i}\) is statically assigned to a \(CPU{}_{k}\).

**Fig. 2**

[

![](https://media.springernature.com/lw685/springer-static/image/art%3A10.1007%2Fs11241-024-09425-5/MediaObjects/11241_2024_9425_Fig2_HTML.png)

](https://link.springer.com/article/10.1007/s11241-024-09425-5/figures/2)

Layered architecture of MCTI

### 5.2 Memory regulation

Memory regulation is the most complex part of our architecture and consists of two layers, one implemented at the hypervisor level and one implemented at the hardware level (Fig. [2](https://link.springer.com/article/10.1007/s11241-024-09425-5#Fig2)).

#### 5.2.1 PMC-regulation and memory overload detection

The hypervisor implements a PMC-regulation mechanism that limits the maximum number of memory transactions that the CPUs can issue to the main memory. The choice of a hypervisor to realize PMC-regulation is natural given the widespread adoption of hypervisors in safety-critical contexts to isolate independent workloads with different criticalities. Implementing PMC-regulation at the hypervisor level makes the PMC-regulation transparent to the OS level, and it allows using different OSs while ensuring memory bandwidth control. Furthermore, even if this work considers only CBS, our architecture would allow different OSs to use different types of CPU server regulation. Hence, separating the PMC-regulation level from the CPU regulation level is a clean architectural choice.

**Fig. 3**

[

![](https://media.springernature.com/lw685/springer-static/image/art%3A10.1007%2Fs11241-024-09425-5/MediaObjects/11241_2024_9425_Fig3_HTML.png)

](https://link.springer.com/article/10.1007/s11241-024-09425-5/figures/3)

Overload-aware Memguard Finite State Machine of \(CPU{}_{k}\) running \(\tau {}_{i}\). Additions to the standard Memguard FSM are drawn with dashed contours

We consider _Memguard_ by Yun et al. ([2016](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR51 "Yun H, Yao G, Pellizzoni R et al (2016) Memory Bandwidth Management for Efficient Performance Isolation in Multi-Core Platforms. IEEE Transactions on Computers 65(2):562–576")) as PMC-regulation to enforce a target maximum bandwidth \(B{}_{k}\). The latter controls the amount of transactions (up to a maximum \({Qm}{}_{k}\)) emitted by a \(CPU{}_{k}\) within a time frame \(M\). The bandwidth \(B{}_{k}\) is enforced by stalling \(CPU{}_{k}\) until the next \(M\) whenever \({Qm}{}_{k}\) is depleted. Figure [3](https://link.springer.com/article/10.1007/s11241-024-09425-5#Fig3) illustrates the default state (_Running_) of the Memguard state machine and the transition to _Stop_ when the memory budget \({Qm}{}_{k}\) is depleted.

MCTI ’s rules (see Sect. [4](https://link.springer.com/article/10.1007/s11241-024-09425-5#Sec4)) are accommodated into Memguard’s finite state machine by adding a new state (_Overload_) that captures _memory-overloads_ situations. \(CPU{}_{k}\) enters the _Overload_ state if its budget is depleted (\({Qm}{}_{k} = 0\)) and its currently running task is critical (\(l{}_{i} > 0\)). Otherwise, it enters the _Stop_ state. When one of the CPU enters the _Overload_ state, the shared interconnect policy is switched to fixed-priority (\(\pi = FP \)). The bus priority of each CPU is determined based on the criticality of its running task: the higher the \(L_{k}(t)\), the higher the \(R{}_{k}\). If multiple CPUs run a task with the same criticality level, higher \(R{}_{k}\) is given to the \(CPU{}_{k}\) whose critical task has a closer deadline (Prop. [1](https://link.springer.com/article/10.1007/s11241-024-09425-5#FPar2)). This strategy facilitates the completion of the most urgent and critical tasks, potentially penalizing other critical tasks running in parallel. We note that without intervention, critical tasks will miss their deadlines when a memory overload occurs. When the (synchronous) replenishment period (\(M\)) is reached, budget \({Qm}{}_{k}\) is replenished, and CPUs return to _Running_ state. If the _Running_ state is re-entered from the _Overload_ state upon replenishment, \(\pi \) is switched back to \(Fair\). Note that switching the policy to fixed priority does not cause other CPUs to transition to an _Overload_ state, meaning that Memguard rules still apply for such CPUs.

The _Reset_ state in Fig. [3](https://link.springer.com/article/10.1007/s11241-024-09425-5#Fig3) does not belong to the regulation and is entered asynchronously when the system is subject to a reboot to restore standard unregulated parameters.

#### 5.2.2 Dynamic FP/fair interconnect policy

**Fig. 4**

[

![](https://media.springernature.com/lw685/springer-static/image/art%3A10.1007%2Fs11241-024-09425-5/MediaObjects/11241_2024_9425_Fig4_HTML.png)

](https://link.springer.com/article/10.1007/s11241-024-09425-5/figures/4)

Abstract overview of the SchIM design

**Fig. 5**

[

![](https://media.springernature.com/lw685/springer-static/image/art%3A10.1007%2Fs11241-024-09425-5/MediaObjects/11241_2024_9425_Fig5_HTML.png)

](https://link.springer.com/article/10.1007/s11241-024-09425-5/figures/5)

MCTI with _memory overload_

The lowest part of the memory regulation realized by MCTI is implemented in hardware leveraging the architecture of SchIM (Hoornaert et al. [2021](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR19 "Hoornaert D, Roozkhosh S, Mancuso R (2021) A Memory Scheduling Infrastructure for Multi-Core Systems with Re-Programmable Logic. In: Brandenburg BB (ed) 33rd Euromicro Conference on Real-Time Systems (ECRTS 2021), Leibniz International Proceedings in Informatics (LIPIcs), vol 196. Schloss Dagstuhl – Leibniz-Zentrum für Informatik, Dagstuhl, Germany, pp 2:1–2:2
                  https://doi.org/10.4230/LIPIcs.ECRTS.2021.2
                  
                , 
                  https://drops.dagstuhl.de/opus/volltexte/2021/13933
                  
                ")).

As in the original article, the SchIM module is implemented on the PL side and acts as an intermediate step on the data path between CPUs and DRAM. As shown in Fig. [4](https://link.springer.com/article/10.1007/s11241-024-09425-5#Fig4), each CPU is associated with a queue storing the memory transactions directed to DRAM. Under heavy traffic, the queues are being progressively filled, creating contention within the module and allowing SchIM to schedule the transactions as desired by the system. Scheduling is enacted by deciding which queue’s content is forwarded to the target memory and is orchestrated by the hardware transaction schedulers (depicted as _FP & Aging Sched._ and _multiplexer_ modules in Fig. [4](https://link.springer.com/article/10.1007/s11241-024-09425-5#Fig4)). The scheduler module defines a set of hardware schedulers (e.g.,Fixed-Priority, TDMA) implemented at design time and statically available on the PL at system boot.

This work extends the original SchIM by enabling the dynamic choice of a specific scheduler at run-time and by adding the \(Fair\) scheduling policy. Specifically, a scheduler can be selected by operating on a set of registers accessible by the whole system through a memory-mapped configuration port (_Configuration Port_ in Fig. [4](https://link.springer.com/article/10.1007/s11241-024-09425-5#Fig4)). In addition to this configuration link, our SchIM implementation features two input links for CPU-originated transactions (each one being shared by two CPUs) and one output link to the DRAM.

It should be noted that to-date SchIM-like approaches are the only viable way to enable fine granular scheduling of memory transactions on a COTS platform. In fact, it’s unclear whether even advanced—and not yet fully available—QoS solutions such as MPAM (ARM [2022](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR5 "ARM (2022) Arm Architecture Reference Manual Supplement. Memory System Resource Partitioning and Monitoring (MPAM) for Armv8-A. https://developer.arm.com/docs/ddi0598/latest Accessed: 2021-02-08")) will be able to provide the same granularity and configurability levels.

### 5.3 Open challenges

Schedulability analysis of the presented architecture with respect to its system model (Sect. [4](https://link.springer.com/article/10.1007/s11241-024-09425-5#Sec4)) poses significant challenges. Given the desired (by design) independence of OS, hypervisor, and interconnect layers, an overhead-aware schedulability analysis that considers the combined effects of all three layers is challenging. In particular, to the best of our knowledge, the following three main sources of overhead cannot be easily factored in existing overhead-aware schedulability analysis.

**Hypervisor-based PMC-regulation overheads.** At the OS level, standard techniques (Brandenburg [2011](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR9 "Brandenburg BB (2011) Scheduling and locking in multiprocessor real-time operating systems. PhD thesis, The University of North Carolina at Chapel Hill"); Buttazzo and Bini [2006](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR10 "Buttazzo G, Bini E (2006) Optimal dimensioning of a constant bandwidth server. In: 2006 27th IEEE International Real-Time Systems Symposium (RTSS’06), pp 169–17
                  https://doi.org/10.1109/RTSS.2006.31
                  
                ")) can be adopted to account for OS, caches, and interrupt overheads in CBS-schedulability analysis. Unfortunately, these techniques cannot be easily extended to consider the impact of PMC-regulation overheads generated at the hypervisor level. Hypervisor-based PMC-regulation is _by design_, transparent to the OS layers. An analysis of PMC-regulation overheads must therefore be conducted at both hypervisor _and_ OS level and must consider the combined impact of both CPU-based and task-based overheads. We are unaware of an overhead-based schedulability analysis that could be directly applied to our MCTI architecture.

**Interconnect-based overheads.** When a critical task enters a memory overload, MCTI updates the priority of the interconnect to priviledge memory transactions issued by the “most critical” CPU (Prop. [1](https://link.springer.com/article/10.1007/s11241-024-09425-5#FPar2)). While the interconnect operates with \(\pi = FP \), the tasks executing on the CPUs inevitably experience slowdowns that depend on the assigned interconnect priorities and their memory consumption. Integrating such overheads is challenging even for a non-tight analysis where all \(\{CPU{}_{k} ~\forall k \in \{0, \ldots , m \} \} {\setminus } \{CPU{}_{MaxR(t)} \}\) are assumed to be as penalized as \(CPU{}_{MinR(t)} \).

Techniques such as Yun et al. ([2015](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR50 "Yun H, Pellizzoni R, Valsan PK (2015) Parallelism-aware memory interference delay analysis for cots multicore systems. In: 2015 27th Euromicro Conference on Real-Time Systems, pp 184–19
                  https://doi.org/10.1109/ECRTS.2015.24
                  
                ")) do not consider priority-aware interconnects but could nonetheless be used as a starting point for the analysis of MCTI. Similarly to hypervisor-level PMC-regulation overheads, integrating interconnect-based overheads into a schedulability analysis will be part of our future work.

**Criticality-inversion.** In addition to interconnect- and hypervisor-PMC-overheads, our MCTI architecture includes another source of pessimism rooted in the lack of fast communication between OS and hypervisor levels. In fact, MCTI does not have an expensive OS-to-hypervisor communication channel (e.g., hypercalls, Siemens AG [2023](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR41 "Siemens AG (2023) Jailhouse hypervisor. https://github.com/siemens/jailhouse, accessed: 2023-06-06"); Martins et al. [2020](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR31 "Martins J, Tavares A, Solieri M, et al (2020) Bao: A lightweight static partitioning hypervisor for modern multi-core embedded systems. In: Workshop on Next Generation Real-Time Embedded Systems (NG-RES 2020), OpenAccess Series in Informatics (OASIcs), vol 77. Schloss Dagstuhl–Leibniz-Zentrum fuer Informatik, Dagstuhl, Germany, pp 3:1–3:1
                  https://doi.org/10.4230/OASIcs.NG-RES.2020.3
                  
                , 
                  https://drops.dagstuhl.de/opus/volltexte/2020/11779
                  
                ")) to signal the completion of critical tasks that entered a memory overload. This choice helps reduce the high cost of hypercalls and improves the (common) case where memory overloads occur close to a memory replenishment period.

Note that this source of pessimism is an artifact specific to MCTI ’s architecture. The implementation-agnostic rules listed in Sect. [4](https://link.springer.com/article/10.1007/s11241-024-09425-5#Sec4) do not lead to this condition.

Nonetheless, when considering worst-case schedulability analysis, the effect of criticality inversion at the interconnect must be accounted for the complete duration of a replenishment period \(M\), and their impact cannot be tightly limited to the duration of a memory overload. We refer to this indirectly-induced overhead as _criticality-inversion_, since, after a memory overload occurs, the actual interconnect priorities and policy can only be restored at the next replenishment period.

## 6 Implementation

Given the architecture requirements (see Sect. [5](https://link.springer.com/article/10.1007/s11241-024-09425-5#Sec5)), the target platform of this work is a System-on-Chip featuring a tightly integrated FPGA. The selected platform instance is Xilinx’s UltraScale+ ZCU102 ([2022](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR47 "Xilinx (2022) ZCU 102 MPSoC TRM. 
                  https://docs.xilinx.com/r/en-US/ug1085-zynq-ultrascale-trm/Zynq-UltraScale-Device-Technical-Reference-Manual
                  
                , accessed: 2022-11-08")) that features four ARM Cortex-A53 CPUs with a shared 1 MB last-level cache, 4 GB DRAM, and a tightly coupled FPGA. The operating system that realizes the CPU regulation mechanism is a Linux system with a modified kernel.[Footnote 5](#Fn5) We extend the Jailhouse hypervisor[Footnote 6](#Fn6) to integrate Memguard with our _memory overload_ logic and to interact with our dynamic hardware memory scheduler. The overview of the detailed architecture of MCTI is presented in Fig. [5](https://link.springer.com/article/10.1007/s11241-024-09425-5#Fig5). This section presents 1) the software and hardware modifications required to enforce the regulation on the system, 2) the memory organization and layout, and 3) the benchmark framework used for the evaluations.

### 6.1 CPU and memory regulation

Because the regulation is enforced at three distinct levels, appropriate communication mechanisms have been defined to exchange the states controlling the regulation. Specifically, the Memguard logic (at the hypervisor level) plays a central role: it monitors the memory budgets of the CPUs, detects possible memory overloads, reads from the OS the criticality and deadline of the currently running task, and drives the bus policy via SchIM when required.

#### 6.1.1 SCHED_DEADLINE

As mentioned in Sect. [5](https://link.springer.com/article/10.1007/s11241-024-09425-5#Sec5), we associate each task \(\tau {}_{i}\) to a CBS server and define its maximum utilization via the runtime (\(Qc{}_{i}\)) and period (\(P{}_{i}\)) parameters. The implementation of CBS in Linux makes tasks not eligible for execution as soon as their budget has depleted, even when the CPU would otherwise be idle. This behavior has practical implications since assigning a large server period \(P{}_{i}\) would cause \(\tau {}_{i}\) to be suspended for a long time. We selected \(P{}_{i} = 1~ms\), which provides a good compromise between the granularity of the regulation and blocking time (the workload under analysis—Sect. [7](https://link.springer.com/article/10.1007/s11241-024-09425-5#Sec18)—has runtime in the range of seconds) and matches the period value of Memguard (see Sect. [6.1.2](https://link.springer.com/article/10.1007/s11241-024-09425-5#Sec14)). The implementation of CBS being flexible w.r.t. the period, we set this value as it is reasonable for both the CBS with the PMC regulation (see Sect. [6.1.2](https://link.springer.com/article/10.1007/s11241-024-09425-5#Sec14)). We extended the structure sched_attr to accommodate the criticality \(l{}_{i}\) of the task (implicitly 0, i.e., non-critical) and disabled the “rt_throttling” to statically pin tasks to CPUs.

The communication with the hypervisor level is realized via a cached, per-CPU shared memory page written by SCHED_DEADLINE and read by the hypervisor. When a SCHED_DEADLINE task is selected (de-selected) for scheduling, its criticality and current deadline are stored (cleared) in the page.

#### 6.1.2 Overload-aware PMC regulation

The PMC Regulation (Memguard) implementation in Jailhouse has been extended with the memory overload logic presented in Sect. [5](https://link.springer.com/article/10.1007/s11241-024-09425-5#Sec5).

Specifically, when the memory budget of a CPU is depleted and the CPU should be stalled, the overload-aware logic reads the criticality and deadline of the current task on the CPU as propagated by Linux. If the task is critical, the _Overload_ state (see Fig. [3](https://link.springer.com/article/10.1007/s11241-024-09425-5#Fig3)) is entered, and a change in the bus policy is communicated to SchIM. The priorities on each CPU are determined by checking (for all CPUs) the criticality of each running task and breaking same-criticality chains using the deadlines of the tasks. Upon reception of the synchronous replenishment PMC-regulation interrupt, the memory budget of each CPU is restored, and the bus policy is switched back to \(Fair\). The implementation overhead w.r.t. the standard Memguard implementation is minimal, and it only consists of reading \(m\) criticality and deadline values. In particular, by using a synchronous replenishment period, no additional interrupts or hypercalls are required. Previous studies have shown that selecting very short replenishment periods might cause excessive overheads (e.g., Schwaericke et al. ([2021](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR39 "Schwaericke G, Tabish R, Pellizzoni R, et al (2021) A Real-Time virtio-based Framework for Predictable Inter-VM Communication. In: 2021 IEEE International Real-Time Systems Symposium (RTSS)")); Zuepke et al. ([2023](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR54 "Zuepke A, Bastoni A, Chen W, et al (2023) Mempol: Policing core memory bandwidth from outside of the cores. In: 2023 IEEE 29th Real-Time and Embedded Technology and Applications Symposium (RTAS), pp 235–24
                  https://doi.org/10.1109/RTAS58335.2023.00026
                  
                "))). Other studies by Saeed et al. ([2022](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR38 "Saeed A, Dasari D, Ziegenbein D, et al (2022) Memory Utilization-Based Dynamic Bandwidth Regulation for Temporal Isolation in Multi-Cores . In: 2022 IEEE Real-Time and Embedded Technology and Applications Symposium (RTAS), p 133–145")) and Yun et al. ([2013](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR49 "Yun H, Yao G, Pellizzoni R, et al (2013) Memguard: Memory bandwidth reservation system for efficient performance isolation in multi-core platforms. In: 2013 IEEE 19th Real-Time and Embedded Technology and Applications Symposium (RTAS), pp 55–6
                  https://doi.org/10.1109/RTAS.2013.6531079
                  
                ")) have used a regulation period of 1 _ms_. Hence, we used a regulation period \(M = P{}_{i} = 1~ms\).

#### 6.1.3 SchIM

The SchIM design from Hoornaert et al. ([2021](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR19 "Hoornaert D, Roozkhosh S, Mancuso R (2021) A Memory Scheduling Infrastructure for Multi-Core Systems with Re-Programmable Logic. In: Brandenburg BB (ed) 33rd Euromicro Conference on Real-Time Systems (ECRTS 2021), Leibniz International Proceedings in Informatics (LIPIcs), vol 196. Schloss Dagstuhl – Leibniz-Zentrum für Informatik, Dagstuhl, Germany, pp 2:1–2:2
                  https://doi.org/10.4230/LIPIcs.ECRTS.2021.2
                  
                , 
                  https://drops.dagstuhl.de/opus/volltexte/2021/13933
                  
                ")) has been extended to add the features discussed in Sect. [5](https://link.springer.com/article/10.1007/s11241-024-09425-5#Sec5) and to achieve better raw performance. Specifically: (1) the frequency has been set to 300 MHz; (2) the amount of pipeline stages in the architecture has been reduced; and (3) the supported memory scheduling policies have been extended with the _Aging_ policy that realizes our \(Fair\) default scheduling policy.

The _Aging_ policy schedules transactions in a _fair_ way by giving priority to the longest stalled transaction while under contention. The scheduler keeps track of the _age_ of the queues’ head and considers the oldest head for scheduling. The _age_ of a queue’s head is maintained by a counter increasing for each clock cycle where a transaction stored in the queue’s head is stalled (i.e., larger counter values mean older transactions). The counter is reset to zero when the queue’s head transaction is scheduled or if the queue is empty.

Switching the bus policy for already set priorities is a fast activity that requires around 40 clock cycles. The bus policy switch is triggered by writing the desired scheduling policy and priorities (if required) on the mapped registers exposed by SchIM. As in Hoornaert et al. ([2021](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR19 "Hoornaert D, Roozkhosh S, Mancuso R (2021) A Memory Scheduling Infrastructure for Multi-Core Systems with Re-Programmable Logic. In: Brandenburg BB (ed) 33rd Euromicro Conference on Real-Time Systems (ECRTS 2021), Leibniz International Proceedings in Informatics (LIPIcs), vol 196. Schloss Dagstuhl – Leibniz-Zentrum für Informatik, Dagstuhl, Germany, pp 2:1–2:2
                  https://doi.org/10.4230/LIPIcs.ECRTS.2021.2
                  
                , 
                  https://drops.dagstuhl.de/opus/volltexte/2021/13933
                  
                ")), only one bus policy can be set at a time. In particular, a combination of \(Fair\) and \(FP\) for different groups of CPUs is not supported.

### 6.2 Memory organization and layout

MCTI targets systems that isolate memory regions accessed by tasks of different criticalities and avoid sharing memory between such tasks. Ensuring such desirable isolation properties throughout the MCTI stack is not trivial as it involves (1) per CPU memory range allocation, (2) address coloring, and (3) DRAM partitioning. These properties are enforced and required by different layers of the stack. For instance, within SchIM, transactions belonging to a specific CPU are logically identified using the physical address of the memory region that they target. Therefore, a precise mappings of critical tasks to specific memory address ranges has to be enforced to ensure that they will target the appropriate memory regions. Appendix B describes the implementation details of the mechanisms and provides an exhaustive technical description of the several mappings and address translations.

### 6.3 Benchmarks

**Fig. 6**

[

![](https://media.springernature.com/lw685/springer-static/image/art%3A10.1007%2Fs11241-024-09425-5/MediaObjects/11241_2024_9425_Fig6_HTML.png)

](https://link.springer.com/article/10.1007/s11241-024-09425-5/figures/6)

Examples of input used for the SD-VBS suite

The natural targets for the proposed framework are memory-intensive tasks. Hence, in all the experiments displayed in Sect. [7](https://link.springer.com/article/10.1007/s11241-024-09425-5#Sec18), memory-intensive benchmarks from the San-Diego Vision Benchmark Suite (SD-VBS) Venkata et al. ([2009](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR46 "Venkata SK, Ahn I, Jeon D, et al (2009) Sd-vbs: The san diego vision benchmark suite. In: IISWC. IEEE Computer Society, pp 55–64, 
                  http://dblp.uni-trier.de/db/conf/iiswc/iiswc2009.html#VenkataAJGLGBT09
                  
                ")) are used. Specifically, the RT-Bench (Nicolella et al. [2022](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR35 "Nicolella M, Roozkhosh S, Hoornaert D, et al (2022) Rt-bench: An extensible benchmark framework for the analysis and management of real-time applications. In: Proceedings of the 30th International Conference on Real-Time Networks and Systems. Association for Computing Machinery, New York, NY, USA, RTNS 2022, p 184–19
                  https://doi.org/10.1145/3534879.3534888
                  
                , 
                  https://doi.org/10.1145/3534879.3534888
                  
                ")) adapted version of SD-VBS has been used to simplify the acquisition of performance metrics.

As previously discussed, MCTI is helpful in scenarios where selecting specific memory-regulation levels can lead to real-time constraint violations or to excessive under-utilization of the system. In order to generate such scenarios, we consider multiple different inputs (def1, deg1, deg2, nor1, and nor2) for the algorithms of the SD-VBS. Figure [6](https://link.springer.com/article/10.1007/s11241-024-09425-5#Fig6) showcases a subset of the inputs considered. The key intuition is that when provided with different –but _equally sized_– inputs, vision algorithms behave differently and can generate different amounts of memory transactions. All experiments presented in Sect. [7](https://link.springer.com/article/10.1007/s11241-024-09425-5#Sec18) have been carried out using this framework.

## 7 Evaluation

The evaluation of the MCTI architecture presented in Sects. [5](https://link.springer.com/article/10.1007/s11241-024-09425-5#Sec5) and [6](https://link.springer.com/article/10.1007/s11241-024-09425-5#Sec11) is divided into three phases. In the first phase (Sect. [7.1](https://link.springer.com/article/10.1007/s11241-024-09425-5#Sec19)), we use the PMCs to produce performance profiles of SD-VBS benchmarks under various inputs and highlight their behavioral variations. In the second phase (Sect. [7.2](https://link.springer.com/article/10.1007/s11241-024-09425-5#Sec22)), using the insights gathered in the first phase, we identify benefits, limitations, and trade-offs of the architecture in simplified scenarios where tasks contend for a shared memory budget. Finally, in the third phase (Sect. [7.2.2](https://link.springer.com/article/10.1007/s11241-024-09425-5#Sec24)), the proposed architecture is further tested in high contention scenarios.

### 7.1 Benchmark profiling

When dealing with systems using PMC-based memory regulation, system designers must understand the exact memory requirements of each task in order to assign an adequate memory budget. In this section, to facilitate the analysis and profiling of each benchmark “in isolation”, we do not enforce any PMC-regulation for the task under analysis (_TUA_). Moreover, we do not re-route the memory accesses through SchIM. Nonetheless, each _TUA_ runs in isolation on a dedicated CPU and targets its pre-defined memory partition.

#### 7.1.1 Behavioral variations

**Fig. 7**

[

![](https://media.springernature.com/lw685/springer-static/image/art%3A10.1007%2Fs11241-024-09425-5/MediaObjects/11241_2024_9425_Fig7_HTML.png)

](https://link.springer.com/article/10.1007/s11241-024-09425-5/figures/7)

Measured Bandwidth (L2-refills over instructions retired) for each benchmark using various inputs. Each bar is normalized over the def1 input

As previously discussed, we argue that the execution and the main-memory bandwidth requirements of a benchmark vary depending on the input density. To support this intuition, we run a set of experiments that measure the amount of L2 refills and instructions retired for several benchmark-input pairs. These PMC values respectively relate to the memory bandwidth and to the execution time of a task.

Figure [7](https://link.springer.com/article/10.1007/s11241-024-09425-5#Fig7) displays the ratio of variations in the amount of L2 refills, and instructions retired that a given benchmark experiences. The results show the normalized ratio for different benchmarks w.r.t. the def1 input (leftmost, red-bar). In the plots, each inset presents a benchmark, and the available inputs are indicated on the x-axis.

### Observation 1

For the selected set of benchmarks, variations in the input-density have a direct and difficult-to-predict impact on the memory activity and CPU activity.

In mser, both the instructions retired and the L2 refills vary considerably for different inputs. This is especially the case for the deg1 input, where the amount of L2 refills triples while the instructions retired increases by only a marginal extent, resulting in a significant increase in the ratio. Conversely, tracking experiences small L2 refill variations for different inputs but a high variation of instructions executed, leading to lower ratios as represented by deg2. Finally, benchmarks such as disparity and texture_synthesis show little-to-no variation.

#### 7.1.2 Run-time memory requirements

**Fig. 8**

[

![](https://media.springernature.com/lw685/springer-static/image/art%3A10.1007%2Fs11241-024-09425-5/MediaObjects/11241_2024_9425_Fig8_HTML.png)

](https://link.springer.com/article/10.1007/s11241-024-09425-5/figures/8)

Progression of the memory consumption of disparity, mser, and tracking for various inputs

Unless a task is known to have a constant memory utilization, calculating its memory budget based on e.g., the total amount of L2 refills is bound to incur over- or under-estimations. Thus, a careful investigation of the memory accesses at run time is required to gain a better understanding. In the experiments reported in this section, we measure the number of L2 refills within a period of 10 _ms_ throughout the execution of the _TUA_.

The outcome of this set of experiments for disparity, mser, and tracking are displayed in Fig. [8](https://link.springer.com/article/10.1007/s11241-024-09425-5#Fig8)a, Fig. [8](https://link.springer.com/article/10.1007/s11241-024-09425-5#Fig8)b, and Fig. [8](https://link.springer.com/article/10.1007/s11241-024-09425-5#Fig8)c, respectively. For each of these figures, we report on the y-axis the amount of L2 refills measured every 10 _ms_ during the execution of the _TUA_  (x-axis). The process is repeated for all inputs available for the benchmark under test (mser has two additional inputs: def2 and def3).

### Observation 2

The benchmarks do not display a linear temporal memory access pattern (or constant memory consumption), making the problem of assigning a tight and sufficient memory bandwidth difficult.

As already suggested by the experiments discussed in Sect. [7.1.1](https://link.springer.com/article/10.1007/s11241-024-09425-5#Sec20), the three benchmarks display considerably different memory access patterns. On the one hand, disparity has a relatively constant memory consumption despite frequent oscillations. On the other hand, tracking and mser display higher variations. This is especially the case for mser, which features three distinct phases. A short but intense memory phase from 0 _ms_ to 20 _ms_, followed by a quieter phase until 200 _ms_, and finally, a new memory-intensive phase until task completion. In addition, under certain inputs such as deg1, deg2, and nor1, the duration and intensity of the phases drastically change. Likewise, tracking behaves differently depending on the input, with shifted phases and considerably different memory consumption (e.g., deg2).

### Observation 3

The hard-to-predict impact of input density on benchmarks complicates the assignment of bandwidth, leading to over- or under-provisioning.

Figure [8](https://link.springer.com/article/10.1007/s11241-024-09425-5#Fig8)b showcases the challenges of setting a (single) static memory budget. For example, a conservative budget of 100, 000 transactions per 10 _ms_ would not prevent regulation during intense memory phases while still causing over-provisioning for more than half of the execution time. The situation is even worse if we consider the special case of deg2, as defining a proper regulation for this input would lead to over-provisioning in most cases. Such challenges present system designers with a hard choice between over-provisioning at the expense of reduced bandwidth for the other CPUs or risking delays and possibly deadline misses in the case of memory overloads.

### 7.2 MCTI assessment

**Table 2 Summary of the scenarios considered for the evaluation**

**Table 3 Description of the experimental setups used in Sect. [7.2](https://link.springer.com/article/10.1007/s11241-024-09425-5#Sec22)**

**Table 4 Summary of the benchmarks’ bandwidths**

For the evaluation of MCTI, we use the prototype implementation described in Sects. [5](https://link.springer.com/article/10.1007/s11241-024-09425-5#Sec5) and [6](https://link.springer.com/article/10.1007/s11241-024-09425-5#Sec11). Specifically, memory transactions from the _TUA_ are re-routed through the PL side, and we enforce memory regulation via our modified Memguard and CPU domain isolation via CBS. As previously mentioned, both the Memguard regulation period and the CBS period are set to 1 _ms_. In addition to the benchmarks (_TUA_), we also consider a _co-runner_ stress task, which generates pressure on the memory sub-system by purposely creating LLC cache-line misses. The _TUA_ and its co-runner run on the same CPU, thus sharing a common memory budget but targeting different (isolated) cache partitions.

In this Section, experiments will either focus on _Single-_ or _Multi-core_ scenarios listed in Table [2](https://link.springer.com/article/10.1007/s11241-024-09425-5#Tab2). In total, we consider up to eight different scenarios whose traits are displayed in Table [3](https://link.springer.com/article/10.1007/s11241-024-09425-5#Tab3).

The _SVM_ benchmark is particularly time-expensive and has been excluded from the evaluation presented in this section. Furthermore, other benchmarks (sift and multi_ncut) either cause runtime errors or do not apply to different inputs and have similarly been excluded from the results presented in this section. We used the data from the experiments presented in Sect. [7.1.2](https://link.springer.com/article/10.1007/s11241-024-09425-5#Sec21) to guide the selection of Memguard budgets and evaluate different CBS budgets (as % of available CPU) to assign to the _TUA_.

In this section, we present the most interesting trends of the evaluation. Thus, for disparity, mser, and tracking benchmarks, we focus on two Memguard budgets (Table [4](https://link.springer.com/article/10.1007/s11241-024-09425-5#Tab4)) that intercept: 1) the average memory consumption of the benchmark (_Intermediate_) and 2) an average with a safety-margin corresponding to \((max - average)/2\) extra memory transactions (_Full_). We will refer to the association of a benchmark and a PMC budget as benchmark-budget. For instance, tracking with an associated memory budget of 2550 transactions is referred to as tracking-2550. In the multi-core category, the co-running CPUs have been assigned a large Memguard budget to ensure that they are able to pressure the bus as much as possible without being regulated. For each benchmark, we attribute a CPU budget of either 20%, 10%, or 5% to the _TUA_ in _Single-core_ scenarios and CPU budget of either 90%, 70%, 50%, 30% 20%, or 10% in _Multi-core_. In all Multi-task scenarios (i.e., _ScMt_, _ScMtC_, _McMt_, and _McMtC_), the co-runner is assigned the remaining CPU budget (i.e., the total budget of the two equals 100%) as shown in Table [3](https://link.springer.com/article/10.1007/s11241-024-09425-5#Tab3).

We focus the discussion on the most representative subsets of the benchmark-input-budget configurations. Such configurations have been selected among the full list of performed experiments (see Appendix A).

#### 7.2.1 Impact on response time in single-core scenario

**Fig. 9**

[

![](https://media.springernature.com/lw685/springer-static/image/art%3A10.1007%2Fs11241-024-09425-5/MediaObjects/11241_2024_9425_Fig9_HTML.png)

](https://link.springer.com/article/10.1007/s11241-024-09425-5/figures/9)

Response time distribution for multiple scenarios with def1 input

In this section, we study the impact of the proposed memory overload handling mechanism on the response time of the _TUA_. The set of experiments presented uses the setup and rules used in the previous section. For the sake of clarity, the benchmarks considered here only focus on the def1 input.

The measured response times of the _TUA_ under the experimented configurations and scenarios are displayed in Fig. [9](https://link.springer.com/article/10.1007/s11241-024-09425-5#Fig9). The figure is divided into six sub-figures, each focusing on a benchmark-PMC-budget combination. The average response times measured for the selected scenarios are grouped in bar clusters. Each figure has three of them; one for each _TUA_ ’s CBS utilization considered (x-axis). Within each cluster, the reported average response times are normalized over the _ScSt_ scenario to ease comparison.

### Observation 4

For all tested configurations and regardless of the benchmark under analysis, the _ScStC_ scenario displays the lowest average response time (Fig. [9](https://link.springer.com/article/10.1007/s11241-024-09425-5#Fig9)).

In the _ScStC_ scenario, the _TUA_ is the only task running and, hence, it is the only task that can deplete the memory budget. The _TUA_ being critical, whenever a memory budget depletion occurs, an overload situation also occurs, and our overload handling mechanism is triggered. Because triggering the overload handling mechanism means that the regulation rules are bypassed, in _ScStC_, the _TUA_ always bypasses the regulation, resulting in response times shorter than the regulated baseline.

### Observation 5

Under competition for memory budget, MCTI successfully shields the _TUA_ from the co-runners. On average, _ScMtC_ response times are equivalent to the _TUA_ running in isolation. The extent of improvements varies according to the benchmark (Fig. [9](https://link.springer.com/article/10.1007/s11241-024-09425-5#Fig9)).

Figure [9](https://link.springer.com/article/10.1007/s11241-024-09425-5#Fig9) shows that, in the majority of the _ScMtC_ cases, the response times are, on average, equivalent to _ScSt_, our baseline. tracking-3775, tracking-2550, mser-7250, and mser-4500 are exceptions to this trend and show marginal increases in average response times. Such trends occur in constrained scenarios where the CBS utilization is set to \(5\%\). Finally, we note that _ScMtC_ is the only scenario incurring fluctuations as shown by the standard deviations in Fig. [9](https://link.springer.com/article/10.1007/s11241-024-09425-5#Fig9). We suspect that the cause of such fluctuations is the lack of high-precision synchronization between the start of memory-regulation and CPU-regulation periods between hypervisor and OS layers. Depending on the workload, the misalignment between memory and CPU regulation can cause fluctuations in the budget-depletion instants for both CPU _or_ memory. In turn, this can result in faster (slower) response times depending on the periodicity and memory requirements of the workloads. We discuss possible tradeoffs and solutions in Sect. [8](https://link.springer.com/article/10.1007/s11241-024-09425-5#Sec25).

#### 7.2.2 Impact on the response time in multi-core scenario

This section assesses the response time under multi-core workload scenarios. The setup for this evaluation is identical to the one used previously, except that the other CPUs are active. In order to put pressure on the memory subsystem, these co-running CPUs emit large read memory request sequences in the direction of the PL side and, indirectly, towards the main memory. These _memory bombs_ are marked as non-critical and hence, should obtain a low priority on the shared interconnect when memory overload occurs.

### Observation 6

In multi-core scenarios and well-provisioned memory budget configurations, MCTI isolates the _TUA_ from co-runners’ disturbances (Fig. [10](https://link.springer.com/article/10.1007/s11241-024-09425-5#Fig10)).

For the _Full_ memory configurations (upper row in Fig. [10](https://link.springer.com/article/10.1007/s11241-024-09425-5#Fig10)), we observe that the measured response times for the _McMtC_ scenario are equivalent to _McSt_, our baseline. There are only two exceptions: (1) an outlier in tracking-3775 with a CBS utilization of \(50\%\) and (2) a larger standard deviation in mser-4500 with a CBS utilization of \(50\%\). We can even observe that for disparity-9900 and high CBS utilizations for tracking-3775 and mser-4500, the reported average response times are equivalent to _McStC_.

### Observation 7

In multi-core scenarios with constrained memory budget configurations, the average response times measured vary (Fig. [10](https://link.springer.com/article/10.1007/s11241-024-09425-5#Fig10)).

For constrained memory budget configurations (lower row in Fig. [10](https://link.springer.com/article/10.1007/s11241-024-09425-5#Fig10)), a majority of CBS utilizations yield average response times contained between _McSt_ (our target) and _McStC_ (the best case scenario). On the other hand, for low CBS utilizations, the average response times recorded for _McMtC_ increase. For tracking-2550, _McMtC_ ’s response times remain underneath _McSt_ levels (our target) but reach or slightly exceed for \(30\%\) and \(10\%\) CBS utilizations. Likewise, mser-4500 has a _McMtC_ response time in par with _McStC_ (the best case scenario) for a CBS utilization of \(90\%\) before equaling _McSt_ (our target) for \(70\%\) CBS utilization and, finally, reaching the levels of _McMt_ (the worst-case scenario) for the lower CBS utilizations.

### Observation 8

In scenarios with constrained memory budgets, it is difficult to predict the impact of MCTI on the response time, since it depends on the benchmark and the CBS utilization.

Under multi-core scenarios, as emphasized by Observations [6](https://link.springer.com/article/10.1007/s11241-024-09425-5#FPar8) and [8](https://link.springer.com/article/10.1007/s11241-024-09425-5#FPar10), predicting the exact response times of the _TUA_ is challenging due to three influencing factors: the memory budget, the CBS utilization, and the benchmark’s nature (w.r.t. the memory load). Observation [8](https://link.springer.com/article/10.1007/s11241-024-09425-5#FPar10) suggests that a system with a constrained memory budget is more sensitive to the settings of other configuration parameters. Due to the unexpected influence of input density on memory requirements, constrained memory budget configurations are not unlikely, mandating a careful profiling and characterization of benchmarks and applications behavior for multiple parameters. Moreover, in conjunction with the constrained memory budget, the configuration of the CBS utilization also affects the response times in _McMtC_ scenarios in a non-linear manner. The inflection point where the _McMtC_ response time exceeds the target for a given CBS utilization depends on the benchmark being considered. As a result, determining the appropriate CBS utilization requires profiling and analysis of the benchmark’s behavior.

**Fig. 10**

[

![](https://media.springernature.com/lw685/springer-static/image/art%3A10.1007%2Fs11241-024-09425-5/MediaObjects/11241_2024_9425_Fig10_HTML.png)

](https://link.springer.com/article/10.1007/s11241-024-09425-5/figures/10)

Normalized response time for multiple scenarios using the def1 input

## 8 Discussion

Memory and runtime behavior may considerably change depending on the type of inputs that applications are processing (Sects. [7.1.1](https://link.springer.com/article/10.1007/s11241-024-09425-5#Sec20), [7.1.2](https://link.springer.com/article/10.1007/s11241-024-09425-5#Sec21)). The mismatches between the desired flexibility in CPU scheduling, isolation of mixed-criticality workloads, and inflexibility in the per-CPU memory management may result in memory overloads that prevent high-criticality tasks from running in their allocated CPU reservations. The architecture of MCTI targets all such dimensions by integrating CBS-reservations atop a partitioning hypervisor and by relaxing the inflexibility of the per-CPU memory management with a more flexible interconnect policy.

MCTI can successfully protect the critical _TUA_ from external disturbances coming from the concurrent non-critical co-runners (Sects. [7.2.1](https://link.springer.com/article/10.1007/s11241-024-09425-5#Sec23), [7.2.2](https://link.springer.com/article/10.1007/s11241-024-09425-5#Sec24)). In both single- and multi-core scenarios, the average response time of the critical _TUA_ is lower than the worst-case scenario (i.e., _ScMt_) and, on average, equal to the ideal isolated scenario (i.e., _McSt_). Nonetheless, in all scenarios where the _TUA_ is critical (i.e., _ScMtC_ and _McMtC_), it can be observed that variations in the response time are present; hence, the exact shielding effect of MCTI ’s regulation on the bandwidth varies as a function of the CBS utilization and the benchmarks themselves. However, such deviations are contained and—as verified from the raw measurements—no _TUA_ ’s response time exceeds the worst-case scenario (i.e., _ScMt_ or _McMt_). This indicates that even in the unlikely worst-case scenario, MCTI never exceeds the worst response time while providing, in most cases, response times similar to the ideal isolated target. Considering these results, we believe MCTI is an attractive choice for mixed-criticality soft real-time systems.

The reported fluctuations are a direct indication of the difficulty of configuring systems using budget-based regulation. Although MCTI helps isolate critical tasks, it does not exempt from a careful profiling of the tasks considered. Specifically, both CBS utilization, input density, and the memory-access patterns of benchmarks affect the behavior of tasks regulated by MCTI.

One of the most complex configuration aspects of MCTI is the lack of low-overhead synchronization between the hypervisor and the OS layers (e.g., to ensure aligned memory and CBS periods). Synchronization _hypercalls_ are expensive, and sharing read and _write_ memory between the hypervisor and the OS violates the separation of different privilege levels. On the other hand, directly realizing memory regulation within the OS lacks the isolation properties provided by e.g., partitioning hypervisors.

Even by sacrificing the isolation capabilities of a hypervisor, the interface offered by the hardware to control memory is far from flexible and from providing low overheads. In fact, despite logically belonging to the hardware, PMC regulators must be periodically replenished by the software. In addition, one must consider the large constraints imposed by e.g., SchIM as the conjunction of the FPGA routing and the back-pressure mechanism feedback considerably adds to the complexity of implementation.

## 9 Related Work

Memory bandwidth partitioning has found wide adoption for the consolidation of real-time applications on multicore platforms. In particular, budget-based bandwidth regulation initially proposed in Yun et al. ([2016](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR51 "Yun H, Yao G, Pellizzoni R et al (2016) Memory Bandwidth Management for Efficient Performance Isolation in Multi-Core Platforms. IEEE Transactions on Computers 65(2):562–576")) has received significant attention owing to its practicality. Several works have proposed schedulability results for systems under static (Yun et al. [2016](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR51 "Yun H, Yao G, Pellizzoni R et al (2016) Memory Bandwidth Management for Efficient Performance Isolation in Multi-Core Platforms. IEEE Transactions on Computers 65(2):562–576"); Awan et al. [2018b](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR7 "Awan MA, Souto PF, Bletsas K, et al (2018b) Worst-case Stall Analysis for Multicore Architectures with Two Memory Controllers. In: Altmeyer S (ed) 30th Euromicro Conference on Real-Time Systems (ECRTS 2018), Leibniz International Proceedings in Informatics (LIPIcs), vol 106. Schloss Dagstuhl–Leibniz-Zentrum fuer Informatik, Dagstuhl, Germany, pp 2:1–2:2
                  https://doi.org/10.4230/LIPIcs.ECRTS.2018.2
                  
                , 
                  http://drops.dagstuhl.de/opus/volltexte/2018/9002
                  
                "); Mancuso et al. [2017](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR30 "Mancuso R, Pellizzoni R, Tokcan N, et al (2017) WCET Derivation under Single Core Equivalence with Explicit Memory Budget Assignment. In: 29th Euromicro Conference on Real-Time Systems (ECRTS 2017), Leibniz International Proceedings in Informatics (LIPIcs), vol 76. Schloss Dagstuhl–Leibniz-Zentrum fuer Informatik, Dagstuhl, Germany, pp 3:1–3:2
                  https://doi.org/10.4230/LIPIcs.ECRTS.2017.3
                  
                , 
                  http://drops.dagstuhl.de/opus/volltexte/2017/7168
                  
                ")) and dynamic (Awan et al. [2018a](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR6 "Awan MA, Bletsas K, Souto PF, et al (2018a) Mixed-criticality scheduling with dynamic memory bandwidth regulation. In: 2018 IEEE 24th International Conference on Embedded and Real-Time Computing Systems and Applications (RTCSA), pp 111–11
                  https://doi.org/10.1109/RTCSA.2018.00022
                  
                "); Agrawal et al. [2017](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR2 "Agrawal A, Fohler G, Freitag J, et al (2017) Contention-Aware Dynamic Memory Bandwidth Isolation with Predictability in COTS Multicores: An Avionics Case Study. In: Bertogna M (ed) 29th Euromicro Conference on Real-Time Systems (ECRTS 2017), Leibniz International Proceedings in Informatics (LIPIcs), vol 76. Schloss Dagstuhl–Leibniz-Zentrum fuer Informatik, Dagstuhl, Germany, pp 2:1–2:2
                  https://doi.org/10.4230/LIPIcs.ECRTS.2017.2
                  
                , 
                  http://drops.dagstuhl.de/opus/volltexte/2017/7174
                  
                "), [2018](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR3 "Agrawal A, Mancuso R, Pellizzoni R, et al (2018) Analysis of dynamic memory bandwidth regulation in multi-core real-time systems. In: 2018 IEEE Real-Time Systems Symposium (RTSS), pp 230–24
                  https://doi.org/10.1109/RTSS.2018.00040
                  
                ")) bandwidth regulation. In a way that is closely related to this paper, the interplay between CPU-level scheduling and budget-based memory bandwidth regulation has been explored in the case of fixed-priority (Yun et al. [2016](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR51 "Yun H, Yao G, Pellizzoni R et al (2016) Memory Bandwidth Management for Efficient Performance Isolation in Multi-Core Platforms. IEEE Transactions on Computers 65(2):562–576"); Mancuso et al. [2017](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR30 "Mancuso R, Pellizzoni R, Tokcan N, et al (2017) WCET Derivation under Single Core Equivalence with Explicit Memory Budget Assignment. In: 29th Euromicro Conference on Real-Time Systems (ECRTS 2017), Leibniz International Proceedings in Informatics (LIPIcs), vol 76. Schloss Dagstuhl–Leibniz-Zentrum fuer Informatik, Dagstuhl, Germany, pp 3:1–3:2
                  https://doi.org/10.4230/LIPIcs.ECRTS.2017.3
                  
                , 
                  http://drops.dagstuhl.de/opus/volltexte/2017/7168
                  
                "); Agrawal et al. [2018](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR3 "Agrawal A, Mancuso R, Pellizzoni R, et al (2018) Analysis of dynamic memory bandwidth regulation in multi-core real-time systems. In: 2018 IEEE Real-Time Systems Symposium (RTSS), pp 230–24
                  https://doi.org/10.1109/RTSS.2018.00040
                  
                ")), mixed-criticality (Awan et al. [2018a](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR6 "Awan MA, Bletsas K, Souto PF, et al (2018a) Mixed-criticality scheduling with dynamic memory bandwidth regulation. In: 2018 IEEE 24th International Conference on Embedded and Real-Time Computing Systems and Applications (RTCSA), pp 111–11
                  https://doi.org/10.1109/RTCSA.2018.00022
                  
                ")), and multi-frame task models (Awan et al. [2019](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR8 "Awan MA, Souto PF, Bletsas K, et al (2019) Memory bandwidth regulation for multiframe task sets. In: 2019 IEEE 25th International Conference on Embedded and Real-Time Computing Systems and Applications (RTCSA), pp 1–1
                  https://doi.org/10.1109/RTCSA.2019.8864563
                  
                ")). In the derivation of the aforementioned results, the lack of coordination between the CPU scheduler and bandwidth regulators is either prevented—i.e., task context-switches can only occur at the boundary of regulation periods—or accounted for in the analysis. Furthermore, these works consider applications whose worst-case memory bandwidth demand can be either statically derived or experimentally bounded. The proposed MCTI differentiates itself from these works because 1) it considers a realistic implementation of CPU-level scheduling and memory bandwidth regulation enacted at two different layers of the software stack; 2) postulates that applications with input-dependent memory access patterns require a reactive approach for joint CPU and memory management; and 3) describes a possible hardware/software co-design to add runtime elasticity to bandwidth regulation.

In light of the limitations and additional analysis complexity caused by budget-based bandwidth regulation, a number of researchers have investigated variations and alternative approaches to enact inter-core bandwidth partitioning. First, implementation at the hypervisor level was proposed in Modica et al. ([2018](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR34 "Modica P, Biondi A, Buttazzo G, et al (2018) Supporting temporal and spatial isolation in a hypervisor for arm multicore platforms. In: 2018 IEEE International Conference on Industrial Technology (ICIT), pp 1651–165
                  https://doi.org/10.1109/ICIT.2018.8352429
                  
                ")), Dagieu et al. ([2016](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR13 "Dagieu N, Spyridakis A, Raho D (2016) Memguard: A memory bandwith management in mixed criticality virtualized systems memguard kvm scheduling. In: 10th Int. Conf. on Mobile Ubiquitous Comput., Syst., Services and Technologies (UBICOMM)")), and Martins et al. ([2020](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR31 "Martins J, Tavares A, Solieri M, et al (2020) Bao: A lightweight static partitioning hypervisor for modern multi-core embedded systems. In: Workshop on Next Generation Real-Time Embedded Systems (NG-RES 2020), OpenAccess Series in Informatics (OASIcs), vol 77. Schloss Dagstuhl–Leibniz-Zentrum fuer Informatik, Dagstuhl, Germany, pp 3:1–3:1
                  https://doi.org/10.4230/OASIcs.NG-RES.2020.3
                  
                , 
                  https://drops.dagstuhl.de/opus/volltexte/2020/11779
                  
                ")) as a way to significantly lower the regulation overhead and to make it transparent w.r.t. CPU scheduling. Similarly, we adapted support for PMC-based regulation implemented in the Jailhouse hypervisor. A second line of work has attacked the problem of implementing bandwidth partitioning directly in hardware. The first work in this direction was by Zhou and Wentzlaff ([2016](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR53 "Zhou Y, Wentzlaff D (2016) Mitts: Memory inter-arrival time traffic shaping. In: Proceedings of the 43rd International Symposium on Computer Architecture. IEEE Press, ISCA ’16, p 532–54
                  https://doi.org/10.1109/ISCA.2016.53
                  
                , 
                  https://doi.org/10.1109/ISCA.2016.53
                  
                ")), while a generalization of the regulation strategy that could be applied at multiple levels of the memory hierarchy was studied in Farshchi et al. ([2020](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR14 "Farshchi F, Huang Q, Yun H (2020) Bru: Bandwidth regulation unit for real-time multicore processors. In: 2020 IEEE Real-Time and Embedded Technology and Applications Symposium (RTAS), pp 364–37
                  https://doi.org/10.1109/RTAS48715.2020.00011
                  
                ")). In the same spirit, other works have investigated the use of bandwidth regulation primitives already available in commercial platforms (Sohal et al. [2020](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR42 "Sohal P, Tabish R, Drepper U, et al (2020) E-WarP: A System-wide Framework for Memory Bandwidth Profiling and Management. In: 2020 IEEE Real-Time Systems Symposium (RTSS)"); Serrano-Cases et al. [2021](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR40 "Serrano-Cases A, Reina JM, Abella J, et al (2021) Leveraging Hardware QoS to Control Contention in the Xilinx Zynq UltraScale+ MPSoC. In: Brandenburg BB (ed) 33rd Euromicro Conference on Real-Time Systems (ECRTS 2021), Leibniz International Proceedings in Informatics (LIPIcs), vol 196. Schloss Dagstuhl – Leibniz-Zentrum für Informatik, Dagstuhl, Germany, pp 3:1–3:2
                  https://doi.org/10.4230/LIPIcs.ECRTS.2021.3
                  
                , 
                  https://drops.dagstuhl.de/opus/volltexte/2021/13934
                  
                "); Houdek et al. [2017](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR20 "Houdek P, Sojka M, Hanzálek Z (2017) Towards predictable execution model on arm-based heterogeneous platforms. In: 2017 IEEE 26th International Symposium on Industrial Electronics (ISIE), pp 1297–130
                  https://doi.org/10.1109/ISIE.2017.8001432
                  
                ")). Compared to these works, our MCTI is substantially different in scope because its goal is to augment budget-based regulation—regardless of its implementation—with the ability to handle transient overload conditions.

The fundamental problem of unarbitrated memory bandwidth contention has also been attacked by devising adaptations at the level of the main memory interconnect and controller. In particular, the works in Mirosanlou et al. ([2020](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR33 "Mirosanlou R, Hassan M, Pellizzoni R (2020) Drambulism: Balancing performance and predictability through dynamic pipelining. In: 2020 IEEE Real-Time and Embedded Technology and Applications Symposium (RTAS), pp 82–9
                  https://doi.org/10.1109/RTAS48715.2020.00-15
                  
                ")), Hassan et al. ([2017](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR17 "Hassan M, Patel H, Pellizzoni R (2017) Pmc: A requirement-aware dram controller for multicore mixed criticality systems. ACM Trans Embed Comput Syst 16(4
                  https://doi.org/10.1145/3019611
                  
                , 
                  https://doi.org/10.1145/3019611
                  
                ")), Valsan and Yun ([2015](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR45 "Valsan PK, Yun H (2015) Medusa: A predictable and high-performance dram controller for multicore based embedded systems. In: 2015 IEEE 3rd International Conference on Cyber-Physical Systems, Networks, and Applications, pp 86–9
                  https://doi.org/10.1109/CPSNA.2015.24
                  
                ")), and Jalle et al. ([2014](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR22 "Jalle J, Quiñones E, Abella J, et al (2014) A dual-criticality memory controller (dcmc): Proposal and evaluation of a space case study. In: 2014 IEEE Real-Time Systems Symposium, pp 207–21
                  https://doi.org/10.1109/RTSS.2014.23
                  
                ")) focus on modifications to the DRAM controller logic to drastically reduce the worst-case latency of main memory requests in the presence of multicore contention. On a parallel track, enforcing Time Division Multiplexing (TDM) at the level of interconnect has been explored in Hebbache et al. ([2018](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR18 "Hebbache F, Jan M, Brandner F, et al (2018) Shedding the shackles of time-division multiplexing. In: 2018 IEEE Real-Time Systems Symposium (RTSS), pp 456–46
                  https://doi.org/10.1109/RTSS.2018.00059
                  
                ")), Jun et al. ([2007](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR23 "Jun M, Bang K, Lee HJ, et al (2007) Slack-based bus arbitration scheme for soft real-time constrained embedded systems. In: 2007 Asia and South Pacific Design Automation Conference, pp 159–16
                  https://doi.org/10.1109/ASPDAC.2007.357979
                  
                ")), Li et al. ([2016](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR28 "Li Y, Akesson K, Goossens K (2016) Architecture and analysis of a dynamically-scheduled real-time memory controller. Real-Time Syst 52(5):675–772. 
                  https://doi.org/10.1007/s11241-015-9235-y
                  
                ")), and Kostrzewa et al. ([2016](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR26 "Kostrzewa A, Saidi S, Ernst R (2016) Slack-based resource arbitration for real-time networks-on-chip. In: 2016 Design, Automation Test in Europe Conference Exhibition (DATE), pp 1012–1017")). For instance, the work in Kostrzewa et al. ([2016](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR26 "Kostrzewa A, Saidi S, Ernst R (2016) Slack-based resource arbitration for real-time networks-on-chip. In: 2016 Design, Automation Test in Europe Conference Exhibition (DATE), pp 1012–1017")) proposes a slack-based bus arbitration scheme where the per-transaction slack is static and computed offline for all the critical tasks, while the authors in Hebbache et al. ([2018](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR18 "Hebbache F, Jan M, Brandner F, et al (2018) Shedding the shackles of time-division multiplexing. In: 2018 IEEE Real-Time Systems Symposium (RTSS), pp 456–46
                  https://doi.org/10.1109/RTSS.2018.00059
                  
                ")) propose a strategy to compute a safe lower-bound on the slack of memory requests at runtime. Although research on predictable memory interconnects and controllers have achieved important milestones, the inability to efficiently carry out system-level implementation and evaluation has traditionally hindered their practicality. The work proposed in Hoornaert et al. ([2021](https://link.springer.com/article/10.1007/s11241-024-09425-5#ref-CR19 "Hoornaert D, Roozkhosh S, Mancuso R (2021) A Memory Scheduling Infrastructure for Multi-Core Systems with Re-Programmable Logic. In: Brandenburg BB (ed) 33rd Euromicro Conference on Real-Time Systems (ECRTS 2021), Leibniz International Proceedings in Informatics (LIPIcs), vol 196. Schloss Dagstuhl – Leibniz-Zentrum für Informatik, Dagstuhl, Germany, pp 2:1–2:2
                  https://doi.org/10.4230/LIPIcs.ECRTS.2021.2
                  
                , 
                  https://drops.dagstuhl.de/opus/volltexte/2021/13933
                  
                ")), which represents one of the building blocks of MCTI, demonstrated that implementing transaction-level memory scheduling is possible in multicore systems with on-chip programmable logic. In the context of the literature surveyed above, MCTI is the first work to propose the integration of task- and transaction-level memory scheduling strategies to handle unpredictable overload conditions while delivering a full-stack implementation on a commercial system.

## 10 Conclusion

In this paper, we discussed the difficulties of appropriately setting CPU and memory budgets for real-time tasks with memory needs dependent on input density (e.g., vision or AI-based applications). Furthermore, we have shown how—in the worst-case—such misconfigurations might lead to _memory overloads_ where critical tasks are not eligible for scheduling due to a premature depletion of the memory budget.

In order to solve these issues while preserving isolation among mixed-criticality tasks, we proposed MCTI, a layered architecture integrating OS-based CBS-regulation and hypervisor-based memory management with a flexible management of hardware interconnect priorities. To the best of our knowledge, MCTI is the first architecture that attempts to holistically address the needs of a) CPU- and memory isolation, and b) strong isolation of mixed-criticality workloads, in the face of inflexible management of the interconnect.

The prototype builds on established systems such as the Linux kernel, CBS, and Memguard. We have proposed, described, implemented, and assessed a full-stack architecture capable of handling and taming the effects of memory overloads in most cases. The implementation is evaluated on a widely available out-of-the-shelf platform.

Our results indicate that MCTI is effective in protecting critical tasks from external interference and avoiding memory-overload issues. Nonetheless, the results also indicate that achieving CPU isolation and flexible memory management while preserving strong partitioning of mixed-criticality workloads is a non-trivial task, and several improvements at both software and hardware levels are needed. We intend to progressively devise such improvements in future works.

## References

*   Abeni L, Buttazzo G (1998) Integrating multimedia applications in hard real-time systems. In: Proceedings 19th IEEE Real-Time Systems Symposium (Cat. No.98CB36279), pp 4–13, [https://doi.org/10.1109/REAL.1998.739726](https://doi.org/10.1109/REAL.1998.739726)
    
*   Agrawal A, Fohler G, Freitag J, et al (2017) Contention-Aware Dynamic Memory Bandwidth Isolation with Predictability in COTS Multicores: An Avionics Case Study. In: Bertogna M (ed) 29th Euromicro Conference on Real-Time Systems (ECRTS 2017), Leibniz International Proceedings in Informatics (LIPIcs), vol 76. Schloss Dagstuhl–Leibniz-Zentrum fuer Informatik, Dagstuhl, Germany, pp 2:1–2:2[https://doi.org/10.4230/LIPIcs.ECRTS.2017.2](https://doi.org/10.4230/LIPIcs.ECRTS.2017.2) [](https://www.sci-hub.ee/10.4230/LIPIcs.ECRTS.2017.2) , [http://drops.dagstuhl.de/opus/volltexte/2017/7174](http://drops.dagstuhl.de/opus/volltexte/2017/7174)
    
*   Agrawal A, Mancuso R, Pellizzoni R, et al (2018) Analysis of dynamic memory bandwidth regulation in multi-core real-time systems. In: 2018 IEEE Real-Time Systems Symposium (RTSS), pp 230–24[https://doi.org/10.1109/RTSS.2018.00040](https://doi.org/10.1109/RTSS.2018.00040)
    
*   Anandtech (2019) NVIDIA Drive AGX Orin. https://www.anandtech.com/show/15245/nvidia-details-drive-agx-orin-a-herculean-arm-automotive-soc-for-2022, accessed: 2021-10-13
    
*   ARM (2022) Arm Architecture Reference Manual Supplement. Memory System Resource Partitioning and Monitoring (MPAM) for Armv8-A. https://developer.arm.com/docs/ddi0598/latest Accessed: 2021-02-08
    
*   Awan MA, Bletsas K, Souto PF, et al (2018a) Mixed-criticality scheduling with dynamic memory bandwidth regulation. In: 2018 IEEE 24th International Conference on Embedded and Real-Time Computing Systems and Applications (RTCSA), pp 111–11[https://doi.org/10.1109/RTCSA.2018.00022](https://doi.org/10.1109/RTCSA.2018.00022)
    
*   Awan MA, Souto PF, Bletsas K, et al (2018b) Worst-case Stall Analysis for Multicore Architectures with Two Memory Controllers. In: Altmeyer S (ed) 30th Euromicro Conference on Real-Time Systems (ECRTS 2018), Leibniz International Proceedings in Informatics (LIPIcs), vol 106. Schloss Dagstuhl–Leibniz-Zentrum fuer Informatik, Dagstuhl, Germany, pp 2:1–2:2[https://doi.org/10.4230/LIPIcs.ECRTS.2018.2](https://doi.org/10.4230/LIPIcs.ECRTS.2018.2) [](https://www.sci-hub.ee/10.4230/LIPIcs.ECRTS.2018.2) , [http://drops.dagstuhl.de/opus/volltexte/2018/9002](http://drops.dagstuhl.de/opus/volltexte/2018/9002)
    
*   Awan MA, Souto PF, Bletsas K, et al (2019) Memory bandwidth regulation for multiframe task sets. In: 2019 IEEE 25th International Conference on Embedded and Real-Time Computing Systems and Applications (RTCSA), pp 1–1[https://doi.org/10.1109/RTCSA.2019.8864563](https://doi.org/10.1109/RTCSA.2019.8864563)
    
*   Brandenburg BB (2011) Scheduling and locking in multiprocessor real-time operating systems. PhD thesis, The University of North Carolina at Chapel Hill
    
*   Buttazzo G, Bini E (2006) Optimal dimensioning of a constant bandwidth server. In: 2006 27th IEEE International Real-Time Systems Symposium (RTSS’06), pp 169–17[https://doi.org/10.1109/RTSS.2006.31](https://doi.org/10.1109/RTSS.2006.31)
    
*   Buttazzo GC (2011) Hard Real-time Computing Systems: Predictable Scheduling Algorithms And Applications (Real-Time Systems Series). Springer-Verlag
    
*   Cinque M, De Tommasi G, Dubbioso S, et al (2022) Rpuguard: Real-time processing unit virtualization for mixed-criticality applications. In: 2022 18th European Dependable Computing Conference (EDCC), pp 97–10[https://doi.org/10.1109/EDCC57035.2022.00025](https://doi.org/10.1109/EDCC57035.2022.00025)
    
*   Dagieu N, Spyridakis A, Raho D (2016) Memguard: A memory bandwith management in mixed criticality virtualized systems memguard kvm scheduling. In: 10th Int. Conf. on Mobile Ubiquitous Comput., Syst., Services and Technologies (UBICOMM)
    
*   Farshchi F, Huang Q, Yun H (2020) Bru: Bandwidth regulation unit for real-time multicore processors. In: 2020 IEEE Real-Time and Embedded Technology and Applications Symposium (RTAS), pp 364–37[https://doi.org/10.1109/RTAS48715.2020.00011](https://doi.org/10.1109/RTAS48715.2020.00011)
    
*   Ghaemi G, Tarapore D, Mancuso R (2021) Governing with Insights: Towards Profile-Driven Cache Management of Black-Box Applications. In: Brandenburg BB (ed) 33rd Euromicro Conference on Real-Time Systems (ECRTS 2021), Leibniz International Proceedings in Informatics (LIPIcs), vol 196. Schloss Dagstuhl – Leibniz-Zentrum für Informatik, Dagstuhl, Germany, pp 4:1–4:2[https://doi.org/10.4230/LIPIcs.ECRTS.2021.4](https://doi.org/10.4230/LIPIcs.ECRTS.2021.4) [](https://www.sci-hub.ee/10.4230/LIPIcs.ECRTS.2021.4) , [https://drops.dagstuhl.de/opus/volltexte/2021/13935](https://drops.dagstuhl.de/opus/volltexte/2021/13935)
    
*   Green Hills Software (2023) GHS Integrity. https://www.ghs.com/products/rtos/integrity_virtualization.html
    
*   Hassan M, Patel H, Pellizzoni R (2017) Pmc: A requirement-aware dram controller for multicore mixed criticality systems. ACM Trans Embed Comput Syst 16(4[https://doi.org/10.1145/3019611](https://doi.org/10.1145/3019611) [](https://www.sci-hub.ee/10.1145/3019611) , [https://doi.org/10.1145/3019611](https://doi.org/10.1145/3019611)
    
*   Hebbache F, Jan M, Brandner F, et al (2018) Shedding the shackles of time-division multiplexing. In: 2018 IEEE Real-Time Systems Symposium (RTSS), pp 456–46[https://doi.org/10.1109/RTSS.2018.00059](https://doi.org/10.1109/RTSS.2018.00059)
    
*   Hoornaert D, Roozkhosh S, Mancuso R (2021) A Memory Scheduling Infrastructure for Multi-Core Systems with Re-Programmable Logic. In: Brandenburg BB (ed) 33rd Euromicro Conference on Real-Time Systems (ECRTS 2021), Leibniz International Proceedings in Informatics (LIPIcs), vol 196. Schloss Dagstuhl – Leibniz-Zentrum für Informatik, Dagstuhl, Germany, pp 2:1–2:2[https://doi.org/10.4230/LIPIcs.ECRTS.2021.2](https://doi.org/10.4230/LIPIcs.ECRTS.2021.2) [](https://www.sci-hub.ee/10.4230/LIPIcs.ECRTS.2021.2) , [https://drops.dagstuhl.de/opus/volltexte/2021/13933](https://drops.dagstuhl.de/opus/volltexte/2021/13933)
    
*   Houdek P, Sojka M, Hanzálek Z (2017) Towards predictable execution model on arm-based heterogeneous platforms. In: 2017 IEEE 26th International Symposium on Industrial Electronics (ISIE), pp 1297–130[https://doi.org/10.1109/ISIE.2017.8001432](https://doi.org/10.1109/ISIE.2017.8001432)
    
*   Intel, Corp. (2016) Intel’s Stratix 10 FPGA: Supporting the smart and connected revolution. [https://newsroom.intel.com/editorials/intels-stratix-10-fpga-supporting-smart-connected-revolution/](https://newsroom.intel.com/editorials/intels-stratix-10-fpga-supporting-smart-connected-revolution/), accessed on 2022-01-19
    
*   Jalle J, Quiñones E, Abella J, et al (2014) A dual-criticality memory controller (dcmc): Proposal and evaluation of a space case study. In: 2014 IEEE Real-Time Systems Symposium, pp 207–21[https://doi.org/10.1109/RTSS.2014.23](https://doi.org/10.1109/RTSS.2014.23)
    
*   Jun M, Bang K, Lee HJ, et al (2007) Slack-based bus arbitration scheme for soft real-time constrained embedded systems. In: 2007 Asia and South Pacific Design Automation Conference, pp 159–16[https://doi.org/10.1109/ASPDAC.2007.357979](https://doi.org/10.1109/ASPDAC.2007.357979)
    
*   Kim H, Rajkumar RR (2016) Real-Time Cache Management for Multi-Core Virtualization. In: Proceedings of the 13th International Conference on Embedded Software. Association for Computing Machinery, New York, NY, USA, EMSOFT ’16
    
*   Kloda T, Solieri M, Mancuso R, et al (2019) Deterministic Memory Hierarchy and Virtualization for Modern Multi-Core Embedded Systems. In: 2019 IEEE Real-Time and Embedded Technology and Applications Symposium (RTAS), p 1–14
    
*   Kostrzewa A, Saidi S, Ernst R (2016) Slack-based resource arbitration for real-time networks-on-chip. In: 2016 Design, Automation Test in Europe Conference Exhibition (DATE), pp 1012–1017
    
*   Lelli J, Scordino C, Abeni L et al (2016) Deadline scheduling in the Linux kernel. Softw Pract Exp 46(6):821–839
    
    [Article](https://doi.org/10.1002%2Fspe.2335)  [Google Scholar](http://scholar.google.com/scholar_lookup?&title=Deadline%20scheduling%20in%20the%20Linux%20kernel&journal=Softw%20Pract%20Exp&doi=10.1002%2Fspe.2335&volume=46&issue=6&pages=821-839&publication_year=2016&author=Lelli%2CJ&author=Scordino%2CC&author=Abeni%2CL) 
    
*   Li Y, Akesson K, Goossens K (2016) Architecture and analysis of a dynamically-scheduled real-time memory controller. Real-Time Syst 52(5):675–772. [https://doi.org/10.1007/s11241-015-9235-y](https://doi.org/10.1007/s11241-015-9235-y)
    
    [Article](https://link.springer.com/doi/10.1007/s11241-015-9235-y)  [Google Scholar](http://scholar.google.com/scholar_lookup?&title=Architecture%20and%20analysis%20of%20a%20dynamically-scheduled%20real-time%20memory%20controller&journal=Real-Time%20Syst&doi=10.1007%2Fs11241-015-9235-y&volume=52&issue=5&pages=675-772&publication_year=2016&author=Li%2CY&author=Akesson%2CK&author=Goossens%2CK) 
    
*   Mancuso R, Dudko R, Betti E, et al (2013) Real-time cache management framework for multi-core architectures. In: 2013 IEEE 19th Real-Time and Embedded Technology and Applications Symposium (RTAS), p 45–54
    
*   Mancuso R, Pellizzoni R, Tokcan N, et al (2017) WCET Derivation under Single Core Equivalence with Explicit Memory Budget Assignment. In: 29th Euromicro Conference on Real-Time Systems (ECRTS 2017), Leibniz International Proceedings in Informatics (LIPIcs), vol 76. Schloss Dagstuhl–Leibniz-Zentrum fuer Informatik, Dagstuhl, Germany, pp 3:1–3:2[https://doi.org/10.4230/LIPIcs.ECRTS.2017.3](https://doi.org/10.4230/LIPIcs.ECRTS.2017.3) [](https://www.sci-hub.ee/10.4230/LIPIcs.ECRTS.2017.3) , [http://drops.dagstuhl.de/opus/volltexte/2017/7168](http://drops.dagstuhl.de/opus/volltexte/2017/7168)
    
*   Martins J, Tavares A, Solieri M, et al (2020) Bao: A lightweight static partitioning hypervisor for modern multi-core embedded systems. In: Workshop on Next Generation Real-Time Embedded Systems (NG-RES 2020), OpenAccess Series in Informatics (OASIcs), vol 77. Schloss Dagstuhl–Leibniz-Zentrum fuer Informatik, Dagstuhl, Germany, pp 3:1–3:1[https://doi.org/10.4230/OASIcs.NG-RES.2020.3](https://doi.org/10.4230/OASIcs.NG-RES.2020.3) [](https://www.sci-hub.ee/10.4230/OASIcs.NG-RES.2020.3) , [https://drops.dagstuhl.de/opus/volltexte/2020/11779](https://drops.dagstuhl.de/opus/volltexte/2020/11779)
    
*   Microsemi — Microchip Technology Inc. (2020) PolarFire SoC - Lowest Power, Multi-Core RISC-V SoC FPGA. [https://www.microsemi.com/product-directory/soc-fpgas/5498-polarfire-soc-fpga](https://www.microsemi.com/product-directory/soc-fpgas/5498-polarfire-soc-fpga), accessed on 09.01.2020
    
*   Mirosanlou R, Hassan M, Pellizzoni R (2020) Drambulism: Balancing performance and predictability through dynamic pipelining. In: 2020 IEEE Real-Time and Embedded Technology and Applications Symposium (RTAS), pp 82–9[https://doi.org/10.1109/RTAS48715.2020.00-15](https://doi.org/10.1109/RTAS48715.2020.00-15)
    
*   Modica P, Biondi A, Buttazzo G, et al (2018) Supporting temporal and spatial isolation in a hypervisor for arm multicore platforms. In: 2018 IEEE International Conference on Industrial Technology (ICIT), pp 1651–165[https://doi.org/10.1109/ICIT.2018.8352429](https://doi.org/10.1109/ICIT.2018.8352429)
    
*   Nicolella M, Roozkhosh S, Hoornaert D, et al (2022) Rt-bench: An extensible benchmark framework for the analysis and management of real-time applications. In: Proceedings of the 30th International Conference on Real-Time Networks and Systems. Association for Computing Machinery, New York, NY, USA, RTNS 2022, p 184–19[https://doi.org/10.1145/3534879.3534888](https://doi.org/10.1145/3534879.3534888) [](https://www.sci-hub.ee/10.1145/3534879.3534888) , [https://doi.org/10.1145/3534879.3534888](https://doi.org/10.1145/3534879.3534888)
    
*   Roozkhosh S, Mancuso R (2020) The potential of programmable logic in the middle: Cache bleaching. In: 2020 IEEE Real-Time and Embedded Technology and Applications Symposium (RTAS), pp 296–30[https://doi.org/10.1109/RTAS48715.2020.00006](https://doi.org/10.1109/RTAS48715.2020.00006)
    
*   RTCA Inc. (2011) RTCA/DO-178C Software Consideration in Airborne Systems and Equipment Certification
    
*   Saeed A, Dasari D, Ziegenbein D, et al (2022) Memory Utilization-Based Dynamic Bandwidth Regulation for Temporal Isolation in Multi-Cores . In: 2022 IEEE Real-Time and Embedded Technology and Applications Symposium (RTAS), p 133–145
    
*   Schwaericke G, Tabish R, Pellizzoni R, et al (2021) A Real-Time virtio-based Framework for Predictable Inter-VM Communication. In: 2021 IEEE International Real-Time Systems Symposium (RTSS)
    
*   Serrano-Cases A, Reina JM, Abella J, et al (2021) Leveraging Hardware QoS to Control Contention in the Xilinx Zynq UltraScale+ MPSoC. In: Brandenburg BB (ed) 33rd Euromicro Conference on Real-Time Systems (ECRTS 2021), Leibniz International Proceedings in Informatics (LIPIcs), vol 196. Schloss Dagstuhl – Leibniz-Zentrum für Informatik, Dagstuhl, Germany, pp 3:1–3:2[https://doi.org/10.4230/LIPIcs.ECRTS.2021.3](https://doi.org/10.4230/LIPIcs.ECRTS.2021.3) [](https://www.sci-hub.ee/10.4230/LIPIcs.ECRTS.2021.3) , [https://drops.dagstuhl.de/opus/volltexte/2021/13934](https://drops.dagstuhl.de/opus/volltexte/2021/13934)
    
*   Siemens AG (2023) Jailhouse hypervisor. https://github.com/siemens/jailhouse, accessed: 2023-06-06
    
*   Sohal P, Tabish R, Drepper U, et al (2020) E-WarP: A System-wide Framework for Memory Bandwidth Profiling and Management. In: 2020 IEEE Real-Time Systems Symposium (RTSS)
    
*   SYSGO G (2023) PikeOS Hypervisor. https://www.sysgo.com
    
*   Tabish R, Wen J, Pellizzoni R, et al (2021) An analyzable inter-core communication framework for high-performance multicore embedded systems. Journal of Systems Architecture p 10217[https://doi.org/10.1016/j.sysarc.2021.102178](https://doi.org/10.1016/j.sysarc.2021.102178) [](https://www.sci-hub.ee/10.1016/j.sysarc.2021.102178) , [https://www.sciencedirect.com/science/article/pii/S1383762121001284](https://www.sciencedirect.com/science/article/pii/S1383762121001284)
    
*   Valsan PK, Yun H (2015) Medusa: A predictable and high-performance dram controller for multicore based embedded systems. In: 2015 IEEE 3rd International Conference on Cyber-Physical Systems, Networks, and Applications, pp 86–9[https://doi.org/10.1109/CPSNA.2015.24](https://doi.org/10.1109/CPSNA.2015.24)
    
*   Venkata SK, Ahn I, Jeon D, et al (2009) Sd-vbs: The san diego vision benchmark suite. In: IISWC. IEEE Computer Society, pp 55–64, [http://dblp.uni-trier.de/db/conf/iiswc/iiswc2009.html#VenkataAJGLGBT09](http://dblp.uni-trier.de/db/conf/iiswc/iiswc2009.html#VenkataAJGLGBT09)
    
*   Xilinx (2022) ZCU 102 MPSoC TRM. [https://docs.xilinx.com/r/en-US/ug1085-zynq-ultrascale-trm/Zynq-UltraScale-Device-Technical-Reference-Manual](https://docs.xilinx.com/r/en-US/ug1085-zynq-ultrascale-trm/Zynq-UltraScale-Device-Technical-Reference-Manual), accessed: 2022-11-08
    
*   Xilinx (2023) Xilinx Versal. [https://www.xilinx.com/products/silicon-devices/acap/versal.html](https://www.xilinx.com/products/silicon-devices/acap/versal.html), accessed: 2021-10-13
    
*   Yun H, Yao G, Pellizzoni R, et al (2013) Memguard: Memory bandwidth reservation system for efficient performance isolation in multi-core platforms. In: 2013 IEEE 19th Real-Time and Embedded Technology and Applications Symposium (RTAS), pp 55–6[https://doi.org/10.1109/RTAS.2013.6531079](https://doi.org/10.1109/RTAS.2013.6531079)
    
*   Yun H, Pellizzoni R, Valsan PK (2015) Parallelism-aware memory interference delay analysis for cots multicore systems. In: 2015 27th Euromicro Conference on Real-Time Systems, pp 184–19[https://doi.org/10.1109/ECRTS.2015.24](https://doi.org/10.1109/ECRTS.2015.24)
    
*   Yun H, Yao G, Pellizzoni R et al (2016) Memory Bandwidth Management for Efficient Performance Isolation in Multi-Core Platforms. IEEE Transactions on Computers 65(2):562–576
    
    [Article](https://doi.org/10.1109%2FTC.2015.2425889)  [MathSciNet](http://www.ams.org/mathscinet-getitem?mr=3456563)  [Google Scholar](http://scholar.google.com/scholar_lookup?&title=Memory%20Bandwidth%20Management%20for%20Efficient%20Performance%20Isolation%20in%20Multi-Core%20Platforms&journal=IEEE%20Transactions%20on%20Computers&doi=10.1109%2FTC.2015.2425889&volume=65&issue=2&pages=562-576&publication_year=2016&author=Yun%2CH&author=Yao%2CG&author=Pellizzoni%2CR) 
    
*   Yun H, Ali W, Gondi S 等 (2017) BWLOCK：用于多核平台上软实时应用的动态内存访问控制框架。IEEE Trans Comput 66(7):1247–1252
    
    [文章](https://doi.org/10.1109%2FTC.2016.2640961)  [MathSciNet](http://www.ams.org/mathscinet-getitem?mr=3664072)   [Google Scholar](http://scholar.google.com/scholar_lookup?&title=BWLOCK%3A%20a%20dynamic%20memory%20access%20control%20framework%20for%20soft%20real-time%20applications%20on%20multicore%20platforms&journal=IEEE%20Trans%20Comput&doi=10.1109%2FTC.2016.2640961&volume=66&issue=7&pages=1247-1252&publication_year=2017&author=Yun%2CH&author=Ali%2CW&author=Gondi%2CS) 
    
*   Zhou Y, Wentzlaff D (2016) Mitts：内存到达间隔时间流量整形。刊于：第 43 届国际计算机体系结构研讨会论文集。IEEE Press，ISCA '16，第 532–54 页[https://doi.org/10.1109/ISCA.2016.53](https://doi.org/10.1109/ISCA.2016.53) [](https://www.sci-hub.ee/10.1109/ISCA.2016.53) ，[https://doi.org/10.1109/ISCA.2016.53](https://doi.org/10.1109/ISCA.2016.53)
    
*   Zuepke A、Bastoni A、Chen W 等人 (2023) Mempol：从内核外部监管内核内存带宽。见：2023 IEEE 第 29 届实时和嵌入式技术与应用研讨会 (RTAS)，第 235-24 页[https://doi.org/10.1109/RTAS58335.2023.00026](https://doi.org/10.1109/RTAS58335.2023.00026)[](https://www.sci-hub.ee/10.1109/RTAS58335.2023.00026)
    

[下载参考资料](https://citation-needed.springer.com/v2/references/10.1007/s11241-024-09425-5?format=refman&flavour=references)