import { type BlogPost } from '../types';
import { futureOfAi } from './posts/future-of-ai';
import { minimalistWebDesign } from './posts/minimalist-web-design';
import { yearReview2023 } from './posts/2023-year-review';
import { reactRendering } from './posts/react-rendering';
import { skillLearning } from './posts/skill-learning';
import { diffusionRL } from './posts/diffusion';
import { vla } from './posts/vla';

export const BLOG_POSTS: BlogPost[] = [
    futureOfAi,
    minimalistWebDesign,
    yearReview2023,
    reactRendering,
    skillLearning,
    diffusionRL,
    vla
];
