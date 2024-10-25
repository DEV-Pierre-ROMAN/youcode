"use server";

import { authenticatedAction, ServerError } from "@/lib/action";
import { CourseFormSchema } from "../form/course.schema";
import z from "zod";
import prisma from "@/lib/prisma";

const CourseActionEditProps = z.object({
  courseId: z.string(),
  data: CourseFormSchema,
});

export const courseActionEdit = authenticatedAction
  .schema(CourseActionEditProps)
  .action(async ({ parsedInput, ctx }) => {
    await prisma.course.update({
      where: {
        id: parsedInput.courseId,
        creatorId: ctx.userId,
      },
      data: parsedInput.data,
    });

    return "Course updated successfully";
  });

export const courseActionCreate = authenticatedAction
  .schema(CourseFormSchema)
  .action(async ({ parsedInput, ctx }) => {
    if (!ctx.userId) {
      throw new ServerError("You need to be logged in to create a course");
    }

    const newCourse = await prisma.course.create({
      data: {
        name: parsedInput.name,
        creatorId: ctx.userId,
        presentation: parsedInput.presentation,
      },
    });

    return newCourse;
    // return "Course created successfully";
  });
