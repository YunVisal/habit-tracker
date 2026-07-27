import { Container, Typography } from "@mui/material";
import EmptyHabitContainer from "./EmptyHabitContainer";

const HomePage = () => {
    return <Container maxWidth="md" sx={{ padding: "3rem 0" }}>
        <Typography variant="h4" component={"h1"} sx={{ fontWeight: 'bold' }}>Your Habits</Typography>
        <Typography variant="subtitle1">0 habits</Typography>
        <EmptyHabitContainer />
    </Container>
}

export default HomePage;
