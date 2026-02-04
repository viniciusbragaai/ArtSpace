import React, { createContext, useContext, useState, useCallback } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  isPrivate: boolean;
  badges: Badge[];
  friends: Friend[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: 'gold' | 'silver' | 'bronze';
  artistId?: string;
  unlockedAt?: Date;
}

export interface Friend {
  id: string;
  name: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  togglePrivacy: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Simulated badges
const defaultBadges: Badge[] = [
  { id: '1', name: 'Entusiasta em Arte', description: 'Bem-vindo à comunidade ArtSpace!', icon: 'gold' },
];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const login = useCallback(async (email: string, _password: string): Promise<boolean> => {
    // Simulated login
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setUser({
      id: '1',
      email,
      name: email.split('@')[0],
      isPrivate: false,
      badges: defaultBadges,
      friends: [
        { id: '2', name: 'Maria Silva', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100' },
        { id: '3', name: 'João Santos', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100' },
      ],
    });
    setIsAuthModalOpen(false);
    return true;
  }, []);

  const loginWithGoogle = useCallback(async (): Promise<boolean> => {
    // Simulated Google login
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setUser({
      id: '1',
      email: 'user@gmail.com',
      name: 'Google User',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100',
      isPrivate: false,
      badges: defaultBadges,
      friends: [],
    });
    setIsAuthModalOpen(false);
    return true;
  }, []);

  const register = useCallback(async (email: string, password: string, name: string): Promise<boolean> => {
    // Simulated registration
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setUser({
      id: '1',
      email,
      name,
      isPrivate: false,
      badges: [defaultBadges[0]],
      friends: [],
    });
    setIsAuthModalOpen(false);
    return true;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const togglePrivacy = useCallback(() => {
    setUser(prev => prev ? { ...prev, isPrivate: !prev.isPrivate } : null);
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isAuthModalOpen,
      setIsAuthModalOpen,
      login,
      loginWithGoogle,
      register,
      logout,
      togglePrivacy,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
