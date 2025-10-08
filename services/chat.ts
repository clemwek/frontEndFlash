import { LOCAL_STORAGE_TOKEN } from "@/lib/constants";
import { fetchAPI, FetchAPIOptions } from "@/utils/fetch-api";
import { getAPIURL } from "@/utils/get-api-url";
import {
    clearLocalStorage,
    getTokenFromLocalStorage,
} from "@/utils/localStorage";

const BASE_URL = getAPIURL();

export async function chatService(prompt: ChatFormData) {
    const url = new URL(`/v1/chat?course_id=${prompt.course_id}`, BASE_URL);

    const token = getTokenFromLocalStorage();

    if (!token) {
        window.location.href = "/auth/login";
        return;
    }

    const options: FetchAPIOptions = {
        method: "POST",
        body: prompt,
        token,
    };

    try {
        const response = await fetchAPI(url.href, options);

        if (response?.status === 401 || response?.status === 403) {
            clearLocalStorage(LOCAL_STORAGE_TOKEN);
            window.location.href = "/auth/login";
            return;
        }

        return response;
    } catch (error) {
        console.error("ChatService Error:", error);
        throw error;
    }
}
