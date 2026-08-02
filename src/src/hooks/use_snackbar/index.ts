import { useContext } from "react"
import { SnackbarContext } from "../../contexts/snackbar_context"

export const useSnackbar = () => {
    const context = useContext(SnackbarContext);
    return context;
}