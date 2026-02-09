import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Admin from './Admin';

function Root() {
  const isAdmin = typeof window !== 'undefined' && window.location.pathname === '/admin';
  return isAdmin ? <Admin /> : <App />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
