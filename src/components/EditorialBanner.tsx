import { useReveal } from '@/hooks/useReveal';
import filosofiaLenceria from '@/assets/filosofia-lenceria.jpg';

export default function EditorialBanner() {
  const { ref, inView } = useReveal<HTMLDivElement>();

  return (
    <section className="relative py-24 lg:py-40 bg-ink-900 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={filosofiaLenceria}
          alt="Editorial Marianela Vieira"
          className="h-full w-full object-cover object-center opacity-50"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900/85 to-ink-900/40" />
      </div>

      <div
        ref={ref}
        className={`relative mx-auto max-w-3xl px-6 text-center reveal ${inView ? 'in-view' : ''}`}
      >
        <p className="text-blush-300 text-[11px] tracking-ultra uppercase mb-6">Nuestra Filosofía</p>
        <blockquote className="font-serif text-3xl sm:text-4xl lg:text-5xl text-sand-50 font-light leading-[1.3] tracking-wide text-balance">
          "Verano Swimwear — colección dedicada al sol, la playa y la libertad de movimiento."
        </blockquote>
        <p className="mt-8 text-sand-200 text-sm tracking-widest uppercase">— Marianela Vieira, Lima 2026</p>

        <div className="mt-12 flex justify-center">
          <a href="#coleccion-2026" className="btn-outline" style={{ borderColor: 'rgba(243,237,226,0.5)', color: '#f3ede2' }}>
            Ver el Lookbook
          </a>
        </div>
      </div>
    </section>
  );
}
