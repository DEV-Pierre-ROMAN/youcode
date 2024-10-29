"use client";

import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Typography } from "@/components/ui/Typography";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { LessonItem } from "./LessonItem";
import { useEffect, useState } from "react";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "@/components/utils/SortableItem";
import { Lesson } from "@prisma/client";
import { changeLessonRank } from "./form/lesson.action";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { cn } from "@/lib/utils";

export type LessonPageProps = {
  courseId: string;
  course: {
    id: string;
    name: string;
    lessons: Lesson[];
  };
};

export const LessonPage = ({ courseId, course }: LessonPageProps) => {
  const [createLesson, setCreateLesson] = useState(false);
  const [lessons, setLessons] = useState(course.lessons);
  const mutation = useMutation({
    mutationFn: async ({
      lessonModifiedId,
      newRank,
    }: {
      lessonModifiedId: string;
      newRank: number;
    }) => {
      const result = await changeLessonRank({
        lessonId: lessonModifiedId,
        rank: newRank,
      });

      if (!result) {
        toast.error("Something went wrong");
        return;
      }

      if (result.serverError) {
        toast.error("Something went wrong");
        return;
      }

      if (result.data) {
        toast.success(result.data.message);
      }

      setLessons((prevItems) => {
        const activeItem = prevItems.find(
          (item) => item.id === lessonModifiedId
        );

        if (!activeItem) {
          return prevItems;
        }

        activeItem.rank = result.data
          ? result.data.lesson.rank
          : activeItem.rank;

        return [...prevItems];
      });
    },
  });

  useEffect(() => {
    setLessons(course.lessons);
  }, [course.lessons]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent): void {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setLessons((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);

        const newRank = newIndex + 1;
        const lessonModifiedId = newItems[newIndex].id;

        mutation.mutate({ lessonModifiedId, newRank });

        return newItems;
      });
    }
  }

  return (
    <Layout>
      <LayoutHeader className="flex flex-row justify-between">
        <LayoutTitle className="flex items-center">
          <Link href={`/admin/courses/${courseId}`}>
            <ArrowLeft size={28} className="mr-2" />
          </Link>
          {course.name}
        </LayoutTitle>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => setCreateLesson(true)}>
            <Plus size={15} className="mr-2" />
            Ajouter une leçon
          </Button>
        </div>
      </LayoutHeader>
      <LayoutContent>
        <Card>
          <CardHeader>
            <Typography variant="h3">Leçons</Typography>
          </CardHeader>
          <CardContent className="flex flex-col gap-3">
            <DndContext
              collisionDetection={closestCenter}
              sensors={sensors}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                disabled={mutation.isPending}
                items={lessons.map((lesson) => lesson.id)}
                strategy={verticalListSortingStrategy}
              >
                <div
                  className={cn({
                    "flex flex-col gap-3": true,
                    "opacity-50 cursor-progess": mutation.isPending,
                  })}
                >
                  {lessons.map((lesson, index) => (
                    <SortableItem
                      key={lesson.id}
                      index={index}
                      sortableValue={lesson.id}
                    >
                      <LessonItem courseId={courseId} lesson={lesson} />
                    </SortableItem>
                  ))}
                </div>
              </SortableContext>
            </DndContext>
            {createLesson && (
              <LessonItem
                courseId={courseId}
                callbackCancel={() => setCreateLesson(false)}
                callbackSuccess={() => setCreateLesson(false)}
              />
            )}
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
};
