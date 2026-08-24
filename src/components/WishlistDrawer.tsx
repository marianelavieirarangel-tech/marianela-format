import { useEffect } from 'react';
import { X, Heart } from 'lucide-react';
import type { Product } from '@/data/catalog';
import { formatPrice, type CurrencyCode } from '@/lib/currency';

type Props = {
  products: Product[];
  open: boolean;
  wishlist: Set<string>;
  currency: CurrencyCode;
  onClose: () => void;
  onSelect: (product: Product) => void;
};

export default function WishlistDrawer({ products, open, wishlist, currency, onClose, onSelect }: Props) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [open]);

  const items = products.filter((p) => wishlist.has(p.id));

  return (
    <div className={`fixed inset-0 z-50 ${open ? 'visible' : 'invisible'}`}>
      <div
        className={`absolute inset-0 bg-ink-900/50 backdrop-blur-sm transition-opacity duration-500 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      <div
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-sand-50 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 h-20 border-b border-ink-100">
          <h2 className="font-serif text-xl tracking-widest text-ink-900">
            Favoritos <span className="text-ink-400 text-base">({items.length})</span>
          </h2>
          <button onClick={onClose} aria-label="Cerrar">
            <X size={22} strokeWidth={1.5} className="text-ink-700 hover:text-blush-500 transition-colors" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <Heart size={48} strokeWidth={1} className="text-ink-300 mb-4" />
              <p className="font-serif text-2xl text-ink-700 mb-2">Sin favoritos aún</p>
              <p className="text-sm text-ink-400 font-light mb-6">
                Toca el corazón en cada producto para guardarlo aquí.
              </p>
              <button onClick={onClose} className="btn-outline">
                Descubrir Piezas
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 p-6">
              {items.map((p) => (
                <button key={p.id} onClick={() => onSelect(p)} className="group text-left">
                  <div className="aspect-[3/4] bg-ink-100 overflow-hidden mb-2 relative">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-2 right-2 w-7 h-7 bg-sand-50/80 backdrop-blur-sm flex items-center justify-center">
                      <Heart size={13} className="fill-blush-500 text-blush-500" />
                    </div>
                  </div>
                  <h3 className="font-serif text-sm text-ink-900 leading-tight">{p.name}</h3>
                  <p className="font-numeric text-xs text-ink-500 mt-0.5">{formatPrice(p.price, currency)}</p>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
