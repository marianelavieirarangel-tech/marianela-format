import { useState } from 'react';
import { X, Trash2 } from 'lucide-react';
import type { CartItem } from '@/components/QuickAddModal';
import { createShopifyCheckout } from '@/lib/shopify';
import { formatPrice, type CurrencyCode } from '@/lib/currency';

type Props = {
  items: CartItem[];
  currency: CurrencyCode;
  onClose: () => void;
  onUpdateQty: (index: number, qty: number) => void;
  onRemove: (index: number) => void;
};

export default function CheckoutPage({ items, currency, onClose, onUpdateQty, onRemove }: Props) {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'shipping' | 'pickup'>('shipping');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [checkoutError, setCheckoutError] = useState('');

  const isLimaLocal = city.toLowerCase() === 'lima' && country.toLowerCase() === 'perú';
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = deliveryMethod === 'pickup' ? 0 : subtotal > 120 ? 0 : 25;
  const total = subtotal - discount + shipping;

  const handleApplyPromo = () => {
    // Simulación de código de descuento
    if (promoCode.toLowerCase() === 'marianela20') {
      setDiscount(subtotal * 0.2);
    } else {
      alert('Código de descuento inválido');
      setDiscount(0);
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutError('');

    try {
      const { checkoutUrl } = await createShopifyCheckout(
        items.map((item) => ({ variantId: item.product.shopifyVariantId, quantity: item.quantity })),
      );
      window.location.href = checkoutUrl;
    } catch (error) {
      setCheckoutError(error instanceof Error ? error.message : 'No pudimos abrir el checkout de Shopify.');
    }
  };

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Header */}
      <div className="bg-sand-50 border-b border-ink-100 sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-4 flex items-center justify-between">
          <a href="#" className="font-serif text-2xl tracking-[0.15em] text-ink-900">
            MARIANELA VIEIRA
          </a>
          <button
            onClick={onClose}
            className="text-ink-700 hover:text-blush-500 transition-colors"
            aria-label="Cerrar"
          >
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Formulario */}
          <div className="lg:col-span-2">
            <form onSubmit={handleCheckout}>
              {/* Email */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-ink-900 mb-3 uppercase tracking-widest">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="w-full px-4 py-3 border border-ink-200 focus:border-blush-500 focus:outline-none transition-colors"
                />
              </div>

              {/* Información Personal */}
              <div className="mb-8">
                <h3 className="text-lg font-medium text-ink-900 mb-4 uppercase tracking-widest">
                  Información de Envío
                </h3>

                {/* Método de Entrega - Solo para Lima */}
                {isLimaLocal && (
                  <div className="mb-6 pb-6 border-b border-ink-200">
                    <label className="block text-sm font-medium text-ink-900 mb-4 uppercase tracking-widest">
                      Método de Entrega
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="delivery"
                          value="shipping"
                          checked={deliveryMethod === 'shipping'}
                          onChange={(e) => setDeliveryMethod(e.target.value as 'shipping' | 'pickup')}
                          className="w-4 h-4"
                        />
                        <span className="text-sm text-ink-900">
                          Envío a Domicilio <span className="text-ink-400">({shipping > 0 ? `S/ ${shipping}` : 'Gratis'})</span>
                        </span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="delivery"
                          value="pickup"
                          checked={deliveryMethod === 'pickup'}
                          onChange={(e) => setDeliveryMethod(e.target.value as 'shipping' | 'pickup')}
                          className="w-4 h-4"
                        />
                        <div className="flex-1">
                          <span className="text-sm text-ink-900">
                            Retiro en Tienda <span className="text-blush-600 text-xs font-medium">¡Gratis!</span>
                          </span>
                          <p className="text-xs text-ink-500 mt-1">
                            🏪 Jirón Preciados 145, 15038, Lima, Perú
                          </p>
                          <p className="text-xs text-ink-500">
                            Lunes a Sábado: 10:00 AM - 7:00 PM
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-ink-900 mb-3 uppercase tracking-widest">
                      Nombre
                    </label>
                    <input
                      type="text"
                      required
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="Nombre"
                      className="w-full px-4 py-3 border border-ink-200 focus:border-blush-500 focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-ink-900 mb-3 uppercase tracking-widest">
                      Apellido
                    </label>
                    <input
                      type="text"
                      required
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Apellido"
                      className="w-full px-4 py-3 border border-ink-200 focus:border-blush-500 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Mostrar campos de dirección solo si es envío a domicilio */}
                {deliveryMethod === 'shipping' && (
                  <>
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-ink-900 mb-3 uppercase tracking-widest">
                        Dirección
                      </label>
                      <input
                        type="text"
                        required={deliveryMethod === 'shipping'}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Calle y número"
                        className="w-full px-4 py-3 border border-ink-200 focus:border-blush-500 focus:outline-none transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-ink-900 mb-3 uppercase tracking-widest">
                          Ciudad
                        </label>
                        <input
                          type="text"
                          required={deliveryMethod === 'shipping'}
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="Ciudad"
                          className="w-full px-4 py-3 border border-ink-200 focus:border-blush-500 focus:outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-ink-900 mb-3 uppercase tracking-widest">
                          País
                        </label>
                        <input
                          type="text"
                          required={deliveryMethod === 'shipping'}
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          placeholder="País"
                          className="w-full px-4 py-3 border border-ink-200 focus:border-blush-500 focus:outline-none transition-colors"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-ink-900 mb-3 uppercase tracking-widest">
                        Código Postal
                      </label>
                      <input
                        type="text"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        placeholder="Código postal"
                        className="w-full px-4 py-3 border border-ink-200 focus:border-blush-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </>
                )}

                {/* Confirmación de retiro en tienda */}
                {deliveryMethod === 'pickup' && (
                  <div className="mb-4 p-4 bg-blush-50 border border-blush-200 rounded">
                    <p className="text-sm text-ink-900 mb-2">
                      <span className="font-medium">✓ Retiro en Tienda Confirmado</span>
                    </p>
                    <p className="text-xs text-ink-600">
                      Tu pedido estará listo para retiro en <strong>2-3 días hábiles</strong>. Te enviaremos un email de confirmación con los detalles.
                    </p>
                  </div>
                )}
              </div>

              {/* Botón de Compra */}
              {checkoutError && (
                <p className="mb-4 text-sm text-blush-600" role="alert">
                  {checkoutError} Verifica que el producto exista en Shopify con el mismo nombre.
                </p>
              )}
              <button
                type="submit"
                className="w-full bg-ink-900 text-sand-50 py-4 uppercase tracking-widest font-medium text-sm hover:bg-blush-500 transition-colors mb-4"
              >
                Completar Compra
              </button>
            </form>
          </div>

          {/* Resumen del Carrito */}
          <div className="lg:col-span-1">
            <div className="bg-sand-100 p-8 sticky top-28">
              <h3 className="text-lg font-medium text-ink-900 mb-6 uppercase tracking-widest">
                Resumen
              </h3>

              {/* Productos */}
              <div className="mb-6 pb-6 border-b border-ink-200">
                {items.map((item, index) => (
                  <div key={index} className="flex gap-4 mb-6 pb-6 border-b border-ink-100 last:border-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover bg-ink-50"
                    />
                    <div className="flex-1">
                      <p className="text-sm text-ink-900 font-medium mb-1 line-clamp-2">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-ink-500 mb-2">
                        {item.size ? `Talla: ${item.size}` : ''}
                        {item.size && item.color ? ' · ' : ''}
                        {item.color ? `Color: ${item.color}` : ''}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onUpdateQty(index, item.quantity - 1)}
                            className="w-6 h-6 border border-ink-300 flex items-center justify-center hover:bg-ink-50 text-xs"
                          >
                            −
                          </button>
                          <span className="w-6 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQty(index, item.quantity + 1)}
                            className="w-6 h-6 border border-ink-300 flex items-center justify-center hover:bg-ink-50 text-xs"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => onRemove(index)}
                          className="text-ink-400 hover:text-blush-500 transition-colors"
                          aria-label="Eliminar"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-sm font-medium text-ink-900 mt-2">
                        {formatPrice(item.product.price * item.quantity, currency)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Código de Descuento */}
              <div className="mb-6 pb-6 border-b border-ink-200">
                <label className="text-xs font-medium text-ink-900 mb-2 block uppercase tracking-widest">
                  Código de Descuento
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Ingresa código"
                    className="flex-1 px-3 py-2 border border-ink-200 text-sm focus:border-blush-500 focus:outline-none"
                  />
                  <button
                    onClick={handleApplyPromo}
                    className="px-4 py-2 bg-ink-900 text-sand-50 text-xs font-medium uppercase tracking-widest hover:bg-blush-500 transition-colors"
                  >
                    Aplicar
                  </button>
                </div>
              </div>

              {/* Totales */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-ink-600">Subtotal</span>
                  <span className="font-medium text-ink-900">{formatPrice(subtotal, currency)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-sm text-blush-600">
                    <span>Descuento</span>
                    <span>-{formatPrice(discount, currency)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm border-t border-ink-200 pt-3">
                  <span className="text-ink-600">
                    {deliveryMethod === 'pickup' 
                      ? 'Retiro en Tienda (Gratis)' 
                      : `Envío ${shipping === 0 ? '(Gratis)' : ''}`}
                  </span>
                  <span className="font-medium text-ink-900">{formatPrice(shipping, currency)}</span>
                </div>
                <div className="flex justify-between text-lg font-medium border-t border-ink-200 pt-3">
                  <span className="text-ink-900">Total</span>
                  <span className="text-ink-900">{formatPrice(total, currency)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
