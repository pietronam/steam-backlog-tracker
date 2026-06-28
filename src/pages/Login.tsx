import { Navigate } from "react-router-dom";
import { useSteamData } from "../context/SteamDataContext";

export const Login = () => {
  const { state } = useSteamData();

  if (state.steamid !== 0) {
    return <Navigate to="/" replace />;
  }

  return <div>Login page</div>;
}