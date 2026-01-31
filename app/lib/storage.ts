import { City } from "./cities";

const STORAGE_KEYS = {
    RECENT: 'weatherly_recent',
    FAVORITES: 'weatherly_favorites',
    LAST_CITY: 'weatherly_last_active' // To resume where user left off
};

export const getRecentSearches = (): City[] => {
    if (typeof window === 'undefined') return [];
    try {
        const item = localStorage.getItem(STORAGE_KEYS.RECENT);
        return item ? JSON.parse(item) : [];
    } catch (e) { return []; }
};

export const addRecentSearch = (city: City) => {
    if (typeof window === 'undefined') return;
    const recent = getRecentSearches();

    // Remove duplicate if exists, add to front
    const filtered = recent.filter(c => c.name !== city.name);
    const updated = [city, ...filtered].slice(0, 6); // Keep last 6

    localStorage.setItem(STORAGE_KEYS.RECENT, JSON.stringify(updated));
    return updated;
};

export const removeRecentSearch = (city: City) => {
    if (typeof window === 'undefined') return [];
    const recent = getRecentSearches();
    const updated = recent.filter(c => c.name !== city.name);
    localStorage.setItem(STORAGE_KEYS.RECENT, JSON.stringify(updated));
    return updated;
}

export const getFavorites = (): City[] => {
    if (typeof window === 'undefined') return [];
    try {
        const item = localStorage.getItem(STORAGE_KEYS.FAVORITES);
        return item ? JSON.parse(item) : [];
    } catch (e) { return []; }
};

export const toggleFavorite = (city: City): City[] => {
    if (typeof window === 'undefined') return [];
    const favs = getFavorites();
    const exists = favs.find(c => c.name === city.name);

    let updated;
    if (exists) {
        updated = favs.filter(c => c.name !== city.name);
    } else {
        updated = [city, ...favs];
    }

    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(updated));
    return updated;
};

export const saveLastCity = (city: City) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEYS.LAST_CITY, JSON.stringify(city));
    }
}

export const getLastCity = (): City | null => {
    if (typeof window === 'undefined') return null;
    try {
        const item = localStorage.getItem(STORAGE_KEYS.LAST_CITY);
        return item ? JSON.parse(item) : null;
    } catch { return null }
}
