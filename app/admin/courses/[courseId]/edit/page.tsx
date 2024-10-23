import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Typography } from "@/components/ui/Typography";
import { getRequiredAuthSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import z from "zod";
import { revalidatePath } from "next/cache";

type CourseEditPageProps = {
  params: { courseId: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

const FormValidation = z.object({
  name: z.string().min(3).max(50),
  image: z.string().url(),
  presentation: z.string(),
});

export default async function CourseEditPage({
  params: { courseId },
  searchParams,
}: CourseEditPageProps) {
  const session = await getRequiredAuthSession();

  const user = session.user;
  console.log("courseId", courseId);

  const courseDetail = await prisma.course.findUnique({
    where: {
      id: courseId,
      creatorId: user.id,
    },
  });

  if (!courseDetail) {
    throw new Error("Course not found");
  }

  async function saveCourse(formData: FormData): Promise<void> {
    "use server";

    const name = formData.get("name") as string;
    const image = formData.get("image") as string;
    const presentation = formData.get("presentation") as string;

    const safeData = FormValidation.safeParse({ name, image, presentation });

    if (!safeData.success) {
      const searchParams = new URLSearchParams();
      searchParams.set(
        "error",
        "Invalid data, name must be between 3 and 50 characters and image must be a valid URL"
      );
      redirect(`/admin/courses/${courseId}/edit?${searchParams.toString()}`);
    }

    await prisma.course.update({
      where: {
        id: courseId,
        creatorId: user.id,
      },
      data: safeData.data,
    });

    revalidatePath(`/admin/courses/${courseId}`);
    await redirect(`/admin/courses/${courseId}`);
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle className="flex items-center">
          <Link href={`/admin/courses/${courseId}`}>
            <ArrowLeft size={28} className="mr-2" />
          </Link>
          Course Edit
        </LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Card>
          <CardContent className="mt-6">
            <form className="flex flex-col gap-4" action={saveCourse}>
              <div className="flex flex-col gap-1">
                <label htmlFor="image">Image</label>
                <input
                  className="rounded border p-2"
                  type="text"
                  name="image"
                  id="image"
                  defaultValue={courseDetail?.image || ""}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="name">Name</label>
                <input
                  className="rounded border p-2"
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={courseDetail?.name || ""}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="presentation">Presentation</label>
                <Textarea
                  className="rounded border p-2"
                  name="presentation"
                  id="presentation"
                  defaultValue={courseDetail?.presentation || ""}
                />
              </div>

              {searchParams.error && (
                <Typography className="text-red-500">
                  {searchParams.error}
                </Typography>
              )}

              <Button className="mt-6" type="submit">
                Save
              </Button>
            </form>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
