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
    await prisma.course.update({
      where: {
        id: parsedInput.courseId,
        creatorId: ctx.userId,
      },
      data: parsedInput.data,
    });

    return "Course updated successfully";
  });
