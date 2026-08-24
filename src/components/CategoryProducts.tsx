import { useReveal } from '@/hooks/useReveal';
import { Plus, Heart, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Product } from '@/data/catalog';
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

export default function CategoryProducts({
  categoryName,
  products,
  currency,
  onQuickAdd,
  onToggleWishlist,
  wishlist,
  onBack,
}: Props) {
  const filtered = products.filter((product) => {
    if (categoryName === 'Sale' || categoryName === 'Novedades') {
      return product.tag === categoryName;
    }
    return product.category === categoryName;
  });

  return (
    <section className="min-h-screen bg-sand-50">
      {/* Header */}
      <div className="bg-sand-100 sticky top-24 z-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-5 lg:py-6">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-ink-700 hover:text-blush-500 transition-colors mb-3"
          >
            <ArrowLeft size={18} strokeWidth={1.5} />
            <span className="text-sm uppercase tracking-widest">Volver</span>
          </button>
          <div className="flex items-end justify-between">
            <div>
              <p className="text-blush-500 text-[11px] tracking-ultra uppercase mb-2">
                Nuestras Colecciones
              </p>
              <h1 className="font-serif text-4xl lg:text-5xl text-ink-900 font-light tracking-wide">
                {categoryName}
              </h1>
            </div>
            <p className="text-ink-500 text-sm tracking-wide">
              {filtered.length} productos
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'in-view' : ''} group flex flex-col`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Image */}
      <div 
        className="relative mb-4 bg-ink-50 aspect-[2/3] overflow-hidden cursor-pointer group"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Tags */}
        {product.tag && (
          <div className="absolute top-4 left-4">
            <span className="inline-block bg-blush-500 text-sand-50 text-[10px] font-medium px-3 py-1.5 tracking-widest uppercase">
              {product.tag}
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
          className="font-serif text-lg text-ink-900 mb-2 line-clamp-2 hover:text-blush-500 transition-colors cursor-pointer"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          {product.name}
        </h3>
        <p className="text-ink-500 text-sm font-light leading-relaxed mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="font-numeric text-ink-900 font-medium">{formatPrice(product.price, currency)}</span>
          {product.originalPrice && (
            <span className="font-numeric text-ink-400 text-sm line-through">{formatPrice(product.originalPrice, currency)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
