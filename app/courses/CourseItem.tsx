import UserAvatar from "@/components/features/User/UserAvatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Typography } from "@/components/ui/Typography";
import { Course } from "@prisma/client";

export default function CourseItem({
  course,
}: {
  course: {
    name: string;
    image: string;
    creator: {
      name: string;
      image: string;
    };
  };
}) {
  return (
    <div className="relative overflow-hidden">
      <Avatar className="aspect-square h-60 w-full rounded md:h-auto">
        <AvatarFallback className="rounded">
          {course.name.charAt(0).toUpperCase()}
        </AvatarFallback>
        {course.image && (
          <AvatarImage
            className="object-cover "
            src={course.image}
            alt={course.name}
          />
        )}
      </Avatar>
      <div className="font-roboto absolute inset-0 flex cursor-pointer items-center justify-center bg-black bg-opacity-40 text-center text-2xl font-medium text-white transition hover:bg-opacity-60">
        <div className="absolute top-2 right-2 flex items-center gap-1 py-1 px-2 bg-secondary rounded-full">
          <UserAvatar className="h-5 w-5" user={course.creator} />
          <Typography variant="small">{course.creator.name}</Typography>
        </div>
        <Typography variant="h3">{course.name}</Typography>
      </div>
    </div>
  );
}
