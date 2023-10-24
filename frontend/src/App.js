import { useContext } from "react";
import { AuthContext } from "./context/authContext";

export default function App() {

  const {token} = useContext(AuthContext);

  return (
    <h1>Hello, {token}</h1>
  );
}