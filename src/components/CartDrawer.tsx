import { useEffect, useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import type { CartItem } from './QuickAddModal';
import { formatPrice, type CurrencyCode } from '@/lib/currency';

type Props = {
  open: boolean;
  items: CartItem[];
  currency: CurrencyCode;
  onClose: () => void;
  onUpdateQty: (index: number, qty: number) => void;
  onRemove: (index: number) => void;
  onCheckout?: () => Promise<void>;
};

export default function CartDrawer({ open, items, currency, onClose, onUpdateQty, onRemove, onCheckout }: Props) {
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [checkoutError, setCheckoutError] = useState('');
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [open]);

  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const shippingThreshold = 120;
  const remaining = Math.max(0, shippingThreshold - subtotal);
  const progress = Math.min(100, (subtotal / shippingThreshold) * 100);

  return (
    <div className={`fixed inset-0 z-[1200] ${open ? 'visible' : 'invisible'}`}>
      <div
        className={`absolute inset-0 bg-ink-900/50 backdrop-blur-sm transition-opacity duration-500 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      <div
        className={`absolute right-4 top-3 h-[calc(100%-1.5rem)] w-full max-w-[440px] rounded-r-none bg-sand-50 shadow-[0_20px_60px_rgba(18,14,11,0.14)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 h-20 border-b border-ink-100">
          <h2 className="font-serif text-xl tracking-widest text-ink-900">
            Tu Bolsa <span className="text-ink-400 text-base">({items.length})</span>
          </h2>
          <button onClick={onClose} aria-label="Cerrar">
            <X size={22} strokeWidth={1.5} className="text-ink-700 hover:text-blush-500 transition-colors" />
          </button>
        </div>

        {/* Free shipping progress */}
        {items.length > 0 && (
          <div className="px-6 py-5 bg-sand-100/70 border-b border-ink-100">
            <p className="mb-3 text-xs font-medium text-ink-800">¡Hola! Tu carrito te espera por 1 hora!</p>
            <p className="text-xs text-ink-600 font-light mb-2">
              {remaining > 0 ? (
                <>Te faltan <span className="text-ink-900 font-medium">{formatPrice(remaining, currency)}</span> para envío gratis</>
              ) : (
                <span className="text-sage-600">¡Felicidades! Tu envío es gratis</span>
              )}
            </p>
            <div className="h-1 bg-ink-200 overflow-hidden">
              <div
                className="h-full bg-blush-400 transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <ShoppingBag size={48} strokeWidth={1} className="text-ink-300 mb-4" />
              <p className="font-serif text-2xl text-ink-700 mb-2">Tu bolsa está vacía</p>
              <p className="text-sm text-ink-400 font-light mb-6">Descubre nuestras colecciones y encuentra tu próxima pieza favorita.</p>
              <button onClick={onClose} className="btn-outline">
                Continuar Comprando
              </button>
            </div>
          ) : (
            <div className="divide-y divide-ink-100">
              {items.map((item, i) => (
                <div key={`${item.product.id}-${item.size}-${item.color}-${i}`} className="flex gap-4 p-6">
                  <div className="w-20 h-28 bg-ink-100 overflow-hidden shrink-0">
                    <img src={item.product.image} alt={item.product.name} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="font-serif text-lg text-ink-900 leading-tight">{item.product.name}</h3>
                    <p className="text-[10px] uppercase tracking-wide text-ink-400 mt-1">
                      {item.color} · Talla {item.size}
                    </p>
                    <p className="font-numeric text-ink-900 text-sm mt-1">{formatPrice(item.product.price, currency)}</p>

                    <div className="mt-auto flex items-center justify-between">
                      <div className="inline-flex items-center border border-ink-200">
                        <button
                          onClick={() => onUpdateQty(i, Math.max(1, item.quantity - 1))}
                          className="w-8 h-8 flex items-center justify-center hover:bg-ink-100 transition-colors"
                          aria-label="Disminuir"
                        >
                          <Minus size={12} strokeWidth={1.5} />
                        </button>
                        <span className="w-8 text-center text-xs">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQty(i, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center hover:bg-ink-100 transition-colors"
                          aria-label="Aumentar"
                        >
                          <Plus size={12} strokeWidth={1.5} />
                        </button>
                      </div>
                      <button
                        onClick={() => onRemove(i)}
                        className="text-ink-400 hover:text-blush-500 transition-colors"
                        aria-label="Eliminar"
                      >
                        <Trash2 size={16} strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-ink-100 p-6 bg-sand-50">
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-sm text-ink-600">Subtotal</span>
              <span className="font-numeric text-2xl text-ink-900 font-medium">{formatPrice(subtotal, currency)}</span>
            </div>
            <p className="text-xs text-ink-400 mb-5">Impuestos y envío calculados al finalizar la compra</p>
            {checkoutError && (
              <p className="mb-4 text-sm text-red-600" role="alert">{checkoutError}</p>
            )}
            <button
              disabled={checkoutLoading}
              onClick={async () => {
                if (!onCheckout) return;
                setCheckoutError('');
                setCheckoutLoading(true);
                try {
                  await onCheckout();
                } catch (error) {
                  setCheckoutError(error instanceof Error ? error.message : 'No se pudo abrir el checkout.');
                  setCheckoutLoading(false);
                }
              }}
              className="btn-primary w-full disabled:cursor-wait disabled:opacity-60"
            >
              {checkoutLoading ? 'Conectando con Shopify...' : 'Finalizar Compra'}
            </button>
            <button onClick={onClose} className="w-full mt-3 text-xs uppercase tracking-widest text-ink-500 hover:text-ink-800 link-underline mx-auto">
              Seguir Explorando
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
