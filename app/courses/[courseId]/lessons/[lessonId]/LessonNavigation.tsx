import { Typography } from "@/components/ui/Typography";
import { LessonItem } from "../LessonItem";
import { getCourseDetail } from "../../course.query";
import { getAuthSession } from "@/lib/auth";
import { changeLessonState } from "./lesson.action";

export type LessonNavigationProps = {
  courseId: string;
  lessonId: string;
};

export const LessonNavigation = async ({
  courseId,
  lessonId,
}: LessonNavigationProps) => {
  const session = await getAuthSession();
  const userId = session?.user.id;

  let course = await getCourseDetail(courseId, userId);
  if (!course) {
    return <p>Course not found</p>;
  }

  const lessonProgress = course.lessons.find((lesson) => lesson.id === lessonId)
    ?.users[0]?.progress;
  if (!lessonProgress || lessonProgress === "NOT_STARTED") {
    await changeLessonState({ lessonId: lessonId, newState: "IN_PROGRESS" });
    course = (await getCourseDetail(courseId, userId)) || course;
  }

  return (
    <>
      <Typography variant="h3">{course.name}</Typography>
      <ul className="flex flex-col gap-2">
        {course.lessons.map((lesson) => (
          <li key={lesson.id}>
            <LessonItem lesson={lesson} courseId={courseId} />
          </li>
        ))}
      </ul>
    </>
  );
};
