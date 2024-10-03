import prisma from "@/lib/prisma";

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
