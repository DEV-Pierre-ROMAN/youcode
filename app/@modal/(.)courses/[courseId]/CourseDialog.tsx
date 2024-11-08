"use client";
import { PropsWithChildren } from "react";
import { CourseType } from "../../../courses/[courseId]/course.query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePathname, useRouter } from "next/navigation";

export type CourseDialogProps = PropsWithChildren<{
  course: CourseType;
}>;

export const CourseDialog = ({ children, course }: CourseDialogProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const isCoursePage = pathname?.split("/").filter(Boolean).length === 2;

  console.log("isCoursePage", isCoursePage);

  return (
    <Dialog
      open={isCoursePage}
      onOpenChange={() => {
        router.back();
      }}
    >
      <DialogContent className="max-h-screen max-w-3xl overflow-auto">
        <DialogHeader>
          <DialogTitle>{course?.name}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};
