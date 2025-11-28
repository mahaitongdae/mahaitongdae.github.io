import { type BlogPost } from '../../types';
import pi06Policy from './figures/pi06_policy.png';
import pi05Model from './figures/pi05_attn.png';

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

    <p>Compared to \\(\\pi_{0.5}\\),</p>

    <BlockQuote>
        $\\pi^*_{0.6}$ can optionally take in conditioning metadata in the prompt that further modulates how the task is performed.
    </BlockQuote>

    <p>
        which means it is not a strictly hierarchical policy and \\(\\pi\\) can condition on both prompt \\(\\ell\\) and sub-task instructions \\(\\hat \\ell\\).
    </p>
    
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

    <div class="not-prose space-y-4 font-sans">
        <div class="bg-white border border-stone-200 rounded-xl p-6 shadow-sm hover:border-rose-200 transition-colors">
          <h4 class="font-bold text-stone-900 text-lg mb-2">Q: What is the log probablities for?</h4>
          <p class="text-stone-600 leading-relaxed">
          A: It is used for optimizing the policy, by a modifed MLE:</p>
          $$
          \\begin{aligned}
          \\min _\\theta & \\mathbb{E}_{\\mathcal{D}_{\\pi_{\\mathrm{ref}}}}\\left[-\\log \\pi_\\theta\\left(\\mathbf{a}_t \\mid \\mathbf{o}_t, \\ell\\right)-\\alpha \\log \\pi_\\theta\\left(\\mathbf{a}_t \\mid I_t, \\mathbf{o}_t, \\ell\\right)\\right] \\\\
          & \\text { where } I_t=\\mathbb{1}\\left(A^{\\pi_{\\mathrm{ref}}}\\left(\\mathbf{o}_t, \\mathbf{a}_t, \\ell\\right)>\\epsilon_{\\ell}\\right)
          \\end{aligned}
          $$
          </p>
        </div>

        <div class="bg-white border border-stone-200 rounded-xl p-6 shadow-sm hover:border-rose-200 transition-colors">
          <h4 class="font-bold text-stone-900 text-lg mb-2">Q: How is the advantage function computed from value functions?</h4>
          <p class="text-stone-600 leading-relaxed">
          Maybe 
          $$
          A_{\\pi_{\\text{ref}}}(\\bfo_t, \\bfa_t, \\ell) = r_t + 
          \\gamma V^{\\pi_{\\text{ref}}}(\\bfo_{t+1}, \\ell) - V^{\\pi_{\\text{ref}}}(\\bfo_t, \\ell)
          $$
          </p>
          Moreover, here as $r_t=0$ and $\\gamma=1$. maybe it is only $V^{\\pi_{\\text{ref}}}(\\bfo_{t+H}, \\ell) - V^{\\pi_{\\text{ref}}}(\\bfo_{t}, \\ell)$,
          which means <strong> positive advantages mean increasing value functions</strong>.
        </div>

      </div>

    <h4> Value Functions </h4>
    The value function is a function of only $\\bfo_t$ and $\\ell$, 
    $$
    V^{\\pi_{\\text{ref}}}(\\bfo_t, \\ell)
    $$


    


    <h4> Training </h4>

    <BlockQuote>
    While some of the episodes are collected fully autonomously, 
    some are monitored by an expert teleoperator who can intervene to
    provide corrections.
    </BlockQuote>

    <BlockQuote>
    Both the value function and policy are finetuned from the pre-trained checkpoint.
    (Rather than from the last iteration.)
    </BlockQuote>
    
    <h3><a href='https://www.physicalintelligence.company/download/pi05.pdf'> 
    $\\pi_{0.5}$: a Vision-Language-Action Model with Open-World Generalization </a></h3>
    <p>
    
    <h3> Model Architecture </h3>

    <h4>Hierarchical design</h4>

    <p>
        $$
        \\pi_\\theta(\\mathbf{a}_{t:t+H}, \\hat{\\ell} | \\mathbf{o}_t, \\ell) = \\pi_\\theta(\\mathbf{a}_{t:t+H} | \\mathbf{o}_t, \\hat{\\ell})\\pi_\\theta(\\hat{\\ell} | \\mathbf{o}_t, \\ell),
        $$
    </p>

    <p>
        Where the high-level only produces sub-tasks \\(\\hat{\\ell}\\), and the low-level only conditions on \\(\\hat{\\ell}\\) to predict actions.
    </p>

    <p>
    <figure style="width: 70%; margin: 0 auto;">
      <img src="${pi05Model}" alt="Policy Architecture" />
      <figcaption class="text-center text-sm text-stone-500 mt-2">Attention masking pattern for $\\pi_{0.5}$.
      Note that the FAST action tokens and action expert embeddings are not attended to each other.
      </figcaption>
    </figure>
    </p>

    <div class="not-prose space-y-4 font-sans">
      <div class="bg-white border border-stone-200 rounded-xl p-6 shadow-sm hover:border-rose-200 transition-colors">
        <h4 class="font-bold text-stone-900 text-lg mb-2">
        FAST Action tokenizer v.s. Flow-matching head
        </h4>
        <p class="text-stone-600 leading-relaxed">
        Using the FAST action tokennizer can boost VLA training,
        but it is not good for inference since the autoregressive decoding.
        </p>
      </div>
    </div>

    <h3> Training pipeline </h3>
    <h4>Pre-training</h4>
    <ul>
      <li> Only train the VLMs, and only use the FAST action tokenizer to only predict discrete action tokens. </li>
    </ul>
    <h4>Post-training</h4>

    <p>
    <strong>Goal:</strong> <br />
    Specialize the model to our use-case (mobile manipulation in homes) and 
    add an action expert that can produce continuous action chunks via flow matching.
    </p>

    <p>
    <strong>Data:</strong> 
    </p>

    <ul>
      <li> Throw the cross-embodiment data to focus on mobile manipulation. </li>
      <li> Add new verbal instruction data to train the subtask output. </li>
    </ul>

    
    </p>
    <h3> <a href='https://arxiv.org/pdf/2505.23705'>
    Knowledge Insulating Vision-Language-Action
    Models: Train Fast, Run Fast, Generalize Better </a>
    </h3>
    
    <p>
    <strong>TL;DR: </strong> Not backpropagating the gradient of action experts to VLMs. <br />
    </p>

    <h3> <a href='https://arxiv.org/pdf/2501.09747'>
    FAST: Efficient Action Tokenization for Vision-Language-Action Models </a>
    </h3>

    <p>
    
    </p>
    
    `
};
