import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import CourseItemPlaceHolder from "./CourseItemPlaceHolder";

export default async function courseListPage() {
  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Mes cours</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <div className="flex flex-col gap-3 p-3 md:grid md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 8 }).map(() => (
            <CourseItemPlaceHolder />
          ))}
        </div>
      </LayoutContent>
    </Layout>
  );
}
