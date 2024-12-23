import { jwtVerify } from "jose";

export async function verifyToken(token: string): Promise<boolean> {
  if (!token) return false;

  const tokenSecret = process.env.DOGS_TOKEN_SECRET;

  try {
    // * TODO: Implements this after get DOGS_TOKEN_SECRET env
    // await jwtVerify(token, new TextEncoder().encode(tokenSecret), {
    //   algorithms: ["HS256"],
    // });

    return true;
  } catch (error) {
    return false;
  }
}
