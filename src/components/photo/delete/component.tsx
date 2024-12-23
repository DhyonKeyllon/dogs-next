"use client";

import { useState } from "react";
import styles from "./photo-delete.module.css";
import { deletePhotoById } from "@/actions";

export const PhotoDelete = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState<boolean>(false);

  async function handleDelete() {
    setLoading(true);

    const confirm = window.confirm("Tem certeza que deseja deletar esta foto?");

    if (confirm) await deletePhotoById(id);

    setLoading(false);
  }

  return (
    <>
      {loading ? (
        <button className={styles.delete} disabled>
          Deletar
        </button>
      ) : (
        <button className={styles.delete} onClick={handleDelete}>
          Deletar
        </button>
      )}
    </>
  );
};
