import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { authAPI } from '../services/api';

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Always start with demo user logged in for demo mode
  const [user, setUser] = useState<User | null>({
    id: 1,
    email: 'demo@garden.com',
    firstName: 'Demo',
    lastName: 'User'
  });
  const [token, setToken] = useState<string | null>('demo-token-12345');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Set demo credentials on mount - only if not already set
    if (!localStorage.getItem('token')) {
      localStorage.setItem('token', 'demo-token-12345');
      localStorage.setItem('user', JSON.stringify({
        id: 1,
        email: 'demo@garden.com',
        firstName: 'Demo',
        lastName: 'User'
      }));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Demo mode - bypass API for testing
      if (email === 'demo@garden.com' && password === 'demo123') {
        const demoUser = {
          id: 1,
          email: 'demo@garden.com',
          firstName: 'Demo',
          lastName: 'User'
        };
        const demoToken = 'demo-token-12345';
        
        localStorage.setItem('token', demoToken);
        localStorage.setItem('user', JSON.stringify(demoUser));
        setToken(demoToken);
        setUser(demoUser);
        return;
      }
      
      const response = await authAPI.login(email, password);
      const { token, user } = response.data.data;

      // Store token and user
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      
      setToken(token);
      setUser(user);
      
      // Navigation should be handled by the component that calls login
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    // Navigation should be handled by the component that calls logout
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}