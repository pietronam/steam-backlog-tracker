import { useSteamData } from "./context/SteamDataContext";
import { HomePage } from "./pages/HomePage";
import { Login } from "./components/Login";

function App() {
  const { state } = useSteamData();

  if (state.user.steamid === "")
    return <Login />
  else return <HomePage />
}

export default App;
