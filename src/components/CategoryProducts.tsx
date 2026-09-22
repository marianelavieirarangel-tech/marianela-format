import { Heart, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '@/data/catalog';
import { hiddenCategoryNames } from '@/data/catalog';
import { formatPrice, type CurrencyCode } from '@/lib/currency';
import { translateLabel, type LanguageCode } from '@/lib/language';

type Props = {
  products: Product[];
  categoryName: string;
  currency: CurrencyCode;
  onQuickAdd: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlist: Set<string>;
  onBack: () => void;
  language: LanguageCode;
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
  language,
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
            return product.collectionHandles?.includes('coleccion-2026') ?? false;
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
  const isEmptyCollection = categoryName === 'Colección 2026' && filtered.length === 0;

  return (
    <section className={`min-h-screen ${isEmptyCollection ? 'bg-ink-900' : 'bg-white'}`}>
      <div className={isEmptyCollection ? 'w-full px-0 pb-0' : 'mx-auto w-full max-w-[1560px] px-4 pt-6 pb-20 lg:px-5 lg:pt-8 xl:px-6'}>
        <div className={`grid gap-10 ${isEmptyCollection ? '' : 'lg:grid-cols-[230px_minmax(0,1fr)] xl:gap-12'}`}>
          {!isEmptyCollection && <aside className="lg:sticky lg:top-24 lg:h-fit">
            <button
              type="button"
              onClick={onBack}
              className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-ink-600 hover:text-blush-400 transition-colors duration-200"
            >
              <ArrowLeft size={14} strokeWidth={1.8} className="group-hover:-translate-x-1 transition-transform" />
              <span>{translateLabel(language, 'Volver')}</span>
            </button>

            <h1 className={`mt-8 font-serif font-light tracking-wide leading-tight ${
              isSaleSection
                ? 'text-[2.6rem] text-[#c62828] lg:text-[3.3rem]'
                : 'text-4xl text-ink-900 lg:text-[2.8rem]'
            }`}>
              {translateLabel(language, categoryName)}
            </h1>

            <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.2em] text-ink-500">
              {filtered.length} {translateLabel(language, filtered.length === 1 ? 'Producto' : 'Productos')}
            </p>

            <div className="mt-10 space-y-8">
              <div>
                <label className="block">
                  <span className="mb-3.5 block text-[9px] uppercase tracking-[0.28em] font-medium text-ink-500">{translateLabel(language, 'Ordenar por')}</span>
                  <select
                    value={sortBy}
                    onChange={(event) => setSortBy(event.target.value as 'featured' | 'price-asc' | 'price-desc')}
                    className="w-full appearance-none rounded-sm border border-ink-200 bg-white px-4 py-3 pr-9 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-800 outline-none transition-all duration-200 hover:border-ink-400 focus:border-ink-900 focus:ring-1 focus:ring-ink-900/10"
                  >
                    <option value="featured">{translateLabel(language, 'Destacados')}</option>
                    <option value="price-asc">{translateLabel(language, 'Menor precio')}</option>
                    <option value="price-desc">{translateLabel(language, 'Mayor precio')}</option>
                  </select>
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-400 text-[10px]">▾</span>
                </label>
              </div>

              <div>
                <p className="mb-4 text-[9px] uppercase tracking-[0.28em] font-medium text-ink-500">{translateLabel(language, 'Filtrar por')}</p>
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
                              ? 'bg-[#c62828] text-white border-[#c62828] shadow-[0_6px_16px_rgba(198,40,40,0.2)]'
                              : 'bg-ink-900 text-white border-ink-900 shadow-[0_6px_16px_rgba(27,23,20,0.12)]'
                            : isSaleFilter
                              ? 'bg-white text-[#c62828] border-[#e7b4b4] hover:border-[#d38383] hover:bg-[#fff5f5]'
                              : 'bg-white text-ink-700 border-ink-200 hover:border-ink-400 hover:bg-ink-50'
                        }`}
                      >
                        {translateLabel(language, filter)}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </aside>}

          <div className={isEmptyCollection ? 'min-w-0' : ''}>
            <div className="grid grid-cols-1 gap-x-5 gap-y-12 md:grid-cols-2 xl:grid-cols-3 xl:gap-x-px">
              {filtered.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  currency={currency}
                  onQuickAdd={onQuickAdd}
                  onToggleWishlist={onToggleWishlist}
                  isWishlisted={wishlist.has(product.id)}
                />
              ))}
            </div>

            {filtered.length === 0 && (
              categoryName === 'Colección 2026' ? (
                <div className="relative left-1/2 col-span-full min-h-[100svh] w-screen -translate-x-1/2 overflow-hidden bg-ink-900">
                  <img
                    src="https://6aa88bf09422e77b387f33c6.imgix.net/sandbox/fashn-export-1789762027223.png?auto=format,compress&q=82&w=2400"
                    alt="Colección 2026"
                    className="absolute inset-0 h-full w-full object-cover object-[center_top]"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/45 via-transparent to-transparent" />
                </div>
              ) : (
                <div className="col-span-full py-20 text-center">
                  <div className="mb-3 text-4xl text-ink-200">∘</div>
                  <p className="text-ink-400 text-sm tracking-wide">{translateLabel(language, 'No hay productos disponibles con estos filtros.')}</p>
                </div>
              )
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
  onQuickAdd,
  onToggleWishlist,
  isWishlisted,
}: {
  product: Product;
  currency: CurrencyCode;
  onQuickAdd: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
}) {
  const navigate = useNavigate();
  const badgeText = getProductBadge(product);
  const [imageIndex, setImageIndex] = useState(0);
  const images = [product.image, ...(product.images ?? []).filter((image) => image !== product.image)];
  const displayedImage = images[imageIndex] ?? product.image;
  const hasMultipleImages = images.length > 1;

  return (
    <div
      className="group flex flex-col rounded-[18px] border border-[#eadfce] bg-white p-3 shadow-[0_18px_40px_rgba(56,35,26,0.05)] transition-shadow duration-500 hover:shadow-[0_22px_48px_rgba(56,35,26,0.08)] xl:rounded-none xl:border-0 xl:p-0 xl:shadow-none"
    >
      {/* Image */}
      <div 
        className="relative mb-4 aspect-[4/5] cursor-pointer overflow-hidden rounded-[22px] bg-white xl:mb-0 xl:aspect-[2/3] xl:rounded-none"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img
          src={displayedImage}
          alt={product.name}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-in-out group-hover:scale-[1.02]"
        />

        {hasMultipleImages && (
          <>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setImageIndex((current) => (current - 1 + images.length) % images.length);
              }}
              className="absolute left-3 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center bg-transparent p-1 text-white mix-blend-difference transition-transform hover:scale-125"
              aria-label={`Foto anterior de ${product.name}`}
            >
              <ChevronLeft size={16} strokeWidth={1.5} />
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                setImageIndex((current) => (current + 1) % images.length);
              }}
              className="absolute right-3 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center bg-transparent p-1 text-white mix-blend-difference transition-transform hover:scale-125"
              aria-label={`Siguiente foto de ${product.name}`}
            >
              <ChevronRight size={16} strokeWidth={1.5} />
            </button>
          </>
        )}

        {badgeText && (
          <span className="absolute bottom-3 left-3 z-10 inline-flex h-6 min-w-10 items-center justify-center bg-[#1b1714] px-2 text-[9px] font-medium uppercase tracking-[0.12em] text-[#fffaf7]">
            {badgeText}
          </span>
        )}

        {/* Wishlist button */}
        <button
          onClick={(event) => {
            event.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#f0e5dd] bg-[#fffdfb]/95 shadow-sm transition-colors duration-200 hover:bg-[#fffaf7]"
          aria-label="Agregar a favoritos"
        >
          <Heart
            size={18}
            strokeWidth={1.5}
            className={`transition-colors duration-200 ${isWishlisted ? 'fill-[#ba826b] stroke-[#ba826b]' : 'stroke-[#3b312e]'}`}
          />
        </button>

      </div>

      {/* Info */}
      <div className="flex-1 xl:px-2 xl:pb-5 xl:pt-3">
        <h3 
          className="mb-2 cursor-pointer font-serif text-[1.35rem] leading-tight text-[#1b1714] transition-colors hover:text-[#ba826b]"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          {product.name}
        </h3>
        <p className="mb-3 min-h-[2.5rem] text-sm font-light leading-relaxed text-[#6c5f59] line-clamp-2 xl:hidden">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-numeric text-[1.02rem] font-medium text-[#1b1714]">{formatPrice(product.price, currency)}</span>
          {product.originalPrice && (
            <span className="font-numeric text-sm font-medium text-[#8f7e76] line-through">{formatPrice(product.originalPrice, currency)}</span>
          )}
        </div>

        {product.swatches.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5" aria-label="Colores disponibles">
            {product.swatches
              .filter((swatch) => swatch.hex.toLowerCase() !== '#e8dfd6' && swatch.name.trim().toLowerCase() !== 'beige')
              .map((swatch) => (
              <button
                type="button"
                key={swatch.name}
                className="h-3.5 w-3.5 border border-[#cfc2b7] bg-cover bg-center transition-transform hover:scale-110"
                style={{
                  backgroundColor: swatch.hex,
                }}
                title={swatch.name}
                aria-label={`Ver ${product.name} en color ${swatch.name}`}
                onClick={() => navigate(`/product/${product.id}?color=${encodeURIComponent(swatch.name)}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
