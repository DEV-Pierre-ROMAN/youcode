import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Typography } from "@/components/ui/Typography";
import { Card } from "@/components/ui/card";
import { LessonItemPlaceHolder } from "../LessonItemPlaceHolder";
import { Skeleton } from "@/components/ui/skeleton";

const LessonDetailPage = async () => {
  return (
    <div className="flex flex-wrap p-4">
      <Card className="xl:w-90 flex w-full flex-col gap-4 p-3 lg:w-72">
        <Typography variant="h3">Loading ...</Typography>
        <ul className="flex flex-col gap-2">
          {Array.from({ length: 3 }).map(() => (
            <li>
              <LessonItemPlaceHolder />
            </li>
          ))}
        </ul>
      </Card>
      <Layout className="lg:flex-1 xl:max-w-4xl 2xl:max-w-6xl">
        <LayoutHeader>
          <LayoutTitle>Loading ...</LayoutTitle>
        </LayoutHeader>
        <LayoutContent>
          <Skeleton className="h-32 w-full" />
        </LayoutContent>
      </Layout>
    </div>
  );
};
export default LessonDetailPage;
