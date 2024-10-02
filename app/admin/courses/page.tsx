import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Typography } from "@/components/ui/Typography";
import { getRequiredAuthSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Avatar } from "@radix-ui/react-avatar";
import Link from "next/link";

export default async function coursesUserList() {
  const session = await getRequiredAuthSession();

  const user = session.user;

  const courses = await prisma.course.findMany({
    where: {
      creatorId: user.id,
    },
  });

  return (
    <Layout>
      <LayoutHeader className="flex flex-row justify-between">
        <LayoutTitle>Courses</LayoutTitle>
        <Link
          className={buttonVariants({ variant: "secondary" })}
          href="/account/courses/new"
        >
          New Course
        </Link>
      </LayoutHeader>
      <LayoutContent>
        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[10%]">Image</TableHead>
                  <TableHead>Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="w-[10%]">
                      <Avatar className=" rounded">
                        <AvatarFallback>
                          {course.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                        {course.image && (
                          <AvatarImage
                            className="object-cover"
                            src={course.image}
                            alt={course.name}
                          />
                        )}
                      </Avatar>
                    </TableCell>
                    <TableCell>
                      <Typography
                        as={Link}
                        variant="large"
                        href={`/admin/courses/${course.id}`}
                      >
                        {course.name}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
