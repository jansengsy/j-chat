import React from 'react';
import ReactDOM from 'react-dom/client';

import './styles/index.css';

import App from './App';

import { AuthContextProvider } from './context/authContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
);
