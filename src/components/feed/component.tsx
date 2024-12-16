import { Photo } from "@/shared/types";
import { FeedPhotos } from "./feed-photos";

export function Feed({ photos }: { photos: Photo[] }) {
  return <FeedPhotos photos={photos} />;
}
