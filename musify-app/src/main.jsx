import { createRoot } from "react-dom/client";
import "./index.css";
import React from 'react';
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { PlayerContextProvider } from "./context/PlayerContext.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <PlayerContextProvider>
          <SearchProvider>
            <App />
          </SearchProvider>
        </PlayerContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
