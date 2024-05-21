---
tags:
  - 笔记
  - 待归档
  - 笔记/课堂笔记
created: 2024-04-07T16:29
updated: 2024-04-16T10:52
status:
  - todo
---
应对不确定性
1. benchmarking
2. stochaastic models随机
3. bonding uncertainties whit intervals polytopes

## schedul
time set  [0,wuqiiong )
N of tasks 1...n
M of machines 1...m
set C constrains
	afinities: task i may execute only over Mi
	deadlines: task i must complete not later than a deadline D
	mutual exclusion: task i may not execute while task j is execution
	parallelism of tasks: task i needs 3 processors in paeallel when executing
 a scheduling alggorithm a which produces a schedule s of n over m constrains c


## task
- amount of work
- recurrent/non-
- on line/off
- sequential(only one machine at time), parallel 

composed by a sequence of jobs of sizes $C_i,j$ requested at instants a_ij
r=draw step 

t1 ≥ t0
wi(t1) ≤ wi(t0) + ri(t1) - ri(t0)
## machine


## constraints


## schedule

S : M * T -> N ∪ {0}
task 0 denoting idle compatible whith the constraints in C
S(k,t)=i machine k is assigned to the i-task at time t
	=0 not assigned at t, k-th machine is idle at t

## algorithms A
find a schedule S such that: 
- the constraints are met
- some target function is minimized/max 
	- best performance 
	- min makespan/delay

1. work conserving:  no idle machine if pending tasks exist
	1. S(k,t) =0 ->wit=0
2. preemptive: A can interupt a task 
3. time complexity: how long does it take to decide the machine assignment
4. clairvoyant: takes decisions based on the knowledge of the future

FIFO 
RR
SJF
SRTF
EDF
LLF: least laxity first
	LST: lesat  stack time
	laxity: (d-t) -w(t)
	wt是从t开始需要的执行时间，比如t=1，完成需要6，但是从0执行，所以wt是6-1=5
FP


## feasibility vs schedability

A task set N is feasible is it exists a schedule which satisfes the task constraint

A task set N is schedulable by the scheduling algorithm A if  A can produce a schedule S which does not violate any constraint of C


## analysis sensitivity design
1. given a set N of tasks and a set M of machines, is N schedulbale by A over M?
2. given a set N of tasks schedulable by A over M. how much can we modify N such that it remains schedulable
3. given a set N of tasks what is the best set of machines M such that N schedulable by A over M