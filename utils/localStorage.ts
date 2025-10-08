import { LOCAL_STORAGE_CONFIG,LOCAL_STORAGE_TOKEN,
    LOCAL_STORAGE_USER, } from '@/lib/constants';

export const isBrowser = typeof window !== "undefined";

export const setLocalStorage = (key: string, value: string) => {
    if (!isBrowser) return;
    localStorage.setItem(key, value);
};

export const getLocalStorage = (key: string) => {
    if (!isBrowser) return null;
    return localStorage.getItem(key);
};

export const clearLocalStorage = (key: string) => {
    if (!isBrowser) return;
    localStorage.removeItem(key);
};

export const getUserFromLocalStorage = () => {
    const user = getLocalStorage(LOCAL_STORAGE_USER);
    return user ? JSON.parse(user) : {};
};

export const getTokenFromLocalStorage = () => {
    const token = getLocalStorage(LOCAL_STORAGE_TOKEN);
    return token || "";
};

export const getAppConfigFromLocalStorage = () => {
    const config = getLocalStorage(LOCAL_STORAGE_CONFIG);
    return config ? JSON.parse(config) : {};
};
