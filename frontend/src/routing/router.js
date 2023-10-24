import { createBrowserRouter } from 'react-router-dom';

import Home from '../pages/Home';
import Chat from '../pages/Chat';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Error from '../pages/Error';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <Error />,
    children: [
      {
        path: "/chat",
        element: <Chat />,
      },
    ]
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  }
]);

export default Router;
