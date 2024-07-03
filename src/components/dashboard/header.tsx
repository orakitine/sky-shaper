import { User } from "@supabase/auth-helpers-nextjs";
import { Eclipse } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { UserAvatar } from "@/components/ui/user-avatar";
import Link from "next/dist/client/link";

interface HeaderProps {
  user: User;
}
export function Header({ user }: HeaderProps) {
  return (
    <header className="z-10 fixed bg-background shadow-sm w-full h-16">
      <div className="flex justify-between items-center mx-auto p-4">
        <div className="flex items-center gap-2">
          <Eclipse className="w-6 h-6" />
          <h1 className="font-semibold text-lg">SkyShaper</h1>
        </div>
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
    </header>
  );
}
