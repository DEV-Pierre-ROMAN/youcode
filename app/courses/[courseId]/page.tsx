import MDXRender from "@/components/features/mdx/MDXRender";
import UserAvatar from "@/components/features/User/UserAvatar";
import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/Typography";
import { getAuthSession } from "@/lib/auth";
import { getCourseDetail } from "./course.query";
import { Circle, CircleCheckBig, CircleDashed } from "lucide-react";
import { $Enums } from "@prisma/client";

const ProgessLessonPuce = ({ progress }: { progress: $Enums.Progress }) => {
  switch (progress) {
    case "COMPLETED":
      return <CircleCheckBig />;
    case "IN_PROGRESS":
      return <Circle />;
    default:
      return <CircleDashed />;
  }
};
export default async function CourseDetailPage({
  params: { courseId },
}: {
  params: { courseId: string };
}) {
  const session = await getAuthSession();

  const userId = session?.user.id;
  const course = await getCourseDetail(courseId, userId);

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <Layout>
      <LayoutHeader>
        <div className="flex gap-4 items-center">
          <Avatar className="aspect-square h-20 w-auto">
            <AvatarFallback>
              {course.name.charAt(0).toUpperCase()}
            </AvatarFallback>
            {course.image && (
              <AvatarImage
                className="min-w-0 object-cover"
                src={course.image}
                alt={course.name}
              />
            )}
          </Avatar>
          <div className="flex flex-col gap-2">
            <LayoutTitle>{course.name}</LayoutTitle>
            <LayoutDescription className="flex items-center gap-2">
              <UserAvatar
                user={course.creator}
                className="aspect-square h-7 w-auto"
              />
              {course.creator.name}
            </LayoutDescription>
          </div>
        </div>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent>
            <MDXRender source={course.presentation || "No description"} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Lessons</CardTitle>
          </CardHeader>
          <CardContent>
            {course.lessons[0] ? (
              course.lessons.map((lesson) => (
                <div
                  className="flex w-full items-center justify-between rounded border p-4"
                  key={lesson.id}
                >
                  <div className="flex gap-4 items-center">
                    <ProgessLessonPuce progress={lesson.users[0]?.progress} />
                    <Typography variant="large">{lesson.name}</Typography>
                  </div>
                  <div className="flex items-center gap-1">
                    <Badge>{lesson.state}</Badge>
                  </div>
                </div>
              ))
            ) : (
              <Typography variant="large">No lessons</Typography>
            )}
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
