import React, { createContext, useContext, useState } from 'react';

export type Language = 'pt-BR' | 'en-US' | 'es-ES';

interface LanguageOption {
  code: Language;
  label: string;
  flag: string;
  shortLabel: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'pt-BR', label: 'Português', flag: '🇧🇷', shortLabel: 'PT' },
  { code: 'en-US', label: 'English', flag: '🇺🇸', shortLabel: 'EN' },
  { code: 'es-ES', label: 'Español', flag: '🇪🇸', shortLabel: 'ES' },
];

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  currentLanguage: LanguageOption;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  'pt-BR': {
    'header.login': 'Entrar',
    'header.register': 'Cadastrar',
    'header.search': 'Buscar artistas, obras, produtos...',
    'header.searchShort': 'Buscar...',
    'products.portfolio': 'Portfólio',
    'products.artists': 'Artistas',
    'products.original': 'Original',
    'products.print': 'Print',
    'products.custom': 'Sob Medida',
    'products.mug': 'Caneca',
    'products.pen': 'Caneta',
    'products.uniqueWork': 'Obra única',
    'products.unit': 'Unidade',
    'products.addToCart': 'Adicionar ao Carrinho',
    'products.requestQuote': 'Solicite em seu Muro/Ambiente',
    'products.customPainting': 'Pintura Personalizada',
    'products.requestQuoteDescription': 'Solicite um orçamento para ter a obra',
    'products.inYourEnvironment': 'em seu ambiente.',
    'products.name': 'Nome',
    'products.phone': 'Telefone',
    'products.email': 'Email',
    'products.width': 'Largura (m)',
    'products.height': 'Altura (m)',
    'products.environmentDescription': 'Descrição do Ambiente',
    'products.environmentPlaceholder': 'Descreva o local onde deseja a pintura (interno/externo, tipo de parede, etc.)',
    'products.submitQuote': 'Solicitar Orçamento',
    'products.explore': 'Explore obras únicas e exclusivas. De quadros originais a prints acessíveis, ou até uma pintura personalizada no seu ambiente.',
    'currency.usd': 'USD',
    'currency.brl': 'BRL',
    'currency.btc': 'BTC',
  },
  'en-US': {
    'header.login': 'Login',
    'header.register': 'Sign Up',
    'header.search': 'Search artists, artworks, products...',
    'header.searchShort': 'Search...',
    'products.portfolio': 'Portfolio',
    'products.artists': 'Artists',
    'products.original': 'Original',
    'products.print': 'Print',
    'products.custom': 'Custom',
    'products.mug': 'Mug',
    'products.pen': 'Pen',
    'products.uniqueWork': 'Unique artwork',
    'products.unit': 'Unit',
    'products.addToCart': 'Add to Cart',
    'products.requestQuote': 'Request for your Wall/Space',
    'products.customPainting': 'Custom Painting',
    'products.requestQuoteDescription': 'Request a quote to have the artwork',
    'products.inYourEnvironment': 'in your space.',
    'products.name': 'Name',
    'products.phone': 'Phone',
    'products.email': 'Email',
    'products.width': 'Width (m)',
    'products.height': 'Height (m)',
    'products.environmentDescription': 'Environment Description',
    'products.environmentPlaceholder': 'Describe where you want the painting (indoor/outdoor, wall type, etc.)',
    'products.submitQuote': 'Request Quote',
    'products.explore': 'Explore unique and exclusive artworks. From original paintings to affordable prints, or even a custom painting in your space.',
    'currency.usd': 'USD',
    'currency.brl': 'BRL',
    'currency.btc': 'BTC',
  },
  'es-ES': {
    'header.login': 'Entrar',
    'header.register': 'Registrarse',
    'header.search': 'Buscar artistas, obras, productos...',
    'header.searchShort': 'Buscar...',
    'products.portfolio': 'Portafolio',
    'products.artists': 'Artistas',
    'products.original': 'Original',
    'products.print': 'Print',
    'products.custom': 'A Medida',
    'products.mug': 'Taza',
    'products.pen': 'Bolígrafo',
    'products.uniqueWork': 'Obra única',
    'products.unit': 'Unidad',
    'products.addToCart': 'Añadir al Carrito',
    'products.requestQuote': 'Solicita en tu Muro/Ambiente',
    'products.customPainting': 'Pintura Personalizada',
    'products.requestQuoteDescription': 'Solicita un presupuesto para tener la obra',
    'products.inYourEnvironment': 'en tu ambiente.',
    'products.name': 'Nombre',
    'products.phone': 'Teléfono',
    'products.email': 'Email',
    'products.width': 'Ancho (m)',
    'products.height': 'Alto (m)',
    'products.environmentDescription': 'Descripción del Ambiente',
    'products.environmentPlaceholder': 'Describe dónde quieres la pintura (interior/exterior, tipo de pared, etc.)',
    'products.submitQuote': 'Solicitar Presupuesto',
    'products.explore': 'Explora obras únicas y exclusivas. Desde cuadros originales hasta prints accesibles, o incluso una pintura personalizada en tu espacio.',
    'currency.usd': 'USD',
    'currency.brl': 'BRL',
    'currency.btc': 'BTC',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('pt-BR');

  const currentLanguage = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, currentLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
