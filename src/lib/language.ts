export type LanguageCode = 'pt' | 'en' | 'es' | 'fr' | 'it' | 'de' | 'nl';

export const languageOptions: LanguageCode[] = ['pt', 'en', 'es', 'fr', 'it', 'de', 'nl'];

export const languageNames: Record<LanguageCode, string> = {
  pt: 'Português',
  en: 'English',
  es: 'Español',
  fr: 'Français',
  it: 'Italiano',
  de: 'Deutsch',
  nl: 'Nederlands',
};

export const languageShortCodes: Record<LanguageCode, string> = {
  pt: 'PT',
  en: 'EN',
  es: 'ES',
  fr: 'FR',
  it: 'IT',
  de: 'DE',
  nl: 'NL',
};

type TranslationKey =
  | 'collection'
  | 'women'
  | 'groupTrips'
  | 'sale'
  | 'discoverCollection'
  | 'exploreCategories'
  | 'scroll'
  | 'freeShipping'
  | 'freeReturns'
  | 'newCollection'
  | 'footerDescription'
  | 'whatsappSupport'
  | 'allRightsReserved'
  | 'collectionsLabel'
  | 'discoverCategories'
  | 'piecesTitle'
  | 'allProducts'
  | 'newProducts'
  | 'swimwear'
  | 'outOfWater'
  | 'noPieces'
  | 'philosophy'
  | 'philosophyQuote'
  | 'lookbook'
  | 'lima'
  | 'heroTitle'
  | 'heroBody';

const translations: Record<LanguageCode, Record<TranslationKey, string>> = {
  es: {
    collection: 'Colección 2026', women: 'Mujeres', groupTrips: 'Viajes Grupales', sale: 'Sale',
    discoverCollection: 'Descubrir Colección', exploreCategories: 'Explorar Categorías', scroll: 'Scroll',
    freeShipping: 'Envío gratis por compras superiores a S/ 120', freeReturns: 'Devoluciones gratuitas en 30 días',
    newCollection: 'Nueva colección — Primavera 2026', footerDescription: 'Innovación, diseño y sofisticación en cada pieza de ropa de baño. Celebramos la autenticidad de cada silueta.',
    whatsappSupport: 'Soporte por WhatsApp', allRightsReserved: 'Todos los derechos reservados',
    collectionsLabel: 'Nuestras Colecciones', discoverCategories: 'Descubre nuestras categorías', piecesTitle: 'Piezas que enamoran',
    allProducts: 'Todos', newProducts: 'Novedades', swimwear: 'Traje de Baño', outOfWater: 'Fuera del Agua', noPieces: 'No hay piezas en esta categoría por ahora.',
    philosophy: 'Nuestra Filosofía', philosophyQuote: '"Verano Swimwear — colección dedicada al sol, la playa y la libertad de movimiento."', lookbook: 'Ver el Lookbook', lima: 'Marianela Vieira, Lima 2026',
    heroTitle: 'Tu estilo,|tu cuerpo', heroBody: 'Trajes de baño y piezas esenciales para celebrar la delicadeza de cada gesto.',
  },
  en: {
    collection: 'Collection 2026', women: 'Women', groupTrips: 'Group Trips', sale: 'Sale',
    discoverCollection: 'Discover Collection', exploreCategories: 'Explore Categories', scroll: 'Scroll',
    freeShipping: 'Free shipping on orders over $120', freeReturns: 'Free returns within 30 days',
    newCollection: 'New collection — Spring 2026', footerDescription: 'Innovation, design, and sophistication in every swimwear piece. Celebrating the authenticity of every silhouette.',
    whatsappSupport: 'WhatsApp Support', allRightsReserved: 'All rights reserved',
    collectionsLabel: 'Our Collections', discoverCategories: 'Discover our categories', piecesTitle: 'Pieces to fall in love with',
    allProducts: 'All', newProducts: 'New Arrivals', swimwear: 'Swimwear', outOfWater: 'Out of Water', noPieces: 'There are no pieces in this category yet.',
    philosophy: 'Our Philosophy', philosophyQuote: '"Verano Swimwear — a collection devoted to the sun, the beach, and freedom of movement."', lookbook: 'View Lookbook', lima: 'Marianela Vieira, Lima 2026',
    heroTitle: 'Your style,|your body', heroBody: 'Swimwear and essential pieces celebrating the delicacy of every gesture.',
  },
  pt: {
    collection: 'Coleção 2026', women: 'Mulheres', groupTrips: 'Viagens em Grupo', sale: 'Sale',
    discoverCollection: 'Descobrir Coleção', exploreCategories: 'Explorar Categorias', scroll: 'Rolar',
    freeShipping: 'Frete grátis em compras acima de $120', freeReturns: 'Devoluções gratuitas em 30 dias',
    newCollection: 'Nova coleção — Primavera 2026', footerDescription: 'Inovação, design e sofisticação em cada peça de moda praia. Celebramos a autenticidade de cada silhueta.',
    whatsappSupport: 'Suporte pelo WhatsApp', allRightsReserved: 'Todos os direitos reservados',
    collectionsLabel: 'Nossas Coleções', discoverCategories: 'Descubra nossas categorias', piecesTitle: 'Peças para se apaixonar',
    allProducts: 'Todas', newProducts: 'Novidades', swimwear: 'Moda Praia', outOfWater: 'Fora d’Água', noPieces: 'Ainda não há peças nesta categoria.',
    philosophy: 'Nossa Filosofia', philosophyQuote: '"Verano Swimwear — coleção dedicada ao sol, à praia e à liberdade de movimento."', lookbook: 'Ver Lookbook', lima: 'Marianela Vieira, Lima 2026',
    heroTitle: 'Seu estilo,|seu corpo', heroBody: 'Moda praia e peças essenciais para celebrar a delicadeza de cada gesto.',
  },
  fr: {
    collection: 'Collection 2026', women: 'Femmes', groupTrips: 'Voyages en groupe', sale: 'Sale',
    discoverCollection: 'Découvrir la collection', exploreCategories: 'Explorer les catégories', scroll: 'Défiler',
    freeShipping: 'Livraison offerte dès 120 $', freeReturns: 'Retours gratuits sous 30 jours',
    newCollection: 'Nouvelle collection — Printemps 2026', footerDescription: 'Innovation, design et sophistication dans chaque pièce de maillots de bain. Nous célébrons l’authenticité de chaque silhouette.',
    whatsappSupport: 'Assistance WhatsApp', allRightsReserved: 'Tous droits réservés',
    collectionsLabel: 'Nos collections', discoverCategories: 'Découvrez nos catégories', piecesTitle: 'Des pièces à aimer',
    allProducts: 'Toutes', newProducts: 'Nouveautés', swimwear: 'Maillots de bain', outOfWater: 'Hors de l’eau', noPieces: 'Aucune pièce dans cette catégorie pour le moment.',
    philosophy: 'Notre philosophie', philosophyQuote: '"Verano Swimwear — une collection dédiée au soleil, à la plage et à la liberté de mouvement."', lookbook: 'Voir le lookbook', lima: 'Marianela Vieira, Lima 2026',
    heroTitle: 'Votre style,|votre corps', heroBody: 'Maillots de bain et pièces essentielles pour célébrer la délicatesse de chaque geste.',
  },
  it: {
    collection: 'Collezione 2026', women: 'Donne', groupTrips: 'Viaggi di gruppo', sale: 'Sale',
    discoverCollection: 'Scopri la collezione', exploreCategories: 'Esplora le categorie', scroll: 'Scorri',
    freeShipping: 'Spedizione gratuita per ordini oltre $120', freeReturns: 'Resi gratuiti entro 30 giorni',
    newCollection: 'Nuova collezione — Primavera 2026', footerDescription: 'Innovazione, design e raffinatezza in ogni capo beachwear. Celebriamo l’autenticità di ogni silhouette.',
    whatsappSupport: 'Supporto WhatsApp', allRightsReserved: 'Tutti i diritti riservati',
    collectionsLabel: 'Le nostre collezioni', discoverCategories: 'Scopri le nostre categorie', piecesTitle: 'Capi da amare',
    allProducts: 'Tutti', newProducts: 'Novità', swimwear: 'Costumi da bagno', outOfWater: 'Fuori dall’acqua', noPieces: 'Non ci sono ancora capi in questa categoria.',
    philosophy: 'La nostra filosofia', philosophyQuote: '"Verano Swimwear — una collezione dedicata al sole, alla spiaggia e alla libertà di movimento."', lookbook: 'Guarda il lookbook', lima: 'Marianela Vieira, Lima 2026',
    heroTitle: 'Il tuo stile,|il tuo corpo', heroBody: 'Costumi da bagno e capi essenziali per celebrare la delicatezza di ogni gesto.',
  },
  de: {
    collection: 'Kollektion 2026', women: 'Damen', groupTrips: 'Gruppenreisen', sale: 'Sale',
    discoverCollection: 'Kollektion entdecken', exploreCategories: 'Kategorien entdecken', scroll: 'Scrollen',
    freeShipping: 'Kostenloser Versand ab $120', freeReturns: 'Kostenlose Rückgabe innerhalb von 30 Tagen',
    newCollection: 'Neue Kollektion — Frühling 2026', footerDescription: 'Innovation, Design und Raffinesse in jedem Bademodenstück. Wir feiern die Authentizität jeder Silhouette.',
    whatsappSupport: 'WhatsApp-Support', allRightsReserved: 'Alle Rechte vorbehalten',
    collectionsLabel: 'Unsere Kollektionen', discoverCategories: 'Entdecke unsere Kategorien', piecesTitle: 'Stücke zum Verlieben',
    allProducts: 'Alle', newProducts: 'Neuheiten', swimwear: 'Bademode', outOfWater: 'Außerhalb des Wassers', noPieces: 'In dieser Kategorie gibt es noch keine Stücke.',
    philosophy: 'Unsere Philosophie', philosophyQuote: '"Verano Swimwear — eine Kollektion für Sonne, Strand und Bewegungsfreiheit."', lookbook: 'Lookbook ansehen', lima: 'Marianela Vieira, Lima 2026',
    heroTitle: 'Dein Stil,|dein Körper', heroBody: 'Bademode und unverzichtbare Stücke, die die Zartheit jeder Bewegung feiern.',
  },
  nl: {
    collection: 'Collectie 2026', women: 'Dames', groupTrips: 'Groepsreizen', sale: 'Sale',
    discoverCollection: 'Ontdek de collectie', exploreCategories: 'Categorieën ontdekken', scroll: 'Scrollen',
    freeShipping: 'Gratis verzending vanaf $120', freeReturns: 'Gratis retourneren binnen 30 dagen',
    newCollection: 'Nieuwe collectie — Lente 2026', footerDescription: 'Innovatie, design en verfijning in elk badmode-item. We vieren de authenticiteit van elk silhouet.',
    whatsappSupport: 'WhatsApp-support', allRightsReserved: 'Alle rechten voorbehouden',
    collectionsLabel: 'Onze collecties', discoverCategories: 'Ontdek onze categorieën', piecesTitle: 'Stukken om van te houden',
    allProducts: 'Alle', newProducts: 'Nieuw', swimwear: 'Badmode', outOfWater: 'Buiten het water', noPieces: 'Er zijn nog geen items in deze categorie.',
    philosophy: 'Onze filosofie', philosophyQuote: '"Verano Swimwear — een collectie gewijd aan de zon, het strand en bewegingsvrijheid."', lookbook: 'Bekijk lookbook', lima: 'Marianela Vieira, Lima 2026',
    heroTitle: 'Jouw stijl,|jouw lichaam', heroBody: 'Badmode en essentiële items die de zachtheid van elk gebaar vieren.',
  },
};

export function translate(language: LanguageCode, key: TranslationKey): string {
  return translations[language][key];
}

const labelTranslations: Record<LanguageCode, Record<string, string>> = {
  es: {
    'Kids': 'Niños',
  },
  en: {
    'Hombres': 'Men', 'Kids': 'Kids', 'Volver': 'Back', 'Producto': 'Product', 'Productos': 'Products',
    'Ordenar por': 'Sort by', 'Destacados': 'Featured', 'Menor precio': 'Lowest price', 'Mayor precio': 'Highest price',
    'Filtrar por': 'Filter by', 'Todos': 'All', 'Novedades': 'New arrivals', 'Bestseller': 'Bestseller',
    'No hay productos disponibles con estos filtros.': 'No products available with these filters.',
    'Color': 'Color', 'Talla': 'Size', 'Cantidad': 'Quantity', 'Agregar al carrito': 'Add to cart',
    'Favoritos': 'Favorites', 'Compartir': 'Share', 'Guía de tallas': 'Size guide',
    'Nuestras Colecciones': 'Our Collections', 'Descubre nuestras categorías': 'Discover our categories',
    'Texturas y cortes que destacan': 'Textures and cuts that stand out', 'Línea sofisticada': 'Sophisticated line',
    'Equilibrio entre estilo y libertad': 'Balance between style and freedom', 'Ver Colección': 'View Collection',
    'Nuestra Filosofía': 'Our Philosophy', 'Ver el Lookbook': 'View Lookbook',
    'Atención al Cliente': 'Customer Care', 'La Maison': 'La Maison', 'Envíos y Devoluciones': 'Shipping & Returns',
    'Guía de Tallas': 'Size Guide', 'Cuidado de Prendas': 'Garment Care', 'Preguntas Frecuentes': 'Frequently Asked Questions',
    'Contáctanos': 'Contact Us', 'Nuestra Historia': 'Our Story', 'Sostenibilidad': 'Sustainability',
    'Boutiques': 'Boutiques', 'Trabaja con Nosotros': 'Work With Us', 'Política de Reembolso': 'Refund Policy',
    'Política de Privacidad': 'Privacy Policy', 'Términos del Servicio': 'Terms of Service',
    'Política de Envíos': 'Shipping Policy', 'Información de Contacto': 'Contact Information', 'Aviso Legal': 'Legal Notice',
    'Mi Cuenta': 'My Account', 'Ver categorías anteriores': 'Previous categories', 'Ver más categorías': 'More categories',
    'Bikini': 'Bikini', 'Traje de Baño': 'Swimsuit', 'Tankini': 'Tankini', 'Trikini': 'Trikini',
    'Fuera del Agua': 'Out of Water', 'Accesorios': 'Accessories',
    'Un detalle audaz': 'A bold detail', 'Estilo en cada paso': 'Style in every step', 'Los detalles finales': 'The finishing touches',
    'Bikinis modernos con detalles seductores y un ajuste perfecto.': 'Modern bikinis with seductive details and a perfect fit.',
    'Trajes de baño de una pieza con silueta elegante y comodidad total.': 'One-piece swimsuits with an elegant silhouette and complete comfort.',
    'Tankinis de corte refinado para una presencia ligera y femenina.': 'Refined-cut tankinis for a light and feminine presence.',
    'Trikinis con proporciones exactas y un aire contemporáneo.': 'Trikinis with precise proportions and a contemporary feel.',
    'Piezas para llevar la misma esencia de lujo fuera del agua.': 'Pieces that bring the same essence of luxury beyond the water.',
    'Accesorios para completar y elevar cada look playero.': 'Accessories to complete and elevate every beach look.',
  },
  pt: {
    'Hombres': 'Homens', 'Kids': 'Kids', 'Volver': 'Voltar', 'Producto': 'Produto', 'Productos': 'Produtos',
    'Ordenar por': 'Ordenar por', 'Destacados': 'Destaques', 'Menor precio': 'Menor preço', 'Mayor precio': 'Maior preço',
    'Filtrar por': 'Filtrar por', 'Todos': 'Todos', 'Novedades': 'Novidades',
    'Nuestras Colecciones': 'Nossas Coleções', 'Descubre nuestras categorías': 'Descubra nossas categorias',
    'Texturas y cortes que destacan': 'Texturas e cortes marcantes', 'Línea sofisticada': 'Linha sofisticada',
    'Equilibrio entre estilo y libertad': 'Equilíbrio entre estilo e liberdade', 'Ver Colección': 'Ver Coleção',
    'Nuestra Filosofía': 'Nossa Filosofia', 'Ver el Lookbook': 'Ver Lookbook', 'Atención al Cliente': 'Atendimento',
    'La Maison': 'La Maison', 'Envíos y Devoluciones': 'Envios e Devoluções', 'Guía de Tallas': 'Guia de Tamanhos',
    'Cuidado de Prendas': 'Cuidados das Peças', 'Preguntas Frecuentes': 'Perguntas Frequentes', 'Contáctanos': 'Fale Conosco',
    'Nuestra Historia': 'Nossa História', 'Sostenibilidad': 'Sustentabilidade', 'Boutiques': 'Boutiques',
    'Trabaja con Nosotros': 'Trabalhe Conosco', 'Mi Cuenta': 'Minha Conta',
    'Bikini': 'Biquíni', 'Traje de Baño': 'Maiô', 'Tankini': 'Tankini', 'Trikini': 'Trikini',
    'Fuera del Agua': 'Fora d’Água', 'Accesorios': 'Acessórios',
    'Un detalle audaz': 'Um detalhe ousado', 'Estilo en cada paso': 'Estilo a cada passo', 'Los detalles finales': 'Os detalhes finais',
    'Bikinis modernos con detalles seductores y un ajuste perfecto.': 'Biquínis modernos com detalhes sedutores e ajuste perfeito.',
    'Trajes de baño de una pieza con silueta elegante y comodidad total.': 'Maiôs com silhueta elegante e conforto total.',
    'Tankinis de corte refinado para una presencia ligera y femenina.': 'Tankinis de corte refinado para uma presença leve e feminina.',
    'Trikinis con proporciones exactas y un aire contemporáneo.': 'Triquínis com proporções precisas e um ar contemporâneo.',
    'Piezas para llevar la misma esencia de lujo fuera del agua.': 'Peças para levar a mesma essência de luxo para fora d’água.',
    'Accesorios para completar y elevar cada look playero.': 'Acessórios para completar e elevar cada look de praia.',
  },
  fr: {
    'Hombres': 'Hommes', 'Kids': 'Enfants', 'Volver': 'Retour', 'Producto': 'Produit', 'Productos': 'Produits',
    'Ordenar por': 'Trier par', 'Destacados': 'En vedette', 'Menor precio': 'Prix croissant', 'Mayor precio': 'Prix décroissant',
    'Filtrar por': 'Filtrer par', 'Todos': 'Tous', 'Novedades': 'Nouveautés',
    'Nuestras Colecciones': 'Nos collections', 'Descubre nuestras categorías': 'Découvrez nos catégories',
    'Texturas y cortes que destacan': 'Textures et coupes remarquables', 'Línea sofisticada': 'Ligne sophistiquée',
    'Equilibrio entre estilo y libertad': 'Équilibre entre style et liberté', 'Ver Colección': 'Voir la collection',
    'Nuestra Filosofía': 'Notre philosophie', 'Ver el Lookbook': 'Voir le lookbook', 'Atención al Cliente': 'Service client',
    'La Maison': 'La Maison', 'Envíos y Devoluciones': 'Livraisons et retours', 'Guía de Tallas': 'Guide des tailles',
    'Cuidado de Prendas': 'Entretien des pièces', 'Preguntas Frecuentes': 'Questions fréquentes', 'Contáctanos': 'Contactez-nous',
    'Nuestra Historia': 'Notre histoire', 'Sostenibilidad': 'Durabilité', 'Boutiques': 'Boutiques',
    'Trabaja con Nosotros': 'Travailler avec nous', 'Mi Cuenta': 'Mon compte',
    'Bikini': 'Bikini', 'Traje de Baño': 'Maillot de bain', 'Tankini': 'Tankini', 'Trikini': 'Trikini',
    'Fuera del Agua': 'Hors de l’eau', 'Accesorios': 'Accessoires',
    'Un detalle audaz': 'Un détail audacieux', 'Estilo en cada paso': 'Le style à chaque pas', 'Los detalles finales': 'Les touches finales',
    'Bikinis modernos con detalles seductores y un ajuste perfecto.': 'Des bikinis modernes aux détails séduisants et à la coupe parfaite.',
    'Trajes de baño de una pieza con silueta elegante y comodidad total.': 'Des maillots une pièce à la silhouette élégante et au confort absolu.',
    'Tankinis de corte refinado para una presencia ligera y femenina.': 'Des tankinis aux lignes raffinées pour une allure légère et féminine.',
    'Trikinis con proporciones exactas y un aire contemporáneo.': 'Des trikinis aux proportions précises et à l’allure contemporaine.',
    'Piezas para llevar la misma esencia de lujo fuera del agua.': 'Des pièces qui prolongent le même esprit luxueux hors de l’eau.',
    'Accesorios para completar y elevar cada look playero.': 'Des accessoires pour compléter et sublimer chaque look de plage.',
  },
  it: {
    'Hombres': 'Uomini', 'Kids': 'Bambini', 'Volver': 'Indietro', 'Producto': 'Prodotto', 'Productos': 'Prodotti',
    'Ordenar por': 'Ordina per', 'Destacados': 'In evidenza', 'Menor precio': 'Prezzo più basso', 'Mayor precio': 'Prezzo più alto',
    'Filtrar por': 'Filtra per', 'Todos': 'Tutti', 'Novedades': 'Novità',
    'Nuestras Colecciones': 'Le nostre collezioni', 'Descubre nuestras categorías': 'Scopri le nostre categorie',
    'Texturas y cortes que destacan': 'Texture e tagli distintivi', 'Línea sofisticada': 'Linea sofisticata',
    'Equilibrio entre estilo y libertad': 'Equilibrio tra stile e libertà', 'Ver Colección': 'Scopri la collezione',
    'Nuestra Filosofía': 'La nostra filosofia', 'Ver el Lookbook': 'Guarda il lookbook', 'Atención al Cliente': 'Servizio clienti',
    'La Maison': 'La Maison', 'Envíos y Devoluciones': 'Spedizioni e resi', 'Guía de Tallas': 'Guida alle taglie',
    'Cuidado de Prendas': 'Cura dei capi', 'Preguntas Frecuentes': 'Domande frequenti', 'Contáctanos': 'Contattaci',
    'Nuestra Historia': 'La nostra storia', 'Sostenibilidad': 'Sostenibilità', 'Boutiques': 'Boutique',
    'Trabaja con Nosotros': 'Lavora con noi', 'Mi Cuenta': 'Il mio account',
    'Bikini': 'Bikini', 'Traje de Baño': 'Costume da bagno', 'Tankini': 'Tankini', 'Trikini': 'Trikini',
    'Fuera del Agua': 'Fuori dall’acqua', 'Accesorios': 'Accessori',
    'Un detalle audaz': 'Un dettaglio audace', 'Estilo en cada paso': 'Stile a ogni passo', 'Los detalles finales': 'I dettagli finali',
    'Bikinis modernos con detalles seductores y un ajuste perfecto.': 'Bikini moderni con dettagli seducenti e una vestibilità perfetta.',
    'Trajes de baño de una pieza con silueta elegante y comodidad total.': 'Costumi interi dalla silhouette elegante e dal comfort assoluto.',
    'Tankinis de corte refinado para una presencia ligera y femenina.': 'Tankini dal taglio raffinato per una presenza leggera e femminile.',
    'Trikinis con proporciones exactas y un aire contemporáneo.': 'Trikini dalle proporzioni precise e dall’animo contemporaneo.',
    'Piezas para llevar la misma esencia de lujo fuera del agua.': 'Capi per portare la stessa essenza di lusso anche fuori dall’acqua.',
    'Accesorios para completar y elevar cada look playero.': 'Accessori per completare e valorizzare ogni look da spiaggia.',
  },
  de: {
    'Hombres': 'Herren', 'Kids': 'Kinder', 'Volver': 'Zurück', 'Producto': 'Produkt', 'Productos': 'Produkte',
    'Ordenar por': 'Sortieren nach', 'Destacados': 'Empfohlen', 'Menor precio': 'Niedrigster Preis', 'Mayor precio': 'Höchster Preis',
    'Filtrar por': 'Filtern nach', 'Todos': 'Alle', 'Novedades': 'Neuheiten',
    'Nuestras Colecciones': 'Unsere Kollektionen', 'Descubre nuestras categorías': 'Entdecke unsere Kategorien',
    'Texturas y cortes que destacan': 'Markante Texturen und Schnitte', 'Línea sofisticada': 'Sofisticated line',
    'Equilibrio entre estilo y libertad': 'Balance zwischen Stil und Freiheit', 'Ver Colección': 'Kollektion ansehen',
    'Nuestra Filosofía': 'Unsere Philosophie', 'Ver el Lookbook': 'Lookbook ansehen', 'Atención al Cliente': 'Kundenservice',
    'La Maison': 'La Maison', 'Envíos y Devoluciones': 'Versand und Rückgabe', 'Guía de Tallas': 'Größenberatung',
    'Cuidado de Prendas': 'Pflegehinweise', 'Preguntas Frecuentes': 'Häufige Fragen', 'Contáctanos': 'Kontakt',
    'Nuestra Historia': 'Unsere Geschichte', 'Sostenibilidad': 'Nachhaltigkeit', 'Boutiques': 'Boutiquen',
    'Trabaja con Nosotros': 'Arbeite mit uns', 'Mi Cuenta': 'Mein Konto',
    'Bikini': 'Bikini', 'Traje de Baño': 'Badeanzug', 'Tankini': 'Tankini', 'Trikini': 'Trikini',
    'Fuera del Agua': 'Außerhalb des Wassers', 'Accesorios': 'Accessoires',
    'Un detalle audaz': 'Ein mutiges Detail', 'Estilo en cada paso': 'Stil bei jedem Schritt', 'Los detalles finales': 'Die letzten Details',
    'Bikinis modernos con detalles seductores y un ajuste perfecto.': 'Moderne Bikinis mit verführerischen Details und perfekter Passform.',
    'Trajes de baño de una pieza con silueta elegante y comodidad total.': 'Einteilige Badeanzüge mit eleganter Silhouette und hohem Komfort.',
    'Tankinis de corte refinado para una presencia ligera y femenina.': 'Tankinis mit raffiniertem Schnitt für eine leichte, feminine Ausstrahlung.',
    'Trikinis con proporciones exactas y un aire contemporáneo.': 'Trikinis mit präzisen Proportionen und zeitgemäßem Charakter.',
    'Piezas para llevar la misma esencia de lujo fuera del agua.': 'Stücke, die dieselbe luxuriöse Essenz außerhalb des Wassers tragen.',
    'Accesorios para completar y elevar cada look playero.': 'Accessoires, die jeden Strandlook vervollständigen und veredeln.',
  },
  nl: {
    'Hombres': 'Heren', 'Kids': 'Kids', 'Volver': 'Terug', 'Producto': 'Product', 'Productos': 'Producten',
    'Ordenar por': 'Sorteren op', 'Destacados': 'Uitgelicht', 'Menor precio': 'Laagste prijs', 'Mayor precio': 'Hoogste prijs',
    'Filtrar por': 'Filteren op', 'Todos': 'Alle', 'Novedades': 'Nieuw',
    'Nuestras Colecciones': 'Onze collecties', 'Descubre nuestras categorías': 'Ontdek onze categorieën',
    'Texturas y cortes que destacan': 'Opvallende texturen en pasvormen', 'Línea sofisticada': 'Verfijnde lijn',
    'Equilibrio entre estilo y libertad': 'Balans tussen stijl en vrijheid', 'Ver Colección': 'Bekijk collectie',
    'Nuestra Filosofía': 'Onze filosofie', 'Ver el Lookbook': 'Bekijk lookbook', 'Atención al Cliente': 'Klantenservice',
    'La Maison': 'La Maison', 'Envíos y Devoluciones': 'Verzending en retouren', 'Guía de Tallas': 'Maattabel',
    'Cuidado de Prendas': 'Kledingverzorging', 'Preguntas Frecuentes': 'Veelgestelde vragen', 'Contáctanos': 'Contact',
    'Nuestra Historia': 'Ons verhaal', 'Sostenibilidad': 'Duurzaamheid', 'Boutiques': 'Boutiques',
    'Trabaja con Nosotros': 'Werken bij ons', 'Mi Cuenta': 'Mijn account',
    'Bikini': 'Bikini', 'Traje de Baño': 'Badpak', 'Tankini': 'Tankini', 'Trikini': 'Trikini',
    'Fuera del Agua': 'Buiten het water', 'Accesorios': 'Accessoires',
    'Un detalle audaz': 'Een gedurfd detail', 'Estilo en cada paso': 'Stijl bij elke stap', 'Los detalles finales': 'De finishing touch',
    'Bikinis modernos con detalles seductores y un ajuste perfecto.': 'Moderne bikini’s met verleidelijke details en een perfecte pasvorm.',
    'Trajes de baño de una pieza con silueta elegante y comodidad total.': 'Badpakken met een elegante silhouet en optimaal comfort.',
    'Tankinis de corte refinado para una presencia ligera y femenina.': 'Verfijnde tankini’s voor een lichte en vrouwelijke uitstraling.',
    'Trikinis con proporciones exactas y un aire contemporáneo.': 'Trikini’s met precieze proporties en een eigentijdse uitstraling.',
    'Piezas para llevar la misma esencia de lujo fuera del agua.': 'Items die dezelfde luxe uitstraling buiten het water brengen.',
    'Accesorios para completar y elevar cada look playero.': 'Accessoires om elke strandlook compleet te maken en te versterken.',
  },
};

export function translateLabel(language: LanguageCode, label: string): string {
  return labelTranslations[language][label] || label;
}
