import {
  Layout,
  LayoutContent,
  LayoutHeader,
} from "@/components/layout/layout";
import Loader from "@/components/ui/Loader";

const loading = () => {
  return (
    <Layout>
      <LayoutHeader>Loading ...</LayoutHeader>
      <LayoutContent>
        <Loader />
      </LayoutContent>
    </Layout>
  );
};

export default loading;
