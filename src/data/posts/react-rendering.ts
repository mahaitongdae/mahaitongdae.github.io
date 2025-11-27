import { type BlogPost } from '../../types';

export const reactRendering: BlogPost = {
    id: 'react-rendering',
    title: 'Understanding React Rendering',
    date: '2023-08-10',
    tags: ['Tech', 'React', 'Code'],
    summary: 'A deep dive into how React decides when to update the DOM.',
    content: `
    <p>React's rendering model is based on the concept of immutability and referential equality.</p>
    <pre style="background: #f5f5f4; padding: 1rem; border-radius: 0.5rem; overflow-x: auto;"><code>const Component = () => {
return <div>Rendered!</div>
}</code></pre>
    <p>When state changes, React compares the new Virtual DOM tree with the old one and computes the minimal set of changes required.</p>
  `
};
