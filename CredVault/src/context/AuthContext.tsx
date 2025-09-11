import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'student' | 'faculty' | 'admin' | 'recruiter';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string, role: UserRole): boolean => {
    // Demo login - accepts a@gmail.com with password 123456 for all roles
    if (email === 'a@gmail.com' && password === '123456') {
      const roleNames = {
        student: 'Alex Student',
        faculty: 'Dr. Sarah Faculty',
        admin: 'John Admin',
        recruiter: 'Emma Recruiter'
      };

      setUser({
        id: `${role}-1`,
        name: roleNames[role],
        email,
        role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${role}`
      });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};