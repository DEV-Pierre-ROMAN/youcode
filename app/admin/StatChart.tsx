import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthSession } from "@/lib/auth";
import { getJoinByday } from "./admin.query";
import { NewUserChart } from "./NewUserChart";

export const StatChart = async () => {
  const session = await getAuthSession();
  const userAdminId = session?.user.id;

  if (!userAdminId) {
    return <p>Unauthorized</p>;
  }

  const chartData = await getJoinByday(userAdminId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activités</CardTitle>
      </CardHeader>
      <CardContent>
        <NewUserChart dataChart={chartData} />
      </CardContent>
    </Card>
  );
};
