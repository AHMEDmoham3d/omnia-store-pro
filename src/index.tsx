import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
console.log("BUILD VERSION 5");
const root = ReactDOM.createRoot(
  document.getElementById('root')! // <-- استخدم "!" بدل "as HTMLElement"
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);