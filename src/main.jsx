import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { core } from './core.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={core}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
