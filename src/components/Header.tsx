import { Search, Heart, ShoppingBag, Menu, X, User, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
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
    setScrolled(false);
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    navigate('/');
  };
  const goToCollection = () => {
    navigate('/collections/coleccion-2026');
  };

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [womenDropdown, setWomenDropdown] = useState(false);
  const [mobileWomenOpen, setMobileWomenOpen] = useState(false);
  const [currencyMenuOpen, setCurrencyMenuOpen] = useState(false);
  const currencyMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const syncHeaderState = () => setScrolled(window.scrollY > 40);
    syncHeaderState();
    window.addEventListener('scroll', syncHeaderState, { passive: true });
    return () => window.removeEventListener('scroll', syncHeaderState);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (currencyMenuRef.current && !currencyMenuRef.current.contains(event.target as Node)) {
        setCurrencyMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      {/* Announcement bar */}
      <div className="fixed left-0 right-0 top-0 z-50 bg-ink-900 text-sand-100 overflow-hidden">
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
        className={`${
          isHome && !scrolled
            ? 'fixed left-0 right-0 top-[37px] text-sand-50'
            : 'fixed left-0 right-0 top-[37px] bg-sand-50 shadow-[0_1px_0_0_rgba(26,22,17,0.08)] text-ink-800'
        } z-40 transition-[background-color,color,box-shadow] duration-500 ease-out`}
      >
          <div className="relative flex h-[72px] items-center lg:h-[84px]">
            {/* Left nav (desktop) */}
            <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 lg:flex">
              <button
                onClick={goToCollection}
                className="text-[11px] uppercase tracking-widest text-current hover:text-blush-300 link-underline"
              >
                {navLinks[0].label}
              </button>
              {/* Mujeres dropdown */}
              <div
                className="relative group"
                onMouseEnter={() => setWomenDropdown(true)}
                onMouseLeave={() => setWomenDropdown(false)}
              >
                <button
                  className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-current hover:text-blush-300 transition-colors"
                >
                  Mujeres
                  <ChevronDown size={14} strokeWidth={2} className={`transition-transform duration-300 ${womenDropdown ? 'rotate-180' : ''}`} />
                </button>
                <div
                  className={`absolute top-full left-0 pt-3 transition-all duration-300 ease-out ${
                    womenDropdown
                      ? 'visible translate-y-0 opacity-100'
                      : 'invisible -translate-y-2 opacity-0'
                  }`}
                >
                  <div className="bg-sand-50 shadow-[0_18px_40px_rgba(22,18,15,0.08)] border border-ink-100 py-4 px-6 min-w-max z-50">
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
                </div>
              </div>
              <button
                onClick={() => navigate('/pages/viajes-grupales')}
                className="text-[11px] uppercase tracking-widest text-current hover:text-blush-300 link-underline"
              >
                Viajes Grupales
              </button>
              {navLinks.slice(2).map((link) => (
                <button
                  key={link.label}
                  onClick={() => goToCategory(link.label)}
                  className={`text-[11px] uppercase tracking-widest link-underline ${link.label === 'Sale' ? 'text-blush-300 hover:text-blush-100' : 'text-current hover:text-blush-300'}`}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden absolute left-4 z-20 flex h-10 w-10 items-center justify-center text-sand-50 transition-colors hover:text-blush-300"
              aria-label="Abrir menú"
            >
              <Menu size={22} strokeWidth={1.8} className="text-white" />
            </button>

            {/* Logo */}
            <button
              onClick={handleLogoClick}
              className="relative z-10 mx-auto flex items-center justify-center lg:absolute lg:left-6 lg:mx-0"
              aria-label="Marianela Vieira inicio"
              type="button"
            >
              <img
                src={logo}
                alt="Marianela Vieira logo"
                className={`h-[82px] w-auto max-w-[250px] object-contain sm:h-[90px] sm:max-w-[270px] lg:h-24 lg:max-w-[420px] ${isHome && !scrolled ? 'brightness-0 invert' : ''}`}
              />
            </button>

            {/* Right nav (desktop) */}
            <div className="ml-auto hidden items-center gap-4 pr-10 lg:flex lg:gap-5 lg:pr-12 xl:pr-14">
              <div className="flex items-center gap-4 lg:gap-5">
                <div ref={currencyMenuRef} className="relative hidden xl:block">
                  <button
                    type="button"
                    onClick={() => setCurrencyMenuOpen((open) => !open)}
                    className={`flex items-center gap-2 rounded-full border px-3 py-1.5 pr-2 text-[10px] uppercase tracking-[0.2em] shadow-[0_8px_24px_rgba(17,13,10,0.06)] backdrop-blur-sm transition-all duration-200 ${
                      isHome && !scrolled
                        ? 'border-white/35 bg-white/10 text-sand-50 hover:bg-white/15'
                        : 'border-ink-200 bg-sand-50 text-ink-700 hover:border-ink-300 hover:bg-sand-100'
                    }`}
                    aria-label="Seleccionar moneda"
                  >
                    <span>{currency}</span>
                    <ChevronDown
                      size={12}
                      strokeWidth={2}
                      className={`transition-transform duration-200 ${currencyMenuOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {currencyMenuOpen && (
                    <div className="absolute right-0 top-[calc(100%+8px)] z-50 min-w-[110px] rounded-2xl border border-ink-100 bg-white/95 p-1.5 shadow-[0_18px_40px_rgba(22,18,15,0.12)] backdrop-blur-md">
                      {currencyOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            onCurrencyChange(option);
                            setCurrencyMenuOpen(false);
                          }}
                          className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-[10px] uppercase tracking-[0.18em] transition-colors ${
                            option === currency
                              ? 'bg-ink-900 text-sand-50'
                              : 'text-ink-700 hover:bg-ink-50'
                          }`}
                        >
                          <span>{option}</span>
                          <span className="text-[9px] opacity-70">{option === 'PEN' ? 'S/' : option === 'USD' ? '$' : '€'}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  onClick={onOpenSearch}
                  className="text-current hover:text-blush-500 transition-colors"
                  aria-label="Buscar"
                >
                  <Search size={19} strokeWidth={1.5} />
                </button>
                <a
                  href={getShopifyAccountLoginUrl()}
                  className="hidden sm:block text-current hover:text-blush-500 transition-colors"
                  aria-label="Mi cuenta"
                >
                  <User size={19} strokeWidth={1.5} />
                </a>
                <button
                  onClick={onOpenWishlist}
                  className="hidden sm:block text-current hover:text-blush-500 transition-colors"
                  aria-label="Favoritos"
                >
                  <Heart size={19} strokeWidth={1.5} />
                </button>
                <button
                  onClick={onOpenCart}
                  className="relative text-current hover:text-blush-500 transition-colors"
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
            <div className="lg:hidden absolute right-4 top-1/2 z-20 flex -translate-y-1/2 items-center gap-3">
              <button
                onClick={onOpenSearch}
                className="text-white hover:text-blush-300 transition-colors"
                aria-label="Buscar"
              >
                <Search size={19} strokeWidth={1.5} />
              </button>
              <button
                onClick={onOpenCart}
                className="relative text-white hover:text-blush-300 transition-colors"
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
          <nav className="flex flex-col items-center px-6 py-8 gap-1">
            <button
              onClick={() => {
                goToCollection();
                setMobileOpen(false);
              }}
              className="w-full py-4 font-serif text-2xl border-b border-ink-100 text-ink-800 hover:text-blush-500 transition-colors text-center"
            >
              {navLinks[0].label}
            </button>
            {/* Mobile Mujeres dropdown */}
            <button
              onClick={() => setMobileWomenOpen(!mobileWomenOpen)}
              className="flex w-full items-center justify-center gap-2 py-4 font-serif text-2xl border-b border-ink-100 text-ink-800 hover:text-blush-500 transition-colors"
            >
              <span>Mujeres</span>
              <ChevronDown size={20} strokeWidth={2} className={`transition-transform ${mobileWomenOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileWomenOpen && (
              <div className="w-full bg-ink-50 flex flex-col gap-0">
                {womenMenuSubcategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      goToCategory(cat);
                      setMobileOpen(false);
                      setMobileWomenOpen(false);
                    }}
                    className="w-full text-center py-3 text-sm uppercase tracking-widest text-ink-700 hover:text-blush-500 transition-colors border-b border-ink-100"
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
              className="w-full py-4 font-serif text-2xl border-b border-ink-100 text-ink-800 hover:text-blush-500 transition-colors text-center"
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
                className={`w-full py-4 font-serif text-2xl border-b border-ink-100 transition-colors text-center ${
                  link.label === 'Sale' ? 'text-blush-500' : 'text-ink-800 hover:text-blush-500'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="flex items-center justify-center gap-6 pt-8 text-ink-600">
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
