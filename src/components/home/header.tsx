import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserAvatar } from "@/components/ui/user-avatar";
import { User } from "@supabase/auth-helpers-nextjs";
import { Banana, Eclipse } from "lucide-react";
import Link from "next/dist/client/link";

interface HeaderProps {
  user: User;
  onOpenSidebar: () => void;
}

export function Header({ user, onOpenSidebar }: HeaderProps) {
  return (
    <header className="z-10 fixed bg-background shadow-sm w-full">
      <div className="flex justify-between items-center mx-auto p-4">
        <div className="flex items-center gap-2">
          <Eclipse className="w-6 h-6" />
          <h1 className="font-semibold text-gray-800 text-lg">SkyShaper</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden mr-2"
            onClick={onOpenSidebar}
          >
            <Banana className="w-6 h-6" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shadow-sm border rounded-md overflow-hidden"
              >
                <UserAvatar user={user} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <Link href="/logout">
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
