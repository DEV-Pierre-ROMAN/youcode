import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Typography } from "@/components/ui/Typography";
import { getRequiredAuthSession } from "@/lib/auth";
import { ArrowLeft, Edit2 } from "lucide-react";
import Link from "next/link";
import { getLessonAdminDetail } from "./lesson.query";

type lessonDetailPageProps = {
  params: {
    courseId: string;
    lessonId: string;
  };
};

export default async function LessonDetailPage({
  params: { courseId, lessonId },
}: lessonDetailPageProps) {
  const session = await getRequiredAuthSession();

  //fetch the course data
  const lesson = await getLessonAdminDetail({
    userId: session.user.id,
    lessonId,
  });

  if (!lesson) {
    throw new Error("Lesson not found");
  }

  return (
    <Layout>
      <LayoutHeader className="flex flex-row justify-between">
        <LayoutTitle className="flex items-center">
          <Link href={`/admin/courses/${courseId}/lessons`}>
            <ArrowLeft size={28} className="mr-2" />
          </Link>
          {lesson.course.name}
        </LayoutTitle>
        <div className="flex gap-2">
          <Link
            className={buttonVariants({ variant: "secondary" })}
            href={`/admin/courses/${courseId}/lessons/${lessonId}/edit`}
          >
            <Edit2 size={15} className="sm:mr-2" />
            <span className="hidden sm:block">Modifier</span>
          </Link>
        </div>
      </LayoutHeader>
      <LayoutContent>
        <Card className="min-h-full">
          <CardHeader>
            <Typography variant="h3">{lesson.name}</Typography>
          </CardHeader>
          <CardContent>
            <p>{lesson.content}</p>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
