import { Search } from "lucide-react"
import { TableCell, TableRow } from "../ui/table"
import { useState } from "react"
import { Button } from "../ui/button"
import { ShowVacancyModal } from "./show-vacancy-modal"

interface TableRowVacancyProps {
    id: string;
    title: string
    status: string
}

export const TableRowVacancy = ({ id, title, status }: TableRowVacancyProps) =>{

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <>
            <TableRow>
                <TableCell className="w-1/6 text-center px-2 py-2">
                    <Button onClick={openModal} variant="ghost">
                        <Search />
                    </Button>
                </TableCell>
                <TableCell className="text-left px-4 py-2">{title}</TableCell>
                <TableCell className="text-center px-4 py-2">{status.toLowerCase()}</TableCell>
            </TableRow>

            <ShowVacancyModal isOpen={isOpen} closeModal={closeModal} id={id} />

        </>
    )

}