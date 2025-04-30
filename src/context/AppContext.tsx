import { createContext, useContext, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark';
type Language = 'tr' | 'en';

interface AppContextType {
    theme: Theme;
    language: Language;
    toggleTheme: () => void;
    setLanguage: (lang: Language) => void;
    translations: {
        [key: string]: {
            tr: string;
            en: string;
        };
    };
}

const translations = {
    followers: {
        tr: 'Takipçiler',
        en: 'Followers'
    },
    following: {
        tr: 'Takip Edilenler',
        en: 'Following'
    },
    notFollowingBack: {
        tr: 'Sizi Takip Etmeyenler',
        en: 'Not Following Back'
    },
    notFollowing: {
        tr: 'Senin Takip Etmediklerin',
        en: 'You Don\'t Follow'
    },
    search: {
        tr: 'Kullanıcı adı ara...',
        en: 'Search username...'
    },
    sortAlphabetical: {
        tr: 'Alfabetik Sırala',
        en: 'Sort Alphabetically'
    },
    sortRecent: {
        tr: 'En Son Eklenen',
        en: 'Most Recent'
    },
    downloadCSV: {
        tr: 'CSV İndir',
        en: 'Download CSV'
    },
    previous: {
        tr: 'Önceki',
        en: 'Previous'
    },
    next: {
        tr: 'Sonraki',
        en: 'Next'
    },
    page: {
        tr: 'Sayfa',
        en: 'Page'
    },
    addToFavorites: {
        tr: 'Favorilere Ekle',
        en: 'Add to Favorites'
    },
    removeFromFavorites: {
        tr: 'Favorilerden Çıkar',
        en: 'Remove from Favorites'
    },
    addNote: {
        tr: 'Not Ekle',
        en: 'Add Note'
    },
    saveNote: {
        tr: 'Notu Kaydet',
        en: 'Save Note'
    },
    cancel: {
        tr: 'İptal',
        en: 'Cancel'
    },
    instagramFollowerCheck: {
        tr: 'Instagram Takipçi Kontrolü',
        en: 'Instagram Follower Check'
    },
    developer: {
        tr: 'Geliştirici',
        en: 'Developer'
    },
    people: {
        tr: 'kişi',
        en: 'people'
    },
    howItWork: {
        tr: 'Nasıl Çalışır',
        en: 'How It Work'
    }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>('light');
    const [language, setLanguage] = useState<Language>('tr');

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    return (
        <AppContext.Provider value={{ theme, language, toggleTheme, setLanguage, translations }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
} 