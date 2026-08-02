import { useState } from "react"
import { Snackbar, Alert } from "@mui/material";
import { SnackbarContext } from "../../contexts/snackbar_context";

const SnackbarProvider = ({ children }) => {

    const [isOpen, setIsOpen] = useState(false);
    const [messageContent, setMessageContent] = useState("");
    const [severity, setSeverity] = useState<"success" | "error">("error");

    const notify = (message: string, severity: "success" | "error" | undefined) => {
        setMessageContent(message);
        if (severity) setSeverity(severity);
        setIsOpen(true);
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    return <SnackbarContext value={{ notify }}>
        {children}
        <Snackbar open={isOpen} autoHideDuration={3000} onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity={severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {messageContent}
            </Alert>
        </Snackbar>
    </SnackbarContext>
}

export default SnackbarProvider;