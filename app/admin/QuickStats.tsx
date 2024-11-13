import { getAuthSession } from "@/lib/auth";
import { countActive, countCourseActive } from "./admin.query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Typography } from "@/components/ui/Typography";
import { Book, Presentation, User } from "lucide-react";

export const QuickStats = async () => {
  const session = await getAuthSession();
  const userAdminId = session?.user.id;

  if (!userAdminId) {
    return <p>Unauthorized</p>;
  }

  const userActives = await countActive(userAdminId);
  const lessonActives = await countActive(userAdminId, "lessonId");
  const courseActives = await countCourseActive(userAdminId);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Admin Page</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-1">
          <li className="flex gap-2">
            <User />
            <Typography variant="base">
              <span className="font-bold">{userActives}</span> utilisateurs
              actifs
            </Typography>
          </li>

          <li className="flex gap-2">
            <Book />
            <Typography variant="base">
              <span className="font-bold">{lessonActives}</span> leçons actives
            </Typography>
          </li>

          <li className="flex gap-2">
            <Presentation />
            <Typography variant="base">
              <span className="font-bold">{courseActives}</span> cours actifs
            </Typography>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
};
