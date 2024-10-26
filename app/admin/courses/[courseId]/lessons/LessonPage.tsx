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
import { LessonFormSchema } from "./form/lesson.schema";
import { useState } from "react";

export type LessonPageProps = {
  courseId: string;
  course: {
    id: string;
    name: string;
    lessons: ({
      id: string;
    } & LessonFormSchema)[];
  };
};

export const LessonPage = ({ courseId, course }: LessonPageProps) => {
  const [createLesson, setCreateLesson] = useState(false);

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
            {course.lessons.map((lesson) => (
              <LessonItem courseId={courseId} lesson={lesson} />
            ))}
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
