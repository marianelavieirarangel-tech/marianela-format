import { categories, categorySlugs } from '@/data/catalog';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';

type Props = {
  onSelectCategory?: (categoryName: string) => void;
};

export default function CategoryGrid({ onSelectCategory }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setShowLeftArrow(scrollLeft > 0);
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
  };

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    
    // Calculate scroll amount based on one card width + gap
    const isDesktop = window.innerWidth >= 1024;
    const cardWidth = isDesktop ? 320 : 288; // w-80 or w-72
    const gapWidth = isDesktop ? 24 : 20; // gap-6 or gap-5
    const scrollAmount = cardWidth + gapWidth;

    const startScroll = scrollRef.current.scrollLeft;
    const endScroll = startScroll + (direction === 'left' ? -scrollAmount : scrollAmount);
    const duration = 600; // 600ms for smooth transition
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeInOutCubic = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      scrollRef.current!.scrollLeft = startScroll + (endScroll - startScroll) * easeInOutCubic;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <section id="categorias" className="py-24 lg:py-32 bg-sand-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Section heading */}
        <div className="text-center mb-16 lg:mb-20">
          <p className="text-blush-500 text-[11px] tracking-ultra uppercase mb-4">Nuestras Colecciones</p>
          <h2 className="font-serif text-4xl lg:text-5xl text-ink-900 font-light tracking-wide">
            Descubre nuestras categorías
          </h2>
          <div className="w-12 h-px bg-blush-400 mx-auto mt-8" />
        </div>

        {/* Carousel Container */}
        <div className="relative group max-w-[928px] lg:max-w-[1008px] mx-auto">
          {/* Left Arrow */}
          {showLeftArrow && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-sand-50 shadow-lg text-ink-800 hover:bg-ink-900 hover:text-sand-50 transition-all duration-300 -ml-6 lg:-ml-10"
              aria-label="Ver categorías anteriores"
            >
              <ChevronLeft size={24} strokeWidth={1.5} />
            </button>
          )}

          {/* Carousel */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="flex gap-5 lg:gap-6 overflow-x-auto no-scrollbar pb-2"
          >
            {categories.map((cat, i) => (
              <CategoryCard
                key={cat.name}
                category={cat}
                index={i}
                onSelect={onSelectCategory}
              />
            ))}
          </div>

          {/* Right Arrow */}
          {showRightArrow && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full bg-sand-50 shadow-lg text-ink-800 hover:bg-ink-900 hover:text-sand-50 transition-all duration-300 -mr-6 lg:-mr-10"
              aria-label="Ver más categorías"
            >
              <ChevronRight size={24} strokeWidth={1.5} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({
  category,
  index,
  onSelect,
}: {
  category: (typeof categories)[number];
  index: number;
  onSelect?: (categoryName: string) => void;
}) {
  const slug = categorySlugs[category.name] ?? category.name.toLowerCase();

  const handleClick = () => {
    onSelect?.(category.name);
  };

  return (
    <Link
      to={`/collections/${slug}`}
      onClick={handleClick}
      className="group relative flex-shrink-0 w-72 lg:w-80 overflow-hidden bg-ink-100 rounded-2xl shadow-sm hover:shadow-xl cursor-pointer transition-shadow duration-500"
    >
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
          loading="lazy"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-ink-900/20 to-transparent transition-all duration-500 group-hover:from-ink-900/90 group-hover:via-ink-900/30" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-5 lg:p-6">
        <p className="text-blush-200 text-[8px] tracking-ultra uppercase mb-1 opacity-80 font-light">
          {category.tagline}
        </p>
        <h3 className="font-serif text-xl lg:text-2xl text-sand-50 font-light tracking-wide mb-1.5 leading-tight">
          {category.name}
        </h3>
        <p className="text-sand-100 text-xs font-light leading-relaxed max-w-xs opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-14 transition-all duration-500 overflow-hidden">
          {category.description}
        </p>
        <div className="mt-3 flex items-center gap-1.5 text-sand-50 text-[9px] uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity duration-500">
          <span className="link-underline">Ver Colección</span>
          <ArrowRight
            size={12}
            strokeWidth={1.5}
            className="transition-transform duration-500 group-hover:translate-x-1"
          />
        </div>
      </div>
    </Link>
  );
}
