import { ReactNode } from "react";
import type { Metadata } from "next";

import { SpeedInsights } from "@vercel/speed-insights/next";

import { UserContextProvider } from "@/contexts/user";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

import { getUser } from "@/actions";
import { type_second } from "@/functions/fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "Dogs Next",
  description: "Rede social para cachorros",
};

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: ReactNode;
  modal: ReactNode;
}>) {
  const { data: user } = await getUser();

  return (
    <html lang="pt-br">
      <body className={type_second.variable}>
        <UserContextProvider user={user}>
          <div className="App">
            <Header />
            <main className="AppBody">{children}</main>
            <div>{modal}</div>
            <Footer />
          </div>
        </UserContextProvider>

        <SpeedInsights />
      </body>
    </html>
  );
}
