"use server";

import { cookies } from "next/headers";

export async function getTokenAction() {
  const token = await cookies().get("token")?.value;

  return !!token;
}
