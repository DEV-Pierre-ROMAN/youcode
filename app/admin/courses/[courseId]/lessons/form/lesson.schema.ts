import { LessonState } from "@prisma/client";
import { z } from "zod";

export const LESSON_STATE = [
  LessonState.HIDDEN,
  LessonState.PUBLISHED,
  LessonState.PUBLIC,
] as const;

export const LessonFormSchema = z.object({
  name: z.string().min(3).max(50),
  state: z.enum(LESSON_STATE),
});

export type LessonFormSchema = z.infer<typeof LessonFormSchema>;

export const LessonFastFormCreateSchema = z.object({
  name: z.string().min(3).max(50),
  state: z.enum(LESSON_STATE),
  courseId: z.string(),
});

export type LessonFastFormCreateSchema = z.infer<
  typeof LessonFastFormCreateSchema
>;
