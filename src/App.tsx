import React, { useState, useMemo, useEffect } from 'react';
import { MathJaxContext, MathJax } from 'better-react-mathjax';
import { Search, ChevronLeft, Github, Twitter, Linkedin, Hash, GraduationCap } from 'lucide-react';
import { type BlogPost } from './types';
import { BLOG_POSTS } from './data/blogPosts';
import { config } from './MathJaxConfig';
import About from './PersonalWebsite';
import { SITE_CONFIG } from './PersonalWebsite';

/**
 * ==================================================================================
 * 📝 TYPES & INTERFACES
 * ==================================================================================
 */



type ViewType = 'about' | 'post' | 'archive' | 'search' | 'tags';

interface ViewState {
  type: ViewType;
  postId: string | null;
  tag: string | null;
}

interface SocialLink {
  name: string;
  // using React.ElementType avoids importing specific Types that might crash the bundler
  icon: React.ElementType;
  url: string;
}

// Props shared across multiple components
interface ViewProps {
  setView: React.Dispatch<React.SetStateAction<ViewState>>;
}

interface DataProps extends ViewProps {
  posts: BlogPost[];
}

/**
 * ==================================================================================
 * 📝 CONTENT DATABASE
 * ==================================================================================
 */


const SOCIAL_LINKS: SocialLink[] = [
  { name: 'Github', icon: Github, url: SITE_CONFIG.githubUrl },
  // { name: 'Twitter', icon: Twitter, url: 'https://twitter.com' },
  { name: 'LinkedIn', icon: Linkedin, url: SITE_CONFIG.linkedinUrl },
  { name: 'Scholar', icon: GraduationCap, url: SITE_CONFIG.scholarUrl },
];

/**
 * ==================================================================================
 * 🧩 COMPONENTS
 * ==================================================================================
 */

const Layout: React.FC<React.PropsWithChildren<ViewProps & { currentView: ViewType }>> = ({ children, setView, currentView }) => (
  <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-rose-200 selection:text-rose-900">
    <div className="max-w-3xl mx-auto px-6 py-12 flex flex-col min-h-screen">

      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-baseline mb-16 border-b border-stone-200 pb-8">
        <div
          onClick={() => setView({ type: 'about', postId: null, tag: null })}
          className="cursor-pointer group"
        >
          <h1 className="text-3xl font-serif font-bold tracking-tight text-stone-900 group-hover:text-rose-600 transition-colors">
            Haitong Ma
          </h1>
          <p className="text-stone-500 mt-1 text-sm font-medium">PhD Student @ Harvard SEAS</p>
        </div>

        <nav className="flex gap-6 mt-4 md:mt-0 text-sm font-semibold tracking-wide uppercase text-stone-500">
          <button
            onClick={() => setView({ type: 'about', postId: null, tag: null })}
            className={`hover:text-rose-600 transition-colors pb-1 border-b-2 ${currentView === 'about' ? 'border-rose-600 text-rose-600' : 'border-transparent'}`}
          >
            About
          </button>
          {(['Posts', 'Archive', 'Search', 'Tags'] as const).map((item) => (
            <button
              key={item}
              onClick={() => setView({ type: item.toLowerCase() as ViewType, postId: null, tag: null })}
              className="hover:text-rose-600 transition-colors pb-1 border-b-2 border-transparent hover:border-rose-600"
            >
              {item}
            </button>
          ))}
        </nav>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-grow animate-fade-in">
        {children}
      </main>

      {/* FOOTER */}
      <footer className="mt-24 pt-8 border-t border-stone-200 flex justify-between items-center text-stone-400 text-sm">
        <div>© {new Date().getFullYear()} Haitong Ma</div>
        <div className="flex gap-4">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-rose-600 transition-colors"
            >
              <link.icon size={18} />
            </a>
          ))}
        </div>
      </footer>
    </div>
  </div>
);

const PostList: React.FC<DataProps> = ({ posts, setView }) => (
  <div className="space-y-12">
    {posts.map(post => (
      <article key={post.id} className="group">
        <div className="flex items-baseline justify-between mb-2">
          <h2
            onClick={() => setView({ type: 'post', postId: post.id, tag: null })}
            className="text-2xl font-serif font-bold text-stone-900 cursor-pointer group-hover:text-rose-600 transition-colors"
          >
            {post.title}
          </h2>
          <span className="text-stone-400 text-sm font-mono shrink-0 ml-4 hidden sm:inline-block">
            {post.date}
          </span>
        </div>
        <p className="text-stone-600 leading-relaxed mb-3">
          {post.summary}
        </p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setView({ type: 'post', postId: post.id, tag: null })}
            className="text-rose-600 text-sm font-bold hover:underline"
          >
            Read more
          </button>
          <div className="flex gap-2">
            {post.tags.map(tag => (
              <span
                key={tag}
                onClick={(e) => {
                  e.stopPropagation();
                  setView({ type: 'tags', tag, postId: null });
                }}
                className="text-xs bg-stone-100 text-stone-500 px-2 py-1 rounded cursor-pointer hover:bg-stone-200"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    ))}
  </div>
);

interface PostDetailProps extends ViewProps {
  post?: BlogPost;
}

const PostDetail: React.FC<PostDetailProps> = ({ post, setView }) => {
  // // Effect to re-run MathJax when the post changes
  // useEffect(() => {
  //   if ((window as any).MathJax) {
  //     // Small timeout ensures DOM is ready
  //     setTimeout(() => {
  //       (window as any).MathJax.typesetPromise?.();
  //     }, 0);
  //   }
  // }, [post]);

  if (!post) return <div>Post not found</div>;

  return (
    <article className="animate-slide-up">
      <button
        onClick={() => setView({ type: 'home', postId: null, tag: null })}
        className="text-stone-400 hover:text-stone-900 mb-8 flex items-center gap-1 text-sm font-medium transition-colors"
      >
        <ChevronLeft size={16} /> Back to posts
      </button>

      <header className="mb-10 text-center">
        <div className="text-stone-400 font-mono text-sm mb-3">{post.date}</div>
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-6 leading-tight">
          {post.title}
        </h1>
        <div className="flex justify-center gap-2">
          {post.tags.map(tag => (
            <span
              key={tag}
              onClick={() => setView({ type: 'tags', tag, postId: null })}
              className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full cursor-pointer hover:bg-rose-100"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* This div renders the HTML content safely. */}
      <MathJax>
        <div
          className="prose prose-stone prose-lg mx-auto text-stone-700 leading-8 font-sans
                    prose-headings:font-serif prose-headings:font-bold prose-headings:text-stone-900
                    prose-a:text-rose-600 prose-a:no-underline hover:prose-a:underline
                    prose-blockquote:border-l-rose-500 prose-blockquote:bg-stone-100 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:italic
                    "
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </MathJax>

      <div className="mt-16 pt-8 border-t border-stone-200">
        <p className="text-stone-500 italic text-center">
          Thanks for reading. <br />
          <span
            onClick={() => setView({ type: 'home', postId: null, tag: null })}
            className="text-rose-600 cursor-pointer not-italic hover:underline font-semibold"
          >
            Read more posts
          </span>
        </p>
      </div>
    </article>
  );
};

const Archive: React.FC<DataProps> = ({ posts, setView }) => {
  // Group posts by year
  const postsByYear = useMemo(() => {
    const groups: Record<string, BlogPost[]> = {};
    posts.forEach(post => {
      const year = post.date.split('-')[0];
      if (!groups[year]) groups[year] = [];
      groups[year].push(post);
    });
    // Sort years descending
    return Object.keys(groups).sort((a, b) => Number(b) - Number(a)).map(year => ({
      year,
      posts: groups[year]
    }));
  }, [posts]);

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-serif font-bold text-stone-900 mb-10 pb-4 border-b border-stone-200">Archive</h2>
      <div className="space-y-10">
        {postsByYear.map(group => (
          <div key={group.year} className="relative pl-8 border-l border-stone-200">
            <span className="absolute -left-3 top-0 bg-stone-50 text-stone-400 font-bold font-mono py-1">
              {group.year}
            </span>
            <ul className="space-y-4 pt-1">
              {group.posts.map(post => (
                <li key={post.id} className="flex flex-col sm:flex-row sm:items-baseline justify-between group">
                  <span
                    onClick={() => setView({ type: 'post', postId: post.id, tag: null })}
                    className="text-lg text-stone-800 cursor-pointer hover:text-rose-600 hover:underline transition-colors"
                  >
                    {post.title}
                  </span>
                  <span className="text-stone-400 text-sm font-mono shrink-0 sm:ml-4">
                    {post.date.substring(5)} {/* Shows MM-DD */}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

const SearchPage: React.FC<DataProps> = ({ posts, setView }) => {
  const [query, setQuery] = useState('');

  const filteredPosts = useMemo(() => {
    if (!query) return [];
    const lowerQ = query.toLowerCase();
    return posts.filter(post =>
      post.title.toLowerCase().includes(lowerQ) ||
      post.summary.toLowerCase().includes(lowerQ) ||
      post.tags.some(t => t.toLowerCase().includes(lowerQ))
    );
  }, [query, posts]);

  return (
    <div className="max-w-2xl mx-auto min-h-[50vh]">
      <div className="relative mb-12">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400" size={20} />
        <input
          type="text"
          placeholder="Search titles, tags, content..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
          className="w-full pl-12 pr-4 py-4 bg-white border-2 border-stone-200 rounded-xl text-lg focus:outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-50 transition-all placeholder:text-stone-300"
        />
      </div>

      {query && (
        <div className="space-y-8 animate-fade-in">
          {filteredPosts.length === 0 ? (
            <p className="text-center text-stone-400 mt-12">No posts found for "{query}"</p>
          ) : (
            filteredPosts.map(post => (
              <div key={post.id} className="pb-6 border-b border-stone-100 last:border-0">
                <h3
                  onClick={() => setView({ type: 'post', postId: post.id, tag: null })}
                  className="text-xl font-bold text-stone-800 cursor-pointer hover:text-rose-600 mb-2"
                >
                  {post.title}
                </h3>
                <p className="text-stone-500 text-sm mb-2">{post.summary}</p>
                <div className="flex gap-2">
                  {post.tags.map(tag => (
                    <span key={tag} className="text-xs text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded">#{tag}</span>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

interface TagsProps extends DataProps {
  initialTag: string | null;
}

const Tags: React.FC<TagsProps> = ({ posts, setView, initialTag }) => {
  const [activeTag, setActiveTag] = useState<string | null>(initialTag || null);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set<string>();
    posts.forEach(post => post.tags.forEach(t => tags.add(t)));
    return Array.from(tags).sort();
  }, [posts]);

  const filteredPosts = useMemo(() => {
    if (!activeTag) return posts;
    return posts.filter(post => post.tags.includes(activeTag));
  }, [posts, activeTag]);

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-3xl font-serif font-bold text-stone-900 mb-8 flex items-center gap-3">
        <Hash className="text-rose-600" /> Tags
      </h2>

      {/* Cloud */}
      <div className="flex flex-wrap gap-3 mb-12">
        <button
          onClick={() => setActiveTag(null)}
          className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${!activeTag
            ? 'bg-stone-800 text-white shadow-lg'
            : 'bg-stone-100 text-stone-500 hover:bg-stone-200'
            }`}
        >
          All
        </button>
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${activeTag === tag
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-200'
              : 'bg-white border border-stone-200 text-stone-600 hover:border-rose-400 hover:text-rose-600'
              }`}
          >
            {tag} <span className="ml-1 opacity-60 text-xs font-normal">
              ({posts.filter(p => p.tags.includes(tag)).length})
            </span>
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-8 animate-fade-in">
        <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-6">
          {activeTag ? `Posts tagged "${activeTag}"` : 'All Posts'}
        </h3>
        {filteredPosts.map(post => (
          <article key={post.id} className="flex flex-col sm:flex-row gap-2 sm:gap-8 group cursor-pointer" onClick={() => setView({ type: 'post', postId: post.id, tag: null })}>
            <span className="text-stone-400 font-mono text-sm whitespace-nowrap pt-1">{post.date}</span>
            <div>
              <h4 className="text-lg font-bold text-stone-800 group-hover:text-rose-600 transition-colors">
                {post.title}
              </h4>
              <div className="flex gap-2 mt-2">
                {post.tags.map(t => (
                  <span key={t} className={`text-xs px-1.5 rounded ${t === activeTag ? 'bg-rose-100 text-rose-700' : 'bg-stone-100 text-stone-400'}`}>#{t}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

/**
 * ==================================================================================
 * 🚀 MAIN APP COMPONENT
 * ==================================================================================
 */
export default function App() {
  // Navigation State
  const [viewState, setViewState] = useState<ViewState>({ type: 'about', postId: null, tag: null });

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [viewState]);

  // useEffect(() => {
  //   if (!document.querySelector('#mathjax-script')) {
  //     const script = document.createElement('script');
  //     script.id = 'mathjax-script';
  //     script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
  //     script.async = true;
  //     document.head.appendChild(script);
  //   }
  // }, []);

  // Debug: verify app is running
  useEffect(() => {
    console.log("App Mounted successfully");
  }, []);

  const renderContent = () => {
    switch (viewState.type) {
      case 'about':
        return <About />;
      case 'post':
        const post = BLOG_POSTS.find(p => p.id === viewState.postId);
        return <PostDetail post={post} setView={setViewState} />;
      case 'archive':
        return <Archive posts={BLOG_POSTS} setView={setViewState} />;
      case 'search':
        return <SearchPage posts={BLOG_POSTS} setView={setViewState} />;
      case 'tags':
        return <Tags posts={BLOG_POSTS} setView={setViewState} initialTag={viewState.tag} />;
      default:
        return <PostList posts={BLOG_POSTS} setView={setViewState} />;
    }
  };

  return (
    <MathJaxContext config={config}>
      <Layout setView={setViewState}>
        {renderContent()}
      </Layout>
    </MathJaxContext>
  );
}