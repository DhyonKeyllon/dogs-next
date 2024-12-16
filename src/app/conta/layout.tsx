import { ContaHeader } from "@/components/account";
import { ReactNode } from "react";

type ContaLayoutProps = {
  children: ReactNode;
};

export default async function ContaLayout({ children }: ContaLayoutProps) {
  return (
    <div className="container">
      <ContaHeader />

      {children}
    </div>
  );
}
