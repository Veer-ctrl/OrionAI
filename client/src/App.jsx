import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import ChatPage from "./pages/ChatPage";
import ConversationsPage from "./pages/ConversationsPage";
import LandingPage from "./pages/LandingPage";
// import TestChat from "./pages/TestChat";
// import TestDocuments from "./pages/TestDocuments";
// import DocumentsPage from "./pages/DocumentsPage";
// import ConversationsPage from "./pages/ConversationsPage";
// import SettingsPage from "./pages/SettingsPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/" element={<LandingPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/conversations" element={<ConversationsPage />} />
          {/* <Route path="/chat" element={<ChatPage />} /> */}
          {/* <Route path="/documents" element={<DocumentsPage />} /> */}
          <Route path="/chat/:conversationId" element={<ChatPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
