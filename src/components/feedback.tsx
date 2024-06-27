import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { Button } from "./ui/button";

export function FeedBack() {
  return (
    <div className="inline-flex items-center gap-0.5 p-0.5">
      <Button
        variant="outline"
        size="icon"
        className="hover:bg-transparent rounded-md w-5 h-5 text-muted-foreground hover:text-secondary"
      >
        <ThumbsUpIcon className="w-3 h-3" />
        <span className="sr-only">Upvote</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="hover:bg-transparent rounded-md w-5 h-5 text-muted-foreground hover:text-secondary"
      >
        <ThumbsDownIcon className="w-3 h-3" />
        <span className="sr-only">Downvote</span>
      </Button>
    </div>
  );
}
