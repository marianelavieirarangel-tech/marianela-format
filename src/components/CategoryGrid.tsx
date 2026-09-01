import { categories, categorySlugs } from '@/data/catalog';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:gap-6">
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
  const slug = categorySlugs[category.name] ?? category.name.toLowerCase();

  const handleClick = () => {
    onSelect?.(category.name);
  };

  return (
    <Link
      to={`/collections/${slug}`}
      onClick={handleClick}
      className={`group relative overflow-hidden bg-ink-100 rounded-2xl shadow-sm hover:shadow-xl cursor-pointer transition-shadow duration-500`}
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
