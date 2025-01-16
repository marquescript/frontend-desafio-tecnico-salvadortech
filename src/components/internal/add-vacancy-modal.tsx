import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { InputErrorMessage } from "./input-error-message"
import { useContext, useEffect } from "react"
import { toast } from "sonner";
import { createVacancyRequest } from "@/requests/create-vacancy-request"
import { VacancyContext } from "@/contexts/vacancy-context"

interface AddVacancytModalProps {
    isOpen: boolean
    closeModal: () => void
}

const vacancyFormSchema = z.object({
    title: z.string().nonempty("O título é obrigatório."),
    status: z
      .enum(["ABERTA", "FINALIZADA"])
      .refine((val) => val === "ABERTA" || val === "FINALIZADA", {
        message: "O status deve ser 'aberta' ou 'fechada'.",
      }),
  });

export type VacancyForm = z.infer<typeof vacancyFormSchema>;

export const AddVacancytModal = ({ isOpen, closeModal }: AddVacancytModalProps) => {

    const { handleSubmit, register, formState: { errors }, reset } = useForm<VacancyForm>({
        resolver: zodResolver(vacancyFormSchema)
    });

    const { fetchVacancy } = useContext(VacancyContext);
    

    const handleSubmitPress = async (data: VacancyForm) => {
        try{
            await createVacancyRequest(data.title, data.status);
            toast.success("Vaga cadastrado com sucesso.");
            fetchVacancy(1,8);
            closeModal();
        }catch(e){
            console.log(e);  
            toast.error("Não foi possivel cadastrar o produto.");
        }
    }

    useEffect(() => {
        if(isOpen){
            reset();
        }
    }, [isOpen, reset])

    return (
        <>
            <Dialog open={isOpen} onOpenChange={closeModal}>
                <DialogContent>
                    <DialogTitle>Adicionar vaga</DialogTitle>
                
                    <div className="mt-4">

                        <div className="mb-4">
                            <Label className={`${!!errors.title ? 'text-red-500' : 'text-black'}`}>Título</Label>
                            <Input
                                placeholder="título"
                                {...register("title")}
                                type="text"
                                className={`${!!errors.title ? 'border-red-500 border-2' : 'border-black'}`} 
                            />
                            <InputErrorMessage hasError={!!errors.title} message={errors.title?.message} />
                        </div>


                        <div className="mb-4">
                            <Label htmlFor="status" className={`${!!errors.status ? 'text-red-500' : 'text-black'}`}>Status</Label>
                            <select
                                id="status"
                                {...register("status")}
                                className={`${!!errors.status ? 'border-red-500 border-2' : 'border-black'} mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md`}
                            >
                                <option value="">Selecione</option>
                                <option value="ABERTA">Aberta</option>
                                <option value="FINALIZADA">Finalizada</option>
                            </select>
                            <InputErrorMessage hasError={!!errors.status} message={errors.status?.message} />
                        </div>
                    

                        <Button onClick={handleSubmit(handleSubmitPress)} variant="default" className="w-full mt-5">Adicionar</Button>
                  
                    </div>

                </DialogContent>
            </Dialog>
        </>
    )

}