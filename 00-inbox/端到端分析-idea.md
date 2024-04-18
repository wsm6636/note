---
tags:
  - 笔记
  - 待归档
  - 笔记/idea
created: 2024-04-07T16:29
updated: 2024-04-18T14:31
status:
  - ing
---
# 整体方向
可以考虑的方向： 
	1. ET+TSN分析（DAC）
	2. TT+TSN分析，老师的jitter论文
	3. 考虑执行中读写，ET和TT分别： 可以单独考虑任务链或者加上TSN
	4. 优化TSN
可以分场景使用ET和TT

# idea1
## 结合zero jitter和自己的分析

老师的论文：周期性任务，时间触发
自己的论文：事件触发

考虑：TSN是否有时间触发/周期等方式
	如果有，和前面的任务一样考虑
	如果没有，如何结合他们

两个思考方向： 
1. 把DAC论文变成TT链考虑，同时需要考虑TSN的情况
	1. jitter： 主要问题是保证任务没有被错过（应该主要是第一个任务，也就是采集数据的，能保证每一次的采集都被利用，这样可能保证控制得平稳）
	2. 
2. 考虑ET任务链是否有jitter的情况
	1. 应该没有



# idea2
## 考虑在任务执行中读写的情况。
One problem is the fact that tasks may write in the middle of the execution, not necessarily at the end