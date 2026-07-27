import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Stack, TextField, Typography } from "@mui/material"
import { Controller, useForm } from 'react-hook-form';

interface HabitFormDialogProps {
    handleClose: () => void;
}

interface HabitFormField {
    name: string;
    description: string;
}

const HabitFormDialog: React.FC<HabitFormDialogProps> = ({ handleClose }) => {

    const { control, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<HabitFormField>({
        defaultValues: {
            name: "",
            description: ""
        }
    })

    const createHabit = (formData: HabitFormField) => {
        console.log(formData);
        handleClose()
    }

    return <Dialog fullWidth open onClose={handleClose}>
        <DialogTitle>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>New habit</Typography>
        </DialogTitle>
        <DialogContent>
            <Box id="habit-form" component={"form"} onSubmit={handleSubmit(createHabit)} sx={{ paddingTop: "1rem" }}>
                <Stack spacing={2}>
                    <Controller
                        name="name"
                        control={control}
                        rules={{ required: "Name is required!" }}
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
                </Stack>
            </Box>
        </DialogContent>
        <DialogActions>
            <Button variant="text" onClick={handleClose}>
                <Typography variant="button">Cancel</Typography>
            </Button>
            <Button variant="contained" type="submit" form="habit-form">
                <Typography variant="button">Create</Typography>
            </Button>
        </DialogActions>
    </Dialog>
}

export default HabitFormDialog;