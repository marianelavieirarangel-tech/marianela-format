import { useEffect, useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import type { CartItem } from './QuickAddModal';
import { localizedProductName } from '@/data/catalog';
import { formatPrice, type CurrencyCode } from '@/lib/currency';
import type { LanguageCode } from '@/lib/language';

type Props = {
  open: boolean;
  items: CartItem[];
  currency: CurrencyCode;
  onClose: () => void;
  onUpdateQty: (index: number, qty: number) => void;
  onRemove: (index: number) => void;
  onCheckout?: () => Promise<void>;
  language: LanguageCode;
};

export default function CartDrawer({ open, items, currency, onClose, onUpdateQty, onRemove, onCheckout, language }: Props) {
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
  const shippingThreshold = 159;
  const remaining = Math.max(0, shippingThreshold - subtotal);
  const progress = Math.min(100, (subtotal / shippingThreshold) * 100);
  const labels = {
    es: ['Tu Bolsa', 'Tu bolsa está vacía', 'Descubre nuestras colecciones y encuentra tu próxima pieza favorita.', 'Continuar Comprando', 'Subtotal', 'Impuestos y envío calculados al finalizar la compra', 'Finalizar Compra', 'Seguir Explorando', 'Conectando con Shopify...', 'Tu selección te espera', 'Envío gratis', 'Te faltan', 'para envío gratis', '¡Felicidades! Tu envío es gratis', 'Talla'],
    en: ['Your Bag', 'Your bag is empty', 'Discover our collections and find your next favorite piece.', 'Continue Shopping', 'Subtotal', 'Taxes and shipping calculated at checkout', 'Complete Purchase', 'Keep Exploring', 'Connecting to Shopify...', 'Your selection is waiting', 'Free shipping', 'You are', 'away from free shipping', 'Congratulations! Your shipping is free', 'Size'],
    pt: ['Sua Bolsa', 'Sua bolsa está vazia', 'Descubra nossas coleções e encontre sua próxima peça favorita.', 'Continuar Comprando', 'Subtotal', 'Impostos e frete calculados no checkout', 'Finalizar Compra', 'Continuar Explorando', 'Conectando ao Shopify...', 'Sua seleção espera por você', 'Frete grátis', 'Faltam', 'para frete grátis', 'Parabéns! Seu frete é grátis', 'Tamanho'],
    fr: ['Votre sac', 'Votre sac est vide', 'Découvrez nos collections et trouvez votre prochaine pièce préférée.', 'Continuer vos achats', 'Sous-total', 'Taxes et livraison calculées au paiement', 'Finaliser la commande', 'Continuer à explorer', 'Connexion à Shopify...', 'Votre sélection vous attend', 'Livraison offerte', 'Il vous manque', 'pour la livraison offerte', 'Félicitations ! Votre livraison est offerte', 'Taille'],
    it: ['La tua borsa', 'La tua borsa è vuota', 'Scopri le nostre collezioni e trova il tuo prossimo capo preferito.', 'Continua lo shopping', 'Subtotale', 'Imposte e spedizione calcolate al checkout', 'Concludi acquisto', 'Continua a esplorare', 'Connessione a Shopify...', 'La tua selezione ti aspetta', 'Spedizione gratuita', 'Ti mancano', 'per la spedizione gratuita', 'Congratulazioni! La spedizione è gratuita', 'Taglia'],
    de: ['Deine Tasche', 'Deine Tasche ist leer', 'Entdecke unsere Kollektionen und finde dein nächstes Lieblingsstück.', 'Weiter einkaufen', 'Zwischensumme', 'Steuern und Versand werden an der Kasse berechnet', 'Kauf abschließen', 'Weiter entdecken', 'Verbindung mit Shopify...', 'Deine Auswahl wartet', 'Kostenloser Versand', 'Dir fehlen noch', 'für kostenlosen Versand', 'Herzlichen Glückwunsch! Der Versand ist kostenlos', 'Größe'],
    nl: ['Jouw tas', 'Je tas is leeg', 'Ontdek onze collecties en vind je volgende favoriete item.', 'Verder winkelen', 'Subtotaal', 'Belastingen en verzending worden bij het afrekenen berekend', 'Aankoop afronden', 'Verder ontdekken', 'Verbinden met Shopify...', 'Je selectie wacht op je', 'Gratis verzending', 'Je hebt nog', 'nodig voor gratis verzending', 'Gefeliciteerd! Je verzending is gratis', 'Maat'],
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
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#e9e0d6] bg-[#fffdfb]/85 px-6 py-5 backdrop-blur-md sm:px-8">
          <div>
            <p className="mb-1 text-[9px] font-medium uppercase tracking-[0.3em] text-blush-500">Marianela Vieira</p>
            <h2 className="font-serif text-[1.65rem] tracking-[0.08em] text-ink-900">
              {labels[0]} <span className="ml-1 inline-flex min-w-6 items-center justify-center rounded-full border border-ink-200 bg-sand-50 px-1.5 py-0.5 font-sans text-[10px] font-medium tracking-normal text-ink-500">({items.length})</span>
            </h2>
          </div>
          <button onClick={onClose} aria-label="Cerrar">
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-ink-200 text-ink-700 transition-all hover:border-blush-300 hover:bg-blush-50 hover:text-blush-500">
              <X size={17} strokeWidth={1.5} />
            </span>
          </button>
        </div>

        {/* Free shipping progress */}
        {items.length > 0 && (
          <div className="border-b border-[#e9e0d6] bg-[#f3ece4] px-6 py-5 sm:px-8">
            <div className="mb-3 flex items-center justify-between gap-4">
              <p className="text-xs font-medium text-ink-800">{labels[9]}</p>
              <span className="text-[9px] uppercase tracking-[0.2em] text-blush-500">{labels[10]}</span>
            </div>
            <p className="text-xs text-ink-600 font-light mb-2">
              {remaining > 0 ? (
              <>{labels[11]} <span className="text-ink-900 font-medium">{formatPrice(remaining, currency)}</span> {labels[12]}</>
              ) : (
              <span className="text-sage-600">{labels[13]}</span>
              )}
            </p>
            <div className="h-1.5 overflow-hidden rounded-full bg-ink-200/70">
              <div
                className="h-full rounded-full bg-gradient-to-r from-blush-400 to-blush-300 transition-all duration-700 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="relative flex h-full flex-col items-center justify-center overflow-hidden px-8 text-center">
              <div className="pointer-events-none absolute -right-20 -top-16 h-52 w-52 rounded-full bg-blush-200/25 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-56 w-56 rounded-full bg-[#d8c7b4]/25 blur-3xl" />
              <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-[#dfd1c3] bg-[#fffdfb] shadow-[0_12px_30px_rgba(56,35,26,0.08)]">
                <ShoppingBag size={29} strokeWidth={1.15} className="text-blush-400" />
              </div>
              <p className="relative mb-2 font-serif text-[1.7rem] text-ink-800">{labels[1]}</p>
              <p className="relative mb-7 max-w-[270px] text-xs font-light leading-relaxed text-ink-400">{labels[2]}</p>
              <button onClick={onClose} className="relative rounded-full border border-ink-700 px-7 py-3 text-[10px] uppercase tracking-[0.25em] text-ink-700 transition-all duration-300 hover:border-blush-400 hover:bg-ink-900 hover:text-sand-50">
                {labels[3]}
              </button>
            </div>
          ) : (
            <div className="space-y-3 p-4 sm:p-5">
              {items.map((item, i) => (
                <div key={`${item.product.id}-${item.size}-${item.color}-${i}`} className="flex gap-4 rounded-2xl border border-[#ebe1d7] bg-[#fffdfb] p-3 shadow-[0_8px_24px_rgba(56,35,26,0.04)]">
                  <div className="h-28 w-20 shrink-0 overflow-hidden rounded-xl bg-ink-100">
                    <img src={item.product.image} alt={localizedProductName(item.product.name, language)} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="font-serif text-lg text-ink-900 leading-tight">{localizedProductName(item.product.name, language)}</h3>
                    <p className="text-[10px] uppercase tracking-wide text-ink-400 mt-1">
                      {item.color} · {labels[14]} {item.size}
                    </p>
                    <p className="font-numeric text-ink-900 text-sm mt-1">{formatPrice(item.product.price, currency)}</p>

                    <div className="mt-auto flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-ink-200 bg-sand-50">
                        <button
                          onClick={() => onUpdateQty(i, Math.max(1, item.quantity - 1))}
                          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-ink-100 transition-colors"
                          aria-label="Disminuir"
                        >
                          <Minus size={12} strokeWidth={1.5} />
                        </button>
                        <span className="w-8 text-center text-xs font-medium">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQty(i, item.quantity + 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-ink-100 transition-colors"
                          aria-label="Aumentar"
                        >
                          <Plus size={12} strokeWidth={1.5} />
                        </button>
                      </div>
                      <button
                        onClick={() => onRemove(i)}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-ink-400 transition-colors hover:bg-blush-50 hover:text-blush-500"
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
          <div className="border-t border-[#e9e0d6] bg-[#fffdfb]/90 p-6 shadow-[0_-12px_30px_rgba(56,35,26,0.04)] backdrop-blur-md sm:p-7">
            <div className="flex items-baseline justify-between mb-1">
              <span className="text-sm text-ink-600">{labels[4]}</span>
              <span className="font-numeric text-2xl text-ink-900 font-medium">{formatPrice(subtotal, currency)}</span>
            </div>
            <p className="text-xs text-ink-400 mb-5">{labels[5]}</p>
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
              className="w-full rounded-full bg-ink-900 px-5 py-4 text-[10px] font-medium uppercase tracking-[0.28em] text-sand-50 shadow-[0_12px_24px_rgba(27,23,20,0.16)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-blush-500 hover:shadow-[0_16px_30px_rgba(187,138,125,0.24)] disabled:cursor-wait disabled:opacity-60"
            >
              {checkoutLoading ? labels[8] : labels[6]}
            </button>
            <button onClick={onClose} className="w-full mt-3 text-xs uppercase tracking-widest text-ink-500 hover:text-ink-800 link-underline mx-auto">
              {labels[7]}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
