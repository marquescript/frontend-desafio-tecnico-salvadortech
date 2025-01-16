import { api } from "@/lib/axios";

export async function fetchVacancyRequest(page: number = 1, size: number = 8, query?: string){

    const response = await api.get("/vacancy", {
        params: {
            page,
            size,
            query
        }
    });

    return response.data;
}