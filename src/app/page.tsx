import { getPhotos } from "@/actions";
import { Feed } from "@/components/feed";

export default async function Home() {
  const data = await getPhotos();

  return (
    <section className="container mainContainer">
      <Feed photos={data} />
    </section>
  );
}
