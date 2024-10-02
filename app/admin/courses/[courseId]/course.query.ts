import prisma from "@/lib/prisma";

export async function getCourse({
  courseId,
  userId,
}: {
  courseId: string;
  userId: string;
}) {
  const course = await prisma.course.findUnique({
    where: {
      creatorId: userId,
      id: courseId,
    },
    include: {
      _count: {
        select: {
          lessons: true,
          users: true,
        },
      },
      users: {
        include: {
          user: true,
        },
        orderBy: {
          user: {
            name: "asc",
          },
        },
      },
    },
  });

  if (!course) {
    throw new Error("Course not found");
  }

  return course;
}
