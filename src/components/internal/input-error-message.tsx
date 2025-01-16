
interface InputErrorMessageProps {
    hasError: boolean; 
    message: string | undefined;
}

export const InputErrorMessage = ({hasError, message}: InputErrorMessageProps) => {

    return (
        <div className="mt-1 w-full pl-2">
            {hasError && (
                <span className="text-red-500 text-xs">{message}</span>
            )}
        </div>
    )

}