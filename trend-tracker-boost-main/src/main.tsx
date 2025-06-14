
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'

// createRoot(document.getElementById("root")).render(<App />);

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // App.jsx will be auto-resolved
import './index.css';

const root = document.getElementById('root');

if (root) {
  ReactDOM.createRoot(root).render(
      <App />
  );
}
