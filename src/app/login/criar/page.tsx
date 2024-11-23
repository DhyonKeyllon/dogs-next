import { LoginCriarForm } from "@/components/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Criar conta | Dogs",
  description: "Crie sua conta no site Dogs.",
};

export default function CriarPage() {
  return (
    <div className="animeLeft">
      <h1 className="title">Cadastre-se</h1>
      <LoginCriarForm />
    </div>
  );
}
