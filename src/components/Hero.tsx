import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section id="top" className="relative h-[100vh] min-h-[680px] w-full overflow-hidden bg-ink-900">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://6a8377665cc6de03eb430013.imgix.net/sandbox/fashn-export-1786655423740.png?auto=format&q=80&w=1800&fit=max"
          alt="Maison Velours — colección de lencería"
          className="h-full w-full object-cover object-center scale-105"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900/70 via-ink-900/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-ink-900/20" />
      </div>

      {/* Content */}
      <div className="relative h-full mx-auto max-w-7xl px-6 lg:px-10 flex items-center">
        <div className="max-w-xl">
          <p className="text-sand-200 text-[11px] tracking-ultra uppercase mb-6 animate-fade-down" style={{ animationDelay: '0.1s', opacity: 0 }}>
            Colección Primavera 2026
          </p>
          <h1 className="font-serif text-sand-50 text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-wide font-light animate-fade-up" style={{ animationDelay: '0.25s', opacity: 0 }}>
            Tu estilo,
            <br />
            <em className="text-blush-200">tu cuerpo</em>
          </h1>
          <p className="mt-7 text-sand-100 text-base lg:text-lg font-light leading-relaxed max-w-md animate-fade-up" style={{ animationDelay: '0.45s', opacity: 0 }}>
            Trajes de baño y piezas esenciales para celebrar la delicadeza de cada gesto.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '0.65s', opacity: 0 }}>
            <a href="/collections/coleccion-2026" className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-sand-50 text-ink-900 text-xs uppercase tracking-widest transition-all duration-500 hover:bg-blush-200 hover:tracking-ultra">
              Descubrir Colección
              <ArrowRight size={15} strokeWidth={1.5} className="transition-transform duration-500 group-hover:translate-x-1" />
            </a>
            <a href="#categorias" className="inline-flex items-center justify-center px-10 py-4 border border-sand-100/60 text-sand-50 text-xs uppercase tracking-widest transition-all duration-500 hover:bg-sand-50/10 hover:border-sand-50">
              Explorar Categorías
            </a>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 animate-shimmer">
        <span className="text-sand-200 text-[10px] tracking-widest uppercase">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-sand-200 to-transparent" />
      </div>
    </section>
  );
}
