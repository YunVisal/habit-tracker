import { AppBar, Avatar, Box, Divider, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material"
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from "react";
import { useAuth } from "../../hooks/use_auth";
import { supabase } from "../../utils/supabase";
import { LOGIN_PATH } from "../../routes/route";

const CustomAppBar = () => {
    const { user } = useAuth()

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleSignout = async () => {
        supabase.auth.signOut();
        window.location.replace(LOGIN_PATH);
    }

    return <AppBar position="static" sx={{ backgroundColor: 'white' }}>
        <Toolbar>
            <TaskAltIcon color="primary" fontSize="large" />
            <Typography variant="h6" sx={{ ml: 1, color: 'primary.main', fontWeight: "bold", flexGrow: 1 }} >HABIT TRACKER</Typography>
            <Box>
                <Tooltip title="">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar {...stringAvatar(user?.email ?? "U")} />
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: '45px' }}
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    <MenuItem>
                        <Box>
                            <Typography variant="caption">{user?.email}</Typography>
                        </Box>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleSignout}>
                        <ListItemIcon>
                            <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Sign out</ListItemText>
                    </MenuItem>
                </Menu>
            </Box>
        </Toolbar>
    </AppBar>
}

function stringAvatar(name: string) {
    return {
        sx: {
            backgroundColor: 'primary.main'
        },
        children: name[0].toUpperCase(),
    };
}

export default CustomAppBar;