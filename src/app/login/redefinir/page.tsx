import { LoginRedefinirForm } from "@/components/login/login-redefinir-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Redefinir a senha | Dogs",
  description: "Redefine a sua senha.",
};

export default function RedefinirPage({ searchParams }) {
  console.log(searchParams);

  return (
    <div className="animeLeft">
      <h1 className="title">Redefine sua senha</h1>

      <LoginRedefinirForm />
    </div>
  );
}
