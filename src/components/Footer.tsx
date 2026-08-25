import { footerLinks } from '@/data/catalog';
import { Instagram, Music2, Mail } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const footerLinkPaths: Record<string, string> = {
  'Envíos y Devoluciones': '/pages/envios-y-devoluciones',
  'Guía de Tallas': '/pages/guia-de-tallas',
  'Cuidado de Prendas': '/pages/cuidado-de-prendas',
  'Preguntas Frecuentes': '/pages/preguntas-frecuentes',
  Contáctanos: '/pages/contacto',
  'Nuestra Historia': '/pages/nuestra-historia',
  Sostenibilidad: '/pages/sostenibilidad',
  Boutiques: '/pages/boutiques',
  'Trabaja con Nosotros': '/pages/trabaja-con-nosotros',
  'Términos y Condiciones': '/policies/terms-of-service',
  'Política de Privacidad': '/policies/privacy-policy',
  'Política de Cookies': '/policies/cookie-policy',
  'Aviso Legal': '/policies/legal-notice',
};

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
              Innovación, diseño y sofisticación en cada pieza de ropa de baño. Celebramos la autenticidad de cada silueta.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.instagram.com/marianela_official/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 border border-ink-600 flex items-center justify-center hover:border-sand-200 hover:text-sand-50 transition-colors"
                aria-label="Instagram de Marianela Vieira"
              >
                <Instagram size={16} strokeWidth={1.5} />
              </a>
              <a
                href="https://www.tiktok.com/@marianelavieira"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 border border-ink-600 flex items-center justify-center hover:border-sand-200 hover:text-sand-50 transition-colors"
                aria-label="TikTok de Marianela Vieira"
              >
                <Music2 size={16} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h5 className="text-[11px] uppercase tracking-widest text-sand-50 mb-5">{title}</h5>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <Link
                      to={footerLinkPaths[link] || '/pages/contacto'}
                      className="text-sm font-light text-sand-200 transition-colors duration-300 hover:text-sand-50 link-underline"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-ink-700">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 py-6 sm:flex-row lg:px-10">
          <p className="text-ink-400 text-xs tracking-wide">
            © 2026 Marianela Vieira. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2" aria-label="Medios de pago aceptados">
            <span className="mr-2 text-[10px] uppercase tracking-widest text-ink-400">Pagos seguros con</span>
            <span className="border border-ink-600 bg-ink-800 px-3 py-1 text-xs font-semibold italic tracking-wide text-sand-50">Izipay</span>
            <span className="border border-ink-600 bg-ink-800 px-3 py-1 text-xs font-semibold italic tracking-wide text-sand-50">VISA</span>
            <span className="border border-ink-600 bg-ink-800 px-3 py-1 text-xs font-semibold tracking-wide text-sand-50">mastercard</span>
            <span className="border border-ink-600 bg-ink-800 px-3 py-1 text-[9px] font-semibold tracking-wide text-sand-50">AMERICAN EXPRESS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
