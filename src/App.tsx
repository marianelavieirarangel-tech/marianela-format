import { useState } from 'react';
import { Routes, Route, useParams, useNavigate } from 'react-router-dom';
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
import type { Product } from '@/data/catalog';
import { products } from '@/data/catalog';

export default function App() {
  const [quickAddProduct, setQuickAddProduct] = useState<Product | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

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

  function ProductPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = products.find((p) => p.id === id);
    if (!product) return <div className="p-8">Producto no encontrado.</div>;
    return (
      <ProductDetail
        product={product}
        onBack={() => navigate(-1)}
        onAddToCart={handleAddToCart}
        isWishlisted={wishlist.has(product.id)}
        onToggleWishlist={toggleWishlist}
      />
    );
  }

  const homeContent = (
    <>
      <Hero />
      <CategoryGrid onSelectCategory={setSelectedCategory} />
      <FeaturedProducts onQuickAdd={openQuickAdd} onToggleWishlist={toggleWishlist} wishlist={wishlist} />
      <EditorialBanner />
    </>
  );

  return (
    <div className="min-h-screen bg-sand-50">
      <Header
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onSelectCategory={setSelectedCategory}
      />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              checkoutOpen ? (
                <CheckoutPage
                  items={cart}
                  onClose={() => setCheckoutOpen(false)}
                  onUpdateQty={handleUpdateQty}
                  onRemove={handleRemove}
                />
              ) : selectedCategory ? (
                <CategoryProducts
                  categoryName={selectedCategory}
                  onQuickAdd={openQuickAdd}
                  onToggleWishlist={toggleWishlist}
                  wishlist={wishlist}
                  onBack={() => setSelectedCategory(null)}
                />
              ) : (
                homeContent
              )
            }
          />

          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </main>

      <Footer />

      {/* Overlays */}
      <QuickAddModal
        product={quickAddProduct}
        onClose={() => setQuickAddProduct(null)}
        onAddToCart={handleAddToCart}
      />
      <CartDrawer
        open={cartOpen}
        items={cart}
        onClose={() => setCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemove}
        onCheckout={() => setCheckoutOpen(true)}
      />
      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
        onSelect={(p) => {
          setSearchOpen(false);
          setQuickAddProduct(p);
        }}
      />
      <WishlistDrawer
        open={wishlistOpen}
        wishlist={wishlist}
        onClose={() => setWishlistOpen(false)}
        onSelect={(p) => {
          setWishlistOpen(false);
          setQuickAddProduct(p);
        }}
      />
      <NewsletterModal />
    </div>
  );
}
