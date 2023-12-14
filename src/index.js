import { createRoot } from 'react-dom/client';

import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from 'react-cookie';
import { StoreContext } from "./store/context";
import { I18nProvider } from "./i18n/context";

import App from './app';
import Store from "./store";

const store = new Store();

const root = createRoot(document.getElementById('root'));

// Первый рендер приложения
root.render(
  <StoreContext.Provider value={store}>
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
      <I18nProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </I18nProvider>
    </CookiesProvider>
  </StoreContext.Provider>
);
