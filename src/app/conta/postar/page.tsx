import { PhotoPost } from "@/components/account";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Postar | Minha Conta",
};

export default function PostarPage() {
  return <PhotoPost />;
}
