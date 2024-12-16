import { getPhotos, getUser } from "@/actions";
import { Feed } from "@/components/feed";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Minha Conta",
};

export default async function ContaPage() {
  const { data: user } = await getUser();
  const { data: photos } = await getPhotos({
    user: user?.username,
    page: 1,
    total: 6,
  });

  return photos?.length ? (
    <Feed photos={photos} />
  ) : (
    <>
      <p
        style={{
          color: "#444",
          fontSize: "1.25rem",
          marginBottom: "1rem",
        }}
      >
        Nenhuma foto encontrada.
      </p>

      <Link
        href={"/conta/postar"}
        className="button"
        style={{
          display: "inline-block",
        }}
      >
        Postar foto
      </Link>
    </>
  );
}
