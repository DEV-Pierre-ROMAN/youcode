import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Card, CardContent } from "@/components/ui/card";
import { getRequiredAuthSession } from "@/lib/auth";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CourseForm } from "../form/CourseForm";

export default async function CreateCoursePage() {
  const session = await getRequiredAuthSession();

  const user = session.user;

  if (!user) {
    return new Error("User not found");
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle className="flex items-center">
          <Link href={`/admin/courses`}>
            <ArrowLeft size={28} className="mr-2" />
          </Link>
          Create Course
        </LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Card>
          <CardContent className="mt-6">
            <CourseForm />
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
