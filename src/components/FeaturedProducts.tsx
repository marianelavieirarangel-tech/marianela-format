import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { type Product, womenSubcategories } from '@/data/catalog';
import { useReveal } from '@/hooks/useReveal';
import { Plus, Heart } from 'lucide-react';
import { formatPrice, type CurrencyCode } from '@/lib/currency';
import { createShopifyCheckout, isShopifyEnabled, findVariantGidByTitle } from '@/lib/shopify';

type Props = {
  products: Product[];
  currency: CurrencyCode;
  onQuickAdd: (product: Product) => void;
  onToggleWishlist: (productId: string) => void;
  wishlist: Set<string>;
};

const filters = ['Todos', 'Novedades', ...womenSubcategories, 'Sale'] as const;

export default function FeaturedProducts({ products, currency, onQuickAdd, onToggleWishlist, wishlist }: Props) {
  const [active, setActive] = useState<(typeof filters)[number]>('Todos');

  const filtered = products.filter((p) => {
    if (active === 'Todos') return true;
    if (active === 'Sale') return p.tag === 'Sale';
    if (active === 'Novedades') return p.tag === 'Novedades';
    return p.category === active;
  });

  return (
    <section id="novedades" className="py-24 lg:py-32 bg-sand-100/60">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {/* Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-12 lg:mb-16 gap-6">
          <div>
            <p className="text-blush-500 text-[11px] tracking-ultra uppercase mb-4">Selección Curada</p>
            <h2 className="font-serif text-4xl lg:text-5xl text-ink-900 font-light tracking-wide">
              Piezas que enamoran
            </h2>
          </div>
          {/* Filters */}
          <div className="flex flex-wrap gap-1">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`px-5 py-2.5 text-[11px] uppercase tracking-widest transition-all duration-300 border ${
                  active === f
                    ? 'bg-ink-900 text-sand-50 border-ink-900'
                    : 'border-ink-200 text-ink-600 hover:border-ink-400 hover:text-ink-800'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-12 lg:gap-x-6 lg:gap-y-16">
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
  onQuickAdd: (p: Product) => void;
  onToggleWishlist: (id: string) => void;
  isWishlisted: boolean;
}) {
  const { ref, inView } = useReveal<HTMLDivElement>();
  const navigate = useNavigate();
  const [activeSwatch, setActiveSwatch] = useState(0);
  const [stock, setStock] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;
    async function loadInventory() {
      if (!isShopifyEnabled()) return;
      try {
        let variantGid = product.shopifyVariantId || null;
        if (!variantGid) {
          variantGid = await findVariantGidByTitle(product.name);
        }
        if (!variantGid) {
          // Could not map to Shopify variant
          if (mounted) setStock(null);
          return;
        }
        const resp = await fetch(`/api/shopify/inventory?variantGid=${encodeURIComponent(variantGid)}`);
        if (!resp.ok) {
          if (mounted) setStock(null);
          return;
        }
        const data = await resp.json();
        if (data?.ok && Array.isArray(data.inventory_levels)) {
          const total = data.inventory_levels.reduce(
            (sum: number, item: { available?: number }) => sum + (item.available || 0),
            0,
          );
          if (mounted) setStock(total);
        } else {
          if (mounted) setStock(null);
        }
      } catch (err) {
        console.error('Error loading inventory', err);
        if (mounted) setStock(null);
      }
    }
    loadInventory();
    return () => { mounted = false };
  }, [product.id]);

  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'in-view' : ''} group`}
      style={{ animationDelay: `${(index % 4) * 0.1}s` }}
    >
      {/* Image */}
      <div 
        className="relative aspect-[3/4] overflow-hidden bg-ink-100 mb-4 cursor-pointer"
        onClick={() => onQuickAdd(product)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          loading="lazy"
        />

        {/* Tag */}
        {product.tag && (
          <span
            className={`absolute top-3 left-3 px-3 py-1 text-[9px] uppercase tracking-widest ${
              product.tag === 'Sale'
                ? 'bg-blush-500 text-sand-50'
                : product.tag === 'Bestseller'
                ? 'bg-ink-900 text-sand-50'
                : 'bg-sand-50 text-ink-800'
            }`}
          >
            {product.tag}
          </span>
        )}

        {/* Wishlist */}
        <button
          onClick={() => onToggleWishlist(product.id)}
          className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-sand-50/80 backdrop-blur-sm hover:bg-sand-50 transition-colors"
          aria-label="Añadir a favoritos"
        >
          <Heart
            size={16}
            strokeWidth={1.5}
            className={isWishlisted ? 'fill-blush-500 text-blush-500' : 'text-ink-700'}
          />
        </button>

        {/* Quick add */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <button
            onClick={() => onQuickAdd(product)}
            className="w-full py-4 bg-ink-900/95 backdrop-blur-sm text-sand-50 text-[11px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-ink-900 transition-colors"
          >
            <Plus size={14} strokeWidth={1.5} />
            Añadir Rápido
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="px-1">
        <p className="text-[10px] uppercase tracking-widest text-ink-400 mb-1.5">{product.category}</p>
        <h3 
          className="font-serif text-xl text-ink-900 font-normal leading-tight mb-2 cursor-pointer hover:text-blush-500 transition-colors"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          {product.name}
        </h3>

        {/* Swatches */}
        <div className="flex items-center gap-2 mb-3">
          {product.swatches.map((sw, i) => (
            <button
              key={sw.name}
              onClick={() => setActiveSwatch(i)}
              className={`w-4 h-4 rounded-full border transition-all duration-300 ${
                activeSwatch === i ? 'ring-1 ring-offset-2 ring-offset-sand-100 ring-ink-700 border-sand-50' : 'border-ink-200'
              }`}
              style={{ backgroundColor: sw.hex }}
              aria-label={sw.name}
              title={sw.name}
            />
          ))}
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="font-numeric text-ink-900 text-base font-medium">{formatPrice(product.price, currency)}</span>
          {product.originalPrice && (
            <span className="font-numeric text-ink-400 text-sm line-through font-medium">{formatPrice(product.originalPrice, currency)}</span>
          )}
        </div>

        {/* Inventory status */}
        <div className="mt-2">
          {stock === null ? (
            <span className="text-ink-400 text-sm">—</span>
          ) : stock > 0 ? (
            <span className="text-green-600 text-sm">En stock ({stock})</span>
          ) : (
            <span className="text-red-600 text-sm">Agotado</span>
          )}
        </div>

        {/* Buy on Shopify button */}
        <div className="mt-3">
          <button
            onClick={async () => {
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
            className="mt-2 w-full py-2 text-sm uppercase tracking-widest bg-blush-500 text-sand-50 hover:bg-blush-600 transition-colors"
          >
            Comprar
          </button>
        </div>
      </div>
    </div>
  );
}
