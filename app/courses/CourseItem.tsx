import UserAvatar from "@/components/features/User/UserAvatar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Typography } from "@/components/ui/Typography";
import { CourseCard } from "./courses.query";

export default function CourseItem({ course }: { course: CourseCard }) {
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
        <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-secondary px-2 py-1">
          <UserAvatar className="size-5" user={course.creator} />
          <Typography variant="small">{course.creator.name}</Typography>
        </div>
        <Typography variant="h3">{course.name}</Typography>
      </div>
    </div>
  );
}
