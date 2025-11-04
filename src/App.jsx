import { useEffect, useMemo, useState, useCallback } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import PostList from './components/PostList.jsx';
import Footer from './components/Footer.jsx';

function App() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  const toggleTheme = useCallback(() => setDark((d) => !d), []);

  const [query, setQuery] = useState('');
  const handleSearch = useCallback((q) => setQuery(q), []);

  const bg = useMemo(
    () => 'bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100',
    []
  );

  return (
    <div className={`min-h-screen ${bg} antialiased`}> 
      <Navbar darkMode={dark} onToggleTheme={toggleTheme} onSearch={handleSearch} />
      <main>
        <Hero />
        <div id="about" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-12">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
            <h2 className="text-xl font-semibold">About Me</h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              I’m Alex, a product-minded engineer and designer. I care about clear writing,
              reliable systems, and delightful user experiences. This blog is where I explore
              ideas, share notes, and document what I’m learning.
            </p>
          </div>
        </div>
        <PostList query={query} />
        <div id="contact" className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
            <h2 className="text-xl font-semibold">Contact</h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">Reach out on social or drop a message:</p>
            <form className="mt-4 grid gap-3 sm:grid-cols-2">
              <input required placeholder="Your name" className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-rose-500/40" />
              <input required type="email" placeholder="you@example.com" className="rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-rose-500/40" />
              <textarea required placeholder="Your message" rows="4" className="sm:col-span-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-rose-500/40"></textarea>
              <div className="sm:col-span-2">
                <button className="rounded-md bg-gradient-to-r from-rose-500 to-orange-500 px-4 py-2 text-sm font-medium text-white">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
