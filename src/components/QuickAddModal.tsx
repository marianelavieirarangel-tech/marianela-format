import { useEffect, useState } from 'react';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import type { Product } from '@/data/catalog';

export type CartItem = {
  product: Product;
  size: string;
  color: string;
  quantity: number;
};

type Props = {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
};

const sizes = ['XS', 'S', 'M', 'L', 'XL'];

export default function QuickAddModal({ product, onClose, onAddToCart }: Props) {
  const [size, setSize] = useState('M');
  const [color, setColor] = useState('');
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (product) {
      setSize('M');
      setColor(product.swatches[0]?.name ?? '');
      setQty(1);
    }
  }, [product]);

  useEffect(() => {
    if (product) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [product]);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart({ product, size, color, quantity: qty });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-ink-900/50 backdrop-blur-sm animate-fade-in" onClick={onClose} />

      <div className="relative bg-sand-50 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center hover:bg-ink-100 transition-colors"
          aria-label="Cerrar"
        >
          <X size={20} strokeWidth={1.5} className="text-ink-700" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="aspect-[3/4] md:aspect-auto md:h-full bg-ink-100 overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="p-8 lg:p-10 flex flex-col">
            <p className="text-[10px] uppercase tracking-widest text-ink-400 mb-2">{product.category}</p>
            <h2 className="font-serif text-3xl text-ink-900 font-light leading-tight mb-3">{product.name}</h2>

            <div className="flex items-baseline gap-2 mb-6">
              <span className="font-numeric text-ink-900 text-xl font-medium">${product.price}</span>
              {product.originalPrice && (
                <span className="font-numeric text-ink-400 text-base line-through font-medium">${product.originalPrice}</span>
              )}
            </div>

            <p className="text-ink-600 text-sm font-light leading-relaxed mb-8">{product.description}</p>

            {/* Color */}
            <div className="mb-6">
              <p className="text-[11px] uppercase tracking-widest text-ink-700 mb-3">
                Color: <span className="text-ink-400 normal-case tracking-wide">{color}</span>
              </p>
              <div className="flex items-center gap-3">
                {product.swatches.map((sw) => (
                  <button
                    key={sw.name}
                    onClick={() => setColor(sw.name)}
                    className={`w-8 h-8 rounded-full border-2 transition-all ${
                      color === sw.name ? 'border-ink-800 ring-1 ring-offset-2 ring-offset-sand-50 ring-ink-400' : 'border-ink-200'
                    }`}
                    style={{ backgroundColor: sw.hex }}
                    aria-label={sw.name}
                  />
                ))}
              </div>
            </div>

            {/* Size */}
            <div className="mb-6">
              <p className="text-[11px] uppercase tracking-widest text-ink-700 mb-3">Talla</p>
              <div className="flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`min-w-[3rem] px-3 py-2.5 text-xs tracking-wide border transition-all ${
                      size === s
                        ? 'bg-ink-900 text-sand-50 border-ink-900'
                        : 'border-ink-200 text-ink-700 hover:border-ink-400'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <p className="text-[11px] uppercase tracking-widest text-ink-700 mb-3">Cantidad</p>
              <div className="inline-flex items-center border border-ink-200">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="w-11 h-11 flex items-center justify-center hover:bg-ink-100 transition-colors"
                  aria-label="Disminuir"
                >
                  <Minus size={14} strokeWidth={1.5} />
                </button>
                <span className="w-12 text-center text-sm">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="w-11 h-11 flex items-center justify-center hover:bg-ink-100 transition-colors"
                  aria-label="Aumentar"
                >
                  <Plus size={14} strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Add */}
            <button
              onClick={handleAdd}
              className="btn-primary w-full mt-auto"
            >
              <ShoppingBag size={15} strokeWidth={1.5} className="mr-2" />
              Añadir a la Bolsa — ${product.price * qty}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
