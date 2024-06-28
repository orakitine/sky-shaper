import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";

export default function Component() {
  return (
    <div className="grid md:grid-cols-[260px_1fr] w-full min-h-screen">
      <div className="md:flex flex-col gap-2 hidden bg-background text-foreground">
        <div className="flex-1 bg-muted overflow-auto" />
      </div>
      <div className="flex flex-col">
        <header className="top-0 sticky bg-background shadow-sm w-full">
          <div className="flex justify-between items-center mx-auto px-4 py-3 container">
            <div className="flex items-center gap-2">
              <SparkleIcon className="w-6 h-6" />
              <h1 className="font-semibold text-lg">ChatGPT</h1>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full overflow-hidden"
                >
                  <img
                    src="/placeholder.svg"
                    width={36}
                    height={36}
                    alt="Avatar"
                    className="rounded-full overflow-hidden"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
        <div className="flex flex-col flex-1 items-start gap-8 mx-auto px-4 max-w-2xl">
          <div className="flex items-start gap-4">
            <Avatar className="border w-6 h-6">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>YO</AvatarFallback>
            </Avatar>
            <div className="gap-1 grid">
              <div className="font-bold">You</div>
              <div className="text-muted-foreground prose">
                <p>
                  Can you explain airplane turbulence to someone who has never
                  flown before? Make it conversational and concise.
                </p>
                <p>
                  Can you explain airplane turbulence to someone who has never
                  flown before? Make it conversational and concise.
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Avatar className="border w-6 h-6">
              <AvatarImage src="/placeholder-user.jpg" />
              <AvatarFallback>OA</AvatarFallback>
            </Avatar>
            <div className="gap-1 grid">
              <div className="font-bold">ChatGPT</div>
              <div className="text-muted-foreground prose">
                <p>
                  Of course! Imagine you're in a car driving down a bumpy road,
                  and the ride isn't perfectly smooth. Sometimes, you hit small
                  potholes or bumps, right? Well, when you're in an airplane,
                  it's kind of like that, but in the sky.
                </p>
                <p>
                  Of course! Imagine you're in a car driving down a bumpy road,
                  and the ride isn't perfectly smooth. Sometimes, you hit small
                  potholes or bumps, right? Well, when you're in an airplane,
                  it's kind of like that, but in the sky.
                </p>
                <p>
                  Airplane turbulence happens when the plane encounters pockets
                  of air that are moving differently. It's like sailing a boat
                  on choppy water. These air pockets can make the plane feel
                  like it's bouncing or shaking a bit. It's completely normal
                  and usually not dangerous at all.
                </p>
                <p>
                  Airplane turbulence happens when the plane encounters pockets
                  of air that are moving differently. It's like sailing a boat
                  on choppy water. These air pockets can make the plane feel
                  like it's bouncing or shaking a bit. It's completely normal
                  and usually not dangerous at all.
                </p>
              </div>
              <div className="flex items-center gap-2 py-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-transparent w-4 h-4 text-stone-400 hover:text-stone-900"
                >
                  <CopyIcon className="w-4 h-4" />
                  <span className="sr-only">Copy</span>
                </Button>
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
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-transparent w-4 h-4 text-stone-400 hover:text-stone-900"
                >
                  <RefreshCwIcon className="w-4 h-4" />
                  <span className="sr-only">Regenerate</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="bottom-0 sticky flex flex-col gap-1.5 bg-background mx-auto px-4 py-2 w-full max-w-2xl">
          <div className="relative">
            <Textarea
              placeholder="Message ChatGPT..."
              name="message"
              id="message"
              rows={1}
              className="border-neutral-400 shadow-sm p-4 pr-16 border rounded-2xl min-h-[48px] resize-none"
            />
            <Button
              type="submit"
              size="icon"
              className="top-3 right-3 absolute w-8 h-8"
              disabled
            >
              <ArrowUpIcon className="w-4 h-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
          <p className="font-medium text-center text-neutral-700 text-xs">
            ChatGPT can make mistakes. Consider checking important information.
          </p>
        </div>
      </div>
    </div>
  );
}
