import { createBrowserRouter } from 'react-router-dom';

import Home from '../pages/Home';
import Chat from '../pages/Chat';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Error from '../pages/Error';
import ProtectedRoute from './routes/ProtectedRoute';
import Verify from '../pages/Verify';
import ForgottenUsername from '../pages/ForgottenUsername';
import ForgottenPassword from '../pages/ForgottenPassword';
import ResetPassword from '../pages/ResetPassword';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute><Home /></ProtectedRoute>,
    errorElement: <Error />,
    children: [
      {
        path: "/",
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
  },
  {
    path: '/forgotten-username',
    element: <ForgottenUsername />
  },
  {
    path: '/forgotten-password',
    element: <ForgottenPassword />
  },
  {
    path: '/reset-password',
    element: <ResetPassword />
  },
  {
    path: '/verify',
    element: <ProtectedRoute><Verify /></ProtectedRoute>
  }
]);

export default Router;
