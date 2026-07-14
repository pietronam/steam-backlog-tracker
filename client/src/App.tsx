import { Home } from "./components/Home";
import { Landing } from "./components/Landing";
import { useSteamDataState } from "./context/SteamDataContext";

function App() {
  const { user } = useSteamDataState();

  if (user.steamid === "")
    return <Landing />
  else return <Home />
}

export default App;
