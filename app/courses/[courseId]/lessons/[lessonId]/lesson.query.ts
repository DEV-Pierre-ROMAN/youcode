import prisma from "@/lib/prisma";

export const getLessonDetail = (lessonId: string, userId: string = "-") => {
  return prisma.lesson.findUnique({
    where: {
      id: lessonId,
      OR: [
        {
          AND: [
            {
              state: "PUBLISHED",
            },
            {
              course: {
                users: {
                  some: {
                    userId: userId,
                    canceledAt: null,
                  },
                },
              },
            },
          ],
        },
        {
          state: "PUBLIC",
        },
      ],
    },
    include: {
      users: {
        select: {
          progress: true,
        },
      },
    },
  });
};
