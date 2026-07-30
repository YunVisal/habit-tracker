import { useState } from "react";
import { Button, Container, Stack, Typography } from "@mui/material";
import EmptyHabitContainer from "./EmptyHabitContainer";
import HabitProvider from "../../providers/habit_provider";
import { useHabit } from "../../hooks/use_habit";
import HabitList from "./HabitList";
import AddIcon from '@mui/icons-material/Add';
import HabitFormDialog from "./HabitFormDialog";

const HomePage = () => {
    return <HabitProvider>
        <HomePageContent />
    </HabitProvider>
}

const HomePageContent = () => {

    const { habits, loading } = useHabit()

    const [openFormDialog, setOpenFormDialog] = useState(false);

    const handleOpenFormDialog = () => {
        setOpenFormDialog(true);
    }

    const handleCloseFormDialog = () => {
        setOpenFormDialog(false);
    }

    return <Container maxWidth="md" sx={{ padding: "3rem 0", flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        <Stack spacing={3} sx={{ flex: 1, minHeight: 0 }}>
            <div className="flex justify-between items-center">
                <div>
                    <Typography variant="h4" component={"h1"} sx={{ fontWeight: 'bold' }}>Your Habits</Typography>
                    <Typography variant="subtitle1">{habits?.length} habits</Typography>
                </div>
                <Button variant="contained" sx={{ width: 'fit-content' }} onClick={handleOpenFormDialog}>
                    <AddIcon sx={{ mr: 2 }} />
                    <Typography variant="button" sx={{ textTransform: 'uppercase' }}>New Habit</Typography>
                </Button>
            </div>
            <HabitList />
        </Stack>
        {openFormDialog && <HabitFormDialog handleClose={handleCloseFormDialog} />}
    </Container>
}

export default HomePage;
