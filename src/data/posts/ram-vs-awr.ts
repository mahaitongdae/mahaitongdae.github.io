import { type BlogPost } from '../../types';

export const ramVsAwr: BlogPost = {
    id: 'ram-vs-awr',
    title: 'Reinforced Adjoint Matching and Advantage-Weighted Regression',
    date: '2026-08-06',
    tags: ['RLHF', 'Flow Matching', 'Diffusion', 'AWR'],
    summary: 'RAM derives its loss from adjoint matching, but the resulting update is gradient-equivalent to a reference-regularized, signed advantage-weighted flow-matching regression — the first-order form of the same exponential tilt that underlies AWR.',
    content: `

    <h4> Reference: <a href='https://arxiv.org/pdf/2605.10759'>RAM: Reward-Aware Matching</a> </h4>

    <p>
    A natural question when reading RAM: its loss looks suspiciously like advantage-weighted regression (AWR),
    even though the derivation goes through adjoint matching rather than a KL-regularized policy improvement step.
    Are the two actually the same thing?
    </p>

    <p>
    The short answer is yes, but the equivalence holds at <strong>three different levels</strong>, and it is worth
    separating them. The cleanest statement is:
    </p>

    <blockquote>
    RAM is not literally classical AWR, but its main loss is gradient-equivalent to a reference-regularized,
    signed advantage-weighted flow-matching regression. This update is the differential (first-order) form of the
    same exponential-tilting policy improvement that underlies AWR.
    </blockquote>

    <h3>Notation</h3>

    <p>
    Suppressing the prompt $c$, write
    </p>

    $$Y := \\epsilon - X_0, \\qquad X_t = (1-t)X_0 + t\\epsilon, \\qquad v := v_\\theta^t(X_t), \\qquad v_{\\rm ref} := v_{\\rm ref}^t(X_t).$$

    <p>
    Three objects carry the argument, and everything else is introduced where it first appears:
    </p>

    <ul>
        <li><strong>The data.</strong> $X_0$ is a clean sample (the endpoint of generation, and the thing the reward
        scores), $\\epsilon \\sim \\mathcal{N}(0,I)$ is noise, $X_t$ interpolates them along flow time $t \\in [0,1]$,
        and $Y$ is the flow-matching regression target — the velocity of that straight line.</li>
        <li><strong>The reference model.</strong> $p_0^{\\rm ref}$ is the endpoint distribution you get by sampling
        the pretrained flow, and $v_{\\rm ref}$ is its velocity field, i.e. the conditional mean
        $v_{\\rm ref}^t(x) = \\mathbb{E}_{\\rm ref}[Y \\mid X_t = x]$. This is the RL behavior policy in disguise:
        a prompt is a state, a finished sample is an action, and the pretrained model is what generated the data.</li>
        <li><strong>The advantage.</strong> $A(X_0)$ is a group-relative normalized reward — center over samples
        sharing a prompt, divide by the standard deviation. The paper's objectives are written with a raw reward
        $r(X_0)$, but the experiments use $A$, so it is the practical stand-in throughout. Being signed and roughly
        zero-mean is exactly what matters in Section 4.</li>
    </ul>

    <hr/>

    <h2>1. At the endpoint-policy level, RAM and AWR have exactly the same Gibbs tilt</h2>

    <p>RAM starts from the KL-regularized reward maximization problem</p>

    $$\\max_p \\; \\mathbb{E}_{X_0 \\sim p}[r(X_0)] - D_{\\mathrm{KL}}\\!\\left(p \\,\\|\\, p_0^{\\rm ref}\\right),$$

    <p>whose nonparametric optimum is the Gibbs distribution</p>

    $$p_0^\\star(x_0) = \\frac{1}{Z} p_0^{\\rm ref}(x_0) e^{r(x_0)},$$

    <p>with $Z$ the normalizer. Classical AWR derives the nonparametric improved policy</p>

    $$\\pi^\\star(a \\mid s) = \\frac{1}{Z(s)} \\mu(a \\mid s) \\exp\\!\\left(\\frac{A^\\mu(s,a)}{\\tau}\\right),$$

    <p>
    where $\\mu$ is the behavior policy that generated the data, $A^\\mu$ is the advantage under it, $\\tau$ is a
    temperature controlling how aggressive the reweighting is, and $\\pi^\\star$ is the exact improved policy before
    any function approximation. AWR then projects $\\pi^\\star$ onto the parameterized policy class through
    advantage-weighted maximum likelihood. With the identifications
    </p>

    $$s \\longleftrightarrow c, \\qquad a \\longleftrightarrow X_0, \\qquad \\mu(\\cdot \\mid c) \\longleftrightarrow p_0^{\\rm ref}(\\cdot \\mid c), \\qquad r = \\frac{A}{\\tau},$$

    <p>
    the desired endpoint distribution is exactly the AWR/RWR Gibbs-improved policy. A prompt-dependent baseline
    $b(c)$ subtracted from the reward does not change this target, since
    </p>

    $$e^{(r(x,c) - b(c))/\\tau} = e^{-b(c)/\\tau} e^{r(x,c)/\\tau}$$

    <p>
    and the first factor is absorbed into the prompt-dependent normalization $Z(c)$. So the
    <strong>nonparametric policy target is exactly AWR-like</strong>.
    </p>

    <hr/>

    <h2>2. RAM is the derivative of exponentially advantage-weighted regression</h2>

    <p>Consider the exact exponentially weighted flow-matching objective</p>

    $$\\mathcal{L}_\\lambda(v) = \\mathbb{E}_{X_0 \\sim p_0^{\\rm ref},\\, \\epsilon,\\, t} \\left[ e^{\\lambda A(X_0)} \\left\\| v_t(X_t) - Y \\right\\|^2 \\right].$$

    <p>
    where $\\lambda \\ge 0$ scales the tilt and $\\mathbb{E}_{\\rm ref}$ is an expectation under the reference model.
    Its pointwise minimizer is the ratio of tilted conditional expectations
    </p>

    $$v_t^\\lambda(x) = \\frac{\\mathbb{E}_{\\rm ref}\\left[e^{\\lambda A(X_0)} Y \\mid X_t = x\\right]}{\\mathbb{E}_{\\rm ref}\\left[e^{\\lambda A(X_0)} \\mid X_t = x\\right]},$$

    <p>which is simply the exact velocity field of the tilted endpoint distribution</p>

    $$p_0^\\lambda(x_0) \\propto p_0^{\\rm ref}(x_0) e^{\\lambda A(x_0)}.$$

    <p>
    Differentiating with respect to the tilt strength $\\lambda$ — with $\\mathbb{E}_\\lambda$ now denoting an
    expectation under $p_0^\\lambda$ — gives
    </p>

    $$\\begin{aligned}
    \\partial_\\lambda v_t^\\lambda(x)
    &= \\mathbb{E}_\\lambda[A(X_0) Y \\mid X_t = x] - \\mathbb{E}_\\lambda[A(X_0) \\mid X_t = x]\\, \\mathbb{E}_\\lambda[Y \\mid X_t = x] \\\\
    &= \\mathbb{E}_\\lambda\\left[ A(X_0)\\left(Y - v_t^\\lambda(x)\\right) \\mid X_t = x \\right].
    \\end{aligned}$$

    <p>
    This is <strong>exactly the reward-corrected direction appearing in RAM</strong>. RAM's Lemma 4.2 gives this
    identity and writes the total optimal velocity change as
    </p>

    $$v_t^\\star - v_t^{\\rm ref} = \\int_0^1 \\mathbb{E}_\\lambda\\left[ A(X_0)(Y - v_t^\\lambda) \\mid X_t \\right] d\\lambda,$$

    <p>where $v_t^\\star$ is the exact velocity of the KL-optimal endpoint distribution $p_0^\\star$.</p>

    <p>
    The scalable RAM fixed point replaces that integral over the whole exponential-tilt path by a single evaluation
    under the current, on-policy endpoint distribution. The paper consequently proves agreement with the KL optimum
    to first order in reward, and exactness when the velocity varies linearly along the tilt path (including its
    Gaussian-reference / linear-reward example). RAM is therefore accurately viewed as the
    <strong>tangent (influence-function) version of AWR's exponential reweighting</strong>.
    </p>

    <hr/>

    <h2>3. Equation (17) is gradient-equivalent to signed advantage-weighted matching</h2>

    <p>RAM's main loss is</p>

    $$\\ell_{\\rm RAM} = \\left\\| v - \\operatorname{sg}\\left[ v_{\\rm ref} + \\eta A(X_0)(Y - v) \\right] \\right\\|^2,$$

    <p>
    where $\\eta$ is the reward multiplier and $\\operatorname{sg}$ is stop-gradient, so only the leading $v$ is
    differentiated. Its semigradient is
    </p>

    $$\\begin{aligned}
    \\nabla_\\theta \\ell_{\\rm RAM}
    &= 2(\\nabla_\\theta v)^\\top \\left[ v - v_{\\rm ref} - \\eta A(Y - v) \\right] \\\\
    &= 2(\\nabla_\\theta v)^\\top \\left[ (v - v_{\\rm ref}) + \\eta A(v - Y) \\right].
    \\end{aligned}$$

    <p>But this is exactly the gradient of</p>

    $$\\widetilde{\\ell}_{\\rm RAM} = \\left\\| v - v_{\\rm ref} \\right\\|^2 + \\eta A(X_0) \\left\\| v - Y \\right\\|^2.$$

    <p>In other words,</p>

    $$\\boxed{ \\ell_{\\rm RAM} \\;\\doteq_\\nabla\\; \\underbrace{\\|v - v_{\\rm ref}\\|^2}_{\\text{reference / KL-like anchor}} + \\underbrace{\\eta A(X_0)\\|v - Y\\|^2}_{\\text{signed advantage-weighted FM}} }$$

    <p>
    where $\\doteq_\\nabla$ means "has the same parameter gradient," not "has the same numerical value."
    This is essentially the on-policy form of <strong>Advantage Weighted Matching</strong> (AWM):
    </p>

    $$\\ell_{\\rm AWM} = A(X_0)\\|v - Y\\|^2 + \\beta_{\\rm KL}\\|v - v_{\\rm ref}\\|^2,$$

    <p>
    where $\\beta_{\\rm KL}$ weights the velocity-space reference penalty. After dividing the RAM gradient by the
    irrelevant overall scalar $\\eta$, the coefficient correspondence is
    </p>

    $$\\boxed{\\beta_{\\rm KL} = \\frac{1}{\\eta}}.$$

    <p>
    AWM explicitly derives the signed advantage-weighted flow-matching gradient and combines it with a
    velocity-space reference penalty; under its on-policy ratio trick, uniform timestep weighting, and no clipping,
    this is the same update direction as the idealized RAM Equation (17). So there is an even stronger statement:
    <strong>the main RAM loss is semigradient-equivalent to AWM with a particular KL coefficient.</strong>
    The derivations differ — adjoint matching versus an ELBO / policy-gradient surrogate — but the resulting local
    parameter update is algebraically the same under the assumptions above.
    </p>

    <hr/>

    <h2>4. Connection to classical AWR through a first-order expansion</h2>

    <p>Classical AWR uses positive exponential weights,</p>

    $$w_{\\rm AWR}(A) = e^{\\eta A} > 0,$$

    <p>whereas RAM/AWM use a signed linear coefficient $A$. The bridge is the expansion $e^{\\eta A} = 1 + \\eta A + O(\\eta^2)$, so an AWR-style exponentially weighted FM loss becomes</p>

    $$\\mathbb{E}_{\\rm ref}\\left[e^{\\eta A}\\|v - Y\\|^2\\right] = \\mathbb{E}_{\\rm ref}\\left[\\|v - Y\\|^2\\right] + \\eta\\, \\mathbb{E}_{\\rm ref}\\left[A\\|v - Y\\|^2\\right] + O(\\eta^2).$$

    <p>For reference-distribution samples the bias-variance decomposition gives</p>

    $$\\mathbb{E}_{\\rm ref}\\left[\\|v - Y\\|^2 \\mid X_t\\right] = \\|v - v_{\\rm ref}\\|^2 + \\mathbb{E}_{\\rm ref}\\left[\\|Y - v_{\\rm ref}\\|^2 \\mid X_t\\right],$$

    <p>and the second term does not depend on $v$. Hence, up to a constant,</p>

    $$\\mathbb{E}_{\\rm ref}\\left[e^{\\eta A}\\|v - Y\\|^2\\right] = \\mathbb{E}_{\\rm ref}\\left[\\|v - v_{\\rm ref}\\|^2 + \\eta A\\|v - Y\\|^2\\right] + O(\\eta^2),$$

    <p>whose right-hand side is exactly the RAM semigradient surrogate. Therefore</p>

    $$\\boxed{\\text{RAM} \\approx \\text{first-order Taylor expansion of exponentiated AWR in velocity space}.}$$

    <p>
    This also explains why the RAM paper obtains only first-order agreement with the exact Gibbs/KL optimum
    in general.
    </p>

    <hr/>

    <h2>5. The $\\lambda$-derivative in detail</h2>

    <p>
    The step in Section 2 deserves unpacking, because it is easy to misread $\\partial_\\lambda$ as a training
    gradient. It is not. <strong>$\\lambda$ is not a trainable parameter.</strong> It is an auxiliary scalar that
    parameterizes a continuous path of distributions from the reference model to the exact reward-tilted optimum:
    </p>

    $$p_0^\\lambda(x_0) = \\frac{p_0^{\\mathrm{ref}}(x_0) e^{\\lambda A(x_0)}}{Z_\\lambda}, \\qquad \\lambda \\in [0,1],$$

    <p>with $Z_\\lambda$ the normalizer of the tilt, so that</p>

    $$p_0^0 = p_0^{\\mathrm{ref}}, \\qquad p_0^1 = p_0^\\star \\propto p_0^{\\mathrm{ref}} e^{A}.$$

    <p>
    Thus $\\lambda$ answers "how strongly have we turned on the reward tilt?" It helps to keep three variables
    separate: $t$ is flow/diffusion time, $\\lambda$ is reward-tilt strength, and $\\theta$ is the neural-network
    parameters. The derivative $\\partial_\\lambda v_t^\\lambda$ is a <strong>distribution-level sensitivity</strong>,
    not the training gradient $\\nabla_\\theta \\mathcal{L}$.
    </p>

    <h3>5.1 The velocity of a tilted distribution</h3>

    <p>For rectified flow, $X_t = (1-t)X_0 + t\\epsilon$ with $\\epsilon \\sim \\mathcal{N}(0, I)$, and the flow-matching target is $Y := \\epsilon - X_0$. For any endpoint distribution $p_0^\\lambda$ the exact velocity field is $v_t^\\lambda(x) = \\mathbb{E}_\\lambda[Y \\mid X_t = x]$. At fixed $X_t = x$, the noise is determined by the endpoint,</p>

    $$\\epsilon = \\frac{x - (1-t)X_0}{t}, \\qquad \\text{so} \\qquad Y = \\epsilon - X_0 = \\frac{x - X_0}{t}.$$

    <p>
    So $Y$ has no explicit dependence on $\\lambda$; only its <em>conditional distribution</em> changes.
    Because the noising kernel is the same for every $\\lambda$, the tilt passes through to the reference
    <em>posterior</em> $p_{\\mathrm{ref}}(x_0 \\mid X_t = x)$ over clean endpoints given a noisy state:
    </p>

    $$p_\\lambda(x_0 \\mid X_t = x) = \\frac{e^{\\lambda A(x_0)} p_{\\mathrm{ref}}(x_0 \\mid X_t = x)}{\\mathbb{E}_{\\mathrm{ref}}[e^{\\lambda A(X_0)} \\mid X_t = x]},$$

    <p>which reproduces the exponentially advantage-weighted conditional regression solution from Section 2.</p>

    <h3>5.2 Differentiation via the quotient rule</h3>

    <p>Fix $t, x$ and define</p>

    $$N_\\lambda(x) := \\mathbb{E}_{\\mathrm{ref}}\\left[e^{\\lambda A(X_0)} Y \\mid X_t = x\\right], \\qquad D_\\lambda(x) := \\mathbb{E}_{\\mathrm{ref}}\\left[e^{\\lambda A(X_0)} \\mid X_t = x\\right],$$

    <p>so that $v_t^\\lambda(x) = N_\\lambda(x) / D_\\lambda(x)$. Differentiating under the expectation,</p>

    $$\\partial_\\lambda N_\\lambda(x) = \\mathbb{E}_{\\mathrm{ref}}\\left[A(X_0) e^{\\lambda A(X_0)} Y \\mid X_t = x\\right], \\qquad \\partial_\\lambda D_\\lambda(x) = \\mathbb{E}_{\\mathrm{ref}}\\left[A(X_0) e^{\\lambda A(X_0)} \\mid X_t = x\\right].$$

    <p>The quotient rule gives $\\partial_\\lambda v_t^\\lambda = (N_\\lambda' D_\\lambda - N_\\lambda D_\\lambda')/D_\\lambda^2$. Since every tilted expectation can be written as</p>

    $$\\mathbb{E}_\\lambda[f \\mid X_t = x] = \\frac{\\mathbb{E}_{\\mathrm{ref}}[e^{\\lambda A} f \\mid X_t = x]}{D_\\lambda(x)},$$

    <p>the three ratios simplify to $N_\\lambda'/D_\\lambda = \\mathbb{E}_\\lambda[AY \\mid x]$, $N_\\lambda/D_\\lambda = v_t^\\lambda(x)$, and $D_\\lambda'/D_\\lambda = \\mathbb{E}_\\lambda[A \\mid x]$. Therefore</p>

    $$\\boxed{ \\partial_\\lambda v_t^\\lambda(x) = \\mathbb{E}_\\lambda\\left[ A(X_0)\\left( (\\epsilon - X_0) - v_t^\\lambda(x) \\right) \\mid X_t = x \\right], }$$

    <p>which is Equation (19) in RAM. The paper derives the same identity in log-derivative (score-function) form.</p>

    <h3>5.3 The same result as a covariance</h3>

    <p>The conditional tilted density $p_\\lambda(x_0 \\mid x) \\propto p_{\\mathrm{ref}}(x_0 \\mid x) e^{\\lambda A(x_0)}$ has logarithmic derivative</p>

    $$\\partial_\\lambda \\log p_\\lambda(x_0 \\mid x) = A(x_0) - \\mathbb{E}_\\lambda[A(X_0) \\mid X_t = x],$$

    <p>so for any $f$ with no explicit $\\lambda$-dependence,</p>

    $$\\partial_\\lambda \\mathbb{E}_\\lambda[f \\mid X_t = x] = \\mathbb{E}_\\lambda[fA \\mid x] - \\mathbb{E}_\\lambda[f \\mid x]\\,\\mathbb{E}_\\lambda[A \\mid x] = \\operatorname{Cov}_\\lambda(A, f \\mid X_t = x).$$

    <p>Setting $f = Y$ gives the compact form</p>

    $$\\partial_\\lambda v_t^\\lambda(x) = \\operatorname{Cov}_\\lambda\\left(A(X_0), \\epsilon - X_0 \\mid X_t = x\\right).$$

    <p>
    Increasing the reward tilt moves the velocity in the direction of the
    <strong>conditional covariance between reward and the flow-matching target</strong>.
    </p>

    <hr/>

    <h2>6. Why differentiate with respect to $\\lambda$ at all?</h2>

    <h3>Reason 1: it isolates the infinitesimal effect of exponential reweighting</h3>

    <p>The global AWR-style update is $p_0^\\lambda \\propto p_0^{\\mathrm{ref}} e^{\\lambda A}$. The derivative answers: if I increase the reward strength from $\\lambda$ to $\\lambda + d\\lambda$, in which direction does the exact velocity field move? Locally,</p>

    $$v_t^{\\lambda + d\\lambda}(x) = v_t^\\lambda(x) + d\\lambda\\, \\mathbb{E}_\\lambda\\left[A(Y - v_t^\\lambda) \\mid X_t = x\\right] + o(d\\lambda).$$

    <p>
    So the apparently signed RAM/AWM correction $A(Y - v)$ is precisely the <strong>local tangent direction</strong>
    of exponentiated AWR. The exponential weight itself is global and positive, $e^{\\lambda A} > 0$, but its
    derivative is signed, $\\partial_\\lambda e^{\\lambda A} = A e^{\\lambda A}$. That is why signed advantage weights
    appear the moment you differentiate an exponential tilt.
    </p>

    <h3>Reason 2: integrating the derivative recovers the entire optimal change</h3>

    <p>Because $v_t^0 = v_t^{\\mathrm{ref}}$ and $v_t^1 = v_t^\\star$, the fundamental theorem of calculus gives</p>

    $$v_t^\\star(x) - v_t^{\\mathrm{ref}}(x) = \\int_0^1 \\partial_\\lambda v_t^\\lambda(x)\\, d\\lambda = \\int_0^1 \\mathbb{E}_\\lambda\\left[A(X_0)\\left(Y - v_t^\\lambda(x)\\right) \\mid X_t = x\\right] d\\lambda.$$

    <p>
    The exact Gibbs/AWR velocity change is an accumulation of infinitely many local signed advantage-weighted
    corrections. This is the real reason for introducing $\\lambda$: it converts the difference between two
    intractable velocity fields into an integral of a quantity that has exactly the form RAM uses.
    </p>

    <h3>Reason 3: it exposes what RAM approximates</h3>

    <p>RAM's fixed-point equation is</p>

    $$v_t^\\theta(x) - v_t^{\\mathrm{ref}}(x) = \\mathbb{E}_\\theta\\left[A(X_0)\\left(Y - v_t^\\theta(x)\\right) \\mid X_t = x\\right],$$

    <p>
    where $\\mathbb{E}_\\theta$ is taken under $p_0^\\theta$, the endpoint distribution of the current network,
    while the exact equation is the path integral above. The exact optimum uses the
    <strong>average derivative over the whole tilt path</strong>; RAM uses one on-policy evaluation with the current
    velocity and endpoint distribution, i.e. the right-endpoint approximation
    </p>

    $$\\int_0^1 g(\\lambda)\\, d\\lambda \\approx g(1).$$

    <p>
    The RAM paper explicitly describes its fixed point this way. It is exact when $v_t^\\lambda$ is affine in
    $\\lambda$ (then $\\partial_\\lambda v_t^\\lambda$ is constant); otherwise it is a first-order approximation.
    One nuance: during training $p_0^\\theta$ need not literally equal some member $p_0^\\lambda$ of the exact
    exponential path — the path is primarily an analysis device for the eventual fixed point.
    </p>

    <h3>Why not differentiate with respect to $\\theta$?</h3>

    <p>
    Differentiating with respect to network parameters gives $\\nabla_\\theta v_t^\\theta(x)$, which describes how
    changing weights changes the output and depends on the architecture. The theoretical question is different:
    how does the <em>exact target</em> velocity change when the target distribution is tilted toward higher reward?
    That is $\\partial_\\lambda v_t^\\lambda(x)$, and it is parameterization-independent — a transformer, a U-Net,
    or a lookup table would all give the same distributional movement. The training gradient
    $\\nabla_\\theta \\mathcal{L}_{\\rm RAM}$ is just how RAM makes the network follow that desired correction.
    </p>

    <hr/>

    <h2>7. Why an advantage appears even when you write a raw reward</h2>

    <p>The expression $\\mathbb{E}_\\lambda[A(Y - v^\\lambda) \\mid x]$ automatically centers $A$:</p>

    $$\\mathbb{E}_\\lambda[A(Y - v^\\lambda) \\mid x] = \\mathbb{E}_\\lambda[(A - \\bar{A}_\\lambda(x))(Y - v^\\lambda) \\mid x], \\qquad \\bar{A}_\\lambda(x) = \\mathbb{E}_\\lambda[A \\mid X_t = x],$$

    <p>
    because $\\mathbb{E}_\\lambda[Y - v^\\lambda \\mid X_t = x] = 0$. The normalization constant in the exponential
    tilt produces an advantage-like baseline for free. Concretely, with discrete candidate endpoints $i$,
    </p>

    $$w_i^\\lambda = \\frac{w_i^0 e^{\\lambda A_i}}{\\sum_j w_j^0 e^{\\lambda A_j}}, \\qquad v^\\lambda = \\sum_i w_i^\\lambda Y_i, \\qquad \\frac{d}{d\\lambda} v^\\lambda = \\sum_i w_i^\\lambda (A_i - \\bar{A}^\\lambda) Y_i.$$

    <p>
    Increasing $\\lambda$ moves the velocity toward the flow targets of above-average-reward endpoints and away
    from below-average ones.
    </p>

    <hr/>

    <h2>Important distinctions</h2>

    <p>
    <strong>Signed versus positive weights.</strong> Classical AWR never gives a negative regression weight, since
    $e^{A/\\tau} > 0$; low-advantage samples merely receive less positive weight. RAM and AWM use the signed
    coefficient $A$, so negative-advantage samples actively push the velocity <em>away</em> from their
    flow-matching targets. The finite-step optimization geometry is therefore different even though the
    infinitesimal distributional direction agrees.
    </p>

    <p>
    <strong>Exact RAM variants are not AWR.</strong> The full adjoint contains both a reward-weighted bridge-score
    term and the gradient of the cumulative control cost. Main RAM drops the latter to obtain Equation (17);
    the variants in the paper's Section 5 that retain it have no direct advantage-weighted-regression form.
    </p>

    <p>
    <strong>The implementation lags the target.</strong> The released code uses $v_{\\rm old}$, a lagged (EMA) copy
    of the network, inside the target,
    </p>

    $$v_{\\rm target} = v_{\\rm ref} + \\eta A(Y - v_{\\rm old}),$$

    <p>rather than the stopped current $v$ written in Equation (17). Its gradient differs from the exact AWM-equivalent gradient by</p>

    $$2\\eta A (\\nabla_\\theta v)^\\top (v_{\\rm old} - v),$$

    <p>so the equivalence is only approximate, and holds when the lagged model stays close to the current model. The code also samples from this lagged/EMA policy.</p>

    <hr/>

    <h2>Bottom line</h2>

    <ul>
        <li><strong>Endpoint target:</strong> exactly the same exponential tilt as AWR.</li>
        <li><strong>Main RAM gradient:</strong> exactly signed advantage-weighted FM plus reference regression.</li>
        <li><strong>Relation to classical AWR:</strong> its differential / first-order velocity-space form.</li>
        <li><strong>Relation to AWM:</strong> essentially identical on-policy semigradient, modulo coefficients and lagging.</li>
    </ul>

    <p>
    So the initial intuition is right: RAM's scalable loss is much closer to advantage-weighted
    regression/matching than the paper's rather different derivation makes it appear.
    </p>
    `,
};
