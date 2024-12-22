import { getPhotoById } from "@/actions";
import { PhotoContent } from "@/components/photo";
import { type MetadataRoute } from "next";
import { notFound } from "next/navigation";

type PhotoIdPageProps = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: PhotoIdPageProps) {
  const { data: photoWithComments } = await getPhotoById(params.id);

  if (!photoWithComments)
    return {
      title: "Fotos",
    };

  return {
    title: photoWithComments.photo.title,
  };
}

export default async function FotoIdPage({ params }: PhotoIdPageProps) {
  const { data: photoWithComments } = await getPhotoById(params.id);

  if (!photoWithComments) return notFound();

  return (
    <section className="container mainContainer">
      <PhotoContent photoWithComments={photoWithComments} single={true} />
    </section>
  );
}
