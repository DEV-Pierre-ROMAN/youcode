import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Typography } from "@/components/ui/Typography";
import { getRequiredAuthSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";

export default async function courseLessonsListPage({
  params: { courseId },
}: {
  params: { courseId: string };
}) {
  const session = await getRequiredAuthSession();

  const course = await prisma.course.findUnique({
    where: {
      creatorId: session.user.id,
      id: courseId,
    },
    include: {
      lessons: {
        orderBy: {
          rank: "asc",
        },
      },
    },
  });

  if (!course) {
    throw new Error("Course not found");
  }

  return (
    <Layout>
      <LayoutHeader className="flex flex-row justify-between">
        <LayoutTitle className="flex items-center">
          <Link href={`/admin/courses/${courseId}`}>
            <ArrowLeft size={28} className="mr-2" />
          </Link>
          {course.name}
        </LayoutTitle>
        <div className="flex gap-2">
          <Link
            className={buttonVariants({ variant: "secondary" })}
            href={`/account/courses/${course.id}/new`}
          >
            <Plus size={15} className="mr-2" />
            Ajouter une leçon
          </Link>
        </div>
      </LayoutHeader>
      <LayoutContent>
        <Card>
          <CardHeader>
            <Typography variant="h3">Leçons</Typography>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            {course.lessons.map((lesson) => (
              <div
                className="flex w-full items-center justify-between rounded border p-4"
                key={lesson.id}
              >
                <Typography variant="large">{lesson.name}</Typography>
                <div className="flex items-center gap-1">
                  <Badge>{lesson.state}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
