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
  const isSaleSection = categoryName === 'Sale';

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
      <div className="mx-auto max-w-7xl px-6 pt-6 pb-20 lg:px-10 lg:pt-8">
        <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <button
              type="button"
              onClick={onBack}
              className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-ink-600 hover:text-blush-400 transition-colors duration-200"
            >
              <ArrowLeft size={14} strokeWidth={1.8} className="group-hover:-translate-x-1 transition-transform" />
              <span>Volver</span>
            </button>

            <h1 className={`mt-8 font-serif font-light tracking-wide leading-tight ${
              isSaleSection
                ? 'text-[2.6rem] text-[#c62828] lg:text-[3.3rem]'
                : 'text-4xl text-ink-900 lg:text-[2.8rem]'
            }`}>
              {categoryName}
            </h1>

            <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-500">
              {filtered.length} {filtered.length === 1 ? 'Producto' : 'Productos'}
            </p>

            <div className="mt-10 space-y-8">
              <div>
                <label className="block">
                  <span className="mb-3.5 block text-[9px] uppercase tracking-[0.28em] font-medium text-ink-500">Ordenar por</span>
                  <select
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value as 'featured' | 'price-asc' | 'price-desc')}
                    className="w-full appearance-none rounded-sm border border-ink-200 bg-sand-50 px-4 py-3 pr-9 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-800 outline-none transition-all duration-200 hover:border-ink-400 focus:border-ink-900 focus:ring-1 focus:ring-ink-900/10"
                  >
                    <option value="featured">Destacados</option>
                    <option value="price-asc">Menor precio</option>
                    <option value="price-desc">Mayor precio</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 text-[10px]">▾</span>
                </label>
              </div>

              <div>
                <p className="mb-4 text-[9px] uppercase tracking-[0.28em] font-medium text-ink-500">Filtrar por</p>
                <div className="space-y-2.5">
                  {(['Todos', 'Novedades', 'Bestseller', 'Sale'] as const).map((filter) => {
                    const isSaleFilter = filter === 'Sale';
                    const isSelected = activeFilter === filter;

                    return (
                      <button
                        key={filter}
                        type="button"
                        onClick={() => setActiveFilter(filter)}
                        className={`w-full px-3.5 py-2.5 text-left text-[10px] font-medium uppercase tracking-[0.18em] border transition-all duration-200 rounded-sm ${
                          isSelected
                            ? isSaleFilter
                              ? 'bg-[#c62828] text-sand-50 border-[#c62828] shadow-[0_6px_16px_rgba(198,40,40,0.2)]'
                              : 'bg-ink-900 text-sand-50 border-ink-900 shadow-[0_6px_16px_rgba(27,23,20,0.12)]'
                            : isSaleFilter
                              ? 'bg-sand-50 text-[#c62828] border-[#e7b4b4] hover:border-[#d38383] hover:bg-[#fff5f5]'
                              : 'bg-sand-50 text-ink-700 border-ink-200 hover:border-ink-400 hover:bg-ink-50'
                        }`}
                      >
                        {filter}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>

          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
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
              <div className="col-span-full text-center py-20">
                <div className="mb-3 text-4xl text-ink-200">∘</div>
                <p className="text-ink-400 text-sm tracking-wide">No hay productos disponibles con estos filtros.</p>
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
  const [isHovering, setIsHovering] = useState(false);
  const previewImage = product.images && product.images.length > 1 ? product.images[1] : product.image;

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'in-view' : ''} group flex flex-col rounded-[26px] border border-[#eadfce] bg-[#fffdfb] p-3 shadow-[0_18px_40px_rgba(56,35,26,0.05)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(56,35,26,0.08)]`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Image */}
      <div 
        className="relative mb-4 aspect-[2/3] cursor-pointer overflow-hidden rounded-[22px] bg-[#f4efe9]"
        onClick={() => navigate(`/product/${product.id}`)}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <img
          src={isHovering && previewImage ? previewImage : product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Tags */}
        {badgeText && (
          <div className="absolute left-4 top-4">
            <span className="inline-block rounded-full bg-[#c88f7a] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#fffaf7] shadow-sm">
              {badgeText}
            </span>
          </div>
        )}

        {/* Wishlist button */}
        <button
          onClick={() => onToggleWishlist(product.id)}
          className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#f0e5dd] bg-[#fffdfb]/80 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#fffaf7]"
          aria-label="Agregar a favoritos"
        >
          <Heart
            size={18}
            strokeWidth={1.5}
            className={isWishlisted ? 'fill-[#ba826b] stroke-[#ba826b]' : 'stroke-[#3b312e]'}
          />
        </button>

        {/* Quick add button */}
        <button
          onClick={(event) => {
            event.stopPropagation();
            onQuickAdd(product);
          }}
          className="absolute bottom-4 left-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#1b1714] text-[#f9f3ee] opacity-0 transition-all duration-300 hover:bg-[#2a2220] group-hover:opacity-100"
          aria-label="Agregar al carrito"
        >
          <Plus size={18} strokeWidth={2} />
        </button>

        {/* Swatches */}
        {product.swatches.length > 0 && (
          <div className="absolute right-4 top-4 flex gap-2">
            {product.swatches.map((swatch) => (
              <div
                key={swatch.name}
                className="h-6 w-6 rounded-full border-2 border-[#fffdfb] shadow-md transition-transform hover:scale-110"
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
          className="mb-2 cursor-pointer font-serif text-[1.6rem] leading-none text-[#1b1714] transition-colors hover:text-[#ba826b]"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          {product.name}
        </h3>
        <p className="mb-3 min-h-[2.5rem] text-sm font-light leading-relaxed text-[#6c5f59] line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-numeric text-[1.02rem] font-medium text-[#1b1714]">{formatPrice(product.price, currency)}</span>
          {product.originalPrice && (
            <span className="font-numeric text-sm font-medium text-[#8f7e76] line-through">{formatPrice(product.originalPrice, currency)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
