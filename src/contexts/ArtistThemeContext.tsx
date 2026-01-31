import React, { createContext, useContext, useState, useCallback } from 'react';

export interface Artist {
  id: string;
  name: string;
  handle: string;
  instagram: string;
  photo: string;
  theme: 'default' | 'street' | 'classic' | 'pop' | 'minimal' | 'neon' | 'abstract' | 'raw' | 'realism' | 'mural';
  bio: string;
  specialty: string;
}

interface ArtistThemeContextType {
  currentArtist: Artist | null;
  setCurrentArtist: (artist: Artist) => void;
  artists: Artist[];
}

const defaultArtists: Artist[] = [
  {
    id: '1',
    name: 'A Fase',
    handle: '@afasesantos',
    instagram: 'https://instagram.com/afasesantos',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    theme: 'street',
    bio: 'A essência do graffiti santista traduzida em letras e formas que dominam o cenário urbano da Baixada.',
    specialty: 'Street Writing',
  },
  {
    id: '2',
    name: 'Cadumen',
    handle: '@cadumen',
    instagram: 'https://instagram.com/cadumen',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    theme: 'mural',
    bio: 'Muralismo que conecta a natureza e o abstrato, transformando espaços em experiências visuais orgânicas.',
    specialty: 'Muralismo',
  },
  {
    id: '3',
    name: 'Zezão',
    handle: '@zezao_sp',
    instagram: 'https://instagram.com/zezao_sp',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    theme: 'abstract',
    bio: 'Lenda mundial da street art, conhecido por dar vida e cor aos lugares mais esquecidos e subterrâneos.',
    specialty: 'Graffiti Abstrato',
  },
  {
    id: '4',
    name: 'Val Lehmann',
    handle: '@val_lehmann',
    instagram: 'https://instagram.com/val_lehmann',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    theme: 'classic',
    bio: 'A delicadeza e força da arte que transita entre o design e a intervenção urbana contemporânea.',
    specialty: 'Fine Art',
  },
  {
    id: '5',
    name: 'Sérgio Free',
    handle: '@sergiofreearte',
    instagram: 'https://instagram.com/sergiofreearte',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop',
    theme: 'pop',
    bio: 'Alegria e cores vibrantes que personificam o espírito da arte de rua brasileira em cada traço.',
    specialty: 'Pop Art',
  },
  {
    id: '6',
    name: 'Paulo Medo',
    handle: '@paulomedo',
    instagram: 'https://instagram.com/paulomedo',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop',
    theme: 'minimal',
    bio: 'Traços marcantes e narrativa visual potente que desafiam o olhar comum sobre a cidade.',
    specialty: 'Ilustração',
  },
  {
    id: '7',
    name: 'Victor Gabriel',
    handle: '@institutovictorgabriel',
    instagram: 'https://instagram.com/institutovictorgabriel',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&h=200&fit=crop',
    theme: 'neon',
    bio: 'Expressão jovem e talento nato que une o legado familiar à inovação da arte contemporânea.',
    specialty: 'Nova Geração',
  },
  {
    id: '8',
    name: 'Costa Villar',
    handle: '@jdacostavillar',
    instagram: 'https://instagram.com/jdacostavillar',
    photo: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=200&h=200&fit=crop',
    theme: 'classic',
    bio: 'Mestre da composição, trazendo a sofisticação da arte de galeria para o contexto da ArtSpace.',
    specialty: 'Fine Art',
  },
  {
    id: '9',
    name: 'Dicart',
    handle: '@adrianodicart',
    instagram: 'https://instagram.com/adrianodicart',
    photo: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&h=200&fit=crop',
    theme: 'realism',
    bio: 'O realismo e a técnica apurada transformando superfícies em janelas para novas percepções.',
    specialty: 'Realismo',
  },
  {
    id: '10',
    name: 'Ozill',
    handle: '@ozill',
    instagram: 'https://instagram.com/ozill',
    photo: 'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?w=200&h=200&fit=crop',
    theme: 'raw',
    bio: 'Estilo autêntico e misterioso, trazendo a força bruta e a verdade das ruas para o acervo internacional.',
    specialty: 'Street Raw',
  },
];

const ArtistThemeContext = createContext<ArtistThemeContextType | undefined>(undefined);

export function ArtistThemeProvider({ children }: { children: React.ReactNode }) {
  const [currentArtist, setCurrentArtistState] = useState<Artist | null>(defaultArtists[0]);

  const setCurrentArtist = useCallback((artist: Artist) => {
    setCurrentArtistState(artist);
    // Update the document class for theme
    document.documentElement.className = '';
    if (artist.theme !== 'default') {
      document.documentElement.classList.add(`theme-${artist.theme}`);
    }
  }, []);

  return (
    <ArtistThemeContext.Provider value={{ currentArtist, setCurrentArtist, artists: defaultArtists }}>
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
