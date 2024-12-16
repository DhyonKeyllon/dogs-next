import type { Metadata } from "next";
import "./globals.css";
import { type_second } from "@/functions/fonts";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { UserContextProvider } from "@/contexts/user";
import { getUser } from "@/actions";

export const metadata: Metadata = {
  title: "Dogs Next",
  description: "Rede social para cachorros",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: user } = await getUser();

  return (
    <html lang="pt-br">
      <body className={type_second.variable}>
        <UserContextProvider user={user}>
          <div className="App">
            <Header />
            <main className="AppBody">{children}</main>
            <Footer />
          </div>
        </UserContextProvider>
      </body>
    </html>
  );
}
