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
