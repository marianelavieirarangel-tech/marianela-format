import { useEffect, useState } from 'react';
import { ArrowRight, Check, MessageCircle } from 'lucide-react';
import type { LanguageCode } from '@/lib/language';
import tripHeroImage from '@/assets/hero-beach.jpg';

const gallery = [
  'https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?auto=compress&cs=tinysrgb&w=900',
  'https://images.pexels.com/photos/1687845/pexels-photo-1687845.jpeg?auto=compress&cs=tinysrgb&w=900',
  'https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=900',
  'https://images.pexels.com/photos/1025469/pexels-photo-1025469.jpeg?auto=compress&cs=tinysrgb&w=900',
  'https://images.pexels.com/photos/3155666/pexels-photo-3155666.jpeg?auto=compress&cs=tinysrgb&w=900',
  'https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=900',
];

const tripMoments = [
  {
    image: 'https://6a8377665cc6de03eb430013.imgix.net/sandbox/pexels-cristian-rojas-10039313.jpg',
    title: 'Momentos reales',
    angle: 'rotate-[-2deg]',
  },
  {
    image: 'https://6a8377665cc6de03eb430013.imgix.net/sandbox/pexels-yuliia-auer-3541449-5303407.jpg',
    title: 'Ritmo relajado',
    angle: 'rotate-[2deg]',
  },
  {
    image: 'https://6a8377665cc6de03eb430013.imgix.net/sandbox/pexels-yuliia-auer-3541449-5303408.jpg',
    title: 'Historias compartidas',
    angle: 'rotate-[-1deg]',
  },
];

type Props = { language: LanguageCode };

type GroupTripsCopy = {
  badge: string;
  title: string;
  intro: string;
  reserve: string;
  destinations: string;
  stressFree: string;
  madeToShare: string;
  groupStory: string;
  groupDescription: string;
  moments: string[];
  steps: { title: string; text: string }[];
  includedLabel: string;
  includedTitle: string;
  included: string[];
  sharedMoments: string;
  inspiration: string;
  ready: string;
  makeItReal: string;
  closing: string;
  whatsapp: string;
  whatsappMessage: string;
};

const copy: Record<LanguageCode, GroupTripsCopy> = {
  es: {
    badge: 'Experiencias que se comparten', title: 'Viajes Grupales',
    intro: 'Escapadas diseñadas para celebrar juntas, descubrir nuevos lugares y volver con historias que duran para siempre.',
    reserve: 'Reserva tu experiencia', destinations: 'Destinos únicos', stressFree: 'Sin estrés',
    madeToShare: 'Hecho para compartir', groupStory: 'Tu grupo, tu ritmo, tu historia',
    groupDescription: 'Nos encargamos de convertir esa idea que tienen en una experiencia especial, cuidando cada detalle para que todas se sientan cómodas.',
    moments: ['Momentos reales', 'Ritmo relajado', 'Historias compartidas'],
    steps: [
      { title: 'Cuéntanos tu idea', text: 'Escríbenos por WhatsApp o Instagram y cuéntanos cuándo viajas, cuántas personas son y qué tienen en mente.' },
      { title: 'Diseñamos la experiencia', text: 'Armamos una propuesta a tu medida con actividades, destinos y detalles pensados para que todos disfruten.' },
      { title: 'Vive el viaje', text: 'Te acompañamos antes y durante la aventura para que solo te preocupes por crear recuerdos inolvidables.' },
    ],
    includedLabel: 'Lo que incluye', includedTitle: 'Pensado para disfrutar sin complicaciones',
    included: ['Asesoría personalizada para tu grupo', 'Propuestas adaptadas a tu presupuesto', 'Acompañamiento cercano en cada etapa'],
    sharedMoments: 'Momentos compartidos', inspiration: 'Inspírate para tu próxima escapada',
    ready: '¿Listas para empezar?', makeItReal: 'Hagamos ese viaje realidad',
    closing: 'Cuéntanos qué están imaginando y preparemos juntas una propuesta inolvidable.',
    whatsapp: 'Escríbenos por WhatsApp', whatsappMessage: 'Hola, quiero información sobre Viajes Grupales.',
  },
  en: {
    badge: 'Shared experiences', title: 'Group Trips',
    intro: 'Getaways designed to celebrate together, discover new places and return with stories that last forever.',
    reserve: 'Reserve your experience', destinations: 'Unique destinations', stressFree: 'Stress-free',
    madeToShare: 'Made to share', groupStory: 'Your group, your pace, your story',
    groupDescription: 'We turn your idea into a special experience, taking care of every detail so everyone feels comfortable.',
    moments: ['Real moments', 'A relaxed pace', 'Shared stories'],
    steps: [
      { title: 'Tell us your idea', text: 'Write to us on WhatsApp or Instagram and tell us when you are traveling, how many people are coming and what you have in mind.' },
      { title: 'We design the experience', text: 'We create a proposal tailored to your group, with activities, destinations and details designed for everyone to enjoy.' },
      { title: 'Live the journey', text: 'We accompany you before and during the adventure so you can focus on creating unforgettable memories.' },
    ],
    includedLabel: 'What is included', includedTitle: 'Designed for effortless enjoyment',
    included: ['Personalized advice for your group', 'Proposals adapted to your budget', 'Close support at every stage'],
    sharedMoments: 'Shared moments', inspiration: 'Find inspiration for your next getaway',
    ready: 'Ready to get started?', makeItReal: 'Let’s make that trip a reality',
    closing: 'Tell us what you are imagining and let’s prepare an unforgettable proposal together.',
    whatsapp: 'Write to us on WhatsApp', whatsappMessage: 'Hello, I would like information about Group Trips.',
  },
  pt: {
    badge: 'Experiências para compartilhar', title: 'Viagens em Grupo',
    intro: 'Escapadas planejadas para celebrar juntas, descobrir novos lugares e voltar com histórias para sempre.',
    reserve: 'Reserve sua experiência', destinations: 'Destinos únicos', stressFree: 'Sem estresse',
    madeToShare: 'Feito para compartilhar', groupStory: 'Seu grupo, seu ritmo, sua história',
    groupDescription: 'Transformamos essa ideia em uma experiência especial, cuidando de cada detalhe para que todas se sintam confortáveis.',
    moments: ['Momentos reais', 'Ritmo tranquilo', 'Histórias compartilhadas'],
    steps: [
      { title: 'Conte-nos sua ideia', text: 'Escreva pelo WhatsApp ou Instagram e conte quando vocês viajam, quantas pessoas são e o que imaginam.' },
      { title: 'Criamos a experiência', text: 'Montamos uma proposta sob medida com atividades, destinos e detalhes para todos aproveitarem.' },
      { title: 'Viva a viagem', text: 'Acompanhamos vocês antes e durante a aventura para que só precisem criar memórias inesquecíveis.' },
    ],
    includedLabel: 'O que inclui', includedTitle: 'Pensado para aproveitar sem complicações',
    included: ['Consultoria personalizada para seu grupo', 'Propostas adaptadas ao seu orçamento', 'Acompanhamento próximo em cada etapa'],
    sharedMoments: 'Momentos compartilhados', inspiration: 'Inspire-se para sua próxima escapada',
    ready: 'Prontas para começar?', makeItReal: 'Vamos tornar essa viagem realidade',
    closing: 'Conte-nos o que estão imaginando e vamos preparar juntas uma proposta inesquecível.',
    whatsapp: 'Escreva pelo WhatsApp', whatsappMessage: 'Olá, quero informações sobre Viagens em Grupo.',
  },
  fr: {
    badge: 'Des expériences à partager', title: 'Voyages en groupe',
    intro: 'Des escapades conçues pour célébrer ensemble, découvrir de nouveaux lieux et revenir avec des histoires inoubliables.',
    reserve: 'Réservez votre expérience', destinations: 'Destinations uniques', stressFree: 'Sans stress',
    madeToShare: 'Fait pour être partagé', groupStory: 'Votre groupe, votre rythme, votre histoire',
    groupDescription: 'Nous transformons votre idée en une expérience spéciale en prenant soin de chaque détail pour le confort de toutes.',
    moments: ['Moments réels', 'Rythme détendu', 'Histoires partagées'],
    steps: [
      { title: 'Parlez-nous de votre idée', text: 'Écrivez-nous sur WhatsApp ou Instagram et dites-nous quand vous partez, combien vous êtes et ce que vous imaginez.' },
      { title: 'Nous créons l’expérience', text: 'Nous préparons une proposition sur mesure avec des activités, des destinations et des détails pour le plaisir de toutes.' },
      { title: 'Vivez le voyage', text: 'Nous vous accompagnons avant et pendant l’aventure pour que vous puissiez créer des souvenirs inoubliables.' },
    ],
    includedLabel: 'Ce qui est inclus', includedTitle: 'Pensé pour profiter sans complications',
    included: ['Conseils personnalisés pour votre groupe', 'Propositions adaptées à votre budget', 'Accompagnement à chaque étape'],
    sharedMoments: 'Moments partagés', inspiration: 'Inspirez-vous pour votre prochaine escapade',
    ready: 'Prêtes à commencer ?', makeItReal: 'Faisons de ce voyage une réalité',
    closing: 'Dites-nous ce que vous imaginez et préparons ensemble une proposition inoubliable.',
    whatsapp: 'Écrivez-nous sur WhatsApp', whatsappMessage: 'Bonjour, je souhaite des informations sur les voyages en groupe.',
  },
  it: {
    badge: 'Esperienze da condividere', title: 'Viaggi di gruppo',
    intro: 'Fughe pensate per festeggiare insieme, scoprire luoghi nuovi e tornare con storie indimenticabili.',
    reserve: 'Prenota la tua esperienza', destinations: 'Destinazioni uniche', stressFree: 'Senza stress',
    madeToShare: 'Pensato per condividere', groupStory: 'Il tuo gruppo, il tuo ritmo, la tua storia',
    groupDescription: 'Trasformiamo la vostra idea in un’esperienza speciale, curando ogni dettaglio per far sentire tutte a proprio agio.',
    moments: ['Momenti reali', 'Ritmo rilassato', 'Storie condivise'],
    steps: [
      { title: 'Raccontaci la tua idea', text: 'Scrivici su WhatsApp o Instagram e raccontaci quando partite, quante siete e cosa avete in mente.' },
      { title: 'Progettiamo l’esperienza', text: 'Creiamo una proposta su misura con attività, destinazioni e dettagli per il piacere di tutte.' },
      { title: 'Vivi il viaggio', text: 'Vi accompagniamo prima e durante l’avventura, così dovrete solo creare ricordi indimenticabili.' },
    ],
    includedLabel: 'Cosa include', includedTitle: 'Pensato per godersi tutto senza complicazioni',
    included: ['Consulenza personalizzata per il gruppo', 'Proposte adatte al vostro budget', 'Assistenza durante ogni fase'],
    sharedMoments: 'Momenti condivisi', inspiration: 'Lasciati ispirare per la prossima fuga',
    ready: 'Pronte a iniziare?', makeItReal: 'Rendiamo realtà questo viaggio',
    closing: 'Raccontaci cosa state immaginando e prepariamo insieme una proposta indimenticabile.',
    whatsapp: 'Scrivici su WhatsApp', whatsappMessage: 'Ciao, vorrei informazioni sui viaggi di gruppo.',
  },
  de: {
    badge: 'Erlebnisse zum Teilen', title: 'Gruppenreisen',
    intro: 'Auszeiten, um gemeinsam zu feiern, neue Orte zu entdecken und Geschichten fürs Leben zu sammeln.',
    reserve: 'Erlebnis reservieren', destinations: 'Einzigartige Ziele', stressFree: 'Stressfrei',
    madeToShare: 'Zum Teilen gemacht', groupStory: 'Eure Gruppe, euer Rhythmus, eure Geschichte',
    groupDescription: 'Wir machen aus eurer Idee ein besonderes Erlebnis und kümmern uns um jedes Detail, damit sich alle wohlfühlen.',
    moments: ['Echte Momente', 'Entspanntes Tempo', 'Geteilte Geschichten'],
    steps: [
      { title: 'Erzählt uns eure Idee', text: 'Schreibt uns über WhatsApp oder Instagram, wann ihr reist, wie viele ihr seid und was ihr euch vorstellt.' },
      { title: 'Wir gestalten das Erlebnis', text: 'Wir erstellen ein maßgeschneidertes Angebot mit Aktivitäten, Zielen und Details für alle.' },
      { title: 'Erlebt die Reise', text: 'Wir begleiten euch vor und während des Abenteuers, damit ihr unvergessliche Erinnerungen schafft.' },
    ],
    includedLabel: 'Das ist enthalten', includedTitle: 'Für unbeschwertes Genießen',
    included: ['Persönliche Beratung für eure Gruppe', 'Angebote passend zu eurem Budget', 'Persönliche Begleitung in jeder Phase'],
    sharedMoments: 'Gemeinsame Momente', inspiration: 'Inspiration für eure nächste Auszeit',
    ready: 'Bereit für den Start?', makeItReal: 'Machen wir diese Reise wahr',
    closing: 'Erzählt uns, was ihr euch vorstellt, und wir bereiten gemeinsam ein unvergessliches Angebot vor.',
    whatsapp: 'Schreibt uns auf WhatsApp', whatsappMessage: 'Hallo, ich möchte Informationen zu Gruppenreisen.',
  },
  nl: {
    badge: 'Ervaringen om te delen', title: 'Groepsreizen',
    intro: 'Uitstapjes om samen te vieren, nieuwe plekken te ontdekken en herinneringen voor altijd te maken.',
    reserve: 'Reserveer je ervaring', destinations: 'Unieke bestemmingen', stressFree: 'Zonder stress',
    madeToShare: 'Gemaakt om te delen', groupStory: 'Jullie groep, jullie tempo, jullie verhaal',
    groupDescription: 'We maken van jullie idee een bijzondere ervaring en zorgen voor elk detail, zodat iedereen zich prettig voelt.',
    moments: ['Echte momenten', 'Een ontspannen tempo', 'Gedeelde verhalen'],
    steps: [
      { title: 'Vertel ons jullie idee', text: 'Schrijf ons via WhatsApp of Instagram wanneer jullie reizen, met hoeveel jullie zijn en wat jullie in gedachten hebben.' },
      { title: 'Wij ontwerpen de ervaring', text: 'We maken een voorstel op maat met activiteiten, bestemmingen en details waar iedereen van geniet.' },
      { title: 'Beleef de reis', text: 'We begeleiden jullie voor en tijdens het avontuur, zodat jullie onvergetelijke herinneringen maken.' },
    ],
    includedLabel: 'Wat is inbegrepen', includedTitle: 'Ontworpen om zorgeloos te genieten',
    included: ['Persoonlijk advies voor jullie groep', 'Voorstellen passend bij jullie budget', 'Persoonlijke begeleiding in elke fase'],
    sharedMoments: 'Gedeelde momenten', inspiration: 'Inspiratie voor jullie volgende uitstapje',
    ready: 'Klaar om te beginnen?', makeItReal: 'Laten we deze reis werkelijkheid maken',
    closing: 'Vertel ons wat jullie bedenken en laten we samen een onvergetelijk voorstel maken.',
    whatsapp: 'Schrijf ons via WhatsApp', whatsappMessage: 'Hallo, ik wil graag informatie over groepsreizen.',
  },
};

export default function GroupTripsPage({ language }: Props) {
  const [activeHeroImage, setActiveHeroImage] = useState(0);
  const localized = copy[language];
  const localizedMoments = tripMoments.map((item, index) => ({
    ...item,
    title: localized.moments[index],
  }));
  const whatsappUrl = `https://wa.me/51949217304?text=${encodeURIComponent(localized.whatsappMessage)}`;

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveHeroImage((current) => (current + 1) % 2);
    }, 6500);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="bg-sand-50 text-ink-900">
      <section className="relative min-h-[100svh] overflow-hidden bg-ink-900">
        {[ 
          {
            src: 'https://6a8377665cc6de03eb430013.imgix.net/sandbox/imagen2.png',
            alt: 'Grupo de amigas disfrutando junto al mar',
          },
          {
            src: tripHeroImage,
            alt: 'Experiencia de viaje junto al mar',
          },
        ].map((image, index) => (
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1400ms] ease-in-out ${
              activeHeroImage === index ? 'opacity-100' : 'opacity-0'
            } ${index === 0 ? 'object-[center_12%]' : 'object-center'}`}
            loading={index === 0 ? 'eager' : 'lazy'}
            fetchPriority={index === 0 ? 'high' : 'auto'}
            decoding="async"
          />
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.12),_transparent_35%),linear-gradient(to_right,rgba(17,13,10,0.58),rgba(17,13,10,0.28),rgba(17,13,10,0.08))]" />
        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl items-end px-5 pb-12 sm:px-6 sm:pb-16 lg:px-10 lg:pb-20">
          <div className="max-w-[42rem] text-sand-50" style={{ textShadow: '0 2px 18px rgba(0, 0, 0, 0.38)' }}>
            <div className="mb-4 inline-flex items-center rounded-full border border-white/20 bg-white/8 px-2.5 py-1 text-[9px] uppercase tracking-[0.28em] text-blush-100 backdrop-blur-sm sm:mb-5 sm:px-3 sm:py-1.5 sm:text-[10px]">
              {localized.badge}
            </div>
            <h1 className="font-serif text-4xl font-light leading-[0.96] tracking-[0.02em] sm:text-5xl lg:text-7xl" style={{ textShadow: '0 2px 18px rgba(0, 0, 0, 0.4)' }}>
              {localized.title}
            </h1>
            <p className="mt-5 max-w-xl text-sm font-light leading-relaxed text-sand-100 sm:mt-7 sm:text-base lg:text-lg" style={{ textShadow: '0 2px 14px rgba(0, 0, 0, 0.28)' }}>
              {localized.intro}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:items-center">
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex w-full items-center justify-center rounded-full bg-sand-50 px-5 py-3 text-[9px] uppercase tracking-[0.22em] text-ink-900 shadow-[0_12px_24px_rgba(17,13,10,0.2)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-blush-200 sm:w-auto sm:px-6 sm:py-3.5 sm:text-[10px]">
                {localized.reserve} <ArrowRight size={15} strokeWidth={1.5} className="ml-3" />
              </a>
              <div className="flex flex-wrap items-center gap-2 text-[8px] uppercase tracking-[0.18em] text-sand-200/90 sm:gap-3 sm:text-[10px] sm:tracking-[0.22em]">
                <span className="rounded-full border border-white/20 bg-white/5 px-2.5 py-1.5">{localized.destinations}</span>
                <span className="rounded-full border border-white/20 bg-white/5 px-2.5 py-1.5">{localized.stressFree}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
        <div className="mb-10 max-w-2xl">
          <p className="mb-4 text-[11px] uppercase tracking-ultra text-blush-500">{localized.madeToShare}</p>
          <h2 className="font-serif text-4xl font-light tracking-wide sm:text-5xl">{localized.groupStory}</h2>
          <p className="mt-5 text-base font-light leading-relaxed text-ink-600">
            {localized.groupDescription}
          </p>
        </div>

        <div className="mb-16 grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
          {localizedMoments.map((item) => (
            <figure
              key={item.title}
              className="group"
            >
              <div className="overflow-hidden rounded-[28px] bg-ink-100 shadow-[0_24px_55px_rgba(22,18,15,0.12)]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="aspect-[4/5] w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  loading="lazy"
                />
              </div>
              <figcaption className="mt-4 flex items-center gap-3 pl-1">
                <span className="h-px w-8 bg-blush-400" />
                <p className="text-[10px] uppercase tracking-[0.24em] text-ink-500">{item.title}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="grid gap-px bg-ink-200 md:grid-cols-3">
          {localized.steps.map((step, index) => (
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
            <p className="mb-4 text-[11px] uppercase tracking-ultra text-blush-600">{localized.includedLabel}</p>
            <h2 className="font-serif text-4xl font-light tracking-wide sm:text-5xl">{localized.includedTitle}</h2>
            <ul className="mt-8 space-y-4 text-sm font-light text-ink-700">
              {localized.included.map((item) => (
                <li key={item} className="flex items-center gap-3"><Check size={16} className="text-blush-600" />{item}</li>
              ))}
            </ul>
          </div>
          <img src={gallery[2]} alt="Amigas compartiendo una experiencia de viaje" className="aspect-[4/3] w-full object-cover" loading="lazy" />
        </div>
      </section>

      <section className="bg-ink-900 px-6 py-20 text-center text-sand-50 lg:py-24">
        <p className="mb-4 text-[11px] uppercase tracking-ultra text-blush-300">{localized.ready}</p>
        <h2 className="font-serif text-4xl font-light tracking-wide sm:text-5xl">{localized.makeItReal}</h2>
        <p className="mx-auto mt-5 max-w-md text-sm font-light leading-relaxed text-sand-200">{localized.closing}</p>
        <a href={whatsappUrl} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center border border-sand-200/60 px-8 py-4 text-xs uppercase tracking-widest transition-colors hover:bg-sand-50 hover:text-ink-900">
          <MessageCircle size={16} className="mr-3" /> {localized.whatsapp}
        </a>
      </section>
    </div>
  );
}