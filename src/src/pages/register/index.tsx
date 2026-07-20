import { Controller, useForm } from 'react-hook-form';
import { supabase } from "../../utils/supabase";
import { HOME_PATH } from "../../routes/route";
import { Button, Box, Typography, Container, Stack, TextField, Link } from "@mui/material";
import TaskAltIcon from '@mui/icons-material/TaskAlt';

interface RegisterFormField {
    email: string,
    password: string
}

const RegisterPage = () => {

    const { control, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<RegisterFormField>({
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const register = async (formData: RegisterFormField) => {
        const { error } = await supabase.auth.signUp(formData);
        if (error) {
            setError('root.serverError', { message: error.message })
            return;
        }
        window.location.href = HOME_PATH;
    }

    return <Box sx={{ bgcolor: 'primary.light', minHeight: '100vh', display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Container sx={{ bgcolor: 'white', margin: '0 1rem', padding: '2rem', borderRadius: '1rem' }} maxWidth={"sm"}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <TaskAltIcon color="primary" fontSize="large" />
                <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: "bold" }}>HABIT TRACKER</Typography>
            </Box>
            <Box sx={{ margin: "2rem 0" }}>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>Sign up</Typography>
                <Typography>Get start with your routine.</Typography>
            </Box>
            <Box component={"form"} onSubmit={handleSubmit(register)}>
                <Stack spacing={2}>
                    <Controller
                        name="email"
                        control={control}
                        rules={{
                            required: 'Email is required',
                            pattern: {
                                value: /^\S+@\S+$/i,
                                message: 'Invalid email address',
                            },
                        }}
                        render={({ field }) => <TextField
                            {...field}
                            label="Email"
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            fullWidth
                        />}
                    />
                    <Controller
                        name="password"
                        control={control}
                        rules={{
                            required: 'Password is required',
                        }}
                        render={({ field }) => <TextField
                            {...field}
                            type="password"
                            label="Password"
                            error={!!errors.password}
                            helperText={errors.password?.message}
                            fullWidth
                        />}
                    />
                    {errors.root?.serverError && <Typography variant="caption" color="error">{errors.root.serverError.message}</Typography>}
                    <Button type="submit" variant="contained" disabled={isSubmitting}>
                        Register
                    </Button>
                    <Typography align='center' sx={{ fontWeight: 'bold' }}>Already have account? <Link href='/register' sx={{ textDecoration: 'none' }}>Login</Link></Typography>
                </Stack>
            </Box>
        </Container>
    </Box>
}

export default RegisterPage;