"use client";
import { Button } from "@/components/ui/button";
import { Typography } from "@/components/ui/Typography";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { LessonFastForm } from "./form/LessonFastForm";
import { LessonFormSchema } from "./form/lesson.schema";
import { useRouter } from "next/navigation";
import { Edit } from "lucide-react";
import Link from "next/link";

export type LessonItemProps = {
  lesson?: {
    id: string;
  } & LessonFormSchema;
  callbackCancel?: () => void;
  callbackSuccess?: () => void;
  courseId: string;
};

export const LessonItem = ({
  lesson,
  courseId,
  callbackCancel,
  callbackSuccess,
}: LessonItemProps) => {
  const [edit, setEdit] = useState(!lesson);
  const router = useRouter();

  return (
    <div
      className="flex w-full items-center justify-between rounded border p-4"
      key={lesson ? lesson.id : "new"}
    >
      {edit ? (
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
      ) : (
        lesson && (
          <>
            <Link href={`/admin/courses/${courseId}/lessons/${lesson.id}`}>
              <Typography variant="large">{lesson.name}</Typography>
            </Link>
            <div className="flex items-center gap-6">
              <Badge>{lesson.state}</Badge>
              <div>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setEdit((state) => !state)}
                >
                  <Edit size={16} />
                </Button>
              </div>
            </div>
          </>
        )
      )}
    </div>
  );
};
