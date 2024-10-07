import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function getCourses(userId: string | null = null) {
  const courses = await prisma.course.findMany({
    where: userId
      ? {
          users: {
            some: {
              userId,
            },
          },
        }
      : {},
    select: {
      id: true,
      name: true,
      image: true,
      creator: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  return courses;
}

export type CourseCard = Prisma.PromiseReturnType<typeof getCourses>[number];
