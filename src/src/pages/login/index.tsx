import { useState } from "react";
import type { SubmitEvent } from "react";
import { supabase } from "../../utils/supabase";
import { useNavigate } from "react-router";
import { HOME_PATH } from "../../routes/route";

const LoginPage = () => {

    const navigate = useNavigate();

    const [errorMessage, setErrorMessage] = useState("");

    const login = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage("");
        const formData = new FormData(e.currentTarget);
        const formValue = Object.fromEntries(formData);
        console.log(formValue);

        const { data, error } = await supabase.auth.signInWithPassword({
            email: formValue["email"] as string,
            password: formValue["password"] as string
        });
        if (error) {
            setErrorMessage(error.message);
            return;
        }
        console.log(data)
        navigate(HOME_PATH);
    }

    return <form onSubmit={login}>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />
        <label htmlFor="password">Password</label>
        <input type="password" id="password" name="password" />
        <input type="submit" name="Login" />
        <p>{errorMessage}</p>
    </form>
}

export default LoginPage;