"use server";

import { authenticatedAction } from "@/lib/action";
import { CourseFormSchema } from "./course.schema";
import z from "zod";
import prisma from "@/lib/prisma";

const CourseActionEditProps = z.object({
  courseId: z.string(),
  data: CourseFormSchema,
});

export const courseActionEdit = authenticatedAction
  .schema(CourseActionEditProps)
  .action(async ({ parsedInput, ctx }) => {
    const course = await prisma.course.update({
      where: {
        id: parsedInput.courseId,
        creatorId: ctx.userId,
      },
      data: parsedInput.data,
    });

    return { message: "Course updated successfully", course };
  });

export const courseActionCreate = authenticatedAction
  .schema(CourseFormSchema)
  .action(async ({ parsedInput, ctx }) => {
    const course = await prisma.course.create({
      data: {
        name: parsedInput.name,
        creatorId: ctx.userId,
        presentation: parsedInput.presentation,
      },
    });

    return {
      message: "Course created successfully",
      course,
    };
  });
