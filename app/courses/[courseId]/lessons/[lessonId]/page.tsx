import { getAuthSession } from "@/lib/auth";
import { getCourseDetail } from "../../course.query";
import { getLessonDetail } from "./lesson.query";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Typography } from "@/components/ui/Typography";
import { Card } from "@/components/ui/card";
import { LessonItem } from "../LessonItem";
import { MDXProse } from "@/components/features/mdx/MDXProse";

const LessonDetailPage = async ({
  params: { courseId, lessonId },
}: {
  params: {
    courseId: string;
    lessonId: string;
  };
}) => {
  const session = await getAuthSession();

  const userId = session?.user.id;

  const course = await getCourseDetail(courseId, userId);
  if (!course) {
    return <p>Course not found</p>;
  }

  const lesson = await getLessonDetail(lessonId, userId);
  if (!lesson) {
    return <p>Lesson not found</p>;
  }

  return (
    <div className="flex flex-wrap p-4">
      <Card className="xl:w-90 flex w-full flex-col gap-4 p-3 lg:w-72">
        <Typography variant="h3">{course.name}</Typography>
        <ul className="flex flex-col gap-2">
          {course.lessons.map((lesson) => (
            <li key={lesson.id}>
              <LessonItem lesson={lesson} courseId={courseId} />
            </li>
          ))}
        </ul>
      </Card>
      <Layout className="lg:flex-1 xl:max-w-4xl 2xl:max-w-6xl">
        <LayoutHeader>
          <LayoutTitle>{lesson.name}</LayoutTitle>
        </LayoutHeader>
        <LayoutContent>
          <MDXProse markdown={lesson.content} />
        </LayoutContent>
      </Layout>
    </div>
  );
};
export default LessonDetailPage;
