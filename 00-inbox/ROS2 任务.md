---
tags:
  - 笔记
  - 待归档
  - 笔记/学习笔记
created: 2024-04-07T16:29
updated: 2024-07-26T15:33
status:
  - ing
---
- [ ] 0：ros2_tracing可监控数据类型 [link](#^0596df)
- [ ] 1：延迟数据分布，最大最小等[link](#^c726d3)
- [ ] 2：延迟受到的影响[link](#^54c007)
	- [ ] 21： 调度策略（满负载or没有）[link](#^4f795d)
	- [ ] 22： DDL策略，改变执行时间，保持一样的DDL和T[link](#^8ed557)
	- [ ] 23：多线程单线程执行器[link](#^635625)
	- [ ] 24： 其他监控类型：消息队列状态，消息丢失[link](#^8f381e)
- [ ] 3： 了解DDS不同实现，评估（多特蒙德的 Jian-Jia Chen 团队使用 OMNet++ 模拟 可能丢失通信数据包）[link](#^e70095)
- [ ] 4： ROS应用层性能（环境影响，做出反应）（例如，人行横道等）。也许 CARLA 是一个不错的选择：  [link](#^070a6e)
[https://carla.org/](https://carla.org/)  
[https://carla.readthedocs.io/projects/ros-bridge/en/latest/](https://carla.readthedocs.io/projects/ros-bridge/en/latest/)


> [!NOTE] 参考
> 
[ROS2使用](../03-research/11-ROS/ROS2使用.md)
# 0：ros2_tracing可监控数据类型

^0596df
## ROS2_tracing API

|    层     | 仪表点                                  | 参考                                                                                                                                                                                                                                                                                                                                                                                                               |
| :------: | :----------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rclcpp` | `rclcpp_subscription_init`           | [_创建订阅_](https://github.com/ros2/ros2_tracing/blob/humble/doc/design_ros_2.md#subscription-creation)                                                                                                                                                                                                                                                                                                             |
|          | `rclcpp_subscription_callback_added` | [_创建订阅_](https://github.com/ros2/ros2_tracing/blob/humble/doc/design_ros_2.md#subscription-creation)                                                                                                                                                                                                                                                                                                             |
|          | `rclcpp_publish`                     | [_消息发布_](https://github.com/ros2/ros2_tracing/blob/humble/doc/design_ros_2.md#message-publishing)                                                                                                                                                                                                                                                                                                                |
|          | `rclcpp_take`                        | [_订阅回调_](https://github.com/ros2/ros2_tracing/blob/humble/doc/design_ros_2.md#subscription-callbacks)                                                                                                                                                                                                                                                                                                            |
|          | `rclcpp_service_callback_added`      | [_服务创建_](https://github.com/ros2/ros2_tracing/blob/humble/doc/design_ros_2.md#service-creation)                                                                                                                                                                                                                                                                                                                  |
|          | `rclcpp_timer_callback_added`        | [_定时器创建_](https://github.com/ros2/ros2_tracing/blob/humble/doc/design_ros_2.md#timer-creation)                                                                                                                                                                                                                                                                                                                   |
|          | `rclcpp_timer_link_node`             | [_定时器创建_](https://github.com/ros2/ros2_tracing/blob/humble/doc/design_ros_2.md#timer-creation)                                                                                                                                                                                                                                                                                                                   |
|          | `rclcpp_callback_register`           | [_订阅创建_](https://github.com/ros2/ros2_tracing/blob/humble/doc/design_ros_2.md#subscription-creation)、[_服务创建_](https://github.com/ros2/ros2_tracing/blob/humble/doc/design_ros_2.md#service-creation)、[_计时器创建_](https://github.com/ros2/ros2_tracing/blob/humble/doc/design_ros_2.md#timer-creation)                                                                                                              |
|          | `callback_start`                     | [_订阅回调_](https://github.com/ros2/ros2_tracing/blob/humble/doc/design_ros_2.md#subscription-callbacks)、[_服务回调_](https://github.com/ros2/ros2_tracing/blob/humble/doc/design_ros_2.md#service-callbacks)、[_客户端请求/响应_](https://github.com/ros2/ros2_tracing/blob/humble/doc/design_ros_2.md#client-requestresponse)、[_计时器回调_](https://github.com/ros2/ros2_tracing/blob/humble/doc/design_ros_2.md#timer-callbacks) |
|          | `callback_end`                       | [_订阅回调_](https://github.com/ros2/ros2_tracing/blob/humble/doc/design_ros_2.md#subscription-callbacks)、[_服务回调_](https://github.com/ros2/ros2_tracing/blob/humble/doc/design_ros_2.md#service-callbacks)、[_客户端请求/响应_](https://github.com/ros2/ros2_tracing/blob/humble/doc/design_ros_2.md#client-requestresponse)、[_计时器回调_](https://github.com/ros2/ros2_tracing/blob/humble/doc/design_ros_2.md#timer-callbacks) |
|          | `rclcpp_executor_get_next_ready`     | [_执行者_](https://github.com/ros2/ros2_tracing/blob/humble/doc/design_ros_2.md#executors)                                                                                                                                                                                                                                                                                                                          |
|          | `rclcpp_executor_wait_for_work`      | [_执行者_](https://github.com/ros2/ros2_tracing/blob/humble/doc/design_ros_2.md#executors)                                                                                                                                                                                                                                                                                                                          |
|          | `rclcpp_executor_execute`            | [_执行器_](https://github.com/ros2/ros2_tracing/blob/humble/doc/design_ros_2.md#executors)、[_计时器回调_](https://github.com/ros2/ros2_tracing/blob/humble/doc/design_ros_2.md#timer-callbacks)、[_订阅回调_](https://github.com/ros2/ros2_tracing/blob/humble/doc/design_ros_2.md#subscription-callbacks)                                                                                                                    |
|  `rcl`   | `rcl_init`                           | [_进程创建_](https://github.com/ros2/ros2_tracing/blob/humble/doc/design_ros_2.md#process-creation)                                                                                                                                                                                                                                                                                                                  |
|          | `rcl_node_init`                      | [_节点/组件创建_](https://github.com/ros2/ros2_tracing/blob/humble/doc/design_ros_2.md#nodecomponent-creation)                                                                                                                                                                                                                                                                                                         |
|          | `rcl_publisher_init`                 | [_发布者创建_](https://github.com/ros2/ros2_tracing/blob/humble/doc/design_ros_2.md#publisher-creation)                                                                                                                                                                                                                                                                                                               |
|          | `rcl_subscription_init`              | [_创建订阅_](https://github.com/ros2/ros2_tracing/blob/humble/doc/design_ros_2.md#subscription-creation)                                                                                                                                                                                                                                                                                                             |
|          | `rcl_publish`                        | [_消息发布_](https://github.com/ros2/ros2_tracing/blob/humble/doc/design_ros_2.md#message-publishing)                                                                                                                                                                                                                                                                                                                |
|          | `rcl_take`                           | [_订阅回调_](https://github.com/ros2/ros2_tracing/blob/humble/doc/design_ros_2.md#subscription-callbacks)                                                                                                                                                                                                                                                                                                            |
|          | `rcl_client_init`                    | [_客户端创建_](https://github.com/ros2/ros2_tracing/blob/humble/doc/design_ros_2.md#client-creation)                                                                                                                                                                                                                                                                                                                  |
|          | `rcl_service_init`                   | [_服务创建_](https://github.com/ros2/ros2_tracing/blob/humble/doc/design_ros_2.md#service-creation)                                                                                                                                                                                                                                                                                                                  |
|          | `rcl_timer_init`                     | [_定时器创建_](https://github.com/ros2/ros2_tracing/blob/humble/doc/design_ros_2.md#timer-creation)                                                                                                                                                                                                                                                                                                                   |
|          | `rcl_lifecycle_state_machine_init`   | [_状态机创建_](https://github.com/ros2/ros2_tracing/blob/humble/doc/design_ros_2.md#state-machine-creation)                                                                                                                                                                                                                                                                                                           |
|          | `rcl_lifecycle_transition`           | [_状态机转换_](https://github.com/ros2/ros2_tracing/blob/humble/doc/design_ros_2.md#state-machine-transitions)                                                                                                                                                                                                                                                                                                        |
|  `rmw`   | `rmw_publisher_init`                 | [_发布者创建_](https://github.com/ros2/ros2_tracing/blob/humble/doc/design_ros_2.md#publisher-creation)                                                                                                                                                                                                                                                                                                               |
|          | `rmw_subscription_init`              | [_创建订阅_](https://github.com/ros2/ros2_tracing/blob/humble/doc/design_ros_2.md#subscription-creation)                                                                                                                                                                                                                                                                                                             |
|          | `rmw_publish`                        | [_消息发布_](https://github.com/ros2/ros2_tracing/blob/humble/doc/design_ros_2.md#message-publishing)                                                                                                                                                                                                                                                                                                                |
|          | `rmw_take`                           | [_订阅回调_](https://github.com/ros2/ros2_tracing/blob/humble/doc/design_ros_2.md#subscription-callbacks)                                                                                                                                                                                                                                                                                                            |

## tracetools_analysis API
tracetools_analysis 提供了用于分析由 ros2_tracing 软件包生成的 ROS 2 系统跟踪数据的工具。

- - [tracetools_analysis](https://ros-tracing.gitlab.io/tracetools_analysis-api/master/tracetools_analysis/api/tracetools_analysis.html)
        - [`time_diff_to_str()`](https://ros-tracing.gitlab.io/tracetools_analysis-api/master/tracetools_analysis/api/tracetools_analysis.html#tracetools_analysis.time_diff_to_str)
        - [loading](https://ros-tracing.gitlab.io/tracetools_analysis-api/master/tracetools_analysis/api/tracetools_analysis.html#module-tracetools_analysis.loading)
            - [`load_file()`](https://ros-tracing.gitlab.io/tracetools_analysis-api/master/tracetools_analysis/api/tracetools_analysis.html#tracetools_analysis.loading.load_file)
        - [processor](https://ros-tracing.gitlab.io/tracetools_analysis-api/master/tracetools_analysis/api/tracetools_analysis.html#module-tracetools_analysis.processor)
            - [`AutoProcessor`](https://ros-tracing.gitlab.io/tracetools_analysis-api/master/tracetools_analysis/api/tracetools_analysis.html#tracetools_analysis.processor.AutoProcessor)
            - [`Dependant`](https://ros-tracing.gitlab.io/tracetools_analysis-api/master/tracetools_analysis/api/tracetools_analysis.html#tracetools_analysis.processor.Dependant)
            - [`DependencySolver`](https://ros-tracing.gitlab.io/tracetools_analysis-api/master/tracetools_analysis/api/tracetools_analysis.html#tracetools_analysis.processor.DependencySolver)
            - [`EventHandler`](https://ros-tracing.gitlab.io/tracetools_analysis-api/master/tracetools_analysis/api/tracetools_analysis.html#tracetools_analysis.processor.EventHandler)
            - [`EventMetadata`](https://ros-tracing.gitlab.io/tracetools_analysis-api/master/tracetools_analysis/api/tracetools_analysis.html#tracetools_analysis.processor.EventMetadata)
            - [`ProcessingProgressDisplay`](https://ros-tracing.gitlab.io/tracetools_analysis-api/master/tracetools_analysis/api/tracetools_analysis.html#tracetools_analysis.processor.ProcessingProgressDisplay)
            - [`Processor`](https://ros-tracing.gitlab.io/tracetools_analysis-api/master/tracetools_analysis/api/tracetools_analysis.html#tracetools_analysis.processor.Processor)
            - [CPU time](https://ros-tracing.gitlab.io/tracetools_analysis-api/master/tracetools_analysis/api/tracetools_analysis.html#module-tracetools_analysis.processor.cpu_time)
            - [memory usage](https://ros-tracing.gitlab.io/tracetools_analysis-api/master/tracetools_analysis/api/tracetools_analysis.html#module-tracetools_analysis.processor.memory_usage)
            - [profile](https://ros-tracing.gitlab.io/tracetools_analysis-api/master/tracetools_analysis/api/tracetools_analysis.html#module-tracetools_analysis.processor.profile)
            - [ROS 2](https://ros-tracing.gitlab.io/tracetools_analysis-api/master/tracetools_analysis/api/tracetools_analysis.html#module-tracetools_analysis.processor.ros2)
        - [data model](https://ros-tracing.gitlab.io/tracetools_analysis-api/master/tracetools_analysis/api/tracetools_analysis.html#module-tracetools_analysis.data_model)
            - [`DataModel`](https://ros-tracing.gitlab.io/tracetools_analysis-api/master/tracetools_analysis/api/tracetools_analysis.html#tracetools_analysis.data_model.DataModel)
            - [CPU time](https://ros-tracing.gitlab.io/tracetools_analysis-api/master/tracetools_analysis/api/tracetools_analysis.html#id3)
            - [memory usage](https://ros-tracing.gitlab.io/tracetools_analysis-api/master/tracetools_analysis/api/tracetools_analysis.html#id4)
            - [profile](https://ros-tracing.gitlab.io/tracetools_analysis-api/master/tracetools_analysis/api/tracetools_analysis.html#id5)
            - [ROS 2](https://ros-tracing.gitlab.io/tracetools_analysis-api/master/tracetools_analysis/api/tracetools_analysis.html#id6)
        - [utils](https://ros-tracing.gitlab.io/tracetools_analysis-api/master/tracetools_analysis/api/tracetools_analysis.html#module-tracetools_analysis.utils)
            - [`DataModelUtil`](https://ros-tracing.gitlab.io/tracetools_analysis-api/master/tracetools_analysis/api/tracetools_analysis.html#tracetools_analysis.utils.DataModelUtil)
            - [CPU time](https://ros-tracing.gitlab.io/tracetools_analysis-api/master/tracetools_analysis/api/tracetools_analysis.html#id7)
            - [memory usage](https://ros-tracing.gitlab.io/tracetools_analysis-api/master/tracetools_analysis/api/tracetools_analysis.html#id8)
            - [profile](https://ros-tracing.gitlab.io/tracetools_analysis-api/master/tracetools_analysis/api/tracetools_analysis.html#id9)
            - [ROS 2](https://ros-tracing.gitlab.io/tracetools_analysis-api/master/tracetools_analysis/api/tracetools_analysis.html#id10)

### processor
#### CPUTimeHandler
**tracetools_analysis.processor.cpu_time.CpuTimeHandler**
从 sched_switch 事件中提取时间戳，以便稍后计算每个线程的 CPU 时间
#### KernelMemoryUsageHandler**
**tracetools_analysis.processor.memory_usage.KernelMemoryUsageHandler** 
提取用户空间内存使用数据的处理程序。
它使用以下事件：
- kmem_mm_page_alloc
- kmem_mm_page_free
#### UserspaceMemoryUsageHandler
**tracetools_analysis.processor.memory_usage.UserspaceMemoryUsageHandler**
#### Ros2Handler**
**tracetools_analysis.processor.ros2.Ros2Handler**
ROS 2 感知事件处理类实现。处理跟踪事件并使用数据构建模型。

### utils
#### DataModelUtil
**tracetools_analysis.utils.DataModelUtil**
基础数据模型 util 类，提供获取数据模型更多信息的函数。 该类提供基本的 util 函数。 创建 DataModelUtil。
**compute_column_difference**
用两列之间的差值创建新列。
**convert_time_columns**
将时间列从纳秒转换为毫秒或日期时间对象。
#### CpuTimeDataModelUtil
**tracetools_analysis.utils.cpu_time.CpuTimeDataModelUtil**
CPU 时间数据模型实用程序类。 创建一个 CpuTimeDataModelUtil。
**get_time_per_thread**
获取每个线程总持续时间的 DataFrame。
#### MemoryUsageDataModelUtil
**tracetools_analysis.utils.memory_usage.MemoryUsageDataModelUtil**
内存使用数据模型实用程序类。 创建一个 MemoryUsageDataModelUtil，必须至少给出一个非空的 MemoryUsageDataModel。
**format_size**
将内存大小格式化为带有单位后缀的字符串。
**get_absolute_kernel_memory_usage_by_tid**
获取每个 tid 在一段时间内的内核内存绝对使用量。
**get_absolute_userspace_memory_usage_by_tid**
获取每个 tid 在一段时间内的绝对用户空间内存使用量。
**get_max_memory_usage_per_tid**
获取每个 tid 的最大内存使用量。
#### ProfileDataModelUtil
**tracetools_analysis.utils.profile.ProfileDataModelUtil**
剖析数据模型实用程序类。 创建 ProfileDataModelUtil。
**get_call_tree**

**get_function_duration_data**
获取每个函数的持续时间数据。
**get_tids**
获取数据模型中的 TID。
**with_tid**

#### Ros2DataModelUtil
**tracetools_analysis.utils.ros2.Ros2DataModelUtil**
创建一个 Ros2DataModelUtil。
**format_info_dict**

**get_callback_durations**
为给定的回调对象获取回调实例的持续时间。
**get_callback_owner_info**
获取回调所有者的信息。
根据回调类型，它将提供不同类型的信息： subscription：节点名称、主题名称 timer：tid、计时器周期 service/client：节点名称、服务名称
**get_callback_symbols**
获取回调对象与其解析符号之间的映射。
**get_client_handle_info**
获取客户句柄的信息。
**get_lifecycle_node_handle_info**
获取生命周期节点句柄的信息。
**get_lifecycle_node_state_intervals**
获取所有生命周期节点的状态间隔（开始、结束）。 返回的字典包含每个生命周期节点句柄的数据帧：（生命周期节点句柄 -> [状态字符串、开始时间戳、结束时间戳]）如果没有明确的时间戳（例如状态结束），则使用 np.nan 代替。 节点创建时间戳被用作第一个状态的起始时间戳。 TODO(christophebedard)对上下文关闭的最后结束时间做同样的处理
**get_node_handle_info**
获取节点句柄的信息。
**get_node_names_from_tid**
获取 tid 对应的节点名称列表。
**get_node_tid_from_name**
获取节点对应的 tid。 
**get_publish_instances**
在单个数据帧中获取所有发布实例（rclcpp、rcl、rmw）。 行按发布时间戳排序，因此顺序通常为：rclcpp、rcl、rmw。 不过，这不适用于内部发布者的出版物，即源自 rclcpp（rcl 或 rmw）以下的出版物。 TODO(christophebedard)能否找到排除这些出版物的启发式方法？
**get_publisher_handle_info**
获取发布者句柄的相关信息。
**get_rcl_publish_instances**
获取具有给定主题名称的所有发布者的 rcl 发布实例。
**get_service_handle_info**
获取服务句柄的信息。
**get_subscription_reference_info**
获取订阅句柄的信息。
**get_take_instances**
获取单个数据帧中的所有占用实例（rmw、rcl、rclcpp）。 行按占用时间戳排序，因此顺序通常是：rmw、rcl、rclcpp。 但是，这不适用于来自内部订阅的记录，即来自 rclcpp 以下（rcl 或 rmw）的记录。 TODO(christophebedard)是否可以找到排除这些情况的启发式方法？
**get_tids**
获取节点对应的线程 ID 列表。
**get_timer_handle_info**
获取计时器所有者的信息。


#  1：延迟数据分布，最大最小等

^c726d3



# 2：延迟收到的影响

^54c007

## 21： 调度策略（满负载or没有）

^4f795d

## 22： DDL策略，改变执行时间，保持一样的DDL和T

^8ed557

## 23：多线程单线程执行器

^635625

## 24： 其他监控类型：消息队列状态，消息丢失

^8f381e


# 3： 了解DDS不同实现，评估

^e70095

# 4： ROS应用层性能

^070a6e
