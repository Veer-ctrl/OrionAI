import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MessageSquare,
  FileText,
  Search,
} from "lucide-react";

import conversationService from "@/services/conversationService";

const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const diffMs = Date.now() - date.getTime();

  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(diffMs / 3600000);
  const days = Math.floor(diffMs / 86400000);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;

  return date.toLocaleDateString();
};

const SkeletonCard = () => (
  <div className="animate-pulse rounded-xl border p-4">
    <div className="flex gap-3">
      <div className="h-10 w-10 rounded-lg bg-muted" />

      <div className="flex-1 space-y-2">
        <div className="h-4 w-1/3 rounded bg-muted" />
        <div className="h-3 w-2/3 rounded bg-muted" />
      </div>
    </div>
  </div>
);

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-16">
    <MessageSquare className="h-10 w-10 text-muted-foreground" />

    <h2 className="mt-4 text-lg font-semibold">
      No conversations yet
    </h2>

    <p className="mt-2 text-sm text-muted-foreground">
      Start chatting with one of your documents.
    </p>
  </div>
);

const ConversationCard = ({
  conversation,
  onClick,
}) => {
  const lastMessage =
    conversation.messages?.length > 0
      ? conversation.messages[
          conversation.messages.length - 1
        ].content
      : "No messages yet";

  return (
    <div
      onClick={onClick}
      className="cursor-pointer rounded-xl border bg-background p-4 transition-all hover:border-primary hover:shadow-sm"
    >
      <div className="flex gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <FileText className="h-5 w-5 text-primary" />
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">
              {conversation.document?.filename}
            </h3>

            <span className="text-xs text-muted-foreground">
              {formatRelativeTime(
                conversation.updatedAt
              )}
            </span>
          </div>

          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
            {lastMessage}
          </p>

          <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
            <MessageSquare className="h-3 w-3" />

            {conversation.messages?.length || 0} messages
          </div>
        </div>
      </div>
    </div>
  );
};

const ConversationsPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [conversations, setConversations] =
    useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response =
          await conversationService.getConversations();

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
    c.document?.filename
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="mx-auto max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold">
          Conversations
        </h1>

        <p className="mt-1 text-muted-foreground">
          Continue where you left off.
        </p>
      </div>

      {conversations.length > 0 && (
        <div className="relative mt-6">
          <Search className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />

          <input
            type="text"
            placeholder="Search conversations..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-xl border bg-background py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      )}

      <div className="mt-6 space-y-3">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : filtered.length === 0 ? (
          <EmptyState />
        ) : (
          filtered.map((conversation) => (
            <ConversationCard
              key={conversation._id}
              conversation={conversation}
              onClick={() =>
                navigate(
                  `/chat/${conversation._id}`
                )
              }
            />
          ))
        )}
      </div>
    </div>
  );
};
export default ConversationsPage;