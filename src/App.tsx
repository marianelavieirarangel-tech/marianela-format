import { useEffect, useState } from 'react';
import { Routes, Route, useParams, useNavigate, useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CategoryGrid from '@/components/CategoryGrid';
import FeaturedProducts from '@/components/FeaturedProducts';
import EditorialBanner from '@/components/EditorialBanner';
import CategoryProducts from '@/components/CategoryProducts';
import ProductDetail from '@/components/ProductDetail';
import CheckoutPage from '@/components/CheckoutPage';
import Footer from '@/components/Footer';
import QuickAddModal, { type CartItem } from '@/components/QuickAddModal';
import CartDrawer from '@/components/CartDrawer';
import SearchOverlay from '@/components/SearchOverlay';
import WishlistDrawer from '@/components/WishlistDrawer';
import NewsletterModal from '@/components/NewsletterModal';
import InfoPage from '@/components/InfoPage';
import CookiePreferences from '@/components/CookiePreferences';
import type { Product } from '@/data/catalog';
import { categorySlugs, products, navLinks, womenSubcategories, hiddenCategoryNames } from '@/data/catalog';
import { currencyOptions, type CurrencyCode } from '@/lib/currency';
import { createShopifyCheckout, fetchShopifyProducts, isShopifyEnabled } from '@/lib/shopify';

const CART_STORAGE_KEY = 'marianela-cart';
const CART_ID_STORAGE_KEY = 'marianela-cart-id';
const WISHLIST_STORAGE_KEY = 'marianela-wishlist';

function readStoredCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored = JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) || '[]');
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
}

function readStoredCartId(): string | null {
  if (typeof window === 'undefined') return null;
  return window.localStorage.getItem(CART_ID_STORAGE_KEY);
}

function readStoredWishlist(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const stored = JSON.parse(window.localStorage.getItem(WISHLIST_STORAGE_KEY) || '[]');
    return new Set(Array.isArray(stored) ? stored : []);
  } catch {
    return new Set();
  }
}

export default function App() {
  const location = useLocation();
  const [quickAddProduct, setQuickAddProduct] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>(readStoredCart);
  const [cartId, setCartId] = useState<string | null>(readStoredCartId);
  const [wishlist, setWishlist] = useState<Set<string>>(readStoredWishlist);
  const [catalogProducts, setCatalogProducts] = useState(products.filter((product) => !hiddenCategoryNames.has(product.category)));
  const [catalogError, setCatalogError] = useState<string | null>(null);
  const [currency, setCurrency] = useState<CurrencyCode>('PEN');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (cartId) window.localStorage.setItem(CART_ID_STORAGE_KEY, cartId);
    else window.localStorage.removeItem(CART_ID_STORAGE_KEY);
  }, [cartId]);

  useEffect(() => {
    window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify([...wishlist]));
  }, [wishlist]);

  useEffect(() => {
    if (!isShopifyEnabled()) return;
    fetchShopifyProducts()
      .then((shopifyProducts) => {
        const filteredShopifyProducts = shopifyProducts.filter((product) => !hiddenCategoryNames.has(product.category));
        if (filteredShopifyProducts.length === 0) {
          throw new Error('Shopify no devolvió productos publicados.');
        }
        setCatalogProducts(filteredShopifyProducts);
      })
      .catch((error) => {
        const message = error instanceof Error ? error.message : 'Error desconocido de Shopify.';
        setCatalogError(message);
        console.error('No se pudo cargar el catálogo de Shopify:', error);
      });
  }, []);

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  const handleAddToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.findIndex(
        (i) => i.product.id === item.product.id && i.size === item.size && i.color === item.color
      );
      if (existing >= 0) {
        const next = [...prev];
        next[existing] = { ...next[existing], quantity: next[existing].quantity + item.quantity };
        return next;
      }
      return [...prev, item];
    });
    setCartOpen(true);
    if (selectedProduct) {
      setSelectedProduct(null);
    }
  };

  const handleUpdateQty = (index: number, qty: number) => {
    setCart((prev) => prev.map((item, i) => (i === index ? { ...item, quantity: qty } : item)));
  };

  const handleRemove = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const openQuickAdd = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleDirectCheckout = async () => {
    if (!cart.length) return;
    const items = cart.map((item) => ({
      variantId: item.product.shopifyVariantId,
      quantity: item.quantity,
    }));
    if (items.some((item) => !item.variantId)) {
      throw new Error('Este producto no tiene una variante de Shopify disponible.');
    }
    const checkout = await createShopifyCheckout(items, cartId);
    if (checkout.cartId && checkout.cartId !== cartId) setCartId(checkout.cartId);
    window.location.href = checkout.checkoutUrl;
  };

  function ProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = catalogProducts.find((p) => p.id === id);
    if (!product) return <div className="p-8">Producto no encontrado.</div>;
    return (
      <ProductDetail
        product={product}
        currency={currency}
        onBack={() => navigate(-1)}
        onAddToCart={handleAddToCart}
        isWishlisted={wishlist.has(product.id)}
        onToggleWishlist={toggleWishlist}
      />
    );
  }

  function CategoryRoute() {
    const { slug } = useParams();
    const navigate = useNavigate();
    const deslug = (s = '') =>
      s
        .toString()
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());

    // try to match existing category names first
    const candidates = [...womenSubcategories, ...navLinks.map((n) => n.label)];
    const match = candidates.find((c) => (categorySlugs[c] ?? c) === slug);
    const categoryName = match || deslug(slug);

    return (
      <CategoryProducts
        categoryName={categoryName}
        products={catalogProducts}
        currency={currency}
        onQuickAdd={openQuickAdd}
        onToggleWishlist={toggleWishlist}
        wishlist={wishlist}
        onBack={() => navigate(-1)}
      />
    );
  }

  const homeContent = (
    <>
      {catalogError && (
        <div className="bg-blush-100 px-6 py-3 text-center text-sm text-ink-800">
          No se pudo cargar Shopify: {catalogError}. Mostrando catálogo de respaldo.
        </div>
      )}
      <Hero />
      <CategoryGrid />
      <FeaturedProducts products={catalogProducts} currency={currency} onQuickAdd={openQuickAdd} onToggleWishlist={toggleWishlist} wishlist={wishlist} />
      <EditorialBanner />
    </>
  );

  return (
    <div className="min-h-screen bg-sand-50">
      <Header
        cartCount={cartCount}
        currency={currency}
        onCurrencyChange={setCurrency}
        onOpenCart={() => setCartOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
      />

      <main>
        <Routes>
          <Route
            path="/"
            element={checkoutOpen ? (
                <CheckoutPage
                  items={cart}
                  currency={currency}
                  onClose={() => setCheckoutOpen(false)}
                  onUpdateQty={handleUpdateQty}
                  onRemove={handleRemove}
                />
              ) : (
                homeContent
              )}
          />

          <Route path="/category/:slug" element={<CategoryRoute />} />
          <Route path="/collections/:slug" element={<CategoryRoute />} />
          <Route path="/collection/:slug" element={<CategoryRoute />} />
          <Route path="/:slug" element={<CategoryRoute />} />

          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/pages/:slug" element={<InfoPage />} />
          <Route path="/policies/:slug" element={<InfoPage />} />
        </Routes>
      </main>

      <Footer />

      {/* Overlays */}
      <QuickAddModal
        product={quickAddProduct}
        currency={currency}
        onClose={() => setQuickAddProduct(null)}
        onAddToCart={handleAddToCart}
      />
      <CartDrawer
        open={cartOpen}
        items={cart}
        currency={currency}
        onClose={() => setCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemove}
        onCheckout={handleDirectCheckout}
      />
      <SearchOverlay
        products={catalogProducts}
        open={searchOpen}
        currency={currency}
        onClose={() => setSearchOpen(false)}
        onSelect={(p) => {
          setSearchOpen(false);
          setQuickAddProduct(p);
        }}
      />
      <WishlistDrawer
        products={catalogProducts}
        open={wishlistOpen}
        wishlist={wishlist}
        currency={currency}
        onClose={() => setWishlistOpen(false)}
        onSelect={(p) => {
          setWishlistOpen(false);
          setQuickAddProduct(p);
        }}
      />
      <NewsletterModal />
      <CookiePreferences />
    </div>
  );
}
