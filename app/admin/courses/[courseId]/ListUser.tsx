import UserAvatar from "@/components/features/User/UserAvatar";
import { DropdownMenuTrigger, Separator } from "@radix-ui/react-dropdown-menu";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { changeUserStatusFromCourse } from "./course.action";
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export type ListUserProps = {
  users: ({
    user: {
      id: string;
      name: string | null;
      image: string | null;
      createdAt: Date;
      updatedAt: Date;
      email: string | null;
      emailVerified: Date | null;
    };
  } & {
    userId: string;
    id: string;
    courseId: string;
    createdAt: Date;
    canceledAt: Date | null;
  })[];
  courseId: string;
};

export const ListUser = (props: ListUserProps) => {
  return (
    <ScrollArea className="h-72 rounded-md border">
      <div className="p-4">
        {props.users.map((userOnCourse) => (
          <>
            <div
              key={userOnCourse.user.id}
              className="flex items-center justify-between"
            >
              <div className="flex flex-1 items-center">
                <UserAvatar className="mr-2" user={userOnCourse.user} />
                <p>{userOnCourse.user.name}</p>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={cn("h-[10px] w-[10px] rounded-full", {
                    "bg-green-500": !userOnCourse.canceledAt,
                    "bg-red-500": userOnCourse.canceledAt,
                  })}
                ></div>

                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button size={"sm"} variant={"secondary"}>
                      <MenuIcon size={15} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem asChild>
                      <form>
                        <button
                          formAction={async () => {
                            "use server";
                            await changeUserStatusFromCourse({
                              userId: userOnCourse.user.id,
                              courseId: props.courseId,
                            });
                            revalidatePath(`/admin/courses/${props.courseId}`);
                          }}
                        >
                          {userOnCourse.canceledAt
                            ? "Activer l'accès"
                            : "Désactiver l'accès"}
                        </button>
                      </form>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <Separator className="my-2" />
          </>
        ))}
      </div>
    </ScrollArea>
  );
};
