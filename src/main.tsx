import React from 'react';
import { createRoot } from 'react-dom/client';
import { SWRConfig } from 'swr';
import App from './App';
import './index.css';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <SWRConfig
      value={{
        errorRetryCount: 3,
        errorRetryInterval: 1000,
        loadingTimeout: 5000,
        onError: (error) => {
          console.error('SWR Error:', error);
        },
      }}
    >
      <App />
    </SWRConfig>
  </React.StrictMode>
);