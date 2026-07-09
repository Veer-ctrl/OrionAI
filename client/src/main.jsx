import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/AuthContext";
import { DocumentProvider } from "./context/DocumentContext";
import { ChatProvider } from "./context/ChatContext";
import { Toaster } from "sonner";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DocumentProvider>
          <ChatProvider>
             <Toaster
        position="top-right"
        richColors
        closeButton
        expand
      />
      <App />
          </ChatProvider>
      </DocumentProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);