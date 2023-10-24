import { RouterProvider } from "react-router-dom";
import Router from "./routing/router";

export default function App() {

  return (
    <RouterProvider router={Router}/>
  );
}