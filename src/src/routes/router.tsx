import { BrowserRouter, Route, Routes } from "react-router"
import { HOME_PATH, LOGIN_PATH, REGISTER_PATH } from "./route"
import HomePage from "../pages/home"
import LoginPage from "../pages/login"
import RegisterPage from "../pages/register"
import ProtectedRoute from "./protected-route"

const AppRouter = () => {
    return <BrowserRouter>
        <Routes>
            <Route element={<ProtectedRoute />}>
                <Route path={HOME_PATH} element={<HomePage />} />
            </Route>
            <Route path={LOGIN_PATH} element={<LoginPage />} />
            <Route path={REGISTER_PATH} element={<RegisterPage />} />
        </Routes>
    </BrowserRouter>
}

export default AppRouter;