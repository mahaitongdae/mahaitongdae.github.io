---
title: "Model-based Constrained Reinforcement Learning using Generalized Control Barrier Function"
collection: publications
permalink: /publication/iros21
<!-- excerpt: '' -->
date: 2021-05-22
venue: 'IEEE/RSJ International Conference on Intelligent Robots and Systems (**IROS**), 2021. **(Submitted)**'
paperurl: 'https://arxiv.org/abs/2103.01556'
<!-- citation: '**Ma, H.**, Chen, J., Li, S.E., Lin, Z., Guan, Y., Ren, Y. and Zheng, S., 2021. Model-based Constrained Reinforcement Learning using Generalized Control Barrier Function. arXiv preprint arXiv:2103.01556.' -->
---

Model information can be used to predict future trajectories, so it has huge potential to avoid dangerous region when implementing reinforcement learning (RL) on real-world tasks, like autonomous driving. However, existing studies mostly use model-free constrained RL, which causes inevitable constraint violations. This paper proposes a model-based feasibility enhancement technique of constrained RL, which enhances the feasibility of policy using generalized control barrier function (GCBF) defined on the distance to constraint boundary. By using the model information, the policy can be optimized safely without violating actual safety constraints, and the sample efficiency is increased. The major difficulty of infeasibility in solving the constrained policy gradient is handled by an adaptive coefficient mechanism. We evaluate the proposed method in both simulations and real vehicle experiments in a complex autonomous driving collision avoidance task. The proposed method achieves up to four times fewer constraint violations and converges 3.36 times faster than baseline constrained RL approaches.

This paper is submitted to IEEE/RSJ International Conference on Intelligent Robots and Systems (**IROS**),  2021.

[Download paper here](http://mahaitongdae.github.io/files/2103.01556.pdf) [GitHub repo](https://github.com/mahaitongdae/safe_exp_env) [Project Blog](https://idthanm.github.io/project/interpretable/)

Recommended citation:
<pre>
@article{ma2021model,
  title={Model-based Constrained Reinforcement Learning using Generalized Control Barrier Function},
  author={Ma, Haitong and Chen, Jianyu and Li, Shengbo Eben and Lin, Ziyu and Guan, Yang and Ren, Yangang and Zheng, Sifa},
  journal={arXiv preprint arXiv:2103.01556},
  year={2021}
}
</pre>

