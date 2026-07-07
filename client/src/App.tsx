import { Login } from "./components/Login";
import { useSteamDataState } from "./context/SteamDataContext";
import { HomePage } from "./pages/HomePage";

function App() {
  const { user } = useSteamDataState();

  if (user.steamid === "")
    return <Login />
  else return <HomePage />
}

export default App;
