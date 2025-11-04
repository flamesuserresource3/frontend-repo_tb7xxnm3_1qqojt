import { useState, useEffect } from 'react';
import { Search, Sun, Moon, Home, User, Mail, Library, Menu } from 'lucide-react';

export default function Navbar({ darkMode, onToggleTheme, onSearch }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => onSearch(query), 250);
    return () => clearTimeout(handler);
  }, [query, onSearch]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 dark:bg-zinc-900/70 border-b border-zinc-200 dark:border-zinc-800">
      <nav className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="inline-flex sm:hidden p-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800"
              aria-label="Toggle Menu"
              onClick={() => setOpen(!open)}
            >
              <Menu className="h-5 w-5" />
            </button>
            <a href="#" className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-100">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-rose-500 to-orange-500 text-white font-bold">A</span>
              <span className="hidden sm:inline">Author Blog</span>
            </a>
          </div>

          <div className="hidden sm:flex items-center gap-6 text-sm text-zinc-700 dark:text-zinc-300">
            <a href="#home" className="inline-flex items-center gap-2 hover:text-rose-500 transition-colors"><Home className="h-4 w-4"/>Home</a>
            <a href="#about" className="inline-flex items-center gap-2 hover:text-rose-500 transition-colors"><User className="h-4 w-4"/>About</a>
            <a href="#archive" className="inline-flex items-center gap-2 hover:text-rose-500 transition-colors"><Library className="h-4 w-4"/>Archive</a>
            <a href="#contact" className="inline-flex items-center gap-2 hover:text-rose-500 transition-colors"><Mail className="h-4 w-4"/>Contact</a>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-56 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-rose-500/40"
              />
            </div>
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-md border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="sm:hidden pb-4">
            <div className="grid gap-2 text-sm text-zinc-700 dark:text-zinc-300">
              <a href="#home" className="px-2 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 inline-flex items-center gap-2"><Home className="h-4 w-4"/>Home</a>
              <a href="#about" className="px-2 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 inline-flex items-center gap-2"><User className="h-4 w-4"/>About</a>
              <a href="#archive" className="px-2 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 inline-flex items-center gap-2"><Library className="h-4 w-4"/>Archive</a>
              <a href="#contact" className="px-2 py-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 inline-flex items-center gap-2"><Mail className="h-4 w-4"/>Contact</a>
              <div className="px-2 pt-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search articles..."
                    className="w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 pl-9 pr-3 py-2 text-sm outline-none focus:ring-2 focus:ring-rose-500/40"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
