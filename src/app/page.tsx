import { getPhotos } from "@/actions";
import { Feed } from "@/components/feed";

export default async function Home() {
  const data = await getPhotos({ page: 1, total: 6, user: "0" });

  return (
    <section className="container mainContainer">
      <Feed photos={data} />
    </section>
  );
}
