import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { Button } from "./ui/button";

export function FeedBack() {
  return (
    <div className="flex items-center gap-2 py-2">
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-transparent w-4 h-4 text-stone-400 hover:text-stone-900"
      >
        <ThumbsUpIcon className="w-4 h-4" />
        <span className="sr-only">Upvote</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="hover:bg-transparent w-4 h-4 text-stone-400 hover:text-stone-900"
      >
        <ThumbsDownIcon className="w-4 h-4" />
        <span className="sr-only">Downvote</span>
      </Button>
    </div>
  );
}
