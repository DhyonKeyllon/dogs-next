"use client";

import styles from "./photo.module.css";
// import PhotoComments from './PhotoComments';
import Link from "next/link";
import { useUser } from "@/contexts/user";
import Image from "next/image";
import { PhotoWithComments } from "@/shared/types";
import { PhotoDelete } from "./delete";
import PhotoComments from "./comments/component";

export const PhotoContent = ({
  photoWithComments,
  single,
}: {
  photoWithComments: PhotoWithComments;
  single: boolean;
}) => {
  const { user } = useUser();
  const { photo, comments } = photoWithComments;

  return (
    <div className={`${styles.photo} ${single ? styles.single : ""}`}>
      <div className={styles.img}>
        <Image src={photo.src} alt={photo.title} width={1000} height={1000} />
      </div>
      <div className={styles.details}>
        <div>
          <p className={styles.author}>
            {user && user.username === photo.author ? (
              <PhotoDelete id={String(photo.id)} />
            ) : (
              <Link href={`/perfil/${photo.author}`}>@{photo.author}</Link>
            )}
            <span className={styles.visualizacoes}>{photo.acessos}</span>
          </p>
          <h1 className="title">
            <Link href={`/foto/${photo.id}`}>{photo.title}</Link>
          </h1>
          <ul className={styles.attributes}>
            <li>{photo.peso} kg</li>
            <li>{photo.idade} anos</li>
          </ul>
        </div>
      </div>
      <PhotoComments single={single} id={photo.id} comments={comments} />
    </div>
  );
};
