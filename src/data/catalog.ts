export type Product = {
  id: string;
  name: string;
  category: 'Bikini' | 'Traje de Baño' | 'Tankini' | 'Trikini' | 'Kids' | 'Fuera del Agua' | 'Accesorios';
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  swatches: { name: string; hex: string; image?: string; variantId?: string }[];
  sizes?: string[];
  material?: string;
  care?: string;
  tag?: 'Novedades' | 'Sale' | 'Bestseller';
  description: string;
  collectionHandles?: string[];
  // Optional: map this product to a Shopify variant GID (gid://...)
  shopifyVariantId?: string;
};

export const categories = [
  {
    name: 'Bikini',
    tagline: 'Texturas y cortes que destacan',
    description: 'Bikinis modernos con detalles seductores y un ajuste perfecto.',
    image: 'https://6aa88bf09422e77b387f33c6.imgix.net/sandbox/624891291_18132350635501972_9192086767551926491_n.jpg',
  },
  {
    name: 'Traje de Baño',
    tagline: 'Línea sofisticada',
    description: 'Trajes de baño de una pieza con silueta elegante y comodidad total.',
    image: 'https://6aa88bf09422e77b387f33c6.imgix.net/sandbox/thenewblack-9a060b15-fcb1-4c73-9f7d-291158a5d4ce.jpg',
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
    image: 'https://6aa88bf09422e77b387f33c6.imgix.net/sandbox/thenewblack-52def637-91cd-4ca5-b9d0-2a39795b68db.jpg',
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
  { label: 'Sale', href: '/collections/sale' },
];

export const categorySlugs: Record<string, string> = {
  Bikini: 'bikinis',
  'Traje de Baño': 'trajes-de-bano',
  Tankini: 'tankinis',
  Trikini: 'trikinis',
  Kids: 'kids',
  'Fuera del Agua': 'fuera-del-agua',
  Accesorios: 'accesorios',
  Novedades: 'novedades',
  Sale: 'sale',
};

export const hiddenCategoryNames = new Set(['Lencería', 'Loungewear', 'Trikini']);

export const womenSubcategories = [
  'Novedades',
  'Bikini',
  'Traje de Baño',
  'Tankini',
  'Trikini',
  'Kids',
  'Fuera del Agua',
  'Accesorios',
  'Sale',
].filter((category) => !hiddenCategoryNames.has(category));

export const womenMenuSubcategories = womenSubcategories.filter(
  (category) => !['Novedades', 'Kids'].includes(category),
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

export function localizedProductName(name: string, language: 'pt' | 'en' | 'es' | 'fr' | 'it' | 'de' | 'nl') {
  const formattedName = formatProductName(name);
  if (language !== 'en') return formattedName;

  const englishNames: Record<string, string> = {
    'Vestido Hilo Algodon 100%': '100% Cotton Knit Dress',
    'Vestido Hilo Algodón 100%': '100% Cotton Knit Dress',
  };

  return englishNames[formattedName] ?? formattedName;
}
