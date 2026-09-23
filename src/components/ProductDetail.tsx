import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Minus, Plus } from 'lucide-react';
import { localizedProductName, type Product } from '@/data/catalog';
import type { CartItem } from '@/components/QuickAddModal';
import { formatPrice, type CurrencyCode } from '@/lib/currency';
import { translateLabel, type LanguageCode } from '@/lib/language';

type Props = {
  product: Product;
  currency: CurrencyCode;
  onAddToCart: (item: CartItem) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  language: LanguageCode;
  initialColor?: string;
};

const displaySizes = ['XS', 'S', 'M', 'L', 'XL'] as const;
const defaultBikiniSizes = ['S', 'M', 'L'] as const;

function getAvailableSizes(product: Product) {
  const shopifySizes = new Set(
    (product.sizes ?? [])
      .map((size) => size.trim().toUpperCase())
      .filter((size): size is (typeof displaySizes)[number] => displaySizes.includes(size as (typeof displaySizes)[number])),
  );

  if (shopifySizes.has('S') && shopifySizes.has('M') && shopifySizes.has('L')) {
    return shopifySizes;
  }

  return new Set(defaultBikiniSizes);
}

export default function ProductDetail({
  product,
  currency,
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
  const [openInfo, setOpenInfo] = useState<'description' | 'material' | 'care' | null>(null);
  const sizes = displaySizes;
  const availableSizes = getAvailableSizes(product);
  const gallery = product.images?.length ? product.images : [product.image];
  const [selectedImage, setSelectedImage] = useState(gallery[0]);
  const displayName = localizedProductName(product.name, language);
  const galleryImages = [
    selectedImage,
    ...gallery.filter((image) => image !== selectedImage),
  ];
  useEffect(() => {
    setSelectedImage(product.images?.length ? product.images[0] : product.image);
    const selectedSwatch = product.swatches.find((swatch) => swatch.name === initialColor) ?? product.swatches[0];
    setSelectedColor(selectedSwatch?.name || '');
    if (initialColor && selectedSwatch?.image) setSelectedImage(selectedSwatch.image);
    setShowAllColors(false);
    setOpenInfo(null);
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

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1500px] px-6 pt-6 pb-10 lg:px-10 lg:pt-8 lg:pb-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(400px,0.85fr)] lg:gap-14">
          {/* Gallery */}
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2" aria-label="Galería de imágenes">
            {galleryImages.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setSelectedImage(image)}
                className={`group relative overflow-hidden bg-white ${
                  index === 0 ? 'sm:col-span-2 aspect-[1.5]' : 'aspect-[1.08]'
                }`}
                aria-label={`Ver imagen ${index + 1}`}
              >
                <img
                  src={image}
                  alt={index === 0 ? displayName : ''}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </button>
            ))}
          </div>

          {/* Info */}
          <div className="flex w-full max-w-[430px] flex-col lg:justify-self-end lg:pt-2">
            {product.tag && (
              <div className="mb-4">
                <span className="inline-block rounded-full bg-[#1b1714] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[#f8f1eb]">
                  {product.tag}
                </span>
              </div>
            )}

            <h1 className="mb-1 font-serif text-2xl font-light tracking-normal text-[#1b1714] lg:text-[2rem]">
              {displayName}
            </h1>

            <div className="mb-6 flex items-center gap-3 pb-4">
              <span className="font-numeric text-2xl font-medium text-[#1b1714]">
                {formatPrice(product.price, currency)}
              </span>
              {product.originalPrice && (
                <span className="font-numeric text-base font-medium text-[#8f7e76] line-through">
                  {formatPrice(product.originalPrice, currency)}
                </span>
              )}
              <button
                type="button"
                onClick={() => onToggleWishlist(product.id)}
                className="ml-auto flex h-8 w-8 items-center justify-center rounded-full border border-[#e0d4c8] text-[#1b1714] transition-colors hover:border-[#ba826b] hover:text-[#ba826b]"
                aria-label={isWishlisted ? 'Quitar de favoritos' : 'Agregar a favoritos'}
              >
                <Heart
                  size={16}
                  strokeWidth={1.7}
                  className={isWishlisted ? 'fill-[#ba826b] text-[#ba826b]' : ''}
                />
              </button>
            </div>

            {product.swatches.length > 0 && (
              <div className="mb-6">
                <div className="mb-4 flex items-baseline gap-2">
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#1b1714]">{translateLabel(language, 'Color')}</p>
                  <span className="text-[11px] uppercase tracking-[0.18em] text-[#8f7e76]">·</span>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-[#8f7e76]">{selectedColor}</p>
                </div>
                <div className="grid max-w-[20rem] grid-cols-4 gap-0">
                  {(showAllColors ? product.swatches : product.swatches.slice(0, 8)).map((swatch) => (
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
                  {!showAllColors && product.swatches.length > 8 && (
                    <button
                      type="button"
                      onClick={() => setShowAllColors(true)}
                      className="aspect-square border-b border-r border-[#1b1714] bg-[#050505] text-xs font-medium text-white transition-colors hover:bg-[#242424]"
                      aria-label={`Mostrar ${product.swatches.length - 8} colores más`}
                    >
                      +{product.swatches.length - 8}
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className="mb-7">
              <div className="mb-4 flex items-baseline justify-between gap-4">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-[#1b1714]">{translateLabel(language, 'Talla')}</p>
                <Link
                  to="/pages/guia-de-tallas"
                  className="text-[11px] uppercase tracking-[0.18em] text-[#bb8a7d] underline-offset-4 transition-colors hover:text-[#1b1714] hover:underline"
                >
                  {translateLabel(language, 'Guía de tallas')}
                </Link>
              </div>
              <div className="grid w-fit grid-cols-5 border-l border-t border-[#d9d0c8]">
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    disabled={!availableSizes.has(size)}
                    onClick={() => {
                      setSelectedSize(size);
                      setSizeError(false);
                    }}
                    className={`relative w-14 border-b border-r px-2 py-2.5 text-xs font-medium uppercase tracking-[0.18em] transition-all ${
                      !availableSizes.has(size)
                        ? 'cursor-default border-[#d6d1cc] bg-[#e8e5e2] text-[#98918b]'
                        : selectedSize === size
                        ? 'border-[#1b1714] bg-[#1b1714] text-[#f8f3ef]'
                        : 'border-[#d9d0c8] bg-white text-[#1b1714] hover:bg-white'
                    }`}
                    aria-label={!availableSizes.has(size) ? `Talla ${size} agotada` : `Seleccionar talla ${size}`}
                  >
                    {size}
                    {!availableSizes.has(size) && (
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0"
                        style={{
                          background: 'linear-gradient(to top right, transparent 49%, #98918b 49.5%, #98918b 50.5%, transparent 51%)',
                        }}
                      />
                    )}
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
                  className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white"
                  aria-label="Disminuir cantidad"
                >
                  <Minus size={15} strokeWidth={1.8} />
                </button>
                <span className="w-8 text-center font-numeric text-sm font-medium text-[#1b1714]">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-white"
                  aria-label="Aumentar cantidad"
                >
                  <Plus size={15} strokeWidth={1.8} />
                </button>
              </div>
            </div>

            <div className="mb-6">
              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full bg-[#1b1714] py-4 text-sm font-medium uppercase tracking-[0.22em] text-[#f8f3ef] transition-all hover:bg-[#ba826b] hover:shadow-[0_14px_28px_rgba(186,130,107,0.28)]"
              >
                {translateLabel(language, 'Agregar al carrito')}
              </button>
            </div>

            <div className="mb-8 border-t border-[#e3d8ce]">
              {[
                { key: 'description' as const, label: 'Descripción', value: product.description },
                ...(product.material ? [{ key: 'material' as const, label: 'Materiales', value: product.material }] : []),
                { key: 'care' as const, label: 'Instrucciones de cuidado', value: product.care ?? 'Sigue las instrucciones de cuidado indicadas en la etiqueta de la prenda.' },
              ].map((item) => {
                const isOpen = openInfo === item.key;
                return (
                  <div key={item.key} className="border-b border-[#e3d8ce]">
                    <button
                      type="button"
                      onClick={() => setOpenInfo(isOpen ? null : item.key)}
                      className="flex w-full items-center justify-between py-4 text-left text-[11px] font-medium uppercase tracking-[0.2em] text-[#1b1714]"
                      aria-expanded={isOpen}
                    >
                      {item.label}
                      <span className="text-xl font-light leading-none">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <p className="pb-4 text-sm font-light leading-relaxed text-[#6c5f59]">
                        {item.value}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
