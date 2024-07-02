import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { User } from "@supabase/auth-helpers-nextjs";

interface UserAvatarProps {
  user: User;
}
export function UserAvatar({ user }: UserAvatarProps) {
  const seed = user.id.slice(4, 8);
  const fallback = "OR"; // TODO: Get the initials of the user
  const avatarLink = `https://api.dicebear.com/9.x/avataaars-neutral/svg?seed=${seed}&flip=true`;

  return (
    <Avatar>
      <AvatarImage src={avatarLink} />
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  );
}
