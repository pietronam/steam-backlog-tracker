import { useSteamData } from "./context/SteamDataContext";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";

function App() {
  const { state } = useSteamData();

  if (state.user.steamid === 0)
    return <LoginPage/>
  return <HomePage/>
}

export default App;
