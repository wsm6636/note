---
created: 2024-03-27T22:19
updated: 2024-03-27T22:20
tags:
  - 笔记/文献笔记
  - 待归档
  - 笔记
---
{% set cleanedString = extra|replace("abstractTranslation: ", "")|replace("titleTranslation: ", "") %}
{% set parts = cleanedString.split("\n") %}
{% set titleTranslation = parts[0] %}
{% set abstractTranslation = parts[1] %}
**title:** Efficient maximum data age analysis for cause-effect chains in automotive systems
**TitleTranslation:**   {{ titleTranslation }}
**Journal or Conference:**   DAC '22: 59th ACM/IEEE Design Automation Conference  
**Authors:**  RanBi, XinbinLiu, JiankangRen, PengfeiWang, HuaweiLv, GuozhenTan
**Pub.date:**  2022-07
**DOI:**  10/gsfbs4
**zoterolink:**  [zotero](zotero://select/library/items/NUYD2XNF)
**link:** [[Efficient maximum data age analysis for cause-effect chains in automotive systems]]



# <font color="#ffd400">问题</font>

### 第1个注释
#### 文本:
. However, the computational complexity of this method scales exponentially, and this becomes huge drawbacks in the interactive design environments in which maximum data age analysis algorithm should be called a large number of times to evaluate and optimize multiple design choices at design level [13].
#### 评论:
🔤。然而，这种方法的计算复杂性呈指数级增长，这在交互式设计环境中成为巨大的缺陷，在这种环境中，需要多次调用最大数据年龄分析算法来评估和优化设计级的多个设计选择[13]。🔤

#### zotero位置:
[2022_Efficient maximum data age analysis for cause-effect chains in automotive systemsBi et al_.pdf](zotero://open-pdf/library/items/Q7XGG9HY?page=1&annotation=X6SV3JEU)



### 第2个注释
#### 文本:
In addition, this problem will be deteriorated 1243 with the rapid increase of software size and complexity in auto- motive systems [2]
#### 评论:
🔤此外，随着汽车动力系统中软件规模和复杂性的快速增加，这个问题将恶化[2]🔤

#### zotero位置:
[2022_Efficient maximum data age analysis for cause-effect chains in automotive systemsBi et al_.pdf](zotero://open-pdf/library/items/Q7XGG9HY?page=1&annotation=2KZRHRQF)
















# <font color="#ff6666">贡献</font>






### 第1个注释
#### 文本:
To solve this problem, we propose a problem decomposition method for efficiently computing relatively tighter, rather than exact, upper bounds for the maximum data age. Our approach, called DBAge, is based on the analysis of upper bounds on the releasing interval of successive Last-to-Last data propagation instances in the cause-effect chain.
#### 评论: 
🔤为了解决这一问题，我们提出了一种问题分解方法，用于有效地计算相对较紧而不是准确的最大数据年龄上限。我们的方法，称为DBAge，是基于对因果链中连续的最后到最后的数据传播实例的发布间隔上限的分析。🔤
#### zotero位置:
[2022_Efficient maximum data age analysis for cause-effect chains in automotive systemsBi et al_.pdf](zotero://open-pdf/library/items/Q7XGG9HY?page=2&annotation=L5I4SRY7)














# <font color="#5fb236">模型</font>








### 第1个注释
#### 文本:
local cause-effect chain and interconnected cause-effect chain
#### 评论: 
🔤局部因果链和相互关联的因果链🔤
#### zotero位置:
[2022_Efficient maximum data age analysis for cause-effect chains in automotive systemsBi et al_.pdf](zotero://open-pdf/library/items/Q7XGG9HY?page=2&annotation=NC6VEXTR)



### 第2个注释
#### 文本:
Note that, the interconnected ECUs may either be synchronized or asynchronized, and their communication is realized with the communication task.
#### 评论: 
🔤注意，互连的ECU可以是同步的，也可以是异步的，并且它们的通信是通过通信任务实现的。🔤
#### zotero位置:
[2022_Efficient maximum data age analysis for cause-effect chains in automotive systemsBi et al_.pdf](zotero://open-pdf/library/items/Q7XGG9HY?page=2&annotation=FG54XLCM)





### 第3个注释
#### 文本:
as producer and consumer.
#### 评论: 
🔤作为生产者和消费者。🔤
#### zotero位置:
[2022_Efficient maximum data age analysis for cause-effect chains in automotive systemsBi et al_.pdf](zotero://open-pdf/library/items/Q7XGG9HY?page=3&annotation=P83HPY7J)



### 第4个注释
#### 文本:
Therefore, for the data produced by producer instance released at 𝑟𝑖 , the last output instance of 𝜏𝑖+1 consuming that data should be released before 𝑟𝑖 + 𝑇𝑖 .
#### 评论: 
🔤因此，对于在ri发布的Producer实例产生的数据，消耗该数据的τi+1的最后一个输出实例应该在ri+ti之前发布。🔤
#### zotero位置:
[2022_Efficient maximum data age analysis for cause-effect chains in automotive systemsBi et al_.pdf](zotero://open-pdf/library/items/Q7XGG9HY?page=4&annotation=SDC3FTX9)




# <font color="#2ea8e5">背景</font>



















# <font color="#a28ae5">算法</font>



















# <font color="#e56eee">参考</font>












### 第1个注释
#### 文本:
Definition 2.1. (Data Age [5]). For a cause-effect chain F 𝑛, its data age is defined as the time interval elapsed between • the moment the head task ℎ𝑒𝑎𝑑 (F 𝑛) of the cause-effect chain F 𝑛 reads the data • the moment the last task 𝑙𝑎𝑠𝑡 (F 𝑛) of the cause-effect chain F 𝑛 finishes processing the data
#### 评论: 
🔤定义2.1。(数据年龄[5])。对于因果链Fn，其数据年龄被定义为·因果链Fn的头部任务头(Fn)读取数据的时刻·因果链Fn的最后一个任务(Fn)完成数据处理的时刻🔤
#### zotero位置:
[2022_Efficient maximum data age analysis for cause-effect chains in automotive systemsBi et al_.pdf](zotero://open-pdf/library/items/Q7XGG9HY?page=2&annotation=2DYGV28K)








# <font color="#f19837">方法/实验</font>



















# <font color="#aaaaaa">不足</font>



















# <font color="#b15928">学习</font>



















# 导入记录
%% begin annotations %%



## Imported: 2024-03-27 10:19 晚上


> . However, the computational complexity of this method scales exponentially, and this becomes huge drawbacks in the interactive design environments in which maximum data age analysis algorithm should be called a large number of times to evaluate and optimize multiple design choices at design level [13].

> In addition, this problem will be deteriorated 1243 with the rapid increase of software size and complexity in auto- motive systems [2]

> To solve this problem, we propose a problem decomposition method for efficiently computing relatively tighter, rather than exact, upper bounds for the maximum data age. Our approach, called DBAge, is based on the analysis of upper bounds on the releasing interval of successive Last-to-Last data propagation instances in the cause-effect chain.

> local cause-effect chain and interconnected cause-effect chain

> Note that, the interconnected ECUs may either be synchronized or asynchronized, and their communication is realized with the communication task.

> Definition 2.1. (Data Age [5]). For a cause-effect chain F 𝑛, its data age is defined as the time interval elapsed between • the moment the head task ℎ𝑒𝑎𝑑 (F 𝑛) of the cause-effect chain F 𝑛 reads the data • the moment the last task 𝑙𝑎𝑠𝑡 (F 𝑛) of the cause-effect chain F 𝑛 finishes processing the data

> as producer and consumer.

> Therefore, for the data produced by producer instance released at 𝑟𝑖 , the last output instance of 𝜏𝑖+1 consuming that data should be released before 𝑟𝑖 + 𝑇𝑖 .



%% end annotations %%


%% Import Date: 2024-03-27T22:19:40.837+08:00 %%
