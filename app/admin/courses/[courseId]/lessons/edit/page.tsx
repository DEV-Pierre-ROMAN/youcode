import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Card, CardContent } from "@/components/ui/card";
import { getRequiredAuthSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LessonForm } from "../form/LessonFastForm";
type lessonEditPageProps = {
  params: { lessonId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function lessonEditPage({
  params: { lessonId },
}: lessonEditPageProps) {
  const session = await getRequiredAuthSession();

  const user = session.user;

  const lessonDetail = await prisma.lesson.findUnique({
    where: {
      id: lessonId,
      course: {
        creatorId: user.id,
      },
    },
    select: {
      id: true,
      name: true,
      state: true,
    },
  });

  if (!lessonDetail) {
    notFound();
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle className="flex items-center">
          <Link href={`/admin/lessons/${lessonId}`}>
            <ArrowLeft size={28} className="mr-2" />
          </Link>
          lesson Edit
        </LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Card>
          <CardContent className="mt-6">
            <LessonForm defaultValues={lessonDetail} />
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
