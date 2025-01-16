import { api } from "@/lib/axios";

export async function deleteVacancyRequest(id: string){

    const response = await api.delete(`/vacancy/${id}`);
    return response.data;
}