import { useEffect, useState } from 'react';
import { X, Search as SearchIcon } from 'lucide-react';
import type { Product } from '@/data/catalog';
import { formatPrice, type CurrencyCode } from '@/lib/currency';

type Props = {
  products: Product[];
  open: boolean;
  currency: CurrencyCode;
  onClose: () => void;
  onSelect: (product: Product) => void;
};

export default function SearchOverlay({ products, open, currency, onClose, onSelect }: Props) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [open]);

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  const results = query
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase())
      )
    : products.slice(0, 4);

  const suggestions = ['Lencería', 'Loungewear', 'Trajes de Baño', 'Seda', 'Encaje'];

  return (
    <div className={`fixed inset-0 z-50 ${open ? 'visible' : 'invisible'}`}>
      <div
        className={`absolute inset-0 bg-ink-900/50 backdrop-blur-sm transition-opacity duration-500 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      <div
        className={`absolute top-0 inset-x-0 bg-sand-50 shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="mx-auto max-w-3xl px-6 py-8 lg:py-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-xl tracking-widest text-ink-900">Buscar</h2>
            <button onClick={onClose} aria-label="Cerrar">
              <X size={22} strokeWidth={1.5} className="text-ink-700 hover:text-blush-500 transition-colors" />
            </button>
          </div>

          {/* Input */}
          <div className="relative border-b-2 border-ink-800 pb-4 mb-6">
            <SearchIcon size={22} strokeWidth={1.5} className="absolute left-0 bottom-5 text-ink-500" />
            <input
              autoFocus={open}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="¿Qué estás buscando?"
              className="w-full pl-9 text-lg font-light text-ink-900 placeholder-ink-400 focus:outline-none bg-transparent"
            />
          </div>

          {/* Suggestions */}
          {!query && (
            <div className="mb-6">
              <p className="text-[11px] uppercase tracking-widest text-ink-400 mb-3">Sugerencias</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="px-4 py-2 text-xs tracking-wide border border-ink-200 text-ink-600 hover:border-ink-800 hover:text-ink-900 transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          <div>
            <p className="text-[11px] uppercase tracking-widest text-ink-400 mb-4">
              {query ? `${results.length} resultado(s)` : 'Destacados'}
            </p>
            {results.length === 0 ? (
              <p className="text-ink-500 text-sm font-light py-8 text-center">
                No encontramos resultados para "{query}".
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {results.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => onSelect(p)}
                    className="group text-left"
                  >
                    <div className="aspect-[3/4] bg-ink-100 overflow-hidden mb-2">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
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
    </div>
  );
}
