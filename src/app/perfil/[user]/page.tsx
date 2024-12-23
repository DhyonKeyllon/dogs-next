import { getPhotos } from "@/actions";
import { Feed } from "@/components/feed";

export default async function PerfilUserPage({
  params,
}: {
  params: { user: string };
}) {
  const { data } = await getPhotos({ user: params.user });

  if (!data) return <></>;

  return (
    <section className="container mainSection">
      <h1 className="title">{params.user}</h1>
      <Feed photos={data} username={params.user} />
    </section>
  );
}
