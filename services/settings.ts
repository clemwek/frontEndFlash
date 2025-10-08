import { fetchAPI, FetchAPIOptions } from "@/utils/fetch-api";
import { getAPIURL } from "@/utils/get-api-url";

const BASE_URL = getAPIURL();

export async function getConfig() {
    const url = new URL("/config", BASE_URL);

    const options: FetchAPIOptions = {
        method: "GET",
    };

    return await fetchAPI(url.href, options);
}