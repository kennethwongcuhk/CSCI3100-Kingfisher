import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TweetsContextProvider } from './context/TweetsContext';
import { AuthContextProvider } from './context/AuthContext';
import { ColorContextProvider } from './context/ColorContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ColorContextProvider>
    <AuthContextProvider>
      <TweetsContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </TweetsContextProvider>
    </AuthContextProvider>
  </ColorContextProvider>

);