import { Search, Heart, ShoppingBag, Menu, X, User, ChevronDown, Globe } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { categorySlugs, navLinks, womenMenuSubcategories } from '@/data/catalog';
import { currencyOptions, type CurrencyCode } from '@/lib/currency';
import { languageOptions, languageNames, languageShortCodes, translate, translateLabel, type LanguageCode } from '@/lib/language';
import { getShopifyAccountLoginUrl } from '@/lib/shopify';
import logo from '@/assets/marianela-logo.png';

type Props = {
  cartCount: number;
  currency: CurrencyCode;
  language: LanguageCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
  onLanguageChange: (language: LanguageCode) => void;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenWishlist: () => void;
  onSelectCategory?: (categoryName: string) => void;
};

export default function Header({
  cartCount,
  currency,
  language,
  onCurrencyChange,
  onLanguageChange,
  onOpenCart,
  onOpenSearch,
  onOpenWishlist,
  onSelectCategory,
}: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '/pages/viajes-grupales';
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
  const handleLanguageChange = (option: LanguageCode) => {
    window.localStorage.setItem('marianela-language', option);
    document.documentElement.lang = option;
    onLanguageChange(option);
    setLanguageMenuOpen(false);
  };

  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [womenDropdown, setWomenDropdown] = useState(false);
  const [mobileWomenOpen, setMobileWomenOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [currencyMenuOpen, setCurrencyMenuOpen] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const languageMenuRef = useRef<HTMLDivElement | null>(null);
  const mobileLanguageMenuRef = useRef<HTMLDivElement | null>(null);
  const currencyMenuRef = useRef<HTMLDivElement | null>(null);

  const announcementMessages = [
    translate(language, 'freeShipping'),
    translate(language, 'freeReturns'),
    translate(language, 'newCollection'),
  ];
  useEffect(() => {
    const syncHeaderState = () => setScrolled(window.scrollY > 40);
    syncHeaderState();
    window.addEventListener('scroll', syncHeaderState, { passive: true });
    return () => window.removeEventListener('scroll', syncHeaderState);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedLanguageMenu = languageMenuRef.current?.contains(target) || mobileLanguageMenuRef.current?.contains(target);
      if (!clickedLanguageMenu) {
        setLanguageMenuOpen(false);
      }
      if (currencyMenuRef.current && !currencyMenuRef.current.contains(target)) {
        setCurrencyMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % announcementMessages.length);
        setIsVisible(true);
      }, 1200);
    }, 5000);

    return () => clearInterval(interval);
  }, [language, announcementMessages.length]);

  return (
    <>
      {/* Announcement bar */}
      <div className="fixed left-0 right-0 top-0 z-[1100] bg-ink-900 text-sand-100 overflow-hidden">
        <div className={`py-2.5 text-[11px] tracking-widest uppercase font-light text-center ${
          isVisible ? 'fade-in' : 'fade-out'
        }`}>
          {announcementMessages[currentMessageIndex]}
        </div>
      </div>

      {/* Main header */}
      <header
        className={`${
          isHome && !scrolled
            ? 'fixed left-0 right-0 top-[37px] bg-transparent text-sand-50 shadow-none'
            : 'fixed left-0 right-0 top-[37px] bg-sand-50 shadow-[0_1px_0_0_rgba(26,22,17,0.08)] text-ink-800'
        } z-[1000] transition-[background-color,color,box-shadow,backdrop-filter] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[background-color,box-shadow,backdrop-filter]`}
      >
          <div className="relative flex h-[72px] items-center lg:h-[84px]">
            {/* Left nav (desktop) */}
            <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-6 lg:flex">
              <button
                onClick={goToCollection}
                className="text-[11px] uppercase tracking-widest text-current hover:text-blush-300 link-underline"
              >
                {translate(language, 'collection')}
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
                  {translate(language, 'women')}
                  <ChevronDown size={14} strokeWidth={2} className={`transition-transform duration-300 ${womenDropdown ? 'rotate-180' : ''}`} />
                </button>
                <div
                  className={`absolute top-full left-0 pt-3 transition-all duration-300 ease-out ${
                    womenDropdown
                      ? 'visible translate-y-0 opacity-100'
                      : 'invisible -translate-y-2 opacity-0'
                  }`}
                >
                  <div
                    className={`min-w-max rounded-sm border py-4 px-6 shadow-[0_18px_40px_rgba(17,13,10,0.16)] backdrop-blur-md transition-colors ${
                      isHome && !scrolled
                        ? 'border-white/25 bg-ink-900/50 text-sand-100'
                        : 'border-ink-100 bg-sand-50/95 text-ink-700'
                    }`}
                  >
                    {womenMenuSubcategories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          goToCategory(cat);
                          setWomenDropdown(false);
                        }}
                        className={`block w-full text-left py-2 text-[10px] uppercase tracking-widest transition-colors whitespace-nowrap ${
                          isHome && !scrolled
                            ? 'text-sand-200 hover:text-blush-200'
                            : 'text-ink-700 hover:text-blush-500'
                        }`}
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
                {translate(language, 'groupTrips')}
              </button>
              {navLinks.slice(2).map((link) => (
                <button
                  key={link.label}
                  onClick={() => goToCategory(link.label)}
                  className={`text-[11px] uppercase tracking-widest link-underline ${link.label === 'Sale' ? 'sale-pulse' : 'text-current hover:text-blush-300'}`}
                >
                  {link.label === 'Sale' ? translate(language, 'sale') : translateLabel(language, link.label)}
                </button>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(true)}
              className={`lg:hidden absolute left-4 z-20 flex h-10 w-10 items-center justify-center transition-colors ${
                isHome && !scrolled
                  ? 'text-sand-50 hover:text-blush-300'
                  : 'text-ink-800 hover:text-blush-500'
              }`}
              aria-label="Abrir menú"
            >
              <Menu size={22} strokeWidth={1.8} />
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
                <div
                  ref={languageMenuRef}
                  className="relative hidden xl:block"
                  onMouseEnter={() => setLanguageMenuOpen(true)}
                  onMouseLeave={() => setLanguageMenuOpen(false)}
                >
                  <button
                    type="button"
                    onClick={() => setLanguageMenuOpen((open) => !open)}
                    className={`flex items-center gap-2 rounded-full border px-3 py-1.5 pr-2 text-[10px] uppercase tracking-[0.18em] shadow-[0_8px_24px_rgba(17,13,10,0.06)] backdrop-blur-sm transition-all duration-200 ${
                      isHome && !scrolled
                        ? 'border-white/35 bg-white/10 text-sand-50 hover:bg-white/15'
                        : 'border-ink-200 bg-sand-50 text-ink-700 hover:border-ink-300 hover:bg-sand-100'
                    }`}
                    aria-label="Seleccionar idioma"
                  >
                    <Globe size={12} strokeWidth={2} />
                    <span>{languageShortCodes[language]}</span>
                    <ChevronDown
                      size={12}
                      strokeWidth={2}
                      className={`transition-transform duration-200 ${languageMenuOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {languageMenuOpen && (
                    <div className="absolute right-0 top-full z-50 min-w-[180px] rounded-2xl border border-ink-100 bg-white/95 p-1.5 pt-2 shadow-[0_18px_40px_rgba(22,18,15,0.12)] backdrop-blur-md">
                      {languageOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            handleLanguageChange(option);
                          }}
                          className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-[10px] uppercase tracking-[0.18em] transition-colors ${
                            option === language
                              ? 'bg-ink-900 text-sand-50'
                              : 'text-ink-700 hover:bg-ink-50'
                          }`}
                        >
                          <span>{languageNames[option]}</span>
                          <span className="text-[9px] opacity-70">{languageShortCodes[option]}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <div
                  ref={currencyMenuRef}
                  className="relative hidden xl:block"
                  onMouseEnter={() => setCurrencyMenuOpen(true)}
                  onMouseLeave={() => setCurrencyMenuOpen(false)}
                >
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
                    <div className="absolute right-0 top-full z-50 min-w-[110px] rounded-2xl border border-ink-100 bg-white/95 p-1.5 pt-2 shadow-[0_18px_40px_rgba(22,18,15,0.12)] backdrop-blur-md">
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
                type="button"
                onClick={() => setLanguageMenuOpen((open) => !open)}
                className={`transition-colors ${
                  isHome && !scrolled
                    ? 'text-sand-50 hover:text-blush-300'
                    : 'text-ink-800 hover:text-blush-500'
                }`}
                aria-label="Seleccionar idioma"
              >
                <Globe size={18} strokeWidth={1.7} />
              </button>
              <button
                onClick={onOpenSearch}
                className={`transition-colors ${
                  isHome && !scrolled
                    ? 'text-sand-50 hover:text-blush-300'
                    : 'text-ink-800 hover:text-blush-500'
                }`}
                aria-label="Buscar"
              >
                <Search size={19} strokeWidth={1.5} />
              </button>
              <button
                onClick={onOpenCart}
                className={`relative transition-colors ${
                  isHome && !scrolled
                    ? 'text-sand-50 hover:text-blush-300'
                    : 'text-ink-800 hover:text-blush-500'
                }`}
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
            {languageMenuOpen && (
              <div ref={mobileLanguageMenuRef} className="lg:hidden absolute right-4 top-[calc(100%+8px)] z-50 w-[180px] rounded-2xl border border-ink-100 bg-white/95 p-1.5 shadow-[0_18px_40px_rgba(22,18,15,0.12)] backdrop-blur-md">
                {languageOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      handleLanguageChange(option);
                    }}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-[10px] uppercase tracking-[0.18em] transition-colors ${
                      option === language ? 'bg-ink-900 text-sand-50' : 'text-ink-700 hover:bg-ink-50'
                    }`}
                  >
                    <span>{languageNames[option]}</span>
                    <span className="text-[9px] opacity-70">{languageShortCodes[option]}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[1200] lg:hidden transition-all duration-500 ${
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
              {translate(language, 'collection')}
            </button>
            {/* Mobile Mujeres dropdown */}
            <button
              onClick={() => setMobileWomenOpen(!mobileWomenOpen)}
              className="flex w-full items-center justify-center gap-2 py-4 font-serif text-2xl border-b border-ink-100 text-ink-800 hover:text-blush-500 transition-colors"
            >
              <span>{translate(language, 'women')}</span>
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
              {translate(language, 'groupTrips')}
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
                {link.label === 'Sale' ? translate(language, 'sale') : translateLabel(language, link.label)}
              </button>
            ))}
            <div className="flex items-center justify-center gap-6 pt-8 text-ink-600">
              <a
                href={getShopifyAccountLoginUrl()}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 text-sm tracking-wide hover:text-blush-500"
              >
                <User size={18} strokeWidth={1.5} /> {language === 'es' ? 'Mi Cuenta' : 'Account'}
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
