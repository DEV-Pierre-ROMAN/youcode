import { Skeleton } from "@/components/ui/skeleton";
import { CircleDashed } from "lucide-react";

export const LessonItemPlaceHolder = () => {
  return (
    <div className="flex w-full items-center justify-between rounded border p-4">
      <div className="flex w-full items-center gap-4">
        <CircleDashed />
        <Skeleton className="h-6 w-full" />
      </div>
    </div>
  );
};
