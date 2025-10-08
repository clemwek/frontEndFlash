export const NAV_ITEMS: { href: string; label: string }[] = [
    { href: "/", label: "Dashboard" },
    { href: "/courses/:id/chat", label: "Chat" },
    { href: "/courses", label: "Courses" },
    { href: "/flashcards", label: "Flashcards" },
    { href: "/profile", label: "Profile" },
];

export const EDUCATIONAL_LEVELS = [
    { value: "Primary", label: "Primary" },
    { value: "Secondary", label: "Secondary" },
    { value: "High School", label: "High School" },
    { value: "Undergraduate", label: "Undergraduate" },
    { value: "Postgraduate", label: "Postgraduate" },
    { value: "General", label: "General" },
];

const SNAI= 'SNAI:'

export const LOCAL_STORAGE_USER = `${SNAI}user`;
export const LOCAL_STORAGE_CONFIG = `${SNAI}AppConfig`;
export const LOCAL_STORAGE_TOKEN = `${SNAI}accessToken`
