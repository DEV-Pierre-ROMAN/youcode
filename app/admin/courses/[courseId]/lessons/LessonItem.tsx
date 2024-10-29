"use client";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { LessonFastForm } from "./form/LessonFastForm";
import { useRouter } from "next/navigation";
import { Edit, Menu } from "lucide-react";
import Link from "next/link";
import { Lesson } from "@prisma/client";
import { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

export type LessonItemProps = {
  lesson?: Lesson;
  callbackCancel?: () => void;
  callbackSuccess?: () => void;
  draggableListeners?: SyntheticListenerMap | undefined;
  courseId: string;
};

export const LessonItem = ({
  lesson,
  courseId,
  callbackCancel,
  callbackSuccess,
  draggableListeners,
}: LessonItemProps) => {
  const [edit, setEdit] = useState(!lesson);
  const router = useRouter();

  return (
    <div
      className="flex w-full items-center justify-between gap-6 rounded border bg-card p-4"
      key={lesson ? lesson.id : "new"}
    >
      {edit ? (
        <>
          <LessonFastForm
            courseId={courseId}
            defaultValues={lesson}
            callbackValidate={() => {
              if (callbackSuccess) callbackSuccess();
              setEdit(false);
              router.refresh();
            }}
            callbackCancel={() => {
              if (callbackCancel) callbackCancel();
              else setEdit(false);
            }}
          />
        </>
      ) : (
        lesson && (
          <Link
            href={`/admin/courses/${courseId}/lessons/${lesson.id}`}
            className="flex flex-1 items-center justify-between"
          >
            <Typography variant="large">{lesson.name}</Typography>
            <div className="flex items-center gap-6">
              <Badge>{lesson.state}</Badge>
              <div>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    setEdit((state) => !state);
                    e.stopPropagation();
                    e.preventDefault();
                  }}
                >
                  <Edit size={16} />
                </Button>
              </div>
            </div>
          </Link>
        )
      )}
      {lesson && (
        <Button
          size="sm"
          variant="ghost"
          className="cursor-grab"
          {...draggableListeners}
        >
          <Menu size={16} />
        </Button>
      )}
    </div>
  );
};
