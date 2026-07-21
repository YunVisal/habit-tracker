import { Box } from "@mui/material"
import CustomAppBar from "../app_bar";

const AppLayout = ({ children }) => {

    return <Box sx={{ minHeight: '100vh' }}>
        <CustomAppBar />
        {children}
    </Box>
}

export default AppLayout