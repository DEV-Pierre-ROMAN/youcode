import { Typography } from "@/components/ui/Typography";
import { LessonItemPlaceHolder } from "../LessonItemPlaceHolder";

export const LessonNavigationSkeleton = () => {
  return (
    <>
      <Typography variant="h3">Loading ...</Typography>
      <ul className="flex flex-col gap-2">
        {Array.from({ length: 3 }).map(() => (
          <li>
            <LessonItemPlaceHolder />
          </li>
        ))}
      </ul>
    </>
  );
};
