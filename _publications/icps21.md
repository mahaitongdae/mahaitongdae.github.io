---
title: "Feasibility Enhancement of Constrained Receding Horizon Control Using Generalized Control Barrier Function"
collection: publications
permalink: /publication/icps21
excerpt: '<div align="middle"><img align="middle" style="max-width: 360px; width: 100%" src="https://mahaitongdae.github.io/files/icps21/constraint comparison.png" /><img align="middle" style="max-width: 360px; width: 100%" src="https://mahaitongdae.github.io/files/feasible region.png" /></div>'
date: 2021-01-22
venue: '4th IEEE International Conference on Industrial Cyber-Physical Systems (ICPS)'
---
<div align="middle"><img align="middle" style="max-width: 360px; width: 100%" src="https://mahaitongdae.github.io/files/icps21/constraint comparison.png" /><img align="middle" style="max-width: 360px; width: 100%" src="https://mahaitongdae.github.io/files/feasible region.png" /></div>


Receding horizon control (RHC) is a popular procedure to deal with optimal control problems. Due to the existence of state constraints, optimization-based RHC often suffers the notorious issue of infeasibility, which strongly shrinks the region of controllable state. This paper proposes a generalized control barrier function (CBF) to enlarge the feasible region of constrained RHC with only a one-step constraint on the prediction horizon. This design can reduce the constrained steps by penalizing the tendency to move towards the constraint boundary. Additionally, generalized CBF is able to handle high-order equality or inequality constraints through extending the constrained step to nonadjacent nodes. We apply this technique on an automated vehicle control task. The results show that compared to multi-step pointwise constraints, generalized CBF can effectively avoid the infeasibility issue in a larger partition of the state space, and the computing efficiency is also improved by 14%-23%.
