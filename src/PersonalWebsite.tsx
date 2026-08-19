import React from 'react';
import { Mail, FileText, ExternalLink, GraduationCap, Linkedin, Github } from 'lucide-react';
import haitongImg from './assets/haitong.jpg';
import speedCombined from './assets/speed_combined.gif'
import hoverGif from './assets/titleimg_hover.gif'
import reprIlGif from './assets/titleimg_repr_il.gif'
import rcrlImg from './assets/rcrl.jpg'
import discreteDiffusionImg from './assets/discrete_diffusion.png'
import rsmImg from './assets/rsm_demo.png'
import jointImg from './assets/joint.png'
import recordImg from './assets/record.png'
import simpoImg from './assets/simpo-1.png'

/**
 * ==================================================================================
 * ⚙️ CONFIGURATION & DATA
 * ==================================================================================
 */

export const SITE_CONFIG = {
    name: "Haitong Ma (马海铜)",
    title: "Haitong Ma",
    subtitle: "PhD Student @ Harvard SEAS",
    email: "haitongma@g.harvard.edu",
    scholarUrl: "https://scholar.google.com/citations?user=Hr6z0g4AAAAJ&hl=en",
    githubUrl: "https://github.com/mahaitongdae",
    cvUrl: "data/cv_haitong_20251031.pdf",
    linkedinUrl: "https://www.linkedin.com/in/haitong-ma-bb9090144/"
};

interface PublicationItem {
    title: string;
    authors: string | React.ReactNode;
    venue: string | React.ReactNode;
    links: { name: string; url: string }[];
    image?: string;
    description?: string | React.ReactNode;
}

interface PublicationCategory {
    category: string;
    items: PublicationItem[];
}

const NEWS_ITEMS = [
    { date: "06/2026", content: "I started to work as a student researcher at Google DeepMind!" },
    { date: "05/2026", content: "Our paper <a href='https://arxiv.org/abs/2509.22963' class='text-rose-600 font-bold hover:underline'>Reinforcement Learning with Discrete Diffusion Policies for Combinatorial Action Spaces</a> has been accepted to ICML 2026. Congratulations to all coauthors!" },
    { date: "04/2026", content: "I started a blog! My first post surveys five recent papers on <a href='#/post/layer-wise-analysis-visual-foundation-models' class='text-rose-600 font-bold hover:underline'>layer-wise analysis of visual foundation models</a> (CLIP, DINO, DINOv2) — check out the <span class='text-rose-600 font-bold'>Posts</span> section!" },
    { date: "03/2026", content: "Our new preprint <a href='https://arxiv.org/abs/2603.10250' class='text-rose-600 font-bold hover:underline'>SiMPO: Measure Matching for Online Diffusion Reinforcement Learning</a> was published on arxiv!" },
    { date: "10/2025", content: "My internship project at Google Research, <a href='https://arxiv.org/abs/2509.22963' class='text-rose-600 font-bold hover:underline'>Reinforcement Learning with Discrete Diffusion Policies for Combinatorial Action Spaces</a>, appeared on arXiv (now accepted to ICML 2026)." },
    // { date: "10/2025", content: "Our new preprints <a href='https://arxiv.org/pdf/2507.23675' class='text-rose-600 font-bold hover:underline'>One-step Flow Policy Mirror Descent</a> was published on arxiv!" },
    { date: "06/2025", content: "Our paper on <a href='https://arxiv.org/pdf/2502.00361' class='text-rose-600 font-bold hover:underline'>Efficient Online Reinforcement Learning for Diffusion Policy</a> has been accepted to ICML 2025. Congratulations to all coauthors!" },
    { date: "06/2025", content: "Our paper on <a href='https://arxiv.org/abs/2205.07536' class='text-rose-600 font-bold hover:underline'>Offline Imitation Learning upon Arbitrary Demonstrations by Pre-Training Dynamics Representations</a> has been accepted to IROS 2025. Congratulations to all coauthors!" },
    { date: "06/2024", content: "New paper on sim-to-real transfer learning was accepted at IROS 2024 as an oral presentation! Check out the <a href='https://congharvard.github.io/steady-sim-to-real/'>project website</a> for details!" },
    { date: "06/2022", content: "One paper was nominated the <a href='https://arxiv.org/pdf/2111.07695' class='text-rose-600 font-bold hover:underline'>Best Paper Award Finalists</a> at L4DC 2022. Congratulations to all coauthors!" }
];

const PUBLICATIONS: PublicationCategory[] = [
    {
        category: "Preprints",
        items: [
            {
                title: "GeMPO: Measure Matching for Online Diffusion Reinforcement Learning",
                authors: <span><strong>Haitong Ma*</strong>, Chenxiao Gao*, Tianyi Chen, Na Li, Bo Dai</span>,
                venue: "In submission",
                links: [{ name: "ArXiv", url: "https://arxiv.org/abs/2603.10250" }],
                image: simpoImg,
                description: "We introduce a unified framework that generalizes reweighting schemes in diffusion RL, enabling principled negative reweighting that actively repels policies from suboptimal actions."
            },
            {
                title: "One-Step Flow Policy Mirror Descent",
                authors: "",
                venue: "In submission",
                links: [{ name: "ArXiv", url: "https://arxiv.org/pdf/2507.23675" }],
                description: "We leveraged rectified flow and mean flow to simplify and make diffusion policy training more efficient, down to only 1 NFE during policy inference."
            },
            {
                title: "One Policy to Push Them All: Reinforcement Learning with Diffusion Policy for Multi-Task Contact-Rich Manipulation",
                authors: "",
                venue: "In submission",
                links: [{ name: "Project Website", url: "https://diffusionpolicyrl.site/" }],
                image: speedCombined,
                description: "We introduce a reinforcement learning (RL) framework to train a single diffusion policy for multiple contact-rich block-pushing tasks, achieveing robust sim-to-real transfer without reliance on expert data."
            },
        ]
    },
    {
        category: "Conference Papers",
        items: [
            {
                title: "Reinforcement Learning with Discrete Diffusion Policies for Combinatorial Action Spaces",
                authors: <span><strong>Haitong Ma*</strong>, Ofir Nabati*, Aviv Rosenberg, Bo Dai, Oran Lang, Idan Szpektor, Craig Boutilier, Na Li, Shie Mannor, Lior Shani, Guy Tenneholtz</span>,
                venue: "ICML 2026",
                links: [{ name: "ArXiv", url: "https://arxiv.org/abs/2509.22963" }],
                image: discreteDiffusionImg,
                description: "We analyze different reinforcement learning (RL) algorithms for discrete diffusion policies in combinatorial action spaces, with applications to DNA generations and long-horizon decision making in Atari games."
            },
            {
                title: "Offline Imitation Learning upon Arbitrary Demonstrations by Pre-Training Dynamics Representations",
                authors: <span><strong>Haitong Ma</strong>, Bo Dai, Zhaolin Ren, Yebin Wang, Na Li</span>,
                venue: "IROS 2025",
                links: [
                    { name: "ArXiv", url: "https://arxiv.org/abs/2205.07536" },
                    { name: "Project Website", url: "https://congharvard.github.io/repr-imitation-learning/" }
                ],
                image: reprIlGif,
                description: "We pre-train dynamics representations to improve the imitation learning performance when expert data is very limited."
            },
            {
                title: "Efficient Online Reinforcement Learning for Diffusion Policy",
                authors: <span><strong>Haitong Ma</strong>, Tianyi Chen, Kai Wang, Na Li*, Bo Dai*</span>,
                venue: "ICML 2025",
                links: [
                    { name: "ArXiv", url: "https://arxiv.org/pdf/2502.00361" },
                    { name: "Code", url: "https://github.com/mahaitongdae/diffusion_policy_online_rl" }
                ],
                image: rsmImg,
                description: <span>We proposed <strong>reweighted score matching</strong>, a generalization of reward-weighted regression
                    to train diffusion policies for online reinforcement learning.  </span>
            },
            {
                title: "Skills Transfer and Discovery for Sim-to-Real Learning: A Representation-Based Viewpoint",
                authors: <span><strong>Haitong Ma*</strong>, Zhaolin Ren, Bo Dai, Na Li</span>,
                venue: <span>IROS 2024 <span className="text-rose-600 font-bold">(Oral Presentation)</span></span>,
                links: [
                    { name: "ArXiv", url: "https://arxiv.org/pdf/2404.05051" },
                    { name: "Project Website", url: "https://congharvard.github.io/steady-sim-to-real/" }
                ],
                image: hoverGif,
                description: "We regard sim-to-real transfer learning as learning the residual space of simulator dynamics representations."
            },
            {
                title: "Reachability Constrained Reinforcement Learning",
                authors: <span>Dongjie Yu*, <strong>Haitong Ma*</strong>, Shengbo Eben Li, Jianyu Chen</span>,
                venue: <span>ICML 2022 <span className="text-rose-600 font-bold">(Spotlight)</span></span>,
                links: [
                    { name: "ArXiv", url: "https://arxiv.org/abs/2205.07536" },
                    { name: "Code", url: "https://github.com/mahaitongdae/Reachability_Constrained_RL" }
                ],
                image: rcrlImg,
                description: "We use reachability analysis to identify feasible sets and learn optimal safe policies using constrained RL."
            },
            {
                title: "Joint Synthesis of Safety Certificate and Safe Control Policy Using Constrained Reinforcement Learning",
                authors: <span><strong>Haitong Ma</strong>, Chanlgiu Liu, Shengbo Eben Li, Sifa Zheng, Jianyu Chen</span>,
                venue: <span>L4DC 2022 <span className="text-rose-600 font-bold">(Oral Presentation, Best Paper Award Finalists, 3/176)</span></span>,
                links: [
                    { name: "ArXiv", url: "https://arxiv.org/abs/2111.07695" },
                    { name: "Video", url: "https://www.youtube.com/watch?v=DZkiF9Nsjmw" }
                ],
                image: jointImg,
                description: "We use adversarial optimization to jointly learn safety certificates and safe control policies in a purely model-free manner."
            },
            {
                title: "Model-based Constrained Reinforcement Learning using Generalized Control Barrier Function",
                authors: <span><strong>Haitong Ma</strong>, Jianyu Chen, Shengbo Eben Li, Ziyu Lin, Yang Guan, Yangang Ren, Sifa Zheng.</span>,
                venue: <span>IROS 2021 <span className="text-rose-600 font-bold"></span></span>,
                links: [
                    { name: "ArXiv", url: "https://arxiv.org/pdf/2103.01556" },
                    { name: "Video", url: "https://www.bilibili.com/video/BV1mi4y1T7qC/?spm_id_from=333.1387.homepage.video_card.click&vd_source=b5055853da3e3de8d575367e8ed39fec" }
                ],
                image: recordImg,
                description: "We train end-to-end contorl policy with safety contraint using CBF and implement it on a real autonomous vehicle."
            },

        ]
    },
    {
        category: "Journal Papers",
        items: [
            {
                title: "Stochastic Nonlinear Control via Finite-dimensional Spectral Dynamic Embedding",
                authors: <span>Tongzheng Ren*, Zhaolin Ren*, <strong>Haitong Ma</strong>, Na Li, Bo Dai</span>,
                venue: "IEEE Transactions on Automatic Control (TAC), 2025",
                links: []
            },
            {
                title: "Learn Zero-Constraint-Violation Policy in Model-Free Constrained Reinforcement Learning",
                authors: <span><strong>Haitong Ma</strong>, Chanlgiu Liu, Shengbo Eben Li, Sifa Zheng, Wenchao Sun, Jianyu Chen</span>,
                venue: "IEEE Transactions on Neural Networks and Learning Systems (TNNLS), 2023",
                links: [{ name: "Paper", url: "https://ieeexplore.ieee.org/abstract/document/9760270" }]
            },
            {
                title: "Integrated Decision and Control: Toward Interpretable and Computationally Efficient Driving Intelligence",
                authors: <span>Yang Guan*, Yangang Ren*, Qi Sun, Shengbo Eben Li, <strong>Haitong Ma</strong>, Jingliang Duan, Yifan Dai, Bo Cheng</span>,
                venue: "IEEE Transactions on Cybernetics, 2022",
                links: [{ name: "Paper", url: "https://ieeexplore.ieee.org/abstract/document/9760270" }]
            }
        ]
    }
];

// --- COMPONENT ---

const About: React.FC = () => {
    return (
        <div className="space-y-16 animate-fade-in">

            {/* BIO SECTION */}
            <section className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1 space-y-4 text-stone-700 leading-relaxed">
                    <h2 className="text-2xl font-serif font-bold text-stone-900">Hello, I'm {SITE_CONFIG.name}.</h2>
                    <p>
                        I am a fourth-year PhD student at Harvard SEAS advised by <a href="https://nali.seas.harvard.edu/" className="text-rose-600 hover:underline">Prof. Na Li</a>.
                        I am also a student researcher at <a href="https://deepmind.google/" className="text-rose-600 hover:underline">Google DeepMind</a>.
                    </p>
                    <p>
                        My research interest lies in the intersection of <strong>control theory</strong> and <strong>machine learning</strong>, with applications to robotics and generative AI.
                        Currently, I am working on
                    </p>
                    <ul className="list-disc list-inside">
                        <li>Efficient approaches of post-training generative models using reinforcement learning (RL). </li>
                        <li>Learning generalizable and transferable representations for sequential decision making problems.</li>
                    </ul>
                    <p>
                        I received my Master degree and Bachelor degree, both from Tsinghua University, in 2022 and 2019.
                    </p>

                    <div className="pt-4 flex flex-wrap gap-4 text-sm font-semibold text-stone-600">
                        <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-1 hover:text-rose-600"><Mail size={16} /> Email</a>
                        <span className="text-stone-300">/</span>
                        <a href={SITE_CONFIG.linkedinUrl} className="flex items-center gap-1 hover:text-rose-600"><Linkedin size={16} /> LinkedIn</a>
                        <span className="text-stone-300">/</span>
                        <a href={SITE_CONFIG.scholarUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-rose-600"><GraduationCap size={16} /> Scholar</a>
                        <span className="text-stone-300">/</span>
                        <a href={SITE_CONFIG.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-rose-600"><Github size={16} /> Github</a>
                    </div>
                </div>

                {/* PHOTO */}
                <div className="w-full md:w-64 shrink-0">
                    <div className="aspect-[4/5] bg-stone-200 rounded-lg overflow-hidden relative shadow-md">
                        {/* Fallback styling in case image is missing */}
                        <div className="absolute inset-0 flex items-center justify-center text-stone-400 bg-stone-100">
                            <span className="text-xs">assets/haitong.jpg</span>
                        </div>
                        <img
                            src={haitongImg}
                            alt="Haitong Ma"
                            className="absolute inset-0 w-full h-full object-cover"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                    </div>
                </div>
            </section>

            {/* NEWS SECTION */}
            <section>
                <h3 className="text-xl font-serif font-bold text-stone-900 border-b border-stone-200 pb-2 mb-6">News</h3>
                <div className="space-y-4">
                    {NEWS_ITEMS.slice(0, 3).map((news, idx) => (
                        <div key={idx} className="flex gap-4 text-stone-700">
                            <span className="font-mono text-sm text-stone-400 shrink-0 w-20 pt-0.5">{news.date}</span>
                            <div className="text-base" dangerouslySetInnerHTML={{ __html: news.content }} />
                        </div>
                    ))}
                </div>
            </section>

            {/* PUBLICATIONS SECTION */}
            <section>
                <h3 className="text-xl font-serif font-bold text-stone-900 border-b border-stone-200 pb-2 mb-8">Selected Publications</h3>
                <div className="space-y-12">
                    {PUBLICATIONS.map((section, sIdx) => (
                        <div key={sIdx}>
                            <h4 className="text-lg font-bold text-stone-800 mb-6 uppercase tracking-wider text-sm">{section.category}</h4>
                            <div className="space-y-8">
                                {section.items.map((pub, pIdx) => (
                                    <div key={pIdx} className="flex flex-col sm:flex-row gap-6 group">
                                        {/* Pub Image - Only show if it exists */}
                                        {pub.image && (
                                            <div className="w-full sm:w-48 shrink-0">
                                                <div className="bg-stone-100 rounded border border-stone-100 overflow-hidden relative">
                                                    <img
                                                        src={pub.image}
                                                        alt={pub.title}
                                                        className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                                                        onError={(e) => { e.currentTarget.parentElement!.style.display = 'none'; }}
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex-1">
                                            <h5 className="font-bold text-stone-900 text-lg leading-snug group-hover:text-rose-600 transition-colors">
                                                {pub.links && pub.links.length > 0 ? (
                                                    <a href={pub.links[0].url} target="_blank" rel="noreferrer">{pub.title}</a>
                                                ) : pub.title}
                                            </h5>
                                            <p className="text-stone-600 mt-1 text-sm">{pub.authors}</p>
                                            <p className="text-stone-900 text-sm italic mt-1">{pub.venue}</p>

                                            {pub.description && (
                                                <p className="text-stone-600 mt-2 text-sm leading-relaxed">{pub.description}</p>
                                            )}

                                            {/* Links */}
                                            {pub.links && pub.links.length > 0 && (
                                                <div className="flex gap-3 mt-3 text-sm font-semibold">
                                                    {pub.links.map((link, lIdx) => (
                                                        <a
                                                            key={lIdx}
                                                            href={link.url}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="text-rose-600 hover:underline flex items-center gap-1"
                                                        >
                                                            {link.name} <ExternalLink size={12} />
                                                        </a>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
};

export default About;