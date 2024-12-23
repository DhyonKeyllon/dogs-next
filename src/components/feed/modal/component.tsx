"use client";

import { PhotoContent } from "@/components/photo";
import { PhotoWithComments } from "@/shared/types";

import styles from "./modal.module.css";
import { usePathname, useRouter } from "next/navigation";

type FeedModalProps = {
  photoWithComments: PhotoWithComments;
};

export function FeedModal({ photoWithComments }: FeedModalProps) {
  const router = useRouter();
  const pathname = usePathname();

  if (!pathname.includes("foto")) return <></>;

  function handleOutsideClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) router.back();
  }

  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      <PhotoContent photoWithComments={photoWithComments} single={false} />
    </div>
  );
}
