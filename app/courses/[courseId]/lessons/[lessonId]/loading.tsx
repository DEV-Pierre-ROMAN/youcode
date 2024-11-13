import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = async () => {
  return (
    <Layout className="lg:flex-1 xl:max-w-4xl 2xl:max-w-6xl">
      <LayoutHeader>
        <LayoutTitle>Loading ...</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Skeleton className="h-32 w-full" />
      </LayoutContent>
    </Layout>
  );
};
export default Loading;
