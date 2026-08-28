import { Search, Heart, ShoppingBag, Menu, X, User, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { categorySlugs, navLinks, womenMenuSubcategories } from '@/data/catalog';
import { currencyOptions, type CurrencyCode } from '@/lib/currency';
import { getShopifyAccountLoginUrl } from '@/lib/shopify';
import logo from '@/assets/marianela-logo.png';

type Props = {
  cartCount: number;
  currency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenWishlist: () => void;
  onSelectCategory?: (categoryName: string) => void;
};

export default function Header({
  cartCount,
  currency,
  onCurrencyChange,
  onOpenCart,
  onOpenSearch,
  onOpenWishlist,
  onSelectCategory,
}: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const slugify = (s: string) =>
    s
      .toString()
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  const goToCategory = (categoryName: string) => {
    const slug = categorySlugs[categoryName] ?? slugify(categoryName);
    onSelectCategory?.(categoryName);
    navigate(`/collections/${slug}`);
  };
  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    navigate('/');
  };
  const goToCollection = () => {
    navigate('/');
    window.setTimeout(() => document.getElementById('novedades')?.scrollIntoView({ behavior: 'smooth' }), 0);
  };

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [womenDropdown, setWomenDropdown] = useState(false);
  const [mobileWomenOpen, setMobileWomenOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-ink-900 text-sand-100 overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee py-2.5 text-[11px] tracking-widest uppercase font-light">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex shrink-0">
              <span className="px-8">Envío gratis por compras superiores a $120</span>
              <span className="px-8 text-blush-300">·</span>
              <span className="px-8">Devoluciones gratuitas en 30 días</span>
              <span className="px-8 text-blush-300">·</span>
              <span className="px-8">Nueva colección — Primavera 2026</span>
              <span className="px-8 text-blush-300">·</span>
              <span className="px-8">Envío gratis por compras superiores a $120</span>
              <span className="px-8 text-blush-300">·</span>
              <span className="px-8">Devoluciones gratuitas en 30 días</span>
              <span className="px-8 text-blush-300">·</span>
              <span className="px-8">Nueva colección — Primavera 2026</span>
              <span className="px-8 text-blush-300">·</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main header */}
      <header
        className={`${isHome && !scrolled ? 'absolute left-0 right-0 top-[37px] bg-ink-900/15 text-sand-50' : 'fixed left-0 right-0 top-0 bg-sand-50/95 text-ink-800 shadow-[0_1px_0_0_rgba(26,22,17,0.08)]'} z-40 transition-all duration-500 backdrop-blur-md`}
      >
          <div className="grid grid-cols-[1fr_auto_1fr] items-center h-[72px] lg:h-[84px]">
            {/* Left nav (desktop) */}
            <nav className="hidden lg:flex items-center gap-6 justify-self-start">
              <button
                onClick={goToCollection}
                className="text-[11px] uppercase tracking-widest text-ink-700 hover:text-ink-900 link-underline"
              >
              </button>
              {/* Mujeres dropdown */}
              <div className="relative group">
                <button
                  onMouseEnter={() => setWomenDropdown(true)}
                  onMouseLeave={() => setWomenDropdown(false)}
                  className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-ink-700 hover:text-ink-900 transition-colors"
                >
                  Mujeres
                  <ChevronDown size={14} strokeWidth={2} className={`transition-transform ${womenDropdown ? 'rotate-180' : ''}`} />
                </button>
                {womenDropdown && (
                  <div
                    onMouseEnter={() => setWomenDropdown(true)}
                    onMouseLeave={() => setWomenDropdown(false)}
                    className="absolute top-full left-0 bg-sand-50 shadow-lg border border-ink-100 py-4 px-6 min-w-max z-50"
                  >
                    {womenMenuSubcategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          goToCategory(cat);
                          setWomenDropdown(false);
                        }}
                        className="block w-full text-left py-2 text-[10px] uppercase tracking-widest text-ink-700 hover:text-blush-500 transition-colors whitespace-nowrap"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={() => navigate('/pages/viajes-grupales')}
                className="text-[11px] uppercase tracking-widest text-ink-700 hover:text-ink-900 link-underline"
              >
                Viajes Grupales
              </button>
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden text-ink-800 hover:text-blush-500 transition-colors justify-self-start"
              aria-label="Abrir menú"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>

            {/* Logo */}
            <button
              onClick={handleLogoClick}
              className="flex items-center justify-center justify-self-center -translate-y-1 sm:-translate-y-1.5 lg:-translate-y-2"
              aria-label="Marianela Vieira inicio"
              type="button"
            >
              <img
                src={logo}
                alt="Marianela Vieira logo"
                className={`h-20 w-auto max-w-[380px] object-contain sm:h-24 lg:h-30 ${isHome && !scrolled ? 'brightness-0 invert' : ''}`}
              />
            </button>

            {/* Right nav (desktop) */}
            <div className="hidden lg:flex items-center justify-self-end gap-6">
              <nav className="flex items-center gap-6">
                {navLinks.slice(2).map((link) => (
                  <button
                    key={link.label}
                    onClick={() => goToCategory(link.label)}
                    className={`text-[11px] uppercase tracking-widest link-underline ${
                      link.label === 'Sale' ? 'text-blush-500 hover:text-blush-700' : 'text-ink-700 hover:text-ink-900'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
              </nav>

              <div className="flex items-center gap-4 lg:gap-5">
                <label className="relative hidden xl:block">
                  <span className="sr-only">Moneda</span>
                  <select
                    value={currency}
                    onChange={(event) => onCurrencyChange(event.target.value as CurrencyCode)}
                    className="appearance-none rounded-full border border-ink-200 bg-sand-50 px-3 py-1.5 pr-8 text-[10px] uppercase tracking-[0.2em] text-ink-700 outline-none transition-colors hover:border-ink-400"
                  >
                    {currencyOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={12} strokeWidth={2} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-500" />
                </label>
                <button
                  onClick={onOpenSearch}
                  className="text-ink-800 hover:text-blush-500 transition-colors"
                  aria-label="Buscar"
                >
                  <Search size={19} strokeWidth={1.5} />
                </button>
                <a
                  href={getShopifyAccountLoginUrl()}
                  className="hidden sm:block text-ink-800 hover:text-blush-500 transition-colors"
                  aria-label="Mi cuenta"
                >
                  <User size={19} strokeWidth={1.5} />
                </a>
                <button
                  onClick={onOpenWishlist}
                  className="hidden sm:block text-ink-800 hover:text-blush-500 transition-colors"
                  aria-label="Favoritos"
                >
                  <Heart size={19} strokeWidth={1.5} />
                </button>
                <button
                  onClick={onOpenCart}
                  className="relative text-ink-800 hover:text-blush-500 transition-colors"
                  aria-label="Bolsa de compras"
                >
                  <ShoppingBag size={19} strokeWidth={1.5} />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-blush-500 text-sand-50 text-[9px] font-medium w-4 h-4 rounded-full flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Mobile icons */}
            <div className="lg:hidden flex items-center gap-3 justify-self-end">
              <label className="relative">
                <span className="sr-only">Moneda</span>
                <select
                  value={currency}
                  onChange={(event) => onCurrencyChange(event.target.value as CurrencyCode)}
                  className="appearance-none rounded-full border border-ink-200 bg-sand-50 px-2.5 py-1 pr-6 text-[10px] uppercase tracking-[0.2em] text-ink-700 outline-none"
                >
                  {currencyOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <ChevronDown size={10} strokeWidth={2} className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 text-ink-500" />
              </label>
              <button
                onClick={onOpenSearch}
                className="text-ink-800 hover:text-blush-500 transition-colors"
                aria-label="Buscar"
              >
                <Search size={19} strokeWidth={1.5} />
              </button>
              <button
                onClick={onOpenCart}
                className="relative text-ink-800 hover:text-blush-500 transition-colors"
                aria-label="Bolsa de compras"
              >
                <ShoppingBag size={19} strokeWidth={1.5} />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blush-500 text-sand-50 text-[9px] font-medium w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-500 ${
          mobileOpen ? 'visible' : 'invisible'
        }`}
      >
        <div
          className={`absolute inset-0 bg-ink-900/40 backdrop-blur-sm transition-opacity duration-500 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={`absolute left-0 top-0 h-full w-[78%] max-w-sm bg-sand-50 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between px-6 h-20 border-b border-ink-100">
            <span className="font-serif text-xl tracking-widest">MENU</span>
            <button onClick={() => setMobileOpen(false)} aria-label="Cerrar menú">
              <X size={22} strokeWidth={1.5} className="text-ink-800" />
            </button>
          </div>
          <nav className="flex flex-col px-6 py-8 gap-1">
            <button
              onClick={() => {
                goToCollection();
                setMobileOpen(false);
              }}
              className="py-4 font-serif text-2xl border-b border-ink-100 text-ink-800 hover:text-blush-500 transition-colors"
            >
              {navLinks[0].label}
            </button>
            {/* Mobile Mujeres dropdown */}
            <button
              onClick={() => setMobileWomenOpen(!mobileWomenOpen)}
              className="flex items-center justify-between py-4 font-serif text-2xl border-b border-ink-100 text-ink-800 hover:text-blush-500 transition-colors w-full"
            >
              Mujeres
              <ChevronDown size={20} strokeWidth={2} className={`transition-transform ${mobileWomenOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileWomenOpen && (
              <div className="bg-ink-50 flex flex-col gap-0">
                {womenMenuSubcategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      goToCategory(cat);
                      setMobileOpen(false);
                      setMobileWomenOpen(false);
                    }}
                    className="w-full text-left py-3 pl-4 text-sm uppercase tracking-widest text-ink-700 hover:text-blush-500 transition-colors border-b border-ink-100"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
            <button
              onClick={() => {
                navigate('/pages/viajes-grupales');
                setMobileOpen(false);
              }}
              className="py-4 font-serif text-2xl border-b border-ink-100 text-ink-800 hover:text-blush-500 transition-colors"
            >
              Viajes Grupales
            </button>
            {navLinks.slice(2).map((link) => (
              <button
                key={link.label}
                onClick={() => {
                  goToCategory(link.label);
                  setMobileOpen(false);
                }}
                className={`py-4 font-serif text-2xl border-b border-ink-100 transition-colors ${
                  link.label === 'Sale' ? 'text-blush-500' : 'text-ink-800 hover:text-blush-500'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="flex items-center gap-6 pt-8 text-ink-600">
              <a
                href={getShopifyAccountLoginUrl()}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 text-sm tracking-wide hover:text-blush-500"
              >
                <User size={18} strokeWidth={1.5} /> Mi Cuenta
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
