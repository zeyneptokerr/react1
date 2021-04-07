import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {ActivityProvider} from "./context";


ReactDOM.render(
  <React.StrictMode>
    <ActivityProvider>
    <App />
    </ActivityProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
reportWebVitals();
