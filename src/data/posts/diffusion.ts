import { type BlogPost } from '../../types';

export const diffusionRL: BlogPost = {
    id: 'diffusion-rl',
    title: 'RL for Diffusion Models',
    date: '2025-11-26',
    tags: ['Reinforcement Learning', 'Diffusion'],
    summary: 'Summarizing RL for diffusion models',
    content: `

    <p>
    Diffusion models are a class of generative models that can be used to generate images, videos, and other types of data. 
    It usually learns from a huge dataset, but sometimes we need reward feedback to guide the generation process.
    Therefore, we discuss the use of reinforcement learning for diffusion models here.
    </p>
    
    <h3>Preliminary: diffusion models</h3>

    <h4>Trade-off between Inception Score (IS) and FID</h4>
    <p>
    <ul>
        <li>IS is more sensitive to the quality of the generated images</li>
        <li>FID measures the distance between the distributions of generated images and the real images, it is more sensitive to the diversity of the generated images</li>
    </ul>
    </p>

    <p>
    Therefore, in <a href="https://arxiv.org/pdf/1809.11096.pdf">BigGAN</a>, the authors used truncation method 
    to control the quality of the generated images. Truncation method simply truncates samples from a Gaussian
    distribution when value exceeds a threshold (the outliers).
    </p>

    <h4>Classifier Guidance</h4>
    <p>
    The noise prediction model equals scaled score functions 
    $ \\epsilon_\\theta(\\bfx_t, t) \\approx \\frac{1}{\\sigma_t} \\nabla_{x_t} \\log p_\\theta(x_t | t) $
    </p>

    According to Bayes' rule, we have
    $$
    p_\\theta(\\bfx_t | \\bfc) \\propto p( \\bfc | \\bfx_t) p_\\theta(\\bfx_t)
    $$
    Therefore we have the score functions
    \\begin{equation}
    \\nabla_{\\bfx_t} \\log p_\\theta(\\bfx_t | \\bfc) = \\nabla_{\\bfx_t} \\log p( \\bfc | \\bfx_t) + \\nabla_{\\bfx_t} \\log p_\\theta(\\bfx_t) \\
    \\end{equation}

    Additionally, we can add further weights $w$ to further push the generated images towards the target class,
    $$
    \\begin{align*}
    \\text{Empirical Score}(w) &= (1+w) \\nabla_{\\bfx_t} \\log p( \\bfc | \\bfx_t) +  \\nabla_{\\bfx_t} \\log p_\\theta(\\bfx_t) \\\\
    &= w \\nabla_{\\bfx_t} \\log p( \\bfc | \\bfx_t) + \\nabla_{\\bfx_t} \\log p_\\theta(\\bfx_t | \\bfc)
    \\end{align*}
    $$
    which means we can use classifier guidance on both unconditional and conditional models.
    
    <BlockQuote>
        <p>but interestingly, Dhariwal & Nichol obtain their best results when applying classifier guidance to an
        already class-conditional model, as opposed to applying guidance to an unconditional model.</p>
    </BlockQuote>

    <h4>Classifier-Free Guidance</h4>

    CFG approximates $\\eqref{eq:bayes_rule}$ by training a single neural network $\\epsilon_\\theta$ to model both the conditional and unconditional scores. 
    
    
    
    <h3>Preliminary: reinforcement learning</h3>

    <p>Consider a Markov Decision Process (MDP) with state space $\\mathcal S \\RR^d$ , action space $A$ , and transition probability $p(s' | s, a)$.</p>

      `
};
