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
import { CourseForm } from "../../form/CourseForm";

type CourseEditPageProps = {
  params: { courseId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function CourseEditPage({
  params: { courseId },
}: CourseEditPageProps) {
  const session = await getRequiredAuthSession();

  const user = session.user;

  const courseDetail = await prisma.course.findUnique({
    where: {
      id: courseId,
      creatorId: user.id,
    },
    select: {
      id: true,
      name: true,
      image: true,
      presentation: true,
    },
  });

  if (!courseDetail) {
    notFound();
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle className="flex items-center">
          <Link href={`/admin/courses/${courseId}`}>
            <ArrowLeft size={28} className="mr-2" />
          </Link>
          Course Edit
        </LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Card>
          <CardContent className="mt-6">
            <CourseForm defaultValues={courseDetail} />
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
