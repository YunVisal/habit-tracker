import AuthProvider from "./contexts/auth-provider"
import AppRouter from "./routes/router"

const App = () => {
  return <AuthProvider>
    <AppRouter />
  </AuthProvider>
}

export default App;