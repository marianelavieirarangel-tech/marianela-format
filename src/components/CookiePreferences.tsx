import { useEffect, useState } from 'react';
import { KeyRound, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const COOKIE_PREFERENCES_KEY = 'marianela-cookie-preferences';

type Preferences = {
  necessary: true;
  analytics: boolean;
};

const defaultPreferences: Preferences = { necessary: true, analytics: false };

function readPreferences(): Preferences {
  try {
    const stored = JSON.parse(localStorage.getItem(COOKIE_PREFERENCES_KEY) || 'null') as Partial<Preferences> | null;
    return stored ? { necessary: true, analytics: Boolean(stored.analytics) } : defaultPreferences;
  } catch {
    return defaultPreferences;
  }
}

export default function CookiePreferences() {
  const [open, setOpen] = useState(false);
  const [preferences, setPreferences] = useState<Preferences>(defaultPreferences);

  useEffect(() => {
    setPreferences(readPreferences());
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const savePreferences = (nextPreferences: Preferences) => {
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(nextPreferences));
    setPreferences(nextPreferences);
    setOpen(false);
  };

  const acceptAll = () => savePreferences({ necessary: true, analytics: true });
  const rejectOptional = () => savePreferences(defaultPreferences);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Abrir preferencias de cookies"
        title="Preferencias de cookies"
        className="fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center border border-ink-200 bg-sand-50 text-ink-700 shadow-lg transition-all hover:border-blush-400 hover:text-blush-600"
      >
        <KeyRound size={18} strokeWidth={1.6} />
      </button>

      {open && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-ink-900/60 px-4 py-6" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
          <section className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto bg-sand-50 p-6 text-ink-900 shadow-2xl sm:p-10" role="dialog" aria-modal="true" aria-labelledby="cookie-preferences-title">
            <button type="button" onClick={() => setOpen(false)} aria-label="Cerrar preferencias de cookies" className="absolute right-5 top-5 text-ink-500 transition-colors hover:text-ink-900">
              <X size={20} strokeWidth={1.5} />
            </button>
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-blush-500">Privacidad</p>
            <h2 id="cookie-preferences-title" className="mb-4 font-serif text-3xl font-light tracking-wide sm:text-4xl">Tus preferencias de privacidad</h2>
            <p className="mb-8 max-w-xl text-sm font-light leading-relaxed text-ink-600">Puedes elegir qué tecnologías de seguimiento permites. Las cookies necesarias siempre están activas porque permiten que la tienda funcione correctamente.</p>

            <div className="divide-y divide-ink-200 border-y border-ink-200">
              <div className="flex items-start justify-between gap-6 py-5">
                <div>
                  <h3 className="mb-2 text-sm font-medium uppercase tracking-widest">Cookies necesarias</h3>
                  <p className="text-sm font-light leading-relaxed text-ink-600">Carrito, seguridad, sesión y preferencias básicas de la tienda.</p>
                </div>
                <span className="shrink-0 pt-1 text-xs uppercase tracking-widest text-ink-500">Siempre activas</span>
              </div>
              <div className="flex items-start justify-between gap-6 py-5">
                <div>
                  <h3 className="mb-2 text-sm font-medium uppercase tracking-widest">Cookies analíticas</h3>
                  <p className="text-sm font-light leading-relaxed text-ink-600">Nos ayudan a entender el uso general de la tienda y mejorar la experiencia.</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={preferences.analytics}
                  aria-label="Activar cookies analíticas"
                  onClick={() => setPreferences((current) => ({ ...current, analytics: !current.analytics }))}
                  className={`relative mt-1 h-6 w-11 shrink-0 rounded-full transition-colors ${preferences.analytics ? 'bg-ink-900' : 'bg-ink-300'}`}
                >
                  <span className={`absolute top-1 h-4 w-4 rounded-full bg-sand-50 transition-transform ${preferences.analytics ? 'translate-x-6' : 'translate-x-1'}`} />
                </button>
              </div>
            </div>

            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end">
              <button type="button" onClick={rejectOptional} className="px-5 py-3 text-xs uppercase tracking-widest text-ink-700 transition-colors hover:text-blush-600">Rechazar no esenciales</button>
              <button type="button" onClick={acceptAll} className="bg-ink-900 px-5 py-3 text-xs uppercase tracking-widest text-sand-50 transition-colors hover:bg-blush-500">Aceptar todo</button>
              <button type="button" onClick={() => savePreferences(preferences)} className="border border-ink-300 px-5 py-3 text-xs uppercase tracking-widest text-ink-800 transition-colors hover:border-ink-900">Guardar preferencias</button>
            </div>
            <Link to="/policies/cookie-policy" onClick={() => setOpen(false)} className="mt-6 inline-block text-xs text-ink-500 link-underline hover:text-ink-900">Ver Política de Cookies</Link>
          </section>
        </div>
      )}
    </>
  );
}
