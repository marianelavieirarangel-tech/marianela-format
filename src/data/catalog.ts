export type Product = {
  id: string;
  name: string;
  category: 'Bikini' | 'Traje de Baño' | 'Tankini' | 'Trikini' | 'Fuera del Agua' | 'Accesorios';
  price: number;
  originalPrice?: number;
  image: string;
  images?: string[];
  swatches: { name: string; hex: string }[];
  tag?: 'Novedades' | 'Sale' | 'Bestseller';
  description: string;
  // Optional: map this product to a Shopify variant GID (gid://...)
  shopifyVariantId?: string;
};

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Conjunto Soirée de Encaje',
    category: 'Fuera del Agua',
    price: 89,
    image: 'https://images.pexels.com/photos/9356533/pexels-photo-9356533.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
    swatches: [
      { name: 'Rose', hex: '#e9b0a3' },
      { name: 'Noir', hex: '#1a1611' },
      { name: 'Ivoire', hex: '#f3ede2' },
    ],
    tag: 'Novedades',
    description: 'Conjunto de encaje francés con detalles florales y tirantes ajustables. Composición suave que abraza la silueta.',
  },
  {
    id: 'p2',
    name: 'Body Noir Velours',
    category: 'Fuera del Agua',
    price: 74,
    image: 'https://images.pexels.com/photos/9132317/pexels-photo-9132317.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
    swatches: [
      { name: 'Noir', hex: '#1a1611' },
      { name: 'Bordeaux', hex: '#5f2e24' },
    ],
    tag: 'Bestseller',
    description: 'Body de tul transparente con costuras planas y cierre de broches. Un clásico atemporal.',
  },
  {
    id: 'p3',
    name: 'Conjunto Blanche Florale',
    category: 'Fuera del Agua',
    price: 95,
    originalPrice: 120,
    image: 'https://images.pexels.com/photos/13362549/pexels-photo-13362549.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
    swatches: [
      { name: 'Ivoire', hex: '#f3ede2' },
      { name: 'Sage', hex: '#a7b69c' },
    ],
    tag: 'Sale',
    description: 'Sostén de encaje floral con aro interno y panty de tiro medio. Edición limitada de primavera.',
  },
  {
    id: 'p4',
    name: 'Pijama Satin Élégance',
    category: 'Fuera del Agua',
    price: 128,
    image: 'https://images.pexels.com/photos/7162014/pexels-photo-7162014.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
    swatches: [
      { name: 'Champagne', hex: '#e7dcc8' },
      { name: 'Noir', hex: '#1a1611' },
      { name: 'Bordeaux', hex: '#5f2e24' },
    ],
    tag: 'Novedades',
    description: 'Pijama de satén de seda con cuello cruzado y pantalón de tiro ancho. Tacto fresco y luminoso.',
  },
  {
    id: 'p5',
    name: 'Camisole Rose Tendre',
    category: 'Fuera del Agua',
    price: 68,
    image: 'https://images.pexels.com/photos/7162012/pexels-photo-7162012.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
    swatches: [
      { name: 'Rose', hex: '#f4d4cc' },
      { name: 'Champagne', hex: '#e7dcc8' },
    ],
    tag: 'Bestseller',
    description: 'Camisola de modal con tirantes de seda y dobladillo asimétrico. Para el descanso con elegancia.',
  },
  {
    id: 'p6',
    name: 'Robe Soie Noir',
    category: 'Fuera del Agua',
    price: 142,
    image: 'https://images.pexels.com/photos/6976713/pexels-photo-6976713.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
    swatches: [
      { name: 'Noir', hex: '#1a1611' },
      { name: 'Sage', hex: '#a7b69c' },
    ],
    tag: 'Novedades',
    description: 'Bata larga de seda con cinturón y bordes picot. Una pieza de colección para los rituales íntimos.',
  },
  {
    id: 'p7',
    name: 'Traje de Baño Riviera',
    category: 'Traje de Baño',
    price: 110,
    image: 'https://images.pexels.com/photos/31277420/pexels-photo-31277420.jpeg?auto=compress&cs=tinysrgb&h=900&w=600',
    swatches: [
      { name: 'Corail', hex: '#db8775' },
      { name: 'Noir', hex: '#1a1611' },
    ],
    tag: 'Novedades',
    description: 'Traje de baño de una pieza con escote profundo y tela de secado rápido. Corte que esculpe la figura.',
  },
];

export const categories = [
  {
    name: 'Bikini',
    tagline: 'Texturas y cortes que destacan',
    description: 'Bikinis modernos con detalles seductores y un ajuste perfecto.',
    image: 'https://images.pexels.com/photos/17367636/pexels-photo-17367636.jpeg?auto=compress&cs=tinysrgb&h=1200&w=800',
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
    image: 'https://6a8377665cc6de03eb430013.imgix.net/sandbox/W69982s.webp',
  },
  {
    name: 'Trikini',
    tagline: 'Un detalle audaz',
    description: 'Trikinis con proporciones exactas y un aire contemporáneo.',
    image: 'https://6a8377665cc6de03eb430013.imgix.net/sandbox/Trikini_leopardo.webp',
  },
  {
    name: 'Fuera del Agua',
    tagline: 'Estilo en cada paso',
    description: 'Piezas para llevar la misma esencia de lujo fuera del agua.',
    image: 'https://6a8377665cc6de03eb430013.imgix.net/sandbox/dff7a81aac6f03af918f5d4b4cc15bda.jpg',
  },

  {
    name: 'Accesorios',
    tagline: 'Los detalles finales',
    description: 'Accesorios para completar y elevar cada look playero.',
    image: 'https://6a8377665cc6de03eb430013.imgix.net/sandbox/coconut-ave-la-mer-bucket-hat-model_533x.webp',
  },

];

export const navLinks = [
  { label: 'Colección 2026', href: '#coleccion-2026' },
  { label: 'Mujeres', href: '#categorias' },
  { label: 'Hombres', href: '#categorias' },
  { label: 'Kids', href: '#categorias' },
  { label: 'Sale', href: '#coleccion-2026' },
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
