import { categories } from '@/data/catalog';
import { useReveal } from '@/hooks/useReveal';
import { ArrowRight } from 'lucide-react';

type Props = {
  onSelectCategory?: (categoryName: string) => void;
};

export default function CategoryGrid({ onSelectCategory }: Props) {
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

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat, i) => (
            <CategoryCard
              key={cat.name}
              category={cat}
              index={i}
              onSelect={onSelectCategory}
            />
          ))}
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
  const { ref, inView } = useReveal<HTMLDivElement>();

  const handleClick = () => {
    if (onSelect) {
      onSelect(category.name);
    }
  };

  return (
    <div
      ref={ref}
      onClick={handleClick}
      className={`reveal ${inView ? 'in-view' : ''} group relative overflow-hidden bg-ink-100 cursor-pointer`}
      style={{ animationDelay: `${index * 0.15}s` }}
    >
      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/75 via-ink-900/15 to-transparent transition-opacity duration-500 group-hover:from-ink-900/85" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-10">
        <p className="text-blush-200 text-[10px] tracking-ultra uppercase mb-2 opacity-90">
          {category.tagline}
        </p>
        <h3 className="font-serif text-3xl lg:text-4xl text-sand-50 font-light tracking-wide mb-3">
          {category.name}
        </h3>
        <p className="text-sand-100 text-sm font-light leading-relaxed max-w-xs opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-20 transition-all duration-500 overflow-hidden">
          {category.description}
        </p>
        <div className="mt-5 flex items-center gap-2 text-sand-50 text-[11px] uppercase tracking-widest">
          <span className="link-underline">Ver Colección</span>
          <ArrowRight
            size={14}
            strokeWidth={1.5}
            className="transition-transform duration-500 group-hover:translate-x-1"
          />
        </div>
      </div>
    </div>
  );
}
