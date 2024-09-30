import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import UserCard from "@/components/features/User/UserCard";

export default async function AccountPage() {
  const session = await getAuthSession();

  const user = session?.user;

  if (!user) {
    // throw new Error("User not found");
    redirect("/");
  }

  return (
    <div>
      <UserCard user={user} />
    </div>
  );
}
