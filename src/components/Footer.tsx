import { footerLinks } from '@/data/catalog';
import { Instagram, Facebook, Twitter, Mail } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <footer className="bg-ink-900 text-sand-100">
      {/* Newsletter */}
      <div className="border-b border-ink-700">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-md">
              <h3 className="font-serif text-3xl text-sand-50 font-light tracking-wide mb-3">
                Únete a Marianela Vieira
              </h3>
              <p className="text-sand-200 text-sm font-light leading-relaxed">
                Recibe acceso anticipado a nuevas colecciones, ediciones limitadas y ofertas exclusivas.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="w-full max-w-md">
              <div className="flex items-end gap-4">
                <div className="flex-1 relative">
                  <Mail size={18} strokeWidth={1.5} className="absolute left-0 bottom-3.5 text-ink-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Tu correo electrónico"
                    className="w-full bg-transparent border-b border-ink-600 pl-8 py-3.5 text-sm tracking-wide text-sand-50 placeholder-ink-400 focus:border-sand-200 focus:outline-none transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-sand-50 text-ink-900 text-[11px] uppercase tracking-widest hover:bg-blush-200 transition-colors duration-300 whitespace-nowrap"
                >
                  Suscribirme
                </button>
              </div>
              {submitted && (
                <p className="mt-3 text-blush-300 text-xs tracking-wide animate-fade-in">
                  Gracias por unirte a Marianela Vieira.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Links */}
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <h4 className="font-serif text-2xl tracking-[0.15em] text-sand-50 mb-4">MARIANELA VIEIRA</h4>
            <p className="text-sand-200 text-sm font-light leading-relaxed max-w-xs mb-6">
              Ropa de baño y lencería que celebra tu confianza corporal. Diseñadas para todas las formas, todos los cuerpos, toda la belleza.
            </p>
            <div className="flex items-center gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 border border-ink-600 flex items-center justify-center hover:border-sand-200 hover:text-sand-50 transition-colors"
                  aria-label="Red social"
                >
                  <Icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h5 className="text-[11px] uppercase tracking-widest text-sand-50 mb-5">{title}</h5>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm font-light text-sand-200 hover:text-sand-50 link-underline"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ink-700">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-ink-400 text-xs tracking-wide">
            © 2026 Marianela Vieira. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-5 text-ink-400 text-xs">
            <span>Visa</span>
            <span>Mastercard</span>
            <span>Amex</span>
            <span>PayPal</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
