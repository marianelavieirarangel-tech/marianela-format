import { useEffect } from 'react';
import { X, Heart } from 'lucide-react';
import type { Product } from '@/data/catalog';
import { formatPrice, type CurrencyCode } from '@/lib/currency';
import type { LanguageCode } from '@/lib/language';

type Props = {
  products: Product[];
  open: boolean;
  wishlist: Set<string>;
  currency: CurrencyCode;
  onClose: () => void;
  onSelect: (product: Product) => void;
  language: LanguageCode;
};

export default function WishlistDrawer({ products, open, wishlist, currency, onClose, onSelect, language }: Props) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [open]);

  const items = products.filter((p) => wishlist.has(p.id));
  const labels = {
    es: ['Favoritos', 'Sin favoritos aún', 'Toca el corazón en cada producto para guardarlo aquí.', 'Descubrir Piezas'],
    en: ['Favorites', 'No favorites yet', 'Tap the heart on any product to save it here.', 'Discover Pieces'],
    pt: ['Favoritos', 'Ainda sem favoritos', 'Toque no coração de qualquer produto para guardá-lo aqui.', 'Descobrir Peças'],
    fr: ['Favoris', 'Aucun favori', 'Touchez le cœur d’un produit pour l’enregistrer ici.', 'Découvrir les pièces'],
    it: ['Preferiti', 'Nessun preferito', 'Tocca il cuore di un prodotto per salvarlo qui.', 'Scopri i capi'],
    de: ['Favoriten', 'Noch keine Favoriten', 'Tippe auf das Herz eines Produkts, um es hier zu speichern.', 'Stücke entdecken'],
    nl: ['Favorieten', 'Nog geen favorieten', 'Tik op het hart bij een product om het hier op te slaan.', 'Items ontdekken'],
  }[language];

  return (
    <div className={`fixed inset-0 z-[1200] ${open ? 'visible' : 'invisible'}`}>
      <div
        className={`absolute inset-0 bg-ink-900/50 backdrop-blur-sm transition-opacity duration-500 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      <div
        className={`absolute right-2 top-2 h-[calc(100%-1rem)] w-[calc(100%-1rem)] max-w-[460px] overflow-hidden rounded-[28px] border border-white/70 bg-[#fbf8f4] shadow-[0_24px_80px_rgba(18,14,11,0.24)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col sm:right-4 sm:top-3 sm:h-[calc(100%-1.5rem)] sm:w-full ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#e9e0d6] bg-[#fffdfb]/85 px-6 py-5 backdrop-blur-md sm:px-8">
          <h2 className="font-serif text-xl tracking-widest text-ink-900">
            {labels[0]} <span className="text-ink-400 text-base">({items.length})</span>
          </h2>
          <button onClick={onClose} aria-label="Cerrar">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 text-ink-700 transition-all hover:border-blush-300 hover:bg-blush-50 hover:text-blush-500"><X size={17} strokeWidth={1.5} /></span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <Heart size={48} strokeWidth={1} className="text-ink-300 mb-4" />
              <p className="font-serif text-2xl text-ink-700 mb-2">{labels[1]}</p>
              <p className="text-sm text-ink-400 font-light mb-6">
                {labels[2]}
              </p>
              <button onClick={onClose} className="btn-outline">
                {labels[3]}
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
