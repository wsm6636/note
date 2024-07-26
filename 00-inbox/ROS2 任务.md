---
tags:
  - 笔记
  - 待归档
  - 笔记/学习笔记
created: 2024-04-07T16:29
updated: 2024-07-26T11:05
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
## ROS2_tracing 

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
