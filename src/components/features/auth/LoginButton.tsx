"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/Loader";
import { useMutation } from "@tanstack/react-query";

export default function LoginButton() {
  const mutation = useMutation({
    mutationFn: async () => {
      signIn();
    },
  });
  if (mutation.isPending) {
    return <Loader size={12} />;
  }

  return (
    <>
      <Button onClick={() => mutation.mutate()}>Connexion</Button>
    </>
  );
}
