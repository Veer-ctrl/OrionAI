import { Bot } from "lucide-react";

const Navbar = () => {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <Bot className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold">OrionAI</h1>
        </div>

        <div>
          {/* User menu will be added later */}
        </div>
      </div>
    </header>
  );
};

export default Navbar;