import { LoginForm } from "@/components/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Dogs",
  description: "Entre na sua conta no site Dogs.",
};

export default function LoginPage() {
  return (
    <section>
      <h1 className="title animeLeft">Login</h1>
      <LoginForm />
    </section>
  );
}
