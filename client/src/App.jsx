import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ChatPage from "./pages/ChatPage";
// import DocumentsPage from "./pages/DocumentsPage";
// import ConversationsPage from "./pages/ConversationsPage";
// import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <Routes>
  <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<RegisterPage />} />

  <Route element={<ProtectedRoute />}>
    <Route element={<Layout />}>
      <Route path="/dashboard" element={<DashboardPage />} />
      {/* <Route path="/chat" element={<ChatPage />} /> */}
      {/* <Route path="/documents" element={<DocumentsPage />} /> */}
    </Route>
  </Route>
</Routes>
  );
}

export default App;