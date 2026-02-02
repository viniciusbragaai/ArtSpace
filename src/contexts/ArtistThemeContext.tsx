import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export interface Artist {
  id: string;
  name: string;
  handle: string;
  instagram: string;
  photo: string;
  theme: 'default' | 'street' | 'classic' | 'pop' | 'minimal' | 'neon' | 'abstract' | 'raw' | 'realism' | 'mural';
  bio: string;
  specialty: string;
  neonColor: string; // HEX color for dynamic theming
}

// Artist color mapping
const artistColors: Record<string, string> = {
  '1': '#FFEF00', // A Fase - Amarelo
  '2': '#00FFFF', // Cadumen - Azul Ciano
  '3': '#50C878', // Zezão - Verde
  '4': '#FF00FF', // Val Lehmann - Rosa Magenta
  '5': '#FF5F1F', // Sérgio Free - Laranja
  '6': '#FF0000', // Paulo Medo - Vermelho
  '7': '#F0F8FF', // Victor Gabriel - Branco Gelo
  '8': '#FFBF00', // Costa Villar - Dourado
  '9': '#6A0DAD', // Dicart - Ultra Violeta
  '10': '#808080', // Ozill - Cinza Concreto
};

// Convert HEX to HSL for CSS variables
function hexToHSL(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}

interface ArtistThemeContextType {
  currentArtist: Artist | null;
  setCurrentArtist: (artist: Artist) => void;
  artists: Artist[];
  neonColor: string;
}

const defaultArtists: Artist[] = [
  {
    id: '1',
    name: 'A Fase',
    handle: '@afasesantos',
    instagram: 'https://instagram.com/afasesantos',
    photo: '/artists/a-fase.png',
    theme: 'street',
    bio: 'A essência do graffiti santista traduzida em letras e formas que dominam o cenário urbano da Baixada.',
    specialty: 'Street Writing',
    neonColor: '#FFEF00',
  },
  {
    id: '2',
    name: 'Cadumen',
    handle: '@cadumen',
    instagram: 'https://instagram.com/cadumen',
    photo: '/artists/cadumen.png',
    theme: 'mural',
    bio: 'Muralismo que conecta a natureza e o abstrato, transformando espaços em experiências visuais orgânicas.',
    specialty: 'Muralismo',
    neonColor: '#00FFFF',
  },
  {
    id: '3',
    name: 'Zezão',
    handle: '@zezao_sp',
    instagram: 'https://instagram.com/zezao_sp',
    photo: '/artists/zezao.png',
    theme: 'abstract',
    bio: 'Lenda mundial da street art, conhecido por dar vida e cor aos lugares mais esquecidos e subterrâneos.',
    specialty: 'Graffiti Abstrato',
    neonColor: '#50C878',
  },
  {
    id: '4',
    name: 'Val Lehmann',
    handle: '@val_lehmann',
    instagram: 'https://instagram.com/val_lehmann',
    photo: '/artists/val-lehmann.png',
    theme: 'classic',
    bio: 'A delicadeza e força da arte que transita entre o design e a intervenção urbana contemporânea.',
    specialty: 'Fine Art',
    neonColor: '#FF00FF',
  },
  {
    id: '5',
    name: 'Sérgio Free',
    handle: '@sergiofreearte',
    instagram: 'https://instagram.com/sergiofreearte',
    photo: '/artists/sergio-free.png',
    theme: 'pop',
    bio: 'Alegria e cores vibrantes que personificam o espírito da arte de rua brasileira em cada traço.',
    specialty: 'Pop Art',
    neonColor: '#FF5F1F',
  },
  {
    id: '6',
    name: 'Paulo Medo',
    handle: '@paulomedo',
    instagram: 'https://instagram.com/paulomedo',
    photo: '/artists/paulo-medo.png',
    theme: 'minimal',
    bio: 'Traços marcantes e narrativa visual potente que desafiam o olhar comum sobre a cidade.',
    specialty: 'Ilustração',
    neonColor: '#FF0000',
  },
  {
    id: '7',
    name: 'Victor Gabriel',
    handle: '@institutovictorgabriel',
    instagram: 'https://instagram.com/institutovictorgabriel',
    photo: '/artists/victor-gabriel.png',
    theme: 'neon',
    bio: 'Expressão jovem e talento nato que une o legado familiar à inovação da arte contemporânea.',
    specialty: 'Nova Geração',
    neonColor: '#F0F8FF',
  },
  {
    id: '8',
    name: 'Costa Villar',
    handle: '@jdacostavillar',
    instagram: 'https://instagram.com/jdacostavillar',
    photo: '/artists/costa-villar.png',
    theme: 'classic',
    bio: 'Mestre da composição, trazendo a sofisticação da arte de galeria para o contexto da ArtSpace.',
    specialty: 'Fine Art',
    neonColor: '#FFBF00',
  },
  {
    id: '9',
    name: 'Dicart',
    handle: '@adrianodicart',
    instagram: 'https://instagram.com/adrianodicart',
    photo: '/artists/dicart.png',
    theme: 'realism',
    bio: 'Expressão visual vibrante através de formas e cores digitais.',
    specialty: 'Arte Visual Contemporânea',
    neonColor: '#6A0DAD',
  },
  {
    id: '10',
    name: 'Ozi Stencil',
    handle: '@ozistencil',
    instagram: 'https://instagram.com/ozistencil',
    photo: '/artists/ozi.png',
    theme: 'raw',
    bio: 'Pioneiro do Stencil Art no Brasil, transformando a paisagem urbana com crítica e humor desde 1985.',
    specialty: 'Stencil Art / Graffiti',
    neonColor: '#808080',
  },
];

const ArtistThemeContext = createContext<ArtistThemeContextType | undefined>(undefined);

export function ArtistThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentArtist, setCurrentArtistState] = useState<Artist | null>(defaultArtists[0]);
  const [neonColor, setNeonColor] = useState<string>(artistColors['1']);

  // Update CSS variables when artist changes
  const updateCSSVariables = useCallback((artist: Artist) => {
    const hsl = hexToHSL(artist.neonColor);
    document.documentElement.style.setProperty('--neon-color', artist.neonColor);
    document.documentElement.style.setProperty('--artist-primary', hsl);
    document.documentElement.style.setProperty('--artist-accent', hsl);
    
    // Create a slightly different secondary color
    const secondaryHsl = hexToHSL(artist.neonColor);
    const [h, s, l] = secondaryHsl.split(' ');
    const adjustedHue = (parseInt(h) + 30) % 360;
    document.documentElement.style.setProperty('--artist-secondary', `${adjustedHue} ${s} ${l}`);
  }, []);

  const setCurrentArtist = useCallback((artist: Artist) => {
    setCurrentArtistState(artist);
    setNeonColor(artist.neonColor);
    
    // Update CSS variables
    updateCSSVariables(artist);
    
    // Update the document class for theme
    document.documentElement.className = '';
    if (artist.theme !== 'default') {
      document.documentElement.classList.add(`theme-${artist.theme}`);
    }
  }, [updateCSSVariables]);

  // Initialize CSS variables on mount
  useEffect(() => {
    if (currentArtist) {
      updateCSSVariables(currentArtist);
    }
  }, []);

  return (
    <ArtistThemeContext.Provider value={{ currentArtist, setCurrentArtist, artists: defaultArtists, neonColor }}>
      {children}
    </ArtistThemeContext.Provider>
  );
}

export function useArtistTheme() {
  const context = useContext(ArtistThemeContext);
  if (context === undefined) {
    throw new Error('useArtistTheme must be used within an ArtistThemeProvider');
  }
  return context;
}
