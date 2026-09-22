import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Share2, ArrowLeft, Minus, Plus, MessageCircle } from 'lucide-react';
import { formatProductName, localizedProductName, type Product } from '@/data/catalog';
import type { CartItem } from '@/components/QuickAddModal';
import { formatPrice, type CurrencyCode } from '@/lib/currency';
import { translateLabel, type LanguageCode } from '@/lib/language';

type Props = {
  product: Product;
  currency: CurrencyCode;
  onBack: () => void;
  onAddToCart: (item: CartItem) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  language: LanguageCode;
  initialColor?: string;
};

const fallbackSizes = ['XS', 'S', 'M', 'L', 'XL'] as const;

export default function ProductDetail({
  product,
  currency,
  onBack,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  language,
  initialColor,
}: Props) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [sizeError, setSizeError] = useState(false);
  const initialSwatch = product.swatches.find((swatch) => swatch.name === initialColor) ?? product.swatches[0];
  const [selectedColor, setSelectedColor] = useState<string>(initialSwatch?.name || '');
  const [showAllColors, setShowAllColors] = useState(false);
  const sizes = product.sizes?.length ? product.sizes : fallbackSizes;
  const gallery = product.images?.length ? product.images : [product.image];
  const [selectedImage, setSelectedImage] = useState(gallery[0]);
  const displayName = localizedProductName(product.name, language);
  const productUrl = typeof window !== 'undefined' ? window.location.href : '';
  const waMessage = [
    'Hola Marianela, quiero consultar este producto:',
    '',
    `*${displayName}*`,
    `Precio: ${formatPrice(product.price, currency)}`,
    selectedColor ? `Color: ${selectedColor}` : '',
    selectedSize ? `Talla: ${selectedSize}` : '',
    '',
    `URL: ${productUrl}`,
  ].filter(Boolean).join('\n');
  const waLink = `https://wa.me/51949217304?text=${encodeURIComponent(waMessage)}`;

  useEffect(() => {
    setSelectedImage(product.images?.length ? product.images[0] : product.image);
    const selectedSwatch = product.swatches.find((swatch) => swatch.name === initialColor) ?? product.swatches[0];
    setSelectedColor(selectedSwatch?.name || '');
    if (initialColor && selectedSwatch?.image) setSelectedImage(selectedSwatch.image);
    setShowAllColors(false);
    setSelectedSize('');
    setSizeError(false);
    setQuantity(1);
  }, [initialColor, product]);

  const handleSelectColor = (swatch: Product['swatches'][number]) => {
    setSelectedColor(swatch.name);
    if (swatch.image) setSelectedImage(swatch.image);
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      setSizeError(true);
      return;
    }
    setSizeError(false);
    onAddToCart({
      product,
      quantity,
      size: selectedSize,
      color: selectedColor,
    });
  };

  const handleShare = async () => {
    const url = window.location.href;
    const title = formatProductName(product.name);
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      alert('Enlace copiado');
    } catch {
      // user cancelled share
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f4ef]">
      <div className="mx-auto max-w-7xl px-6 pt-6 pb-10 lg:px-10 lg:pt-8 lg:pb-16">
        <button
          type="button"
          onClick={onBack}
          className="mb-8 flex items-center gap-2 text-[#5b4f49] transition-colors hover:text-[#ba826b]"
        >
          <ArrowLeft size={18} strokeWidth={1.5} />
          <span className="text-[11px] uppercase tracking-[0.22em]">{translateLabel(language, 'Volver')}</span>
        </button>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="overflow-hidden rounded-[28px] bg-[#f3eee9] shadow-[0_18px_40px_rgba(56,35,26,0.06)]">
              <div className="aspect-[3/4]">
                <img
                  src={selectedImage}
                  alt={displayName}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
            {gallery.length > 1 && (
              <div className="grid grid-cols-4 gap-3" aria-label="Galería de imágenes">
                {gallery.map((image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() => setSelectedImage(image)}
                    className={`aspect-[3/4] overflow-hidden rounded-2xl border transition-all ${
                      selectedImage === image
                        ? 'border-[#1b1714] ring-1 ring-[#1b1714]/20'
                        : 'border-transparent opacity-80 hover:opacity-100'
                    }`}
                    aria-label={`Ver imagen ${index + 1}`}
                  >
                    <img src={image} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col lg:pt-2">
            <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-[#bb8a7d]">{product.category}</p>

            {product.tag && (
              <div className="mb-4">
                <span className="inline-block rounded-full bg-[#1b1714] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#f8f1eb]">
                  {product.tag}
                </span>
              </div>
            )}

            <h1 className="mb-5 font-serif text-4xl font-light tracking-wide text-[#1b1714] lg:text-5xl">
              {displayName}
            </h1>

            <div className="mb-8 flex items-baseline gap-3 border-b border-[#eadfce] pb-8">
              <span className="font-numeric text-3xl font-medium text-[#1b1714]">
                {formatPrice(product.price, currency)}
              </span>
              {product.originalPrice && (
                <span className="font-numeric text-lg font-medium text-[#8f7e76] line-through">
                  {formatPrice(product.originalPrice, currency)}
                </span>
              )}
            </div>

            <p className="mb-10 text-base font-light leading-relaxed text-[#5b4f49]">
              {product.description}
            </p>

            {product.swatches.length > 0 && (
              <div className="mb-8">
                <div className="mb-4 flex items-baseline gap-2">
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#1b1714]">{translateLabel(language, 'Color')}</p>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#8f7e76]">·</span>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#8f7e76]">{selectedColor}</p>
                </div>
                <div className="grid max-w-[22rem] grid-cols-5 gap-0 border-l border-t border-[#d9d0c8]">
                  {(showAllColors ? product.swatches : product.swatches.slice(0, 9)).map((swatch) => (
                    <button
                      key={swatch.name}
                      type="button"
                      onClick={() => handleSelectColor(swatch)}
                      className={`relative aspect-square overflow-hidden border-b border-r bg-cover bg-center transition-all ${
                        selectedColor === swatch.name
                          ? 'border-2 border-[#1b1714]'
                          : 'border-[#d9d0c8] hover:border-[#8f7e76]'
                      }`}
                      style={{
                        backgroundColor: swatch.hex,
                        ...(swatch.image ? { backgroundImage: `url("${swatch.image}")` } : {}),
                      }}
                      title={swatch.name}
                    />
                  ))}
                  {!showAllColors && product.swatches.length > 9 && (
                    <button
                      type="button"
                      onClick={() => setShowAllColors(true)}
                      className="aspect-square border-b border-r border-[#1b1714] bg-[#050505] text-xs font-medium text-white transition-colors hover:bg-[#242424]"
                      aria-label={`Mostrar ${product.swatches.length - 9} colores más`}
                    >
                      +{product.swatches.length - 9}
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className="mb-8">
              <div className="mb-4 flex items-baseline justify-between gap-4">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#1b1714]">{translateLabel(language, 'Talla')}</p>
                <Link
                  to="/pages/guia-de-tallas"
                  className="text-[11px] uppercase tracking-[0.18em] text-[#bb8a7d] underline-offset-4 transition-colors hover:text-[#1b1714] hover:underline"
                >
                  {translateLabel(language, 'Guía de tallas')}
                </Link>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeError(false);
                    }}
                    className={`min-w-[3.25rem] rounded-full border px-4 py-3 text-xs font-medium uppercase tracking-[0.18em] transition-all ${
                      selectedSize === size
                        ? 'border-[#1b1714] bg-[#1b1714] text-[#f8f3ef]'
                        : 'border-[#e0d4c8] bg-white/60 text-[#1b1714] hover:border-[#1b1714]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {sizeError && (
                <p className="mt-3 text-sm font-light text-[#b46b5d]">Elige una talla para continuar.</p>
              )}
            </div>

            <div className="mb-8">
              <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-[#1b1714]">{translateLabel(language, 'Cantidad')}</p>
              <div className="flex w-fit items-center gap-3 rounded-full border border-[#e0d4c8] bg-white/70 px-2 py-1.5">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[#f3eee9]"
                  aria-label="Disminuir cantidad"
                >
                  <Minus size={15} strokeWidth={1.8} />
                </button>
                <span className="w-8 text-center font-numeric text-sm font-medium text-[#1b1714]">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[#f3eee9]"
                  aria-label="Aumentar cantidad"
                >
                  <Plus size={15} strokeWidth={1.8} />
                </button>
              </div>
            </div>

            <div className="mb-6 flex flex-col gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full rounded-full bg-[#1b1714] py-4 text-sm font-medium uppercase tracking-[0.22em] text-[#f8f3ef] transition-all hover:bg-[#ba826b] hover:shadow-[0_14px_28px_rgba(186,130,107,0.28)]"
              >
                {translateLabel(language, 'Agregar al carrito')}
              </button>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => onToggleWishlist(product.id)}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-full border py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] transition-colors ${
                    isWishlisted
                      ? 'border-[#ba826b] bg-[#f9f1ec] text-[#ba826b]'
                      : 'border-[#e0d4c8] text-[#1b1714] hover:border-[#ba826b]'
                  }`}
                >
                  <Heart
                    size={16}
                    strokeWidth={1.7}
                    className={isWishlisted ? 'fill-[#ba826b] text-[#ba826b]' : ''}
                  />
                  {translateLabel(language, 'Favoritos')}
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#e0d4c8] py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#1b1714] transition-colors hover:border-[#1b1714]"
                >
                  <Share2 size={16} strokeWidth={1.7} />
                  {translateLabel(language, 'Compartir')}
                </button>
              </div>
            </div>

            {/* Trust near CTA */}
            <div className="mb-8 grid gap-3 rounded-[22px] border border-[#eadfce] bg-white/70 p-4 sm:grid-cols-2">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#1b1714]">Envío cuidado</p>
                <p className="mt-1 text-sm font-light text-[#8f7e76]">Gratis en compras desde S/ 159</p>
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#1b1714]">Cambios</p>
                <p className="mt-1 text-sm font-light text-[#8f7e76]">
                  30 días ·{' '}
                  <Link to="/pages/envios-y-devoluciones" className="underline-offset-2 hover:underline">
                    ver política
                  </Link>
                </p>
              </div>
            </div>

            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="mb-2 flex items-center justify-center gap-3 rounded-full border border-[#cfe9d8] bg-[#f7fcf8] px-4 py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#1b1714] transition-all hover:bg-[#eef8f1]"
            >
              <MessageCircle size={17} className="text-[#25D366]" />
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
