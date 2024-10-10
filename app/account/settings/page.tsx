import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Typography } from "@/components/ui/Typography";
import { getAuthSession, getRequiredAuthSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { z } from "zod";

const FormValidation = z.object({
  name: z.string().min(3).max(50),
  image: z.string().url(),
});

export default async function AccountSettingsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getRequiredAuthSession();

  const user = session.user;

  const userDetail = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  async function saveUser(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const image = formData.get("image") as string;

    console.log(user.id, name);
    const validatedData = FormValidation.safeParse({ name, image });

    if (!validatedData.success) {
      const searchParams = new URLSearchParams();
      searchParams.set(
        "error",
        "Invalid data, name must be between 3 and 50 characters and image must be a valid URL"
      );
      redirect(`/account/settings?${searchParams.toString()}`);
    }

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: validatedData.data,
    });

    await redirect("/account/settings");
  }

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle>Account settings</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Card>
          <CardContent className="mt-6">
            <form className="flex flex-col gap-4" action={saveUser}>
              <div className="flex flex-col gap-1">
                <label htmlFor="name">Name</label>
                <input
                  className="rounded border p-2"
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={userDetail?.name || ""}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="image">Image</label>
                <input
                  className="rounded border p-2"
                  type="text"
                  name="image"
                  id="image"
                  defaultValue={userDetail?.image || ""}
                />
              </div>
              {searchParams.error && (
                <Typography className="text-red-500">
                  {searchParams.error}
                </Typography>
              )}

              <Button className="mt-6" type="submit">
                Save
              </Button>
            </form>
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
