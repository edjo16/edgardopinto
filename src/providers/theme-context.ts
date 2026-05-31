import { createContext } from 'react';

export type Theme = 'dark' | 'light';
export type ThemeCtxValue = { theme: Theme; toggle: () => void };

export const ThemeContext = createContext<ThemeCtxValue | null>(null);
export const THEME_STORAGE_KEY = 'ep-theme';
