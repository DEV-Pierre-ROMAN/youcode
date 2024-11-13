import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, Presentation, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export const QuickStatsSkeleton = async () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Page</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-1">
          <li className="flex gap-2">
            <User />
            <Skeleton className="h-6 w-16" />
          </li>

          <li className="flex gap-2">
            <Book />
            <Skeleton className="h-6 w-32" />
          </li>

          <li className="flex gap-2">
            <Presentation />
            <Skeleton className="h-6 w-24" />
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};
