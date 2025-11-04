export default function Footer() {
  return (
    <footer className="mt-16 border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 grid gap-8 sm:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-zinc-100">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded bg-gradient-to-br from-rose-500 to-orange-500 text-white font-bold">A</span>
            <span>Author Blog</span>
          </div>
          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
            Writing about technology, design, and life. Minimal, fast, and focused on clarity.
          </p>
        </div>
        <div>
          <h5 className="font-semibold">Quick Links</h5>
          <ul className="mt-3 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
            <li><a className="hover:text-rose-600" href="#archive">Archive</a></li>
            <li><a className="hover:text-rose-600" href="#about">About</a></li>
            <li><a className="hover:text-rose-600" href="#contact">Contact</a></li>
            <li><a className="hover:text-rose-600" href="#home">Home</a></li>
          </ul>
        </div>
        <div>
          <h5 className="font-semibold">Newsletter</h5>
          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">Get new articles in your inbox.</p>
          <form className="mt-3 flex gap-2">
            <input type="email" required placeholder="you@example.com" className="flex-1 rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-rose-500/40" />
            <button className="rounded-md bg-gradient-to-r from-rose-500 to-orange-500 px-4 py-2 text-sm font-medium text-white">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="py-6 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} Author Blog — Built with care.
      </div>
    </footer>
  );
}
