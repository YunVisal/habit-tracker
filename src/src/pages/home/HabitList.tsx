import { useState } from "react";
import { Avatar, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText, Menu, MenuItem, Paper, Typography } from "@mui/material";
import { useHabit } from "../../hooks/use_habit"
import { Fragment } from "react/jsx-runtime";
import { stringToColor } from "../../utils/color";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type { Habit } from "../../contexts/habit_context/type";
import HabitFormDialog from "./HabitFormDialog";
import DeleteHabitConfirmationDialog from "./DeleteHabitConfirmationDialog";
import EmptyHabitContainer from "./EmptyHabitContainer";

const HabitList = () => {

    const { habits } = useHabit();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [menuHabit, setMenuHabit] = useState<Habit | null>(null);
    const open = Boolean(anchorEl);

    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>, habit: Habit) => {
        setAnchorEl(event.currentTarget);
        setMenuHabit(habit);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setMenuHabit(null);
    };

    const editHabit = (habit: Habit | null) => {
        if (!habit) return;
        setSelectedHabit(habit);
        setOpenEditDialog(true);
    }

    const closeEditDialog = () => {
        setSelectedHabit(null);
        setOpenEditDialog(false);
    }

    const deleteHabit = (habit: Habit | null) => {
        if (!habit) return;
        setSelectedHabit(habit);
        setOpenDeleteDialog(true);
    }

    const closeDeleteDialog = () => {
        setSelectedHabit(null);
        setOpenDeleteDialog(false);
    }

    return <Fragment>
        {habits?.length == 0 ? <EmptyHabitContainer /> : <Paper sx={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
            <List>
                {habits?.map(habit => <Fragment key={habit.id}>
                    <ListItem
                        key={habit.id}
                        alignItems="flex-start"
                        secondaryAction={
                            <IconButton onClick={(event) => handleClick(event, habit)}>
                                <MoreVertIcon />
                            </IconButton>}
                    >
                        <ListItemAvatar>
                            <Avatar sx={{ backgroundColor: stringToColor(habit.name) }}>{habit.name[0]}</Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={<Typography variant="h6"><b>{habit.name}</b></Typography>}
                            secondary={<Typography variant="body2" sx={{ color: "#00000094" }}>{habit.description || <i className="text-[#00000057]">No Description</i>}</Typography>}
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </Fragment>)}
            </List>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => editHabit(menuHabit)}>
                    <ListItemIcon>
                        <EditIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Edit</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => deleteHabit(menuHabit)}>
                    <ListItemIcon>
                        <DeleteIcon fontSize="small" color="error" />
                    </ListItemIcon>
                    <ListItemText sx={{ color: 'error.main' }}>Delete</ListItemText>
                </MenuItem>
            </Menu>
        </Paper>}
        {openEditDialog && selectedHabit && <HabitFormDialog habit={selectedHabit} handleClose={closeEditDialog} />}
        {openDeleteDialog && selectedHabit && <DeleteHabitConfirmationDialog habit={selectedHabit} handleClose={closeDeleteDialog} />}
    </Fragment>
}

export default HabitList;