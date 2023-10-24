import { useContext, useEffect } from "react";

// Context
import { AuthContext } from "./context/authContext";

// Hooks
import useAuth from "./hooks/useAuth";

// Routing
import { RouterProvider } from "react-router-dom";
import Router from "./routing/router";

export default function App() {

  const {token} = useContext(AuthContext);

  return (
    <RouterProvider router={Router}/>
  );
}