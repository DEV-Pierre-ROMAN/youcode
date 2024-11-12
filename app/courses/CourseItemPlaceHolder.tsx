import { Skeleton } from "@/components/ui/skeleton";

export default function CourseItemPlaceHolder() {
  return (
    <div className="relative overflow-hidden">
      <Skeleton className="aspect-square h-60 w-full rounded md:h-auto"></Skeleton>
      <div className="font-roboto absolute inset-0 flex cursor-pointer items-center justify-center bg-black bg-opacity-40 text-center text-2xl font-medium text-white transition hover:bg-opacity-60">
        <div className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-secondary px-2 py-1">
          <Skeleton className="size-5" />
          <Skeleton className="h-6 w-16" />
        </div>
        <Skeleton className="h-6 w-32" />
      </div>
    </div>
  );
}
