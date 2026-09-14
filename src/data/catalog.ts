export type Product = {
  id: string;
  name: string;
  category: 'Bikini' | 'Traje de Baño' | 'Tankini' | 'Trikini' | 'Fuera del Agua' | 'Accesorios';
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  swatches: { name: string; hex: string; image?: string; variantId?: string }[];
  tag?: 'Novedades' | 'Sale' | 'Bestseller';
  description: string;
  // Optional: map this product to a Shopify variant GID (gid://...)
  shopifyVariantId?: string;
};

export const categories = [
  {
    name: 'Bikini',
    tagline: 'Texturas y cortes que destacan',
    description: 'Bikinis modernos con detalles seductores y un ajuste perfecto.',
    image: 'https://images.pexels.com/photos/17367636/pexels-photo-17367636.jpeg?auto=compress&cs=tinysrgb&w=1200&q=80',
  },
  {
    name: 'Traje de Baño',
    tagline: 'Línea sofisticada',
    description: 'Trajes de baño de una pieza con silueta elegante y comodidad total.',
    image: 'https://images.pexels.com/photos/31277420/pexels-photo-31277420.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
  },
  {
    name: 'Tankini',
    tagline: 'Equilibrio entre estilo y libertad',
    description: 'Tankinis de corte refinado para una presencia ligera y femenina.',
    image: 'https://6a8377665cc6de03eb430013.imgix.net/sandbox/W69982s.webp?auto=format&q=80&w=1200&fit=max',
  },
  {
    name: 'Trikini',
    tagline: 'Un detalle audaz',
    description: 'Trikinis con proporciones exactas y un aire contemporáneo.',
    image: 'https://6a8377665cc6de03eb430013.imgix.net/sandbox/Trikini_leopardo.webp?auto=format&q=80&w=1200&fit=max',
  },
  {
    name: 'Fuera del Agua',
    tagline: 'Estilo en cada paso',
    description: 'Piezas para llevar la misma esencia de lujo fuera del agua.',
    image: 'https://6a8377665cc6de03eb430013.imgix.net/sandbox/dff7a81aac6f03af918f5d4b4cc15bda.jpg?auto=format&q=80&w=1200&fit=max',
  },

  {
    name: 'Accesorios',
    tagline: 'Los detalles finales',
    description: 'Accesorios para completar y elevar cada look playero.',
    image: 'https://6a8377665cc6de03eb430013.imgix.net/sandbox/coconut-ave-la-mer-bucket-hat-model_533x.webp?auto=format&q=80&w=1200&fit=max',
  },

];

export const collection2026Slug = 'coleccion-2026';

export const navLinks = [
  { label: 'Colección 2026', href: `/collections/${collection2026Slug}` },
  { label: 'Mujeres', href: '#categorias' },
  { label: 'Sale', href: `/collections/${collection2026Slug}` },
];

export const categorySlugs: Record<string, string> = {
  Bikini: 'bikinis',
  'Traje de Baño': 'trajes-de-bano',
  Tankini: 'tankinis',
  Trikini: 'trikinis',
  'Fuera del Agua': 'fuera-del-agua',
  Accesorios: 'accesorios',
  Novedades: 'novedades',
  Sale: 'sale',
};

export const hiddenCategoryNames = new Set(['Lencería', 'Loungewear']);

export const womenSubcategories = [
  'Novedades',
  'Bikini',
  'Traje de Baño',
  'Tankini',
  'Trikini',
  'Fuera del Agua',
  'Accesorios',
  'Sale',
].filter((category) => !hiddenCategoryNames.has(category));

export const womenMenuSubcategories = womenSubcategories.filter(
  (category) => !['Novedades'].includes(category),
);

export const footerLinks = {
  'Atención al Cliente': [
    'Envíos y Devoluciones',
    'Guía de Tallas',
    'Cuidado de Prendas',
    'Preguntas Frecuentes',
    'Contáctanos',
  ],
  'La Maison': [
    'Nuestra Historia',
    'Sostenibilidad',
    'Boutiques',
    'Trabaja con Nosotros',
  ],
  'Legal': [
    'Términos y Condiciones',
    'Política de Privacidad',
    'Política de Cookies',
    'Aviso Legal',
  ],
};

export function formatProductName(name: string) {
  return name.replace(/\bTriangulo\b/gi, 'Triángulo');
}
