"use client";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/Loader";
import { useMutation } from "@tanstack/react-query";

export default function LogoutButton() {
  const mutation = useMutation({
    mutationFn: async () => {
      signOut();
    },
  });
  if (mutation.isPending) {
    return <Loader size={12} />;
  }

  return (
    <>
      <Button variant="outline" onClick={() => mutation.mutate()}>
        Deconnexion
      </Button>
    </>
  );
}
