---
tags:
  - 笔记
  - 待归档
  - 笔记/idea
created: 2024-04-07T16:29
updated: 2024-04-18T12:52
status:
  - ing
---
# idea1
## 结合zero jitter和自己的分析

老师的论文：周期性任务，时间触发
自己的论文：事件触发

考虑：TSN是否有时间触发/周期等方式
	如果有，和前面的任务一样考虑
	如果没有，如何结合他们

两个思考方向： 
1. 把DAC论文变成TT链考虑，同时需要考虑TSN的情况
2. 考虑ET任务链是否有jitter的情况

# idea2
## 考虑在任务执行中读写的情况。
One problem is the fact that tasks may write in the middle of the execution, not necessarily at the end