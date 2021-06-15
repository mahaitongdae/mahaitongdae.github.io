---
title: "Interpretable Driving AI with Highly Efficient Online Computation and Self-evolution Ability"
excerpt: "<br/><img align="middle" style="max-width: 400px; width: 100%" src='/files/idc/framework.png'>"
collection: portfolio
---

![fig](/files/idc/framework.png)

The project aims to build an interpretable self-learning driving system by RL, for the real-time decision and control of automated vehicles. My works: 1) Formulated a general integrated decision and control framework, which utilizes RL as a way to solve constrained optimal control problems (OCP), and thus makes the output interpretable in the sense that it is the approximate solution of the OCP. The framework is promising to promote RL applications in real-world autonomous driving tasks. 2) Proposed a model-based RL algorithm for approximately solving large-scale constrained OCPs, where a generalized exterior point method is employed to find a feasible neural solution. 3) Carried out experiments both in simulation and in real world, yielding the best performance in terms of computing efficiency 10x and safety 100x compared with baseline methods.

Related publications:

1. The total IDC frame work:

   paper: [Integrated Decision and Control: Towards Interpretable and Efficient Driving Intelligence](https://idthanm.github.io/publication/integrated/)

   [Video](https://space.bilibili.com/363124977/channel/detail?cid=177421)

2. The solver of constrained OCP with fixed penalty method:

   paper: [Learn collision-free self-driving skills at urban intersections with model-based reinforcement learning](https://idthanm.github.io/publication/idc_itsc/)

   [Video](https://space.bilibili.com/363124977/channel/detail?cid=178813&ctype=0)

3. The solver of constrianed OCP with generalized control barrier functions:

   paper: [Model-based Constrained Reinforcement Learning using Generalized Control Barrier Function](https://mahaitongdae.github.io/publication/iros21)

   [Repo](https://github.com/mahaitongdae/safe_exp_env)
 
