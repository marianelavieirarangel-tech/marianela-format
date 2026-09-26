import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { translate, type LanguageCode } from '@/lib/language';

const heroImages = [
  'https://6aa88bf09422e77b387f33c6.imgix.net/sandbox/fashn-export-1789781128500.webp',
  'https://6aa88bf09422e77b387f33c6.imgix.net/sandbox/ChatGPT%20Image%2026%20sept%202026,%2016_02_51.png',
];

export default function Hero({ language = 'es' }: { language?: LanguageCode }) {
  const [activeHeroImage, setActiveHeroImage] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveHeroImage((current) => (current + 1) % heroImages.length);
    }, 7000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section id="top" className="relative h-[100vh] min-h-[680px] w-full overflow-hidden bg-ink-900">
      {/* Background image */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              activeHeroImage === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt=""
              aria-hidden="true"
              className="h-full w-full scale-[1.02] object-cover object-center"
              loading={index === 0 ? 'eager' : 'lazy'}
              fetchPriority={index === 0 ? 'high' : 'auto'}
              decoding="async"
              style={{ objectPosition: 'center 18%' }}
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${
              index === 0
                ? 'from-ink-900/70 via-ink-900/30 to-transparent'
                : 'from-ink-900/40 via-ink-900/10 to-transparent'
            }`} />
            <div className={`absolute inset-0 bg-gradient-to-t ${
              index === 0
                ? 'from-ink-900/60 via-transparent to-ink-900/20'
                : 'from-ink-900/20 via-transparent to-ink-900/5'
            }`} />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative h-full mx-auto max-w-7xl px-6 lg:px-10 flex items-center">
        <div className="max-w-xl">
          <p className="text-sand-200 text-[11px] tracking-ultra uppercase mb-6 animate-fade-down" style={{ animationDelay: '0.1s', opacity: 0 }}>
            {translate(language, 'newCollection')}
          </p>
          <h1 className="font-serif text-sand-50 text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-wide font-light animate-fade-up" style={{ animationDelay: '0.25s', opacity: 0 }}>
            {translate(language, 'heroTitle').split('|')[0]}
            <br />
            <em className="text-blush-200">{translate(language, 'heroTitle').split('|')[1]}</em>
          </h1>
          <p className="mt-7 text-sand-100 text-base lg:text-lg font-light leading-relaxed max-w-md animate-fade-up" style={{ animationDelay: '0.45s', opacity: 0 }}>
            {translate(language, 'heroBody')}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-up" style={{ animationDelay: '0.65s', opacity: 0 }}>
            <a href="/collections/coleccion-2026" className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-sand-50 text-ink-900 text-xs uppercase tracking-widest transition-all duration-500 hover:bg-blush-200 hover:tracking-ultra">
              {translate(language, 'discoverCollection')}
              <ArrowRight size={15} strokeWidth={1.5} className="transition-transform duration-500 group-hover:translate-x-1" />
            </a>
            <a href="#categorias" className="inline-flex items-center justify-center px-10 py-4 border border-sand-100/60 text-sand-50 text-xs uppercase tracking-widest transition-all duration-500 hover:bg-sand-50/10 hover:border-sand-50">
              {translate(language, 'exploreCategories')}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 animate-shimmer">
        <span className="text-sand-200 text-[10px] tracking-widest uppercase">{translate(language, 'scroll')}</span>
        <div className="w-px h-12 bg-gradient-to-b from-sand-200 to-transparent" />
      </div>
    </section>
  );
}
