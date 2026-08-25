import { useLocation } from 'react-router-dom';

const pageContent: Record<string, { title: string; intro: string; sections: string[] }> = {
  'envios-y-devoluciones': {
    title: 'Envíos y Devoluciones',
    intro: 'Queremos que recibir tu pieza Marianela Vieira sea una experiencia sencilla y cuidada.',
    sections: ['Realizamos envíos a todo el Perú. El tiempo y costo de entrega se calculan al finalizar la compra según tu ubicación.', 'Si necesitas gestionar un cambio o devolución, contáctanos dentro de los 30 días posteriores a la entrega. La pieza debe conservar sus etiquetas y estar sin uso.'],
  },
  'guia-de-tallas': {
    title: 'Guía de Tallas',
    intro: 'Encuentra el ajuste que mejor acompaña tu silueta.',
    sections: ['Consulta las medidas indicadas en la ficha de cada producto antes de comprar. Si estás entre dos tallas, te recomendamos elegir la mayor para un ajuste más cómodo.', 'Nuestro equipo puede ayudarte a elegir la talla ideal por WhatsApp.'],
  },
  'cuidado-de-prendas': {
    title: 'Cuidado de Prendas',
    intro: 'Cuida cada pieza para conservar su forma, color y textura.',
    sections: ['Lava a mano con agua fría y un detergente suave. No uses lejía ni suavizante.', 'Deja secar a la sombra, sin retorcer la prenda. Evita el contacto con superficies ásperas y productos bronceadores.'],
  },
  'preguntas-frecuentes': {
    title: 'Preguntas Frecuentes',
    intro: 'Aquí encontrarás respuestas a las consultas más comunes.',
    sections: ['Puedes comprar directamente desde nuestra tienda y pagar de forma segura. Recibirás la confirmación de tu pedido por correo electrónico.', 'Para consultas sobre stock, tallas o pedidos, escríbenos desde la sección Contáctanos.'],
  },
  contacto: {
    title: 'Contáctanos',
    intro: 'Estamos aquí para ayudarte a encontrar tu próxima pieza favorita.',
    sections: ['Escríbenos por WhatsApp para recibir asesoría personalizada sobre productos, tallas y pedidos.', 'También puedes encontrarnos en Instagram para conocer las novedades de Marianela Vieira.'],
  },
  'nuestra-historia': {
    title: 'Nuestra Historia',
    intro: 'Marianela Vieira nace de una mirada contemporánea sobre la feminidad, el diseño y la libertad.',
    sections: ['Creamos piezas que celebran la autenticidad y acompañan cada cuerpo con intención.', 'Cada colección une materiales cuidadosamente elegidos, siluetas actuales y una sensibilidad profundamente personal.'],
  },
  sostenibilidad: {
    title: 'Sostenibilidad',
    intro: 'Diseñamos con atención al impacto de cada decisión.',
    sections: ['Priorizamos piezas duraderas y procesos conscientes para que cada prenda acompañe más momentos.', 'Trabajamos continuamente para mejorar nuestros materiales, empaques y procesos de producción.'],
  },
  boutiques: {
    title: 'Boutiques',
    intro: 'Visítanos y descubre la colección en persona.',
    sections: ['Encuéntranos en Jirón Preciados 145, 15038, Lima, Perú.', 'Horario de atención: lunes a sábado, de 10:00 AM a 7:00 PM.'],
  },
  'trabaja-con-nosotros': {
    title: 'Trabaja con Nosotros',
    intro: 'Nos interesa conocer a personas con sensibilidad, criterio y ganas de crear.',
    sections: ['Envíanos tu presentación y portafolio a nuestro canal de contacto. Te escribiremos cuando exista una oportunidad alineada con tu perfil.'],
  },
  'terms-of-service': {
    title: 'Términos y Condiciones',
    intro: 'Condiciones de uso y compra de la tienda Marianela Vieira.',
    sections: ['El uso de esta tienda implica la aceptación de nuestras condiciones de compra, disponibilidad de productos y formas de pago.', 'Los precios, promociones y disponibilidad pueden cambiar sin previo aviso.'],
  },
  'privacy-policy': {
    title: 'Política de Privacidad',
    intro: 'Cuidamos la información que compartes con nosotros.',
    sections: ['Usamos tus datos únicamente para gestionar pedidos, responder consultas y mejorar tu experiencia en la tienda.', 'No vendemos tu información personal a terceros.'],
  },
  'cookie-policy': {
    title: 'Política de Cookies',
    intro: 'Usamos cookies para que la tienda funcione correctamente y entender cómo se utiliza.',
    sections: ['Puedes controlar o eliminar las cookies desde la configuración de tu navegador. Algunas funciones podrían no funcionar igual sin ellas.'],
  },
  'legal-notice': {
    title: 'Aviso Legal',
    intro: 'Información legal de Marianela Vieira.',
    sections: ['Este sitio y sus contenidos pertenecen a Marianela Vieira. Queda prohibida la reproducción no autorizada de sus textos, imágenes y diseños.'],
  },
};

export default function InfoPage() {
  const { pathname } = useLocation();
  const slug = pathname.split('/').filter(Boolean).pop() || '';
  const content = pageContent[slug];

  if (!content) return <div className="mx-auto max-w-3xl px-6 py-20">Página no encontrada.</div>;

  return (
    <section className="mx-auto max-w-3xl px-6 py-16 lg:px-10 lg:py-24">
      <p className="mb-4 text-xs uppercase tracking-[0.25em] text-blush-500">Marianela Vieira</p>
      <h1 className="mb-6 font-serif text-4xl font-light tracking-wide text-ink-900 lg:text-5xl">{content.title}</h1>
      <p className="mb-10 text-lg font-light leading-relaxed text-ink-600">{content.intro}</p>
      <div className="space-y-6 border-t border-ink-200 pt-8">
        {content.sections.map((section) => <p key={section} className="text-base font-light leading-relaxed text-ink-600">{section}</p>)}
      </div>
    </section>
  );
}
