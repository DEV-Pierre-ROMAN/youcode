import {
  Layout,
  LayoutContent,
  LayoutDescription,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Loader from "@/components/ui/Loader";
import { Skeleton } from "@/components/ui/skeleton";
import { CoursePlaceHolder } from "./CoursePlaceHolder";

export default async function CourseDetailPageLoading() {
  return (
    <Layout>
      <LayoutHeader>
        <div className="flex items-center gap-4">
          <Avatar className="aspect-square h-20 w-auto">
            <AvatarFallback>
              <Loader />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <LayoutTitle>
                <Skeleton className="h-6 w-32" />
              </LayoutTitle>
            </div>

            <LayoutDescription className="flex items-center gap-2">
              <Avatar className="aspect-square h-7 w-auto">
                <AvatarFallback>
                  <Loader />
                </AvatarFallback>
              </Avatar>
              <Skeleton className="h-6 w-16" />
            </LayoutDescription>
          </div>
        </div>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-4">
        <CoursePlaceHolder />
      </LayoutContent>
    </Layout>
  );
}
