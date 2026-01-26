import React, { createContext, useContext, useState, useCallback } from 'react';

export interface Artist {
  id: string;
  name: string;
  photo: string;
  theme: 'default' | 'street' | 'classic' | 'pop' | 'minimal' | 'neon';
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
    name: 'Zephyr',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    theme: 'street',
    bio: 'Artista urbano de Santos, conhecido por murais vibrantes',
    specialty: 'Street Art & Murais',
  },
  {
    id: '2',
    name: 'Marina Vale',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    theme: 'classic',
    bio: 'Pintora clássica com influências impressionistas',
    specialty: 'Óleo sobre Tela',
  },
  {
    id: '3',
    name: 'PRISM',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    theme: 'pop',
    bio: 'Pop art contemporânea com crítica social',
    specialty: 'Pop Art Digital',
  },
  {
    id: '4',
    name: 'Kuro',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    theme: 'minimal',
    bio: 'Minimalismo geométrico em preto e branco',
    specialty: 'Arte Minimalista',
  },
  {
    id: '5',
    name: 'Nova',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop',
    theme: 'neon',
    bio: 'Arte digital futurista e instalações LED',
    specialty: 'Arte Digital & LED',
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
