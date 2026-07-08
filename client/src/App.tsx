import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { useSteamDataState } from "./context/SteamDataContext";

function App() {
  const { user } = useSteamDataState();

  if (user.steamid === "")
    return <Login />
  else return <Home />
}

export default App;
