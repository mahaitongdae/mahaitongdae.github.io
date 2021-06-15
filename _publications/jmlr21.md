---
title: "Feasible Actor-Critic: Constrained Reinforcement Learning for Ensuring Statewise Safety"
collection: publications
permalink: /publication/jmlr21
excerpt: ''
date: 2021-05-22
venue: 'arXiv: 2105.10682. Submitted to Journal of Machine Learning Research.'
---

## Abstract

The safety constraints commonly used by existing safe reinforcement learning (RL) methods are defined only on expectation of initial states, but allow each certain state to be unsafe, which is unsatisfying for real-world safety-critical tasks. In this paper, we introduce the feasible actor-critic (FAC) algorithm, which is the first model-free constrained RL method that considers statewise safety, e.g, safety for each initial state. We claim that some states are inherently unsafe no matter what policy we choose, while for other states there exist policies ensuring safety, where we say such states and policies are feasible. By constructing a statewise Lagrange function available on RL sampling and adopting an additional neural network to approximate the statewise Lagrange multiplier, we manage to obtain the optimal feasible policy which ensures safety for each feasible state and the safest possible policy for infeasible states. Furthermore, the trained multiplier net can indicate whether a given state is feasible or not through the statewise complementary slackness condition. We provide theoretical guarantees that FAC outperforms previous expectation-based constrained RL methods in terms of both constraint satisfaction and reward optimization. Experimental results on both robot locomotive tasks and safe exploration tasks verify the safety enhancement and feasibility interpretation of the proposed method.

This paper is submitted to Journal of Machine Learning Research.

[[Download paper]](https://arxiv.org/abs/2105.10682)    [[GitHub repo]](https://github.com/mahaitongdae/Feasible-Actor-Critic)  [[Video]](https://youtu.be/WQxXtqoBINg) 



Recommended citation:
<pre>
@article{ma2021feasible,
  title={Feasible Actor-Critic: Constrained Reinforcement Learning for Ensuring Statewise Safety},
  author={Haitong Ma and Yang Guan and Shegnbo Eben Li and Xiangteng Zhang and Sifa Zheng and Jianyu Chen},
  journal={arXiv preprint arXiv:2105.10682},
  year={2021}
}
</pre>
