import { Search, Heart, ShoppingBag, Menu, X, User, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { categorySlugs, navLinks, womenMenuSubcategories } from '@/data/catalog';

type Props = {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenWishlist: () => void;
  onSelectCategory?: (categoryName: string) => void;
};

export default function Header({ cartCount, onOpenCart, onOpenSearch, onOpenWishlist, onSelectCategory }: Props) {
  const navigate = useNavigate();
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
        className={`sticky top-0 z-40 transition-all duration-500 ${
          scrolled
            ? 'bg-sand-50/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(26,22,17,0.08)]'
            : 'bg-sand-50/80 backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Left nav (desktop) */}
            <nav className="hidden lg:flex items-center gap-8 flex-1">
              <button
                onClick={() => goToCategory(navLinks[0].label)}
                className="text-[11px] uppercase tracking-widest text-ink-700 hover:text-ink-900 link-underline"
              >
                {navLinks[0].label}
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
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden text-ink-800 hover:text-blush-500 transition-colors"
              aria-label="Abrir menú"
            >
              <Menu size={22} strokeWidth={1.5} />
            </button>

            {/* Logo */}
            <Link to="/" className="flex flex-col items-center lg:flex-1 lg:justify-center">
              <span className="font-serif text-2xl lg:text-3xl tracking-[0.15em] text-ink-900 leading-none">
                MARIANELA VIEIRA
              </span>
            </Link>

            {/* Right nav (desktop) */}
            <nav className="hidden lg:flex items-center gap-8 flex-1 justify-end">
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

            {/* Icons */}
            <div className="flex items-center gap-4 lg:gap-5 lg:ml-6">
              <button
                onClick={onOpenSearch}
                className="text-ink-800 hover:text-blush-500 transition-colors"
                aria-label="Buscar"
              >
                <Search size={19} strokeWidth={1.5} />
              </button>
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
                goToCategory(navLinks[0].label);
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
              <button className="flex items-center gap-2 text-sm tracking-wide hover:text-blush-500">
                <User size={18} strokeWidth={1.5} /> Mi Cuenta
              </button>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
