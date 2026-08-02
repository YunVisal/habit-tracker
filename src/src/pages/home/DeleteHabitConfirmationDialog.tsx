import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import type { Habit } from "../../contexts/habit_context/type";
import { supabase } from "../../utils/supabase";
import { Fragment } from "react";
import { useHabit } from "../../hooks/use_habit";
import { useSnackbar } from "../../hooks/use_snackbar";

interface DeleteHabitConfirmationDialog {
    habit: Habit,
    handleClose: () => void;
}

const DeleteHabitConfirmationDialog: React.FC<DeleteHabitConfirmationDialog> = ({ habit, handleClose }) => {

    const { fetchHabits } = useHabit();
    const { notify } = useSnackbar();

    const deleteHabit = async () => {
        const { error } = await supabase.from('habits').delete().eq('id', habit.id);
        if (error) {
            notify("Fail to delete habit!", "error");
            handleClose();
            return;
        }

        notify("Habit deleted!", "success");
        handleClose();
        await fetchHabits();
    }

    return <Fragment>
        <Dialog fullWidth open onClose={handleClose}>
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
    </Fragment>
}

export default DeleteHabitConfirmationDialog;