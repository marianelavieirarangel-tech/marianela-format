import { useReveal } from '@/hooks/useReveal';
import { Plus, Heart, ArrowLeft } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '@/data/catalog';
import { hiddenCategoryNames } from '@/data/catalog';
import { formatPrice, type CurrencyCode } from '@/lib/currency';

type Props = {
  products: Product[];
  categoryName: string;
  currency: CurrencyCode;
  onQuickAdd: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlist: Set<string>;
  onBack: () => void;
};

function getProductBadge(product: Product) {
  if (product.originalPrice && product.originalPrice > product.price) {
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    return `-${discount}%`;
  }

  return product.tag ?? '';
}

export default function CategoryProducts({
  categoryName,
  products,
  currency,
  onQuickAdd,
  onToggleWishlist,
  wishlist,
  onBack,
}: Props) {
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [activeFilter, setActiveFilter] = useState<'Todos' | 'Novedades' | 'Bestseller' | 'Sale'>('Todos');

  const filtered = useMemo(
    () =>
      products
        .filter((product) => !hiddenCategoryNames.has(product.category))
        .filter((product) => {
          if (categoryName === 'Colección 2026') {
            return true;
          }
          if (categoryName === 'Sale') {
            return product.tag === 'Sale' && product.category !== 'Bikini';
          }
          if (categoryName === 'Novedades') {
            return product.tag === 'Novedades';
          }
          return product.category === categoryName;
        })
        .filter((product) => {
          if (activeFilter === 'Todos') return true;
          return product.tag === activeFilter;
        })
        .sort((a, b) => {
          if (sortBy === 'price-asc') return a.price - b.price;
          if (sortBy === 'price-desc') return b.price - a.price;
          return 0;
        }),
    [activeFilter, categoryName, products, sortBy],
  );

  return (
    <section className="min-h-screen bg-sand-50">
      <div className="mx-auto max-w-7xl px-6 pt-8 pb-16 lg:px-10 lg:pt-10">
        <div className="grid gap-8 xl:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="xl:pt-8">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.24em] text-ink-600 hover:text-blush-500 transition-colors"
            >
              <ArrowLeft size={16} strokeWidth={1.8} />
              Volver
            </button>

            <h1 className="mt-6 font-serif text-4xl lg:text-5xl text-ink-900 font-light tracking-wide leading-none">
              {categoryName}
            </h1>

            <div className="mt-8 space-y-6">
              <div>
                <p className="mb-3 text-[10px] uppercase tracking-[0.26em] text-ink-500">Ordenar por</p>
                <label className="relative block">
                  <select
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value as 'featured' | 'price-asc' | 'price-desc')}
                    className="w-full appearance-none rounded-none border border-ink-200 bg-sand-50 px-4 py-3 pr-9 text-[10px] uppercase tracking-[0.2em] text-ink-700 outline-none transition-colors hover:border-ink-400 focus:border-ink-900"
                  >
                    <option value="featured">Destacados</option>
                    <option value="price-desc">Mayor precio</option>
                    <option value="price-asc">Menor precio</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-500">▾</span>
                </label>
              </div>

              <div>
                <p className="mb-3 text-[10px] uppercase tracking-[0.26em] text-ink-500">Filtrar por</p>
                <div className="space-y-2">
                  {(['Todos', 'Novedades', 'Bestseller', 'Sale'] as const).map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setActiveFilter(filter)}
                      className={`w-full border px-3 py-2.5 text-left text-[10px] uppercase tracking-[0.22em] transition-all duration-200 ${
                        activeFilter === filter
                          ? 'border-ink-900 bg-ink-900 text-sand-50 shadow-[0_10px_20px_rgba(17,13,10,0.08)]'
                          : 'border-ink-200 bg-sand-50 text-ink-700 hover:border-ink-400 hover:bg-sand-100'
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <div>
            <div className="mb-6 flex items-center justify-between text-sm text-ink-600">
              <p>{filtered.length} productos</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={currency}
                  index={i}
                  onQuickAdd={onQuickAdd}
                  onToggleWishlist={onToggleWishlist}
                  isWishlisted={wishlist.has(product.id)}
                />
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="text-ink-400 text-lg">No hay productos en esta categoría.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  currency,
  index,
  onQuickAdd,
  onToggleWishlist,
  isWishlisted,
}: {
  product: Product;
  currency: CurrencyCode;
  index: number;
  onQuickAdd: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
}) {
  const { ref, inView } = useReveal<HTMLDivElement>();
  const navigate = useNavigate();
  const badgeText = getProductBadge(product);

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'in-view' : ''} group flex flex-col rounded-[18px] border border-[#f0e9e1] bg-white p-3 shadow-[0_14px_30px_rgba(24,18,15,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_38px_rgba(24,18,15,0.08)]`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Image */}
      <div 
        className="relative mb-4 aspect-[2/3] overflow-hidden cursor-pointer bg-[#f7f3ee]"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Tags */}
        {badgeText && (
          <div className="absolute top-4 left-4">
            <span className="inline-block bg-blush-500 text-sand-50 text-[10px] font-medium px-3 py-1.5 tracking-widest uppercase rounded-full">
              {badgeText}
            </span>
          </div>
        )}

        {/* Wishlist button */}
        <button
          onClick={() => onToggleWishlist(product.id)}
          className="absolute bottom-4 right-4 w-10 h-10 bg-sand-50 rounded-full flex items-center justify-center transition-all hover:bg-blush-200 shadow-md"
          aria-label="Agregar a favoritos"
        >
          <Heart
            size={18}
            strokeWidth={1.5}
            className={isWishlisted ? 'fill-blush-500 stroke-blush-500' : 'stroke-ink-700'}
          />
        </button>

        {/* Quick add button */}
        <button
          onClick={(event) => {
            event.stopPropagation();
            onQuickAdd(product);
          }}
          className="absolute bottom-4 left-4 w-10 h-10 bg-ink-900 text-sand-50 rounded-full flex items-center justify-center transition-all hover:bg-blush-500 opacity-0 group-hover:opacity-100"
          aria-label="Agregar al carrito"
        >
          <Plus size={18} strokeWidth={2} />
        </button>

        {/* Swatches */}
        {product.swatches.length > 0 && (
          <div className="absolute top-4 right-4 flex gap-2">
            {product.swatches.map((swatch) => (
              <div
                key={swatch.name}
                className="w-6 h-6 rounded-full border-2 border-sand-50 shadow-md cursor-pointer hover:scale-110 transition-transform"
                style={{ backgroundColor: swatch.hex }}
                title={swatch.name}
              />
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex-1">
        <h3 
          className="font-serif text-[1.6rem] leading-none text-ink-900 mb-2 line-clamp-2 hover:text-blush-500 transition-colors cursor-pointer"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          {product.name}
        </h3>
        <p className="text-ink-500 text-sm font-light leading-relaxed mb-3 line-clamp-2 min-h-[2.5rem]">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-numeric text-ink-900 text-[1.02rem] font-medium">{formatPrice(product.price, currency)}</span>
          {product.originalPrice && (
            <span className="font-numeric text-ink-400 text-sm line-through">{formatPrice(product.originalPrice, currency)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
