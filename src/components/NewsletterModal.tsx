import { useEffect, useState } from 'react';
import { X, Check, ChevronDown } from 'lucide-react';

const STORAGE_KEY = 'mv_newsletter_dismissed';
const CAMPAIGN_IMAGE = 'https://6a8377665cc6de03eb430013.imgix.net/sandbox/image-fab9b537-a882-4910-bfbb-b0dd19094104.jfif';

const countryCodes = [
  { code: '+1', flag: 'US', name: 'Estados Unidos' },
  { code: '+1', flag: 'CA', name: 'Canadá' },
  { code: '+7', flag: 'RU', name: 'Rusia' },
  { code: '+20', flag: 'EG', name: 'Egipto' },
  { code: '+27', flag: 'ZA', name: 'Sudáfrica' },
  { code: '+30', flag: 'GR', name: 'Grecia' },
  { code: '+31', flag: 'NL', name: 'Países Bajos' },
  { code: '+32', flag: 'BE', name: 'Bélgica' },
  { code: '+33', flag: 'FR', name: 'Francia' },
  { code: '+34', flag: 'ES', name: 'España' },
  { code: '+36', flag: 'HU', name: 'Hungría' },
  { code: '+39', flag: 'IT', name: 'Italia' },
  { code: '+40', flag: 'RO', name: 'Rumania' },
  { code: '+41', flag: 'CH', name: 'Suiza' },
  { code: '+43', flag: 'AT', name: 'Austria' },
  { code: '+44', flag: 'UK', name: 'Reino Unido' },
  { code: '+45', flag: 'DK', name: 'Dinamarca' },
  { code: '+46', flag: 'SE', name: 'Suecia' },
  { code: '+47', flag: 'NO', name: 'Noruega' },
  { code: '+48', flag: 'PL', name: 'Polonia' },
  { code: '+49', flag: 'DE', name: 'Alemania' },
  { code: '+51', flag: 'PE', name: 'Perú' },
  { code: '+52', flag: 'MX', name: 'México' },
  { code: '+53', flag: 'CU', name: 'Cuba' },
  { code: '+54', flag: 'AR', name: 'Argentina' },
  { code: '+55', flag: 'BR', name: 'Brasil' },
  { code: '+56', flag: 'CL', name: 'Chile' },
  { code: '+57', flag: 'CO', name: 'Colombia' },
  { code: '+58', flag: 'VE', name: 'Venezuela' },
  { code: '+60', flag: 'MY', name: 'Malasia' },
  { code: '+61', flag: 'AU', name: 'Australia' },
  { code: '+62', flag: 'ID', name: 'Indonesia' },
  { code: '+63', flag: 'PH', name: 'Filipinas' },
  { code: '+64', flag: 'NZ', name: 'Nueva Zelanda' },
  { code: '+65', flag: 'SG', name: 'Singapur' },
  { code: '+66', flag: 'TH', name: 'Tailandia' },
  { code: '+81', flag: 'JP', name: 'Japón' },
  { code: '+82', flag: 'KR', name: 'Corea del Sur' },
  { code: '+84', flag: 'VN', name: 'Vietnam' },
  { code: '+86', flag: 'CN', name: 'China' },
  { code: '+90', flag: 'TR', name: 'Turquía' },
  { code: '+91', flag: 'IN', name: 'India' },
  { code: '+92', flag: 'PK', name: 'Pakistán' },
  { code: '+93', flag: 'AF', name: 'Afganistán' },
  { code: '+94', flag: 'LK', name: 'Sri Lanka' },
  { code: '+95', flag: 'MM', name: 'Myanmar' },
  { code: '+98', flag: 'IR', name: 'Irán' },
  { code: '+211', flag: 'SS', name: 'Sudán del Sur' },
  { code: '+212', flag: 'MA', name: 'Marruecos' },
  { code: '+213', flag: 'DZ', name: 'Argelia' },
  { code: '+216', flag: 'TN', name: 'Túnez' },
  { code: '+218', flag: 'LY', name: 'Libia' },
  { code: '+220', flag: 'GM', name: 'Gambia' },
  { code: '+221', flag: 'SN', name: 'Senegal' },
  { code: '+222', flag: 'MR', name: 'Mauritania' },
  { code: '+223', flag: 'ML', name: 'Mali' },
  { code: '+224', flag: 'GN', name: 'Guinea' },
  { code: '+225', flag: 'CI', name: 'Costa de Marfil' },
  { code: '+226', flag: 'BF', name: 'Burkina Faso' },
  { code: '+227', flag: 'NE', name: 'Níger' },
  { code: '+228', flag: 'TG', name: 'Togo' },
  { code: '+229', flag: 'BJ', name: 'Benín' },
  { code: '+230', flag: 'MU', name: 'Mauricio' },
  { code: '+231', flag: 'LR', name: 'Liberia' },
  { code: '+232', flag: 'SL', name: 'Sierra Leona' },
  { code: '+233', flag: 'GH', name: 'Ghana' },
  { code: '+234', flag: 'NG', name: 'Nigeria' },
  { code: '+235', flag: 'TD', name: 'Chad' },
  { code: '+236', flag: 'CF', name: 'República Centroafricana' },
  { code: '+237', flag: 'CM', name: 'Camerún' },
  { code: '+238', flag: 'CV', name: 'Cabo Verde' },
  { code: '+239', flag: 'ST', name: 'Santo Tomé y Príncipe' },
  { code: '+240', flag: 'GQ', name: 'Guinea Ecuatorial' },
  { code: '+241', flag: 'GA', name: 'Gabón' },
  { code: '+242', flag: 'CG', name: 'Congo' },
  { code: '+243', flag: 'CD', name: 'República Democrática del Congo' },
  { code: '+244', flag: 'AO', name: 'Angola' },
  { code: '+245', flag: 'GW', name: 'Guinea-Bisáu' },
  { code: '+246', flag: 'DG', name: 'Diego García' },
  { code: '+248', flag: 'SC', name: 'Seychelles' },
  { code: '+249', flag: 'SD', name: 'Sudán' },
  { code: '+250', flag: 'RW', name: 'Ruanda' },
  { code: '+251', flag: 'ET', name: 'Etiopía' },
  { code: '+252', flag: 'SO', name: 'Somalia' },
  { code: '+253', flag: 'DJ', name: 'Yibuti' },
  { code: '+254', flag: 'KE', name: 'Kenia' },
  { code: '+255', flag: 'TZ', name: 'Tanzania' },
  { code: '+256', flag: 'UG', name: 'Uganda' },
  { code: '+257', flag: 'BI', name: 'Burundi' },
  { code: '+258', flag: 'MZ', name: 'Mozambique' },
  { code: '+260', flag: 'ZM', name: 'Zambia' },
  { code: '+261', flag: 'MG', name: 'Madagascar' },
  { code: '+262', flag: 'RE', name: 'Reunión' },
  { code: '+263', flag: 'ZW', name: 'Zimbabue' },
  { code: '+264', flag: 'NA', name: 'Namibia' },
  { code: '+265', flag: 'MW', name: 'Malawi' },
  { code: '+266', flag: 'LS', name: 'Lesoto' },
  { code: '+267', flag: 'BW', name: 'Botsuana' },
  { code: '+268', flag: 'SZ', name: 'Suazilandia' },
  { code: '+269', flag: 'KM', name: 'Comoras' },
  { code: '+351', flag: 'PT', name: 'Portugal' },
  { code: '+352', flag: 'LU', name: 'Luxemburgo' },
  { code: '+353', flag: 'IE', name: 'Irlanda' },
  { code: '+354', flag: 'IS', name: 'Islandia' },
  { code: '+355', flag: 'AL', name: 'Albania' },
  { code: '+356', flag: 'MT', name: 'Malta' },
  { code: '+357', flag: 'CY', name: 'Chipre' },
  { code: '+358', flag: 'FI', name: 'Finlandia' },
  { code: '+370', flag: 'LT', name: 'Lituania' },
  { code: '+371', flag: 'LV', name: 'Letonia' },
  { code: '+372', flag: 'EE', name: 'Estonia' },
  { code: '+373', flag: 'MD', name: 'Moldavia' },
  { code: '+374', flag: 'AM', name: 'Armenia' },
  { code: '+375', flag: 'BY', name: 'Bielorrusia' },
  { code: '+376', flag: 'AD', name: 'Andorra' },
  { code: '+377', flag: 'MC', name: 'Mónaco' },
  { code: '+380', flag: 'UA', name: 'Ucrania' },
  { code: '+381', flag: 'RS', name: 'Serbia' },
  { code: '+382', flag: 'ME', name: 'Montenegro' },
  { code: '+385', flag: 'HR', name: 'Croacia' },
  { code: '+386', flag: 'SI', name: 'Eslovenia' },
  { code: '+387', flag: 'BA', name: 'Bosnia y Herzegovina' },
  { code: '+389', flag: 'MK', name: 'Macedonia del Norte' },
  { code: '+420', flag: 'CZ', name: 'República Checa' },
  { code: '+421', flag: 'SK', name: 'Eslovaquia' },
  { code: '+500', flag: 'FK', name: 'Islas Malvinas' },
  { code: '+595', flag: 'PY', name: 'Paraguay' },
  { code: '+598', flag: 'UY', name: 'Uruguay' },
  { code: '+971', flag: 'AE', name: 'Emiratos Árabes Unidos' },
  { code: '+972', flag: 'IL', name: 'Israel' },
  { code: '+973', flag: 'BH', name: 'Baréin' },
  { code: '+974', flag: 'QA', name: 'Catar' },
  { code: '+976', flag: 'MN', name: 'Mongolia' },
  { code: '+992', flag: 'TJ', name: 'Tayikistán' },
  { code: '+995', flag: 'GE', name: 'Georgia' },
  { code: '+996', flag: 'KG', name: 'Kirguistán' },
  { code: '+998', flag: 'UZ', name: 'Uzbekistán' },
];

export default function NewsletterModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('+51');
  const [countryOpen, setCountryOpen] = useState(false);
  const [birthday, setBirthday] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      const timer = setTimeout(() => setOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [open]);

  const close = () => {
    setOpen(false);
    sessionStorage.setItem(STORAGE_KEY, '1');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !phone || !birthday) {
      setError('Por favor completa todos los campos.');
      return;
    }
    if (!accepted) {
      setError('Debes aceptar los términos y condiciones.');
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch('/api/shopify/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, phone, countryCode, birthday }),
      });
      const body = await response.text();
      let result: { error?: string } = {};
      try {
        result = JSON.parse(body) as { error?: string };
      } catch {
        throw new Error(body.slice(0, 160) || 'Respuesta inválida del servidor.');
      }
      if (!response.ok) throw new Error(result.error || 'No se pudo completar la suscripción.');
      setSubmitted(true);
      setTimeout(() => close(), 2800);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'No se pudo completar la suscripción.');
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-ink-900/60 backdrop-blur-md animate-fade-in"
        onClick={close}
      />

      {/* Modal card */}
      <div className="relative w-full max-w-4xl bg-sand-50 shadow-2xl animate-scale-in overflow-hidden max-h-[92vh] overflow-y-auto no-scrollbar">
        {/* Close button */}
        <button
          onClick={close}
          className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center bg-sand-50/80 backdrop-blur-sm hover:bg-ink-900 hover:text-sand-50 transition-colors duration-300"
          aria-label="Cerrar"
        >
          <X size={18} strokeWidth={1.5} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Campaign image */}
          <div className="relative h-64 md:h-auto md:min-h-[560px] bg-ink-100 overflow-hidden">
            <img
              src={CAMPAIGN_IMAGE}
              alt="Campaña Marianela Vieira"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/50 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-center md:text-left">
              <p className="font-serif text-sand-50 text-2xl md:text-3xl font-light leading-tight tracking-wide">
                Marianela Vieira
              </p>
              <p className="text-sand-200 text-[10px] tracking-ultra uppercase mt-2">
                Colección Primavera 2026
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 lg:p-12 flex flex-col items-center justify-center text-center bg-sand-50">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 animate-fade-up">
                <div className="w-16 h-16 rounded-full bg-sage-200 flex items-center justify-center mb-6">
                  <Check size={28} strokeWidth={1.5} className="text-sage-700" />
                </div>
                <h3 className="font-serif text-3xl text-ink-900 font-light mb-3">¡Bienvenida!</h3>
                <p className="text-ink-600 text-sm font-light leading-relaxed max-w-xs">
                  Revisa tu correo para obtener tu código de descuento del 10%.
                </p>
              </div>
            ) : (
              <>
                {/* Heading */}
                <p className="text-blush-500 text-[10px] tracking-ultra uppercase mb-4">
                  Únete a Marianela Vieira
                </p>
                <h2 className="font-serif text-3xl lg:text-4xl text-ink-900 font-medium leading-tight mb-3">
                  ¡10% OFF en tu<br />primera compra!
                </h2>
                <p className="text-ink-500 text-sm font-light leading-relaxed max-w-xs mb-8">
                  Suscríbete para recibir promociones exclusivas, nuevas colecciones y acceso anticipado a nuestras ediciones limitadas.
                </p>

                {/* Form */}
                <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-5">
                  {/* Email */}
                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Correo electrónico"
                      className="w-full bg-transparent border-b border-ink-200 py-3 text-sm tracking-wide text-ink-900 placeholder-ink-400 focus:border-ink-800 focus:outline-none transition-colors duration-300"
                    />
                  </div>

                  {/* Phone with country code */}
                  <div className="flex items-center gap-3 border-b border-ink-200 focus-within:border-ink-800 transition-colors duration-300">
                    {/* Country selector */}
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setCountryOpen((v) => !v)}
                        className="flex items-center gap-1.5 py-3 text-sm tracking-wide text-ink-900 hover:text-blush-500 transition-colors"
                      >
                        <span className="text-[10px] font-medium bg-ink-100 px-1.5 py-0.5 rounded-sm">{countryCodes.find((c) => c.code === countryCode)?.flag}</span>
                        <span>{countryCode}</span>
                        <ChevronDown size={13} strokeWidth={1.5} className={`transition-transform duration-300 ${countryOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {countryOpen && (
                        <div className="absolute top-full left-0 mt-1 w-44 max-h-52 overflow-y-auto bg-sand-50 border border-ink-200 shadow-xl z-10 no-scrollbar">
                          {countryCodes.map((c) => (
                            <button
                              key={`${c.code}-${c.name}`}
                              type="button"
                              onClick={() => {
                                setCountryCode(c.code);
                                setCountryOpen(false);
                              }}
                              className={`flex items-center gap-2 w-full px-3 py-2.5 text-left text-xs tracking-wide hover:bg-ink-100 transition-colors ${
                                countryCode === c.code ? 'text-ink-900 font-medium' : 'text-ink-600'
                              }`}
                            >
                              <span className="text-[10px] font-medium bg-ink-100 px-1.5 py-0.5 rounded-sm w-7 text-center">{c.flag}</span>
                              <span>{c.name}</span>
                              <span className="ml-auto text-ink-400">{c.code}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Número de teléfono"
                      className="flex-1 bg-transparent py-3 text-sm tracking-wide text-ink-900 placeholder-ink-400 focus:outline-none"
                    />
                  </div>

                  {/* Birthday */}
                  <div>
                    <input
                      type="date"
                      value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                      className="w-full bg-transparent border-b border-ink-200 py-3 text-sm tracking-wide text-ink-900 placeholder-ink-400 focus:border-ink-800 focus:outline-none transition-colors duration-300"
                    />
                  </div>

                  {/* Terms checkbox */}
                  <label className="flex items-start gap-3 cursor-pointer group pt-2">
                    <span className="relative mt-0.5 shrink-0">
                      <input
                        type="checkbox"
                        checked={accepted}
                        onChange={(e) => setAccepted(e.target.checked)}
                        className="sr-only peer"
                      />
                      <span className="block w-4 h-4 border border-ink-300 peer-checked:bg-ink-900 peer-checked:border-ink-900 transition-colors duration-300" />
                      {accepted && (
                        <Check size={12} strokeWidth={2.5} className="absolute top-1 left-1 text-sand-50 pointer-events-none" />
                      )}
                    </span>
                    <span className="text-xs text-ink-500 font-light leading-relaxed text-left">
                      Acepto términos y condiciones y confirmo que soy mayor de edad
                    </span>
                  </label>

                  {/* Error */}
                  {error && (
                    <p className="text-blush-600 text-xs font-light animate-fade-in">{error}</p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-4 bg-ink-900 text-sand-50 text-[11px] uppercase tracking-widest transition-all duration-500 hover:bg-ink-800 hover:tracking-ultra"
                  >
                    {submitting ? 'Enviando...' : 'Suscribirme'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
