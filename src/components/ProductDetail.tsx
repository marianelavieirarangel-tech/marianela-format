import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Share2, ArrowLeft, Minus, Plus, MessageCircle } from 'lucide-react';
import { formatProductName, type Product } from '@/data/catalog';
import type { CartItem } from '@/components/QuickAddModal';
import { formatPrice, type CurrencyCode } from '@/lib/currency';

type Props = {
  product: Product;
  currency: CurrencyCode;
  onBack: () => void;
  onAddToCart: (item: CartItem) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
};

const sizes = ['XS', 'S', 'M', 'L', 'XL'] as const;

export default function ProductDetail({
  product,
  currency,
  onBack,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}: Props) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [sizeError, setSizeError] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>(product.swatches[0]?.name || '');
  const gallery = product.images?.length ? product.images : [product.image];
  const [selectedImage, setSelectedImage] = useState(gallery[0]);
  const waMessage = `Hola, me gustaría consultar el producto *${formatProductName(product.name)}* y quisiera más información.`;
  const waLink = `https://wa.me/51949217304?text=${encodeURIComponent(waMessage)}`;

  useEffect(() => {
    setSelectedImage(product.images?.length ? product.images[0] : product.image);
    setSelectedColor(product.swatches[0]?.name || '');
    setSelectedSize('');
    setSizeError(false);
    setQuantity(1);
  }, [product]);

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
      <div className="sticky top-[72px] z-20 border-b border-[#eadfce]/70 bg-[#f8f4ef]/95 backdrop-blur-md lg:top-[84px]">
        <div className="mx-auto max-w-7xl px-6 py-3 lg:px-10">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[#5b4f49] transition-colors hover:text-[#ba826b]"
          >
            <ArrowLeft size={18} strokeWidth={1.5} />
            <span className="text-[11px] uppercase tracking-[0.22em]">Volver</span>
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-16">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="overflow-hidden rounded-[28px] bg-[#f3eee9] shadow-[0_18px_40px_rgba(56,35,26,0.06)]">
              <div className="aspect-[3/4]">
                <img
                  src={selectedImage}
                  alt={formatProductName(product.name)}
                  className="h-full w-full object-cover"
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
              {formatProductName(product.name)}
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
                <div className="mb-4 flex items-baseline justify-between">
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#1b1714]">Color</p>
                  <p className="text-sm font-light text-[#8f7e76]">{selectedColor}</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.swatches.map((swatch) => (
                    <button
                      key={swatch.name}
                      type="button"
                      onClick={() => handleSelectColor(swatch)}
                      className={`relative h-10 w-10 rounded-full border-2 transition-all ${
                        selectedColor === swatch.name
                          ? 'border-[#1b1714] ring-2 ring-[#d9bca9] ring-offset-2 ring-offset-[#f8f4ef]'
                          : 'border-[#d9c9be] hover:border-[#8f7e76]'
                      }`}
                      style={{ backgroundColor: swatch.hex }}
                      title={swatch.name}
                      aria-label={swatch.name}
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="mb-8">
              <div className="mb-4 flex items-baseline justify-between gap-4">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#1b1714]">Talla</p>
                <Link
                  to="/pages/guia-de-tallas"
                  className="text-[11px] uppercase tracking-[0.18em] text-[#bb8a7d] underline-offset-4 transition-colors hover:text-[#1b1714] hover:underline"
                >
                  Guía de tallas
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
              <p className="mb-4 text-[11px] font-medium uppercase tracking-[0.22em] text-[#1b1714]">Cantidad</p>
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
                Agregar al carrito
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
                  Favoritos
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-[#e0d4c8] py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] text-[#1b1714] transition-colors hover:border-[#1b1714]"
                >
                  <Share2 size={16} strokeWidth={1.7} />
                  Compartir
                </button>
              </div>
            </div>

            {/* Trust near CTA */}
            <div className="mb-8 grid gap-3 rounded-[22px] border border-[#eadfce] bg-white/70 p-4 sm:grid-cols-2">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-[#1b1714]">Envío cuidado</p>
                <p className="mt-1 text-sm font-light text-[#8f7e76]">Gratis en compras desde $120</p>
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
