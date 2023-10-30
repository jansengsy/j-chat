import { useContext } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

export default function ProtectedRoute({children}) {

  // eslint-disable-next-line no-unused-vars
  const [searchParams, nosetSearchParams] = useSearchParams();
  const { token } = useContext(AuthContext);

  // We create a params object based on the current searchParams and pass that
  // to the login page so I can use it to redirect the user back to the exact url
  // they came from
  let params = {};
  for (const [key, value] of searchParams.entries()) {
    params[key] = value;
  }

  if (!token) {
    const path = window.location.pathname;

    return <Navigate to={'/login'} state={{ from: path, params }}/>
  } else {
    return children;
  }
}