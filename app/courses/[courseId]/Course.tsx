import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CourseType } from "./course.query";
import { MarkdownProse } from "@/components/features/mdx/MarkdownProse";
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
          <MarkdownProse markdown={course?.presentation || "No description"} />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Lessons</CardTitle>
        </CardHeader>
        <CardContent>
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
