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
  | 'allRightsReserved';

const translations: Record<LanguageCode, Record<TranslationKey, string>> = {
  es: {
    collection: 'Colección 2026', women: 'Mujeres', groupTrips: 'Viajes Grupales', sale: 'Sale',
    discoverCollection: 'Descubrir Colección', exploreCategories: 'Explorar Categorías', scroll: 'Scroll',
    freeShipping: 'Envío gratis por compras superiores a $120', freeReturns: 'Devoluciones gratuitas en 30 días',
    newCollection: 'Nueva colección — Primavera 2026', footerDescription: 'Innovación, diseño y sofisticación en cada pieza de ropa de baño. Celebramos la autenticidad de cada silueta.',
    whatsappSupport: 'Soporte por WhatsApp', allRightsReserved: 'Todos los derechos reservados',
  },
  en: {
    collection: 'Collection 2026', women: 'Women', groupTrips: 'Group Trips', sale: 'Sale',
    discoverCollection: 'Discover Collection', exploreCategories: 'Explore Categories', scroll: 'Scroll',
    freeShipping: 'Free shipping on orders over $120', freeReturns: 'Free returns within 30 days',
    newCollection: 'New collection — Spring 2026', footerDescription: 'Innovation, design, and sophistication in every swimwear piece. Celebrating the authenticity of every silhouette.',
    whatsappSupport: 'WhatsApp Support', allRightsReserved: 'All rights reserved',
  },
  pt: {
    collection: 'Coleção 2026', women: 'Mulheres', groupTrips: 'Viagens em Grupo', sale: 'Sale',
    discoverCollection: 'Descobrir Coleção', exploreCategories: 'Explorar Categorias', scroll: 'Rolar',
    freeShipping: 'Frete grátis em compras acima de $120', freeReturns: 'Devoluções gratuitas em 30 dias',
    newCollection: 'Nova coleção — Primavera 2026', footerDescription: 'Inovação, design e sofisticação em cada peça de moda praia. Celebramos a autenticidade de cada silhueta.',
    whatsappSupport: 'Suporte pelo WhatsApp', allRightsReserved: 'Todos os direitos reservados',
  },
  fr: {
    collection: 'Collection 2026', women: 'Femmes', groupTrips: 'Voyages en groupe', sale: 'Sale',
    discoverCollection: 'Découvrir la collection', exploreCategories: 'Explorer les catégories', scroll: 'Défiler',
    freeShipping: 'Livraison offerte dès 120 $', freeReturns: 'Retours gratuits sous 30 jours',
    newCollection: 'Nouvelle collection — Printemps 2026', footerDescription: 'Innovation, design et sophistication dans chaque pièce de maillots de bain. Nous célébrons l’authenticité de chaque silhouette.',
    whatsappSupport: 'Assistance WhatsApp', allRightsReserved: 'Tous droits réservés',
  },
  it: {
    collection: 'Collezione 2026', women: 'Donne', groupTrips: 'Viaggi di gruppo', sale: 'Sale',
    discoverCollection: 'Scopri la collezione', exploreCategories: 'Esplora le categorie', scroll: 'Scorri',
    freeShipping: 'Spedizione gratuita per ordini oltre $120', freeReturns: 'Resi gratuiti entro 30 giorni',
    newCollection: 'Nuova collezione — Primavera 2026', footerDescription: 'Innovazione, design e raffinatezza in ogni capo beachwear. Celebriamo l’autenticità di ogni silhouette.',
    whatsappSupport: 'Supporto WhatsApp', allRightsReserved: 'Tutti i diritti riservati',
  },
  de: {
    collection: 'Kollektion 2026', women: 'Damen', groupTrips: 'Gruppenreisen', sale: 'Sale',
    discoverCollection: 'Kollektion entdecken', exploreCategories: 'Kategorien entdecken', scroll: 'Scrollen',
    freeShipping: 'Kostenloser Versand ab $120', freeReturns: 'Kostenlose Rückgabe innerhalb von 30 Tagen',
    newCollection: 'Neue Kollektion — Frühling 2026', footerDescription: 'Innovation, Design und Raffinesse in jedem Bademodenstück. Wir feiern die Authentizität jeder Silhouette.',
    whatsappSupport: 'WhatsApp-Support', allRightsReserved: 'Alle Rechte vorbehalten',
  },
  nl: {
    collection: 'Collectie 2026', women: 'Dames', groupTrips: 'Groepsreizen', sale: 'Sale',
    discoverCollection: 'Ontdek de collectie', exploreCategories: 'Categorieën ontdekken', scroll: 'Scrollen',
    freeShipping: 'Gratis verzending vanaf $120', freeReturns: 'Gratis retourneren binnen 30 dagen',
    newCollection: 'Nieuwe collectie — Lente 2026', footerDescription: 'Innovatie, design en verfijning in elk badmode-item. We vieren de authenticiteit van elk silhouet.',
    whatsappSupport: 'WhatsApp-support', allRightsReserved: 'Alle rechten voorbehouden',
  },
};

export function translate(language: LanguageCode, key: TranslationKey): string {
  return translations[language][key];
}
