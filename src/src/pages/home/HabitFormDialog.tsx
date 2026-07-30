import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from "@mui/material"
import { Controller, useForm } from 'react-hook-form';
import { supabase } from "../../utils/supabase";
import { useAuth } from "../../hooks/use_auth";
import { useHabit } from "../../hooks/use_habit";
import type { Habit } from "../../contexts/habit_context/type";
import type { PostgrestError } from "@supabase/supabase-js";

interface HabitFormDialogProps {
    habit?: Habit | undefined,
    handleClose: () => void;
}

interface HabitFormField {
    name: string;
    description: string;
}

const HabitFormDialog: React.FC<HabitFormDialogProps> = ({ habit, handleClose }) => {

    const { control, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<HabitFormField>({
        defaultValues: {
            name: habit?.name ?? "",
            description: habit?.description ?? ""
        }
    })
    const { user, loading } = useAuth();
    const { fetchHabits } = useHabit();

    const submitForm = async (formData: HabitFormField) => {
        if (user == null) {
            setError('root.serverError', { message: "Please login first before create the habit!" });
            return;
        }

        let databaseError: PostgrestError | null = null;
        if (!habit) {
            const { error } = await supabase.from('habits').insert({ ...formData, user_id: user.id });
            databaseError = error;
        }
        else {
            const { error } = await supabase.from('habits').update({ ...habit, ...formData }).eq('id', habit.id);
            databaseError = error;
        }

        if (databaseError) {
            setError('root.serverError', { message: "Something went wrong at our end!" });
            return;
        }
        await fetchHabits();
        handleClose()
    }

    return <Dialog fullWidth open onClose={handleClose}>
        <DialogTitle variant="h5" sx={{ fontWeight: 'bold' }}>
            {habit ? "Edit habit" : "New habit"}
        </DialogTitle>
        <DialogContent>
            <Box id="habit-form" component={"form"} onSubmit={handleSubmit(submitForm)} sx={{ paddingTop: "1rem" }}>
                <Stack spacing={2}>
                    <Controller
                        name="name"
                        control={control}
                        rules={{
                            validate: {
                                required: (value) => {
                                    if (!value) return "Name is required!"
                                    if (value.trim().length == 0) return "Name is required!"
                                }
                            }
                        }}
                        render={({ field }) =>
                            <TextField
                                {...field}
                                label="Name"
                                placeholder="e.g. Morning meditation"
                                error={!!errors.name}
                                helperText={errors.name?.message}
                                fullWidth
                                focused />
                        }
                    />
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) =>
                            <TextField
                                {...field}
                                label="Description"
                                multiline
                                rows={4}
                                placeholder="What does this habit involve?"
                                fullWidth
                                focused />
                        }
                    />
                    {errors.root?.serverError && <Typography variant="caption" color="error">{errors.root.serverError.message}</Typography>}
                </Stack>
            </Box>
        </DialogContent>
        <DialogActions>
            <Button variant="text" onClick={handleClose}>
                <Typography variant="button">Cancel</Typography>
            </Button>
            <Button variant="contained" type="submit" form="habit-form">
                <Typography variant="button">{habit ? "Save" : "Create"}</Typography>
            </Button>
        </DialogActions>
    </Dialog>
}

export default HabitFormDialog;