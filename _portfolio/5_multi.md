---
title: "Statewise Safety Constraints in Reinforcement Learning and Feasible Region on State Space"
excerpt: ""
collection: portfolio
---
Existing constrained reinforcement learning methods mostly rely on the constrained Markov decision process (CMDP), which solves a so-called **expectation-based constriants**:
$$\E_{\tau\sim\pi}\Big\{\sum_{t=0}^{\infty}\gamma_c^tc_t\Big\}\leq d$$
The expectation constriants are actually a safety constraints defined on initial state distribution. Define the cost value function as 
$$v^\pi_C(s) =  \mathbb{E}_{\tau\sim\pi}\Big\{\sum\nolimits_{t=0}^{\infty}\gamma_c^tc_t\bigg|s_0=s\Big\}$$
The expectation-based constraints are:

$$\E_{s\sim d^0(s)}v^C_\pi(s)\leq d$$

where $d^0(s)$ is the initial state distribution. However, there are several fatal flaws with this expectation-based safety constraint: 
(1) Each specific state is allowed to be unsafe as long as the expectation of states satisfies the constraint; 
(2) There is no way to know which states are safe and which are not, which means the safety for a specific state is almost random.
We believe a meaningful constraint threshold $d$ means that agent **starting from each initial state** should be safe. 
Therefore, we propose the statewise safety constriants assuming that all possible initial states are possible to be safe:

$$v^\pi_C(s) \leq d, \forall s \in \mathcal{I}$$

where $\mathcal{I}$ is the initial state set. one might think about designing a constrained RL method to guarantee the whole state space to be safe. 
However, this is impossible in many realistic tasks. We claim that some states are inherently unsafe **no matter** what policy we choose, 
while for other states there exist policies ensuring safety, where we say such states and policies are **feasible**. 
We actually focus on those feasible initial states, so denote $\mathcal{I}_F$ as the initial feasible state set, the statewise safety constraints without the assumption are:

$$v^\pi_C(s) \leq d, \forall s \in \mathcal{I}_F$$

The state space is also splited into two parts, the feasble part and the infeasible part. We name the feasible part as the feasible region.
The detailed analysis about feasible region can see a summary report in the book Reinforcement Learning and Control written by my advisor Prof. Shengbo Eben Li.
The preview of chapter discussing the state constriants and feasibility can be .

I also propose an algorithm using Lagrangian-based approach to solve the constrained RL problems with the statewise safety constriants.
In this paper, we use an **additional neural network** to approximate Lagrange multipliers, 
and explain that the Lagrange multipliers can represent the feasibility of a specific state. See [publication pages](https://mahaitongdae.github.io/publication/jmlr21) for detailed information.
