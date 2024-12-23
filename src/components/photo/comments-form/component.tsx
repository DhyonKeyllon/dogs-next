"use client";

import { useFormState, useFormStatus } from "react-dom";
import styles from "./photo-comments-form.module.css";
import { SendIcon } from "@/icons/send";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Comment } from "@/shared/types";
import { ErrorMessage } from "@/components/helpers";
import { createComment } from "@/actions/create-comment";

function FormButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className={styles.button} disabled={pending}>
      <SendIcon />
    </button>
  );
}

export function PhotoCommentsForm({
  single,
  id,
  setComments,
}: {
  single: boolean;
  id: number;
  setComments: Dispatch<SetStateAction<Comment[]>>;
}) {
  const [state, action] = useFormState(createComment, {
    ok: false,
    data: null,
    error: "",
  });

  useEffect(() => {
    if (!state.ok) return;
    if (!state.data) return;

    setComments((comments) => [...comments, { ...state.data! }]);
    setComment("");
  }, [state, setComments]);

  const [comment, setComment] = useState("");

  return (
    <form
      action={action}
      className={`${styles.form} ${single ? styles.single : ""}`}
    >
      <input type="hidden" name="id" id="id" value={id} />
      <textarea
        className={styles.textarea}
        name="comment"
        id="comment"
        placeholder="Comente..."
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      ></textarea>
      <FormButton />
      <ErrorMessage error={state.error} />
    </form>
  );
}
