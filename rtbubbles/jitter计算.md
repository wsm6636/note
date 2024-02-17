---
created: 2023-07-08T20:32
updated: 2024-02-13T22:42
tags:
  - 笔记
  - 笔记/实验
---
#笔记/实验
# jitter计算


![](https://cdn.jsdelivr.net/gh/wsm6636/pic/202303192000461.png)

## 连续周期抖动（现有计算）

$J_s=h^k-h^{k-1}=L_s^{k-1}+L_s^{k+1}-2L_s^{k}$

$h=period\_{us} = 1000$
$h^{k-1}=curr\_{period} = curr\_{ktime} - last\_{ktime}$
$J_s=jitter = curr\_{period} - period\_{us}$
$L_s^k=latency = curr\_{ktime} - start\_{ktime}$

现有指标：$maxJ_s=max|h^k-h^{k-1}|$
## 采样抖动

$J_s=maxL_s^k-minL_s^k=max\;{latency}-min \;{latency}$

假设控制器最小采样抖动为零，则
$J_s=maxL_s^k=max\;{latency}$

## 采样间隔抖动

$J_h=maxh^k-minh^k=max\;curr\_{period}-min\;curr\_{period}$

## 输入输出抖动

$J_{io}=maxL_{io}^k-minL_{io}^k$

**输入输出延迟怎么计算**
