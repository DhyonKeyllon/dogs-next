"use server";

import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export async function logout() {
  await cookies().delete("token");
  redirect("login", RedirectType.push);
}
