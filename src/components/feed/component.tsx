"use client";

import { Photo } from "@/shared/types";
import { FeedPhotos } from "./photos";
import { useCallback, useEffect, useRef, useState } from "react";
import { getPhotos } from "@/actions";
import { Loading } from "@/components/helpers";

import styles from "./feed.module.css";

export function Feed({
  photos,
  username = 0,
}: {
  photos: Photo[];
  username?: 0 | string;
}) {
  const [photosFeed, setPhotosFeed] = useState<Photo[]>(photos);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [infinite, setInfinite] = useState<boolean>(
    photos.length < 6 ? false : true
  );

  const fetching = useRef(false);

  function infiniteScroll() {
    if (fetching.current) return;

    fetching.current = true;
    setLoading(true);

    setTimeout(() => {
      setPage((currentPage) => currentPage + 1);

      fetching.current = false;
      setLoading(false);
    }, 1000);
  }

  const getPagePhotos = useCallback(
    async (page: number) => {
      const response = await getPhotos(
        {
          page,
          total: 6,
          user: username || 0,
        },
        {
          cache: "no-store",
        }
      );

      if (!response || response.data === null) return;

      const newPhotos = response.data || [];

      setPhotosFeed((currentPhotos) => [...currentPhotos, ...newPhotos]);
      if (newPhotos.length < 6) setInfinite(false);
    },
    [setPhotosFeed, username]
  );

  useEffect(() => {
    if (page === 1) return;

    getPagePhotos(page);
  }, [page, getPagePhotos]);

  useEffect(() => {
    if (!infinite) {
      window.removeEventListener("scroll", infiniteScroll);
      window.removeEventListener("wheel", infiniteScroll);
      return;
    }

    window.addEventListener("scroll", infiniteScroll);
    window.addEventListener("wheel", infiniteScroll);

    return () => {
      window.removeEventListener("scroll", infiniteScroll);
      window.removeEventListener("wheel", infiniteScroll);
    };
  }, [setPage, infinite]);

  return (
    <div>
      <FeedPhotos photos={photosFeed} />
      <div className={styles.loadingWrapper}>
        {loading ? (
          <Loading />
        ) : (
          !infinite && <p>Não existem mais postagens.</p>
        )}
      </div>
    </div>
  );
}
