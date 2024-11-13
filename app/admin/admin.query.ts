import prisma from "@/lib/prisma";

export const countActive = async (
  userAdminId: string,
  field: "userId" | "lessonId" = "userId"
) => {
  const actives = await prisma.lessonOnUser.groupBy({
    where: {
      lesson: {
        course: {
          creatorId: userAdminId,
        },
      },
      updatedAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 30)),
      },
    },
    by: [field],
  });

  return actives.length;
};

export const countCourseActive = async (userAdminId: string) => {
  const courseActives = await prisma.course.groupBy({
    where: {
      creatorId: userAdminId,
      lessons: {
        some: {
          users: {
            some: {
              updatedAt: {
                gte: new Date(new Date().setDate(new Date().getDate() - 30)),
              },
            },
          },
        },
      },
    },
    by: ["id"],
  });

  return courseActives.length;
};

export const getJoinByday = async (userAdminId: string) => {
  const joinedCourses = await prisma.courseOnUser.findMany({
    where: {
      course: {
        creatorId: userAdminId,
      },
      OR: [
        {
          createdAt: {
            gte: new Date(new Date().setDate(new Date().getDate() - 30)),
          },
        },
        {
          canceledAt: {
            gte: new Date(new Date().setDate(new Date().getDate() - 30)),
          },
        },
      ],
    },
    select: {
      createdAt: true,
      canceledAt: true,
      id: true,
      course: {
        select: {
          name: true,
        },
      },
    },
  });

  const dataChart = Array.from({ length: 30 }, (_, i) => {
    const date = new Date(new Date().setDate(new Date().getDate() - i));
    const dateWithoutTime = new Date(date.setHours(0, 0, 0, 0));
    return {
      cancelUser: joinedCourses.filter((course) => {
        if (!course.canceledAt) return false;
        const canceledAtDate = new Date(course.canceledAt);
        const canceledAtWithoutTime = new Date(
          canceledAtDate.setHours(0, 0, 0, 0)
        );
        return canceledAtWithoutTime.getTime() === dateWithoutTime.getTime();
      }).length,
      newUser: joinedCourses.filter((course) => {
        const createdAtDate = new Date(course.createdAt);
        const createdAtWithoutTime = new Date(
          createdAtDate.setHours(0, 0, 0, 0)
        );

        return createdAtWithoutTime.getTime() === dateWithoutTime.getTime();
      }).length,
      date: date,
    };
  }).sort((a, b) => a.date.getTime() - b.date.getTime());

  return dataChart;
};
