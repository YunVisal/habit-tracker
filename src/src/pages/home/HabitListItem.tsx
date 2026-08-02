import { Checkbox, Chip, Grid, IconButton, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from "@mui/material"
import type { Habit } from "../../contexts/habit_context/type"
import type React from "react"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { convertToYYYYMMDD } from "../../utils/date";
import { supabase } from "../../utils/supabase";
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import { useHabit } from "../../hooks/use_habit";
import { useSnackbar } from "../../hooks/use_snackbar";
import { computeStreak, isCompleteToday } from "../../utils/streak";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';

interface HabitListItemProps {
    habit: Habit,
    handleOpenMenu: (event: React.MouseEvent<HTMLElement>, habit: Habit) => void;
}

const HabitListItem: React.FC<HabitListItemProps> = ({ habit, handleOpenMenu }) => {

    const { fetchHabits } = useHabit();
    const { notify } = useSnackbar();

    const handleCheckin = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        if (isChecked) {
            const now = new Date()
            const data = {
                habit_id: habit.id,
                day: convertToYYYYMMDD(now)
            }

            const { error } = await supabase.from('check_ins').insert(data)
            if (error) {
                notify(error.message, "error");
                return;
            }
            notify("You have checked in for today.", "success");
        }
        else {
            const { error } = await supabase.from('check_ins').delete().eq('id', habit.check_ins[0].id);
            if (error) {
                notify(error.message, "error");
                return;
            }
            notify("You have removed the check in for today.", "success");
        }
        await fetchHabits();
    }

    const renderStreakLabel = () => {
        const totalStreak = computeStreak(habit, new Date())
        if (totalStreak >= 90) {
            return "You are on fire!"
        }
        return `Streak: ${totalStreak}`
    }

    return <ListItem
        key={habit.id}
        alignItems="flex-start"
        secondaryAction={
            <IconButton onClick={(event) => handleOpenMenu(event, habit)}>
                <MoreVertIcon />
            </IconButton>}
    >
        <ListItemAvatar>
            <Checkbox
                icon={<CircleOutlinedIcon fontSize="large" />}
                checkedIcon={<TaskAltOutlinedIcon fontSize="large" />}
                checked={isCompleteToday(habit)}
                onChange={handleCheckin}
            />
        </ListItemAvatar>
        <ListItemText
            primary={
                <Grid container spacing={1}>
                    <Grid>
                        <Typography variant="h6"><b>{habit.name}</b></Typography>
                    </Grid>
                    {isCompleteToday(habit) && <Grid size="grow">
                        <Chip color="primary" label="Done Today" />
                    </Grid>}
                </Grid>
            }
            secondary={
                <Stack spacing={1}>
                    <Typography variant="body2" sx={{ color: "#00000094" }}>{habit.description || <i className="text-[#00000057]">No Description</i>}</Typography>
                    <Stack direction={"row"} spacing={1} sx={{ alignItems: 'center' }}>
                        <LocalFireDepartmentIcon sx={{ color: "#EF6C00" }} />
                        <Typography variant="body2" sx={{ color: "#EF6C00", fontWeight: 'bold' }}>{renderStreakLabel()}</Typography>
                    </Stack>
                </Stack>
            }
        />
    </ListItem>
}

export default HabitListItem;