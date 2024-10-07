import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import CourseItem from "../courses/CourseItem";
import { getCourses } from "../courses/courses.query";

export default async function courseListPage() {
  const courses = await getCourses();

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Explorer</LayoutTitle>
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
}
