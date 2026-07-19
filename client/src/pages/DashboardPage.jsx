import { useEffect, useState } from "react";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatsCards from "../components/dashboard/StatCards";
import RecentDocuments from "../components/dashboard/RecentDocuments";
import LoadingSpinner from "@/components/Common/LoadingSpinner";

import { useDocuments } from "../hooks/useDocuments";
import conversationService from "../services/conversationService";

const DashboardPage = () => {
  const { documents, loading, error, deleteDocument } = useDocuments();
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
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <LoadingSpinner message="Loading..." size="sm" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="glass-card rounded-xl px-4 py-3 text-center">
          <p className="text-xs font-medium text-destructive">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-5xl mt-10">
      <DashboardHeader />
      <StatsCards documents={documents} totalConversations={conversationCount} />
      <RecentDocuments documents={documents} onDelete={deleteDocument} />
    </div>
  );
};

export default DashboardPage;
