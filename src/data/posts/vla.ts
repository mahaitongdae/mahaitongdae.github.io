import { type BlogPost } from '../../types';
import pi06Policy from './figures/pi06_policy.png';

export const vla: BlogPost = {
    id: 'vla',
    title: 'Vision Language Action Models',
    date: '2025-11-26',
    tags: ['Reinforcement Learning', 'Diffusion', 'VLA'],
    summary: 'Reading and summarizing VLAs',
    content: `

    <h3><a href='https://www.physicalintelligence.company/blog/pistar06'>$\\pi^*_{0.6}$: a VLA that Learns from Experience</a></h3>
    
    <h4> Policy Architecture </h4>
    $$
    \\pi_\\theta(\\mathbf{a}_{t:t +H}, \\hat \\ell | \\mathbf{o}_t, \\ell)
    $$
    <figure style="width: 70%; margin: 0 auto;">
      <img src="${pi06Policy}" alt="Policy Architecture" />
      <figcaption class="text-center text-sm text-stone-500 mt-2">Policy Architecture</figcaption>
    </figure>
    <p>
    The policy first output next predicted sub-tasks $\\hat \\ell$ and then predict 
    continuous action and discrete actions independently,
    $$
    \\begin{aligned}
    & \\log \\pi_\\theta\\left(\\mathbf{a}_{t: t+H}, a_{t: t+H}^{\\ell}, \\hat{\\ell} \\mid \\mathbf{o}_t, \\ell\\right)=\\log \\pi_\\theta\\left(\\hat{\\ell} \\mid \\mathbf{o}_t, \\ell\\right) \\\\
    & \\quad+\\log \\pi_\\theta\\left(a_{t: t+H}^{\\ell} \\mid \\mathbf{o}_t, \\ell, \\hat{\\ell}\\right)+\\log \\pi_\\theta\\left(\\mathbf{a}_{t: t+H} \\mid \\mathbf{o}_t, \\ell, \\hat{\\ell}\\right) .
    \\end{aligned}
    $$
    </p>

    Q: What is the log probablities for?


    <h4> Reward Function </h4>

    <h3> <a href='https://arxiv.org/pdf/2505.23705'>
    Knowledge Insulating Vision-Language-Action
    Models: Train Fast, Run Fast, Generalize Better </a>
    </h3>
    
      `
};
