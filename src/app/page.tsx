import { getPhotos } from "@/actions";
import { Feed } from "@/components/feed";

export default async function Home() {
  const { data: photos } = await getPhotos({ page: 1, total: 6, user: 0 });

  return (
    <section className="container mainContainer">
      {photos && <Feed photos={photos} />}
    </section>
  );
}
