export function getAPIURL() {
    return process.env.BE_API_URL ?? "http://localhost:8000";
}
