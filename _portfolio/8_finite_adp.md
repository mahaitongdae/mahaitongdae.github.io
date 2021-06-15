---
title: "Hamilton-Jacobi-Bellman Equation for Finite-Horizon Continuous-Time Optimal Control Problems"
excerpt: "<img src="https://mahaitongdae.github.io/files/fhadp/title.png" />"
collection: portfolio
---
<div align="middle"><img align="middle" style="max-width: 360px; width: 100%" src="https://mahaitongdae.github.io//files/fhadp/illustration of partial time derivative derivation.png" /><img align="middle" style="max-width: 360px; width: 100%" src="https://mahaitongdae.github.io/files/fhadp/FH Framework_with NN.png" /></div>

The partial derivative of value function with repect to time in the Hamilton-Jacobi-Bellman (HJB) equation is intractable, which makes the HJB equation hard to solve analytically or numerically. A special case is the infinite-horizon problem, where the value function is irrelevant with time and the partial derivative is always zero. Unfortunately, the equality to zero does not hold in the general finite-horizon problems.

$$\min_{u}\Big\{l(x, u)+\frac{\partial V^{*}(x,t)}{\partial x^{\top}} f(x, u)\Big\}=-\frac{\partial{V^{*}(x, t)}}{\partial t}$$

This project proposes a new approach to compute the partial derivative with time, which is exactly the utility function at final time. This finding reduces the number of unknown terms in the FH HJB equation to two, so that the traditionalpolicy iteration framework can be directly used to solve the finite-horizon OCPs.

$$\frac{\partial V^{\pi}(x, t)}{\partial t}=-l(x^{\pi}(T), u(T))$$

Related papers:

[[Ziyu Lin, Jingliang Duan, Shengbo Eben Li, Jie Li, Haitong Ma, Qi Sun, Jianyu Chen, Bo Cheng (2021). Solving Finite-Horizon HJB for Optimal Control of Continuous-Time Systems.]](https://ieeexplore.ieee.org/abstract/document/9349412)

[[Continuous-time finite-horizon ADP for automated vehicle controller design with high efficiency]](https://ieeexplore.ieee.org/abstract/document/9274944)
