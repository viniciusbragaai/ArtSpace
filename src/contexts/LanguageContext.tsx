import React, { createContext, useContext, useState, useEffect } from 'react';

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

const STORAGE_KEY = 'artspace-language';

const translations: Record<Language, Record<string, string>> = {
  'pt-BR': {
    // Header
    'header.login': 'Entrar',
    'header.register': 'Cadastrar',
    'header.search': 'Buscar artistas, obras, produtos...',
    'header.searchShort': 'Buscar...',
    
    // Navigation
    'nav.home': 'Home',
    'nav.explore': 'Explorar',
    'nav.cart': 'Carrinho',
    'nav.profile': 'Perfil',
    
    // Hero Slides
    'hero.slide1.title': 'Onde a',
    'hero.slide1.highlight': 'Arte Urbana',
    'hero.slide1.subtitle': 'Encontra o',
    'hero.slide1.accent': 'Futuro',
    'hero.slide1.description': 'Descubra artistas emergentes, adquira obras exclusivas e transforme qualquer espaço em uma galeria viva.',
    'hero.slide1.primaryBtn': 'Explorar Coleção',
    'hero.slide1.secondaryBtn': 'Conhecer Artistas',
    
    'hero.slide2.title': 'Coleção',
    'hero.slide2.highlight': 'Exclusiva',
    'hero.slide2.subtitle': 'Direto do',
    'hero.slide2.accent': 'Artista',
    'hero.slide2.description': 'Obras originais e prints de alta qualidade diretamente dos melhores artistas urbanos de Santos.',
    'hero.slide2.primaryBtn': 'Ver Originais',
    'hero.slide2.secondaryBtn': 'Encomendar Print',
    
    'hero.slide3.title': 'Arte no',
    'hero.slide3.highlight': 'Seu Espaço',
    'hero.slide3.subtitle': 'Murais',
    'hero.slide3.accent': 'Personalizados',
    'hero.slide3.description': 'Transforme sua casa, empresa ou evento com uma pintura exclusiva feita sob medida para você.',
    'hero.slide3.primaryBtn': 'Solicitar Orçamento',
    'hero.slide3.secondaryBtn': 'Ver Portfólio',
    
    'hero.slide4.title': 'Eventos',
    'hero.slide4.highlight': 'Ao Vivo',
    'hero.slide4.subtitle': 'Exposições',
    'hero.slide4.accent': '& Workshops',
    'hero.slide4.description': 'Participe de eventos exclusivos, conheça artistas pessoalmente e aprenda técnicas de arte urbana.',
    'hero.slide4.primaryBtn': 'Ver Agenda',
    'hero.slide4.secondaryBtn': 'Inscrever-se',
    
    'hero.slide5.title': 'Produtos',
    'hero.slide5.highlight': 'Exclusivos',
    'hero.slide5.subtitle': 'Canecas, Canetas',
    'hero.slide5.accent': '& Mais',
    'hero.slide5.description': 'Leve a arte urbana para o seu dia a dia com nossos produtos exclusivos assinados pelos artistas.',
    'hero.slide5.primaryBtn': 'Ver Produtos',
    'hero.slide5.secondaryBtn': 'Novidades',
    
    // Section Titles
    'sections.artists': 'Artistas',
    'sections.featuredArtists': 'Artistas em Destaque',
    'sections.portfolio': 'Portfólio',
    'sections.gallery': 'Galeria',
    'sections.news': 'Notícias',
    'sections.artNews': 'Art News',
    'sections.artNewsSubtitle': 'Fique por dentro da cena artística de Santos',
    'sections.viewAll': 'Ver todas',
    'sections.viewAllNews': 'Ver todas as notícias',
    
    // Products
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
    'products.selectOption': 'Selecione uma opção',
    'products.chooseFormat': 'Escolha o formato',
    
    // News Types
    'news.event': 'Evento',
    'news.news': 'Notícia',
    'news.exhibition': 'Exposição',
    
    // News Items
    'news.item1.title': 'Exposição Coletiva: Cores de Santos',
    'news.item1.description': 'Uma celebração da arte urbana santista com 12 artistas locais transformando o centro histórico.',
    'news.item2.title': 'Workshop de Graffiti com Zephyr',
    'news.item2.description': 'Aprenda técnicas de spray e composição com um dos maiores nomes do graffiti brasileiro.',
    'news.item3.title': 'Nova Coleção Digital de Nova',
    'news.item3.description': 'A artista lança sua primeira coleção de NFTs em parceria exclusiva com a galeria.',
    'news.item4.title': 'Mural Gigante na Orla',
    'news.item4.description': 'Projeto comunitário transformará 200m² de muro em obra de arte colaborativa.',
    'news.ongoing': 'Em andamento',
    
    // Footer
    'footer.description': 'Galeria de arte moderna e street art em Santos. Conectando artistas e colecionadores desde 2020.',
    'footer.navigation': 'Navegação',
    'footer.artists': 'Artistas',
    'footer.artworks': 'Obras',
    'footer.printProducts': 'Prints & Produtos',
    'footer.events': 'Eventos',
    'footer.aboutUs': 'Sobre Nós',
    'footer.services': 'Serviços',
    'footer.customPainting': 'Pintura Personalizada',
    'footer.artConsulting': 'Consultoria de Arte',
    'footer.corporateMurals': 'Murais Corporativos',
    'footer.eventCuration': 'Curadoria de Eventos',
    'footer.contact': 'Contato',
    'footer.allRights': 'Todos os direitos reservados.',
    'footer.termsOfUse': 'Termos de Uso',
    'footer.privacy': 'Privacidade',
    
    // Currency
    'currency.usd': 'USD',
    'currency.brl': 'BRL',
    'currency.btc': 'BTC',
    'currency.loading': 'Carregando...',
    'currency.error': 'Erro ao carregar',
    
    // Artist Slider
    'artist.selectArtist': 'Selecione um artista',
    'artist.viewProfile': 'Ver perfil completo',
  },
  'en-US': {
    // Header
    'header.login': 'Login',
    'header.register': 'Sign Up',
    'header.search': 'Search artists, artworks, products...',
    'header.searchShort': 'Search...',
    
    // Navigation
    'nav.home': 'Home',
    'nav.explore': 'Explore',
    'nav.cart': 'Cart',
    'nav.profile': 'Profile',
    
    // Hero Slides
    'hero.slide1.title': 'Where',
    'hero.slide1.highlight': 'Urban Art',
    'hero.slide1.subtitle': 'Meets the',
    'hero.slide1.accent': 'Future',
    'hero.slide1.description': 'Discover emerging artists, acquire exclusive artworks and transform any space into a living gallery.',
    'hero.slide1.primaryBtn': 'Explore Collection',
    'hero.slide1.secondaryBtn': 'Meet Artists',
    
    'hero.slide2.title': 'Exclusive',
    'hero.slide2.highlight': 'Collection',
    'hero.slide2.subtitle': 'Direct from',
    'hero.slide2.accent': 'the Artist',
    'hero.slide2.description': 'Original artworks and high-quality prints directly from the best urban artists of Santos.',
    'hero.slide2.primaryBtn': 'View Originals',
    'hero.slide2.secondaryBtn': 'Order Print',
    
    'hero.slide3.title': 'Art in',
    'hero.slide3.highlight': 'Your Space',
    'hero.slide3.subtitle': 'Custom',
    'hero.slide3.accent': 'Murals',
    'hero.slide3.description': 'Transform your home, business or event with an exclusive painting made just for you.',
    'hero.slide3.primaryBtn': 'Request Quote',
    'hero.slide3.secondaryBtn': 'View Portfolio',
    
    'hero.slide4.title': 'Live',
    'hero.slide4.highlight': 'Events',
    'hero.slide4.subtitle': 'Exhibitions',
    'hero.slide4.accent': '& Workshops',
    'hero.slide4.description': 'Join exclusive events, meet artists in person and learn urban art techniques.',
    'hero.slide4.primaryBtn': 'View Schedule',
    'hero.slide4.secondaryBtn': 'Sign Up',
    
    'hero.slide5.title': 'Exclusive',
    'hero.slide5.highlight': 'Products',
    'hero.slide5.subtitle': 'Mugs, Pens',
    'hero.slide5.accent': '& More',
    'hero.slide5.description': 'Bring urban art to your daily life with our exclusive products signed by the artists.',
    'hero.slide5.primaryBtn': 'View Products',
    'hero.slide5.secondaryBtn': 'New Arrivals',
    
    // Section Titles
    'sections.artists': 'Artists',
    'sections.featuredArtists': 'Featured Artists',
    'sections.portfolio': 'Portfolio',
    'sections.gallery': 'Gallery',
    'sections.news': 'News',
    'sections.artNews': 'Art News',
    'sections.artNewsSubtitle': 'Stay updated on the Santos art scene',
    'sections.viewAll': 'View all',
    'sections.viewAllNews': 'View all news',
    
    // Products
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
    'products.selectOption': 'Select an option',
    'products.chooseFormat': 'Choose format',
    
    // News Types
    'news.event': 'Event',
    'news.news': 'News',
    'news.exhibition': 'Exhibition',
    
    // News Items
    'news.item1.title': 'Collective Exhibition: Colors of Santos',
    'news.item1.description': 'A celebration of Santos urban art with 12 local artists transforming the historic center.',
    'news.item2.title': 'Graffiti Workshop with Zephyr',
    'news.item2.description': 'Learn spray techniques and composition with one of the biggest names in Brazilian graffiti.',
    'news.item3.title': 'New Digital Collection by Nova',
    'news.item3.description': 'The artist launches her first NFT collection in exclusive partnership with the gallery.',
    'news.item4.title': 'Giant Mural on the Waterfront',
    'news.item4.description': 'Community project will transform 200m² of wall into collaborative artwork.',
    'news.ongoing': 'Ongoing',
    
    // Footer
    'footer.description': 'Modern art gallery and street art in Santos. Connecting artists and collectors since 2020.',
    'footer.navigation': 'Navigation',
    'footer.artists': 'Artists',
    'footer.artworks': 'Artworks',
    'footer.printProducts': 'Prints & Products',
    'footer.events': 'Events',
    'footer.aboutUs': 'About Us',
    'footer.services': 'Services',
    'footer.customPainting': 'Custom Painting',
    'footer.artConsulting': 'Art Consulting',
    'footer.corporateMurals': 'Corporate Murals',
    'footer.eventCuration': 'Event Curation',
    'footer.contact': 'Contact',
    'footer.allRights': 'All rights reserved.',
    'footer.termsOfUse': 'Terms of Use',
    'footer.privacy': 'Privacy',
    
    // Currency
    'currency.usd': 'USD',
    'currency.brl': 'BRL',
    'currency.btc': 'BTC',
    'currency.loading': 'Loading...',
    'currency.error': 'Error loading',
    
    // Artist Slider
    'artist.selectArtist': 'Select an artist',
    'artist.viewProfile': 'View full profile',
  },
  'es-ES': {
    // Header
    'header.login': 'Entrar',
    'header.register': 'Registrarse',
    'header.search': 'Buscar artistas, obras, productos...',
    'header.searchShort': 'Buscar...',
    
    // Navigation
    'nav.home': 'Inicio',
    'nav.explore': 'Explorar',
    'nav.cart': 'Carrito',
    'nav.profile': 'Perfil',
    
    // Hero Slides
    'hero.slide1.title': 'Donde el',
    'hero.slide1.highlight': 'Arte Urbano',
    'hero.slide1.subtitle': 'Encuentra el',
    'hero.slide1.accent': 'Futuro',
    'hero.slide1.description': 'Descubre artistas emergentes, adquiere obras exclusivas y transforma cualquier espacio en una galería viva.',
    'hero.slide1.primaryBtn': 'Explorar Colección',
    'hero.slide1.secondaryBtn': 'Conocer Artistas',
    
    'hero.slide2.title': 'Colección',
    'hero.slide2.highlight': 'Exclusiva',
    'hero.slide2.subtitle': 'Directo del',
    'hero.slide2.accent': 'Artista',
    'hero.slide2.description': 'Obras originales y prints de alta calidad directamente de los mejores artistas urbanos de Santos.',
    'hero.slide2.primaryBtn': 'Ver Originales',
    'hero.slide2.secondaryBtn': 'Pedir Print',
    
    'hero.slide3.title': 'Arte en',
    'hero.slide3.highlight': 'Tu Espacio',
    'hero.slide3.subtitle': 'Murales',
    'hero.slide3.accent': 'Personalizados',
    'hero.slide3.description': 'Transforma tu casa, empresa o evento con una pintura exclusiva hecha a medida para ti.',
    'hero.slide3.primaryBtn': 'Solicitar Presupuesto',
    'hero.slide3.secondaryBtn': 'Ver Portafolio',
    
    'hero.slide4.title': 'Eventos',
    'hero.slide4.highlight': 'En Vivo',
    'hero.slide4.subtitle': 'Exposiciones',
    'hero.slide4.accent': '& Talleres',
    'hero.slide4.description': 'Participa en eventos exclusivos, conoce artistas en persona y aprende técnicas de arte urbano.',
    'hero.slide4.primaryBtn': 'Ver Agenda',
    'hero.slide4.secondaryBtn': 'Inscribirse',
    
    'hero.slide5.title': 'Productos',
    'hero.slide5.highlight': 'Exclusivos',
    'hero.slide5.subtitle': 'Tazas, Bolígrafos',
    'hero.slide5.accent': '& Más',
    'hero.slide5.description': 'Lleva el arte urbano a tu día a día con nuestros productos exclusivos firmados por los artistas.',
    'hero.slide5.primaryBtn': 'Ver Productos',
    'hero.slide5.secondaryBtn': 'Novedades',
    
    // Section Titles
    'sections.artists': 'Artistas',
    'sections.featuredArtists': 'Artistas Destacados',
    'sections.portfolio': 'Portafolio',
    'sections.gallery': 'Galería',
    'sections.news': 'Noticias',
    'sections.artNews': 'Art News',
    'sections.artNewsSubtitle': 'Mantente al día de la escena artística de Santos',
    'sections.viewAll': 'Ver todas',
    'sections.viewAllNews': 'Ver todas las noticias',
    
    // Products
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
    'products.selectOption': 'Seleccione una opción',
    'products.chooseFormat': 'Elige el formato',
    
    // News Types
    'news.event': 'Evento',
    'news.news': 'Noticia',
    'news.exhibition': 'Exposición',
    
    // News Items
    'news.item1.title': 'Exposición Colectiva: Colores de Santos',
    'news.item1.description': 'Una celebración del arte urbano de Santos con 12 artistas locales transformando el centro histórico.',
    'news.item2.title': 'Taller de Graffiti con Zephyr',
    'news.item2.description': 'Aprende técnicas de spray y composición con uno de los mayores nombres del graffiti brasileño.',
    'news.item3.title': 'Nueva Colección Digital de Nova',
    'news.item3.description': 'La artista lanza su primera colección de NFTs en asociación exclusiva con la galería.',
    'news.item4.title': 'Mural Gigante en el Paseo Marítimo',
    'news.item4.description': 'Proyecto comunitario transformará 200m² de muro en obra de arte colaborativa.',
    'news.ongoing': 'En curso',
    
    // Footer
    'footer.description': 'Galería de arte moderno y street art en Santos. Conectando artistas y coleccionistas desde 2020.',
    'footer.navigation': 'Navegación',
    'footer.artists': 'Artistas',
    'footer.artworks': 'Obras',
    'footer.printProducts': 'Prints y Productos',
    'footer.events': 'Eventos',
    'footer.aboutUs': 'Sobre Nosotros',
    'footer.services': 'Servicios',
    'footer.customPainting': 'Pintura Personalizada',
    'footer.artConsulting': 'Consultoría de Arte',
    'footer.corporateMurals': 'Murales Corporativos',
    'footer.eventCuration': 'Curaduría de Eventos',
    'footer.contact': 'Contacto',
    'footer.allRights': 'Todos los derechos reservados.',
    'footer.termsOfUse': 'Términos de Uso',
    'footer.privacy': 'Privacidad',
    
    // Currency
    'currency.usd': 'USD',
    'currency.brl': 'BRL',
    'currency.btc': 'BTC',
    'currency.loading': 'Cargando...',
    'currency.error': 'Error al cargar',
    
    // Artist Slider
    'artist.selectArtist': 'Selecciona un artista',
    'artist.viewProfile': 'Ver perfil completo',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getInitialLanguage(): Language {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && ['pt-BR', 'en-US', 'es-ES'].includes(stored)) {
      return stored as Language;
    }
  }
  return 'pt-BR';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(STORAGE_KEY, lang);
  };

  useEffect(() => {
    // Sync with localStorage on mount
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && ['pt-BR', 'en-US', 'es-ES'].includes(stored)) {
      setLanguageState(stored as Language);
    }
  }, []);

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
