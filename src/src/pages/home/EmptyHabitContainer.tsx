import { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import AddIcon from '@mui/icons-material/Add';
import HabitFormDialog from "./HabitFormDialog";

const EmptyHabitContainer = () => {
    const [openFormDialog, setOpenFormDialog] = useState(false);

    const handleOpenFormDialog = () => {
        setOpenFormDialog(true);
    }

    const handleCloseFormDialog = () => {
        setOpenFormDialog(false);
    }

    return <Box sx={{ backgroundColor: 'white', padding: '72px 24px', border: '1px dashed #00000024', textAlign: 'center' }}>
        <TaskAltIcon sx={{ color: '#00000024', fontSize: '72px', margin: '1rem 0' }} />
        <Stack spacing={2}>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>No habits yet</Typography>
            <Box>
                <Typography variant="subtitle1">Start building your routine by creating your first habit.<br />Give it a name and an optional description.</Typography>
            </Box>
            <Box sx={{ margin: 'auto' }}>
                <Button variant="contained" sx={{ width: 'fit-content' }} onClick={handleOpenFormDialog}>
                    <AddIcon sx={{ mr: 2 }} />
                    <Typography variant="button" sx={{ textTransform: 'uppercase' }}>Create your first habit</Typography>
                </Button>
            </Box>
        </Stack>
        {openFormDialog && <HabitFormDialog handleClose={handleCloseFormDialog} />}
    </Box>
}

export default EmptyHabitContainer;