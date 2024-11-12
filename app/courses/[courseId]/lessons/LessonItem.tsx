import { Typography } from "@/components/ui/Typography";
import { $Enums } from "@prisma/client";
import { Circle, CircleCheckBig, CircleDashed } from "lucide-react";
import Link from "next/link";

type LessonItemProps = {
  lesson: {
    id: string;
    name: string;
    state: string;
    users: {
      progress: $Enums.Progress;
    }[];
  };

  courseId: string;
};

export const ICON_SIZE = 14;

const ProgessLessonPuce = ({ progress }: { progress: $Enums.Progress }) => {
  switch (progress) {
    case "COMPLETED":
      return <CircleCheckBig size={ICON_SIZE} />;
    case "IN_PROGRESS":
      return <Circle size={ICON_SIZE} />;
    default:
      return <CircleDashed size={ICON_SIZE} />;
  }
};

export const LessonItem = ({ lesson, courseId }: LessonItemProps) => {
  return (
    <Link
      href={`/courses/${courseId}/lessons/${lesson.id}`}
      className="flex w-full items-center justify-between rounded border p-2"
      key={lesson.id}
    >
      <div className="flex items-center gap-4 truncate">
        <ProgessLessonPuce progress={lesson.users[0]?.progress} />
        <Typography className="flex-1 truncate" variant="large">
          {lesson.name}
        </Typography>
      </div>
    </Link>
  );
};
