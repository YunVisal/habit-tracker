import { supabase } from "../../utils/supabase";

const HomePage = () => {
    const signOut = async () => {
        await supabase.auth.signOut();
    }

    return <div>
        <p>Home</p>
        <button onClick={signOut}>Sign Out</button>
    </div>
}

export default HomePage;
