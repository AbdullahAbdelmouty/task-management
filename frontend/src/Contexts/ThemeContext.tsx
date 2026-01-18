import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import AntThemeProvider from '../config/AntThemeProvider';
import { lightTheme, darkTheme } from '../config/theme';

type ThemeMode = 'light' | 'dark';

interface ThemeContextValue {
    mode: ThemeMode;
    toggleTheme: () => void;
    setTheme: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [mode, setMode] = useState<ThemeMode>(() => {
        return (localStorage.getItem('theme') as ThemeMode) || 'light';
    });

    useEffect(() => {
        localStorage.setItem('theme', mode);
    }, [mode]);

    const toggleTheme = () => {
        setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
    };

    const setTheme = (mode: ThemeMode) => {
        setMode(mode);
    };

    const theme = mode === 'light' ? lightTheme : darkTheme;

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme, setTheme }}>
            <AntThemeProvider theme={theme}>
                {children}
            </AntThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const ctx = useContext(ThemeContext);
    if (!ctx) {
        throw new Error('useTheme must be used inside ThemeProvider');
    }
    return ctx;
};
