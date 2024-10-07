import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import LoginButton from "../auth/LoginButton";

export const AuthErrorCard = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Vous devez être connecté pour accéder à cette page
        </CardTitle>
      </CardHeader>
      <CardFooter>
        <LoginButton />
      </CardFooter>
    </Card>
  );
};
