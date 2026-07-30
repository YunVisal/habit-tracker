import { Box } from "@mui/material"
import CustomAppBar from "../app_bar";

const AppLayout = ({ children }) => {

    return <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <CustomAppBar />
        <Box sx={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            {children}
        </Box>
    </Box>
}

export default AppLayout