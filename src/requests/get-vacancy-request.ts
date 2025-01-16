import { api } from "@/lib/axios";

export async function getVacancyRequest(id: string){

    const response = await api.get(`/vacancy/${id}`);
    return response.data;
}