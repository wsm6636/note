---
tags:
  - 笔记
  - 待归档
  - 笔记/学习笔记
created: 2024-05-27T16:29:00
updated: 2024-05-27T15:54
status:
  - ing
---
## 域ID  ROS_DOMAIN_ID[](https://docs.ros.org/en/humble/Concepts/Intermediate/About-Domain-ID.html#the-ros-domain-id "链接至此标题")

如其他地方所述，ROS 2 用于通信的默认中间件是 DDS。在 DDS 中，让不同的逻辑网络共享物理网络的主要机制称为域 ID。**同一域上的 ROS 2 节点可以自由地发现并相互发送消息，而不同域上的 ROS 2 节点则不能**。默认情况下，所有 ROS 2 节点都使用域 ID 0。为了避免在同一网络上运行 ROS 2 的不同计算机组之间发生干扰，应为每个组设置不同的域 ID。

默认情况下，Linux 内核使用端口 32768-60999 作为临时端口。这意味着可以安全地使用域 ID 0-101 和 215-232，而不会与临时端口发生冲突。在 Linux 中，可以通过在 中设置自定义值来配置临时端口范围`/proc/sys/net/ipv4/ip_local_port_range`。如果使用自定义临时端口范围，则可能需要相应调整上述数字。

