import { type BlogPost } from '../../types';

export const layerWiseAnalysisVisualFoundationModels: BlogPost = {
    id: 'layer-wise-analysis-visual-foundation-models',
    title: 'Layer-Wise Analysis of Visual Foundation Models: What Do Intermediate Representations Really Encode?',
    date: '2026-04-28',
    tags: ['Vision Transformers', 'CLIP', 'DINO', 'Representation Learning'],
    summary: 'A survey of five recent papers showing that intermediate layers of CLIP, DINO, and DINOv2 carry qualitatively different — and sometimes richer — information than the final output.',
    content: `

    <p>
    Modern visual foundation models — CLIP, DINO, DINOv2 — are often treated as black boxes that produce a single final embedding.
    But a growing body of work shows that <strong>intermediate layers carry qualitatively different, and sometimes richer,
    information than the final output</strong>. This post surveys five recent papers that collectively paint a detailed picture
    of how information flows through Vision Transformers, layer by layer.
    </p>

    <hr/>

    <h2>1. Background: How Visual Foundation Models Produce Representations</h2>

    <h3>CLIP: Contrastive Language-Image Pre-training</h3>

    <p>
    CLIP (Radford et al., 2021) trains an image encoder and a text encoder jointly so that matched image-text pairs are close
    in a shared embedding space. The training objective is a symmetric contrastive loss (InfoNCE) over a batch of $N$ image-text pairs:
    </p>

    $$\\mathcal{L} = -\\frac{1}{2N} \\sum_{i=1}^{N} \\left[ \\log \\frac{\\exp(\\text{sim}(I_i, T_i)/\\tau)}{\\sum_{j=1}^{N} \\exp(\\text{sim}(I_i, T_j)/\\tau)} + \\log \\frac{\\exp(\\text{sim}(T_i, I_i)/\\tau)}{\\sum_{j=1}^{N} \\exp(\\text{sim}(T_j, I_j)/\\tau)} \\right]$$

    <p>
    where $\\text{sim}(I, T) = \\frac{f_I(I)^\\top f_T(T)}{\\|f_I(I)\\| \\|f_T(T)\\|}$ is cosine similarity between
    L2-normalized image and text embeddings, and $\\tau$ is a learnable temperature.
    </p>

    <p>
    <strong>How ViT produces the final representation.</strong> A Vision Transformer splits an image into $M$ non-overlapping patches,
    linearly embeds each, and prepends a learnable [CLS] token:
    </p>

    $$Z^0 = [\\mathbf{z}_{\\text{cls}}^0;\\; \\mathbf{z}_1^0;\\; \\mathbf{z}_2^0;\\; \\ldots;\\; \\mathbf{z}_M^0] + E_{\\text{pos}}$$

    <p>
    After $L$ transformer blocks — each consisting of multi-head self-attention (MHSA) and a feed-forward network (FFN) with residual connections:
    </p>

    $$\\hat{Z}^\\ell = \\text{MHSA}(\\text{LN}(Z^{\\ell-1})) + Z^{\\ell-1}, \\qquad Z^\\ell = \\text{FFN}(\\text{LN}(\\hat{Z}^\\ell)) + \\hat{Z}^\\ell$$

    <p>
    the [CLS] token at the final layer is extracted as $\\mathbf{z}_{\\text{cls}}^L = Z^L[0]$ (the first row of $Z^L$).
    This vector has attended to all patches across all layers, serving as a global image summary. CLIP then projects and
    normalizes it into the shared multimodal space:
    </p>

    $$\\mathbf{e}_{\\text{image}} = \\frac{W_p \\cdot \\text{LN}(\\mathbf{z}_{\\text{cls}}^L)}{\\|W_p \\cdot \\text{LN}(\\mathbf{z}_{\\text{cls}}^L)\\|}$$

    <p>
    This final embedding is optimized for cross-modal retrieval, not for preserving every kind of visual information.
    </p>

    <h3>DINO: Self-Distillation with No Labels</h3>

    <p>
    DINO (Caron et al., 2021) trains a student network $g_{\\theta_s}$ to match a momentum-updated teacher $g_{\\theta_t}$.
    Both produce probability distributions over $K$ dimensions via temperature-scaled softmax:
    </p>

    $$P_s(x)^{(i)} = \\frac{\\exp(g_{\\theta_s}(x)^{(i)} / \\tau_s)}{\\sum_{k=1}^{K} \\exp(g_{\\theta_s}(x)^{(k)} / \\tau_s)}$$

    <p>
    The teacher output is centered and sharpened: $P_t(x)^{(i)} \\propto \\exp((g_{\\theta_t}(x)^{(i)} - c) / \\tau_t)$,
    where $c$ is an exponential moving average of teacher outputs (preventing mode collapse). Training minimizes cross-entropy
    across augmented views:
    </p>

    $$\\min_{\\theta_s} \\sum_{x \\in \\{x_1^g, x_2^g\\}} \\sum_{\\substack{x' \\in V \\\\ x' \\neq x}} H(P_t(x), P_s(x'))$$

    <p>
    where $\\{x_1^g, x_2^g\\}$ are global crops and $V$ includes both global and local crops. Local crops go through the student only;
    global crops go through the teacher — encouraging the student to infer global semantics from local views. The teacher is updated
    as $\\theta_t \\leftarrow \\lambda \\theta_t + (1-\\lambda)\\theta_s$.
    </p>

    <p>
    A key finding: self-supervised ViT features contain <strong>explicit semantic segmentation information</strong> —
    [CLS] attention maps at the last layer highlight objects without any supervision.
    </p>

    <hr/>

    <h2>2. Paper Summaries</h2>

    <h3>2.1 Skean et al. (2025) — <em>Layer by Layer: Uncovering Hidden Representations in Language Models</em> (ICML 2025)</h3>

    <p>
    <strong>Key idea.</strong> Intermediate layers consistently outperform final layers for downstream tasks, challenging the default
    practice of always using the last layer's output.
    </p>

    <p>
    <strong>Method.</strong> A unified framework measures representation quality through <em>matrix-based entropy</em>.
    Given representation matrix $Z \\in \\mathbb{R}^{N \\times D}$ with Gram matrix $K = ZZ^\\top$ and eigenvalues $\\{\\lambda_i\\}$:
    </p>

    $$S_\\alpha(Z) = \\frac{1}{1 - \\alpha} \\log \\sum_{i=1}^{r} \\left(\\frac{\\lambda_i(K)}{\\text{tr}(K)}\\right)^\\alpha$$

    <p>
    If few eigenvalues dominate, $S_\\alpha$ is small (highly compressed); if spread uniformly, $S_\\alpha$ is large (diverse).
    This unifies three views: <strong>compression</strong> (spectral concentration), <strong>geometry</strong> (curvature of token trajectories),
    and <strong>invariance</strong> (stability under augmentation, measured by
    DiME<span class="sidenote-ref"></span><span class="sidenote">DiME (Difference of Matrix-based Entropies) estimates how well a representation preserves input identity under augmentation, by comparing matrix-based entropy of real paired samples against random pairings.</span>).
    </p>

    <p>A theoretical result connects entropy to downstream performance:</p>

    $$\\log(N) - \\text{InfoNCE} \\leq I(X; Z) \\leq H(Z)$$

    <p>
    <strong>Metrics and results.</strong> Every layer evaluated on 32
    MTEB<span class="sidenote-ref"></span><span class="sidenote">MTEB (Massive Text Embedding Benchmark) is a collection of 32 text tasks spanning classification, clustering, reranking, and sentence similarity.</span> tasks (text) and
    ImageNet<span class="sidenote-ref"></span><span class="sidenote">ImageNet is a large-scale image classification benchmark with ~1.2M training images across 1,000 categories. "Top-1 accuracy" = fraction of images where the model's best prediction is correct.</span>
    (vision, via attention probing<span class="sidenote-ref"></span><span class="sidenote">Attention probing trains a lightweight attention-based classifier on frozen features from a specific layer, measuring how much task-relevant information that layer encodes.</span>):
    </p>

    <ul>
    <li>Intermediate layers outperform final layers by <strong>up to 16%</strong> on average across tasks.</li>
    <li><strong>AIM</strong> (autoregressive image model) exhibits the same mid-layer entropy valley and accuracy peak seen in language models.</li>
    <li><strong>Non-autoregressive models</strong> (ViT, CLIP, DINOv2, MAE, BEiT) show more gradual improvement, but intermediate layers still approach or match final-layer quality.</li>
    <li>The <strong>training objective</strong> (autoregressive vs. not), not data modality, is the main driver.</li>
    <li>DiME-based unsupervised layer selection on Pythia-410M<span class="sidenote-ref"></span><span class="sidenote">Pythia is a suite of open-source language models (14M–12B parameters) trained on identical data in identical order, designed for studying how model behavior changes with scale.</span> yields <strong>3% improvement</strong> over the final layer — without task-specific labels.</li>
    </ul>

    <hr/>

    <h3>2.2 Madasu et al. (2024) — <em>Quantifying and Enabling the Interpretability of CLIP-like Models</em></h3>

    <p>
    <strong>Key idea.</strong> Individual attention heads in CLIP specialize in specific visual properties (colors, animals, locations, emotions),
    and larger models exhibit cleaner specialization.
    </p>

    <p>
    <strong>Method.</strong> The <strong>TEXTSPAN algorithm</strong><span class="sidenote-ref"></span><span class="sidenote">TEXTSPAN (Gandelsman et al., 2024) decomposes what each attention head has learned by associating heads with text descriptions that best explain their outputs, using an iterative principal-component-like procedure.</span> decomposes
    each attention head: for a set of candidate text descriptions, it iteratively finds the text with highest variance when projected onto
    each head's output space, projects that component away, and repeats. The common property across top texts (e.g., "colors," "geolocation")
    is labeled via in-context learning.
    </p>

    <p>
    <strong>Metrics and results.</strong> Two metrics across six CLIP variants:
    </p>

    <ul>
    <li><strong>Entanglement</strong> (lower = better): how often different heads share the same property label.</li>
    <li><strong>Association</strong> (higher = better): how often a head's top text descriptions genuinely match its assigned property.</li>
    </ul>

    <table>
    <thead>
    <tr><th>Model</th><th>Entanglement (↓)</th><th>Association (↑)</th></tr>
    </thead>
    <tbody>
    <tr><td>CLIP ViT-B/32 (OpenAI)</td><td>0.437</td><td>0.437</td></tr>
    <tr><td>CLIP ViT-B/16 (OpenCLIP)</td><td>0.541</td><td>0.166</td></tr>
    <tr><td>CLIP ViT-L/14 (OpenAI)</td><td>0.359</td><td>0.453</td></tr>
    <tr><td>CLIP ViT-L/14 (OpenCLIP)</td><td>0.343</td><td>0.562</td></tr>
    </tbody>
    </table>

    <p>
    Larger models are less entangled and more associated — heads learn properties independently and focus on single properties more consistently.
    </p>

    <hr/>

    <h3>2.3 Sun et al. (2024) — <em>CLIPer: Hierarchically Improving Spatial Representation of CLIP</em></h3>

    <p>
    <strong>Key idea.</strong> Early CLIP layers preserve spatial structure that the final layer discards.
    Fusing early-layer information enables training-free pixel-level segmentation.
    </p>

    <p>
    <strong>Key question.</strong> Existing training-free segmentation methods modify only the last layer's self-attention.
    But early-layer patch embeddings and attention maps retain much better spatial coherence — the last layer is the wrong place to intervene.
    </p>

    <p><strong>Method.</strong> Two components:</p>

    <p>
    <strong>1. Early-layer fusion.</strong> Average attention maps from all blocks up to the penultimate layer:
    </p>

    $$A_{\\text{avg}} = \\frac{1}{N} \\sum_{n=1}^{N-1} A^n$$

    <p>
    This replaces the last layer's self-attention. Output embeddings are compared with text embeddings via cosine similarity
    to produce a coarse segmentation.
    </p>

    <p>
    <strong>2. Fine-grained compensation.</strong> Self-attention maps from
    Stable Diffusion<span class="sidenote-ref"></span><span class="sidenote">Stable Diffusion's internal self-attention maps capture fine-grained spatial details (boundaries, textures) that complement CLIP's coarser attention.</span> are fused via matrix chain multiplication across heads:
    </p>

    $$A_f = A_m[0] \\times A_m[1] \\times \\cdots \\times A_m[H-1]$$

    <p>The fused map refines the coarse segmentation: $S_f = A_f \\times S_c$.</p>

    <p>
    <strong>Metrics and results.</strong>
    mIoU<span class="sidenote-ref"></span><span class="sidenote">mIoU (mean Intersection over Union) averages per-category IoU between predicted and ground-truth segmentations. Higher is better.</span> on
    PASCAL VOC<span class="sidenote-ref"></span><span class="sidenote">PASCAL VOC (Visual Object Classes) is a benchmark for object detection and semantic segmentation with 20 object categories.</span> with ViT-L:
    </p>

    <table>
    <thead>
    <tr><th>Method</th><th>VOC mIoU</th><th>Context mIoU</th><th>Object mIoU</th></tr>
    </thead>
    <tbody>
    <tr><td>SCLIP</td><td>43.5</td><td>22.3</td><td>25.0</td></tr>
    <tr><td>ClearCLIP</td><td>46.1</td><td>26.7</td><td>30.1</td></tr>
    <tr><td>ProxyCLIP</td><td>60.6</td><td>34.5</td><td>39.2</td></tr>
    <tr><td>CLIPer (early fusion only)</td><td>61.2</td><td>34.3</td><td>39.6</td></tr>
    <tr><td><strong>CLIPer (full)</strong></td><td><strong>69.8</strong></td><td><strong>38.0</strong></td><td><strong>43.3</strong></td></tr>
    </tbody>
    </table>

    <p>Early-layer fusion alone outperforms all prior last-layer-only methods.</p>

    <hr/>

    <h3>2.4 Darcet et al. (2024) — <em>Vision Transformers Need Registers</em> (ICLR 2024)</h3>

    <p>
    <strong>Key idea.</strong> ViTs repurpose low-information patch tokens to store global information, creating high-norm artifacts.
    Learnable "register" tokens absorb this behavior and produce cleaner feature maps.
    </p>

    <p>
    <strong>Key question.</strong> DINOv2 produces strong features for dense prediction, yet fails at unsupervised object discovery
    (LOST<span class="sidenote-ref"></span><span class="sidenote">LOST (Localizing Objects with Self-supervised Transformers) finds objects using only ViT feature and attention maps, without object labels.</span>) — where the earlier DINO excelled. The cause: ~2% of patch tokens develop
    abnormally high norms (~10× normal), appearing in uniform background regions and disrupting algorithms that rely on smooth feature maps.
    </p>

    <p>
    <strong>Method.</strong> Append $N$ learnable register tokens to the input sequence alongside [CLS]. They participate in self-attention
    during training and inference but are discarded at output. No new loss function — same training objective. The registers provide
    dedicated storage for global computations, so patch tokens stay clean.
    </p>

    <p>
    <strong>Metrics and results.</strong> Linear probing<span class="sidenote-ref"></span><span class="sidenote">Linear probing: freeze the pretrained model, extract features, train only a single linear classifier on top. High accuracy = features are already linearly separable.</span> across tasks:
    </p>

    <table>
    <thead>
    <tr><th>Metric</th><th>Without Registers</th><th>With Registers</th></tr>
    </thead>
    <tbody>
    <tr><td>ImageNet Top-1 (DINOv2)</td><td>84.3</td><td>84.8</td></tr>
    <tr><td>ADE20k<span class="sidenote-ref"></span> mIoU (DINOv2)</td><td>46.6</td><td>47.9</td></tr>
    <tr><td>NYUd RMSE<span class="sidenote-ref"></span> ↓ (DINOv2)</td><td>0.378</td><td>0.366</td></tr>
    <tr><td>VOC LOST corloc<span class="sidenote-ref"></span> (DINOv2)</td><td>35.3</td><td><strong>55.4</strong></td></tr>
    </tbody>
    </table>

    <span class="sidenote">ADE20k is a scene parsing benchmark with 150 semantic categories.</span>
    <span class="sidenote">RMSE (Root Mean Squared Error) measures depth estimation accuracy. Lower is better.</span>
    <span class="sidenote">corloc (Correct Localization) = percentage of images where predicted bounding box has ≥50% IoU with ground truth.</span>

    <p>
    No regression on standard benchmarks; +20.1 corloc on object discovery. Outlier tokens carry global information:
    linear probing on outlier patches yields 69.0% ImageNet accuracy vs. 65.8% for normal patches (approaching [CLS] at 86.0%).
    </p>

    <hr/>

    <h3>2.5 Lappe &amp; Giese (2025) — <em>Register and [CLS] Tokens Yield a Decoupling of Local and Global Features in Large ViTs</em></h3>

    <p>
    <strong>Key idea.</strong> In large ViTs, the global representation becomes dominated by register/[CLS] tokens rather than patch tokens.
    Clean attention maps no longer reflect how local information is actually integrated.
    </p>

    <p>
    <strong>Key question.</strong> The <em>patch integration assumption</em> holds that [CLS] aggregates patch information via attention,
    and attention maps reveal which patches matter most. Registers fix artifacts — but do the resulting clean maps tell the truth?
    </p>

    <p>
    <strong>Method.</strong> Decompose the [CLS] output into patch-token vs. register-token contributions, measured via
    <strong>linear Centered Kernel Alignment (CKA)</strong>:
    </p>

    $$\\text{CKA}(X, Y) = \\frac{\\text{tr}(XX^\\top Y Y^\\top)}{\\sqrt{\\text{tr}(XX^\\top XX^\\top) \\cdot \\text{tr}(Y Y^\\top Y Y^\\top)}}$$

    <p>
    where $X, Y \\in \\mathbb{R}^{n \\times d}$ are mean-centered activation matrices. CKA = 1.0 means identical information structure;
    lower values indicate divergence.
    </p>

    <p>
    <strong>Metrics and results.</strong> CKA across DINOv2 models (ViT-S through ViT-g) on
    MS COCO<span class="sidenote-ref"></span><span class="sidenote">MS COCO (Common Objects in Context) is a large-scale dataset with 80 object categories annotated with bounding boxes, segmentation masks, and captions.</span>:
    </p>

    <ul>
    <li><strong>Small models (ViT-S):</strong> Patch-based CKA ≈ 1.0 — [CLS] genuinely aggregates local features.</li>
    <li><strong>Large models (ViT-L, ViT-g):</strong> Patch-based CKA drops significantly; register-based CKA rises — global representation dominated by registers.</li>
    <li><strong>Without explicit registers:</strong> The [CLS] token itself causes similar decoupling in large models.</li>
    </ul>

    <p>
    For large ViTs, <strong>attention maps should be interpreted with caution</strong> — clean maps do not mean the model uses
    local patch evidence in the way they suggest.
    </p>

    <hr/>

    <h2>3. A Unified Picture: Layer-by-Layer in Vision Transformers</h2>

    <h3>CLIP</h3>

    <table>
    <thead>
    <tr><th>Layer Range</th><th>What It Encodes</th><th>Evidence</th></tr>
    </thead>
    <tbody>
    <tr><td><strong>Early</strong></td><td>Patch-level spatial structure, local appearance</td><td>CLIPer: early embeddings preserve spatial coherence</td></tr>
    <tr><td><strong>Middle</strong></td><td>Objects, parts, spatial relations</td><td>CLIPer: early-layer fusion boosts segmentation by 10+ mIoU; Skean et al.: mid-depth balances compression and signal</td></tr>
    <tr><td><strong>Late (pre-final)</strong></td><td>Specialized heads for colors, objects, locations, emotions</td><td>Madasu et al.: TEXTSPAN shows head specialization</td></tr>
    <tr><td><strong>Final (projected)</strong></td><td>Compressed global concept for image-text similarity</td><td>Poor at dense tasks without modification</td></tr>
    </tbody>
    </table>

    <h3>DINO / DINOv2</h3>

    <table>
    <thead>
    <tr><th>Layer Range</th><th>What It Encodes</th><th>Evidence</th></tr>
    </thead>
    <tbody>
    <tr><td><strong>Early</strong></td><td>Texture, edges, short-range geometry</td><td>Patch tokens reflect local appearance</td></tr>
    <tr><td><strong>Middle</strong></td><td>Parts, object regions, boundaries — "sweet spot" for dense tasks</td><td>Segmentation emerges; entropy valley in autoregressive models</td></tr>
    <tr><td><strong>Late patch tokens</strong></td><td>More semantic, but some patches repurposed for global storage</td><td>Darcet et al.: outliers emerge ~layer 15/40</td></tr>
    <tr><td><strong>[CLS] / Registers</strong></td><td>Image-level summary, decoupled from local evidence in large models</td><td>Lappe &amp; Giese: CKA drops for large models</td></tr>
    </tbody>
    </table>

    <h3>The Training Objective Matters Most</h3>

    <p>The <strong>training objective, not data modality</strong>, determines the layer-wise profile (Skean et al.):</p>

    <ul>
    <li><strong>Autoregressive</strong> (AIM, GPT-style): pronounced mid-layer entropy valley — intermediate layers most clearly beat the final layer.</li>
    <li><strong>Non-autoregressive</strong> (CLIP, DINO, MAE, supervised ViT): more gradual feature building; final layers often best for classification, but intermediate layers competitive or superior for dense tasks.</li>
    </ul>

    <hr/>

    <h2>4. Practical Implications</h2>

    <p><strong>For dense prediction:</strong> Don't use the final layer. CLIPer's early-layer fusion improves segmentation by 10+ mIoU. For DINOv2, middle-layer patch tokens are often the best dense features.</p>

    <p><strong>For interpretability:</strong> Attention maps in large ViTs can be misleading. Clean maps (from registers) do not mean the model aggregates local information as the maps suggest — the global representation may be dominated by [CLS]/register pathways.</p>

    <p><strong>For feature extraction:</strong> Extract from intermediate layers. Skean et al.'s unsupervised metrics (DiME, curvature) can identify the best layer without task-specific labels.</p>

    <p><strong>For model design:</strong> Register tokens improve dense prediction but introduce structural decoupling between local and global representations.</p>

    <hr/>

    <h2>References</h2>

    <ol>
    <li>Caron, M., Touvron, H., Misra, I., Jegou, H., Mairal, J., Bojanowski, P., &amp; Joulin, A. (2021). Emerging Properties in Self-Supervised Vision Transformers. <em>arXiv:2104.14294</em>. <a href="http://arxiv.org/abs/2104.14294">Paper</a></li>
    <li>Darcet, T., Oquab, M., Mairal, J., &amp; Bojanowski, P. (2024). Vision Transformers Need Registers. <em>ICLR 2024</em>. <a href="http://arxiv.org/abs/2309.16588">Paper</a></li>
    <li>Lappe, A. &amp; Giese, M. A. (2025). Register and [CLS] Tokens Yield a Decoupling of Local and Global Features in Large ViTs. <em>arXiv:2505.05892</em>. <a href="http://arxiv.org/abs/2505.05892">Paper</a></li>
    <li>Madasu, A., Gandelsman, Y., Lal, V., &amp; Howard, P. (2024). Quantifying and Enabling the Interpretability of CLIP-like Models. <em>arXiv:2409.06579</em>. <a href="http://arxiv.org/abs/2409.06579">Paper</a></li>
    <li>Skean, O., Arefin, M. R., Zhao, D., Patel, N., Naghiyev, J., LeCun, Y., &amp; Shwartz-Ziv, R. (2025). Layer by Layer: Uncovering Hidden Representations in Language Models. <em>ICML 2025</em>. <a href="http://arxiv.org/abs/2502.02013">Paper</a></li>
    <li>Sun, L., Cao, J., Xie, J., Jiang, X., &amp; Pang, Y. (2024). CLIPer: Hierarchically Improving Spatial Representation of CLIP for Open-Vocabulary Semantic Segmentation. <em>arXiv:2411.13836</em>. <a href="http://arxiv.org/abs/2411.13836">Paper</a></li>
    </ol>


    `,
};
