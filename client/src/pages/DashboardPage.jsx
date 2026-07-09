import { useEffect, useState } from "react";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsCards from "../components/dashboard/StatCards";
import RecentDocuments from "../components/dashboard/RecentDocuments";
import QuickActions from "../components/dashboard/QuickActions";

import { useDocuments } from "../hooks/useDocuments";
import conversationService from "../services/conversationService";

const DashboardPage = () => {
  const { documents, loading, error, uploadDocument, deleteDocument } =
    useDocuments();
  const [conversationCount, setConversationCount] = useState(0);
  const [conversationLoading, setConversationLoading] = useState(true);

  useEffect(() => {
    const loadConversations = async () => {
      setConversationLoading(true);

      try {
        const response = await conversationService.getConversations();
        setConversationCount(response.conversations?.length || 0);
      } catch (err) {
        console.error("Failed to load conversations", err);
        setConversationCount(0);
      } finally {
        setConversationLoading(false);
      }
    };

    loadConversations();
  }, []);

  if (loading || conversationLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <>
      <DashboardHeader />

      <StatsCards
        documents={documents}
        totalConversations={conversationCount}
      />

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
       <div className="mt-8">
  <RecentDocuments
    documents={documents}
    onDelete={deleteDocument}
  />
</div>
      </div>
    </>
  );
};

export default DashboardPage;
