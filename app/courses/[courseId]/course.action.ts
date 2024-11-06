"use server";
import { authenticatedAction, ServerError } from "@/lib/action";
import prisma from "@/lib/prisma";
import { z } from "zod";

export const joinACourse = authenticatedAction
  .schema(
    z.object({
      courseId: z.string(),
    })
  )
  .action(async ({ parsedInput, ctx }) => {
    const courseOnUser = await prisma.courseOnUser.findUnique({
      where: {
        userId_courseId: {
          userId: ctx.userId,
          courseId: parsedInput.courseId,
        },
      },
    });

    if (courseOnUser) {
      throw new ServerError("User already joined course");
    }

    const lesson = await prisma.courseOnUser.create({
      data: {
        userId: ctx.userId,
        courseId: parsedInput.courseId,
      },
      select: {
        course: {
          select: {
            id: true,
            lessons: {
              orderBy: {
                rank: "asc",
              },
              where: {
                state: {
                  in: ["PUBLISHED", "PUBLIC"],
                },
              },
              take: 1,
              select: {
                id: true,
              },
            },
          },
        },
      },
    });

    return {
      message: "User joined course successfully",
      lessonId: lesson.course.lessons[0].id,
    };
  });
