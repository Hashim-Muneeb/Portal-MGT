import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import '@fortawesome/fontawesome-free/css/all.min.css';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <App />
  
  </Router>
);

reportWebVitals();
