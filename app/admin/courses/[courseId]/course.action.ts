"use server";

import { authenticatedAction, ServerError } from "@/lib/action";
import prisma from "@/lib/prisma";
import { z } from "zod";

export const changeUserStatusFromCourse = authenticatedAction
  .schema(
    z.object({
      courseId: z.string(),
      userId: z.string(),
    })
  )
  .action(async ({ parsedInput, ctx }) => {
    console.log(parsedInput);

    const courseOnUser = await prisma.courseOnUser.findUnique({
      where: {
        userId_courseId: {
          userId: parsedInput.userId,
          courseId: parsedInput.courseId,
        },
        course: {
          creatorId: ctx.userId,
        },
      },
    });

    if (!courseOnUser) {
      throw new ServerError("Course not found");
    }

    const courseOnUserUpdated = await prisma.courseOnUser.update({
      where: {
        id: courseOnUser.id,
      },
      data: {
        canceledAt: courseOnUser.canceledAt ? null : new Date(),
      },
    });
    return { message: "course updated successfully", courseOnUserUpdated };
  });
