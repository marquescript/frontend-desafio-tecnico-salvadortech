import { fetchVacancyRequest } from "@/requests/fetch-vacancy-request";
import { Vacancy } from "@/types/vacancy";
import { createContext, ReactNode, useState } from "react";

interface IVacancyContext{
    fetchVacancy: (page: number, size: number, query?: string) => void;
    vacancys: Vacancy[];
}


export const VacancyContext = createContext<IVacancyContext>({
    fetchVacancy: () => {},
    vacancys: []
});

export const VacancyContextProvider = ({children}: {children: ReactNode}) => {

    const [vacancys, setVacancy] = useState<Vacancy[]>([]);
    
    const fetchVacancy = async (page: number = 1, size: number = 8, query?: string) => {
        const data = await fetchVacancyRequest(page, size, query);
        setVacancy(data.data.vacancys);
    }

    return (
        <VacancyContext.Provider value={{fetchVacancy, vacancys}} >
            {children}
        </VacancyContext.Provider>
    )

}