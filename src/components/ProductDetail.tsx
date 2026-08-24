import { useState } from 'react';
import { Heart, Share2, ArrowLeft, Minus, Plus, MessageCircle } from 'lucide-react';
import type { Product } from '@/data/catalog';
import type { CartItem } from '@/components/QuickAddModal';

type Props = {
  product: Product;
  onBack: () => void;
  onAddToCart: (item: CartItem) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
};

export default function ProductDetail({
  product,
  onBack,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}: Props) {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>(product.swatches[0]?.name || '');
  const waMessage = `Hola, me gustaría consultar el producto *${product.name}* y quisiera más información.`;
  const waLink = `https://wa.me/51949217304?text=${encodeURIComponent(waMessage)}`;

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Por favor selecciona una talla');
      return;
    }
    onAddToCart({
      product,
      quantity,
      size: selectedSize,
      color: selectedColor,
    });
  };

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Header */}
      <div className="sticky top-24 z-20 bg-sand-50 border-b border-ink-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-ink-700 hover:text-blush-500 transition-colors"
          >
            <ArrowLeft size={18} strokeWidth={1.5} />
            <span className="text-sm uppercase tracking-widest">Volver</span>
          </button>
        </div>
      </div>

      {/* Product */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image */}
          <div className="flex items-center justify-center bg-ink-50 aspect-[3/4] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            {/* Tag */}
            {product.tag && (
              <div className="mb-4">
                <span className="inline-block bg-blush-500 text-sand-50 text-[10px] font-medium px-3 py-1.5 tracking-widest uppercase">
                  {product.tag}
                </span>
              </div>
            )}

            {/* Title */}
            <h1 className="font-serif text-4xl lg:text-5xl text-ink-900 font-light tracking-wide mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="flex items-center gap-3 mb-8 pb-8 border-b border-ink-200">
              <span className="font-numeric text-3xl text-ink-900 font-medium">${product.price}</span>
              {product.originalPrice && (
                <span className="font-numeric text-ink-400 text-lg line-through font-medium">
                  ${product.originalPrice}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-ink-600 text-base font-light leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Colors */}
            {product.swatches.length > 0 && (
              <div className="mb-8">
                <label className="block text-sm font-medium text-ink-900 mb-4 uppercase tracking-widest">
                  Color
                </label>
                <div className="flex gap-3">
                  {product.swatches.map((swatch) => (
                    <button
                      key={swatch.name}
                      onClick={() => setSelectedColor(swatch.name)}
                      className={`relative w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === swatch.name
                          ? 'border-ink-900 ring-2 ring-blush-300'
                          : 'border-ink-300 hover:border-ink-600'
                      }`}
                      style={{ backgroundColor: swatch.hex }}
                      title={swatch.name}
                    >
                      {selectedColor === swatch.name && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-3 h-3 bg-white rounded-full" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-ink-500 text-sm mt-2">{selectedColor}</p>
              </div>
            )}

            {/* Sizes */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-ink-900 mb-4 uppercase tracking-widest">
                Talla
              </label>
              <div className="flex gap-2 flex-wrap">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-5 py-3 border-2 transition-all text-sm font-medium uppercase tracking-widest ${
                      selectedSize === size
                        ? 'bg-ink-900 text-sand-50 border-ink-900'
                        : 'border-ink-300 text-ink-900 hover:border-ink-900'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-ink-900 mb-4 uppercase tracking-widest">
                Cantidad
              </label>
              <div className="flex items-center gap-4 w-fit">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-ink-300 flex items-center justify-center hover:bg-ink-50 transition-colors"
                >
                  <Minus size={16} strokeWidth={2} />
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-12 text-center py-2 border border-ink-300 font-medium"
                  min="1"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-ink-300 flex items-center justify-center hover:bg-ink-50 transition-colors"
                >
                  <Plus size={16} strokeWidth={2} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className="w-full bg-ink-900 text-sand-50 py-4 uppercase tracking-widest font-medium text-sm hover:bg-blush-500 transition-colors"
              >
                Agregar al Carrito
              </button>
              <div className="flex gap-3">
                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className={`flex-1 flex items-center justify-center gap-2 py-4 border-2 uppercase tracking-widest font-medium text-sm transition-colors ${
                    isWishlisted
                      ? 'bg-blush-100 border-blush-500 text-blush-700'
                      : 'border-ink-300 text-ink-900 hover:border-blush-500'
                  }`}
                >
                  <Heart
                    size={18}
                    strokeWidth={2}
                    className={isWishlisted ? 'fill-blush-500 stroke-blush-500' : ''}
                  />
                  Favoritos
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-4 border-2 border-ink-300 text-ink-900 hover:border-ink-900 transition-colors uppercase tracking-widest font-medium text-sm">
                  <Share2 size={18} strokeWidth={2} />
                  Compartir
                </button>
              </div>
            </div>

            <a
              href={waLink}
              target="_blank"
              rel="noreferrer"
              className="mt-2 flex items-center justify-center gap-3 rounded-full border border-[#7ccf9a] bg-[#f6fff8] px-4 py-3 text-sm font-medium uppercase tracking-[0.18em] text-ink-800 transition-all hover:bg-[#ecfdf2]"
            >
              <MessageCircle size={18} className="text-[#25D366]" />
              Consulta este producto por WhatsApp
            </a>

            {/* Additional Info */}
            <div className="space-y-4 pt-8 border-t border-ink-200">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blush-200 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[10px] font-bold text-blush-700">✓</span>
                </div>
                <div>
                  <p className="font-medium text-ink-900 text-sm">Envío Gratis</p>
                  <p className="text-ink-500 text-xs">En compras superiores a $120</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blush-200 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[10px] font-bold text-blush-700">✓</span>
                </div>
                <div>
                  <p className="font-medium text-ink-900 text-sm">Devoluciones Gratuitas</p>
                  <p className="text-ink-500 text-xs">En 30 días</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
