import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageSquare, FileText, Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import conversationService from "@/services/conversationService";

const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const diffMs = Date.now() - date.getTime();
  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(diffMs / 3600000);
  const days = Math.floor(diffMs / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d`;
  return date.toLocaleDateString();
};

const SkeletonRow = () => (
  <div className="flex items-center gap-3 border-b border-border px-3 py-2.5">
    <Skeleton className="h-3.5 w-3.5 bg-foreground/10" />
    <div className="flex-1 space-y-1.5">
      <Skeleton className="h-3.5 w-1/3 bg-foreground/10" />
      <Skeleton className="h-3 w-2/3 bg-foreground/10" />
    </div>
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
    <MessageSquare className="h-5 w-5 text-muted-foreground" />
    <h2 className="mt-3 text-sm font-medium text-foreground">No conversations</h2>
    <p className="mt-1 text-xs text-muted-foreground">
      Open a document from the dashboard to start chatting.
    </p>
  </div>
);

const ConversationRow = ({ conversation, onClick }) => {
  const lastMessage =
    conversation.messages?.length > 0
      ? conversation.messages[conversation.messages.length - 1].content
      : "No messages yet";

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className="group flex cursor-pointer items-start gap-2.5 border-b border-border px-3 py-2.5 transition-colors duration-150 last:border-b-0 hover:bg-secondary/50"
    >
      <FileText className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent/70" />

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate text-[13px] font-medium text-foreground group-hover:text-primary">
            {conversation.document?.filename}
          </h3>
          <span className="shrink-0 text-[10px] text-muted-foreground">
            {formatRelativeTime(conversation.updatedAt)}
          </span>
        </div>

        <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
          {lastMessage}
        </p>

        <span className="mt-1 inline-flex items-center gap-1 text-[10px] text-muted-foreground">
          <MessageSquare className="h-2.5 w-2.5" />
          {conversation.messages?.length || 0}
        </span>
      </div>
    </div>
  );
};

const ConversationsPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await conversationService.getConversations();
        setConversations(response.conversations);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  const filtered = conversations.filter((c) =>
    c.document?.filename?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-3xl mt-10">
      <header className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-foreground">
            Conversations
          </h1>
          <p className="text-xs text-muted-foreground">
            {conversations.length > 0
              ? `${conversations.length} total`
              : "Your chat history"}
          </p>
        </div>

        {conversations.length > 0 && (
          <div className="relative w-full max-w-[180px]">
            <Search className="absolute top-1/2 left-2.5 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Filter..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="glass-input h-7 pl-7 text-xs focus-visible:ring-primary/30"
            />
          </div>
        )}
      </header>

      <div className="glass-card overflow-hidden rounded-xl shadow-glow">
        {loading ? (
          <>
            <SkeletonRow />
            <SkeletonRow />
            <SkeletonRow />
          </>
        ) : filtered.length === 0 ? (
          <EmptyState />
        ) : (
          filtered.map((conversation) => (
            <ConversationRow
              key={conversation._id}
              conversation={conversation}
              onClick={() => navigate(`/chat/${conversation._id}`)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ConversationsPage;
