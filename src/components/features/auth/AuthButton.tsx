import { getAuthSession } from "@/lib/auth";
import LoginButton from "./LoginButton";
import LoggedInButton from "./LoggedInButton";

export default async function AuthButton() {
  const session = await getAuthSession();

  const user = session?.user;

  if (!user) {
    return <LoginButton />;
  }

  return <LoggedInButton user={user} />;
}
