import { useMemo, useState } from 'react';
import { Calendar, User, Tag, Grid, List, ArrowLeft, ArrowRight, MessageSquare, ThumbsUp, Bookmark } from 'lucide-react';

const samplePosts = [
  {
    id: '1',
    title: 'Designing with Systems: From Components to Cohesion',
    excerpt: 'A practical guide to thinking in systems and patterns that scale across products and teams.',
    date: '2025-10-01',
    author: 'Alex Rivera',
    category: 'Design',
    tags: ['Design', 'UI/UX', 'Systems'],
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop',
    views: 1243,
    likes: 84,
  },
  {
    id: '2',
    title: 'Type-safe APIs with FastAPI and Pydantic',
    excerpt: 'How to model your domain and ship reliable services with clear contracts and validations.',
    date: '2025-09-20',
    author: 'Alex Rivera',
    category: 'Technology',
    tags: ['Python', 'API', 'Backend'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
    views: 972,
    likes: 67,
  },
  {
    id: '3',
    title: 'Attention as a Resource: Notes on Focus',
    excerpt: 'In a world of infinite feeds, protecting your attention is the highest-leverage habit.',
    date: '2025-09-02',
    author: 'Alex Rivera',
    category: 'Lifestyle',
    tags: ['Focus', 'Productivity'],
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop',
    views: 1580,
    likes: 102,
  },
  {
    id: '4',
    title: 'Edge-first Web: Performance as a Feature',
    excerpt: 'Latency is product. Techniques to deliver instant experiences from the edge.',
    date: '2025-08-18',
    author: 'Alex Rivera',
    category: 'Technology',
    tags: ['Web', 'Performance', 'Edge'],
    image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop',
    views: 1422,
    likes: 90,
  },
];

function PostCard({ post, viewMode }) {
  return (
    <article className={`group overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-shadow ${viewMode === 'list' ? 'flex' : ''}`}>
      <a href="#post" className={`${viewMode === 'list' ? 'w-56' : 'w-full'} block aspect-video overflow-hidden`}>
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </a>
      <div className="p-5 flex-1">
        <div className="flex items-center gap-4 text-xs text-zinc-500">
          <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{new Date(post.date).toLocaleDateString()}</span>
          <span className="inline-flex items-center gap-1"><User className="h-3.5 w-3.5" />{post.author}</span>
          <span className="inline-flex items-center gap-1"><Tag className="h-3.5 w-3.5" />{post.category}</span>
        </div>
        <h3 className="mt-2 text-xl font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-rose-600 transition-colors">
          <a href="#post">{post.title}</a>
        </h3>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400 line-clamp-2">{post.excerpt}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {post.tags.map((t) => (
            <span key={t} className="text-xs px-2 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">#{t}</span>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between text-sm text-zinc-500">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1"><MessageSquare className="h-4 w-4" /> 12</span>
            <span className="inline-flex items-center gap-1"><ThumbsUp className="h-4 w-4" /> {post.likes}</span>
            <span className="inline-flex items-center gap-1">👁️ {post.views.toLocaleString()}</span>
          </div>
          <button className="inline-flex items-center gap-1 px-2 py-1 rounded-md border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
            <Bookmark className="h-4 w-4" /> Save
          </button>
        </div>
      </div>
    </article>
  );
}

export default function PostList({ query }) {
  const [view, setView] = useState('grid');
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const [activeTag, setActiveTag] = useState('All');
  const [activeCategory, setActiveCategory] = useState('All');

  const tags = useMemo(() => {
    const t = new Set();
    samplePosts.forEach((p) => p.tags.forEach((tg) => t.add(tg)));
    return ['All', ...Array.from(t)];
  }, []);

  const categories = useMemo(() => {
    const c = new Set(samplePosts.map((p) => p.category));
    return ['All', ...Array.from(c)];
  }, []);

  const filtered = useMemo(() => {
    const q = (query || '').toLowerCase();
    return samplePosts.filter((p) => {
      const matchesQuery = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.tags.join(' ').toLowerCase().includes(q);
      const matchesTag = activeTag === 'All' || p.tags.includes(activeTag);
      const matchesCat = activeCategory === 'All' || p.category === activeCategory;
      return matchesQuery && matchesTag && matchesCat;
    });
  }, [query, activeTag, activeCategory]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <section id="articles" className="py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">Latest Articles</h2>
            <p className="text-zinc-600 dark:text-zinc-400">Insights across technology, design, and life.</p>
          </div>
          <div className="flex items-center gap-2 self-end">
            <button onClick={() => setView('grid')} className={`inline-flex items-center gap-2 px-3 py-2 rounded-md border text-sm ${view === 'grid' ? 'border-rose-500 text-rose-600' : 'border-zinc-200 dark:border-zinc-700'}`}>
              <Grid className="h-4 w-4"/> Grid
            </button>
            <button onClick={() => setView('list')} className={`inline-flex items-center gap-2 px-3 py-2 rounded-md border text-sm ${view === 'list' ? 'border-rose-500 text-rose-600' : 'border-zinc-200 dark:border-zinc-700'}`}>
              <List className="h-4 w-4"/> List
            </button>
          </div>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <div className="sm:col-span-2 order-2 sm:order-1">
            <div className={view === 'grid' ? 'grid gap-6 sm:grid-cols-2' : 'grid gap-6'}>
              {paginated.map((post) => (
                <PostCard key={post.id} post={post} viewMode={view} />
              ))}
            </div>

            <div className="mt-8 flex items-center justify-between">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="inline-flex items-center gap-2 rounded-md border border-zinc-200 dark:border-zinc-700 px-3 py-2 text-sm disabled:opacity-50"
              >
                <ArrowLeft className="h-4 w-4"/> Previous
              </button>
              <div className="text-sm text-zinc-600 dark:text-zinc-400">Page {page} of {totalPages}</div>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="inline-flex items-center gap-2 rounded-md border border-zinc-200 dark:border-zinc-700 px-3 py-2 text-sm disabled:opacity-50"
              >
                Next <ArrowRight className="h-4 w-4"/>
              </button>
            </div>
          </div>

          <aside className="order-1 sm:order-2">
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
              <h4 className="font-semibold mb-3">Categories</h4>
              <div className="flex flex-wrap gap-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => { setActiveCategory(c); setPage(1); }}
                    className={`text-xs px-3 py-1.5 rounded-full border ${activeCategory === c ? 'border-rose-500 text-rose-600' : 'border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
              <h4 className="font-semibold mb-3">Tag Cloud</h4>
              <div className="flex flex-wrap gap-2">
                {tags.map((t) => (
                  <button
                    key={t}
                    onClick={() => { setActiveTag(t); setPage(1); }}
                    className={`text-xs px-3 py-1.5 rounded-full border ${activeTag === t ? 'border-rose-500 text-rose-600' : 'border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300'}`}
                  >
                    #{t}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
              <h4 className="font-semibold mb-3">About the Author</h4>
              <div className="flex items-center gap-3">
                <img src="https://i.pravatar.cc/100?img=13" alt="Author avatar" className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <p className="font-medium">Alex Rivera</p>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">Designer, engineer, and writer exploring the intersection of craft and systems.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
