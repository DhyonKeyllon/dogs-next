import { getPhotoById } from "@/actions";
import { FeedModal } from "@/components/feed/modal";
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

  return <FeedModal photoWithComments={photoWithComments} />;
}
