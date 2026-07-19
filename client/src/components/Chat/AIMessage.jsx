import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Copy, Check } from "lucide-react";
import SourceViewer from "./SourceViewer";
import Logo from "@/assets/Logo.svg";

const CodeBlock = ({ children, className }) => {
  const [copied, setCopied] = useState(false);
  const code = String(children).replace(/\n$/, "");
  const language = className?.replace("language-", "") || "code";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group/code relative my-2.5">
      <div className="flex items-center justify-between rounded-t-xl border border-b-0 border-border bg-muted px-3 py-1.5">
        <span className="text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
          {language}
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] text-muted-foreground transition-colors duration-150 hover:bg-card hover:text-foreground"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check className="h-3 w-3 text-accent" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-3 w-3" />
              Copy
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto rounded-b-xl rounded-t-none border border-border bg-foreground/[0.04] p-0">
        <code className="block p-3.5 font-mono text-[12px] leading-5 text-foreground/80">
          {children}
        </code>
      </pre>
    </div>
  );
};

const AIMessage = ({ message }) => {
  return (
    <div className="flex justify-start gap-3 py-2">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-transparent text-[10px] font-semibold text-primary">
        <img src={Logo} alt="Orion AI Logo" className="h-5 w-auto" /> 
      </div>

      <div className="min-w-0 max-w-[88%] flex-1 sm:max-w-[80%]">
        <span className="mb-1.5 block text-[11px] font-medium text-muted-foreground">
          Orion AI
        </span>

        <div className="glass-card rounded-2xl rounded-tl-md px-4 py-3 shadow-glow">
          <div className="prose-chat">
            <ReactMarkdown
              components={{
                code({ className, children, ...props }) {
                  const isBlock = className?.startsWith("language-");
                  if (isBlock) {
                    return (
                      <CodeBlock className={className}>{children}</CodeBlock>
                    );
                  }
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
                pre({ children }) {
                  return <>{children}</>;
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        </div>

        {message.sources?.length > 0 && (
          <SourceViewer sources={message.sources} />
        )}
      </div>
    </div>
  );
};

export default AIMessage;
