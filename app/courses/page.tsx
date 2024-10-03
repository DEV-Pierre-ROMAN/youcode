import CourseItem from "./CourseItem";
import { getCourses } from "./courses.query";

export default async function courseListPage() {
  const courses = await getCourses();

  return (
    <div className="flex flex-col gap-3 p-3 md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
      {courses.map((course) => (
        <CourseItem key={course.id} course={course} />
      ))}
    </div>
  );
}
