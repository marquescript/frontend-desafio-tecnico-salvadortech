import { api } from "@/lib/axios";

export async function updateTitleVacancyRequest(id: string, title: string){

    const response = await api.put(`/vacancy/${id}/update`, {
        title
    });
    return response.data;
}