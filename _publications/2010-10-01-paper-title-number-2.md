---
title: "Model-based Constrained Reinforcement Learning using Generalized Control Barrier Function"
collection: publications
permalink: /publication/2010-10-01-paper-title-number-2
excerpt: 'This paper is about the number 2. The number 3 is left for future work.'
date: 2010-10-01
venue: 'submitted to 2021 IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS 2021).'
paperurl: 'http://academicpages.github.io/files/paper2.pdf'
citation: 'Your Name, You. (2010). &quot;Paper Title Number 2.&quot; <i>Journal 1</i>. 1(2).'
---
Model information can be used to predict future trajectories, so it has huge potential to avoid dangerous region when implementing reinforcement learning (RL) on real-world tasks, like autonomous driving. However, existing studies mostly use model-free constrained RL, which causes inevitable constraint violations. This paper proposes a model-based feasibility enhancement technique of constrained RL, which enhances the feasibility of policy using generalized control barrier function (GCBF) defined on the distance to constraint boundary. By using the model information, the policy can be optimized safely without violating actual safety constraints, and the sample efficiency is increased. The major difficulty of infeasibility in solving the constrained policy gradient is handled by an adaptive coefficient mechanism. We evaluate the proposed method in both simulations and real vehicle experiments in a complex autonomous driving collision avoidance task. The proposed method achieves up to four times fewer constraint violations and converges 3.36 times faster than baseline constrained RL approaches.

This paper is submitted to 2021 IEEE/RSJ International Conference on Intelligent Robots and Systems (**IROS**),  2021.

[Download paper here](https://arxiv.org/abs/2103.01556)

[GitHub repo](https://github.com/mahaitongdae/safe_exp_env)

<!-- Recommended citation: Your Name, You. (2010). "Paper Title Number 2." <i>Journal 1</i>. 1(2). -->

Bibtex: 
`
@article{ma2021model,
  title={Model-based Constrained Reinforcement Learning using Generalized Control Barrier Function},
  author={Ma, Haitong and Chen, Jianyu and Li, Shengbo Eben and Lin, Ziyu and Guan, Yang and Ren, Yangang and Zheng, Sifa},
  journal={arXiv preprint arXiv:2103.01556},
  year={2021}
}
`
