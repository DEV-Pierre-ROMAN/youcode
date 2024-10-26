import prisma from "@/lib/prisma";

type LessonUserDetailsParam = {
  lessonId: string;
  userId: string;
};

export async function getLessonDetail({
  lessonId,
  userId = "-",
}: LessonUserDetailsParam) {
  return prisma.lesson.findUnique({
    where: {
      id: lessonId,
      course: {
        creatorId: userId,
      },
    },
    include: {
      course: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
  });
}
