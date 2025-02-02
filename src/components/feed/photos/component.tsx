import { Photo } from "@/shared/types";
import Image from "next/image";
import Link from "next/link";

import styles from "./feed-photos.module.css";

export function FeedPhotos({ photos }: { photos: Photo[] }) {
  return (
    <ul className={`${styles.feed} animeLeft`}>
      {photos.map((photo, index) => (
        <li className={styles.photo} key={`${photo.id}-${photo.date}-${index}`}>
          <Link href={`/foto/${photo.id}`} scroll={false}>
            <Image
              src={photo.src}
              alt={photo.title}
              width={1500}
              height={1500}
              sizes="80vw"
            />
            <span className={styles.visualizacao}>{photo.acessos}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
