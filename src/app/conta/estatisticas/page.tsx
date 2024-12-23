import { Metadata } from "next";

import { getStatistics } from "@/actions";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Estatísticas | Minha Conta",
};

const AccountStatistics = dynamic(
  () => import("@/components/account/statistics/component"),
  {
    loading: () => <p>Carregando...</p>,
    ssr: false,
  }
);

export default async function PostarPage() {
  const { data } = await getStatistics();

  if (!data) return <></>;

  return (
    <section>
      <AccountStatistics statistics={data} />
    </section>
  );
}
