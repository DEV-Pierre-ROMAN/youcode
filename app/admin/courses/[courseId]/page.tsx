import UserAvatar from "@/components/features/User/UserAvatar";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Typography } from "@/components/ui/Typography";
import { getRequiredAuthSession } from "@/lib/auth";
import { ArrowLeft, Edit2 } from "lucide-react";
import Link from "next/link";
import { getCourse } from "./course.query";

export default async function coursesDetailPage({
  params: { courseId },
}: {
  params: { courseId: string };
}) {
  const session = await getRequiredAuthSession();

  //fetch the course data
  const course = await getCourse({ userId: session.user.id, courseId });

  return (
    <Layout>
      <LayoutHeader className="flex flex-row justify-between">
        <LayoutTitle className="flex items-center">
          <Link href="/admin/courses">
            <ArrowLeft size={28} className="mr-2" />
          </Link>
          {course.name}
        </LayoutTitle>
        <div className="flex gap-2">
          <Link
            className={buttonVariants({ variant: "secondary" })}
            href={`/admin/courses/${course.id}/edit`}
          >
            <Edit2 size={15} className="sm:mr-2" />
            <span className="hidden sm:block">Modifier</span>
          </Link>
          <Link
            className={buttonVariants({ variant: "secondary" })}
            href={`/admin/courses/${course.id}/lessons`}
          >
            <Edit2 size={15} className="mr-2" />
            <span className="block sm:hidden">leçons</span>
            <span className="hidden sm:block">Modifier leçons</span>
          </Link>
        </div>
      </LayoutHeader>
      <LayoutContent>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Avatar className="m-auto aspect-square h-auto w-4/5 rounded object-cover sm:hidden">
            <AvatarFallback>
              {course.name.charAt(0).toUpperCase()}
            </AvatarFallback>
            {course.image && (
              <AvatarImage
                className="object-cover"
                src={course.image}
                alt={course.name}
              />
            )}
          </Avatar>
          <div className="flex-1">
            <Card className="min-h-full">
              <CardHeader>
                <Typography variant="h3">Description</Typography>
              </CardHeader>
              <CardContent>
                <p>{course.presentation}</p>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-col gap-4 sm:w-60">
            <Typography variant="muted" className="flex justify-end">
              - créé le {course.createdAt.toLocaleDateString()}
            </Typography>
            <Avatar className="hidden aspect-square h-auto w-full rounded sm:block">
              <AvatarFallback>
                {course.name.charAt(0).toUpperCase()}
              </AvatarFallback>
              {course.image && (
                <AvatarImage
                  className="object-cover"
                  src={course.image}
                  alt={course.name}
                />
              )}
            </Avatar>
            <Card className="flex justify-center p-2">
              <Typography variant="h3">
                {course._count.lessons} leçons
              </Typography>
            </Card>
            <div>
              <Typography variant="h3" className="mb-2">
                {course._count.users}{" "}
                {course._count.users > 0
                  ? "Utilisateurs inscrits"
                  : "Utilisateur inscrit"}
              </Typography>
              <ScrollArea className="h-72 rounded-md border">
                <div className="p-4">
                  {course.users.map((userOnCourse) => (
                    <>
                      <div
                        key={userOnCourse.user.id}
                        className="flex items-center"
                      >
                        <UserAvatar className="mr-2" user={userOnCourse.user} />
                        <p>{userOnCourse.user.name}</p>
                      </div>
                      <Separator className="my-2" />
                    </>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </LayoutContent>
    </Layout>
  );
}
