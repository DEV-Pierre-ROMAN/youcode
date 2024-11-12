import UserAvatar from "@/components/features/User/UserAvatar";
import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAuthSession } from "@/lib/auth";
import { getCourseDetail } from "./course.query";
import { Button } from "@/components/ui/button";
import { joinACourse } from "./course.action";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Course } from "./Course";

export default async function CourseDetailPage({
  params: { courseId },
}: {
  params: { courseId: string };
}) {
  const session = await getAuthSession();

  const userId = session?.user.id;
  const course = await getCourseDetail(courseId, userId);
  const isInCourse =
    course?.users && course.users.length > 0 ? course.users[0] : null;

  await new Promise((resolve) => setTimeout(resolve, 5000));
  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <Layout>
      <LayoutHeader>
        <div className="flex items-center gap-4">
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
            <div className="flex items-center gap-4">
              <LayoutTitle>{course.name} </LayoutTitle>
              {userId && !isInCourse && (
                <form>
                  <Button
                    formAction={async () => {
                      "use server";
                      const res = await joinACourse({ courseId: course.id });
                      revalidatePath(`/courses/${course.id}`);

                      if (res?.data?.lessonId) {
                        redirect(
                          `/courses/${course.id}/lessons/${res.data.lessonId}`
                        );
                      }
                    }}
                  >
                    Join
                  </Button>
                </form>
              )}
            </div>

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
        <Course course={course} />
      </LayoutContent>
    </Layout>
  );
}
