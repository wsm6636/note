---
title: srAnnote@一行命令跑满 Linux 的 CPU_linux 跑满 cpu 命令 - CSDN 博客
alias:
  - srAnnote@一行命令跑满 Linux 的 CPU_linux 跑满 cpu 命令 - CSDN 博客
type: Simpread
tag: 
created: 2024-07-18T11:00
updated: 2024-07-18T11:00
---

# 一行命令跑满 Linux 的 CPU_linux 跑满 cpu 命令 - CSDN 博客

> [!summary] 描述  
> 文章浏览阅读3.4k次，点赞3次，收藏11次。今天突发奇想，想看看Linux的CPU跑满的样子其实一行命令就可以使CPU跑满for i in `seq 1 $(cat /proc/cpuinfo |grep "physical id" |wc -l)`; do dd if=/dev/zero of=/dev/null & done这里说明一下cat /proc/cpuinfo |grep "physical id" | wc -l可以获得CPU的个数可以把他表示为N-seq 1 N 用来生成１到Ｎ之间的数字for i in s_linux 跑满cpu 命令

> [!md] Metadata  
> **标题**:: "一行命令跑满 Linux 的 CPU_linux 跑满 cpu 命令 - CSDN 博客"  
> **日期**:: [[2024-07-18]]  

## Annotations

> [📌](<http://localhost:7026/reading/0#id=1721293225456>) <mark style="background-color: #a2e9f2">Highlight</mark> 
> 其实一行命令就可以使 CPU 跑满

^sran-1721293225456




