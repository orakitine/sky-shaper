import { cn } from "@/lib/utils";
import { Sparkle, UserIcon } from "lucide-react";
import { ReactNode } from "react";

export function UserMessage({ children }: { children: ReactNode }) {
  return (
    <div className="group  relative flex items-start md:-ml-12">
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow-sm bg-background">
        <UserIcon />
      </div>
      <div className=" ml-4 flex-1 space-y-2 overflow-hidden px1">
        {children}
      </div>
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
    <div className="group relative flex items-start md:-mr-12">
      <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow-sm bg-background">
        <Sparkle />
      </div>
      <div className={cn("ml-4 flex-1 space-y-2 overflow-hidden px1")}>
        {children}
      </div>
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
    <div className="group relative flex items-start md:-mr-12">
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border shadow-sm bg-primary text-primary-foreground",
          !showAvatar && "invisible"
        )}
      >
        <Sparkle />
      </div>
      <div className="ml-4 flex-1 px1">{children}</div>
    </div>
  );
}

export function AssistantMessage({ children }: { children: ReactNode }) {
  return (
    <div className="mt-2 flex items-center justify-center gap-2 text-xs text-green-500">
      <div className="max-w-[600px] flex-initial p-2">{children}</div>
    </div>
  );
}
