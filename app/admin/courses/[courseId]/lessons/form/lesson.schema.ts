import { LessonState } from "@prisma/client";
import { z } from "zod";

export const LessonFormSchema = z.object({
  name: z.string().min(3).max(50),
  state: z.enum([
    LessonState.HIDDEN,
    LessonState.PUBLISHED,
    LessonState.PUBLIC,
  ]),
});

export type LessonFormSchema = z.infer<typeof LessonFormSchema>;

export const LessonFastFormCreateSchema = z.object({
  name: z.string().min(3).max(50),
  state: z.enum([
    LessonState.HIDDEN,
    LessonState.PUBLISHED,
    LessonState.PUBLIC,
  ]),
  courseId: z.string(),
});

export type LessonFastFormCreateSchema = z.infer<
  typeof LessonFastFormCreateSchema
>;
