import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { LessonItemPlaceHolder } from "./lessons/LessonItemPlaceHolder";

export const CoursePlaceHolder = () => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Lessons</CardTitle>
        </CardHeader>
        <CardContent>
          {Array.from({ length: 3 }).map((_, index) => (
            <LessonItemPlaceHolder key={index} />
          ))}
        </CardContent>
      </Card>
    </>
  );
};
