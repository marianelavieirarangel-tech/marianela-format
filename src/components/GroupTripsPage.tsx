import { ArrowRight, Check, Instagram, MessageCircle } from 'lucide-react';

const gallery = [
  'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=900',
  'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=900',
  'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=900',
  'https://images.pexels.com/photos/1025469/pexels-photo-1025469.jpeg?auto=compress&cs=tinysrgb&w=900',
  'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=900',
  'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=900',
];

const steps = [
  {
    title: 'Cuéntanos tu idea',
    text: 'Escríbenos por WhatsApp o Instagram y cuéntanos cuándo viajas, cuántas personas son y qué tienen en mente.',
  },
  {
    title: 'Diseñamos la experiencia',
    text: 'Armamos una propuesta a tu medida con actividades, destinos y detalles pensados para que todos disfruten.',
  },
  {
    title: 'Vive el viaje',
    text: 'Te acompañamos antes y durante la aventura para que solo te preocupes por crear recuerdos inolvidables.',
  },
];

export default function GroupTripsPage() {
  const whatsappUrl = 'https://wa.me/51949217304?text=Hola%2C%20quiero%20informaci%C3%B3n%20sobre%20Viajes%20Grupales.';

  return (
    <div className="bg-sand-50 text-ink-900">
      <section className="relative min-h-[68vh] overflow-hidden bg-ink-900">
        <img
          src="https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=1800"
          alt="Grupo de amigas disfrutando junto al mar"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900/75 via-ink-900/35 to-transparent" />
        <div className="relative mx-auto flex min-h-[68vh] max-w-7xl items-end px-6 pb-16 lg:px-10 lg:pb-24">
          <div className="max-w-2xl text-sand-50">
            <p className="mb-5 text-[11px] uppercase tracking-ultra text-blush-200">Experiencias que se comparten</p>
            <h1 className="font-serif text-5xl font-light leading-[0.95] tracking-wide sm:text-7xl">Viajes Grupales</h1>
            <p className="mt-7 max-w-lg text-base font-light leading-relaxed text-sand-100 sm:text-lg">
              Escapadas diseñadas para celebrar juntas, descubrir nuevos lugares y volver con historias que duran para siempre.
            </p>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="btn-primary mt-9 bg-sand-50 text-ink-900 hover:bg-blush-200">
              Reserva tu experiencia <ArrowRight size={15} strokeWidth={1.5} className="ml-3" />
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="mb-12 max-w-2xl">
          <p className="mb-4 text-[11px] uppercase tracking-ultra text-blush-500">Hecho para compartir</p>
          <h2 className="font-serif text-4xl font-light tracking-wide sm:text-5xl">Tu grupo, tu ritmo, tu historia</h2>
          <p className="mt-5 text-base font-light leading-relaxed text-ink-600">
            Nos encargamos de convertir esa idea que tienen en una experiencia especial, cuidando cada detalle para que todas se sientan cómodas.
          </p>
        </div>
        <div className="grid gap-px bg-ink-200 md:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.title} className="bg-sand-100 px-7 py-8 lg:px-9 lg:py-10">
              <span className="font-numeric text-sm text-blush-500">0{index + 1}</span>
              <h3 className="mt-8 font-serif text-2xl font-light">{step.title}</h3>
              <p className="mt-4 text-sm font-light leading-relaxed text-ink-600">{step.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-blush-100 py-20 lg:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-10">
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-ultra text-blush-600">Lo que incluye</p>
            <h2 className="font-serif text-4xl font-light tracking-wide sm:text-5xl">Pensado para disfrutar sin complicaciones</h2>
            <ul className="mt-8 space-y-4 text-sm font-light text-ink-700">
              {['Asesoría personalizada para tu grupo', 'Propuestas adaptadas a tu presupuesto', 'Acompañamiento cercano en cada etapa'].map((item) => (
                <li key={item} className="flex items-center gap-3"><Check size={16} className="text-blush-600" />{item}</li>
              ))}
            </ul>
          </div>
          <img src={gallery[2]} alt="Amigas compartiendo una experiencia de viaje" className="aspect-[4/3] w-full object-cover" loading="lazy" />
        </div>
      </section>

      <section className="overflow-hidden py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="mb-4 text-[11px] uppercase tracking-ultra text-blush-500">Momentos compartidos</p>
              <h2 className="font-serif text-4xl font-light tracking-wide sm:text-5xl">Inspírate para tu próxima escapada</h2>
            </div>
            <Instagram className="hidden text-blush-500 sm:block" size={25} strokeWidth={1.25} />
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-5">
            {gallery.map((image, index) => <img key={image} src={image} alt={`Viaje grupal, momento ${index + 1}`} className="aspect-[4/5] w-full object-cover" loading="lazy" />)}
          </div>
        </div>
      </section>

      <section className="bg-ink-900 px-6 py-20 text-center text-sand-50 lg:py-24">
        <p className="mb-4 text-[11px] uppercase tracking-ultra text-blush-300">¿Listas para empezar?</p>
        <h2 className="font-serif text-4xl font-light tracking-wide sm:text-5xl">Hagamos ese viaje realidad</h2>
        <p className="mx-auto mt-5 max-w-md text-sm font-light leading-relaxed text-sand-200">Cuéntanos qué están imaginando y preparemos juntas una propuesta inolvidable.</p>
        <a href={whatsappUrl} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center border border-sand-200/60 px-8 py-4 text-xs uppercase tracking-widest transition-colors hover:bg-sand-50 hover:text-ink-900">
          <MessageCircle size={16} className="mr-3" /> Escríbenos por WhatsApp
        </a>
      </section>
    </div>
  );
}