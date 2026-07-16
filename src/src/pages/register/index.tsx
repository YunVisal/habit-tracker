import type { SubmitEvent } from "react";
import { supabase } from "../../utils/supabase";
import { useNavigate } from "react-router";
import { LOGIN_PATH } from "../../routes/route";

const RegisterPage = () => {

    const navigate = useNavigate();

    const register = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const formValue = Object.fromEntries(formData);
        console.log(formValue)

        const { data, error } = await supabase.auth.signUp({
            email: formValue["email"] as string,
            password: formValue["password"] as string
        });
        if (error) {
            console.error(error);
            return;
        }
        console.log(data)
        navigate(LOGIN_PATH);
    }

    return <form onSubmit={register}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
        <input type="submit" name="Login" />
    </form>
}

export default RegisterPage;