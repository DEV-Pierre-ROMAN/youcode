import { Suspense } from "react";
import { QuickStats } from "./QuickStats";
import { StatChart } from "./StatChart";
import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { QuickStatsSkeleton } from "./QuickStatsSkeleton";
import { StatChartSkeleton } from "./StatChartSkeleton";

const page = async () => {
  return (
    <Layout>
      <LayoutHeader className="flex flex-row justify-between">
        <LayoutTitle>Dashboard</LayoutTitle>
        <Link
          className={buttonVariants({ variant: "secondary" })}
          href="/admin/courses"
        >
          see Course
        </Link>
      </LayoutHeader>
      <LayoutContent className="flex flex-col gap-4">
        <Suspense fallback={<QuickStatsSkeleton />}>
          <QuickStats />
        </Suspense>
        <Suspense fallback={<StatChartSkeleton />}>
          <StatChart />
        </Suspense>
      </LayoutContent>
    </Layout>
  );
};

export default page;
