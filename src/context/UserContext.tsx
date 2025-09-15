import React, { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'student' | 'trainer' | 'gym';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  achievements?: string[];
  streak?: number;
  points?: number;
  level?: number;
  // Student-specific fields
  academicLevel?: string;
  subjects?: string[];
  studyGoals?: string[];
  // Trainer-specific fields
  certifications?: string[];
  specialties?: string[];
  rating?: number;
  // Gym-specific fields
  location?: string;
  facilities?: string[];
  classes?: string[];
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  updateUser: (updates: Partial<User>) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...updates });
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}