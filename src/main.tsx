import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import { HeadProvider } from 'react-head';

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <HeadProvider>
        <App />
      </HeadProvider>
    </StrictMode>
  </BrowserRouter>
)
