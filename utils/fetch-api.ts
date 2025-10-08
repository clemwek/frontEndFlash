type NextFetchRequestConfig = {
    revalidate?: number | false;
    tags?: string[];
};

export interface FetchAPIOptions {
    method: "GET" | "POST" | "PUT" | "DELETE";
    token?: string;
    body?: Record<string, unknown>;
    next?: NextFetchRequestConfig;
}

export async function fetchAPI(url: string, options: FetchAPIOptions) {
    const { method, token, body, next } = options;

    const headers: RequestInit & { next?: NextFetchRequestConfig } = {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        },
        ...(body && { body: JSON.stringify(body) }),
        ...(next && { next }),
    };
    
    try {
        const response = await fetch(url, headers);

        return await response.json();
    } catch (error) {
        console.error(`Error ${method} data:`, error);
        throw error;
    }
}
