import React, { useMemo, useEffect, useCallback } from 'react';
import { MathJaxContext, MathJax } from 'better-react-mathjax';
import { Routes, Route, useNavigate, useParams, useSearchParams, useLocation } from 'react-router-dom';
import { Search, ChevronLeft, Github, Linkedin, Hash, GraduationCap } from 'lucide-react';
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

interface SocialLink {
  name: string;
  icon: React.ElementType;
  url: string;
}

interface NavigateProps {
  navigate: (path: string) => void;
}

interface DataProps extends NavigateProps {
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

const Layout: React.FC<React.PropsWithChildren<{ navigate: (path: string) => void; currentView: ViewType }>> = ({ children, navigate, currentView }) => (
  <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-rose-200 selection:text-rose-900">
    <div className={`${currentView === 'post' ? 'max-w-5xl' : 'max-w-3xl'} mx-auto px-6 py-12 flex flex-col min-h-screen`}>

      {/* HEADER */}
      <header className="flex flex-col md:flex-row justify-between items-baseline mb-16 border-b border-stone-200 pb-8">
        <div
          onClick={() => navigate('/')}
          className="cursor-pointer group"
        >
          <h1 className="text-3xl font-serif font-bold tracking-tight text-stone-900 group-hover:text-rose-600 transition-colors">
            Haitong Ma
          </h1>
          <p className="text-stone-500 mt-1 text-sm font-medium">PhD Student @ Harvard SEAS</p>
        </div>

        <nav className="flex gap-6 mt-4 md:mt-0 text-sm font-semibold tracking-wide uppercase text-stone-500">
          <button
            onClick={() => navigate('/')}
            className={`hover:text-rose-600 transition-colors pb-1 border-b-2 ${currentView === 'about' ? 'border-rose-600 text-rose-600' : 'border-transparent'}`}
          >
            About
          </button>
          {([['Posts', '/posts'], ['Archive', '/archive'], ['Search', '/search'], ['Tags', '/tags']] as const).map(([label, path]) => (
            <button
              key={label}
              onClick={() => navigate(path)}
              className="hover:text-rose-600 transition-colors pb-1 border-b-2 border-transparent hover:border-rose-600"
            >
              {label}
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

const PostList: React.FC<DataProps> = ({ posts, navigate }) => (
  <div className="space-y-12">
    {posts.map(post => (
      <article key={post.id} className="group">
        <div className="flex items-baseline justify-between mb-2">
          <h2
            onClick={() => navigate(`/post/${post.id}`)}
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
            onClick={() => navigate(`/post/${post.id}`)}
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
                  navigate(`/tags?tag=${encodeURIComponent(tag)}`);
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

const PostDetailPage: React.FC<{ navigate: (path: string) => void }> = ({ navigate }) => {
  const { postId } = useParams();
  const post = BLOG_POSTS.find(p => p.id === postId);

  if (!post) return <div>Post not found</div>;

  return (
    <article className="animate-slide-up">
      <button
        onClick={() => navigate('/')}
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
              onClick={() => navigate(`/tags?tag=${encodeURIComponent(tag)}`)}
              className="text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full cursor-pointer hover:bg-rose-100"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <MathJax>
        <div
          style={{ counterReset: 'sidenote-counter' }}
          className="prose prose-stone prose-lg max-w-none text-stone-700 leading-8 font-sans
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
            onClick={() => navigate('/')}
            className="text-rose-600 cursor-pointer not-italic hover:underline font-semibold"
          >
            Read more posts
          </span>
        </p>
      </div>
    </article>
  );
};

const Archive: React.FC<DataProps> = ({ posts, navigate }) => {
  const postsByYear = useMemo(() => {
    const groups: Record<string, BlogPost[]> = {};
    posts.forEach(post => {
      const year = post.date.split('-')[0];
      if (!groups[year]) groups[year] = [];
      groups[year].push(post);
    });
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
                    onClick={() => navigate(`/post/${post.id}`)}
                    className="text-lg text-stone-800 cursor-pointer hover:text-rose-600 hover:underline transition-colors"
                  >
                    {post.title}
                  </span>
                  <span className="text-stone-400 text-sm font-mono shrink-0 sm:ml-4">
                    {post.date.substring(5)}
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

const SearchPage: React.FC<DataProps> = ({ posts, navigate }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const setQuery = useCallback((q: string) => {
    setSearchParams(q ? { q } : {}, { replace: true });
  }, [setSearchParams]);

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
                  onClick={() => navigate(`/post/${post.id}`)}
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

const Tags: React.FC<DataProps> = ({ posts, navigate }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTag = searchParams.get('tag') || null;

  const setActiveTag = useCallback((tag: string | null) => {
    setSearchParams(tag ? { tag } : {}, { replace: true });
  }, [setSearchParams]);

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

      <div className="space-y-8 animate-fade-in">
        <h3 className="text-sm font-bold uppercase tracking-widest text-stone-400 mb-6">
          {activeTag ? `Posts tagged "${activeTag}"` : 'All Posts'}
        </h3>
        {filteredPosts.map(post => (
          <article key={post.id} className="flex flex-col sm:flex-row gap-2 sm:gap-8 group cursor-pointer" onClick={() => navigate(`/post/${post.id}`)}>
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

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function currentViewFromPath(pathname: string): ViewType {
  if (pathname.startsWith('/post/')) return 'post';
  if (pathname === '/posts') return 'about';
  if (pathname === '/archive') return 'archive';
  if (pathname === '/search') return 'search';
  if (pathname === '/tags') return 'tags';
  return 'about';
}

export default function App() {
  const nav = useNavigate();
  const location = useLocation();
  const navigate = useCallback((path: string) => nav(path), [nav]);
  const currentView = currentViewFromPath(location.pathname);

  useEffect(() => {
    console.log("App Mounted successfully");
  }, []);

  return (
    <MathJaxContext config={config}>
      <ScrollToTop />
      <Layout navigate={navigate} currentView={currentView}>
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/posts" element={<PostList posts={BLOG_POSTS} navigate={navigate} />} />
          <Route path="/post/:postId" element={<PostDetailPage navigate={navigate} />} />
          <Route path="/archive" element={<Archive posts={BLOG_POSTS} navigate={navigate} />} />
          <Route path="/search" element={<SearchPage posts={BLOG_POSTS} navigate={navigate} />} />
          <Route path="/tags" element={<Tags posts={BLOG_POSTS} navigate={navigate} />} />
          <Route path="*" element={<About />} />
        </Routes>
      </Layout>
    </MathJaxContext>
  );
}