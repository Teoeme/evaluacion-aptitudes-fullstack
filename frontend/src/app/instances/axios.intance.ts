import { AxiosAdapter } from "../adapters/axios.adapter";

export const fetcher = new AxiosAdapter({
    baseUrl: import.meta.env.VITE_API_URL || "http://localhost:3000/server/api",
});
