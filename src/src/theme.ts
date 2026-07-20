import { createTheme } from "@mui/material";

const theme = createTheme({
    palette: {
        primary: {
            main: '#00897B',
            light: '#E0F2F1',
            contrastText: '#fff'
        }
    },
    typography: {
        button: { textTransform: 'none' }, // no ALL CAPS buttons
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    height: 48,        // match outlined TextField
                    fontSize: '1rem'
                },
            },
        },
    }
})

export default theme;