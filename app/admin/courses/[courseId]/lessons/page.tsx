import { getRequiredAuthSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { LessonPage } from "./LessonPage";

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

  return <LessonPage courseId={courseId} course={course} />;
}
