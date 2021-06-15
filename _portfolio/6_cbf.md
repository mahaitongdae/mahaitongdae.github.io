---
title: "Enhancing Feasibility with Generalized Control Barrier Functions"
excerpt: "<img src="https://mahaitongdae.github.io/files/icps21/constraint comparison.png"/>"
collection: portfolio
---
The existence of solution of optimal control problems (OCP) with general inequality constriants remains unclear. 
Control barrier function (CBF) is a powerful approach to guarantee the existence of solution, i.e., feasibility.
However, the existing discrete-time control barrier function:

$$h(x_{t+1})\leq(1-\lambda)h(x_t)$$

can not handle the high relative-degree, or high-order constraints.
This project aims to give a generalized formulation of discrete-time control barrier functions to handle the high-relative degree constraints:

$$h(x_{t+m})\leq(1-\lambda)^mh(x_t)$$

Moreover, we view the receding horizon control as a separating-axes process, that is, the optimization inferring from the model happends on the virtual axis, 
and the control signal implementation and state transition happens on the real axis. 
It matchs the general design of model predictive control that only the first control element of virtual axis is actually implemented on the real axis.
<div align="middle"><img align="middle" style="max-width: 600px; width: 100%" src="https://mahaitongdae.github.io/files/cbf/Physical time vs Virtual time.png" /></div>
We give a further simplification in the numbers of needed contrained prediction steps in the prediction horizon.

Related papers:
[Feasibility Enhancement of Constrained Receding Horizon Control Using Generalized Control Barrier Function](https://mahaitongdae.github.io/publication/icps21)

[Model-based Constrained Reinforcement Learning using Generalized Control Barrier Function](https://mahaitongdae.github.io/publication/iros21)
