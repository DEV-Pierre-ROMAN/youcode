import { getAuthSession } from "@/lib/auth";
import { getLessonDetail } from "./lesson.query";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { MDXProse } from "@/components/features/mdx/MDXProse";
import { Separator } from "@/components/ui/separator";
import { ButtonCompleteCourse } from "./ButtonCompleteCourse";

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

  const lesson = await getLessonDetail(lessonId, userId);
  if (!lesson) {
    return <p>Lesson not found</p>;
  }

  return (
    <Layout className="lg:flex-1 xl:max-w-4xl 2xl:max-w-6xl">
      <LayoutHeader>
        <LayoutTitle>{lesson.name}</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <MDXProse markdown={lesson.content} />
        {userId && (
          <>
            <Separator />
            <div className="flex justify-end p-4">
              <ButtonCompleteCourse courseId={courseId} lessonId={lessonId} />
            </div>
          </>
        )}
      </LayoutContent>
    </Layout>
  );
};
export default LessonDetailPage;
