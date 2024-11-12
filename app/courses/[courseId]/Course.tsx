import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CourseType } from "./course.query";
import { MDXProse } from "@/components/features/mdx/MDXProse";
import { Typography } from "@/components/ui/Typography";
import { LessonItem } from "./lessons/LessonItem";

export type CourseProps = {
  course: CourseType;
};

export const Course = ({ course }: CourseProps) => {
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Description</CardTitle>
        </CardHeader>
        <CardContent>
          <MDXProse markdown={course?.presentation || "No description"} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Lessons</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {course?.lessons[0] ? (
            course.lessons.map((lesson) => (
              <LessonItem
                key={lesson.id}
                lesson={lesson}
                courseId={course.id}
              />
            ))
          ) : (
            <Typography variant="large">No lessons</Typography>
          )}
        </CardContent>
      </Card>
    </>
  );
};
