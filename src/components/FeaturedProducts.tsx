import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { type Product, womenSubcategories, hiddenCategoryNames } from '@/data/catalog';
import { Plus, Heart } from 'lucide-react';
import { formatPrice, type CurrencyCode } from '@/lib/currency';
import { createShopifyCheckout, isShopifyEnabled } from '@/lib/shopify';

type Props = {
  products: Product[];
  currency: CurrencyCode;
  onQuickAdd: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlist: Set<string>;
};

const filters = ['Todos', ...womenSubcategories] as const;

function getProductBadge(product: Product) {
  if (product.originalPrice && product.originalPrice > product.price) {
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    return `-${discount}%`;
  }

  return product.tag ?? '';
}

export default function FeaturedProducts({ products, currency, onQuickAdd, onToggleWishlist, wishlist }: Props) {
  const [active, setActive] = useState<(typeof filters)[number]>('Todos');

  const filtered = products
    .filter((p) => !hiddenCategoryNames.has(p.category))
    .filter((p) => {
      if (active === 'Todos') return true;
      if (active === 'Sale') return p.tag === 'Sale' && p.category !== 'Bikini';
      if (active === 'Novedades') return p.tag === 'Novedades';
      return p.category === active;
    });

  return (
    <section id="coleccion-2026" className="py-24 lg:py-32 bg-[#f5f1ec]">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Heading */}
        <div className="mb-12 flex flex-col gap-6 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-[#bb8a7d]">Colección 2026</p>
            <h2 className="font-serif text-4xl font-light tracking-wide text-[#1b1714] lg:text-5xl">
              Piezas que enamoran
            </h2>
          </div>
          {/* Filters */}
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`rounded-full border px-4 py-2 text-[10px] uppercase tracking-[0.22em] leading-none transition-all duration-300 ${
                  active === f
                    ? 'border-[#1b1714] bg-[#1b1714] text-[#f8f3ef] shadow-[0_10px_24px_rgba(27,23,20,0.12)]'
                    : 'border-[#e8dfd6] bg-[#f8f5f2] text-[#5b4f49] hover:border-[#d8c7ba] hover:bg-[#f1e9e3] hover:text-[#1b1714]'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Product grid */}
        {filtered.length === 0 ? (
          <p className="py-16 text-center text-sm font-light tracking-wide text-[#8f7e76]">
            No hay piezas en esta categoría por ahora.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-12 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-16">
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
        )}
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
  onQuickAdd: (p: Product) => void;
  onToggleWishlist: (id: string) => void;
  isWishlisted: boolean;
}) {
  const navigate = useNavigate();
  const [activeSwatch, setActiveSwatch] = useState(0);
  const badgeText = getProductBadge(product);
  const goToProduct = () => navigate(`/product/${product.id}`);

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={goToProduct}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          goToProduct();
        }
      }}
      className="group cursor-pointer rounded-[28px] border border-[#eadfce] bg-[#fffdfb] p-3 shadow-[0_18px_40px_rgba(56,35,26,0.05)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(56,35,26,0.08)]"
    >
      {/* Image */}
      <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-[22px] bg-[#f3eee9]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          loading="eager"
          decoding="async"
        />

        {/* Tag */}
        {badgeText && (
          <span
            className={`absolute left-3 top-3 rounded-full border border-white/30 px-2.5 py-1.5 text-[8px] font-medium uppercase tracking-[0.18em] shadow-sm ${
              product.originalPrice && product.originalPrice > product.price
                ? 'bg-[#ba826b] text-[#fffaf7]'
                : product.tag === 'Bestseller'
                ? 'bg-[#1b1714] text-[#f8f1eb]'
                : 'bg-[#f9f4f1]/90 text-[#2d241f]'
            }`}
          >
            {badgeText}
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-[#f0e5dd] bg-[#fffdfb]/80 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#fffaf7]"
          aria-label="Añadir a favoritos"
        >
          <Heart
            size={16}
            strokeWidth={1.5}
            className={isWishlisted ? 'fill-[#ba826b] text-[#ba826b]' : 'text-[#4a403d]'}
          />
        </button>

        {/* Quick add */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickAdd(product);
            }}
            className="flex w-full items-center justify-center gap-2 bg-[#1b1714]/95 py-4 text-[11px] uppercase tracking-[0.22em] text-[#f9f3ee] backdrop-blur-sm transition-colors hover:bg-[#2a2220]"
          >
            <Plus size={14} strokeWidth={1.5} />
            Añadir Rápido
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="px-1">
        <p className="mb-1.5 text-[10px] uppercase tracking-[0.22em] text-[#8f7e76]">{product.category}</p>
        <h3 className="mb-2 font-serif text-xl font-normal leading-tight text-[#1b1714] transition-colors group-hover:text-[#ba826b]">
          {product.name}
        </h3>

        {product.swatches.length > 0 && (
          <div className="mb-3 flex items-center gap-2">
            {product.swatches.map((sw, i) => (
              <button
                key={sw.name}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveSwatch(i);
                }}
                className={`h-4 w-4 rounded-full border transition-all duration-300 ${
                  activeSwatch === i ? 'border-[#f5f0ea] ring-2 ring-[#d9bca9] ring-offset-1 ring-offset-[#fffdfb]' : 'border-[#d9c9be]'
                }`}
                style={{ backgroundColor: sw.hex }}
                aria-label={sw.name}
                title={sw.name}
              />
            ))}
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="font-numeric text-base font-medium text-[#1b1714]">{formatPrice(product.price, currency)}</span>
          {product.originalPrice && (
            <span className="font-numeric text-sm font-medium text-[#8f7e76] line-through">{formatPrice(product.originalPrice, currency)}</span>
          )}
        </div>


        {/* Buy on Shopify button */}
        <div className="mt-3">
          <button
            onClick={async (e) => {
              e.stopPropagation();
              if (!isShopifyEnabled()) {
                alert('Integración Shopify no configurada. Define VITE_SHOPIFY_STORE_DOMAIN y VITE_SHOPIFY_STOREFRONT_TOKEN en .env');
                return;
              }
              try {
                const { checkoutUrl } = await createShopifyCheckout([{ variantId: product.shopifyVariantId, quantity: 1 }]);
                window.location.href = checkoutUrl;
              } catch (err) {
                console.error(err);
                alert('Error al crear checkout: ' + (err instanceof Error ? err.message : String(err)));
              }
            }}
            className="mt-2 w-full rounded-full bg-[#c88f7a] py-2.5 text-sm uppercase tracking-[0.2em] text-[#fffaf7] transition-all duration-300 hover:bg-[#b17864] hover:shadow-[0_12px_24px_rgba(200,143,122,0.25)]"
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}
