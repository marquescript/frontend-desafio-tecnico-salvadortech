import { api } from "@/lib/axios";

export async function createVacancyRequest(title: string, status: string){

    const response = await api.post("/vacancy", {
        title,
        status
    });
    return response.data;
}