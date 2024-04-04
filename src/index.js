import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ui/ErrorFallback';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback} 
      // on ErrorFallback component we can access to on reset Prop in the ErrorFallback props name is "resetErrorBoundary"
      onReset={()=>window.location.replace("/Hotel-Booketing")}
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);


