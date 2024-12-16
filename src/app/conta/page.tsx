"use client";

import { useUser } from "@/contexts/user/context";

export default function ContaPage() {
  const { user } = useUser();

  return (
    <main>
      <h1>Conta: {user?.username}</h1>
    </main>
  );
}
