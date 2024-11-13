import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export const StatChartSkeleton = async () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activités</CardTitle>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-40 w-full" />
      </CardContent>
    </Card>
  );
};
