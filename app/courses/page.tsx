import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { getRequiredAuthSession } from "@/lib/auth";
import CourseItem from "./CourseItem";
import { getCourses } from "./courses.query";
import { AuthErrorCard } from "@/components/features/error/AuthErrorCard";

export default async function courseListPage() {
  try {
    const session = await getRequiredAuthSession();

    const user = session.user;

    const courses = await getCourses(user.id);

    return (
      <Layout>
        <LayoutHeader>
          <LayoutTitle>Mes cours</LayoutTitle>
        </LayoutHeader>
        <LayoutContent>
          <div className="flex flex-col gap-3 p-3 md:grid md:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <CourseItem key={course.id} course={course} />
            ))}
          </div>
        </LayoutContent>
      </Layout>
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return <AuthErrorCard />;
  }
}
