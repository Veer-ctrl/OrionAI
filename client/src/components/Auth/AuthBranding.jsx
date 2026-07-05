import { Bot } from "lucide-react";

const AuthBranding = () => {
  return (
    <div className="hidden bg-primary text-primary-foreground lg:flex flex-col justify-center p-16">
      <div className="max-w-md">
        <div className="mb-8 flex items-center gap-3">
          <Bot className="h-10 w-10" />

          <h1 className="text-4xl font-bold">
            OrionAI
          </h1>
        </div>

        <h2 className="text-4xl font-bold leading-tight">
          Chat with your documents using AI.
        </h2>

        <p className="mt-6 text-lg opacity-90">
          Upload PDFs, retrieve relevant context using RAG,
          and get accurate answers powered by Gemini.
        </p>

        <div className="mt-10 flex gap-6 text-sm opacity-80">
          <span>Secure</span>
          <span>Fast</span>
          <span>Private</span>
        </div>
      </div>
    </div>
  );
};

export default AuthBranding;