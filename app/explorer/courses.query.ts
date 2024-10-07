import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";

export async function getCourses() {
  const courses = await prisma.course.findMany({
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
