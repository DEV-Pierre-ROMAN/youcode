import { Typography } from "@/components/ui/Typography";
import { $Enums } from "@prisma/client";
import {
  Badge,
  Circle,
  CircleCheckBig,
  CircleDashed,
  Link,
} from "lucide-react";

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

const ProgessLessonPuce = ({ progress }: { progress: $Enums.Progress }) => {
  switch (progress) {
    case "COMPLETED":
      return <CircleCheckBig />;
    case "IN_PROGRESS":
      return <Circle />;
    default:
      return <CircleDashed />;
  }
};

export const LessonItem = ({ lesson, courseId }: LessonItemProps) => {
  return (
    <Link
      href={`/courses/${courseId}/lessons/${lesson.id}`}
      className="flex w-full items-center justify-between rounded border p-4"
      key={lesson.id}
    >
      <div className="flex items-center gap-4">
        <ProgessLessonPuce progress={lesson.users[0]?.progress} />
        <Typography variant="large">{lesson.name}</Typography>
      </div>
      <div className="flex items-center gap-1">
        <Badge>{lesson.state}</Badge>
      </div>
    </Link>
  );
};
