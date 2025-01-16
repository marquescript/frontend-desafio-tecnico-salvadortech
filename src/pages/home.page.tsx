import { AddVacancytModal } from "@/components/internal/add-vacancy-modal";
import { TableRowVacancy } from "@/components/internal/table-row-vacancy.component";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { VacancyContext } from "@/contexts/vacancy-context";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


export const Home = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [querySearch, setQuerySearch] = useState<string>("");

    const { fetchVacancy, vacancys } = useContext(VacancyContext);

    const navigate = useNavigate();
    const { search } = useLocation(); 
    const searchParams = new URLSearchParams(search);
    const queryFromUrl = searchParams.get('vacancy-query') || ''; 

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    useEffect(() => {
        if (!queryFromUrl) {
            setQuerySearch(""); 
            const searchParams = new URLSearchParams(window.location.search);
            searchParams.delete('vacancy-query'); 
            navigate(`?${searchParams.toString()}`, { replace: true });
        } else {
            setQuerySearch(queryFromUrl);
        }
    }, [queryFromUrl, navigate]);

    useEffect(() => {
        const fetchData = async () => {
            fetchVacancy(1, 8, querySearch);
        };
        fetchData();
    }, [queryFromUrl]);


    const handleSetQuerySearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setQuerySearch(newQuery);
        
        
    };

    const handleQuerySearch = () => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('vacancy-query', querySearch); 
        navigate(`?${searchParams.toString()}`); 
    }

    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <div className="w-full max-w-2xl h-[510px]">
                <div className="flex w-full justify-between mb-4">
                    <Button variant="outline" onClick={openModal}>Adicionar vaga</Button>
                    <div className="flex">
                        <Input
                            placeholder="Pesquisar vaga"
                            className="mr-4 w-80"
                            value={querySearch}
                            onChange={handleSetQuerySearch} 
                        />
                        <Button onClick={handleQuerySearch}>Buscar</Button>
                    </div>
                </div>

                <div className="h-full overflow-y-auto border border-gray-300 rounded-lg">
                    <Table className="table-auto w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead className=" text-center px-2 py-2"></TableHead> 
                                <TableHead className="w-1/2 text-left px-4 py-2">Título</TableHead> 
                                <TableHead className=" text-center px-4 py-2">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {vacancys?.map((vacancy) => (
                                <TableRowVacancy
                                    key={vacancy.id}
                                    id={vacancy.id}
                                    title={vacancy.title}
                                    status={vacancy.status}
                                    
                                />
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <AddVacancytModal isOpen={isOpen} closeModal={closeModal}  />
        </div>
    );
};
