"use server";

import { authenticatedAction } from "@/lib/action";
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
      throw new Error("Course not found");
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