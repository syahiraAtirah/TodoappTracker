import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import { TodosContextProvider } from './context/TodosContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TodosContextProvider>
      <App />
    </TodosContextProvider>
  </React.StrictMode>
);