import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Typography } from "@mui/material";
import type { Habit } from "../../contexts/habit_context/type";
import { supabase } from "../../utils/supabase";
import { Fragment, useState } from "react";
import { useHabit } from "../../hooks/use_habit";

interface DeleteHabitConfirmationDialog {
    habit: Habit,
    handleClose: () => void;
}

const DeleteHabitConfirmationDialog: React.FC<DeleteHabitConfirmationDialog> = ({ habit, handleClose }) => {

    const { fetchHabits } = useHabit();

    const [snackBarSeverity, setSnackBarSeverity] = useState<"error" | "success">("success");
    const [openSnackBar, setOpenSnackBar] = useState(false);

    const deleteHabit = async () => {
        const { error } = await supabase.from('habits').delete().eq('id', habit.id);
        if (error) {
            setSnackBarSeverity("error");
            setOpenSnackBar(true);
            //handleClose();
            return;
        }

        setSnackBarSeverity("success");
        setOpenSnackBar(true);
        await fetchHabits();
        //handleClose();
    }

    return <Fragment>
        <Dialog fullWidth open={!openSnackBar} onClose={handleClose}>
            <DialogTitle variant="h5" sx={{ fontWeight: 'bold' }}>
                Delete habit
            </DialogTitle>
            <DialogContent>
                <Typography variant="body1">Deleting "<b>{habit?.name}</b>" permanently removes the habit and all of its tracked history. This action cannot be undone.</Typography>
            </DialogContent>
            <DialogActions>
                <Button variant="text" sx={{ color: 'black' }} onClick={handleClose}>
                    <Typography variant="button">Cancel</Typography>
                </Button>
                <Button variant="contained" sx={{ backgroundColor: "error.main" }} onClick={deleteHabit}>
                    <Typography variant="button">Delete</Typography>
                </Button>
            </DialogActions>
        </Dialog>
        <Snackbar open={openSnackBar} autoHideDuration={3000} onClose={handleClose}>
            <Alert
                onClose={handleClose}
                severity={snackBarSeverity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {snackBarSeverity == "success" ? "Habit deleted!" : "Fail to delete habit!"}
            </Alert>
        </Snackbar></Fragment>
}

export default DeleteHabitConfirmationDialog;