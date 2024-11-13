"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Session } from "next-auth";
import UserAvatar from "./UserAvatar";
import LogoutButton from "../auth/LogoutButton";
import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

type UserCardProps = {
  user: Session["user"];
};

export default function UserProfile(props: UserCardProps) {
  return (
    <Card className="m-auto mt-4 max-w-lg">
      <CardHeader className="flex-row gap-4 space-y-0">
        <UserAvatar user={props.user} />
        <div className="flex flex-col gap-1">
          <CardTitle>{props.user.email}</CardTitle>
          <CardDescription>{props.user.name}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <Link
          className={buttonVariants({ variant: "outline", size: "lg" })}
          href="/account/settings"
        >
          Setting
        </Link>
        <Link
          className={buttonVariants({ variant: "outline", size: "lg" })}
          href="/admin"
        >
          Admin
        </Link>
      </CardContent>
      <CardFooter className="flex justify-end">
        <LogoutButton />
      </CardFooter>
    </Card>
  );
}
