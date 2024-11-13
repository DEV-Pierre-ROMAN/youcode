import { Card } from "@/components/ui/card";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ReactNode, Suspense } from "react";
import { LessonNavigation } from "./LessonNavigation";
import { cookies } from "next/headers";
import { LessonNavigationSkeleton } from "./LessonNavigationSkeleton";

const layout = async ({
  children,
  params: { courseId, lessonId },
}: {
  children: ReactNode;
  params: {
    courseId: string;
    lessonId: string;
  };
}) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <SidebarProvider className="relative min-h-full" defaultOpen={defaultOpen}>
      <div className="flex min-h-screen flex-1 flex-wrap p-4">
        <Sidebar variant="inset" className="absolute h-full">
          <Card className="sticky top-20">
            <SidebarContent>
              <SidebarGroup className="flex flex-col gap-2">
                <Suspense fallback={<LessonNavigationSkeleton />}>
                  <LessonNavigation courseId={courseId} lessonId={lessonId} />
                </Suspense>
              </SidebarGroup>
            </SidebarContent>
          </Card>
        </Sidebar>
        <SidebarTrigger className="sticky top-20" />
        {children}
      </div>
    </SidebarProvider>
  );
};

export default layout;
