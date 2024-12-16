"use client";

import { postPhoto } from "@/actions";
import { Input } from "@/components/forms";
import { ErrorMessage } from "@/components/helpers";
import { useFormState } from "react-dom";

import styles from "./post-photo.module.css";
import { FormButton } from "@/components/forms/formButton";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

export function PhotoPost() {
  const [state, action] = useFormState(postPhoto, {
    ok: false,
    error: "",
    data: null,
  });

  const [img, setImg] = useState<string>("");

  function handleOnChangeImage({ target }: ChangeEvent<HTMLInputElement>) {
    if (target.files) setImg(URL.createObjectURL(target.files[0]));
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <form action={action}>
        <Input label="Nome" InputAttributes={{ name: "nome", type: "text" }} />
        <Input
          label="Peso"
          InputAttributes={{ name: "peso", type: "number" }}
        />
        <Input
          label="Idade"
          InputAttributes={{ name: "idade", type: "idade" }}
        />
        <Input
          InputAttributes={{
            name: "img",
            id: "img",
            type: "file",
            className: styles.file,
            onChange: handleOnChangeImage,
          }}
        />
        <ErrorMessage error={state.error} />
        <FormButton text="Enviar" />
      </form>

      {img && (
        <div
          className={styles.preview}
          style={{
            backgroundImage: `url(${img})`,
          }}
        ></div>
      )}
    </section>
  );
}
