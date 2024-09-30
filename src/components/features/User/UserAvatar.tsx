import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Session } from "next-auth";
import { ComponentPropsWithoutRef } from "react";

type UserAvatarProps = {
  user: Session["user"];
} & ComponentPropsWithoutRef<"div">;

export default function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      <AvatarFallback>{user?.name?.charAt(0).toUpperCase()}</AvatarFallback>
      {user.image && (
        <AvatarImage src={user.image} alt={user.name ?? "user picture"} />
      )}
    </Avatar>
  );
}
