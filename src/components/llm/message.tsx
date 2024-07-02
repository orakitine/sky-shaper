import { cn } from "@/lib/utils";
import { Sparkle, UserIcon } from "lucide-react";
import { ReactNode } from "react";

export function UserMessage({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex justify-center items-center shadow-sm border rounded-md w-8 h-8 shrink-0">
        <UserIcon />
      </div>
      <div className="flex-1 pt-1 text-muted-foreground">{children}</div>
    </div>
  );
}

export function BotMessage({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div
        className={cn(
          "flex justify-center items-center bg-background shadow-sm border rounded-md w-8 h-8 select-none shrink-0",
          className
        )}
      >
        <Sparkle />
      </div>
      <div className="flex-1 pt-1 text-muted-foreground">{children}</div>
    </div>
  );
}

export function BotCard({
  children,
  showAvatar = true,
}: {
  children: ReactNode;
  showAvatar?: boolean;
}) {
  return (
    <div className="flex items-start gap-4">
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow-sm bg-primary text-primary-foreground",
          !showAvatar && "invisible"
        )}
      >
        <Sparkle />
      </div>
      <div className="flex-1 pt-1 text-muted-foreground">{children}</div>
    </div>
  );
}

export function AssistantMessage({ children }: { children: ReactNode }) {
  return (
    <div className="flex">
      <div className="flex-1 pt-1 text-muted-foreground">{children}</div>
    </div>
  );
}
