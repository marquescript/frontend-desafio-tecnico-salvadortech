import { api } from "@/lib/axios";

export async function toggleStatusVacancyRequest(id: string){

    const response = await api.put(`/vacancy/${id}/toggle-status`);
    return response.data;
}