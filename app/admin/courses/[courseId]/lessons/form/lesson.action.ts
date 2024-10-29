"use server";

import { authenticatedAction, ServerError } from "@/lib/action";
import { LessonFastFormCreateSchema, LessonFormSchema } from "./lesson.schema";
import z from "zod";
import prisma from "@/lib/prisma";

const LessonActionEditProps = z.object({
  lessonId: z.string(),
  data: LessonFormSchema,
});

export const lessonActionEdit = authenticatedAction
  .schema(LessonActionEditProps)
  .action(async ({ parsedInput, ctx }) => {
    const lesson = await prisma.lesson.update({
      where: {
        id: parsedInput.lessonId,
        course: {
          creatorId: ctx.userId,
        },
      },
      data: parsedInput.data,
    });

    return { message: "Lesson updated successfully", lesson };
  });

export const lessonActionCreate = authenticatedAction
  .schema(LessonFastFormCreateSchema)
  .action(async ({ parsedInput, ctx }) => {
    const course = await prisma.course.findUnique({
      select: {
        lessons: true,
      },
      where: {
        id: parsedInput.courseId,
        creatorId: ctx.userId,
      },
    });

    if (!course) {
      throw new ServerError("Course not found");
    }

    const lesson = await prisma.lesson.create({
      data: {
        name: parsedInput.name,
        state: parsedInput.state,
        courseId: parsedInput.courseId,
        content: "",
        rank:
          course.lessons
            .map((lesson) => lesson.rank)
            .reduce((a, b) => Math.max(a, b), 0) + 1,
      },
    });

    return {
      message: "Lesson created successfully",
      lesson,
    };
  });

export const changeLessonRank = authenticatedAction
  .schema(
    z.object({
      lessonId: z.string(),
      rank: z.number(),
    })
  )
  .action(async ({ parsedInput, ctx }) => {
    const lessonFind = await prisma.lesson.findUnique({
      where: {
        course: {
          creatorId: ctx.userId,
        },

        id: parsedInput.lessonId,
      },
    });
    if (!lessonFind) {
      throw new ServerError("Course not found");
    }

    const oldRank = lessonFind.rank;
    const newRank = parsedInput.rank;
    let updatedLesson;

    if (oldRank < newRank) {
      updatedLesson = await prisma.lesson.updateMany({
        where: {
          courseId: lessonFind.courseId,
          rank: {
            gte: oldRank,
            lte: newRank,
          },
        },
        data: {
          rank: { decrement: 1 },
        },
      });
    } else {
      updatedLesson = await prisma.lesson.updateMany({
        where: {
          courseId: lessonFind.courseId,
          rank: {
            gte: newRank,
            lte: oldRank,
          },
        },
        data: {
          rank: { increment: 1 },
        },
      });
    }

    const lesson = await prisma.lesson.update({
      where: {
        id: parsedInput.lessonId,
      },
      data: {
        rank: newRank,
      },
    });

    return {
      message: "Lesson rank updated successfully",
      lesson,
      updatedLesson,
    };
  });
