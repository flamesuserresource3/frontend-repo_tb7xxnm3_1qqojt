import Spline from '@splinetool/react-spline';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="relative h-[60vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/cEecEwR6Ehj4iT8T/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60 pointer-events-none" />

      <div className="relative z-10 h-full mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="text-white max-w-2xl">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-wider backdrop-blur">
            Modern • Minimal • Fast
          </p>
          <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold leading-tight">
            Thoughts on technology, design, and the craft of building.
          </h1>
          <p className="mt-4 text-zinc-200">
            Welcome to my corner of the internet. I write about software, product thinking,
            and the systems behind great user experiences.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#articles" className="inline-flex items-center gap-2 rounded-md bg-gradient-to-r from-rose-500 to-orange-500 px-4 py-2 text-sm font-medium text-white shadow hover:opacity-95 transition-opacity">
              Read latest posts <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#about" className="inline-flex items-center gap-2 rounded-md bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 transition-colors">
              About the author
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
