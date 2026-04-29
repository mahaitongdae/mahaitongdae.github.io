import { type BlogPost } from '../../types';

export const flowMatchingLogLikelihood: BlogPost = {
    id: 'flow-matching-log-likelihood',
    title: 'Deriving the Instantaneous Change of Variables in Flow Matching',
    date: '2026-03-31',
    tags: ['Flow Matching', 'Generative Models', 'Math'],
    summary: 'A step-by-step derivation of the exact log-likelihood ODE (eq. 3.30) using the Continuity Equation and the Flow ODE.',
    content: `


    <h4> Reference: <a href='https://arxiv.org/pdf/2412.06264'>Flow Matching Guide and Code</a> </h4>

    <p>
    The authors of the Flow Matching framework state that the exact log-likelihood can be tracked along a
    sampling trajectory by combining the <strong>Continuity Equation</strong> and the <strong>Flow ODE</strong>.
    While the intermediate algebraic steps are skipped in the text, this post derives equation (3.30) line by line.
    </p>

    <h3>Notation, total and partial derivatives</h3>
    
    The notation 

    <h3>Step 1: Define the Necessary Components</h3>

    <p><strong>Flow ODE (3.19a):</strong></p>
    $$\\frac{d}{dt}\\psi_t(x) = u_t(\\psi_t(x))$$
    <p>
    For brevity, denote the sampling trajectory as $z_t = \\psi_t(x)$, so:
    $$\\frac{dz_t}{dt} = u_t(z_t)$$
    </p>

    <p><strong>Continuity Equation (3.25):</strong></p>
    $$\\frac{\\partial}{\\partial t}p_t(x) + \\text{div}\\bigl(p_t(x)\\, u_t(x)\\bigr) = 0$$

    <h3>Step 2: Expand the Continuity Equation</h3>

    <p>
    Apply the product rule for divergence: $\\text{div}(p_t u_t) = \\nabla p_t \\cdot u_t + p_t\\,\\text{div}(u_t)$.
    Substituting into the Continuity Equation:
    </p>
    $$\\frac{\\partial p_t}{\\partial t} + \\nabla p_t \\cdot u_t + p_t\\,\\text{div}(u_t) = 0$$

    <h3>Step 3: Compute the Total Time Derivative of $p_t(z_t)$</h3>

    <p>
    By the multivariate chain rule, the total derivative of the density along the flow is:
    </p>
    $$\\frac{d}{dt} p_t(z_t) = \\frac{\\partial p_t}{\\partial t}(z_t) + \\nabla p_t(z_t) \\cdot \\frac{dz_t}{dt}$$
    <p>Substituting the Flow ODE $\\frac{dz_t}{dt} = u_t(z_t)$:</p>
    $$\\frac{d}{dt} p_t(z_t) = \\frac{\\partial p_t}{\\partial t}(z_t) + \\nabla p_t(z_t) \\cdot u_t(z_t)$$

    <h3>Step 4: Combine with the Expanded Continuity Equation</h3>

    <p>
    The right-hand side of Step 3 exactly matches the first two terms of the expanded Continuity Equation.
    Rearranging those terms:
    </p>
    $$\\frac{\\partial p_t}{\\partial t} + \\nabla p_t \\cdot u_t = -p_t\\,\\text{div}(u_t)$$
    <p>Substituting back into the total derivative:</p>
    $$\\frac{d}{dt} p_t(z_t) = -p_t(z_t)\\,\\text{div}(u_t)(z_t)$$

    <h3>Step 5: Compute the Time Derivative of the Log-Likelihood</h3>

    <p>
    Apply the chain rule for logarithms $\\left(\\frac{d}{dt}\\log f(t) = \\frac{1}{f(t)}\\frac{df}{dt}\\right)$:
    </p>
    $$\\frac{d}{dt} \\log p_t(z_t) = \\frac{1}{p_t(z_t)} \\frac{d}{dt} p_t(z_t)$$
    <p>Substitute the result from Step 4:</p>
    $$\\frac{d}{dt} \\log p_t(z_t) = \\frac{1}{p_t(z_t)} \\Bigl(-p_t(z_t)\\,\\text{div}(u_t)(z_t)\\Bigr)$$
    <p>The $p_t(z_t)$ terms cancel, giving:</p>
    $$\\frac{d}{dt} \\log p_t(z_t) = -\\text{div}(u_t)(z_t)$$

    <h3>Step 6: Equation (3.30) and Final Integration</h3>

    <p>
    Substituting $z_t = \\psi_t(x)$ back recovers equation (3.30):
    </p>
    $$\\frac{d}{dt} \\log p_t(\\psi_t(x)) = -\\text{div}(u_t)(\\psi_t(x))$$

    <p>
    To compute the exact log-likelihood of a generated sample at $t=1$, integrate both sides from $t=0$ to $t=1$:
    </p>
    $$\\int_0^1 \\frac{d}{dt} \\log p_t(\\psi_t(x))\\, dt = -\\int_0^1 \\text{div}(u_t)(\\psi_t(x))\\, dt$$
    $$\\log p_1(\\psi_1(x)) - \\log p_0(\\psi_0(x)) = -\\int_0^1 \\text{div}(u_t)(\\psi_t(x))\\, dt$$

    <p>Rearranging gives the final result (equation 3.31):</p>
    $$\\boxed{\\log p_1(\\psi_1(x)) = \\log p_0(\\psi_0(x)) - \\int_0^1 \\text{div}(u_t)(\\psi_t(x))\\, dt}$$

    <p>
    This says: the log-likelihood at $t=1$ equals the log-likelihood of the initial noise at $t=0$, corrected
    by the integrated divergence of the velocity field along the trajectory. In practice, $\\text{div}(u_t)$
    is estimated via the Hutchinson trace estimator to keep computation tractable.
    </p>
    `,
};
