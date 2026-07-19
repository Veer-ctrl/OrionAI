import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const PasswordInput = ({ className, style, ...props }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative">
      <Input
        type={visible ? "text" : "password"}
        className={cn(
          "pr-11 placeholder:text-[rgba(255,248,236,0.25)] focus-visible:ring-0 focus-visible:border-[rgba(255,138,31,0.5)]",
          className
        )}
        style={style}
        {...props}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        tabIndex={-1}
        aria-label={visible ? "Hide password" : "Show password"}
        className="absolute top-1/2 right-3.5 -translate-y-1/2 flex items-center justify-center transition-colors duration-150"
        style={{ color: "rgba(255,248,236,0.25)" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,248,236,0.7)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,248,236,0.25)")}
      >
        {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
};

export default PasswordInput;
