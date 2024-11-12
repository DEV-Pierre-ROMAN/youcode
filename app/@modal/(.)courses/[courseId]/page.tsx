import { getAuthSession } from "@/lib/auth";
import { getCourseDetail } from "../../../courses/[courseId]/course.query";
import { CourseDialog } from "./CourseDialog";
import { Course } from "../../../courses/[courseId]/Course";

const InterceptCourseDetailPage = async ({
  params: { courseId },
}: {
  params: { courseId: string };
}) => {
  const session = await getAuthSession();

  const userId = session?.user.id;
  const course = await getCourseDetail(courseId, userId);

  if (!course) {
    return <div>Course not found</div>;
  }

  return (
    <CourseDialog course={course}>
      <Course course={course} />
    </CourseDialog>
  );
};

export default InterceptCourseDetailPage;
