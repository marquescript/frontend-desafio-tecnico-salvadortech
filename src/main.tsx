import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./index.css";
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { VacancyContextProvider } from './contexts/vacancy-context.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <VacancyContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </VacancyContextProvider>
  </StrictMode>,
)