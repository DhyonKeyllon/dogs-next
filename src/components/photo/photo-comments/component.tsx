"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./photo-comments.module.css";

import { PhotoCommentsForm } from "../photo-comments-form";
import { useUser } from "@/contexts/user";
import { Comment } from "@/shared/types";

const PhotoComments = (props: {
  single: boolean;
  id: number;
  comments: Comment[];
}) => {
  const { user } = useUser();

  const [comments, setComments] = useState<Comment[]>(() => props.comments);
  const commentsSection = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (commentsSection.current)
      commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
  }, [comments]);

  return (
    <>
      <ul
        ref={commentsSection}
        className={`${styles.comments} ${props.single ? styles.single : ""}`}
      >
        {comments.map((comment) => (
          <li key={comment.comment_ID}>
            <b>{comment.comment_author}: </b>
            <span>{comment.comment_content}</span>
          </li>
        ))}
      </ul>

      {user && (
        <PhotoCommentsForm
          single={props.single}
          id={props.id}
          setComments={setComments}
        />
      )}
    </>
  );
};

export default PhotoComments;
