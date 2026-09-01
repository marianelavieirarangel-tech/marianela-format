import { useLocation } from 'react-router-dom';

type LegalSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

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
    sections: ['Encuéntranos en Jirón Preciados 145, 15038, Lima, Perú.', 'Horario de atención: lunes a sábado, de 9:00 AM a 9:00 PM.'],
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
  'refund-policy': {
    title: 'Política de Reembolsos y Devoluciones',
    intro: 'Marianela Trajes de Baño S.A.C. garantiza la calidad e higiene de los productos adquiridos en marianelavieira.com. Por motivos de higiene y salud íntima, aplicamos controles estrictos a las devoluciones.',
    sections: [],
  },
};

const historyImageUrl = 'https://6a97517ab0ce9b07e370fab9.imgix.net/sandbox/b138c4371eef7e0fbe381c3a38d8cffb.jpg';
const faqImageUrl = 'https://6a97517ab0ce9b07e370fab9.imgix.net/sandbox/405324a0023cf899bfa130f319f6d192.jpg';
const contactImageUrl = 'https://6a97517ab0ce9b07e370fab9.imgix.net/sandbox/d12b2582dbe41a3c550ec7497f3fed14.jpg';

const privacyPolicySections: LegalSection[] = [
  {
    title: 'Art. 1. El controlador de datos',
    paragraphs: [
      'El responsable del tratamiento de los datos recopilados a través de la tienda online de Marianela Vieira es Marianela Trajes de Baño S.A.C., con RUC 20604664927, con domicilio fiscal y administrativo en Jirón Preciados 145, 15038, Lima, Perú.',
      'Puedes contactar con la empresa escribiendo a soporte@marianelavieira.com.',
    ],
  },
  {
    title: 'Art. 2. Fuente de datos personales',
    paragraphs: [
      'La recopilación de datos personales se realiza al registrar información proporcionada directamente por la persona interesada durante el contacto inicial, el registro de usuario, el proceso de compra o las comunicaciones posteriores.',
      'También pueden tratarse datos de terceros comunicados por los usuarios, por ejemplo, cuando se compra un producto para ser entregado a otra persona. En esos casos, quien proporciona la información es responsable de haber obtenido previamente el consentimiento del tercero e informarle sobre esta política.',
    ],
  },
  {
    title: 'Art. 3. Métodos y propósitos del tratamiento',
    paragraphs: [
      'Los datos se tratan mediante medios electrónicos y digitales, aplicando medidas razonables de seguridad y confidencialidad de acuerdo con la normativa vigente. Al aceptar esta política, el usuario autoriza el tratamiento de sus datos para fines logísticos, comerciales y de gestión de compra.',
    ],
  },
  {
    title: 'Art. 4. Finalidades del tratamiento',
    bullets: [
      'Cumplir obligaciones legales y fiscales relacionadas con las relaciones comerciales.',
      'Gestionar clientes, contratos, pedidos, envíos, devoluciones y comprobantes de pago.',
      'Prestar los servicios de la tienda online y brindar soporte al cliente.',
      'Enviar comunicaciones informativas o promocionales cuando exista consentimiento.',
      'Analizar de forma general el uso de la tienda y mejorar la experiencia de compra.',
      'Gestionar pagos y prevenir actividades fraudulentas.',
    ],
    paragraphs: [
      'Los datos personales no se comunicarán a terceros para fines ajenos a la ley. Podrán compartirse únicamente cuando sea necesario para ejecutar el contrato, como con empresas de courier o pasarelas de pago, o cuando lo solicite una autoridad competente.',
    ],
  },
  {
    title: 'Art. 5. Período de conservación',
    bullets: [
      'Los datos fiscales y contables se conservarán durante el plazo legal aplicable contado desde la fecha de adquisición.',
      'Los datos utilizados para fines comerciales y de marketing se conservarán hasta que el usuario solicite su baja o revoque su consentimiento.',
    ],
  },
  {
    title: 'Art. 6. Derechos de la parte interesada',
    paragraphs: [
      'El usuario puede ejercer en cualquier momento sus derechos de acceso, rectificación, actualización, limitación, oposición, cancelación y portabilidad, cuando correspondan conforme a la normativa aplicable.',
      'Para ejercer estos derechos, debe escribir a soporte@marianelavieira.com indicando su nombre, el derecho que desea ejercer y cualquier información que ayude a identificar su solicitud. Responderemos dentro de los plazos establecidos por la ley.',
    ],
  },
  {
    title: 'Art. 7. Actualizaciones',
    paragraphs: [
      'Esta política puede actualizarse para reflejar cambios legales, operativos o tecnológicos. La versión vigente estará siempre disponible en esta página.',
    ],
  },
];

const termsSections: LegalSection[] = [
  {
    title: 'Condiciones generales de venta online',
    paragraphs: [
      'Las presentes condiciones se aplican exclusivamente a la venta a distancia, a través de la web, de los productos ilustrados y descritos en el sitio oficial de Marianela Vieira.',
      'En caso de cambios, se aplicarán a cada compra las condiciones publicadas en el sitio al momento del envío de la propuesta de pedido. El Cliente debe leer y aceptar estas condiciones antes de enviar su pedido.',
    ],
  },
  {
    title: '1. Sujetos',
    paragraphs: [
      '1.1 El vendedor de los Productos es Marianela Trajes de Baño S.A.C., con RUC 20604664927, con domicilio fiscal y administrativo en Jirón Preciados 145, 15038, Lima, Perú.',
      '1.2 Correo electrónico de contacto y soporte: soporte@marianelavieira.com.',
      '1.3 Las ofertas están dirigidas a clientes adultos. Al realizar un pedido, el Cliente declara ser mayor de 18 años y tener capacidad legal para celebrar contratos vinculantes.',
    ],
  },
  {
    title: '2. Precios y moneda',
    paragraphs: [
      '2.1 Los precios de los Productos y los gastos de envío son los indicados en el Sitio al momento de transmitir el pedido. La moneda oficial de transacción es el sol peruano (S/).',
      '2.2 Los precios indicados incluyen el IGV aplicable conforme a la legislación peruana.',
    ],
  },
  {
    title: '3. Métodos de pago',
    paragraphs: [
      'El pago se realiza de forma segura a través de Izipay u otros métodos integrados y autorizados en el Sitio. Al utilizar una tarjeta de crédito o débito, el Cliente garantiza ser su legítimo titular.',
    ],
  },
  {
    title: '4. Envíos y entregas',
    paragraphs: [
      'Los Productos serán enviados a la dirección indicada por el Cliente durante el proceso de compra o entregados bajo las modalidades logísticas disponibles en la plataforma dentro del territorio peruano.',
    ],
  },
  {
    title: '5. Derecho de desistimiento y cambios',
    paragraphs: [
      'Conforme a la normativa de protección al consumidor, el Cliente cuenta con el plazo aplicable desde la recepción del Producto para solicitar cambios o devoluciones, siempre que la prenda se encuentre en perfecto estado, sin uso y con sus etiquetas originales.',
    ],
  },
  {
    title: '6. Ley aplicable y jurisdicción',
    paragraphs: [
      'Estas condiciones se rigen por la legislación de la República del Perú. Cualquier disputa derivada de su interpretación o ejecución será sometida a la jurisdicción de los jueces y tribunales de Lima, Perú.',
    ],
  },
];

const cookieSections: LegalSection[] = [
  {
    title: 'Cómo utilizamos las cookies',
    paragraphs: [
      'Las cookies y tecnologías similares permiten que la tienda funcione correctamente, recuerde determinadas preferencias y nos ayude a comprender cómo se utiliza el sitio. Puedes controlar o eliminar las cookies desde la configuración de tu navegador; algunas funciones podrían verse afectadas.',
    ],
  },
  {
    title: '1. Cookies necesarias',
    paragraphs: ['Utilizamos cookies técnicas para actividades estrictamente necesarias, como la gestión del carrito, las sesiones de usuario y la seguridad de la tienda.'],
    bullets: [
      '_boomr_clss: duración indefinida.',
      'iub_storage_available: duración indefinida.',
      'NID: 7 meses.',
      'LANG: duración de la sesión.',
      'x-csrf-jwt: duración de la sesión.',
      'recentlyViewedProducts: duración indefinida.',
    ],
  },
  {
    title: '2. Servicios esenciales de terceros',
    paragraphs: [
      'Cloudflare, Inc.: servicio de optimización y distribución del tráfico que contribuye a la seguridad y el rendimiento de la Aplicación. Puede tratar instrumentos de seguimiento y datos técnicos conforme a su política de privacidad. Cookies: _cfuvid, de duración indefinida, y cf_clearance, con una duración aproximada de 30 minutos.',
      'Izipay: pasarela utilizada para procesar pagos con tarjeta de forma segura en Perú. Puede tratar datos de pago, datos de utilización, información de la transacción y correo electrónico. El tratamiento puede realizarse en Perú y Francia.',
    ],
  },
  {
    title: '3. Medición y analítica',
    paragraphs: [
      'Google Analytics 4, de Google LLC, puede utilizarse para medir el tráfico y analizar el uso de la tienda con el fin de mejorar el servicio. Puede tratar ciudad, datos de utilización, información del navegador, información del dispositivo e instrumentos de seguimiento. Cookies: _ga y _ga_*, con una duración aproximada de 2 años.',
    ],
  },
  {
    title: 'Titular del tratamiento',
    paragraphs: [
      'Marianela Trajes de Baño S.A.C. | RUC: 20604664927 | Jirón Preciados 145, 15038, Lima, Perú | soporte@marianelavieira.com.',
    ],
  },
];

const legalNoticeSections: LegalSection[] = [
  {
    title: 'IVA y facturación',
    paragraphs: [
      'Nuestros precios incluyen el IGV correspondiente. Las compras realizadas en marianelavieira.com están destinadas a consumidores finales.',
    ],
  },
  {
    title: 'Condiciones de uso y pagos',
    paragraphs: [
      'La moneda oficial del sitio web es el sol peruano (S/). Los pagos y las transacciones monetarias se realizan en la moneda indicada al finalizar la compra. Los precios pueden actualizarse; el usuario debe verificar el precio final antes de enviar el pedido.',
    ],
  },
  {
    title: 'Pago seguro con tarjeta',
    paragraphs: [
      'Nuestras pasarelas de pago aplican estándares de seguridad, como 3D Secure, para proteger a los compradores. El usuario debe contar con los datos de autenticación o el código de validación solicitado por su entidad bancaria.',
    ],
  },
  {
    title: 'Pago a través de plataformas digitales',
    paragraphs: [
      'Después de confirmar los detalles del pedido, podrás completar el pago de forma segura mediante los métodos digitales integrados y disponibles en nuestra pasarela de pagos.',
    ],
  },
  {
    title: 'Titular del sitio',
    paragraphs: [
      'Marianela Trajes de Baño S.A.C. | RUC: 20604664927 | Jirón Preciados 145, 15038, Lima, Perú | soporte@marianelavieira.com.',
    ],
  },
];

const refundSections: LegalSection[] = [
  {
    title: '1. Derecho de desistimiento y plazos',
    paragraphs: ['Conforme a la normativa de protección al consumidor, el Cliente puede solicitar la devolución o cambio de un producto dentro de un plazo máximo de 14 días calendario contados desde la recepción de la mercancía.'],
  },
  {
    title: '2. Condiciones esenciales de higiene',
    paragraphs: ['En prendas de baño, como bikinis, enterizos y trikinis, y en ropa interior:'],
    bullets: ['Los artículos deben probarse utilizando ropa interior propia y sin retirar los protectores higiénicos adhesivos incorporados.', 'Las devoluciones serán rechazadas si presentan indicios de uso, han sido lavadas, muestran manchas o tienen retirados los protectores higiénicos o las etiquetas originales.', 'La mercancía debe devolverse completa, sin uso, en perfecto estado y con su empaque original.'],
  },
  {
    title: '3. Costes y procedimiento de devolución',
    paragraphs: ['Los gastos de envío derivados de una devolución o cambio corren a cargo del cliente, salvo que el producto presente un defecto de fábrica o no corresponda al artículo adquirido.', 'Para iniciar una solicitud:'],
    bullets: ['Escribe a soporte@marianelavieira.com indicando tu número de pedido, el artículo y el motivo detallado.', 'Nuestro equipo responderá con las instrucciones y la dirección exacta del almacén o punto autorizado en Lima.', 'Prepara el paquete de forma segura. Recomendamos utilizar un servicio con seguimiento, ya que Marianela Trajes de Baño S.A.C. no se responsabiliza por paquetes extraviados sin trazabilidad.'],
  },
  {
    title: '4. Reembolsos',
    bullets: ['Una vez recibida la mercancía, se realizará una inspección de calidad en un plazo de 3 a 4 días hábiles para verificar el cumplimiento de las condiciones de higiene y estado.', 'Si la devolución es aprobada, el reembolso del importe pagado por el producto se procesará en un plazo máximo de 14 días calendario desde la recepción de la devolución.', 'El reembolso se realizará mediante el mismo método de pago empleado en la compra, incluyendo la reversión a través de Izipay cuando corresponda.', 'Las Tarjetas de Regalo (E-Gift Cards) no son reembolsables en efectivo. En caso de devolución, se reactivarán por el valor correspondiente.'],
    paragraphs: ['El derecho de desistimiento y devolución no aplica a productos personalizados o confeccionados a medida.'],
  },
];

const shippingSections: LegalSection[] = [
  {
    title: '1. Estado de envío',
    paragraphs: ['Al finalizar la preparación del pedido, recibirás un correo electrónico confirmando que ha sido procesado y entregado al operador logístico o courier. Cuando la empresa de mensajería se haga cargo del paquete, recibirás una notificación con los detalles y el enlace de seguimiento.'],
  },
  {
    title: '2. Datos de envío',
    paragraphs: ['Marianela Trajes de Baño S.A.C. utilizará exclusivamente los datos proporcionados durante el proceso de compra en marianelavieira.com. El cliente debe verificar que la dirección y los datos de contacto sean correctos y completos en el correo de confirmación.', 'La empresa no se responsabiliza por retrasos o entregas fallidas derivados de direcciones incorrectas, incompletas o de la falta de información necesaria para ubicar el lugar de entrega.'],
  },
  {
    title: '3. Plazos de procesamiento y envío',
    bullets: ['Los pedidos se procesarán dentro de las 48 horas hábiles posteriores a la confirmación del pago a través de Izipay.', 'El procesamiento se realiza de lunes a viernes en horario de oficina. Los pedidos realizados durante fines de semana o feriados se procesarán a partir del siguiente día hábil por la mañana.', 'Los plazos de entrega varían según el courier asignado y el destino dentro del Perú, incluyendo Lima Metropolitana, Callao y provincias.'],
  },
  {
    title: '4. Recepción y entrega autorizada',
    paragraphs: ['Al recibir el pedido, el cliente o la persona autorizada debe inspeccionar cuidadosamente el paquete antes de firmar el comprobante de entrega.'],
    bullets: ['Si el paquete muestra señales de manipulación, daños o rupturas, firma el cargo con observaciones o rechaza la entrega.', 'Ante cualquier incidencia, notifica inmediatamente al courier y envía un reporte con evidencias fotográficas a soporte@marianelavieira.com.'],
  },
  {
    title: '5. Retiro en tienda (Click & Collect)',
    paragraphs: ['Puedes comprar online y retirar tu pedido sin costo adicional en nuestra sede autorizada: Jirón Preciados 145, 15038, Lima, Perú.'],
    bullets: ['Procedimiento: selecciona la opción de recogida en tienda durante el pago. Cuando el pedido esté listo, recibirás una notificación por correo.', 'Requisitos: presenta tu DNI o Carnet de Extranjería y el correo electrónico de confirmación del pedido.', 'Devoluciones presenciales: los artículos pueden entregarse en el establecimiento para su revisión. Los reembolsos se procesan exclusivamente mediante el método de pago original, Izipay, y no se realizan devoluciones en efectivo en el local.'],
  },
];

function LegalDocument({ title, intro, sections }: { title: string; intro: string; sections: LegalSection[] }) {
  return (
    <section className="mx-auto max-w-4xl px-6 py-16 lg:px-10 lg:py-24">
      <p className="mb-4 text-xs uppercase tracking-[0.25em] text-blush-500">Marianela Vieira</p>
      <h1 className="mb-6 font-serif text-4xl font-light tracking-wide text-ink-900 lg:text-5xl">{title}</h1>
      <p className="mb-12 max-w-3xl text-lg font-light leading-relaxed text-ink-600">{intro}</p>
      <div className="space-y-10 border-t border-ink-200 pt-10">
        {sections.map((section) => (
          <article key={section.title} className="space-y-4">
            <h2 className="font-serif text-2xl font-light text-ink-900">{section.title}</h2>
            {section.paragraphs?.map((paragraph) => <p key={paragraph} className="text-base font-light leading-relaxed text-ink-600">{paragraph}</p>)}
            {section.bullets && <ul className="list-disc space-y-2 pl-5 text-base font-light leading-relaxed text-ink-600">{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
          </article>
        ))}
      </div>
    </section>
  );
}

export default function InfoPage() {
  const { pathname } = useLocation();
  const slug = pathname.split('/').filter(Boolean).pop() || '';
  const content = pageContent[slug];

  if (!content) return <div className="mx-auto max-w-3xl px-6 py-20">Página no encontrada.</div>;

  if (slug === 'privacy-policy') {
    return <LegalDocument title="Política de Privacidad" intro="Información sobre el tratamiento de datos personales conforme a la normativa de protección de datos aplicable." sections={privacyPolicySections} />;
  }

  if (slug === 'terms-of-service') {
    return <LegalDocument title="Términos y Condiciones del Servicio" intro="Condiciones generales de venta online de Marianela Vieira." sections={termsSections} />;
  }

  if (slug === 'cookie-policy') {
    return <LegalDocument title="Política de Cookies" intro="Información sobre las tecnologías utilizadas para garantizar el funcionamiento, la seguridad y la mejora de nuestra tienda." sections={cookieSections} />;
  }

  if (slug === 'legal-notice') {
    return <LegalDocument title="Aviso Legal" intro="Información sobre facturación, pagos y condiciones de uso de la tienda online Marianela Vieira." sections={legalNoticeSections} />;
  }

  if (slug === 'refund-policy') {
    return <LegalDocument title={content.title} intro={content.intro} sections={refundSections} />;
  }

  if (slug === 'nuestra-historia') {
    return (
      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <div className="order-2 lg:order-1">
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-blush-500">Marianela Vieira</p>
            <h1 className="mb-6 font-serif text-4xl font-light tracking-wide text-ink-900 lg:text-6xl">{content.title}</h1>
            <p className="mb-10 max-w-xl text-lg font-light leading-relaxed text-ink-600">{content.intro}</p>
            <div className="space-y-6 border-t border-ink-200 pt-8">
              {content.sections.map((section) => (
                <p key={section} className="max-w-xl text-base font-light leading-relaxed text-ink-600">{section}</p>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative overflow-hidden bg-ink-50 shadow-[0_24px_60px_rgba(27,23,20,0.12)]">
              <img
                src={historyImageUrl}
                alt="Marianela Vieira, historia y esencia de la marca"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (slug === 'preguntas-frecuentes') {
    return (
      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-20">
          <div className="relative overflow-hidden bg-ink-50 shadow-[0_24px_60px_rgba(27,23,20,0.12)]">
            <img
              src={faqImageUrl}
              alt="Detalles de la colección Marianela Vieira"
              className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
              loading="eager"
            />
          </div>
          <div className="lg:pt-4">
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-blush-500">Marianela Vieira</p>
            <h1 className="mb-6 font-serif text-4xl font-light tracking-wide text-ink-900 lg:text-6xl">{content.title}</h1>
            <p className="mb-10 max-w-xl text-lg font-light leading-relaxed text-ink-600">{content.intro}</p>
            <div className="space-y-6 border-t border-ink-200 pt-8">
              {content.sections.map((section) => (
                <p key={section} className="max-w-xl text-base font-light leading-relaxed text-ink-600">{section}</p>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (slug === 'contacto') {
    return (
      <section className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20">
          <div className="order-2 lg:order-1">
            <p className="mb-4 text-xs uppercase tracking-[0.25em] text-blush-500">Marianela Vieira</p>
            <h1 className="mb-6 font-serif text-4xl font-light tracking-wide text-ink-900 lg:text-6xl">{content.title}</h1>
            <p className="mb-10 max-w-xl text-lg font-light leading-relaxed text-ink-600">{content.intro}</p>
            <div className="space-y-6 border-t border-ink-200 pt-8">
              {content.sections.map((section) => (
                <p key={section} className="max-w-xl text-base font-light leading-relaxed text-ink-600">{section}</p>
              ))}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="relative overflow-hidden bg-ink-50 shadow-[0_24px_60px_rgba(27,23,20,0.12)]">
              <img
                src={contactImageUrl}
                alt="Atención personalizada de Marianela Vieira"
                className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (slug === 'envios-y-devoluciones') {
    return <LegalDocument title="Política de Envíos" intro="Información sobre el procesamiento, seguimiento, entrega y retiro de pedidos de Marianela Vieira." sections={shippingSections} />;
  }

  if (slug === 'guia-de-tallas') {
    return (
      <section className="mx-auto max-w-3xl px-6 py-16 lg:px-10 lg:py-24">
        <p className="mb-4 text-xs uppercase tracking-[0.25em] text-blush-500">Marianela Vieira</p>
        <h1 className="mb-6 font-serif text-4xl font-light tracking-wide text-ink-900 lg:text-5xl">{content.title}</h1>
        <p className="mb-10 text-lg font-light leading-relaxed text-ink-600">{content.intro}</p>
        <div className="space-y-6 border-t border-ink-200 pt-8">
          {content.sections.map((section) => <p key={section} className="text-base font-light leading-relaxed text-ink-600">{section}</p>)}
        </div>
        <a
          href="https://wa.me/51949217304?text=Hola%20MARIANELA%20Vieira%2C%20necesito%20ayuda%20para%20elegir%20mi%20talla."
          target="_blank"
          rel="noreferrer"
          className="mt-10 inline-flex items-center gap-3 border border-[#7ccf9a] bg-[#f6fff8] px-5 py-3 text-sm font-medium uppercase tracking-widest text-ink-800 transition-colors hover:bg-[#ecfdf2]"
        >
          Soporte por WhatsApp
        </a>
      </section>
    );
  }

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
