import { useState, useEffect } from 'react';
import type { User, AuthState } from '@/types';
import { getUsers, saveUsers, getStoredAuth, saveAuth, clearAuth, generateId } from '@/lib/storage';
import { SEED_USERS } from '@/lib/mockData';

function ensureSeedUsers(): void {
  const users = getUsers();
  if (users.length === 0) {
    saveUsers(SEED_USERS);
  }
}

export function useAuth(): {
  auth: AuthState;
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (name: string, email: string, password: string, role: 'seller' | 'bidder' | 'both') => { success: boolean; error?: string };
  logout: () => void;
} {
  const [auth, setAuth] = useState<AuthState>({ user: null, isAuthenticated: false });

  useEffect(() => {
    ensureSeedUsers();
    const stored = getStoredAuth();
    if (stored) {
      const users = getUsers();
      const user = users.find(u => u.id === stored.userId);
      if (user) {
        setAuth({ user, isAuthenticated: true });
      }
    }
  }, []);

  function login(email: string, password: string): { success: boolean; error?: string } {
    const users = getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);
    if (!user) {
      return { success: false, error: 'Invalid email or password.' };
    }
    saveAuth(user.id);
    setAuth({ user, isAuthenticated: true });
    return { success: true };
  }

  function register(name: string, email: string, password: string, role: 'seller' | 'bidder' | 'both'): { success: boolean; error?: string } {
    const users = getUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: 'An account with this email already exists.' };
    }
    const newUser: User = {
      id: generateId(),
      name,
      email,
      password,
      role,
      createdAt: Date.now(),
    };
    saveUsers([...users, newUser]);
    saveAuth(newUser.id);
    setAuth({ user: newUser, isAuthenticated: true });
    return { success: true };
  }

  function logout(): void {
    clearAuth();
    setAuth({ user: null, isAuthenticated: false });
  }

  return { auth, login, register, logout };
}
