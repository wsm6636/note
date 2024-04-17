---
created: 2024-03-27T12:30
updated: 2024-04-17T14:39
tags:
  - 笔记/文献笔记
  - 待归档
  - 笔记
status:
  - todo
---
 



**title:** Reaction Time Analysis of Event-Triggered Processing Chains with Data Refreshing
**TitleTranslation:**  具有数据刷新的事件触发处理链的反应时间分析
**Journal or Conference:**   2023 60th ACM/IEEE Design Automation Conference (DAC)  
**Authors:**  YueTang, NanGuan, XuJiang, ZhengDong, WangYi
**Pub.date:**  2023-07
**DOI:**  10.1109/DAC56929.2023.10248012
**zoterolink:**  [zotero](zotero://select/library/items/EHFT8Q5Q)
**link:** [[Reaction Time Analysis of Event-Triggered Processing Chains with Data Refreshing]]



# <font color="#ffd400">问题</font>



















### 第1个注释
#### 文本:
τi−1 produces a new data
#### 评论:
🔤−Iτ1生成一个新数据🔤

#### zotero位置:
[2023_Reaction Time Analysis of Event-Triggered Processing Chains with Data RefreshingTang et al_.pdf](zotero://open-pdf/library/items/YDS35XT9?page=2&annotation=GCCS6AYR)



### 第2个注释
#### 文本:
Bi overflows
#### 评论:
🔤BI溢出🔤

#### zotero位置:
[2023_Reaction Time Analysis of Event-Triggered Processing Chains with Data RefreshingTang et al_.pdf](zotero://open-pdf/library/items/YDS35XT9?page=2&annotation=87N8ZC98)



### 第3个注释
#### 文本:
oldest data frame in Bi will be overwritten by the new data frame.
#### 评论:
🔤BI中最旧的数据帧将被新数据帧覆盖。🔤

#### zotero位置:
[2023_Reaction Time Analysis of Event-Triggered Processing Chains with Data RefreshingTang et al_.pdf](zotero://open-pdf/library/items/YDS35XT9?page=2&annotation=XIIGRJ7V)



### 第4个注释
#### 文本:
Bi of τi is full,
#### 评论:
🔤BI ofτI已满，🔤

#### zotero位置:
[2023_Reaction Time Analysis of Event-Triggered Processing Chains with Data RefreshingTang et al_.pdf](zotero://open-pdf/library/items/YDS35XT9?page=2&annotation=G9EVBDJS)















### 第5个注释
#### 文本:
In this case, if some task in the processing chain has low resource availability, it will be the bottleneck of the entire processing chain.
#### 评论:
🔤在这种情况下，如果处理链中的某个任务资源利用率较低，则会成为整个处理链的瓶颈。🔤

#### zotero位置:
[2023_Reaction Time Analysis of Event-Triggered Processing Chains with Data RefreshingTang et al_.pdf](zotero://open-pdf/library/items/YDS35XT9?page=4&annotation=NDZB2ES3)



### 第6个注释
#### 文本:
then the number of backlogged data frames in Bi increases to infinity as time goes by, so the maximum reaction time is unbounded
#### 评论:
🔤然后，随着时间的推移，BI中积压的数据帧的数量增加到无穷大，因此最大反应时间是无界的🔤

#### zotero位置:
[2023_Reaction Time Analysis of Event-Triggered Processing Chains with Data RefreshingTang et al_.pdf](zotero://open-pdf/library/items/YDS35XT9?page=4&annotation=ELB4S88A)





### 第7个注释
#### 文本:

#### 评论:
3（d）
![[image-5-x240-y136.png]]

#### zotero位置:
[2023_Reaction Time Analysis of Event-Triggered Processing Chains with Data RefreshingTang et al_.pdf](zotero://open-pdf/library/items/YDS35XT9?page=5&annotation=SGNPKEQP)








# <font color="#ff6666">贡献</font>


### 第1个注释
#### 文本:
event-triggered with data refreshing
#### 评论: 
🔤通过数据刷新触发的事件🔤
#### zotero位置:
[2023_Reaction Time Analysis of Event-Triggered Processing Chains with Data RefreshingTang et al_.pdf](zotero://open-pdf/library/items/YDS35XT9?page=1&annotation=5Q8WTMBL)











### 第2个注释
#### 文本:
ETDR approach we let each buffer have a limited size
#### 评论: 
🔤ETDR方法我们让每个缓冲区都有一个有限的大小🔤
#### zotero位置:
[2023_Reaction Time Analysis of Event-Triggered Processing Chains with Data RefreshingTang et al_.pdf](zotero://open-pdf/library/items/YDS35XT9?page=2&annotation=S4VN3UHW)



























### 第3个注释
#### 文本:
Now we discuss the comparison between the standard ET approach with unlimited buffer and our ETDR approach with limited buffer, as well as the influence of different buffer sizes in general
#### 评论: 
🔤现在我们讨论了无限缓冲区的标准ET方法和我们的有限缓冲区的ETDR方法的比较，以及不同缓冲区大小的影响🔤
#### zotero位置:
[2023_Reaction Time Analysis of Event-Triggered Processing Chains with Data RefreshingTang et al_.pdf](zotero://open-pdf/library/items/YDS35XT9?page=4&annotation=BPZXYWI2)
















# <font color="#5fb236">模型</font>




### 第1个注释
#### 文本:
variant of the standard ET approach
#### 评论: 
🔤标准ET方法的变体🔤
#### zotero位置:
[2023_Reaction Time Analysis of Event-Triggered Processing Chains with Data RefreshingTang et al_.pdf](zotero://open-pdf/library/items/YDS35XT9?page=1&annotation=U7G5HLJS)



### 第2个注释
#### 文本:
event-triggered with data refreshing (ETDR),
#### 评论: 
🔤数据刷新事件触发(ETDR)，🔤
#### zotero位置:
[2023_Reaction Time Analysis of Event-Triggered Processing Chains with Data RefreshingTang et al_.pdf](zotero://open-pdf/library/items/YDS35XT9?page=1&annotation=NU7QJM7S)



### 第3个注释
#### 文本:
an old data frame is overwritten by a newly arrived one when buffer overflow occurs, just like in the TT approach.
#### 评论: 
🔤发生缓冲区溢出时，旧数据帧被新到达的数据帧覆盖，就像在TT方法中一样。🔤
#### zotero位置:
[2023_Reaction Time Analysis of Event-Triggered Processing Chains with Data RefreshingTang et al_.pdf](zotero://open-pdf/library/items/YDS35XT9?page=2&annotation=DPWHPLKE)



### 第4个注释
#### 文本:
ETDR approach we let each buffer have a limited size
#### 评论: 
🔤ETDR方法我们让每个缓冲区都有一个有限的大小🔤
#### zotero位置:
[2023_Reaction Time Analysis of Event-Triggered Processing Chains with Data RefreshingTang et al_.pdf](zotero://open-pdf/library/items/YDS35XT9?page=2&annotation=S5LQX4G4)





### 第5个注释
#### 文本:
Task τ0 is the sampling task,
#### 评论: 
🔤任务τ0为采样任务，🔤
#### zotero位置:
[2023_Reaction Time Analysis of Event-Triggered Processing Chains with Data RefreshingTang et al_.pdf](zotero://open-pdf/library/items/YDS35XT9?page=2&annotation=H87JRSKS)



### 第6个注释
#### 文本:
input buffer Bi.
#### 评论: 
🔤输入缓冲器Bi.🔤
#### zotero位置:
[2023_Reaction Time Analysis of Event-Triggered Processing Chains with Data RefreshingTang et al_.pdf](zotero://open-pdf/library/items/YDS35XT9?page=2&annotation=TTTUD5RF)



### 第7个注释
#### 文本:
Ji reads an input data frame (and removes it from Bi) at time s(Ji), and produces a data frame and puts in into the input buffer Bi+1 of its successor τi+1 at time f (Ji).
#### 评论: 
🔤在时间S(Ji)，Ji读取输入数据帧(并将其从Bi中移除)，并且在时间f(Ji)，产生数据帧并将其放入其后续τi+1的输入缓冲器Bi1+1中。🔤
#### zotero位置:
[2023_Reaction Time Analysis of Event-Triggered Processing Chains with Data RefreshingTang et al_.pdf](zotero://open-pdf/library/items/YDS35XT9?page=2&annotation=B5GETEWG)











### 第8个注释
#### 文本:
Bi is overwritten, the job released by τi corresponding to this data frame will be skipped (i.e., it will not be executed), and we call this job a skipped job.
#### 评论: 
🔤BI被覆盖，将跳过与该数据帧对应的由τi发布的作业(即，它将不被执行)，并且我们将该作业称为跳过的作业。🔤
#### zotero位置:
[2023_Reaction Time Analysis of Event-Triggered Processing Chains with Data RefreshingTang et al_.pdf](zotero://open-pdf/library/items/YDS35XT9?page=2&annotation=3ZS9KX24)



### 第9个注释
#### 文本:
where DLYi(|Bi|) is a non-decreasing function with respect to |Bi|, which is detailed in the appendix2.
#### 评论: 
🔤其中DLyi(|bi|)是关于|bi|的非递减函数，详见附录2。🔤
#### zotero位置:
[2023_Reaction Time Analysis of Event-Triggered Processing Chains with Data RefreshingTang et al_.pdf](zotero://open-pdf/library/items/YDS35XT9?page=3&annotation=5ELS877P)



### 第10个注释
#### 文本:
Part (i) is upper-bounded by e(τi).
#### 评论: 
🔤部分(I)是e(τi)的上界。🔤
#### zotero位置:
[2023_Reaction Time Analysis of Event-Triggered Processing Chains with Data RefreshingTang et al_.pdf](zotero://open-pdf/library/items/YDS35XT9?page=3&annotation=IFJJGSLK)



### 第11个注释
#### 文本:
Part (ii) is upper-bounded by (Bi − 1) · e(τi).
#### 评论: 
🔤部分(II)的上界是(Bi−1)·e(τI)。🔤
#### zotero位置:
[2023_Reaction Time Analysis of Event-Triggered Processing Chains with Data RefreshingTang et al_.pdf](zotero://open-pdf/library/items/YDS35XT9?page=3&annotation=5XWXLEFD)



### 第12个注释
#### 文本:
upper-bounded by e(τi).
#### 评论: 
🔤上界为e(τi)。🔤
#### zotero位置:
[2023_Reaction Time Analysis of Event-Triggered Processing Chains with Data RefreshingTang et al_.pdf](zotero://open-pdf/library/items/YDS35XT9?page=3&annotation=PWZUG84M)


















# <font color="#2ea8e5">背景</font>












































### 第1个注释
#### 文本:
The last step of the above derivation holds since DLYi(|Bi|) ≤ βl i(2 · e(τi)), which is detailed in the appendix.
#### 评论: 
🔤上述推导的最后一步成立，因为 DLYi(|Bi|) ≤ βli(2·e(τi))，详见附录。🔤
#### zotero位置:
[2023_Reaction Time Analysis of Event-Triggered Processing Chains with Data RefreshingTang et al_.pdf](zotero://open-pdf/library/items/YDS35XT9?page=5&annotation=IIR7I38F)










# <font color="#a28ae5">算法</font>





















































# <font color="#e56eee">参考</font>





















































# <font color="#f19837">方法/实验</font>





















































# <font color="#aaaaaa">不足</font>





















































# <font color="#b15928">学习</font>
















































### 第1个注释
#### 文本:
More specifically, the arrival pattern of data frames on Bi is characterized by a pair of arrival curves ⟨αl i, αu i ⟩, which describe the maxi- mum/minimum number of arrived data frames in any time interval of length ∆.
#### 评论: 
🔤更具体地说，Bi 上数据帧的到达模式由一对到达曲线 ⟨αli, αu i ⟩ 来表征，它们描述了在长度为 Δ 的任何时间间隔内到达的数据帧的最大/最小数量。🔤
#### zotero位置:
[2023_Reaction Time Analysis of Event-Triggered Processing Chains with Data RefreshingTang et al_.pdf](zotero://open-pdf/library/items/YDS35XT9?page=6&annotation=MGKNGWU4)



### 第2个注释
#### 文本:
The resource supply is characterized by a pair of event-based service curves ⟨β∗l i (∆), β∗u i (∆)⟩, which describe the maximum/minimum number of jobs that can be processed in any time interval of length ∆.
#### 评论: 
🔤资源供应由一对基于事件的服务曲线 ⟨β*l i (Δ), β*u i (Δ)⟩ 来表征，它描述了在长度为 Δ 的任意时间间隔内可以处理的最大/最小作业数量。🔤
#### zotero位置:
[2023_Reaction Time Analysis of Event-Triggered Processing Chains with Data RefreshingTang et al_.pdf](zotero://open-pdf/library/items/YDS35XT9?page=6&annotation=IHMISW6V)




# 导入记录
%% begin annotations %%



## Imported: 2024-04-17 2:39 下午


> event-triggered with data refreshing

> variant of the standard ET approach

> event-triggered with data refreshing (ETDR),

> an old data frame is overwritten by a newly arrived one when buffer overflow occurs, just like in the TT approach.

> ETDR approach we let each buffer have a limited size

> ETDR approach we let each buffer have a limited size

> Task τ0 is the sampling task,

> input buffer Bi.

> Ji reads an input data frame (and removes it from Bi) at time s(Ji), and produces a data frame and puts in into the input buffer Bi+1 of its successor τi+1 at time f (Ji).

> τi−1 produces a new data

> Bi overflows

> oldest data frame in Bi will be overwritten by the new data frame.

> Bi of τi is full,

> Bi is overwritten, the job released by τi corresponding to this data frame will be skipped (i.e., it will not be executed), and we call this job a skipped job.

> where DLYi(|Bi|) is a non-decreasing function with respect to |Bi|, which is detailed in the appendix2.

> Part (i) is upper-bounded by e(τi).

> Part (ii) is upper-bounded by (Bi − 1) · e(τi).

> upper-bounded by e(τi).

> Now we discuss the comparison between the standard ET approach with unlimited buffer and our ETDR approach with limited buffer, as well as the influence of different buffer sizes in general

> In this case, if some task in the processing chain has low resource availability, it will be the bottleneck of the entire processing chain.

> then the number of backlogged data frames in Bi increases to infinity as time goes by, so the maximum reaction time is unbounded

> The last step of the above derivation holds since DLYi(|Bi|) ≤ βl i(2 · e(τi)), which is detailed in the appendix.

> 

> More specifically, the arrival pattern of data frames on Bi is characterized by a pair of arrival curves ⟨αl i, αu i ⟩, which describe the maxi- mum/minimum number of arrived data frames in any time interval of length ∆.

> The resource supply is characterized by a pair of event-based service curves ⟨β∗l i (∆), β∗u i (∆)⟩, which describe the maximum/minimum number of jobs that can be processed in any time interval of length ∆.



%% end annotations %%


%% Import Date: 2024-04-17T14:39:38.535+02:00 %%
