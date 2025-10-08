import { fetchAPI, FetchAPIOptions } from "@/utils/fetch-api";
import { getAPIURL } from "@/utils/get-api-url";

const BASE_URL = getAPIURL();

export async function loginService(email: string) {
    const url = new URL("/v1/auth/login", BASE_URL);

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Login failed: ${response.status} ${errorText}`);
        }

        return response.json();
    } catch (error) {
        console.error("Auth Login Service Error:", error);
    }
}

export async function verifyService(token: string) {
    const url = new URL("/v1/auth/verify", BASE_URL);

    const options: FetchAPIOptions = {
        method: "POST",
        body: { token },
    };

    return await fetchAPI(url.href, options);
}
