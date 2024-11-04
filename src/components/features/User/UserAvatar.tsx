import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ComponentPropsWithoutRef } from "react";

type UserAvatarProps = {
  user: {
    name: string | null;
    image: string | null;
  };
} & ComponentPropsWithoutRef<"div">;

export default function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      <AvatarFallback className="text-[60%]">
        {user?.name?.charAt(0).toUpperCase()}
      </AvatarFallback>
      {user.image && (
        <AvatarImage src={user.image} alt={user.name ?? "user picture"} />
      )}
    </Avatar>
  );
}
