import React from 'react';
import ReactDOM from 'react-dom/client'
//import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
// const rootElement = document.getElementById('root');

// if (rootElement.hasChildNodes()) {
//   // Use hydrateRoot for server-side rendering
//   hydrateRoot(rootElement, <App />);
// } else {
//   // Use createRoot for client-side rendering
//   const root = createRoot(rootElement);
//   root.render(<App />);
// }
