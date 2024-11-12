import { Skeleton } from "@/components/ui/skeleton";
import { CircleDashed } from "lucide-react";
import { ICON_SIZE } from "./LessonItem";

export const LessonItemPlaceHolder = () => {
  return (
    <div className="flex w-full items-center justify-between rounded border p-2">
      <div className="flex w-full items-center gap-4">
        <CircleDashed size={ICON_SIZE} />
        <Skeleton className="h-6 flex-1 w-full" />
      </div>
    </div>
  );
};
