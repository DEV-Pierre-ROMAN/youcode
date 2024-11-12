"use client";

import { Button } from "@/components/ui/button";
import { changeLessonState } from "./lesson.action";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export type ButtonCompleteCourseProps = {
  courseId: string;
  lessonId: string;
};

export const ButtonCompleteCourse = ({
  lessonId,
  courseId,
}: ButtonCompleteCourseProps) => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async () => {
      const res = await changeLessonState({
        lessonId: lessonId,
        newState: "COMPLETED",
      });

      if (res?.serverError) {
        toast.error(res.serverError.serverError);
      }

      if (res?.data) {
        if (res.data.message) {
          toast.success(res.data.message);
        }
        console.log("res.data", res.data);
        if (
          res.data.result.nextLessonId &&
          res.data.result.nextLessonId.length > 0
        ) {
          router.push(
            `/courses/${courseId}/lessons/${res.data.result.nextLessonId}`
          );
        } else {
          router.refresh();
        }
      }
    },
  });

  if (mutation.isPending) {
    return <Button disabled>Completing lesson...</Button>;
  }

  return (
    <Button
      onClick={() => {
        mutation.mutate();
      }}
    >
      Complete lesson
    </Button>
  );
};
