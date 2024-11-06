import prisma from "@/lib/prisma";

export async function getCourseDetail(courseId: string, userId: string = "-") {
  return prisma.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
      creator: true,
      users: {
        where: {
          userId: userId,
        },
      },
      lessons: {
        orderBy: {
          rank: "asc",
        },
        where: {
          state: {
            in: ["PUBLISHED", "PUBLIC"],
          },
        },
        select: {
          id: true,
          name: true,
          state: true,
          users: {
            select: {
              progress: true,
            },
            where: {
              userId: userId,
            },
          },
        },
      },
    },
  });
}
