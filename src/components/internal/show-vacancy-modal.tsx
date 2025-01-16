import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription } from "../ui/dialog"
import { Table, TableBody, TableCell, TableRow } from "../ui/table"
import { useContext, useEffect, useState } from "react"
import { Vacancy } from "@/types/vacancy"
import { Input } from "../ui/input"
import { X } from "lucide-react"
import { getVacancyRequest } from "@/requests/get-vacancy-request"
import { toggleStatusVacancyRequest } from "@/requests/toggle-status-vacancy-request"
import { toast } from "sonner"
import { updateTitleVacancyRequest } from "@/requests/update-title-request"
import { deleteVacancyRequest } from "@/requests/delete-vacancy-request"
import { VacancyContext } from "@/contexts/vacancy-context"

interface ShowVacancyModalProps {
    id: string
    isOpen: boolean
    closeModal: () => void
}

export const ShowVacancyModal = ({ closeModal, isOpen, id }: ShowVacancyModalProps) => {

    const [vacancy, setVacancy] = useState<Vacancy | null>(null);
    const [inputTitle, setInputTitle] = useState(false);
    const [titleContent, setTitleContent] = useState("");

    const { fetchVacancy } = useContext(VacancyContext);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getVacancyRequest(id);
            setVacancy(data.data.vacancy);
        }
        fetchData();
    }, [])
 
    const handleOpenInputTitle = () => setInputTitle(true)
    const handleCloseInputTitle = () => setInputTitle(false)

    const handleChangeStatus = async () => {
        try{
            const data = await toggleStatusVacancyRequest(id);
            setVacancy(data.data.vacancy);
            fetchVacancy(1,8);
            toast.success("Status alterado com sucesso")
        }catch(e){
            toast.error("Não foi possivel alterar o status")
        }
    }

    const handleTitleContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleContent(e.target.value);
    }

    const handleSubmitTitleUpdate = async () => {
        if(!titleContent) return;
        try{
            const data = await updateTitleVacancyRequest(id, titleContent);
            setVacancy(data.data.vacancy);
            fetchVacancy(1,8);
            toast.success("Título alterado com sucesso");
            setInputTitle(false);
        }catch(e){
            toast.error("Não foi possivel alterar o título")
        }
    }

    const handleDeleteVacancy = async () => {
        
        try{
            await deleteVacancyRequest(id);
            toast.success("Vaga deletada com sucesso");
            fetchVacancy(1,8);
            closeModal();
        }catch(e){
            toast.error("Não foi possivel excluir a vaga")
        }

    }

    return (
        <>
            <Dialog open={isOpen} onOpenChange={closeModal}>
                <DialogContent>
                    <DialogDescription>Detalhes da vaga</DialogDescription>
                
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Título</TableCell>
                                <TableCell className="text-end">{vacancy?.title}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Status</TableCell>
                                <TableCell className="text-end whitespace-normal break-words">{vacancy?.status.toLowerCase()}</TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>Data de criação</TableCell>
                                <TableCell className="text-end">
                                    {vacancy?.created_at ? new Date(vacancy.created_at).toLocaleDateString() : 'Data indefinida'}
                                </TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>

                    <div className="flex items-center justify-between">
                        <Button variant="link" className="text-xs" onClick={handleChangeStatus}>Alterar status</Button>
                        {!inputTitle && (
                            <>
                                <Button variant="link" className="text-xs" onClick={handleDeleteVacancy}>excluir vaga</Button>
                                <Button variant="link" className="text-xs" onClick={handleOpenInputTitle}>Alterar titulo</Button>
                            </>
                        )}
                        {inputTitle && (
                            <div className="flex items-center">
                                <Input placeholder="Novo nome" className="w-48 h-9 mr-3" value={titleContent} onChange={handleTitleContent} />
                                <Button className="h-9 text-xs" onClick={handleSubmitTitleUpdate}>Salvar</Button>
                                <X className="ml-2" onClick={handleCloseInputTitle} />
                            </div>
                        )}
                    </div>

                </DialogContent>
            </Dialog>
        </>
    )

}
