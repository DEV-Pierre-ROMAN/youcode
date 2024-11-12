"use server";

import { authenticatedAction, ServerError } from "@/lib/action";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const changeLessonState = authenticatedAction
  .schema(
    z.object({
      lessonId: z.string(),
      newState: z.enum(["NOT_STARTED", "IN_PROGRESS", "COMPLETED"]),
    })
  )
  .action(async ({ parsedInput, ctx }) => {
    //check if user is in the course and the lesson is published
    const lesson = await prisma.lesson.findUnique({
      where: {
        id: parsedInput.lessonId,
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
                      userId: ctx.userId,
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
    });

    if (!lesson) {
      throw new ServerError("Lesson not found");
    }

    const lessonOnUser = await prisma.lessonOnUser.findUnique({
      where: {
        userId_lessonId: {
          userId: ctx.userId,
          lessonId: parsedInput.lessonId,
        },
      },
    });

    let lessonOnUserFinal = null;

    if (!lessonOnUser) {
      if (parsedInput.newState != "NOT_STARTED") {
        lessonOnUserFinal = await prisma.lessonOnUser.create({
          data: {
            progress: parsedInput.newState,
            lessonId: parsedInput.lessonId,
            userId: ctx.userId,
          },
        });
      }
    } else {
      lessonOnUserFinal = await prisma.lessonOnUser.update({
        where: {
          id: lessonOnUser.id,
        },
        data: {
          progress: parsedInput.newState,
        },
      });
    }

    const result = { lessonOnUser: lessonOnUserFinal, nextLessonId: "" };
    let message = "";

    if (parsedInput.newState === "COMPLETED") {
      message = "Lesson completed successfully";
      //get the next lesson
      const nextLesson = await prisma.lesson.findFirst({
        where: {
          courseId: lesson.courseId,
          rank: {
            gt: lesson.rank,
          },
          AND: [
            {
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
                            userId: ctx.userId,
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
            {
              OR: [
                {
                  users: {
                    some: {
                      userId: ctx.userId,
                      progress: {
                        not: "COMPLETED",
                      },
                    },
                  },
                },
                {
                  users: {
                    none: {
                      userId: ctx.userId,
                    },
                  },
                },
              ],
            },
          ],
        },
        orderBy: {
          rank: "asc",
        },
      });

      result.nextLessonId = nextLesson?.id || "";
    } else if (parsedInput.newState === "IN_PROGRESS") {
      message = "Lesson beginning";
    }

    revalidatePath(`/courses/${lesson.courseId}/lessons/${lesson.id}`);

    return { message: message, result };
  });
